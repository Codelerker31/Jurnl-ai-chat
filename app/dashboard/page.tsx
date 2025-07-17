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
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Here's what's happening with your streams.
          </p>
        </div>

        {/* Check if user has any streams */}
        {!stats || stats.total_streams === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xl sm:text-2xl font-medium mb-2">Welcome to Jurnl!</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm sm:text-base">
                You haven't created any streams yet. Start by chatting with our AI and create streams to track topics you care about.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/chat"
                  className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Start Chatting
                </a>
                <a
                  href="/learn-about-streams"
                  className="bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Learn About Streams
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Grid */
          <div className="space-y-6">
            {/* Stat Cards - Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Total Streams */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">Total Streams</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stats.total_streams}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-[#FF6600]/10 rounded-lg flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Updates This Week */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">Updates This Week</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stats.recent_updates}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Streams */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">Active Streams</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stats.total_streams}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Streams */}
              <div className="lg:col-span-2 bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Recent Streams</h3>
                  <a
                    href="/streams"
                    className="text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors"
                  >
                    View All
                  </a>
                </div>

                {stats.recent_streams.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {stats.recent_streams.map((stream) => (
                      <a
                        key={stream.id}
                        href={`/streams/${stream.id}`}
                        className="block p-3 sm:p-4 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-white mb-1 text-sm sm:text-base break-words">{stream.topic}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Updated {new Date(stream.last_updated_at).toLocaleDateString()}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-400 text-sm sm:text-base">No streams yet</p>
                    <a
                      href="/chat"
                      className="inline-block mt-3 sm:mt-4 text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors"
                    >
                      Create your first stream →
                    </a>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/chat"
                    className="flex items-center gap-3 p-3 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg transition-colors group"
                  >
                    <div className="p-2 bg-[#FF6600]/10 rounded-lg">
                      <svg className="w-4 h-4 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-[#FFB347]">Start New Chat</p>
                      <p className="text-xs text-gray-400">Ask AI anything</p>
                    </div>
                  </a>

                  <a
                    href="/streams"
                    className="flex items-center gap-3 p-3 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg transition-colors group"
                  >
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-green-400">Manage Streams</p>
                      <p className="text-xs text-gray-400">View all streams</p>
                    </div>
                  </a>

                  <a
                    href="/profile"
                    className="flex items-center gap-3 p-3 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg transition-colors group"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-blue-400">Account Settings</p>
                      <p className="text-xs text-gray-400">Manage profile</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 