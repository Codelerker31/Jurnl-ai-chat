"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", { email, password, isLogin })
  }

  const handleGoogleAuth = () => {
    // Handle Google authentication here
    console.log("Google auth clicked")
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      {/* Simple Header */}
      <div className="p-3 sm:p-4">
        <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Jurnl</span>
        </a>
      </div>

      {/* Main Auth Container */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Auth Card */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 sm:p-8">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h1>

            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-3 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333333]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#1C1C1C] px-4 text-gray-400">or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121212] border border-[#333333] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121212] border border-[#333333] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-medium py-2.5 sm:py-3 px-4 rounded-xl transition-colors text-sm sm:text-base"
              >
                Continue
              </button>
            </form>

            {/* Switch Auth Mode */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#FF6600] hover:text-[#FFB347] font-medium transition-colors"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center mt-4 sm:mt-6">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
