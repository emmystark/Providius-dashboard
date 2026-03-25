"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { CheckIcon, WhatsAppIcon, LinkedInIcon, XIcon, WebChatIcon, EmailIcon, InstagramIcon } from "@/components/Icons";
import Link from "next/dist/client/link";

const SUB_STEPS = [
  { n: 1, label: "Choose Channel" },
  { n: 2, label: "Connect Account" },
  { n: 3, label: "Configure" },
  { n: 4, label: "Test & Activate" },
];

const CHANNELS = [
  { id: "whatsapp",  Icon: WhatsAppIcon,  name: "WhatsApp",     desc: "Connect your WhatsApp Business account", popular: true },
  { id: "linkedin",  Icon: LinkedInIcon,  name: "LinkedIn",     desc: "Respond to LinkedIn messages" },
  { id: "x",         Icon: XIcon,         name: "X",            desc: "Engage with your audience in real-time" },
  { id: "webchat",   Icon: WebChatIcon,   name: "Website Chat", desc: "Embed a chat widget on your website" },
  { id: "email",     Icon: EmailIcon,     name: "Email",        desc: "Automate responses from your support inbox" },
  { id: "instagram", Icon: InstagramIcon, name: "Instagram",    desc: "Respond to DMs automatically" },
];

export default function AddChannelPage() {
  const [selected, setSelected] = useState("whatsapp");
  const current = 1;

  return (
    <div className="flex h-screen bg-[#F7FAFC] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto mt-10 ml-10 w-[70%] px-10 py-8">
        {/* Page header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add a New Channel</h1>
        <p className="text-sm text-gray-400 mb-8">
          Connect a communication channel to start handling customer conversations with AI.
        </p>

        {/* Sub-stepper */}
        <div className="flex ml-40 items-center mb-10">
          {SUB_STEPS.map((step, i) => {
            const done   = step.n < current;
            const active = step.n === current;
            return (
              <div key={step.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      done || active ? "bg-[#0D9488] text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {done ? <CheckIcon  /> : step.n}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-[#0D9488]" : done ? "text-[#0D9488]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < SUB_STEPS.length - 1 && (
                  <div className={`mx-3 h-px w-16 ${done ? "bg-[#0D9488]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Channel grid */}
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {CHANNELS.map(({ id, Icon, name, desc, popular }) => {
            const on = selected === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={`relative  h-64  rounded-2xl p-6 cursor-pointer transition-all duration-150 bg-white text-left ${on ? "border-[#0D9488] bg-[#ddf4f0]" : "border-gray-200 hover:border-[#0D9488] hover:bg-[#0D9488]-lighter"}`}
              >
                {popular && (
                  <span className="absolute top-3 left-3 bg-[#0D9488] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="absolute top-3 right-3 ">
                  <div
                    className={`w-5 h-5 pt-1 rounded-full border-2 flex items-center justify-center transition-colors ${
                      on ? "border-none " : "border-gray-300"
                    }`}
                  >
                    {on && <CheckIcon  />}
                  </div>
                </div>
                <div className={popular ? "mt-6 mb-3" : "mb-3"}>
                  <Icon  />
                </div>
                <p className="font-semibold text-gray-900 text-lg mb-1">{name}</p>
                <p className="text-gray-400 mt-6 text-sm leading-snug">{desc}</p>
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <div className="flex ml-[29%] justify-end mt-12 max-w-3xl">
            <Link href="/dashboard/channels/new/connect">

          <button
           type="button" className="bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold  rounded-xl px-8 py-3 text-sm transition-colors cursor-pointer">Continue</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
