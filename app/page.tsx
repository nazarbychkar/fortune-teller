import ChatPage from "@/lib/ChatPage"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <h1 className="font-bold text-4xl text-center mb-8 text-amber-300 font-serif">Ask the Fortune Teller!</h1>
      <ChatPage />
    </div>
  )
}

