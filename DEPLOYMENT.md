# Deployment Guide

This guide covers deploying Kid Friendly Flagstaff to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Git repository with the project code

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button above
2. Connect your Git repository
3. Vercel will automatically detect Next.js and configure the build

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Option 3: Git Integration

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects settings and deploys

## Build Configuration

The project uses these default settings (auto-detected by Vercel):

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

## Environment Variables

No environment variables are required for the MVP version.

For future features, you may need:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL |
| `DATABASE_URL` | Database connection string (future) |

## Custom Domain

1. Go to your project in Vercel Dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS as instructed by Vercel

## Build Output

The production build generates:

- **Static Pages**: Homepage, category pages pre-rendered at build time
- **Dynamic Pages**: Activity detail pages generated via `generateStaticParams`
- **API Routes**: Newsletter signup endpoint (serverless function)

## Monitoring

Vercel provides built-in analytics and monitoring:

- **Analytics**: View page views and performance metrics
- **Web Vitals**: Core Web Vitals tracking
- **Logs**: Function logs for API routes

Enable Analytics in your Vercel project settings.

## Troubleshooting

### Build Failures

1. Check the build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to reproduce errors

### Missing Data

If activities don't appear:
1. Verify JSON files exist in `data/activities/`
2. Check file paths in `src/lib/data.ts`

### Slow Build Times

- Next.js caches builds automatically
- Consider using [Build Cache](https://vercel.com/docs/concepts/deployments/build-step#build-cache)

## Security Headers

For production, consider adding security headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

## Performance Optimization

The project is optimized for performance:

- Static generation for fast page loads
- Image optimization via Next.js Image component
- Client-side filtering (no server round-trips)
- Code splitting by route

## Rollbacks

To rollback to a previous deployment:

1. Go to your project in Vercel Dashboard
2. Navigate to Deployments
3. Find the previous working deployment
4. Click the three dots menu and select "Promote to Production"
