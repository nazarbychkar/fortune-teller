"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import gptAsk from "@/lib/ai"
import Image from 'next/image'

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatContainerRef]) // Updated dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      setChatHistory([...chatHistory, message])
      const result = await gptAsk(message)
      setResponse(result)
      setChatHistory((prev) => [...prev, response])
    } catch (error) {
      console.error("Error while fetching response:", error)
      setResponse("The crystal ball is clouded. Please try again.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-opacity-30 bg-black rounded-lg p-6 backdrop-blur-sm">
      <div className="chat-bubble mb-8 bg-opacity-50 bg-purple-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Image
            className="rounded-full w-16 h-16 object-cover border-2 border-amber-300"
            src="/romani-fortune-teller.jpg"
            alt="Baba Zara"
            width={500}
            height={500}
          />
          <div>
            <p className="text-amber-300 font-semibold text-lg">Baba Zara:</p>
            <p className="text-gray-200 italic">
              Ah, child, you seek the gaze of Baba Zara upon the tapestry of your destiny? Very well, come closer. Let
              me take your hand and peer into the shifting sands of your future. 🌙✨ The winds of time whisper secrets
              only the brave dare hear. Speak now—what is it you seek to uncover, little one? Fortune, love, or the
              riddle of your path?
            </p>
          </div>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className="chat-page mb-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-purple-900"
      >
        <ul className="space-y-4">
          {chatHistory.map((msg, index) => (
            <li key={index} className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-3 rounded-lg ${index % 2 === 0 ? "bg-indigo-700" : "bg-purple-700"} max-w-[80%]`}
              >
                <p className="font-semibold mb-1">{index % 2 === 0 ? "You:" : "Baba Zara:"}</p>
                <p>{msg}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form className="send-message flex space-x-2" onSubmit={handleSubmit}>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="flex-grow bg-purple-800 bg-opacity-50 text-white placeholder-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Ask the spirits..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-purple-900 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          🔮 Seek
        </button>
      </form>
    </div>
  )
}

