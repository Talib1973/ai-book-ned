# Deployment Guide

This guide covers deploying the Physical AI & Humanoid Robotics textbook to various hosting platforms.

## 🎯 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All content is finalized and proofread
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] Test locally with `npm run serve`
- [ ] All images and assets are optimized
- [ ] Site configuration is updated (`docusaurus.config.ts`)
- [ ] Environment-specific settings are configured

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Zero configuration deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Free for personal projects

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First time deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Configure Project** (if prompted)
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Custom Domain** (optional)
   ```bash
   vercel domains add your-domain.com
   ```

**Environment Variables:**

None required for basic deployment. Add via Vercel dashboard if needed.

---

### Option 2: Netlify

**Pros:**
- Easy Git integration
- Automatic deployments on push
- Form handling
- Serverless functions support
- Free tier available

**Steps:**

1. **Via Netlify CLI**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

2. **Via Netlify UI** (GitHub integration)
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **netlify.toml** (optional configuration)
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

**Custom Domain:**
- Go to Domain Settings in Netlify dashboard
- Add custom domain
- Configure DNS records

---

### Option 3: GitHub Pages

**Pros:**
- Free hosting for public repositories
- GitHub integration
- Custom domain support

**Steps:**

1. **Update Configuration**

   Edit `docusaurus.config.ts`:
   ```typescript
   const config: Config = {
     url: 'https://your-username.github.io',
     baseUrl: '/ai-book-ned/',  // Your repo name
     organizationName: 'your-username',
     projectName: 'ai-book-ned',
     // ... rest of config
   };
   ```

2. **Deploy**
   ```bash
   GIT_USER=your-username npm run deploy
   ```

   This will:
   - Build the site
   - Push to `gh-pages` branch
   - GitHub automatically serves from this branch

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch `gh-pages`
   - Click Save

4. **Custom Domain** (optional)
   - Add `CNAME` file in `static/` directory with your domain
   - Configure DNS with your domain provider:
     ```
     Type: CNAME
     Name: www (or @)
     Value: your-username.github.io
     ```

---

### Option 4: AWS S3 + CloudFront

**Pros:**
- Full control
- Highly scalable
- Can integrate with AWS services
- Low cost

**Steps:**

1. **Build the Site**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Bucket name: `your-textbook-site`
   - Region: Choose closest to your audience
   - Uncheck "Block all public access"

3. **Configure Static Website Hosting**
   - Properties → Static website hosting
   - Enable static website hosting
   - Index document: `index.html`
   - Error document: `404.html`

4. **Upload Files**
   ```bash
   aws s3 sync build/ s3://your-textbook-site --delete
   ```

5. **Set Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-textbook-site/*"
       }
     ]
   }
   ```

6. **Create CloudFront Distribution** (optional, for CDN)
   - Origin: S3 bucket website endpoint
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Compress Objects Automatically: Yes
   - Default Root Object: `index.html`

---

### Option 5: Docker + Any Platform

**Pros:**
- Portable across platforms
- Consistent environments
- Works with any Docker-compatible host

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and Run:**

```bash
# Build image
docker build -t ai-textbook .

# Run locally
docker run -p 8080:80 ai-textbook

# Push to Docker Hub
docker tag ai-textbook your-username/ai-textbook
docker push your-username/ai-textbook
```

**Deploy to Cloud Run (Google Cloud):**

```bash
gcloud run deploy ai-textbook \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Environment Configuration

### Production Optimizations

Update `docusaurus.config.ts` for production:

```typescript
const config: Config = {
  // ... existing config

  // Production URL
  url: 'https://your-production-domain.com',
  baseUrl: '/',

  // SEO
  metadata: [
    { name: 'description', content: 'Interactive textbook for Physical AI & Humanoid Robotics' },
    { name: 'keywords', content: 'Physical AI, Humanoid Robotics, AI, Machine Learning' },
    { property: 'og:title', content: 'Physical AI & Humanoid Robotics' },
    { property: 'og:description', content: 'Learn Physical AI in 45 minutes' },
    { property: 'og:image', content: 'https://your-domain.com/img/social-card.jpg' },
  ],

  // Analytics (optional)
  scripts: [
    {
      src: 'https://analytics.your-domain.com/script.js',
      async: true,
      defer: true,
    },
  ],
};
```

---

## 📊 Post-Deployment Verification

### Checklist

- [ ] Site loads correctly at production URL
- [ ] All pages are accessible
- [ ] Navigation works properly
- [ ] Progress tracking functions correctly
- [ ] Images and assets load
- [ ] Mobile responsiveness (test on real devices)
- [ ] Light/dark mode toggle works
- [ ] No console errors or warnings
- [ ] Page load time < 2 seconds (test with [PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] Lighthouse score > 90 for all categories

### Testing Tools

1. **Lighthouse** (in Chrome DevTools)
   - Performance
   - Accessibility
   - Best Practices
   - SEO

2. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Test both mobile and desktop

3. **WebPageTest**
   - https://www.webpagetest.org/
   - Test from multiple locations

4. **BrowserStack** (for cross-browser testing)
   - https://www.browserstack.com/

---

## 🔄 Continuous Deployment

### GitHub Actions (for Vercel/Netlify)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main, master]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🐛 Troubleshooting

### Build Fails

1. Check Node.js version: `node -v` (should be 18+)
2. Clear cache: `npm run clear`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
4. Check for TypeScript errors: `npm run typecheck`

### 404 Errors After Deployment

- Verify `baseUrl` in `docusaurus.config.ts` matches deployment path
- Check routing configuration in hosting platform
- Ensure all internal links use proper format

### Assets Not Loading

- Check if `static/` directory contents are included in build
- Verify asset paths are relative (not absolute)
- Check Content Security Policy if using custom headers

### Progress Tracking Not Working

- Verify localStorage is enabled in browser
- Check browser console for errors
- Ensure site is served over HTTPS (required for some browsers)

---

## 📈 Monitoring and Analytics

### Recommended Tools

1. **Google Analytics 4**
   - User engagement tracking
   - Page view analytics

2. **Plausible** (privacy-friendly alternative)
   - Simple, lightweight analytics
   - GDPR compliant

3. **Sentry** (error tracking)
   - JavaScript error monitoring
   - Performance monitoring

4. **Uptime Robot**
   - Monitor site availability
   - Alert on downtime

---

## 🔒 Security Best Practices

- [ ] Enable HTTPS (all modern hosts support this)
- [ ] Set secure headers (CSP, X-Frame-Options, etc.)
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Use environment variables for sensitive config
- [ ] Enable DDoS protection if available
- [ ] Regular backups of content

---

## 💰 Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| **Vercel** | Unlimited personal projects | Pro: $20/month |
| **Netlify** | 100GB bandwidth/month | Pro: $19/month |
| **GitHub Pages** | Unlimited for public repos | N/A |
| **AWS S3** | ~$0.02/GB storage | Pay as you go |
| **Cloudflare Pages** | Unlimited | Free |

---

**Need Help?** Open an issue on [GitHub](https://github.com/Talib1973/ai-book-ned/issues)
