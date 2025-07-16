"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CreateStreamButtonProps {
  messageContent: string
}

export function CreateStreamButton({ messageContent }: CreateStreamButtonProps) {
  const [isCreating, setIsCreating] = useState(false)

  console.log('🟢 CreateStreamButton rendered with content:', messageContent?.slice(0, 50) + '...')

  const handleCreateStream = async () => {
    console.log('🔥 Create Stream button clicked!', { messageContent, isCreating })
    
    if (isCreating) {
      console.log('Already creating, skipping...')
      return
    }

    console.log('Creating stream with topic:', messageContent)
    setIsCreating(true)

    try {
      const response = await fetch('/api/mcp/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_stream',
          topic: messageContent
        })
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Stream Created!",
          description: `Stream for "${messageContent.slice(0, 50)}${messageContent.length > 50 ? '...' : ''}" created successfully!`,
          variant: "default",
        })
      } else {
        // Check for specific error types
        if (data.error === 'Unauthorized') {
          throw new Error('Please log in to create streams')
        } else if (data.code === 'TABLES_NOT_FOUND') {
          throw new Error('Database setup required. Please visit the Streams page for setup instructions.')
        } else {
          throw new Error(data.error || 'Failed to create stream')
        }
      }
    } catch (error) {
      console.error('Error creating stream:', error)
      toast({
        title: "Error",
        description: "Failed to create stream. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-700">
      <button
        onClick={handleCreateStream}
        disabled={isCreating}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#FF6600] hover:bg-[#2A2A2A] px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 hover:border-[#FF6600]/40 bg-[#1A1A1A]"
        title="Create a stream to track updates on this topic"
      >
        <PlusCircle className="w-4 h-4" />
        <span>{isCreating ? 'Creating Stream...' : 'Create Stream'}</span>
      </button>
    </div>
  )
} 