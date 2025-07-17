import { LayoutDashboard, MessageSquarePlus, Settings } from "lucide-react"
import { createClient } from '@/lib/supabase/server'
import { AuthButton } from './auth-button'
import { UserMenu } from './user-menu'
import { JurnlLogo } from './jurnl-logo'
import { MobileNavigation } from './mobile-navigation'

export async function Navigation() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <nav className="bg-[#121212] border-b border-[#333333] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo */}
          <a href="/dashboard" className="flex items-center">
            <JurnlLogo className="h-8 sm:h-10" />
          </a>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden lg:flex items-center gap-4">
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

                {/* My Streams Button */}
                <a
                  href="/streams"
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">My Streams</span>
                </a>

                {/* User Menu */}
                <UserMenu user={user} />
              </div>
            )}
          </div>

          {/* Mobile Navigation Component */}
          <MobileNavigation user={user} />
        </div>
      </nav>
    </>
  )
}
