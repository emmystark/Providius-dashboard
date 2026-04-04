"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChannelStepper from "@/components/Stepper";

const TONES = ["Friendly", "Professional", "Casual"];

export default function ConfigurePage() {
  const [aiAuto, setAiAuto]     = useState(true);
  const [tone, setTone]         = useState("");
  const [confidence, setConf]   = useState(70);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors duration-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-200">Add a New Channel</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 transition-colors duration-200">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        <ChannelStepper current={3} />

        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-200">Configure your channel settings</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 transition-colors duration-200">Customize how your AI handles customer conversations on this channel</p>

          {/* AI Behaviour */}
          <section className="mb-8">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">AI Behaviour</h3>

            {/* Toggle row */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">Use AI Auto - Response</span>
              <button
                type="button"
                onClick={() => setAiAuto((v) => !v)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
                  aiAuto ? "bg-emerald-600 dark:bg-emerald-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 mt-0.5 ${
                    aiAuto ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-3">Select response tone</p>
            <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden">
              {TONES.map((t, i) => (
                <label
                  key={t}
                  className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    i < TONES.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      tone === t ? "border-[#14A085]" : "border-gray-300"
                    }`}
                  >
                    {tone === t && (
                      <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-600" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="tone"
                    value={t}
                    checked={tone === t}
                    onChange={() => setTone(t)}
                    className="sr-only"
                  />
                  <span className="text-sm text-gray-700">{t}</span>
                </label>
              ))}
            </div>
          </section>

          {/* AI Confidence Level */}
          <section className="mb-8">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-200">AI Confidence Level</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5 transition-colors duration-200">
              Adjust how much your AI should escalate to human agents versus automating responses.
            </p>

            {/* Slider with tooltip */}
            <div className="relative mb-2">
              {/* Tooltip */}
              <div
                className="absolute -top-8 flex flex-col items-center transition-all"
                style={{ left: `calc(${confidence}% - 28px)` }}
              >
                <span className="text-xs text-gray-500 whitespace-nowrap mb-1">
                  Escalated to Human Agent
                </span>
                <span className="bg-emerald-600 dark:bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  {confidence}%
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={confidence}
                onChange={(e) => setConf(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14A085 ${confidence}%, #e2e8f0 ${confidence}%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>More Escalation</span>
              <span>More Automation</span>
            </div>
          </section>

          {/* Escalation Rules */}
          <section className="mb-10">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Escalation Rules</h3>
            <p className="text-sm text-gray-500 mb-3">Assigned Human Agent</p>

            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl w-fit">
              <div className="w-8 h-8 rounded-full bg-[#E6F7F4] flex items-center justify-center text-xs font-bold text-[#14A085]">
                EW
              </div>
              <span className="text-sm font-medium text-gray-800">Emma Wilson</span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              If AI confidence is {confidence}% and below escalate to human agent assigned for this channel
            </p>
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/dashboard/channels/new/test")}
              className="bg-emerald-600 dark:bg-emerald-600 hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-8 py-3 text-sm transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}