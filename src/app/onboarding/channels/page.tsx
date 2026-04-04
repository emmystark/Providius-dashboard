"use client";
import { useState } from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
import { CheckIcon, WhatsAppIcon, LinkedInIcon, XIcon, WebChatIcon, EmailIcon, InstagramIcon } from "@/components/Icons";
import { on } from "process";

const CHANNELS = [
  { id: "whatsapp",  Icon: WhatsAppIcon,  name: "WhatsApp",     desc: "Connect your WhatsApp Business account", popular: true },
  { id: "linkedin",  Icon: LinkedInIcon,  name: "LinkedIn",     desc: "Respond to LinkedIn messages" },
  { id: "x",         Icon: XIcon,         name: "X",            desc: "Engage with your audience in real-time" },
  { id: "webchat",   Icon: WebChatIcon,   name: "Website Chat", desc: "Embed a chat widget on your website" },
  { id: "email",     Icon: EmailIcon,     name: "Email",        desc: "Automate responses from your support inbox" },
  { id: "instagram", Icon: InstagramIcon, name: "Instagram",    desc: "Respond to DMs automatically" },
];

export default function ChannelsPage() {
  const [selected, setSelected] = useState<string[]>(["whatsapp"]);

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="h-screen bg-[#F8FAFC] dark:bg-gray-950 flex transition-colors duration-200 flex-col items-center px-4 pt-20 pb-16">
    <div className="h-screen  mt-12 ">
      <div className="w-full ml-36 max-w-2xl">
        <Stepper current={3} />
      </div>
      <form action="/onboarding/train">
        <div className="w-full">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center transition-colors duration-200">Connect your support channels</h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 text-center transition-colors duration-200">Add a channel for your&nbsp;business support</p>

        <div className="grid grid-cols-3 gap-4 max-w-6xl">
                  {CHANNELS.map(({ id, Icon, name, desc, popular }) => {
                    const on = selected.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggle(id)}
                        className={`relative  h-64  rounded-2xl p-6 cursor-pointer transition-all duration-150  text-left ${on ? "border-[#00A389] border bg-[#E6F6F3]" : "border-gray-200 hover:border-[#0D9488] hover:bg-[#F0FDFA]"}`}
                      >
                        {popular && (
                          <span className="absolute top-3 left-3 bg-[#0D9488] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Most Popular
                          </span>
                        )}
                        <div className="absolute top-3 right-3 ">
                          <div
                            className={`w-5 h-5 pt-1 rounded-full border-2 flex items-center justify-center transition-colors ${
                              on ? "border-none dark:text-black " : "border-gray-300"
                            }`}
                          >
                            {on && <CheckIcon  />}
                          </div>
                        </div>
                        <div className={popular ? "mt-6 mb-3" : "mb-3"}>
                          <Icon  />
                        </div>
                        <p className="font-semibold dark:text-gray-500 text-gray-900 text-lg mb-1">{name}</p>
                        <p className="text-gray-400 mt-6 text-sm leading-snug">{desc}</p>
                      </button>
                    );
                  })}
                </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Link href="/onboarding/workspace">
            <button type="button" className="text-[#F7FAFC]0 hover:text-gray-700 font-medium text-sm transition-colors cursor-pointer">Back</button>
          </Link>
          <div className="flex items-center gap-3">
              <button type="submit" className="border border-gray-200 dark:text-black hover:border-gray-300 text-[#F7FAFC]0 hover:text-gray-700 font-medium rounded-xl px-6 py-3 text-sm transition-colors cursor-pointer bg-white">Skip</button>
              <button type="submit" className="bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold rounded-xl px-8 py-3 text-sm transition-colors cursor-pointer">Continue</button>
          </div>
        </div>
      </div>
      </form>
    </div>
    </div>
  );
}