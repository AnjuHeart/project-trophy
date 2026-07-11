interface CategoryData {
    slug: string;
    name: string;
    description: string;
}

interface SecondaryPillProps {
    category: CategoryData;
}

export default function SecondaryPill({ category }: SecondaryPillProps) {
    return (
        <div key={`s1-${category.slug}`} className="relative group/tag inline-block">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded bg-slate-950 text-slate-400 border border-slate-900 tracking-wide uppercase cursor-help transition-colors group-hover/tag:text-slate-200 group-hover/tag:border-slate-700">
                {category.name}
            </span>

            <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 scale-95 opacity-0 pointer-events-none transition-all duration-150 ease-out origin-bottom group-hover/tag:scale-100 group-hover/tag:opacity-100">
                <div className="px-2.5 py-2 text-[11px] font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded shadow-2xl text-center leading-normal">
                    {category.description}
                </div>
            </div>
        </div>
    );
}