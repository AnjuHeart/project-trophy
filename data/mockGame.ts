// data/mockGame.ts
import { Game } from '../types/schema';

export const mockGames: Game[] = [
  {
    id: 'persona-5-royal',
    title: 'Persona 5 Royal',
    genres: ['JRPG', 'Turn-Based', 'Social Sim'],
    
    // UPDATED: Using the verified 3-asset setup
    assets: {
      thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600',
      cleanWallpaperUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920',
      transparentLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png'
    },
    
    isNewRelease: false,
    weeklyViews: 1250,
    totalAchievements: 53,
    blindPlaythroughHours: 100,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 120,
    timeTo100PercentPerfect: 70,
    
    // UPDATED: Standardized to your exact MainCategoryLabel options
    mainCompletionCategory: {
      label: 'Knowledge & Strategy Heavy',
      numericDifficultyCode: 5,
      description: 'Difficulty 5/10. Combat is completely manageable, but achieving 100% requires strict optimized daily schedule management and social stat planning.'
    },
    
    // UPDATED: Clean lookup IDs instead of copy-pasted text strings
    experienceTags: [
      'low-error-margin',
      'true-ending-content',
      'satisfying-progression'
    ],
    
    achievementsAreHomogeneous: false,
    
    achievements: [
      {
        id: 'p5r-true-ending',
        title: 'The Phenomenal Phantom Thief',
        description: 'Obtained all trophies.',
        isSecret: false,
        tags: [
          { 
            id: 'story-related', 
            name: 'Story Related', 
            description: 'Unlocked naturally through primary campaign tracking.', 
            tailwindClasses: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
          }
        ]
      },
      {
        id: 'p5r-max-confidants',
        title: 'Pure Perfection',
        description: 'Maxed out all Confidants.',
        isSecret: false,
        tags: [
          { 
            id: 'missable', 
            name: 'Missable', 
            description: 'Permanent point-of-no-return risk present.', 
            tailwindClasses: 'bg-rose-950/40 text-rose-400 border-rose-900/50' 
          }
        ]
      }
    ],
    guides: [],
    comments: []
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    genres: ['Farming Sim', 'RPG', 'Cozy'],
    assets: {
      thumbnailUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600',
      cleanWallpaperUrl: 'https://images.unsplash.com/photo-1500627869374-13cd993b1115?q=80&w=1920',
      transparentLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png'
    },
    isNewRelease: false,
    weeklyViews: 980,
    totalAchievements: 40,
    blindPlaythroughHours: 50,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 150,
    timeTo100PercentPerfect: 90,
    mainCompletionCategory: {
      label: 'Farming & Progression Focused',
      numericDifficultyCode: 6,
      description: 'Difficulty 6/10. Requires profound layout dedication, massive crop rotation automation metrics, and luck-heavy arcade challenge completions.'
    },
    experienceTags: [
      'heavy-rng-drops',
      'map-sweeper',
      'satisfying-progression'
    ],
    achievementsAreHomogeneous: false,
    achievements: [
      {
        id: 'sv-craft-master',
        title: 'Craft Master',
        description: 'Craft every item.',
        isSecret: false,
        tags: [
          { id: 'collectible', name: 'Collectible', description: 'Requires hunting down every single item variant.', tailwindClasses: 'bg-amber-950/40 text-amber-400 border-amber-900/50' },
          { id: 'heavy-grind', name: 'Heavy Grind', description: 'Requires intensive loop repetition.', tailwindClasses: 'bg-rose-950/40 text-rose-400 border-rose-900/50' }
        ]
      }
    ],
    guides: [],
    comments: []
  },
  {
    id: 'a-little-to-the-left',
    title: 'A Little to the Left',
    genres: ['Puzzle', 'Casual', 'Cozy'],
    assets: {
      thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600',
      cleanWallpaperUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1920',
      transparentLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png'
    },
    isNewRelease: true,
    weeklyViews: 2100,
    totalAchievements: 61,
    blindPlaythroughHours: 4,
    minimumPlaythroughs: 1,
    timeTo100PercentBase: 12,
    timeTo100PercentPerfect: 8,
    mainCompletionCategory: {
      label: 'Cozy & Casual Friendly',
      numericDifficultyCode: 2,
      description: 'Difficulty 2/10. Relaxing, straightforward puzzle logic. A guide can be easily used to clear alternative solutions without timing penalties.'
    },
    experienceTags: [
      'creative-playstyle',
      'satisfying-progression'
    ],
    achievementsAreHomogeneous: true,
    homogeneousLabel: 'All Puzzles Equal Weight',
    achievements: [
      {
        id: 'altl-base',
        title: 'As Clean As A Whistle',
        description: 'Complete all base puzzles.',
        isSecret: false,
        tags: [
          { id: 'story-related', name: 'Story Related', description: 'Unlocked naturally through primary campaign tracking.', tailwindClasses: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' }
        ]
      }
    ],
    guides: [],
    comments: []
  }
];