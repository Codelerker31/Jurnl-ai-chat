"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Calendar, Clock } from "lucide-react"
import { StreamSettingsModal } from "./stream-settings-modal"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface DatabaseStream {
  id: number
  user_id: string
  topic: string
  frequency: string
  created_at: string
  last_updated_at: string
}

interface DatabaseStreamUpdate {
  id: number
  stream_id: number
  content: string
  generated_at: string
}

interface StreamUpdate {
  id: string
  timestamp: string
  date: string
  content: string
}

interface StreamDetailInterfaceProps {
  stream: DatabaseStream
  updates: DatabaseStreamUpdate[]
}

// Helper function to format timestamp to readable date
function formatTimestamp(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Helper function to format relative time with better precision and readability
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInMonths = Math.floor(diffInDays / 30)
  
  // Handle future dates (shouldn't happen normally, but good to be safe)
  if (diffInMs < 0) {
    return "Just updated"
  }
  
  // Less than 1 minute
  if (diffInMinutes < 1) {
    return "Just now"
  }
  
  // Less than 1 hour
  if (diffInMinutes < 60) {
    if (diffInMinutes === 1) {
      return "1 minute ago"
    }
    return `${diffInMinutes} minutes ago`
  }
  
  // Less than 1 day
  if (diffInHours < 24) {
    if (diffInHours === 1) {
      return "1 hour ago"
    }
    return `${diffInHours} hours ago`
  }
  
  // Less than 1 week
  if (diffInDays < 7) {
    if (diffInDays === 1) {
      return "Yesterday"
    }
    return `${diffInDays} days ago`
  }
  
  // Less than 1 month
  if (diffInWeeks < 4) {
    if (diffInWeeks === 1) {
      return "1 week ago"
    }
    return `${diffInWeeks} weeks ago`
  }
  
  // More than 1 month - show months or absolute date
  if (diffInMonths < 12) {
    if (diffInMonths === 1) {
      return "1 month ago"
    }
    return `${diffInMonths} months ago`
  }
  
  // More than 1 year - show absolute date for clarity
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Helper function to transform database updates to UI format
function transformUpdate(dbUpdate: DatabaseStreamUpdate): StreamUpdate {
  return {
    id: dbUpdate.id.toString(),
    timestamp: formatTimestamp(dbUpdate.generated_at),
    date: dbUpdate.generated_at,
    content: dbUpdate.content
  }
}

function UpdateCard({ update }: { update: StreamUpdate }) {
  return (
    <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-300">{update.timestamp}</span>
      </div>
      <div className="prose prose-invert max-w-none">
        {update.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-gray-200 leading-relaxed mb-3 sm:mb-4 last:mb-0 text-sm sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export function StreamDetailInterface({ stream, updates }: StreamDetailInterfaceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  // Transform database updates to UI format
  const transformedUpdates = updates.map(transformUpdate)

  // Generate display data for the stream
  const streamDisplayData = {
    id: stream.id.toString(),
    title: stream.topic,
    settings: `Updating ${stream.frequency} on Fridays`, // Default, could be enhanced
    frequency: stream.frequency.charAt(0).toUpperCase() + stream.frequency.slice(1),
    lastCheck: formatRelativeTime(stream.last_updated_at)
  }

  const handleBack = () => {
    router.push("/streams")
  }

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleSaveSettings = (settings: any) => {
    console.log("Saving settings for stream:", stream.id, settings)
    // Here you would typically update the stream settings
  }

  const handleDeleteStream = async () => {
    if (isDeleting) return

    setIsDeleting(true)

    try {
      const response = await fetch('/api/mcp/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete_stream',
          stream_id: stream.id
        })
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Stream Deleted",
          description: `Stream "${stream.topic}" has been deleted.`,
          variant: "default",
        })
        router.push("/streams")
      } else {
        throw new Error(data.error || 'Failed to delete stream')
      }
    } catch (error) {
      console.error('Error deleting stream:', error)
      toast({
        title: "Error",
        description: "Failed to delete stream. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 sm:mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to My Streams</span>
      </button>

      {/* Stream Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 break-words">{streamDisplayData.title}</h1>

        <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm break-words">{streamDisplayData.settings}</span>
              </div>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  streamDisplayData.lastCheck.includes('Just') || streamDisplayData.lastCheck.includes('minute') || streamDisplayData.lastCheck.includes('hour')
                    ? 'bg-green-500' 
                    : streamDisplayData.lastCheck.includes('day') || streamDisplayData.lastCheck.includes('Yesterday')
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-400">Last check: </span>
                <span className={`text-sm font-medium ${
                  streamDisplayData.lastCheck.includes('Just') || streamDisplayData.lastCheck.includes('minute') || streamDisplayData.lastCheck.includes('hour')
                    ? 'text-green-400' 
                    : streamDisplayData.lastCheck.includes('day') || streamDisplayData.lastCheck.includes('Yesterday')
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}>
                  {streamDisplayData.lastCheck}
                </span>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-semibold text-white mb-3 sm:mb-4">Recent Updates</h2>

        {transformedUpdates.length > 0 ? (
          transformedUpdates.map((update) => <UpdateCard key={update.id} update={update} />)
        ) : (
          /* No Updates State */
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6 sm:p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
              <h3 className="text-base sm:text-lg font-medium mb-2">No new updates since the last check</h3>
              <p className="text-gray-500 text-sm sm:text-base">We'll notify you when there are new developments in this topic.</p>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button (if needed) */}
      {transformedUpdates.length > 0 && (
        <div className="text-center mt-6 sm:mt-8">
          <button className="bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors text-sm sm:text-base">
            Load Earlier Updates
          </button>
        </div>
      )}

      {/* Stream Settings Modal */}
      <StreamSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        streamTitle={streamDisplayData.title}
        currentFrequency={streamDisplayData.frequency}
        currentDay="Friday"
        onSave={handleSaveSettings}
        onDelete={handleDeleteStream}
      />
    </div>
  )
} 