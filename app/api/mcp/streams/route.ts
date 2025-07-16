import { createRouteHandlerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { action, ...params } = await req.json();
    
    // Create Supabase client
    const supabase = await createRouteHandlerClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    switch (action) {
      case 'create_stream': {
        const { topic } = params;
        
        if (!topic || typeof topic !== 'string') {
          return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const { data, error } = await supabase
          .from('streams')
          .insert({
            user_id: user.id,
            topic: topic.trim(),
            frequency: 'weekly'
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating stream:', error);
          // Return more specific error messages
          if (error.code === '42P01') {
            return NextResponse.json({ 
              error: 'Database tables not set up. Please run the setup SQL in your Supabase dashboard.',
              code: 'TABLES_NOT_FOUND'
            }, { status: 500 });
          }
          return NextResponse.json({ error: 'Failed to create stream' }, { status: 500 });
        }

        return NextResponse.json({ success: true, stream: data });
      }

      case 'get_all_user_streams': {
        const { data, error } = await supabase
          .from('streams')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching streams:', error);
          return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
        }

        return NextResponse.json({ success: true, streams: data });
      }

      case 'get_stream_with_updates': {
        const { stream_id } = params;
        
        if (!stream_id) {
          return NextResponse.json({ error: 'Stream ID is required' }, { status: 400 });
        }

        // First, get the stream and verify ownership
        const { data: stream, error: streamError } = await supabase
          .from('streams')
          .select('*')
          .eq('id', stream_id)
          .eq('user_id', user.id)
          .single();

        if (streamError || !stream) {
          return NextResponse.json({ error: 'Stream not found' }, { status: 404 });
        }

        // Then get all updates for this stream
        const { data: updates, error: updatesError } = await supabase
          .from('stream_updates')
          .select('*')
          .eq('stream_id', stream_id)
          .order('generated_at', { ascending: false });

        if (updatesError) {
          console.error('Error fetching stream updates:', updatesError);
          return NextResponse.json({ error: 'Failed to fetch stream updates' }, { status: 500 });
        }

        return NextResponse.json({ 
          success: true, 
          stream,
          updates: updates || []
        });
      }

      case 'delete_stream': {
        const { stream_id } = params;
        
        if (!stream_id) {
          return NextResponse.json({ error: 'Stream ID is required' }, { status: 400 });
        }

        // Delete the stream (cascade will delete related updates)
        const { error } = await supabase
          .from('streams')
          .delete()
          .eq('id', stream_id)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error deleting stream:', error);
          return NextResponse.json({ error: 'Failed to delete stream' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
      }

      case 'get_dashboard_stats': {
        try {
          // Get total count of streams for user
          const { count: totalStreams, error: streamsCountError } = await supabase
            .from('streams')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          if (streamsCountError) {
            console.error('Error fetching streams count:', streamsCountError);
            return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
          }

          // Calculate date 7 days ago
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const sevenDaysAgoISO = sevenDaysAgo.toISOString();

          // Get count of stream_updates from last 7 days for user's streams
          const { count: recentUpdatesCount, error: updatesCountError } = await supabase
            .from('stream_updates')
            .select('*, streams!inner(user_id)', { count: 'exact', head: true })
            .eq('streams.user_id', user.id)
            .gte('generated_at', sevenDaysAgoISO);

          if (updatesCountError) {
            console.error('Error fetching recent updates count:', updatesCountError);
            return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
          }

          // Get 3 most recently updated streams
          const { data: recentStreams, error: recentStreamsError } = await supabase
            .from('streams')
            .select('*')
            .eq('user_id', user.id)
            .order('last_updated_at', { ascending: false })
            .limit(3);

          if (recentStreamsError) {
            console.error('Error fetching recent streams:', recentStreamsError);
            return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
          }

          return NextResponse.json({
            success: true,
            stats: {
              total_streams: totalStreams || 0,
              recent_updates: recentUpdatesCount || 0,
              recent_streams: recentStreams || []
            }
          });
        } catch (error) {
          console.error('Error in get_dashboard_stats:', error);
          return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
        }
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('MCP Streams API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 