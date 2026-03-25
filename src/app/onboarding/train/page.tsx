"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
// import { UploadCloudIcon } from "@/components/Icons";

interface UFile { name: string; size: string; ext: string }

const EXT_COLORS: Record<string, string> = {
  PDF: "bg-red-500", DOCX: "bg-blue-500", TXT: "bg-[#F7FAFC]0", MD: "bg-purple-500",
};

export default function TrainAIPage() {
  const [files, setFiles]       = useState<UFile[]>([]);
  const [drag, setDrag]         = useState(false);
  const [showUrl, setShowUrl]   = useState(false);
  const [urlVal, setUrlVal]     = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fmt = (b: number) =>
    b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`;

  const addFiles = (list: FileList) =>
    setFiles((p) => [
      ...p,
      ...Array.from(list).map((f) => ({
        name: f.name,
        size: fmt(f.size),
        ext: f.name.split(".").pop()?.toUpperCase() || "FILE",
      })),
    ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-4 pt-20 pb-16">
    <div className="h-screen  mt-12 mr-24 ">
      <div className="w-full max-w-2xl">
        <Stepper current={4} />
      </div>
      <div className="w-full max-w-[620px] ml-10">

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Build Your Knowledge Base</h2>
        <p className="text-gray-400 text-sm mb-8">
          Upload documents and resources to help your AI respond accurately to customers.
        </p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files) addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-150 ${
            drag ? "border-[#0D9488] bg-[#0D9488]-lighter" : "border-gray-200 bg-[#F7FAFC] hover:border-gray-300"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.md"
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <img src="/images/uploadicon.png" alt="" />
              {/* <UploadCloudIcon /> */}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Drop files here or click to upload</p>
          <p className="text-xs text-gray-400 mb-5">Supports PDF, DOCX, TXT, and Markdown files up to 10MB</p>

          <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold rounded-xl px-5 py-2 text-sm transition-colors cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              Browse Files
            </button>
            <button
              type="button"
              className="text-sm text-[#F7FAFC]0 hover:text-gray-700 font-medium transition-colors"
              onClick={() => setShowUrl((v) => !v)}
            >
              Import from URL
            </button>
          </div>
        </div>

        {/* URL input */}
        {showUrl && (
          <div className="mt-4 flex gap-2">
            <input
              type="url"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 flex-1"
              placeholder="https://docs.example.com/faq"
              value={urlVal}
              onChange={(e) => setUrlVal(e.target.value)}
            />
            <button
              type="button"
              className="flex-shrink-0 bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold rounded-xl px-4 py-2 text-sm transition-colors cursor-pointer"
              onClick={() => {
                if (urlVal.trim()) {
                  setFiles((p) => [...p, { name: urlVal, size: "URL", ext: "URL" }]);
                  setUrlVal(""); setShowUrl(false);
                }
              }}
            >
              Add
            </button>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F7FAFC] border border-gray-100">
                <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${EXT_COLORS[f.ext] || "bg-gray-400"}`}>
                  {f.ext}
                </span>
                <span className="flex-1 text-sm text-gray-700 truncate">{f.name}</span>
                <span className="text-xs text-gray-400 mr-2">{f.size}</span>
                <button
                  type="button"
                  onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Link href="/onboarding/channels">
            <button type="button" className="text-[#F7FAFC]0 hover:text-gray-700 font-medium text-sm transition-colors cursor-pointer">Back</button>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button type="button" className="border border-gray-200 hover:border-gray-300 text-[#F7FAFC]0 hover:text-gray-700 font-medium rounded-xl px-6 py-3 text-sm transition-colors cursor-pointer bg-white">Skip</button>
            </Link>
            <Link href="/dashboard">
              <button type="button" className="bg-[#0D9488] hover:bg-[#0D9488]-dark text-white font-semibold rounded-xl px-8 py-3 text-sm transition-colors cursor-pointer">Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}