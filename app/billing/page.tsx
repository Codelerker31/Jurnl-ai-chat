import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navigation } from '../components/navigation'

export default async function BillingPage() {
  // Get authenticated user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your subscription and billing details</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Current Plan Card */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Current Plan</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#FF6600]">Free</span>
                  <span className="text-sm sm:text-base text-gray-400">$0/month</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Perfect for getting started</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Plan Features */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Up to 3 streams</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Basic AI chat</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Weekly updates</span>
              </div>
            </div>

            <button className="w-full bg-[#2A2A2A] hover:bg-[#333333] border border-[#444444] text-gray-300 hover:text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
              Current Plan
            </button>
          </div>

          {/* Pro Plan Card */}
          <div className="bg-[#1C1C1C] border border-[#FF6600] rounded-xl p-4 sm:p-6 relative">
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#FF6600] text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
            </div>

            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Pro Plan</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#FF6600]">$19</span>
                  <span className="text-sm sm:text-base text-gray-400">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">For power users and professionals</p>
              </div>
              <div className="p-2 sm:p-3 bg-[#FF6600]/10 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Plan Features */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Unlimited streams</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Advanced AI chat</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Daily updates</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Priority support</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Custom alerts</span>
              </div>
            </div>

            <button className="w-full bg-[#FF6600] hover:bg-[#e55a00] text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="mt-6 sm:mt-8 bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Payment History</h2>
          
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-base sm:text-lg font-medium mb-2">No payment history yet</h3>
              <p className="text-gray-500 text-sm sm:text-base">Your payment history will appear here once you upgrade to a paid plan.</p>
            </div>
          </div>
        </div>

        {/* Billing Information Section */}
        <div className="mt-6 sm:mt-8 bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Billing Information</h2>
            <button className="bg-[#2A2A2A] hover:bg-[#333333] border border-[#444444] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm w-full sm:w-auto">
              Update Billing
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-gray-300 text-sm sm:text-base break-all">
                {user.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Next Billing Date</label>
              <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-gray-300 text-sm sm:text-base">
                No active subscription
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            Have questions about billing?
          </p>
          <a href="#" className="text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
} 