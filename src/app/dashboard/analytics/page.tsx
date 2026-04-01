"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ExportIcon } from "@/components/Icons";

/* ── Data ── */
const RESOLUTION = [62, 78, 85, 71, 80, 68, 55];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const VOLUME_AI = [320, 390, 370, 460, 420, 380, 410];
const VOLUME_ESC = [80, 60, 90, 70, 100, 75, 85];

const ESCALATION = [
  { label: "Complex Issues",   pct: 42 },
  { label: "Low Confidence",   pct: 31 },
  { label: "Customer Request", pct: 27 },
];

const TOP_KB = [
  { label: "Shipping Policy",  count: 847, color: "bg-[#14A085]" },
  { label: "Product Catalog",  count: 623, color: "bg-[#14A085]" },
  { label: "Return FAQ",       count: 412, color: "bg-amber-400" },
];

const RESPONSE_DIST = [
  { label: "<1s",  pct: 45, color: "bg-[#14A085]" },
  { label: "1-2s", pct: 28, color: "bg-[#14A085]" },
  { label: "2-3s", pct: 15, color: "bg-[#14A085]" },
  { label: "3-5s", pct: 8,  color: "bg-amber-400" },
  { label: ">5s",  pct: 4,  color: "bg-red-400" },
];

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"];

const maxRes  = Math.max(...RESOLUTION);
const maxVol  = Math.max(...VOLUME_AI.map((v, i) => v + VOLUME_ESC[i]));

export default function AnalyticsPage() {
  const [range, setRange] = useState("Last 7 days");

  return (
    <div className="flex gap-10 h-screen bg-[#F7FAFC] overflow-hidden">
      <Sidebar />

      <div className="mt-10  w-[79%]">
        <main className="flex-1  overflow-y-auto px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-400 mt-0.5">Track your AI assistant performance and customer insights</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border-none border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 bg-white outline-none bg-none focus:border-[#14A085] cursor-pointer"
            >
              {RANGES.map((r) => <option key={r}>{r}</option>)}
            </select>
            <button className="flex items-center gap-2 border-none border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <ExportIcon />
              Export
            </button>
          </div>
        </div>

        {/* Row 1 — two charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* Resolution Rate Over Time */}
          <div className="bg-white border  border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Resolution Rate Over Time</h3>
            <div className="flex gap-3 items-end">
              {/* Y-axis */}
              <div className="flex flex-col justify-between text-[10px] text-gray-300 text-right pb-5" style={{ height: 220 }}>
                {["100%","80%","60%","40%","20%","0%"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              {/* Bars */}
              <div className="flex-1">
                <div className="flex items-end gap-2" style={{ height: 130 }}>
                  {RESOLUTION.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0">
                      <div
                        className="w-full rounded-t-lg bg-[#14A085] transition-all duration-500"
                        style={{ height: `${(v / maxRes) * 118}px`, minHeight: 4 }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {DAYS.map((d) => (
                    <span key={d} className="flex-1 text-center text-[10px] text-gray-400">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Volume */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Conversation Volume</h3>
            <div className="flex gap-3 items-end">
              {/* Y-axis */}
              <div className="flex flex-col justify-between text-[10px] text-gray-300 text-right pb-5" style={{ height: 140 }}>
                {["600","500","400","300","200","100","0"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              {/* Stacked bars */}
              <div className="flex-1">
                <div className="flex items-end gap-2" style={{ height: 130 }}>
                  {DAYS.map((_, i) => {
                    const total = VOLUME_AI[i] + VOLUME_ESC[i];
                    const aiH   = (VOLUME_AI[i]  / maxVol) * 118;
                    const escH  = (VOLUME_ESC[i] / maxVol) * 118;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col" style={{ height: `${aiH + escH}px` }}>
                          <div className="w-full rounded-t-lg bg-red-400" style={{ height: `${escH}px` }} />
                          <div className="w-full bg-[#14A085] flex-1" style={{ height: `${aiH}px` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  {DAYS.map((d) => (
                    <span key={d} className="flex-1 text-center text-[10px] text-gray-400">{d}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#14A085]" />
                <span className="text-xs text-gray-500">AI Resolved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-xs text-gray-500">Escalated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Escalation Insights / Top KB / Customer Satisfaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

          {/* Escalation Insights */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Escalation Insights</h3>
            <div className="space-y-3">
              {ESCALATION.map(({ label, pct }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">Avg escalation time: <span className="font-medium text-gray-600">4.2 min</span></p>
            </div>
          </div>

          {/* Top Knowledge Sources */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Knowledge Sources</h3>
            <div className="space-y-3">
              {TOP_KB.map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 self-start">Customer Satisfaction</h3>
            <p className="text-5xl font-bold text-gray-900 mb-2">4.6</p>
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4].map((s) => (
                <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              {/* Half star */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="halfStar">
                    <stop offset="50%" stopColor="#FBBF24"/>
                    <stop offset="50%" stopColor="#E5E7EB"/>
                  </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)"/>
              </svg>
            </div>
            <p className="text-xs text-gray-400">Based on 1,247 ratings</p>
          </div>
        </div>

        {/* Row 3 — Response Time Distribution */}
        <div className="bg-white border h-52 border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">Response Time Distribution</h3>
          <div className="flex items-end gap-4 justify-around">
            {RESPONSE_DIST.map(({ label, pct, color }) => (
              <div key={label} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-full max-w-[120px] rounded-b-xl ${color} transition-all duration-500`}
                  style={{ height: `${(pct / 45) * 100}px`, minHeight: 8 }}
                />
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-sm font-semibold text-gray-900">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}