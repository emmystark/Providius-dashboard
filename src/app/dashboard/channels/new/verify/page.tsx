"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChannelStepper from "@/components/Stepper";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    text.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputs.current[Math.min(text.length, 5)]?.focus();
  };

  const filled = otp.every((d) => d !== "");

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors duration-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-200">Add a New Channel</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 transition-colors duration-200">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        <ChannelStepper current={2} />

        {/* OTP card */}
        <div className="max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Verify Email OTP</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 transition-colors duration-200">
            Enter the OTP sent to{" "}
            <span className="text-gray-700 font-medium">pat*******gmail.com</span>
            {" "}to complete Account Connection
          </p>

          {/* 6 OTP boxes */}
          <div className="flex gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-12 text-center text-lg font-semibold rounded-xl border-2 outline-none transition-all dark:bg-gray-800 dark:text-white ${
                  digit
                    ? "border-emerald-600 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-[#14A085]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => { if (filled) router.push("/dashboard/channels/new/configure"); }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              filled
                ? "bg-emerald-600 dark:bg-emerald-600 hover:bg-[#0d7a65] text-white"
                : "bg-emerald-600 dark:bg-emerald-600/40 text-white cursor-not-allowed"
            }`}
          >
            Verify
          </button>

          <p className="text-center mt-4 text-sm text-gray-400">
            {"Didn't receive code? "}
            <button className="text-[#14A085] font-medium hover:underline">Resend OTP</button>
          </p>
        </div>
      </main>
    </div>
  );
}