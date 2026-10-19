import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const gamesJsonPath = path.join(rootDir, 'public', 'data', 'games.json');
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

const pages = [
  {
    file: 'games.html',
    title: 'Explore All Games - Gaming Dock',
    description: 'Discover and browse 50+ curated PC games with verified system requirements, genres, and official downloads.',
  },
  {
    file: 'categories.html',
    title: 'Game Categories & Collections - Gaming Dock',
    description: 'Browse PC games by genre including Action, RPG, FPS, Racing, Horror, Open World, and curated collections.',
  },
  {
    file: 'about.html',
    title: 'About Gaming Dock - Curated PC Gaming Hub',
    description: 'Learn about Gaming Dock mission, verified technical specifications, and safe authorized game discovery.',
  },
  {
    file: 'contact.html',
    title: 'Contact Us - Gaming Dock',
    description: 'Get in touch with the Gaming Dock team for game requests, broken link reports, and partnership inquiries.',
  },
  {
    file: 'faq.html',
    title: 'Frequently Asked Questions - Gaming Dock',
    description: 'Find answers about PC game requirements, authorized download links, Steam Deck compatibility, and wishlist features.',
  },
  {
    file: 'privacy-policy.html',
    title: 'Privacy Policy - Gaming Dock',
    description: 'Transparent privacy policy detailing local storage usage and zero user data tracking on Gaming Dock.',
  },
  {
    file: 'terms.html',
    title: 'Terms of Service - Gaming Dock',
    description: 'Terms of service and intellectual property disclaimers for Gaming Dock.',
  },
  {
    file: '404.html',
    title: '404 - Level Not Found - Gaming Dock',
    description: 'The requested page or game was not found on Gaming Dock.',
  },
];

function generateHtml(title, description, scriptSrc = '/src/main.tsx') {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF3045'><path d='M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>" />
  </head>
  <body class="bg-[#0b0c10] text-white selection:bg-[#ff3045] selection:text-white">
    <div id="root"></div>
    <script type="module" src="${scriptSrc}"></script>
  </body>
</html>
`;
}

// Write root pages
pages.forEach((p) => {
  const filePath = path.join(rootDir, p.file);
  fs.writeFileSync(filePath, generateHtml(p.title, p.description));
  console.log(`Generated: ${p.file}`);
});

// Ensure games directory exists
const gamesDir = path.join(rootDir, 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

// Generate individual game pages
games.forEach((game) => {
  const fileName = `${game.slug}.html`;
  const filePath = path.join(gamesDir, fileName);
  const title = `${game.title} - PC System Requirements & Download | Gaming Dock`;
  const desc = `Explore ${game.title} on Gaming Dock. Verified PC system specs, screenshots, developer details, and official download links.`;
  fs.writeFileSync(filePath, generateHtml(title, desc));
  console.log(`Generated: games/${fileName}`);
});

console.log('All static pages generated successfully!');
