import { Navigation } from "./components/navigation"
import { ChatInterface } from "./components/chat-interface"
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Chat() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  // If not logged in, show chat interface
  return (
    <div className="h-screen bg-[#121212] text-white flex flex-col">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content Area */}
      <ChatInterface />
    </div>
  )
}
