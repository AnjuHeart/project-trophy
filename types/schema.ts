// types/schema.ts

// ==========================================
// 1. GRANULAR ACHIEVEMENT TAGS (Color-neutral references)
// ==========================================
export type AchievementTagId =
  | 'story-related' | 'missable' | 'skill-required' | 'heavy-grind'
  | 'rng-dependent' | 'multiplayer-only' | 'dlc-required'
  | 'stackable' | 'glitched-bugged' | 'collectible'
  | 'questline-dependent' | 'easter-egg' | 'platinum-equivalent';

export interface AchievementTag {
    id: AchievementTagId;
    name: string;             // e.g., "Heavy Grind"
    description: string;      // Hover tooltip text detailing the mechanic
    tailwindClasses: string;  // Handles colors directly (themeType was removed)
}

// ==========================================
// 2. SECONDARY EXPERIENCE FLAGS (Color-Neutral Lookup IDs)
// ==========================================
export type ExperienceTagId =
  | 'heavy-rng-drops' | 'low-error-margin' | 'speedrun-tactics'
  | 'permadeath-feature' | 'multiplayer-required' | 'execution-challenge'
  | 'boss-rush-feature' | 'map-sweeper' | 'secret-heavy'
  | 'external-wiki-required' | 'victory-run' | 'true-ending-content'
  | 'satisfying-progression' | 'creative-playstyle' | 'assist-mode-tweakable'
  | 'endgame-heavy';

// ==========================================
// 3. INDIVIDUAL ACHIEVEMENT SCHEMA
// ==========================================
export interface Achievement {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    tags: AchievementTag[];   // Array of custom objects for granular hover-for-details
    isSecret: boolean;
    notes?: string;           // Optional tips or content warnings from the author
}

// ==========================================
// 4. COMMUNITY, RECOGNITION, & DIALOGUE SYSTEMS
// ==========================================
export interface GuideChapter {
    title: string;
    content: string;          // Full Markdown text support
}

export interface CommunityGuide {
    id: string;
    author: string;
    datePosted: string;
    thumbsUp: number;
    chapters: GuideChapter[];
}

export interface UserComment {
    id: string;
    username: string;
    avatarUrl?: string;
    text: string;
    datePosted: string;
    likes: number;
}

export interface HallOfFameEntry {
    gameId: string;           // Must map exactly to the game's unique ID
    badge: 'Famously Difficult' | 'Praised Accomplishment' | 'Community Masterpiece' | 'Perfect Architecture' | 'Satisfying Loop';
    reasoning: string;
}

// ==========================================
// 5. MASTER GAME SCHEMA
// ==========================================
export type MainCategoryLabel =
  | 'Easy Completion Farming' | 'All Story-Related' | 'Cozy & Casual Friendly'
  | 'Farming & Progression Focused' | 'Comprehensive Clean-Up' | 'Highly Cheesable'
  | 'Will Test Your Patience' | 'Knowledge & Strategy Heavy' | 'Missable Minefield'
  | 'Skilled Execution Required' | 'Pure Masochism' | 'Extreme Discipline Test'
  | 'Rogue-like Mastery' | 'Cooperative Effort Required' | 'Massive Time Sink' | 'Dead / Broken Completion';

export interface Game {
    // Core Identifiers
    id: string;
    title: string;
    genres: string[];         // Small text categorization under titles

    // Clean 3-Asset Infrastructure for consistent cross-page layout states
    assets: {
        thumbnailUrl: string;       // Used for homepage layout cards & search listings
        cleanWallpaperUrl: string;   // Used for individual game page backdrops
        transparentLogoUrl: string;  // Used for layered, scrolling title banners
    };

    // Homepage Metrics & Sorting Locks
    isNewRelease: boolean;
    weeklyViews: number;      // Higher numbers float games to the popular carousel

    // Raw Completion Variables
    totalAchievements: number;
    blindPlaythroughHours: number;
    minimumPlaythroughs: number;
    timeTo100PercentBase: number;       // Average completion time
    timeTo100PercentPerfect: number;    // Perfect execution / guide time

    // INTRINSIC MAIN CATEGORY COMPLETION SYSTEM
    mainCompletionCategory: {
        label: MainCategoryLabel;       // Used to reference the global static gradient dictionary map
        numericDifficultyCode: number;  // Displayed openly alongside text string calculations
        description: string;            // Custom tailored dynamic text details unique per game
    };

    // Secondary Experience Flags optimized to static string lookup array keys
    experienceTags: ExperienceTagId[];

    // The Isaac / Homogeneous Factor
    achievementsAreHomogeneous: boolean;
    homogeneousLabel?: string;          // Describes grouped/equal weight layouts

    // Content Arrays
    achievements: Achievement[];
    guides: CommunityGuide[];
    comments: UserComment[];
}

// ==========================================
// 6. GLOBAL STATIC DICTIONARIES
// ==========================================
export interface MainCategoryConfig {
  emoji: string;
  // Two explicit style states to give you perfect control over resting vs hover brightness
  bgGradient: string;    
  hoverGradient: string; 
}

export const MAIN_CATEGORY_REGISTRY: Record<MainCategoryLabel, MainCategoryConfig> = {
  'Easy Completion Farming': {
    emoji: '🚜',
    bgGradient: 'from-emerald-700 via-emerald-600 to-teal-600 text-white',
    hoverGradient: 'hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500'
  },
  'All Story-Related': {
    emoji: '📖',
    bgGradient: 'from-blue-700 via-blue-600 to-cyan-600 text-white',
    hoverGradient: 'hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500'
  },
  'Cozy & Casual Friendly': {
    emoji: '☕',
    bgGradient: 'from-teal-600 via-teal-500 to-emerald-500 text-white',
    hoverGradient: 'hover:from-teal-500 hover:via-teal-400 hover:to-emerald-400'
  },
  'Farming & Progression Focused': {
    emoji: '🌾',
    // FIXED CONTRAST: Shifting from flat amber to deep amber/vivid gold gradient layers
    bgGradient: 'from-amber-700 via-amber-600 to-yellow-500 text-white',
    hoverGradient: 'hover:from-amber-600 hover:via-amber-500 hover:to-yellow-400'
  },
  'Comprehensive Clean-Up': {
    emoji: '🧹',
    bgGradient: 'from-indigo-700 via-indigo-600 to-blue-600 text-white',
    hoverGradient: 'hover:from-indigo-600 hover:via-indigo-500 hover:to-blue-500'
  },
  'Highly Cheesable': {
    emoji: '🧀',
    bgGradient: 'from-yellow-600 via-yellow-500 to-orange-500 text-slate-950',
    hoverGradient: 'hover:from-yellow-500 hover:via-yellow-400 hover:to-orange-400'
  },
  'Will Test Your Patience': {
    emoji: '⏳',
    bgGradient: 'from-orange-700 via-orange-600 to-red-600 text-white',
    hoverGradient: 'hover:from-orange-600 hover:via-orange-500 hover:to-red-500'
  },
  'Knowledge & Strategy Heavy': {
    emoji: '🧠',
    // FIXED CONTRAST: Shifting from dark flat purple to an intense magenta-violet sweep
    bgGradient: 'from-purple-700 via-purple-600 to-fuchsia-600 text-white',
    hoverGradient: 'hover:from-purple-650 hover:via-purple-550 hover:to-fuchsia-550'
  },
  'Missable Minefield': {
    emoji: '💣',
    bgGradient: 'from-red-700 via-red-600 to-orange-600 text-white',
    hoverGradient: 'hover:from-red-600 hover:via-red-500 hover:to-orange-500'
  },
  'Skilled Execution Required': {
    emoji: '🎯',
    bgGradient: 'from-fuchsia-700 via-fuchsia-600 to-pink-500 text-white',
    hoverGradient: 'hover:from-fuchsia-600 hover:via-fuchsia-500 hover:to-pink-400'
  },
  'Pure Masochism': {
    emoji: '💀',
    bgGradient: 'from-slate-900 via-zinc-800 to-red-950 text-red-400 border border-red-900/40',
    hoverGradient: 'hover:from-slate-800 hover:via-zinc-700 hover:to-red-900'
  },
  'Extreme Discipline Test': {
    emoji: '🧎',
    bgGradient: 'from-violet-700 via-violet-600 to-purple-700 text-white',
    hoverGradient: 'hover:from-violet-600 hover:via-violet-500 hover:to-purple-600'
  },
  'Rogue-like Mastery': {
    emoji: '🔄',
    bgGradient: 'from-rose-700 via-rose-600 to-red-600 text-white',
    hoverGradient: 'hover:from-rose-600 hover:via-rose-500 hover:to-red-500'
  },
  'Cooperative Effort Required': {
    emoji: '🤝',
    bgGradient: 'from-sky-700 via-sky-600 to-blue-600 text-white',
    hoverGradient: 'hover:from-sky-600 hover:via-sky-500 hover:to-blue-500'
  },
  'Massive Time Sink': {
    emoji: '🕳️',
    bgGradient: 'from-stone-800 via-stone-700 to-neutral-900 text-stone-300 border border-stone-800',
    hoverGradient: 'hover:from-stone-700 hover:via-stone-600 hover:to-neutral-800'
  },
  'Dead / Broken Completion': {
    emoji: '⚠️',
    bgGradient: 'from-zinc-800 to-neutral-950 text-zinc-400 border border-zinc-700',
    hoverGradient: 'hover:border-zinc-500'
  }
};

export interface ExperienceTagConfig {
  name: string;
  description: string;
}

export const EXPERIENCE_TAG_REGISTRY: Record<ExperienceTagId, ExperienceTagConfig> = {
  'heavy-rng-drops': {
    name: 'Heavy RNG Drops',
    description: 'Requires grinding low-percentage item drops governed entirely by random drop rate algorithms.'
  },
  'low-error-margin': {
    name: 'Low Error Margin',
    description: 'A single misstep, missed dialogue prompt, or failed save state can lock you out of the 100% completion pathway entirely.'
  },
  'speedrun-tactics': {
    name: 'Speedrun Tactics',
    description: 'Demands completing sections or the entire campaign layout within strict, aggressive real-world time limits.'
  },
  'permadeath-feature': {
    name: 'Permadeath Feature',
    description: 'Losing your health bar completely wipes your current save registry file, forcing a total run restart.'
  },
  'multiplayer-required': {
    name: 'Multiplayer Required',
    description: 'Earning these items requires matching into active matchmaking servers or coordinating external lobby squads.'
  },
  'execution-challenge': {
    name: 'Execution Challenge',
    description: 'Demands precise input execution, frame-perfect mechanical response windows, or flawless boss mastery.'
  },
  'boss-rush-feature': {
    name: 'Boss Rush Feature',
    description: 'Requires defeating multiple major campaign targets consecutively without mid-stage checkpoint saves.'
  },
  'map-sweeper': {
    name: 'Map Sweeper',
    description: 'Requires revealing 100% of sub-map geometry fog or hunting down extensive hidden node tracking variables.'
  },
  'secret-heavy': {
    name: 'Secret Heavy',
    description: 'Crucial achievement triggers are hidden behind invisible walls, un-hinted environment actions, or structural puzzles.'
  },
  'external-wiki-required': {
    name: 'External Wiki Required',
    description: 'The internal game systems do not present enough tracking data; external community maps and reference sheets are mandatory.'
  },
  'victory-run': {
    name: 'Victory Run',
    description: 'Unlocked automatically upon securing final victory over the primary campaign layout.'
  },
  'true-ending-content': {
    name: 'True Ending Content',
    description: 'Requires fulfilling obscure narrative prerequisites to unlock hidden post-credits completion flags.'
  },
  'satisfying-progression': {
    name: 'Satisfying Progression',
    description: 'Achievements map smoothly to natural power growth tracking systems with zero artificial time-gated blocks.'
  },
  'creative-playstyle': {
    name: 'Creative Playstyle',
    description: 'Forces the player to completely abandon standard setups and clear combat scenarios using highly bizarre rules or weapon limits.'
  },
  'assist-mode-tweakable': {
    name: 'Assist Mode Tweakable',
    description: 'Difficulty can be safely bypassed using native accessibility toggles without locking achievement collection state.'
  },
  'endgame-heavy': {
    name: 'Endgame Heavy',
    description: 'The majority of your tracking metrics can only be engaged after finishing the primary campaign loop.'
  }
};