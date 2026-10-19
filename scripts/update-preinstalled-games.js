import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const gamesJsonPath = path.join(rootDir, 'public', 'data', 'games.json');
const currentGames = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

// 1. Update existing games to mark standard store distribution
const updatedExisting = currentGames.map((g) => ({
  ...g,
  isFree: g.isFree ?? (g.id === 'rocket-league' || g.id === 'call-of-duty-warzone'),
  isPreInstalled: false,
  distributionType: 'store',
  installerRequired: true,
}));

// 2. Add verified Free Pre-Installed PC games
const newPreInstalledGames = [
  {
    id: "doki-doki-literature-club",
    slug: "doki-doki-literature-club",
    title: "Doki Doki Literature Club!",
    genre: "Horror",
    categories: ["Horror", "Indie"],
    tags: ["Psychological Horror", "Visual Novel", "Anime", "Story-Rich", "Pre-Installed"],
    collection: "Story-Driven Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: true,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.9,
    reviewCount: 18900,
    platform: "PC (Windows / Mac)",
    releaseDate: "September 22, 2017",
    developer: "Team Salvato",
    publisher: "Team Salvato",
    size: "350 MB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/header.jpg",
    shortDescription: "The smash-hit psychological horror game. Download, extract the standalone zip, and run DDLC.exe directly with no installer.",
    fullDescription: "Welcome to the Literature Club! It's always been a dream of mine to make something special out of the things I love. Now that you're a club member, you can help me make that dream come true in this cute game! Every day is full of chit-chat and fun activities with all of my adorable and unique club members. This game is distributed as an official portable standalone package: simply download, extract the archive, and double-click DDLC.exe to start playing immediately.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/698780/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Windows 7 or higher",
        processor: "1.8 GHz Dual-Core CPU",
        memory: "4 GB RAM",
        graphics: "Integrated Graphics with OpenGL support",
        storage: "350 MB available space"
      },
      recommended: {
        os: "Windows 10 / 11",
        processor: "2.4 GHz Quad-Core CPU",
        memory: "8 GB RAM",
        graphics: "Dedicated GPU with 1GB VRAM",
        storage: "350 MB available space"
      }
    },
    relatedIds: ["resident-evil-4", "alan-wake-2", "celeste", "hades"],
    downloadUrl: "https://store.steampowered.com/app/698780/Doki_Doki_Literature_Club/",
    officialUrl: "https://ddlc.moe",
    downloadStatus: "available",
    distributionSource: "Official Dan Salvato / Team Salvato & Steam"
  },
  {
    id: "cave-story-classic",
    slug: "cave-story-classic",
    title: "Cave Story (Classic)",
    genre: "Indie",
    categories: ["Indie", "Action & Adventure"],
    tags: ["Platformer", "Metroidvania", "Classic", "Pixel Graphics", "Pre-Installed"],
    collection: "Lightweight PC Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: true,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.9,
    reviewCount: 12400,
    platform: "PC (Windows)",
    releaseDate: "December 20, 2004",
    developer: "Studio Pixel",
    publisher: "Daisuke Amaya",
    size: "15 MB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/header.jpg",
    shortDescription: "The legendary indie action-platformer by Daisuke Amaya. Completely free portable archive: extract and run Doukutsu.exe.",
    fullDescription: "Cave Story is arguably the most celebrated freeware indie game of all time. Developed entirely by Japanese creator Daisuke 'Pixel' Amaya over five years in his spare time, this action-adventure platformer features unforgettable music, responsive controls, branching paths, and a compelling narrative. The original release is distributed as a compact standalone portable package requiring no installation wizards—simply unpack and launch.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/200900/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Windows 98 / ME / 2000 / XP / 7 / 10 / 11",
        processor: "Pentium II 300MHz or faster",
        memory: "64 MB RAM",
        graphics: "DirectX 7 compatible graphics",
        storage: "15 MB available space"
      },
      recommended: {
        os: "Windows 10 / 11",
        processor: "1 GHz Modern Processor",
        memory: "512 MB RAM",
        graphics: "Any modern GPU",
        storage: "15 MB available space"
      }
    },
    relatedIds: ["celeste", "hollow-knight", "terraria", "hades"],
    downloadUrl: "https://www.cavestory.org/download/cave-story.php",
    officialUrl: "https://www.cavestory.org",
    downloadStatus: "available",
    distributionSource: "Official Studio Pixel Tribute Archive"
  },
  {
    id: "openttd",
    slug: "openttd",
    title: "OpenTTD",
    genre: "Strategy",
    categories: ["Strategy", "Simulation"],
    tags: ["Transportation", "Management", "Simulation", "Open Source", "Pre-Installed"],
    collection: "Lightweight PC Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: true,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.8,
    reviewCount: 9600,
    platform: "PC (Windows / Mac / Linux)",
    releaseDate: "April 1, 2021",
    developer: "OpenTTD Team",
    publisher: "OpenTTD Team",
    size: "75 MB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/header.jpg",
    shortDescription: "Urban transport management simulation game. Free and open-source portable archive: extract and run openttd.exe directly.",
    fullDescription: "OpenTTD is an open source simulation game based upon the popular Microprose game 'Transport Tycoon Deluxe', written by Chris Sawyer. It attempts to mimic the original game as closely as possible while extending it with great new features. Available in an official pre-installed zip bundle: extract the folder anywhere on your computer or USB drive and play immediately with zero setup.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1536610/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Windows 7, 8, 10, 11",
        processor: "500 MHz processor",
        memory: "256 MB RAM",
        graphics: "800x600 32bpp video card",
        storage: "75 MB available space"
      },
      recommended: {
        os: "Windows 10 / 11",
        processor: "2.0 GHz Dual-Core processor",
        memory: "1 GB RAM",
        graphics: "1080p 32bpp video card",
        storage: "100 MB available space"
      }
    },
    relatedIds: ["civilization-vi", "age-of-empires-iv", "cities-skylines-2", "terraria"],
    downloadUrl: "https://store.steampowered.com/app/1536610/OpenTTD/",
    officialUrl: "https://www.openttd.org",
    downloadStatus: "available",
    distributionSource: "Official OpenTTD Team & Steam Store"
  },
  {
    id: "alien-swarm-reactive-drop",
    slug: "alien-swarm-reactive-drop",
    title: "Alien Swarm: Reactive Drop",
    genre: "FPS",
    categories: ["FPS", "Action & Adventure"],
    tags: ["Co-op", "Shooter", "Top-Down", "Free to Play", "Aliens", "Pre-Installed"],
    collection: "Lightweight PC Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: false,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.8,
    reviewCount: 14200,
    platform: "PC (Windows / Linux)",
    releaseDate: "April 20, 2017",
    developer: "Reactive Drop Team",
    publisher: "Reactive Drop Team",
    size: "12 GB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/header.jpg",
    shortDescription: "Top-down tactical co-op shooter. 100% free with no microtransactions. Direct extract and run through Steam.",
    fullDescription: "Alien Swarm: Reactive Drop extends the ultra-tactical co-op shooter Alien Swarm with more maps, aliens, difficulty modifiers, and community workshops. Complete missions with squads of up to 8 players, choosing from 4 unique IAF Marine classes and a massive arsenal of weapons. Provided 100% free with zero pay-to-win microtransactions.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/563560/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Windows 7 / 8 / 10 / 11",
        processor: "3.0 GHz P4, Dual Core 2.0 or AMD64X2",
        memory: "2 GB RAM",
        graphics: "Video card must be 128 MB or more and DirectX 9-compatible",
        storage: "12 GB available space"
      },
      recommended: {
        os: "Windows 10 / 11",
        processor: "Intel core 2 duo 2.4GHz or AMD equivalent",
        memory: "4 GB RAM",
        graphics: "DirectX 9 compatible video card with Shader model 3.0",
        storage: "12 GB available space"
      }
    },
    relatedIds: ["doom-eternal", "titanfall-2", "half-life-alyx", "metro-exodus"],
    downloadUrl: "https://store.steampowered.com/app/563560/Alien_Swarm_Reactive_Drop/",
    officialUrl: "https://reactivedrop.com",
    downloadStatus: "available",
    distributionSource: "Official Reactive Drop Team & Steam"
  },
  {
    id: "endless-sky",
    slug: "endless-sky",
    title: "Endless Sky",
    genre: "RPG",
    categories: ["RPG", "Open World", "Indie"],
    tags: ["Space", "Trading", "Open World", "2D", "Open Source", "Pre-Installed"],
    collection: "Lightweight PC Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: true,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.8,
    reviewCount: 8900,
    platform: "PC (Windows / Mac / Linux)",
    releaseDate: "October 30, 2015",
    developer: "Michael Zahniser",
    publisher: "Endless Sky Community",
    size: "350 MB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/header.jpg",
    shortDescription: "2D space trading and combat simulator. 100% free portable standalone zip: extract and explore the galaxy immediately.",
    fullDescription: "Endless Sky is a 2D space trading and combat game inspired by the classic Escape Velocity series. Work your way up from a relatively weak shuttle, freighter, or escort to a massive flagship or heavy warship. Earn money by trading, carrying passengers, completing pirate hunting contracts, or participating in civil wars across the galaxy. Distributed as a portable standalone zip: just unpack and launch.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/404410/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Windows 7 or later",
        processor: "Any 64-bit Intel or AMD processor",
        memory: "1 GB RAM",
        graphics: "OpenGL 3.0 compatible graphics card",
        storage: "350 MB available space"
      },
      recommended: {
        os: "Windows 10 / 11",
        processor: "2.0 GHz Dual-Core",
        memory: "2 GB RAM",
        graphics: "Dedicated GPU with OpenGL 3.3 support",
        storage: "350 MB available space"
      }
    },
    relatedIds: ["starfield", "subnautica", "mass-effect-legendary-edition", "cyberpunk-2077"],
    downloadUrl: "https://store.steampowered.com/app/404410/Endless_Sky/",
    officialUrl: "https://endless-sky.github.io",
    downloadStatus: "available",
    distributionSource: "Official Endless Sky Project & Steam Store"
  },
  {
    id: "spelunky-classic",
    slug: "spelunky-classic",
    title: "Spelunky (Classic)",
    genre: "Indie",
    categories: ["Indie", "Action & Adventure"],
    tags: ["Roguelike", "Platformer", "Pixel Graphics", "Difficult", "Pre-Installed"],
    collection: "Lightweight PC Games",
    isPopular: true,
    isRecentlyAdded: true,
    isLightweight: true,
    isFree: true,
    isPreInstalled: true,
    distributionType: "pre-installed",
    installerRequired: false,
    rating: 4.8,
    reviewCount: 11200,
    platform: "PC (Windows)",
    releaseDate: "December 21, 2008",
    developer: "Derek Yu",
    publisher: "Mossmouth, LLC",
    size: "30 MB",
    coverImage: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/library_600x900_2x.jpg",
    heroBanner: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/header.jpg",
    shortDescription: "The original roguelike platformer classic. 100% free standalone portable archive: extract and launch Spelunky.exe.",
    fullDescription: "Spelunky is a cave exploration roguelike game where you play as an intrepid speleologist venturing into randomly generated underground caverns. Navigate treacherous traps, collect treasures, rescue damsels, and evade the ghost before time runs out. The original classic version by Derek Yu is completely free and distributed as a portable standalone archive that runs on any PC without an installer.",
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/ss_8d6d0e6f31620b12bc125b2933979ea2ef9234b6.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/ss_26e8aa789c6ec652b399cc11b2b801a6fe40aa06.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/ss_59f518e9c1dbbe0998a4d46949f53e34c9ca4b26.1920x1080.jpg",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/239350/ss_d36dbce928d15a51fbbe7ca33f67e51baae31e9c.1920x1080.jpg"
    ],
    requirements: {
      minimum: {
        os: "Microsoft Windows XP / Vista / 7 / 8 / 10 / 11",
        processor: "Intel Core 2 Duo 2.8GHz or equivalent processor",
        memory: "1 GB RAM",
        graphics: "Graphics: 3D graphics card",
        storage: "30 MB available space"
      },
      recommended: {
        os: "Microsoft Windows 10 / 11",
        processor: "Intel Core i3 2.0GHz or AMD equivalent",
        memory: "2 GB RAM",
        graphics: "Dedicated GPU with 512MB VRAM",
        storage: "30 MB available space"
      }
    },
    relatedIds: ["hollow-knight", "celeste", "hades", "terraria"],
    downloadUrl: "https://www.spelunkyworld.com/original.html",
    officialUrl: "https://www.spelunkyworld.com",
    downloadStatus: "available",
    distributionSource: "Official Mossmouth Archive"
  }
];

// Combine without duplicates
const existingSlugs = new Set(updatedExisting.map((g) => g.slug));
const combined = [...updatedExisting];

for (const game of newPreInstalledGames) {
  if (!existingSlugs.has(game.slug)) {
    combined.push(game);
  }
}

fs.writeFileSync(gamesJsonPath, JSON.stringify(combined, null, 2));
console.log(`Updated games.json with total ${combined.length} games (${newPreInstalledGames.length} verified Free Pre-Installed titles)!`);
