import { Navigation } from "../../components/navigation"
import { StreamDetailInterface } from "../../components/stream-detail-interface"
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface StreamDetailPageProps {
  params: { id: string }
}

export default async function StreamDetail({ params }: StreamDetailPageProps) {
  // Get authenticated user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  const streamId = parseInt(params.id)
  if (isNaN(streamId)) {
    notFound()
  }

  // Fetch stream data and updates
  let streamData = null
  let streamUpdates = []

  try {
    // Fetch the stream and verify ownership
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('*')
      .eq('id', streamId)
      .eq('user_id', user.id)
      .single()

    if (streamError || !stream) {
      notFound()
    }

    streamData = stream

    // Fetch all updates for this stream
    const { data: updates, error: updatesError } = await supabase
      .from('stream_updates')
      .select('*')
      .eq('stream_id', streamId)
      .order('generated_at', { ascending: false })

    if (updatesError) {
      console.error('Error fetching stream updates:', updatesError)
    } else {
      streamUpdates = updates || []
    }
  } catch (error) {
    console.error('Error fetching stream data:', error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      <StreamDetailInterface stream={streamData} updates={streamUpdates} />
    </div>
  )
}
