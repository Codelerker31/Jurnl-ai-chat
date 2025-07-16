import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navigation } from '../components/navigation'

interface DashboardStats {
  total_streams: number
  recent_updates: number
  recent_streams: Array<{
    id: number
    topic: string
    last_updated_at: string
  }>
}

async function getDashboardStats(userId: string): Promise<DashboardStats | null> {
  try {
    const supabase = await createClient()

    // Get total count of streams for user
    const { count: totalStreams, error: streamsCountError } = await supabase
      .from('streams')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (streamsCountError) {
      console.error('Error fetching streams count:', streamsCountError)
      return null
    }

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoISO = sevenDaysAgo.toISOString()

    // Get count of stream_updates from last 7 days for user's streams
    const { count: recentUpdatesCount, error: updatesCountError } = await supabase
      .from('stream_updates')
      .select('*, streams!inner(user_id)', { count: 'exact', head: true })
      .eq('streams.user_id', userId)
      .gte('generated_at', sevenDaysAgoISO)

    if (updatesCountError) {
      console.error('Error fetching recent updates count:', updatesCountError)
      return null
    }

    // Get 3 most recently updated streams
    const { data: recentStreams, error: recentStreamsError } = await supabase
      .from('streams')
      .select('*')
      .eq('user_id', userId)
      .order('last_updated_at', { ascending: false })
      .limit(3)

    if (recentStreamsError) {
      console.error('Error fetching recent streams:', recentStreamsError)
      return null
    }

    return {
      total_streams: totalStreams || 0,
      recent_updates: recentUpdatesCount || 0,
      recent_streams: recentStreams || []
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return null
  }
}

export default async function Dashboard() {
  // Get authenticated user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Fetch dashboard stats
  const stats = await getDashboardStats(user.id)
  
  // Get user's display name
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your streams.
          </p>
        </div>

        {/* Check if user has any streams */}
        {!stats || stats.total_streams === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Get started with your first stream
              </h2>
              <p className="text-gray-400 mb-6">
                Create streams to track topics you care about and get regular updates.
              </p>
                             <a
                 href="/chat"
                 className="inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#e55a00] text-white px-6 py-3 rounded-lg font-medium transition-colors"
               >
                 Start a Chat
               </a>
               <p className="text-sm text-gray-500 mt-4">
                 Ask the AI a question, then click "Create Stream" to start tracking updates.
               </p>
            </div>
          </div>
        ) : (
          /* Dashboard with Data */
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Streams */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Total Streams</h3>
                <p className="text-3xl font-bold text-white">{stats.total_streams}</p>
              </div>

              {/* Recent Updates */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Updates (7 days)</h3>
                <p className="text-3xl font-bold text-white">{stats.recent_updates}</p>
              </div>

              {/* Active Streams */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Active Streams</h3>
                <p className="text-3xl font-bold text-white">{stats.total_streams}</p>
              </div>
            </div>

            {/* Recent Streams */}
            <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Streams</h3>
              
              {stats.recent_streams.length > 0 ? (
                <div className="space-y-3">
                  {stats.recent_streams.map((stream) => (
                    <a
                      key={stream.id}
                      href={`/streams/${stream.id}`}
                      className="block p-4 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg transition-colors"
                    >
                      <h4 className="font-medium text-white mb-1">{stream.topic}</h4>
                      <p className="text-sm text-gray-400">
                        Last updated: {new Date(stream.last_updated_at).toLocaleDateString()}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No recent activity yet.</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-[#333333]">
                <a
                  href="/streams"
                  className="text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors"
                >
                  View all streams →
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/chat"
                  className="inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#e55a00] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  New Chat
                </a>
                <a
                  href="/streams"
                  className="inline-flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#333333] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Manage Streams
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 