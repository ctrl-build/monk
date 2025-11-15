# Monk – A Studio for Intentional Web Design & Development

This is a [Next.js](https://nextjs.org) project built for Cloudflare Pages deployment.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Cloudflare Pages

To build the project for Cloudflare Pages:

```bash
npm run build:cloudflare
```

This will:
1. Build the Next.js application
2. Convert it to Cloudflare Pages format using `@cloudflare/next-on-pages`

## Deploying to Cloudflare Pages

### Option 1: Via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Create a new project
3. Connect your Git repository
4. Set build settings:
   - **Build command:** `npm run build:cloudflare`
   - **Build output directory:** `.vercel/output/static`
   - **Node version:** `20` or higher

### Option 2: Via Wrangler CLI

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Build the project:
   ```bash
   npm run build:cloudflare
   ```

3. Deploy:
   ```bash
   npx wrangler pages deploy .vercel/output/static
   ```

### Option 3: Preview Locally

To preview the Cloudflare Pages build locally:

```bash
npm run build:cloudflare
npm run preview
```

## Project Structure

- `app/` - Next.js App Router pages and components
- `public/` - Static assets (images, fonts, videos)
- `wrangler.toml` - Cloudflare Pages configuration
- `.cloudflare/` - Cloudflare-specific Next.js configuration

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
