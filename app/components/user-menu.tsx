"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { User } from '@supabase/supabase-js'
import { AuthButton } from './auth-button'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Get user initials from email or name
  const getInitials = (user: User) => {
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
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 hover:bg-[#1C1C1C] p-1 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {getInitials(user)}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1C1C1C] border border-[#333333] rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-[#333333]">
            <p className="text-sm text-white font-medium truncate">
              {user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Profile Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Billing
          </a>
          <hr className="border-[#333333] my-1" />
          <div className="px-4 py-2">
            <AuthButton user={user} />
          </div>
        </div>
      )}
    </div>
  )
} 