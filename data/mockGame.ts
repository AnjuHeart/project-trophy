// data/mockGame.ts
import { Game } from '../types/schema';

export const mockGames: Game[] = [
  {
    id: 'persona-5-royal',
    title: 'Persona 5 Royal',
    genres: ['JRPG', 'Turn-Based', 'Social Sim'],

    // UPDATED: Using the verified 3-asset setup
    assets: {
      thumbnailUrl: 'https://thethirstymage.com/wp-content/uploads/2020/06/persona5royal.jpg',
      cleanWallpaperUrl: 'https://images.alphacoders.com/137/1370594.jpeg',
      transparentLogoUrl: 'https://cdn2.steamgriddb.com/logo/ba038e2a20ded4a1d146841e6ed42f22.png'
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
    comments: [],
    completionOverview: 'A massive, narrative-driven mountain that demands absolute time optimization. While the Royal edition is significantly more forgiving than the vanilla base game—allowing a single-playthrough Platinum if you rigorously manage your daily time-slots with a strict calendar schedule—hitting true 100% database completion requires entering New Game Plus. Maximizing all phantom thief attributes, maxing out every social confidant link, tracking down missable calendar-locked requests, and defeating exclusive hidden endgame superbosses means setting aside a massive 120 to 140+ hour commitment.'
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    genres: ['Farming Sim', 'RPG', 'Cozy'],
    assets: {
      thumbnailUrl: 'https://images4.alphacoders.com/782/782781.png',
      cleanWallpaperUrl: 'https://image.api.playstation.com/cdn/UP2456/CUSA06840_00/FREE_CONTENTibBzhaWYsWyQGvkzHDol/PREVIEW_SCREENSHOT2_130501.jpg',
      transparentLogoUrl: 'https://cdn10.idcgames.com/storage/image/1149/stardew-valley-logo/default.png'
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
    comments: [],
    completionOverview: 'The ultimate test of structural micro-management and thorough planning. Reaching 100% "True Perfection" transforms a laid-back farming simulator into a rigid, spreadsheets-required operation. You must ship every crop, catch all legendary seasonal weather-locked fish, master every cooking/crafting recipe, and grind out a massive 13 million gold to buy endgame structures like the Golden Clock. One single missed crop or missing birthday gift can set your progression timeline back by an entire in-game calendar year, making a checklist mandatory.'
  },
  {
    id: 'a-little-to-the-left',
    title: 'A Little to the Left',
    genres: ['Puzzle', 'Casual', 'Cozy'],
    assets: {
      thumbnailUrl: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000051361/256bd3ebd32d472158a53f95206f55f566f1253dc472f3dc3967be31214816d8',
      cleanWallpaperUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202405/0110/69804e105b9b215b250311f46dbe78ea726a68f6a80c6a25.jpg',
      transparentLogoUrl: 'https://cdn.xsolla.net/image-proxy/rs:fit:3840:0/f:webp/storage/merchant-bucket-prod/files/uploaded/sitebuilder/264059/ad8e9ea92d6b1d3b351d7f6f8c422f0d.png'
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
    comments: [],
    completionOverview: "Don't let the cozy aesthetic fool you; achieving 100% completion is an absolute chore. While the base puzzles are relaxing, the platinum track requires you to complete 100 separate, unique 'Daily Tidy' challenges. Because these are real-time, calendar-locked events, you are forced to either load up the game every single day for over three months straight or tedious clock-cheat your system settings back and forth. Combined with clearing every single alternative solution across all DLC packages, a brief casual puzzle title turns into a rigid, repetitive daily obligation."
  }
];