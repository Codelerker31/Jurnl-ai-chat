"use client"

import type React from "react"

import { useState } from "react"
import { Settings, Plus } from "lucide-react"
import { Navigation } from "../components/navigation"
import { StreamSettingsModal } from "../components/stream-settings-modal"

interface Stream {
  id: string
  title: string
  lastUpdated: string
  frequency: string
  description?: string
}

// Mock data for demonstration
const mockStreams: Stream[] = [
  {
    id: "1",
    title: "The Future of Quantum Computing",
    lastUpdated: "3 hours ago",
    frequency: "Weekly",
    description: "Latest developments in quantum computing research and applications",
  },
  {
    id: "2",
    title: "AI Ethics and Regulation Updates",
    lastUpdated: "1 day ago",
    frequency: "Bi-weekly",
    description: "Tracking policy changes and ethical discussions in AI",
  },
  {
    id: "3",
    title: "Climate Change Research Breakthroughs",
    lastUpdated: "2 days ago",
    frequency: "Monthly",
    description: "Scientific discoveries and innovations in climate science",
  },
  {
    id: "4",
    title: "Space Exploration Missions",
    lastUpdated: "5 days ago",
    frequency: "Weekly",
    description: "Updates on current and upcoming space missions",
  },
]

function StreamCard({ stream, onSettingsClick }: { stream: Stream; onSettingsClick: () => void }) {
  const handleStreamClick = () => {
    // Navigate to stream detail page
    window.location.href = `/streams/${stream.id}`
  }

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSettingsClick()
  }

  return (
    <div
      onClick={handleStreamClick}
      className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6 hover:bg-[#2A2A2A] hover:border-[#444444] transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFB347] transition-colors">
            {stream.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Last updated: {stream.lastUpdated}</span>
            <span>•</span>
            <span>Frequency: {stream.frequency}</span>
          </div>
          {stream.description && <p className="text-gray-500 text-sm mt-2">{stream.description}</p>}
        </div>
        <button
          onClick={handleSettingsClick}
          className="p-2 text-gray-400 hover:text-white hover:bg-[#333333] rounded-lg transition-colors ml-4"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function MyStreams() {
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSettingsClick = (stream: Stream) => {
    setSelectedStream(stream)
    setIsModalOpen(true)
  }

  const handleSaveSettings = (settings: any) => {
    console.log("Saving settings for stream:", selectedStream?.id, settings)
    // Here you would typically update the stream settings
  }

  const handleDeleteStream = () => {
    console.log("Deleting stream:", selectedStream?.id)
    // Here you would typically delete the stream
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Streams</h1>
          <button className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            New Stream
          </button>
        </div>

        {/* Stream Cards */}
        <div className="space-y-4">
          {mockStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} onSettingsClick={() => handleSettingsClick(stream)} />
          ))}
        </div>

        {/* Empty State (if no streams) */}
        {mockStreams.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No streams yet</h3>
              <p className="text-gray-500">Create your first stream to start tracking topics you care about.</p>
            </div>
            <button className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-6 py-3 rounded-lg font-medium mt-6 transition-colors">
              Create Your First Stream
            </button>
          </div>
        )}
      </div>

      {/* Stream Settings Modal */}
      <StreamSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        streamTitle={selectedStream?.title || ""}
        currentFrequency={selectedStream?.frequency || "Weekly"}
        currentDay="Friday"
        onSave={handleSaveSettings}
        onDelete={handleDeleteStream}
      />
    </div>
  )
}
