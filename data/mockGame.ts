import { Game, AchievementTag } from '../types/schema';

// Helper Database of Achievement Tags to keep your code clean and dry
export const MASTER_TAGS: Record<string, AchievementTag> = {
  storyRelated: {
    id: 'story-related',
    name: 'Story Related',
    description: 'Unlocks automatically via main campaign progression. Cannot be missed.',
    themeType: 'benefit',
    tailwindClasses: 'bg-emerald-950/50 text-emerald-400 border-emerald-800/60'
  },
  stackable: {
    id: 'stackable',
    name: 'Stackable',
    description: 'Beating the game on higher difficulties or strict settings will trigger lower difficulty trophies simultaneously.',
    themeType: 'benefit',
    tailwindClasses: 'bg-teal-950/50 text-teal-400 border-teal-800/60'
  },
  easterEgg: {
    id: 'easter-egg',
    name: 'Easter Egg',
    description: 'Unlocked by performing hidden, unusual, or joke actions.',
    themeType: 'slight-benefit',
    tailwindClasses: 'bg-cyan-950/50 text-cyan-400 border-cyan-800/60'
  },
  collectible: {
    id: 'collectible',
    name: 'Collectible',
    description: 'Requires tracking down hidden files, lore logs, chests, or environmental landmarks.',
    themeType: 'slight-struggle',
    tailwindClasses: 'bg-amber-950/50 text-amber-400 border-amber-800/60'
  },
  missable: {
    id: 'missable',
    name: 'Missable',
    description: 'Can be permanently locked out in a single playthrough due to specific timeline choices or failures.',
    themeType: 'struggle',
    tailwindClasses: 'bg-red-950/50 text-red-400 border-red-900/60'
  },
  heavyGrind: {
    id: 'heavy-grind',
    name: 'Heavy Grind',
    description: 'Requires extensive, repetitive task farming or resource dumpings.',
    themeType: 'struggle',
    tailwindClasses: 'bg-rose-950/50 text-rose-400 border-rose-900/60'
  }
};

// The Master Mock Games Database Matrix
export const mockGames: Game[] = [
  {
    id: 'persona-5-royal',
    title: 'Persona 5 Royal',
    genres: ['JRPG', 'Turn-Based', 'Social Sim'],
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60', // Placeholder layout image
    isNewRelease: false,
    weeklyViews: 12450,
    totalAchievements: 53,
    blindPlaythroughHours: 100,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 120,
    timeTo100PercentPerfect: 70, // Optimized walkthrough speed
    mainCompletionCategory: {
      label: 'Knowledge & Strategy Heavy',
      emoji: '🧠',
      hoverDescription: 'Difficulty 5/10. Combat is completely manageable, but achieving 100% requires strict optimized daily schedule management and social stat planning.',
      numericDifficultyCode: 5
    },
    experienceTags: ['low-error-margin', 'true-ending-content', 'satisfying-progression'],
    achievementsAreHomogeneous: false,
    achievements: [
      {
        id: 'p5r-true-phantom',
        title: 'The Phenomenal Phantom Thief',
        description: 'Obtained all trophies.',
        tags: [MASTER_TAGS.storyRelated],
        isSecret: false
      },
      {
        id: 'p5r-max-coop',
        title: 'Pure Perfection',
        description: 'Maxed out all Confidants.',
        tags: [MASTER_TAGS.missable],
        isSecret: true,
        notes: 'Highly vulnerable to time-management mistakes. Missing the November deadline completely ruins the playthrough.'
      }
    ],
    guides: [],
    comments: []
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    genres: ['Farming Sim', 'RPG', 'Cozy'],
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60',
    isNewRelease: false,
    weeklyViews: 9800,
    totalAchievements: 40,
    blindPlaythroughHours: 50,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 150,
    timeTo100PercentPerfect: 90,
    mainCompletionCategory: {
      label: 'Farming & Progression Focused',
      emoji: '🧑‍🌾',
      hoverDescription: 'Difficulty 5/10. A therapeutic but massive systemic journey. Zero mechanical reflection tests, but demands total mastery over seasonal cycles and processing lines.',
      numericDifficultyCode: 5
    },
    experienceTags: ['endgame-heavy', 'heavy-rng-drops', 'external-wiki-required'],
    achievementsAreHomogeneous: false,
    achievements: [
      {
        id: 'sdv-master-craft',
        title: 'Craft Master',
        description: 'Craft every item.',
        tags: [MASTER_TAGS.collectible, MASTER_TAGS.heavyGrind],
        isSecret: false,
        notes: 'Requires specific recipe items exclusively bought from rotating seasonal merchant inventories.'
      }
    ],
    guides: [],
    comments: []
  },
  {
    id: 'a-little-to-the-left',
    title: 'A Little to the Left',
    genres: ['Puzzle', 'Cozy', 'Casual'],
    imageUrl: 'https://images.unsplash.com/photo-1541689221361-ad95007aa51c?w=500&auto=format&fit=crop&q=60',
    isNewRelease: false,
    weeklyViews: 5400,
    totalAchievements: 61, // Includes full DLC stacks
    blindPlaythroughHours: 4,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 12,
    timeTo100PercentPerfect: 8,
    mainCompletionCategory: {
      label: 'Cozy & Casual Friendly',
      emoji: '☕',
      hoverDescription: 'Difficulty 2/10. Delightful organization and sorting puzzles. No penalty timers, failure screens, or mechanical walls. Pure peaceful scrubbing.',
      numericDifficultyCode: 2
    },
    experienceTags: ['victory-run', 'assist-mode-tweakable', 'creative-playstyle'],
    achievementsAreHomogeneous: false,
    achievements: [
      {
        id: 'altl-tidy',
        title: 'As Clean As A Whistle',
        description: 'Complete all base puzzles.',
        tags: [MASTER_TAGS.storyRelated],
        isSecret: false
      }
    ],
    guides: [],
    comments: []
  }
];