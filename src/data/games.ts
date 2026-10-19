export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface GameItem {
  id: string;
  slug: string;
  title: string;
  genre: string;
  categories: string[];
  tags: string[];
  collection?: string;
  isPopular: boolean;
  isRecentlyAdded: boolean;
  isLightweight: boolean;
  isFree?: boolean;
  isPreInstalled?: boolean;
  distributionType?: 'pre-installed' | 'installer' | 'store';
  installerRequired?: boolean;
  rating: number;
  reviewCount: number;
  platform: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  size: string;
  coverImage: string;
  heroBanner: string;
  shortDescription: string;
  fullDescription: string;
  screenshots: string[];
  requirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  relatedIds: string[];
  downloadUrl: string;
  officialUrl: string;
  downloadStatus: 'available' | 'unavailable';
  distributionSource: string;
}

import gamesData from '../../public/data/games.json';

export const GAMES: GameItem[] = gamesData as GameItem[];

export const CATEGORIES = [
  'All',
  'Action & Adventure',
  'FPS',
  'Horror',
  'Racing',
  'RPG',
  'Open World',
  'Strategy',
  'Sports',
  'Indie'
];

export const COLLECTIONS = [
  {
    id: 'open-world',
    title: 'Open-World Adventures',
    description: 'Vast immersive worlds with endless exploration, side missions, and secrets.',
    filter: 'Open-World Adventures',
    cover: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg'
  },
  {
    id: 'story-driven',
    title: 'Story-Driven Masterpieces',
    description: 'Unforgettable emotional journeys, rich characters, and award-winning narratives.',
    filter: 'Story-Driven Games',
    cover: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg'
  },
  {
    id: 'racing',
    title: 'Racing Collection',
    description: 'Speed, adrenaline, hypercars, and realistic precision rally handling.',
    filter: 'Racing Collection',
    cover: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg'
  },
  {
    id: 'lightweight',
    title: 'Lightweight PC Games',
    description: 'Incredible titles under 20GB and low system requirements for any laptop or PC.',
    filter: 'Lightweight PC Games',
    cover: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg'
  }
];
