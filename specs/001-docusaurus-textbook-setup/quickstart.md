# Quickstart Guide: Docusaurus Textbook Setup

**Feature**: 001-docusaurus-textbook-setup
**Date**: 2026-01-09
**Audience**: Developers setting up the project locally

## Overview

This guide walks you through setting up the Physical AI textbook platform on your local machine, from initial installation to running the development server and building for production.

**Estimated Setup Time**: 10-15 minutes

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: 9.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Code Editor**: VS Code recommended with Markdown extensions

**Verify Installation**:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Talib1973/ai-book-ned.git
cd ai-book-ned
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Docusaurus 3.x
- React 18
- TypeScript 5.x
- Testing libraries (Jest, React Testing Library)
- Development tools (ESLint, Prettier)

**Expected Output**:
```
added 1234 packages in 30s
```

### 3. Verify Installation

```bash
npm run docusaurus -- --version
```

**Expected Output**:
```
3.x.x
```

---

## Development

### Start Development Server

```bash
npm start
```

**What This Does**:
- Starts Docusaurus development server
- Opens browser at `http://localhost:3000`
- Enables hot module replacement (HMR)
- Watches for file changes

**Expected Output**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

**Available at**:
- Homepage: http://localhost:3000
- Chapter 1: http://localhost:3000/docs/chapter-01-intro-physical-ai
- Docs: http://localhost:3000/docs/intro

### Stop Development Server

Press `Ctrl+C` in the terminal

---

## Project Structure

```
ai-book-ned/
├── docs/                          # Chapter content (Markdown/MDX)
│   ├── intro.md                  # Homepage introduction
│   ├── chapter-01-intro-physical-ai.md
│   ├── chapter-02-humanoid-fundamentals.md
│   ├── chapter-03-sensors-perception.md
│   ├── chapter-04-actuation-control.md
│   ├── chapter-05-ai-integration.md
│   └── chapter-06-real-world-applications.md
│
├── src/                           # Custom React components
│   ├── components/
│   │   ├── ProgressTracker/      # Progress tracking component
│   │   ├── ChapterNav/           # Chapter navigation
│   │   └── ReadingProgress/      # Reading progress bar
│   ├── pages/                    # Custom pages
│   │   └── index.tsx             # Custom homepage
│   └── css/
│       └── custom.css            # Theme customization
│
├── static/                        # Static assets
│   └── img/                      # Images and diagrams
│
├── docusaurus.config.js          # Docusaurus configuration
├── sidebars.js                   # Sidebar navigation
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## Adding Content

### Create a New Chapter

1. **Create Markdown file** in `/docs`:

```bash
touch docs/chapter-07-new-topic.md
```

2. **Add frontmatter**:

```mdx
---
id: chapter-07-new-topic
title: "Chapter 7: New Topic"
description: "Brief description of the chapter"
readingTime: 7
order: 7
---

# New Topic

Chapter content goes here...
```

3. **Update sidebar** in `sidebars.js`:

```javascript
module.exports = {
  tutorialSidebar: [
    'intro',
    'chapter-01-intro-physical-ai',
    // ... other chapters
    'chapter-07-new-topic',  // Add new chapter
  ],
};
```

4. **Verify** at http://localhost:3000/docs/chapter-07-new-topic

---

## Running Tests

### Unit Tests

```bash
npm test
```

Runs Jest tests for React components and hooks.

**Example Output**:
```
PASS src/components/ProgressTracker.test.tsx
PASS src/hooks/useProgress.test.ts

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

### Test with Coverage

```bash
npm run test:coverage
```

**Coverage Targets**:
- Statements: >80%
- Branches: >75%
- Functions: >80%
- Lines: >80%

### Integration Tests

```bash
npm run test:integration
```

Tests navigation flows, progress persistence, and component integration.

### Accessibility Tests

```bash
npm run test:a11y
```

Runs axe-core accessibility audits on all pages.

---

## Building for Production

### Create Production Build

```bash
npm run build
```

**What This Does**:
- Generates static HTML/CSS/JS files
- Minifies and optimizes assets
- Creates production-ready bundle in `/build`

**Expected Output**:
```
[SUCCESS] Generated static files in "build"
```

**Build Stats**:
- Total bundle size: ~400KB (gzipped)
- Homepage: ~150KB
- Average chapter: ~50KB

### Preview Production Build

```bash
npm run serve
```

**Available at**: http://localhost:3000

**What to Test**:
- Page load times (<2s on simulated 4G)
- Responsive design (320px to 4K)
- Dark mode toggle
- Progress tracking persistence
- Navigation flows

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Follow prompts**:
- Project name: `ai-book-ned`
- Build command: `npm run build`
- Output directory: `build`

4. **Access your site** at provided URL (e.g., `ai-book-ned.vercel.app`)

### Deploy to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Deploy**:
```bash
netlify deploy --prod
```

3. **Configuration**:
- Build command: `npm run build`
- Publish directory: `build`

### Manual Deployment

1. **Build** the project:
```bash
npm run build
```

2. **Upload** `/build` directory to any static hosting:
   - GitHub Pages
   - AWS S3 + CloudFront
   - Azure Static Web Apps
   - Google Cloud Storage

---

## Development Workflow

### Typical Development Session

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-chapter

# 3. Start dev server
npm start

# 4. Make changes in /docs or /src
# (Files auto-reload in browser)

# 5. Run tests
npm test

# 6. Build for production
npm run build

# 7. Preview production build
npm run serve

# 8. Commit changes
git add .
git commit -m "Add new chapter on XYZ"

# 9. Push to GitHub
git push origin feature/new-chapter

# 10. Create pull request
```

---

## Customization

### Change Theme Colors

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2e8555;    /* Primary green */
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;    /* Lighter green for dark mode */
  /* ... dark mode colors */
}
```

### Modify Site Configuration

Edit `docusaurus.config.js`:

```javascript
module.exports = {
  title: 'Physical AI Textbook',
  tagline: 'Interactive Learning for Robotics',
  url: 'https://ai-book-ned.vercel.app',
  baseUrl: '/',
  // ... more config
};
```

### Add Custom Components

1. **Create component** in `/src/components`:

```tsx
// src/components/CustomFeature/CustomFeature.tsx
import React from 'react';

export function CustomFeature() {
  return <div>Custom feature content</div>;
}
```

2. **Use in MDX** files:

```mdx
import { CustomFeature } from '@site/src/components/CustomFeature/CustomFeature';

# Chapter Title

<CustomFeature />

Regular markdown content...
```

---

## Troubleshooting

### Port 3000 Already in Use

**Error**: `Something is already running on port 3000`

**Solution**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm start -- --port 3001
```

### npm install Fails

**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $USER ~/.npm

# Or use npx
npx create-docusaurus@latest
```

### Build Fails with TypeScript Errors

**Error**: `TS2304: Cannot find name 'X'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docusaurus cache
npm run clear
```

### Hot Reload Not Working

**Solution**:
```bash
# Restart dev server
Ctrl+C
npm start

# Or clear cache
npm run clear
npm start
```

### localStorage Not Working Locally

**Cause**: Browser in private mode or security settings

**Solution**:
- Exit private/incognito mode
- Check browser console for errors
- Verify localStorage with: `localStorage.setItem('test', 'value')`

---

## Performance Optimization

### Check Performance Metrics

```bash
# Run Lighthouse audit
npm run lighthouse

# Expected scores:
# Performance: 90+
# Accessibility: 100
# Best Practices: 95+
# SEO: 100
```

### Optimize Images

Before adding images to `/static/img`:

```bash
# Install image optimization tool
npm install -g sharp-cli

# Convert to WebP
sharp -i diagram.png -o diagram.webp

# Resize large images
sharp -i photo.jpg --resize 1200 --webp -o photo-optimized.webp
```

### Bundle Analysis

```bash
npm run build -- --bundle-analyzer
```

Opens visual bundle size analyzer in browser.

---

## VS Code Extensions (Recommended)

Install these extensions for better DX:

- **Markdown All in One**: Markdown editing
- **MDX**: MDX syntax highlighting
- **Prettier**: Code formatting
- **ESLint**: Linting
- **Error Lens**: Inline error display
- **GitLens**: Git integration

---

## Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:a11y` | Run accessibility tests |
| `npm run lighthouse` | Run Lighthouse audit |
| `npm run clear` | Clear Docusaurus cache |
| `npm run docusaurus` | Run Docusaurus CLI |

---

## Getting Help

### Resources

- **Docusaurus Docs**: https://docusaurus.io/docs
- **React Docs**: https://react.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs

### Project Documentation

- **Feature Spec**: `specs/001-docusaurus-textbook-setup/spec.md`
- **Implementation Plan**: `specs/001-docusaurus-textbook-setup/plan.md`
- **Data Model**: `specs/001-docusaurus-textbook-setup/data-model.md`

### Community

- **GitHub Issues**: https://github.com/Talib1973/ai-book-ned/issues
- **Discussions**: https://github.com/Talib1973/ai-book-ned/discussions

---

## Next Steps

After completing the quickstart:

1. ✅ Verify dev server runs: `npm start`
2. ✅ Run tests successfully: `npm test`
3. ✅ Build for production: `npm run build`
4. 📝 Read through chapter content in `/docs`
5. 🎨 Customize theme in `src/css/custom.css`
6. 🧪 Add your first custom component
7. 🚀 Deploy to Vercel/Netlify

**Ready to start development!** 🎉
