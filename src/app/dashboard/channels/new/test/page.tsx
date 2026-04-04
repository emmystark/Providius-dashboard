"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChannelStepper from "@/components/Stepper";

const SIM_MESSAGES = [
  { from: "user",  text: "Hi, where's my order? I ordered 3 days ago and haven't received any updates.", time: "10:32 AM" },
  { from: "ai",    text: "Hi Emma! I'd be happy to help you track your order. Could you please provide your order number?", time: "10:32 AM", conf: "92% confidence" },
  { from: "user",  text: "It's order #12847", time: "10:33 AM" },
  { from: "ai",    text: "Thanks! I found your order #12847. It's currently in transit and expected to arrive tomorrow by 5 PM. Here's the tracking link: track.providius.io/12847", time: "10:33 AM", conf: "88% confidence", sources: ["Order Database", "Shipping Policy"] },
];

export default function TestActivatePage() {
  const [tested, setTested]   = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const runTest = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setTested(true); }, 1800);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors duration-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-200">Add a New Channel</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 transition-colors duration-200">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        <ChannelStepper current={4} />

        <p className="text-sm text-gray-500 mb-5">
          Run a simulated chat here to ensure your AI is functioning correctly and then activate the channel
        </p>

        {/* Chat preview window */}
        <div className="max-w-2xl border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden bg-white">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
            <div className="w-8 h-8 rounded-lg bg-orange-500 dark:bg-orange-600 flex transition-colors duration-200 items-center justify-center text-white text-xs font-bold">
              TC
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-200">Temu Company</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-200">Business Account</p>
            </div>
            {/* Expand icon */}
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="px-5 py-5 space-y-4 min-h-[280px] max-h-[360px] overflow-y-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
            {!tested && !loading && (
              <div className="flex items-center justify-center h-48 text-sm text-gray-400 dark:text-gray-500 transition-colors duration-200">
                Press &ldquo;Run Test&rdquo; to simulate a conversation
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-48 gap-2 text-sm text-gray-400 dark:text-gray-500 transition-colors duration-200">
                <svg className="animate-spin w-4 h-4 text-[#14A085]" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
                </svg>
                Running simulation…
              </div>
            )}

            {tested && !loading && SIM_MESSAGES.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "ai" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[78%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "ai"
                        ? "bg-emerald-600 dark:bg-emerald-600 text-white transition-colors duration-200 rounded-br-sm"
                        : "bg-white dark:bg-gray-800 border dark:border-gray-700 transition-colors duration-200 border border-gray-200 text-gray-800 dark:text-gray-200 transition-colors duration-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.from === "ai" && msg.sources && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <p className="text-[11px] text-white/70 mb-1">📎 Sources used:</p>
                        <p className="text-[11px] text-white/80">{msg.sources.join(", ")}</p>
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 mt-1 ${msg.from === "ai" ? "justify-end" : "justify-start"}`}>
                    <span className="text-[11px] text-gray-400">{msg.time}</span>
                    {msg.conf && (
                      <>
                        <span className="text-[11px] text-gray-300">·</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="#14A085" strokeWidth="2"/>
                          <path d="M12 8v4l3 3" stroke="#14A085" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-[11px] text-gray-400">AI · {msg.conf}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 max-w-2xl">
          {tested ? (
            <>
              <button
                type="button"
                onClick={() => { setTested(false); runTest(); }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 px-5 py-2.5 border border-gray-200 rounded-xl transition-colors"
              >
                Re-run test
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition-colors"
              >
                Activate Channel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={runTest}
              disabled={loading}
              className="flex items-center gap-2 bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-8 py-3 text-sm transition-colors disabled:opacity-60"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
                </svg>
              ) : (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
              )}
              Run Test
            </button>
          )}
        </div>
      </main>
    </div>
  );
}