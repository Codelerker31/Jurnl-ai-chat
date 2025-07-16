import { Navigation } from "../components/navigation"
import { ChatInterface } from "../components/chat-interface"

export default function ChatPage() {
  return (
    <div className="h-screen bg-[#121212] text-white flex flex-col">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content Area */}
      <ChatInterface />
    </div>
  )
} 