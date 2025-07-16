import { Navigation } from "../components/navigation"
import { StreamsInterface } from "../components/streams-interface"
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MyStreams() {
  // Get authenticated user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Fetch user's streams
  let streams = []
  let hasError = false
  try {
    const { data, error } = await supabase
      .from('streams')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching streams:', error)
      // Check if it's a missing table error
      if (error.code === '42P01') {
        hasError = true
      }
    } else {
      streams = data || []
    }
  } catch (error) {
    console.error('Error fetching streams:', error)
    hasError = true
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      <StreamsInterface streams={streams} hasError={hasError} />
    </div>
  )
}
