"use client"

import { useState } from "react"
import { LayoutDashboard, MessageSquarePlus, Menu, X, User, Settings, CreditCard } from "lucide-react"
import { User as SupabaseUser } from '@supabase/supabase-js'
import { AuthButton } from './auth-button'
import { JurnlLogo } from './jurnl-logo'

interface MobileNavigationProps {
  user: SupabaseUser | null
}

export function MobileNavigation({ user }: MobileNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get user initials from email or name
  const getInitials = (user: SupabaseUser) => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase()
    }
    return 'U'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-[#1C1C1C] rounded-lg transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-[#121212] border-r border-[#333333] w-64 h-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <JurnlLogo className="h-8" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#1C1C1C] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!user ? (
                /* Guest State */
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">Sign in to access all features</p>
                  <AuthButton user={user} />
                </div>
              ) : (
                /* Logged-In State */
                <>
                  {/* User Info */}
                  <div className="mb-6 p-3 bg-[#1C1C1C] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(user)}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium truncate">
                          {user.user_metadata?.full_name || user.email}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <a
                      href="/dashboard"
                      className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </a>

                    <a
                      href="/chat"
                      className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquarePlus className="w-5 h-5" />
                      <span className="font-medium">New Chat</span>
                    </a>

                    <a
                      href="/streams"
                      className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">My Streams</span>
                    </a>

                    <a
                      href="/profile"
                      className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </a>

                    <a
                      href="/billing"
                      className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Billing</span>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#333333]">
                    <AuthButton user={user} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
} 