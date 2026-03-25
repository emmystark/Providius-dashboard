"use client";
import Link from "next/link";
import { useState } from "react";
// import { ProvidusLogo } from "@/components/Icons";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <div className="w-full  bg-white h-[100vh] shadow-2xl overflow-hidden flex flex-col md:flex-row ">

        {/* ── Left teal panel ── */}
        <div  className="md:w-[50%] pt-32 bg-[#0D9488] flex flex-col p-16 px-20 relative overflow-hidden bg-gradient-to-br from-[#0D9488] to-[#0D9488]-dark">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <img className="w-72 mx-[-60px] absolute" src="./logo.png" alt="" />
          </div>

          {/* Headline */}
          <h1 className="text-white text-[2.8rem] font-bold leading-tight mb-4">
            Automate customer support<br />with AI intelligence
          </h1>
          <p className="text-white/80 text-[20px] leading-relaxed mb-8">
            Reduce response time by 80% with RAG powered AI agents that understand your business.
          </p>

          {/* Photo card */}
          {/* <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/10 min-h-[220px]"> */}



            {/* Placeholder image area with teal overlay feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D9488]/30 to-[#0D9488]-dark/60" />
            <img src="./lady.png" alt="" />
            

            {/* Stats bar */}
            <div className="absolute bottom-0 left-3 right-0 flex gap-6 rounded-xl m-10  bg-[#FFFFFF1A]/10 backdrop-blur-sm">
              {/* {[
                { val: "98%", label: "Resolution Rate" },
                { val: "3s",  label: "Avg Response" },
                { val: "3s",  label: "Avg Response" },
              ].map((s, i) => (
              ))} */}
                <div  className="flex-1 px-4 py-3 gap-6 h-20 w-40 border-r border-white/10 last:border-none">
                  <p className="text-white font-bold text-xl leading-none mb-0.5">98%</p>
                  <p className="text-white/70 text-xs">Resolution Rate</p>
                </div>
                
                <div  className="flex-1 px-4 py-3 gap-6 h-20 w-40 border-r border-white/10 last:border-none">
                  <p className="text-white font-bold text-xl leading-none mb-0.5">3s</p>
                  <p className="text-white/70 text-xs">Avg Response</p>
                </div>
                <div  className="flex-1 px-4 py-3 gap-6 h-20 w-40 border-r border-white/10 last:border-none">
                  <p className="text-white font-bold text-xl leading-none mb-0.5">3s</p>
                  <p className="text-white/70 text-xs">Avg Response</p>
                </div>
            </div>
          {/* </div> */}
        </div>

        {/* ── Right sign-in panel ── */}
        <div className="flex-1 flex text-xl flex-col bottom-2 relative justify-center px-12 py-14 bg-[#F8FAFC]">
          <h2 className="text-[39px]  font-bold  text-gray-900 mb-2 text-center">Welcome back</h2>
          <p className="text-gray-400 text-lg top-10 relative mb-9 text-center">Sign in to your workspace</p>

          <div className="space-y-5 max-w-sm w-full mt-16 mx-auto">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-5">Email</label>
              <input
                type="email"
                className="w-full border-none border-gray-200 rounded-xl px-4 py-5 text-lg text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mt-10 text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                className="w-full border-none border-gray-200 rounded-xl px-4 py-5 text-lg text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-[#0D9488] focus:ring-[#0D9488]"
                />
                <span className="text-lg text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-[#0D9488] hover:text-[#0D9488]-dark transition-colors">
                Forgot password?
              </a>
            </div>

            <Link href="/onboarding/workspace" className="block">
              <button className="w-full bg-[#0D9488] hover:bg-[#0D9488]-dark mt-8 text-white font-semibold rounded-3xl px-6 transition-colors cursor-pointer py-5 text-lg">Sign In</button>
            </Link>

            <p className="text-center mt-8 text-sm text-gray-400">Secured by 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
