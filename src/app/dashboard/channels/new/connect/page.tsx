"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChannelStepper from "@/components/Stepper";

export default function ConnectAccountPage() {
  const [phone, setPhone]   = useState("+234 8160 5824 60");
  const [token, setToken]   = useState("EAAN2aW5zCVB0B026SR17");
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add a New Channel</h1>
        <p className="text-sm text-gray-400 mb-6">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        <ChannelStepper current={2} />

        {/* Form card */}
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Connect Your WhatsApp business account to Providus
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 8160 5824 60"
                className="w-full border-2 border-[#14A085]/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Account API Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your API token here"
                className="w-full border-2 border-[#14A085]/20 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#14A085] focus:ring-2 focus:ring-[#14A085]/10"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => router.push("/dashboard/channels/new/verify")}
              className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-16 py-3 text-sm transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}