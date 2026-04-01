"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const CONVOS = [
  {
    id: "1", name: "Emma Wilson", preview: "Where's my order? I ordered 3 days ago...",
    time: "2m ago", channel: "WhatsApp", tag: "AI: Medium", tagColor: "bg-yellow-100 text-yellow-700",
    active: true,
  },
  {
    id: "2", name: "James Rodriguez", preview: "Thanks! That solved my problem.",
    time: "15m ago", channel: "", tag: "Resolved", tagColor: "bg-green-100 text-green-700",
    active: false,
  },
  {
    id: "3", name: "Sophia Chen", preview: "I need to change my shipping address...",
    time: "32m ago", channel: "Web Chat", tag: "Escalated", tagColor: "bg-red-100 text-red-700",
    active: false,
  },
  {
    id: "4", name: "Michael Brown", preview: "What's your return policy for sale items?",
    time: "1h ago", channel: "", tag: "AI: High", tagColor: "bg-blue-100 text-blue-700",
    active: false,
  },
];

const MESSAGES = [
  { from: "user",  text: "Hi, where's my order? I ordered 3 days ago and haven't received any updates.", time: "10:32 AM" },
  { from: "ai",    text: "Hi Emma! I'd be happy to help you track your order. Could you please provide your order number?", time: "10:32 AM", conf: "92% confidence" },
  { from: "user",  text: "It's order #12847", time: "10:33 AM" },
  {
    from: "ai",
    text: "Thanks! I found your order #12847. It's currently in transit and expected to arrive tomorrow by 5 PM. Here's the tracking link: track.providius.io/12847",
    time: "10:33 AM",
    conf: "88% confidence",
    sources: ["Order Database", "Shipping Policy"],
  },
  { from: "user",  text: "But I paid for express shipping! It should have arrived yesterday.", time: "10:35 AM" },
];

const FILTERS = ["All", "AI Active", "Escalated"];

export default function ConversationsPage() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [compose, setCompose] = useState("");

  return (
    <div className="flex h-screen gap-16 bg-[#F7FAFC] overflow-hidden">
      <Sidebar />

      {/* Conversation list */}
      <aside className="w-[23%] flex-shrink-0 mt-10 h-[92%] border-r border-gray-100 flex flex-col">
        {/* Search */}
        <div className="p-8 border-none bg-white border-gray-100">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border-none border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder-gray-400 outline-none focus:border-[#14A085]"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-8 py-2.5  border-none bg-white border-gray-100">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-[#E6F7F4] text-[#14A085]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 border-b px-4 overflow-y-auto bg-white divide-y divide-gray-50">
          {CONVOS.map((c) => (
            <div
              key={c.id}
              className={`px-4 py-4 border-s-2 border-[#14B8A6] cursor-pointer hover:bg-gray-50 transition-colors ${
                c.active ? "bg-[#F0FDF9]" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{c.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-2">{c.preview}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tagColor}`}>
                  {c.tag}
                </span>
                {c.channel && (
                  <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {c.channel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat thread */}
        <div className="w-[50%] mt-10 " >
      <main className="flex-1 bg-white h-[96%] flex flex-col overflow-hidden">
        {/* Chat header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#14A085] flex items-center justify-center text-white text-sm font-bold">
              EW
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Emma Wilson</p>
              <p className="text-xs text-gray-400">WhatsApp · Customer since Jan 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#14A085] bg-[#E6F7F4] px-3 py-1.5 rounded-full">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#14A085"><circle cx="12" cy="12" r="12"/></svg>
              AI Active
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              Confidence: 72%
            </span>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Escalate
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-white">
          {MESSAGES.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[70%]">
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "ai"
                      ? "bg-[#14A085] text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                  {msg.from === "ai" && "sources" in msg && msg.sources && (
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <p className="text-[11px] text-white/70 mb-1">📎 Sources used:</p>
                      <p className="text-[11px] text-[#A7F3D0]">{(msg.sources as string[]).join(", ")}</p>
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-1.5 mt-1 ${msg.from === "ai" ? "justify-end" : "justify-start"}`}>
                  <span className="text-[11px] text-gray-400">{msg.time}</span>
                  {msg.from === "ai" && "conf" in msg && msg.conf && (
                    <>
                      <span className="text-[11px] text-gray-300">·</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#14A085" strokeWidth="2"/>
                      </svg>
                      <span className="text-[11px] text-gray-400">AI · {msg.conf as string}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Low confidence warning */}
        <div className="px-6 py-3 bg-white border-t border-gray-100">
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-amber-700 font-medium">
                AI confidence dropped to 72%. Consider escalating to human agent.
              </span>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ml-4">
              Escalate Now
            </button>
          </div>

          {/* Compose bar */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-1 border-none">
            <textarea
              // type="text"
              placeholder="Type a message or let AI respond..."
              value={compose}
              onChange={(e) => setCompose(e.target.value)}
              className="flex-1  border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#14A085] flex items-center justify-center text-white hover:bg-[#0d7a65] transition-colors">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polygon points="22,2 15,22 11,13 2,9" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
        </div>
    </div>
  );
}