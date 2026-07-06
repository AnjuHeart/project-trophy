import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import your brand new adaptive Navbar component
import Navbar from "@/app/components/Navbar"; 
import Footer from "@/app/components/Footer"; 

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
        
        {/* 2. Place the Navbar right here so it stays fixed to the top of every view */}
        <Navbar />

        <main className="w-full bg-slate-950">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}