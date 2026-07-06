"use client";

import React from "react";

export default function FAQPage() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "general",
      title: "General & Purpose",
      questions: [
        {
          id: "q1",
          q: "What is TrophyDB and what is its purpose?",
          a: "Finding reliable information for 100% completion runs can be incredibly fragmented. To figure out what a game is actually like to complete, you often have to dig through multiple wikis, forums, and database sites. TrophyDB streams all that scattered data into a clean, compact space built specifically for achievement hunters."
        },
        {
          id: "q2",
          q: "Does TrophyDB host its own guides, or does it just link to other websites?",
          a: "A mix of both. We curate core metrics—like completion times and difficulty ratings—directly in our database so your main dashboard layout looks clean and uniform. However, we aren't trying to replace the amazing depth of existing community spaces. For highly detailed walkthroughs or step-by-step roadmap breakdowns, we will point you directly to trusted external resources like Steam database hubs and official community guides."
        }
      ]
    },
    {
      id: "platforms",
      title: "Platforms & Updates",
      questions: [
        {
          id: "q3",
          q: "What platforms does TrophyDB support?",
          a: "TrophyDB integrates natively with the Steam API for the time being. However, our long-term goal is to be completely platform-agnostic. We want to provide clear, accessible completion data whether you are hunting on PC or consoles down the road."
        },
        {
          id: "q4",
          q: "How often do stats and game information update?",
          a: "The information displayed across our pages reflects real-time data from our database. While full database sync frequencies can vary depending on user traffic and admin tweaks, you can count on consistent updates and database refinements every single week."
        }
      ]
    },
    {
      id: "difficulty",
      title: "Completion Estimates & Difficulty",
      questions: [
        {
          id: "q5",
          q: "Why are there three different completion times listed?",
          a: (
            <span>
              Because everyone approaches a 100% completion project differently. We break the journey down into three distinct parameters so you know exactly what to expect:
              <span className="block mt-2 pl-4 border-l-2 border-slate-800 text-slate-400">
                <strong className="text-slate-200">🏆 The Blind Journey:</strong> The time it takes to experience the game naturally without looking at roadmaps or spoilers.
              </span>
              <span className="block mt-1 pl-4 border-l-2 border-slate-800 text-slate-400">
                <strong className="text-slate-200">📚 The Standard Completion:</strong> The typical pace of a completionist utilizing organic gameplay alongside milestone lookups.
              </span>
              <span className="block mt-1 pl-4 border-l-2 border-slate-800 text-slate-400">
                <strong className="text-rose-400">⚡ The Perfect Run:</strong> The optimal completion time assuming efficient, guide-assisted execution from the very beginning.
              </span>
            </span>
          )
        },
        {
          id: "q6",
          q: "What do the 1–10 difficulty numbers actually mean?",
          a: (
            <span>
              The Main Completion Category tells you <em>what kind</em> of grind to expect, while the 1–10 number estimates how physically or mentally demanding that specific grind gets. It is super important to remember that <strong className="text-amber-400 font-extrabold">the number is just a helpful supporting metric, not the main takeaway.</strong> Because everyone has different gaming strengths, a category isn't strictly locked to a single difficulty rating.
              <br /><br />
              For example, a puzzle game might look completely cozy and relaxing on paper, but it could feature a tiring or tedious daily task system that elevates the overall completion difficulty to an 8/10. On the flip side, another puzzle game might contain incredibly cryptic meta-riddles that look mind-destroying at first glance; however, if you are utilizing a guide, you are essentially just following steps 1, 2, and 3, dropping the execution down to an easy 3/10. Use the category to understand the <em>vibe</em> of the hunt, and the number to judge the <em>effort</em> required!
            </span>
          )
        }
      ]
    },
    {
      id: "hof",
      title: "The Hall of Fame & Specialty Tags",
      questions: [
        {
          id: "q7",
          q: "What makes a game qualify for the \"Hall of Fame\"?",
          a: "In a word: Community. There are certain iconic games that immediately command respect when displayed on your profile—whether it's the Souls series for its grueling farming demands, The Binding of Isaac for its massive item pools, or Super Meat Boy for requiring flawless execution. The Hall of Fame designation is reserved for these community-recognized badges of honor."
        },
        {
          id: "q8",
          q: "What are \"Homogeneous Achievements\"?",
          a: "A game possesses homogeneous achievements when every individual objective carries the exact same structural weight. These tasks don't usually test mechanical skill or mark unique milestones; instead, they are tied to cumulative progression, milestone unlocks, or raw statistic tracking. Games like Geometry Dash or The Binding of Isaac are great examples."
        }
      ]
    },
    {
      id: "community",
      title: "Community & Accounts",
      questions: [
        {
          id: "q9",
          q: "How can I submit a new guide or roadmap for a game?",
          a: "For our initial launch, community guides can be submitted directly on the website for admin review. Behind the scenes, we are actively exploring clean ways to natively link and pull existing Steam Community guides straight into our layout for a future update."
        },
        {
          id: "q10",
          q: "Can I import my personal completion checklist right now?",
          a: "Not just yet! It is not a live function of the site quite yet, but it is high on our priority list. We are currently working on a secure user profile framework to handle personal checklist tracking and customization soon."
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-28 pb-20 selection:bg-rose-500/20 selection:text-rose-300">
      
      {/* Clean Page Header (Subtitle removed completely) */}
      <div className="mb-12 border-b border-slate-900 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-100">
          Frequently Asked Questions
        </h1>
      </div>

      {/* ================= INDEX GRID WITH NEW CONTRAST STATES ================= */}
      <div className="mb-14 p-6 bg-slate-900/30 border border-slate-900 rounded-xl backdrop-blur-sm">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">
          Quick Navigation Index
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-sm">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col gap-2">
              {/* HIGH CONTRAST SECTION LABEL */}
              <span className="font-extrabold text-slate-200 uppercase tracking-wider text-[11px]">
                {section.title}
              </span>
              {/* Dimmed default questions layout path */}
              <ul className="space-y-1.5 pl-3 border-l border-slate-800">
                {section.questions.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-slate-400/80 hover:text-rose-400 transition-colors duration-150 line-clamp-1 font-medium"
                    >
                      • {item.q}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUESTIONS CORE LAYOUT ================= */}
      <div className="space-y-14">
        {sections.map((section) => (
          <div key={section.id} className="scroll-mt-24">
            <h2 className="text-xs font-black tracking-widest uppercase text-slate-500 mb-5 border-b border-slate-900/60 pb-1.5">
              {section.title}
            </h2>

            <div className="space-y-6">
              {section.questions.map((item) => (
                <div 
                  key={item.id} 
                  id={item.id} 
                  className="scroll-mt-24 p-6 bg-slate-900/10 hover:bg-slate-900/20 border border-slate-900/60 rounded-xl transition-all duration-200 group"
                >
                  <h3 className="text-sm font-black text-slate-200 tracking-tight group-hover:text-white transition-colors flex gap-3 items-start">
                    <span className="text-rose-500 font-bold select-none text-[11px] bg-rose-950/40 border border-rose-900/30 px-2 py-0.5 rounded shrink-0">Q</span>
                    <span className="mt-0.5">{item.q}</span>
                  </h3>

                  <div className="mt-3 text-[12px] font-medium text-slate-400 leading-relaxed pl-9">
                    {item.a}
                  </div>

                  <div className="mt-4 pl-9 flex justify-end">
                    <button
                      onClick={scrollToTop}
                      className="text-[10px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                    >
                      ↑ Back to Top
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}