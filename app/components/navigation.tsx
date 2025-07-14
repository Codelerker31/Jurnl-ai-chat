"use client"

import { useState } from "react"
import { List, ChevronDown } from "lucide-react"

export function Navigation() {
  // Toggle between guest and logged-in state for prototype
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="bg-[#121212] border-b border-[#333333] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - App Name */}
        <h2 className="text-xl font-bold text-white">Jurnl</h2>

        {/* Right Side - Auth States */}
        <div className="flex items-center gap-4">
          {/* Prototype Toggle Button */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-xs text-gray-400 hover:text-gray-300 px-2 py-1 border border-gray-600 rounded"
          >
            Toggle: {isLoggedIn ? "Logged In" : "Guest"}
          </button>

          {!isLoggedIn ? (
            /* Guest State */
            <button className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Log In
            </button>
          ) : (
            /* Logged-In State */
            <div className="flex items-center gap-3">
              {/* My Streams Button */}
              <button
                onClick={() => (window.location.href = "/streams")}
                className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-[#1C1C1C] transition-colors"
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">My Streams</span>
              </button>

              {/* User Avatar Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-[#1C1C1C] p-1 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1C1C1C] border border-[#333333] rounded-lg shadow-lg py-1 z-50">
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
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
