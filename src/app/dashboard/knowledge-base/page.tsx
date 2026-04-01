"use client";
import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
// import { UploadCloudIcon } from "@/components/Icons";

interface Doc {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "Indexed" | "Processing" | "Failed";
  usage: string | null;
  uploaded: string;
  icon: string;
  iconBg: string;
}

const INIT_DOCS: Doc[] = [
  { id: "1", name: "Shipping Policy 2024.pdf", size: "2.4 MB", type: "Policy",   status: "Indexed",    usage: "847 queries",   uploaded: "Jan 15, 2024", icon: "PDF", iconBg: "bg-red-500" },
  { id: "2", name: "Product Catalog.docx",     size: "1.8 MB", type: "Product",  status: "Indexed",    usage: "1,234 queries", uploaded: "Jan 12, 2024", icon: "DOC", iconBg: "bg-blue-500" },
  { id: "3", name: "Return FAQ.md",             size: "124 KB", type: "FAQ",      status: "Processing", usage: null,            uploaded: "Just now",     icon: "MD",  iconBg: "bg-yellow-500" },
  { id: "4", name: "Help Center Articles",      size: "",       type: "Web Link", status: "Indexed",    usage: "562 queries",   uploaded: "Jan 10, 2024", icon: "URL", iconBg: "bg-purple-500" },
];

const STATUS_STYLE: Record<string, string> = {
  Indexed:    "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Failed:     "bg-red-100 text-red-600",
};

export default function KnowledgeBasePage() {
  const [docs, setDocs]       = useState<Doc[]>(INIT_DOCS);
  const [dragging, setDrag]   = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlVal, setUrlVal]   = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addFile = (f: File) => {
    const ext = f.name.split(".").pop()?.toUpperCase() || "FILE";
    const iconBg = ext === "PDF" ? "bg-red-500" : ext === "DOCX" || ext === "DOC" ? "bg-blue-500" : "bg-gray-500";
    const newDoc: Doc = {
      id: String(Date.now()), name: f.name,
      size: f.size < 1048576 ? `${(f.size/1024).toFixed(0)} KB` : `${(f.size/1048576).toFixed(1)} MB`,
      type: "Document", status: "Processing", usage: null, uploaded: "Just now",
      icon: ext.slice(0, 3), iconBg,
    };
    setDocs((p) => [newDoc, ...p]);
    setTimeout(() => setDocs((p) => p.map((d) => d.id === newDoc.id ? { ...d, status: "Indexed", usage: "0 queries" } : d)), 3000);
  };

  const removeDoc = (id: string) => setDocs((p) => p.filter((d) => d.id !== id));

  return (
    <div className="flex gap-20 h-screen bg-[#F7FAFC]  overflow-hidden">
      <Sidebar />

      <div className="w-[90%]">
        <main className="flex-1 w-[90%] overflow-y-auto  px-6 lg:px-10 mt-10 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-sm text-gray-400 mt-0.5">Upload and manage documents that power your AI assistant</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add Content
          </button>
        </div>

        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); Array.from(e.dataTransfer.files).forEach(addFile); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 bg-white py-20 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 mb-6 ${
            dragging ? "border-[#14A085] bg-[#E6F7F4]" : "border-gray-200 bg-gray-50 hover:border-gray-300"
          }`}
        >
          <input
            ref={fileRef} type="file" multiple accept=".pdf,.docx,.txt,.md" className="hidden"
            onChange={(e) => { Array.from(e.target.files || []).forEach(addFile); e.target.value = ""; }}
          />
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              {/* <UploadCloudIcon /> */}
              <img src="/images/uploadicon.png" alt="" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Drop files here or click to upload</p>
          <p className="text-xs text-gray-400 mb-4">Supports PDF, DOCX, TXT, and Markdown files up to 10MB</p>
          <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => fileRef.current?.click()}
              className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-lg px-5 py-2 text-sm transition-colors"
            >
              Browse Files
            </button>
            <button
              onClick={() => setShowUrl((v) => !v)}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Import from URL
            </button>
          </div>
        </div>

        {/* URL input */}
        {showUrl && (
          <div className="flex gap-2 mb-5">
            <input
              type="url" value={urlVal} onChange={(e) => setUrlVal(e.target.value)}
              placeholder="https://help.example.com/articles"
              className="flex-1 border border-gray-200 border-none rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#14A085]"
            />
            <button
              onClick={() => {
                if (!urlVal.trim()) return;
                const newDoc: Doc = { id: String(Date.now()), name: urlVal, size: "", type: "Web Link", status: "Processing", usage: null, uploaded: "Just now", icon: "URL", iconBg: "bg-purple-500" };
                setDocs((p) => [newDoc, ...p]);
                setTimeout(() => setDocs((p) => p.map((d) => d.id === newDoc.id ? { ...d, status: "Indexed", usage: "0 queries" } : d)), 2500);
                setUrlVal(""); setShowUrl(false);
              }}
              className="bg-[#14A085] hover:bg-[#0d7a65] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
            >
              Add
            </button>
          </div>
        )}

        {/* Documents table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Uploaded Documents</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{docs.length} documents</span>
              <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none focus:border-[#14A085] bg-white">
                <option>All Status</option>
                <option>Indexed</option>
                <option>Processing</option>
              </select>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500">
            <div className="col-span-4">Document</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Usage</div>
            <div className="col-span-1">Uploaded</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {docs.map((doc) => (
              <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                {/* Document */}
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0 ${doc.iconBg}`}>
                    {doc.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    {doc.size && <p className="text-xs text-gray-400">{doc.size}</p>}
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2 text-sm text-gray-600">{doc.type}</div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[doc.status]}`}>
                    {doc.status === "Processing" && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5 animate-pulse" />
                    )}
                    {doc.status}
                  </span>
                </div>

                {/* Usage */}
                <div className="col-span-2 text-sm text-gray-500">
                  {doc.usage ? <span>{doc.usage}</span> : <span className="text-gray-300">—</span>}
                </div>

                {/* Uploaded */}
                <div className="col-span-1 text-xs text-gray-400 whitespace-nowrap">{doc.uploaded}</div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  {doc.status === "Processing" ? (
                    <svg className="animate-spin w-4 h-4 text-[#14A085]" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
                    </svg>
                  ) : (
                    <button className="text-gray-400 hover:text-[#14A085] transition-colors">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                  <button onClick={() => removeDoc(doc.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}