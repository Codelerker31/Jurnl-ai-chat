"use client"

import { useChat } from "ai/react"
import { Send } from "lucide-react"
import { CreateStreamButton } from "./create-stream-button"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        /* Welcome View - Centered */
        <div className="h-full flex flex-col items-center justify-center px-4">
          <h2 className="text-5xl font-bold mb-6 text-white">Jurnl</h2>
          <p className="text-gray-400 text-lg text-center max-w-md">
            Your personal AI research assistant. Ask me anything to get started.
          </p>
        </div>
      ) : (
        /* Messages */
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === "user" ? (
                /* User Message - Right Aligned */
                <div className="flex justify-end mb-4">
                  <div className="bg-[#FF6600] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-2xl">
                    {message.content}
                  </div>
                </div>
              ) : (
                /* AI Message - Left Aligned */
                <div className="flex justify-start mb-6">
                  <div className="bg-[#1C1C1C] text-white px-4 py-4 rounded-2xl rounded-bl-md max-w-3xl">
                    <div className="mb-4">
                      {message.parts?.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <div key={i} className="whitespace-pre-wrap">
                              {part.text}
                            </div>
                          )
                        }
                        return null
                      }) || (
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      )}
                    </div>

                    {/* Sources Section */}
                    <div className="border-t border-gray-600 pt-3">
                      <div className="text-xs text-gray-400 mb-2">Sources</div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="bg-[#2A2A2A] hover:bg-[#333333] px-3 py-1 rounded-full text-xs text-gray-300 hover:text-white transition-colors"
                        >
                          Wikipedia
                        </a>
                        <a
                          href="#"
                          className="bg-[#2A2A2A] hover:bg-[#333333] px-3 py-1 rounded-full text-xs text-gray-300 hover:text-white transition-colors"
                        >
                          Nature.com
                        </a>
                        <a
                          href="#"
                          className="bg-[#2A2A2A] hover:bg-[#333333] px-3 py-1 rounded-full text-xs text-gray-300 hover:text-white transition-colors"
                        >
                          MIT Tech Review
                        </a>
                      </div>
                    </div>

                    {/* Create Stream Button */}
                    <CreateStreamButton messageContent={message.content} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1C1C1C] text-white px-4 py-4 rounded-2xl rounded-bl-md">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#FFB347] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#FFB347] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#FFB347] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Input Form - Sticky */}
      <div className="border-t border-[#333333] bg-[#121212] p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              className="flex-1 bg-[#1C1C1C] border border-[#333333] text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#FF6600] hover:bg-[#e55a00] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 