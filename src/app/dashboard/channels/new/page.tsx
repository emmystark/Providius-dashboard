"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { CheckIcon, WhatsAppIcon, XIcon, WebChatIcon, EmailIcon, InstagramIcon } from "@/components/Icons";
import Link from "next/dist/client/link";
import MobileNav from "@/components/MobileNav";

const SUB_STEPS = [
  { n: 1, label: "Choose Channel" },
  { n: 2, label: "Connect Account" },
  { n: 3, label: "Configure" },
  { n: 4, label: "Test & Activate" },
];

const CHANNELS = [
  { id: "whatsapp",  Icon: WhatsAppIcon,  name: "WhatsApp",     desc: "Connect your WhatsApp Business account", popular: true },
  { id: "x",         Icon: XIcon,         name: "X",            desc: "Engage with your audience in real-time" },
  { id: "webchat",   Icon: WebChatIcon,   name: "Website Chat", desc: "Embed a chat widget on your website" },
  { id: "email",     Icon: EmailIcon,     name: "Email",        desc: "Automate responses from your support inbox" },
  { id: "instagram", Icon: InstagramIcon, name: "Instagram",    desc: "Respond to DMs automatically" },
];

export default function AddChannelPage() {
  const [selected, setSelected] = useState("whatsapp");
  const current = 1;

  return (
    <div className="flex flex-col xl:flex-row h-screen bg-[#F7FAFC] dark:bg-gray-950 transition-colors duration-200 overflow-hidden">
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <MobileNav/>

      <main className="flex-1 overflow-y-auto px-4 md:px-6 xl:px-10 py-4 md:py-6 xl:py-8 pb-8">
        {/* Page header */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-200">Add a New Channel</h1>
        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 mb-6 md:mb-8 transition-colors duration-200">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        {/* Sub-stepper */}
        <div className="flex items-center mb-6 md:mb-10 overflow-x-auto gap-2 md:gap-4">
          {SUB_STEPS.map((step, i) => {
            const done   = step.n < current;
            const active = step.n === current;
            return (
              <div key={step.n} className="flex items-center flex-shrink-0">
                <div className="flex items-center gap-1 md:gap-2">
                  <div
                    className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      done || active ? "bg-[#0D9488] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {done ? <CheckIcon  /> : step.n}
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium whitespace-nowrap ${
                      active ? "text-[#0D9488]" : done ? "text-[#0D9488]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < SUB_STEPS.length - 1 && (
                  <div className={`mx-1 md:mx-3 h-px w-8 md:w-16 ${done ? "bg-[#0D9488]" : "bg-gray-200 dark:bg-gray-700"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Channel grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 max-w-6xl mb-6 md:mb-8">
          {CHANNELS.map(({ id, Icon, name, desc, popular }) => {
            const on = selected === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={`relative h-56 md:h-64 rounded-lg md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-150 text-left border-2 ${on ? "border-[#0D9488] bg-[#E6F6F3] dark:bg-opacity-20" : "border-gray-200 dark:border-gray-700 hover:border-[#0D9488] hover:bg-[#F0FDFA] dark:hover:bg-gray-800"}`}
              >
                {popular && (
                  <span className="absolute top-2 md:top-3 left-2 md:left-3 bg-[#0D9488] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      on ? "border-[#0D9488] bg-[#0D9488]" : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {on && <CheckIcon  />}
                  </div>
                </div>
                <div className={popular ? "mt-6 md:mt-8 mb-2 md:mb-3" : "mb-2 md:mb-3"}>
                  <Icon  />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-base md:text-lg mb-1">{name}</p>
                <p className="text-gray-400 dark:text-gray-500 mt-3 md:mt-6 text-xs md:text-sm leading-snug line-clamp-3">{desc}</p>
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <div className="flex justify-end mt-6 md:mt-8">
          <Link href="/dashboard/channels/new/connect">
            <button
              type="button"
              className="bg-[#0D9488] hover:bg-[#0a6b60] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-lg md:rounded-xl px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm transition-colors cursor-pointer"
            >
              Continue
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
