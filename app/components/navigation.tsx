import { LayoutDashboard, MessageSquarePlus } from "lucide-react"
import { createClient } from '@/lib/supabase/server'
import { AuthButton } from './auth-button'
import { UserMenu } from './user-menu'

export async function Navigation() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="bg-[#121212] border-b border-[#333333] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - App Name */}
        <h2 className="text-xl font-bold text-white">Jurnl</h2>

        {/* Right Side - Auth States */}
        <div className="flex items-center gap-4">
          {!user ? (
            /* Guest State */
            <AuthButton user={user} />
          ) : (
            /* Logged-In State */
            <div className="flex items-center gap-3">
              {/* Dashboard Button */}
              <a
                href="/dashboard"
                className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1C1C1C] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </a>

              {/* New Chat Button */}
              <a
                href="/chat"
                className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1C1C1C] transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span className="text-sm font-medium">New Chat</span>
              </a>

              {/* User Menu */}
              <UserMenu user={user} />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
