import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navigation } from '../components/navigation'
import { DeleteAccountButton } from '../components/delete-account-button'

export default async function ProfilePage() {
  // Get authenticated user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Get user's display name and initials
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const userEmail = user.email || ''
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  // Generate user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        {/* Main Profile Card */}
        <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6 lg:p-8">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6 sm:mb-8">
            {/* Large Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
              {getInitials(userName)}
            </div>
            
            {/* User Name */}
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">
              {userName}
            </h1>
            
            {/* Email */}
            <p className="text-gray-400 text-sm sm:text-base break-all">
              {userEmail}
            </p>
          </div>

          {/* Profile Details Section */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-white text-sm sm:text-base break-words">
                {userName}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-white text-sm sm:text-base break-all">
                {userEmail}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Joined On
              </label>
              <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-3 text-white text-sm sm:text-base">
                {joinedDate}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-[#333333] pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-bold text-red-400 mb-3 sm:mb-4">Danger Zone</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">Delete Account</h3>
              <p className="text-red-300 text-sm sm:text-base mb-4">
                Once you delete your account, there is no going back. This action cannot be undone and will permanently delete all your data.
              </p>
              <DeleteAccountButton />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Need help? <a href="#" className="text-[#FF6600] hover:text-[#FFB347] transition-colors">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
} 