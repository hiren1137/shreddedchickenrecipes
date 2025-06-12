# 🍗 Shredded Chicken Recipes

A server-side rendered recipe blog built with Next.js 14, featuring delicious chicken recipes with SEO-optimized URLs and fast loading times.

## ✨ Features

- **Server-Side Rendering (SSR)** - Every page renders on the server for optimal SEO and performance
- **SEO-Friendly URLs** - Clean URLs like `/easy-butter-chicken-recipe`
- **Self-Canonical Links** - Proper canonical URLs for search engines
- **MDX Content** - Easy content management with `.mdx` files
- **Minimal JavaScript** - Fast loading with minimal client-side code
- **Beautiful Design** - Modern, responsive design with Tailwind CSS
- **Image Optimization** - Next.js Image component for optimal loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shreddedchickenrecipes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── content/recipes/     # Recipe MDX files
├── lib/                # Utility functions
├── pages/              # Next.js pages
│   ├── _app.tsx        # App component
│   ├── index.tsx       # Homepage
│   ├── [slug].tsx      # Dynamic recipe pages
│   └── 404.tsx         # Custom 404 page
├── styles/             # Global CSS
└── public/             # Static assets
```

## 📝 Adding New Recipes

To add a new recipe, create a new `.mdx` file in the `content/recipes/` directory:

```markdown
---
title: "Your Recipe Title"
description: "Brief description of your recipe"
cookTime: "30 minutes"
servings: 4
difficulty: "Easy"
image: "https://example.com/image.jpg"
tags: ["chicken", "easy", "healthy"]
publishedAt: "2024-01-15"
---

# Your Recipe Title

Your recipe content goes here using Markdown formatting...

## Ingredients
- Ingredient 1
- Ingredient 2

## Instructions
1. Step 1
2. Step 2
```

The filename (without `.mdx`) becomes the URL slug. For example:
- `easy-butter-chicken-recipe.mdx` → `/easy-butter-chicken-recipe`

## 🛠 Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Content:** MDX with gray-matter
- **Rendering:** next-mdx-remote with remark-gfm

## 🔧 Configuration

### Image Domains
Images from DashScope are pre-configured in `next.config.js`. To add more domains:

```javascript
module.exports = {
  images: {
    domains: ['your-domain.com', 'another-domain.com'],
  },
}
```

### Styling
Tailwind CSS is configured with the typography plugin for beautiful prose styling. Customize in `tailwind.config.js`.

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

This project is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Any Node.js hosting platform**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 📈 SEO Features

- Server-side rendering for all pages
- Canonical URLs on every page
- Open Graph and Twitter Card meta tags
- Semantic HTML structure
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your recipe or improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

## 🚀 Roll-out checklist

### 1  Push code to GitHub
```bash
git init
git add .
git commit -m "feat: initial scaffold"
git remote add origin git@github.com:<YOUR-USER>/shreddedchickenrecipes.git
git push -u origin main
```

## Quick start  
1. `pnpm install`  
2. `cp .env.example .env.local` – edit `SITE_BASE_URL` if needed  
3. `pnpm dev` → open <http://localhost:3000>  
4. Add new recipes by dropping `.mdx` files into `content/recipes/`.  
## Build & run in production  
`pnpm build && pnpm start`  
## Deployment  
Push to GitHub, connect to Vercel, add env-vars, done. 