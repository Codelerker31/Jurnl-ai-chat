import { NextResponse } from 'next/server';
import { generateText } from "ai";
import { perplexity } from "@ai-sdk/perplexity";
import { createClient } from '@/lib/supabase/server';
import { sendStreamUpdateEmail } from '@/lib/email';

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    // Verify the cron secret to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret) {
      console.error('CRON_SECRET environment variable not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('Unauthorized cron request - invalid secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting stream processing cron job...');

    // Create Supabase client
    const supabase = await createClient();

    // Calculate the date 7 days ago (or based on stream frequency)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    // Fetch streams that haven't been updated in the specified interval
    const { data: streamsToUpdate, error: fetchError } = await supabase
      .from('streams')
      .select('id, user_id, topic, frequency, last_updated_at')
      .lt('last_updated_at', sevenDaysAgoISO);

    if (fetchError) {
      console.error('Error fetching streams:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
    }

    if (!streamsToUpdate || streamsToUpdate.length === 0) {
      console.log('✅ No streams need updating at this time');
      return NextResponse.json({ 
        success: true, 
        message: 'No streams need updating',
        processed: 0 
      });
    }

    console.log(`📋 Found ${streamsToUpdate.length} streams to update`);

    let processedCount = 0;
    let errorCount = 0;
    const errors: Array<{ streamId: number; error: string }> = [];

    // Process each stream
    for (const stream of streamsToUpdate) {
      try {
        console.log(`🔍 Processing stream ${stream.id}: "${stream.topic}"`);

        // Generate a research summary using Perplexity AI
        const systemPrompt = `You are an AI research assistant tasked with providing comprehensive summaries of recent developments. Focus on the most important and newsworthy information from reliable sources.`;
        
        const userPrompt = `Provide a comprehensive summary of the most important developments, news, and updates about "${stream.topic}" from the last 7 days. Include:

1. Major news events or announcements
2. Significant market developments or trends
3. Policy changes or regulatory updates
4. Technical breakthroughs or research findings
5. Industry analysis and expert opinions

Format the response as a well-structured summary with clear sections. If no significant developments occurred, mention that explicitly. Always cite sources when possible and focus on factual, verified information.

Topic: ${stream.topic}`;

        const result = await generateText({
          model: perplexity("llama-3-sonar-small-32k-online"),
          system: systemPrompt,
          prompt: userPrompt,
          maxTokens: 1500,
        });

        const summaryContent = result.text;

        if (!summaryContent || summaryContent.trim().length === 0) {
          throw new Error('Empty response from AI service');
        }

        console.log(`📝 Generated summary for stream ${stream.id} (${summaryContent.length} characters)`);

        // Save the update to the database
        const { data: newUpdate, error: insertError } = await supabase
          .from('stream_updates')
          .insert({
            stream_id: stream.id,
            content: summaryContent
          })
          .select()
          .single();

        if (insertError) {
          throw new Error(`Failed to save update: ${insertError.message}`);
        }

        // Update the stream's last_updated_at timestamp
        const { error: updateError } = await supabase
          .from('streams')
          .update({ 
            last_updated_at: new Date().toISOString() 
          })
          .eq('id', stream.id);

        if (updateError) {
          console.error(`Error updating stream timestamp for ${stream.id}:`, updateError);
          // Don't throw here as the update was saved successfully
        }

        // Email notification (requires service role key for user access)
        // Note: To enable email notifications, you'll need to:
        // 1. Set up SUPABASE_SERVICE_ROLE_KEY in your environment
        // 2. Create a service role client to access user emails
        // 3. Uncomment the email sending code below
        
        console.log(`📧 Would send email notification for stream ${stream.id} to user ${stream.user_id}`);
        console.log(`   Topic: ${stream.topic}`);
        console.log(`   Summary length: ${summaryContent.length} characters`);
        
        // TODO: Implement email sending with service role access
        // const streamUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/streams/${stream.id}`;
        // await sendStreamUpdateEmail({
        //   to_email: userEmail,
        //   topic: stream.topic,
        //   summary_content: summaryContent,
        //   stream_url: streamUrl,
        //   user_name: userName || 'there'
        // });

        processedCount++;
        console.log(`✅ Successfully processed stream ${stream.id}`);

      } catch (error) {
        console.error(`❌ Error processing stream ${stream.id}:`, error);
        errorCount++;
        errors.push({
          streamId: stream.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`🎯 Cron job completed: ${processedCount} processed, ${errorCount} errors`);

    return NextResponse.json({
      success: true,
      message: 'Stream processing completed',
      processed: processedCount,
      errors: errorCount,
      errorDetails: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Fatal error in cron job:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 