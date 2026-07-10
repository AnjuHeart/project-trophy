import { achievementThemes } from '@/config/themeMap';

interface AchievementCategory {
    id: string;
    name: string;
    description: string;
    slug: string;
    weight: number;
}

interface AchievementPillProps {
    category: AchievementCategory;
}

export default function AchievementPill({ category }: AchievementPillProps) {
    const colorClasses = achievementThemes[category.slug] || 'border-slate-700 text-slate-400';

    return (
        <div className="relative group/ach-tooltip inline-block overflow-visible">
            {/* Dynamic Pill */}
            <span className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded border uppercase cursor-help select-none bg-slate-950 text-white transition-all duration-300 inline-block ${colorClasses}`}>
                {category.name}
            </span>

            {/* Tooltip */}
            {category.description && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 p-2.5 bg-slate-900 text-slate-300 rounded border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/ach-tooltip:opacity-100 transition-opacity duration-150 text-[11px] leading-normal z-50 text-center normality">
                    <span className="block font-black text-[10px] tracking-wider text-white uppercase mb-1">
                        {category.name}
                    </span>
                    {category.description}
                </div>
            )}
        </div>
    );
}