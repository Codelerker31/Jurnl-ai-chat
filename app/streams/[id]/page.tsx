"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Calendar, Clock } from "lucide-react"
import { Navigation } from "../../components/navigation"
import { StreamSettingsModal } from "../../components/stream-settings-modal"

interface StreamUpdate {
  id: string
  timestamp: string
  date: string
  content: string
}

// Mock data for a single stream
const mockStream = {
  id: "1",
  title: "The Future of Quantum Computing",
  settings: "Updating weekly on Fridays",
  frequency: "Weekly",
  lastCheck: "3 hours ago",
}

const mockUpdates: StreamUpdate[] = [
  {
    id: "1",
    timestamp: "July 15, 2025",
    date: "2025-07-15",
    content: `IBM has announced a breakthrough in quantum error correction, achieving a 99.9% fidelity rate in their latest quantum processor. This development brings us significantly closer to fault-tolerant quantum computing.

The new system, dubbed "Quantum Condor," features 1,121 qubits and represents a major leap forward in quantum computing stability. Researchers were able to maintain quantum coherence for up to 100 microseconds, a 10x improvement over previous generations.

This advancement has immediate implications for cryptography, drug discovery, and financial modeling. Several pharmaceutical companies have already expressed interest in using the system for molecular simulation studies.`,
  },
  {
    id: "2",
    timestamp: "July 12, 2025",
    date: "2025-07-12",
    content: `Google's quantum AI team has published new research on quantum machine learning algorithms that could revolutionize how we approach complex optimization problems.

The paper, published in Nature Quantum Information, demonstrates quantum advantage in solving certain classes of machine learning problems up to 1000x faster than classical computers.

Key findings include improved performance in pattern recognition tasks and the ability to process exponentially larger datasets. The research team successfully demonstrated quantum neural networks that can learn and adapt in real-time.

Industry experts believe this could accelerate the development of more sophisticated AI systems and enable new applications in autonomous vehicles, medical diagnosis, and climate modeling.`,
  },
  {
    id: "3",
    timestamp: "July 8, 2025",
    date: "2025-07-08",
    content: `Microsoft Azure Quantum has launched a new cloud-based quantum computing service, making quantum resources accessible to developers worldwide.

The service offers access to multiple quantum hardware providers including IonQ, Rigetti, and Quantinuum through a unified API. Developers can now experiment with quantum algorithms without needing specialized hardware.

Early adopters report successful implementations of quantum algorithms for portfolio optimization, supply chain management, and materials science research. The platform includes comprehensive documentation and quantum development tools.

This democratization of quantum computing access is expected to accelerate innovation and bring quantum solutions to mainstream business applications within the next 2-3 years.`,
  },
]

function UpdateCard({ update }: { update: StreamUpdate }) {
  return (
    <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">{update.timestamp}</span>
      </div>
      <div className="prose prose-invert max-w-none">
        {update.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-gray-200 leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function StreamDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBack = () => {
    window.location.href = "/streams"
  }

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleSaveSettings = (settings: any) => {
    console.log("Saving settings for stream:", mockStream.id, settings)
    // Here you would typically update the stream settings
  }

  const handleDeleteStream = () => {
    console.log("Deleting stream:", mockStream.id)
    // Here you would typically delete the stream and redirect
    window.location.href = "/streams"
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to My Streams</span>
        </button>

        {/* Stream Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{mockStream.title}</h1>

          <div className="flex items-center justify-between bg-[#1C1C1C] border border-[#333333] rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{mockStream.settings}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-400">Last check: {mockStream.lastCheck}</span>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 text-[#FF6600] hover:text-[#FFB347] text-sm font-medium transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Updates</h2>

          {mockUpdates.length > 0 ? (
            mockUpdates.map((update) => <UpdateCard key={update.id} update={update} />)
          ) : (
            /* No Updates State */
            <div className="bg-[#1C1C1C] border border-[#333333] rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No new updates since the last check</h3>
                <p className="text-gray-500">We'll notify you when there are new developments in this topic.</p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {mockUpdates.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors">
              Load Earlier Updates
            </button>
          </div>
        )}
      </div>

      {/* Stream Settings Modal */}
      <StreamSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        streamTitle={mockStream.title}
        currentFrequency={mockStream.frequency}
        currentDay="Friday"
        onSave={handleSaveSettings}
        onDelete={handleDeleteStream}
      />
    </div>
  )
}
