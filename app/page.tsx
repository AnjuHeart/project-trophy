export default function Home() {
  // Mock data for our proof of concept
  const game = {
    title: "Dark Souls III",
    difficulty: "7/10",
    timeEstimate: "60-80h",
    playthroughs: "3 Minimum",
    missables: "Yes (Questlines & Rings)",
    alerts: [
      { type: "grind", text: "10-15 hours of Covenant item farming off Silver Knights." },
      { type: "missable", text: "Multiple endings require strict adherence to character side quests." }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header / Brand */}
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-black tracking-wider text-indigo-500 uppercase">
            Trophy<span className="text-slate-100">DB</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">No-BS Achievement Guides & Roadmaps.</p>
        </header>

        {/* Game Title Section */}
        <section className="mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">{game.title}</h2>
        </section>

        {/* The Core Info Grid (Responsive: 1 col on mobile, 4 on desktop) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="block text-xs font-semibold tracking-wide text-slate-500 uppercase">Difficulty</span>
            <span className="text-2xl font-bold text-amber-400 mt-1 block">{game.difficulty}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="block text-xs font-semibold tracking-wide text-slate-500 uppercase">Time to 100%</span>
            <span className="text-2xl font-bold text-indigo-400 mt-1 block">{game.timeEstimate}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="block text-xs font-semibold tracking-wide text-slate-500 uppercase">Playthroughs</span>
            <span className="text-2xl font-bold text-sky-400 mt-1 block">{game.playthroughs}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="block text-xs font-semibold tracking-wide text-slate-500 uppercase">Missables</span>
            <span className="text-2xl font-bold text-rose-400 mt-1 block">{game.missables}</span>
          </div>
        </section>

        {/* What to Expect / Red Flags Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-slate-200">The Completionist Verdict</h3>
          
          <div className="space-y-3">
            {game.alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  alert.type === 'grind' 
                    ? 'bg-amber-950/30 border-amber-800/50 text-amber-200' 
                    : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                }`}
              >
                <span className="font-bold uppercase text-xs tracking-wider mt-0.5 px-2 py-0.5 rounded bg-black/40">
                  {alert.type}
                </span>
                <p className="text-sm">{alert.text}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}