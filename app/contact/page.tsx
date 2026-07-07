"use client";

import React from "react";

export default function ContactPage() {
    // Array for socials: simply add a new object here to add TikTok, Reddit, etc.
    const socialLinks = [
        { name: "Discord", url: "https://discord.gg/yourlink", icon: "💬", color: "hover:text-indigo-400" },
        { name: "Twitter / X", url: "https://twitter.com/yourlink", icon: "🐦", color: "hover:text-sky-400" },
        { name: "Bluesky", url: "https://bsky.app/profile/yourlink", icon: "🦋", color: "hover:text-blue-400" },
        { name: "Instagram", url: "https://instagram.com/yourlink", icon: "📸", color: "hover:text-pink-400" },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto px-6 pt-28 pb-20 selection:bg-rose-500/20 selection:text-rose-300">

            {/* Page Header */}
            <div className="mb-12 border-b border-slate-900 pb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight text-slate-100">
                    Contact & Support
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* ================= COLUMN 1: SOCIAL LINKS (MODULAR) ================= */}
                <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-900/60 pb-1.5">
                        Join the Community
                    </h2>
                    <div className="flex flex-col gap-2">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-4 bg-slate-900/10 hover:bg-slate-900/20 border border-slate-900/60 rounded-xl flex items-center justify-between text-xs font-bold text-slate-400 transition-all duration-200 group ${social.color}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm select-none">{social.icon}</span>
                                    <span>{social.name}</span>
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-widest uppercase font-black">
                                    Connect ↗
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ================= COLUMN 2: SUPPORT & ISSUES ================= */}
                <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-900/60 pb-1.5">
                        Support & Feedback
                    </h2>

                    <div className="p-6 bg-slate-900/10 border border-slate-900/60 rounded-xl space-y-6">
                        <div>
                            <h3 className="text-sm font-black text-slate-200 tracking-tight">
                                Help us continue improving and updating this website!
                            </h3>
                            <p className="mt-2 text-[12px] font-medium text-slate-400 leading-relaxed">
                                TrophyDB is proudly hosted with no paywalls or user restrictions. To help us keep the servers running, maintain data syncs, and continuously roll out new features, consider supporting the project or contributing feedback.
                            </p>
                        </div>

                        {/* Combined Support & Bug Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Patreon Tile */}
                            <a
                                href="https://patreon.com/yourlink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 rounded-xl transition-all duration-200 group block text-left"
                            >
                                <div className="flex items-center gap-2 text-xs font-black text-slate-200 uppercase tracking-wider group-hover:text-rose-400 transition-colors">
                                    <span>💰</span>
                                    <span>Patreon Support</span>
                                </div>
                                <p className="mt-1 text-[11px] font-medium text-slate-500 leading-normal">
                                    Unlock exclusive profile badges and community perks while helping offset hosting costs.
                                </p>
                            </a>

                            {/* Bug Tracker Tile */}
                            <a
                                href="https://github.com/yourlink/issues" // Or point this to your Discord invite / a Google Form
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 rounded-xl transition-all duration-200 group block text-left"
                            >
                                <div className="flex items-center gap-2 text-xs font-black text-slate-200 uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                                    <span>🪲</span>
                                    <span>Report a Bug</span>
                                </div>
                                <p className="mt-1 text-[11px] font-medium text-slate-500 leading-normal">
                                    Spot a broken route, missing stats, or inaccurate completion times? Let us know right away.
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* ================= BUSINESS SECTION ================= */}
                    <div className="pt-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-900/60 pb-1.5">
                            Business Inquiries
                        </h2>
                        <div className="p-6 bg-slate-900/10 border border-slate-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                                    Commercial & Press Contacts
                                </h3>
                                <p className="mt-1 text-[11px] font-medium text-slate-500">
                                    For partnerships, data usage questions, or API access requests.
                                </p>
                            </div>
                            <a
                                href="mailto:trophydb@trophydb.io"
                                className="self-start sm:self-center px-4 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all text-center tracking-wide"
                            >
                                trophydb@trophydb.io
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}