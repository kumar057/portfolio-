import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import TopLeftImg from "@/components/TopLeftImg";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Guddanti Praveen Kumar | Aspiring Gen AI Developer",
  description:
    "Guddanti Praveen Kumar is a B.Tech Computer Science graduate and aspiring Gen AI Developer, building with Python and LLM-assisted workflows.",
  keywords: [
    "python",
    "java",
    "javascript",
    "generative ai",
    "llm",
    "prompt engineering",
    "gen ai developer",
    "portfolio",
    "react",
    "next",
    "nextjs",
  ],
  authors: [{ name: "Guddanti Praveen Kumar" }],
  other: {
    "theme-color": "#f13024",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${sora.variable} font-sora page bg-site text-white bg-cover bg-no-repeat relative`}
      >
        <TopLeftImg />
        <Nav />
        <Header />
        {children}
        <aside>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#393a47",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
          />
        </aside>
      </body>
    </html>
  );
}
