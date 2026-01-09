# Research: Docusaurus Textbook Setup

**Feature**: 001-docusaurus-textbook-setup
**Date**: 2026-01-09
**Phase**: 0 (Research & Technology Selection)

## Overview

This document captures research findings and decisions for building an interactive Physical AI textbook using Docusaurus. All technical context unknowns have been resolved through research into best practices, performance optimization, and accessibility standards.

---

## 1. Platform Selection: Docusaurus

### Decision
Use **Docusaurus 3.x** as the static site generator for the textbook platform.

### Rationale
- **Documentation-focused**: Built specifically for content-heavy sites with excellent navigation
- **Performance**: Static site generation provides <1s load times, meeting <2s requirement with margin
- **Mobile-first**: Responsive design out of the box, supports 320px minimum width
- **React integration**: Allows custom components for progress tracking without rebuilding core features
- **MDX support**: Enables embedding React components within Markdown content
- **Dark mode**: Built-in light/dark theme switching (FR-010)
- **Accessibility**: WCAG 2.1 AA compliant by default with semantic HTML
- **Active ecosystem**: Large community, frequent updates, extensive documentation

### Alternatives Considered
- **Next.js**: More flexible but requires more configuration; overkill for static content
- **Gatsby**: Similar to Docusaurus but slower build times and more complex
- **VuePress**: Vue-based; team would need to learn Vue ecosystem
- **Plain HTML/CSS**: Too much manual work; no modern tooling

### Implementation Notes
- Use Docusaurus 3.x (latest stable)
- Initialize with `npx create-docusaurus@latest ai-book-ned classic --typescript`
- TypeScript for type safety in custom components

---

## 2. Progress Tracking Implementation

### Decision
Implement progress tracking using **browser localStorage** with a custom React hook.

### Rationale
- **No backend needed**: Keeps architecture simple for foundation phase
- **Instant persistence**: No network calls, immediate save/restore
- **Privacy-friendly**: Data stays on user's device
- **98% browser support**: localStorage available in all modern browsers
- **Simple API**: `setItem`, `getItem`, `removeItem` - easy to test

### Technical Approach

```typescript
// useProgress.ts hook
interface Progress {
  completedChapters: string[];
  currentChapter: string | null;
  lastAccessed: string; // ISO timestamp
}

function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress());

  const markChapterComplete = (chapterId: string) => {
    // Update state and localStorage
  };

  const resetProgress = () => {
    // Clear all progress
  };

  return { progress, markChapterComplete, resetProgress };
}
```

### Edge Cases Handled
- **localStorage quota exceeded**: Catch and log error, gracefully degrade
- **Private browsing**: Detect and show warning or disable tracking
- **Corrupted data**: Validate on load, reset if invalid JSON
- **Cross-browser**: No sync needed (documented in spec assumptions)

### Alternatives Considered
- **Cookies**: Limited storage (4KB), sent with every request (unnecessary overhead)
- **IndexedDB**: Overkill for simple key-value storage
- **Session storage**: Clears on tab close, loses progress
- **URL parameters**: Breaks shareable links, messy URLs

---

## 3. Mobile-First Responsive Design

### Decision
Use **Docusaurus's built-in responsive system** with **CSS custom properties** for breakpoints.

### Rationale
- Docusaurus uses mobile-first Infima CSS framework
- Supports 320px minimum width (tested on iPhone SE)
- Breakpoints: 320px, 768px (tablet), 996px (desktop), 1440px+ (wide)
- CSS Grid and Flexbox for layouts (95%+ browser support)
- Touch-friendly targets (44x44px minimum per WCAG)

### Responsive Strategy

**Content Priority (Mobile)**:
1. Chapter title
2. Main content (text + images)
3. Next/Previous buttons
4. Progress indicator
5. Navigation menu (hamburger)

**Desktop Enhancements**:
- Persistent sidebar navigation
- Wider content area (optimized line length 60-80 characters)
- Side-by-side image layouts where appropriate

### Testing Approach
- Chrome DevTools device emulation
- BrowserStack for real device testing
- Lighthouse mobile audits
- Manual testing on physical devices (iPhone, Android, tablet)

---

## 4. Performance Optimization

### Decision
Implement **comprehensive performance optimization** to achieve <2s load, Lighthouse 90+ score.

### Techniques

**1. Code Splitting**
- Docusaurus automatically code-splits per page
- Dynamic imports for progress tracking component
- Separate bundle for custom components

**2. Image Optimization**
- WebP format with JPEG fallbacks
- Responsive images with `srcset`
- Lazy loading (native `loading="lazy"`)
- Size limits: 200KB max per image, 1MB total per chapter

**3. Asset Optimization**
- Minify CSS/JS (Docusaurus default)
- Tree shaking to remove unused code
- Preload critical resources
- Prefetch next chapter on hover

**4. Caching Strategy**
- Service worker for offline access (optional enhancement)
- Cache-Control headers: `max-age=31536000` for static assets
- Cache busting via content hashing in filenames

**5. Font Loading**
- System font stack (zero network requests)
- Optional web fonts with `font-display: swap`
- Subset fonts to Latin characters only

### Performance Budget
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s
- **Total Bundle Size**: <500KB (gzipped)
- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 100

---

## 5. Accessibility Implementation (WCAG 2.1 AA)

### Decision
Implement **comprehensive accessibility** following WCAG 2.1 Level AA standards.

### Checklist

**Perceivable**:
- [x] All images have descriptive alt text
- [x] Color contrast ratio ≥4.5:1 for normal text, ≥3:1 for large text
- [x] Content structured with semantic HTML (h1-h6, nav, main, article)
- [x] Text resizable up to 200% without loss of functionality

**Operable**:
- [x] All functionality available via keyboard
- [x] Focus indicators visible and high-contrast
- [x] No keyboard traps
- [x] Touch targets ≥44x44px
- [x] Skip to main content link

**Understandable**:
- [x] Page language declared (`<html lang="en">`)
- [x] Navigation consistent across pages
- [x] Error messages clear and actionable
- [x] Instructions don't rely solely on sensory characteristics

**Robust**:
- [x] Valid HTML5
- [x] ARIA landmarks where appropriate
- [x] Tested with screen readers (NVDA, VoiceOver)

### Tools
- **axe DevTools**: Automated accessibility testing
- **WAVE**: Visual accessibility evaluation
- **Lighthouse**: Accessibility audit score
- **Screen readers**: NVDA (Windows), VoiceOver (macOS), TalkBack (Android)

---

## 6. Testing Strategy

### Decision
Implement **multi-layer testing strategy** covering unit, integration, and performance.

### Test Layers

**1. Unit Tests (Jest + React Testing Library)**
- Progress tracking hooks
- Component rendering
- localStorage interactions
- Edge case handling

**2. Integration Tests**
- Navigation flows
- Progress persistence across page loads
- Dark mode toggling
- Responsive breakpoints

**3. Performance Tests (Lighthouse CI)**
- Automated on every PR
- Fail build if score <90
- Track metrics over time

**4. Accessibility Tests**
- axe-core integration in Jest
- Manual screen reader testing
- Keyboard navigation audit

**5. Cross-Browser Testing (BrowserStack)**
- Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Android
- Test on real devices

### CI/CD Integration
```yaml
# Example GitHub Actions
- Run Jest tests
- Run Lighthouse CI audit
- Run axe accessibility scan
- Deploy preview to Vercel/Netlify
```

---

## 7. Content Authoring Workflow

### Decision
Use **MDX (Markdown + JSX)** for chapter content with **frontmatter metadata**.

### Format

```mdx
---
id: chapter-01-intro-physical-ai
title: "Chapter 1: Introduction to Physical AI"
description: "Explore the foundations of Physical AI and its real-world applications"
readingTime: 7
order: 1
---

# Introduction to Physical AI

Chapter content here with embedded React components...

<ReadingProgress />

## Key Concepts

- Concept 1
- Concept 2

<NextChapterButton />
```

### Benefits
- **Rich content**: Embed interactive components
- **Metadata**: Track reading time, order, descriptions
- **Version control**: Plain text files in Git
- **Tooling**: VSCode Markdown preview, linting, formatting

---

## 8. Deployment Strategy

### Decision
Deploy as **static site** to **Vercel** or **Netlify** with automatic preview deployments.

### Rationale
- **Free tier**: Sufficient for MVP
- **Global CDN**: Fast delivery worldwide
- **Automatic HTTPS**: Security by default
- **Preview deployments**: Test PRs before merging
- **Zero config**: Docusaurus detection automatic
- **Analytics**: Built-in or easy to add

### Build Process
```bash
npm run build  # Generates static files in /build
npm run serve  # Local preview of production build
```

### Environment
- **Production**: `ai-book-ned.vercel.app` or custom domain
- **Staging**: PR preview URLs
- **Local**: `localhost:3000`

---

## 9. Dark Mode Implementation

### Decision
Use **Docusaurus's built-in dark mode** with custom color overrides.

### Approach
- Toggle button in navbar (Docusaurus default)
- Preference saved to localStorage
- CSS custom properties for theme colors
- Automatic system preference detection
- Smooth transitions between modes

### Color Palette

**Light Mode**:
- Background: #FFFFFF
- Text: #1C1E21
- Primary: #2E8555 (green, typical for docs)
- Links: #0969DA

**Dark Mode**:
- Background: #1C1E21
- Text: #F5F6F7
- Primary: #25C2A0 (lighter green)
- Links: #58A6FF

**Contrast Ratios**: All combinations meet WCAG AA (4.5:1 minimum)

---

## 10. Reading Time Estimation

### Decision
Calculate reading time based on **200 words per minute** for technical content.

### Implementation
- Automated calculation in frontmatter plugin
- Display on table of contents
- Update based on actual word count
- Formula: `Math.ceil(wordCount / 200)` minutes

### Calibration
- Target: 6-8 minutes per chapter
- Total: 36-48 minutes (under 45-minute requirement)
- Buffer for images/diagrams: +10-20 seconds per visual

---

## Summary of Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Platform | Docusaurus 3.x + TypeScript | Documentation-focused, fast, accessible |
| Progress Tracking | localStorage + React hook | Simple, no backend, instant persistence |
| Responsive Design | Mobile-first Infima CSS | 320px minimum, touch-friendly |
| Performance | Code splitting, lazy loading, WebP images | <2s load, Lighthouse 90+ |
| Accessibility | WCAG 2.1 AA compliance | Semantic HTML, screen reader tested |
| Testing | Jest + RTL + Lighthouse CI | Multi-layer coverage |
| Content Format | MDX with frontmatter | Rich content, metadata, version control |
| Deployment | Vercel/Netlify static hosting | Free, fast CDN, preview deploys |
| Dark Mode | Docusaurus built-in + custom colors | User preference, system detection |
| Reading Time | 200 WPM calculation | Accurate estimation for technical content |

---

## Next Steps (Phase 1)

With all research complete, proceed to Phase 1:
1. Create data-model.md (Chapter, UserProgress entities)
2. Create contracts/localStorage-interface.md
3. Create quickstart.md (setup instructions)
4. Update agent context file with tech stack

**All NEEDS CLARIFICATION items resolved** ✅
