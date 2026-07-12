import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import your brand new adaptive Navbar component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GameProvider } from "@/components/ContextManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrophyDB",
  description: "An Achievement Database for Hunters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col m-0 p-0">

        <GameProvider>

          <Navbar />

          <main className="w-full bg-slate-950">
            {children}
          </main>

          <Footer />
          
        </GameProvider>

      </body>
    </html>
  );
}