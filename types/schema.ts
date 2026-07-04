// 1. Hover-capable Granular Achievement Tags
export interface AchievementTag {
  id: 
    | 'story-related' | 'missable' | 'skill-required' | 'heavy-grind' 
    | 'rng-dependent' | 'multiplayer-only' | 'dlc-required' 
    | 'stackable' | 'glitched-bugged' | 'collectible' 
    | 'questline-dependent' | 'easter-egg' | 'platinum-equivalent';
  name: string;             // e.g., "Heavy Grind"
  description: string;      // Hover tooltip text detailing the mechanic
  
  // YOUR EXPANDED SEVEN-TIER PALETTE SYSTEM
  themeType: 
    | 'benefit'             // Green (Big player wins/automatic items)
    | 'slight-benefit'      // Teal/Cyan (Fun optional tasks or simple tasks)
    | 'neutral'             // Slate/Gray (Standard gameplay states)
    | 'slight-struggle'     // Amber/Orange (Requires attention, time, or light tracking)
    | 'struggle'            // Deep Red (High skill or painful repetition)
    | 'external-alert';     // Purple (Gated by servers, patches, or paywalls)
    
  tailwindClasses: string;  // Dynamic background/border/text styling classes
}

// 2. Individual Achievement Schema
export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: AchievementTag[];   // Array of custom objects for hover-for-details
  isSecret: boolean;
  notes?: string;           // Optional tips or content warnings from the author
}

// 3. Community & Guide Systems (WIP Ready)
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

// 4. Master Game Schema (Drives Carousels & Page Layouts)
export interface Game {
  // Core Identifiers
  id: string;
  title: string;
  genres: string[];         // Small text categorization under titles
  imageUrl: string;         // Used for carousel/grid cards
  bannerUrl?: string;       // Used for individual game page backdrops
  
  // Homepage Metrics & Sorting Locks
  isNewRelease: boolean;
  weeklyViews: number;      // Higher numbers float games to the popular carousel

  // Raw Completion Variables (Exactly what you requested)
  totalAchievements: number;
  blindPlaythroughHours: number;
  minimumPlaythroughs: number;
  timeTo100PercentBase: number;       // Average completion time
  timeTo100PercentPerfect: number;    // Perfect execution / guide time

  // YOUR REVOLUTIONARY COMPLETION SYSTEMS
  // The primary eye-catching badge + description system
  mainCompletionCategory: {
    label: 
      | 'Easy Completion Farming' | 'All Story-Related' | 'Cozy & Casual Friendly' 
      | 'Farming & Progression Focused' | 'Comprehensive Clean-Up' | 'Highly Cheesable' 
      | 'Will Test Your Patience' | 'Knowledge & Strategy Heavy' | 'Missable Minefield' 
      | 'Skilled Execution Required' | 'Pure Masochism' | 'Extreme Discipline Test'
      | 'Rogue-like Mastery' | 'Cooperative Effort Required' | 'Massive Time Sink' | 'Dead / Broken Completion';
    emoji: string;
    hoverDescription: string;         // Explains the badge details + specific x/10 rating
    numericDifficultyCode: number;    // Hidden until hover state triggers
  };

  // Secondary Experience Flags
  experienceTags: (
    | 'heavy-rng-drops' | 'low-error-margin' | 'speedrun-tactics' 
    | 'permadeath-feature' | 'multiplayer-required' | 'execution-challenge' 
    | 'boss-rush-feature' | 'map-sweeper' | 'secret-heavy' 
    | 'external-wiki-required' | 'victory-run' | 'true-ending-content' 
    | 'satisfying-progression' | 'creative-playstyle' | 'assist-mode-tweakable'
    | 'endgame-heavy'
  )[];

  // The Isaac / Homogeneous Factor
  achievementsAreHomogeneous: boolean; 
  homogeneousLabel?: string;          // Describes grouped/equal weight layouts

  // Content Arrays
  achievements: Achievement[];
  guides: CommunityGuide[];
  comments: UserComment[];
}