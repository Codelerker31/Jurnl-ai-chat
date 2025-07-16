"use client"

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback` 
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (!user) {
    return (
      <button 
        onClick={handleSignIn}
        className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Log In
      </button>
    )
  }

  return (
    <button 
      onClick={handleSignOut}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1C1C1C] transition-colors text-sm"
    >
      Sign Out
    </button>
  )
} 