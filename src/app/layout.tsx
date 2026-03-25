import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Providius – AI Customer Support", description: "Automate customer support with AI intelligence" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
