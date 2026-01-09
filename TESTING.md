# Testing & Quality Assurance Guide

Comprehensive testing checklist for the Physical AI & Humanoid Robotics textbook.

## 🎯 Testing Objectives

- Ensure mobile-first responsive design works across all devices
- Verify accessibility compliance (WCAG 2.1 AA)
- Validate progress tracking functionality
- Confirm cross-browser compatibility
- Verify performance benchmarks

---

## 📱 Mobile Responsiveness Testing

### Breakpoint Verification

Test at each breakpoint to ensure proper layout:

#### 320px - Small Mobile (iPhone SE)
- [ ] Text is readable (minimum 16px font size)
- [ ] No horizontal scrolling
- [ ] Touch targets ≥ 44x44px
- [ ] Navigation menu accessible
- [ ] Chapter cards stack vertically
- [ ] Progress bar displays correctly
- [ ] Images scale appropriately

#### 375px - Medium Mobile (iPhone 12/13)
- [ ] Layout adapts properly
- [ ] Spacing is comfortable
- [ ] Buttons are easily tappable
- [ ] Homepage hero section displays well
- [ ] Chapter cards readable

#### 768px - Tablet (iPad)
- [ ] Two-column chapter grid displays
- [ ] Sidebar navigation appears
- [ ] Reading width comfortable (not too wide)
- [ ] Images display at appropriate size
- [ ] Progress bar well-positioned

#### 996px - Desktop
- [ ] Three-column chapter grid
- [ ] Sidebar navigation fully visible
- [ ] Content centered with appropriate margins
- [ ] Typography scales up appropriately

#### 1280px+ - Large Desktop
- [ ] Maximum content width enforced (1140px)
- [ ] Adequate whitespace on sides
- [ ] Images maintain quality
- [ ] No layout breaks

#### 2560px+ - 4K Displays
- [ ] Content remains readable (font size scaled)
- [ ] Layout doesn't become too sparse
- [ ] Images remain sharp (consider 2x assets)

### Device-Specific Testing

Test on actual devices when possible:

**Mobile Devices:**
- [ ] iPhone SE (320×568)
- [ ] iPhone 12/13 (390×844)
- [ ] iPhone 14 Pro Max (430×932)
- [ ] Samsung Galaxy S21 (360×800)
- [ ] Samsung Galaxy S21+ (384×854)
- [ ] Google Pixel 6 (412×915)

**Tablets:**
- [ ] iPad Mini (768×1024)
- [ ] iPad Pro 11" (834×1194)
- [ ] iPad Pro 12.9" (1024×1366)
- [ ] Samsung Galaxy Tab (800×1280)

**Desktop:**
- [ ] 1920×1080 (Full HD)
- [ ] 2560×1440 (2K)
- [ ] 3840×2160 (4K)

### Browser DevTools Testing

Using Chrome DevTools (or equivalent):

1. **Open DevTools**
   - Press `F12` or right-click → "Inspect"

2. **Toggle Device Toolbar**
   - Click device icon or press `Ctrl+Shift+M`

3. **Test Each Breakpoint**
   - Select device presets
   - Manually enter custom dimensions
   - Test both portrait and landscape

4. **Throttling**
   - Network: Test with "Fast 3G" and "Slow 3G"
   - CPU: 4x slowdown to simulate low-end devices

---

## ♿ Accessibility Testing

### Automated Testing

#### Lighthouse Audit (Chrome DevTools)

1. Open DevTools → Lighthouse tab
2. Select "Accessibility" category
3. Run audit
4. **Target Score:** ≥ 95

**Check for:**
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text for all images
- [ ] ARIA labels where appropriate
- [ ] Color contrast ratios
- [ ] Form labels

#### axe DevTools

1. Install [axe DevTools Extension](https://www.deque.com/axe/devtools/)
2. Run scan on each page
3. Fix all critical and serious issues
4. **Target:** 0 critical issues

### Manual Accessibility Checks

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible and clear
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Skip to main content link works

#### Screen Reader Testing

**NVDA (Windows - Free):**
- [ ] Install [NVDA](https://www.nvaccess.org/)
- [ ] Navigate through homepage
- [ ] Navigate through chapter pages
- [ ] Verify all content is announced
- [ ] Check alt text is meaningful

**VoiceOver (macOS/iOS - Built-in):**
- [ ] Enable VoiceOver (Cmd+F5)
- [ ] Test navigation
- [ ] Verify announcements
- [ ] Test with touch gestures (iOS)

**JAWS (Windows - Commercial):**
- [ ] Test if available
- [ ] Verify compatibility

#### Color Contrast

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

- [ ] Normal text: ≥ 4.5:1 (WCAG AA)
- [ ] Large text (18px+): ≥ 3:1
- [ ] UI components: ≥ 3:1
- [ ] Test in light mode
- [ ] Test in dark mode

#### Visual Testing

- [ ] Zoom to 200% - content still readable
- [ ] Test with Windows High Contrast mode
- [ ] Test with reduced motion preference
- [ ] Color blindness simulation (Deuteranopia, Protanopia)

---

## 💾 Progress Tracking Testing

### localStorage Functionality

#### Basic Operations
- [ ] Read first chapter → Progress saved
- [ ] Navigate away and return → Progress persists
- [ ] Complete all chapters → 100% progress displayed
- [ ] Refresh page → Progress remains
- [ ] Clear browser data → Progress resets appropriately

#### Cross-Tab Sync
- [ ] Open site in two tabs
- [ ] Mark chapter complete in Tab 1
- [ ] Switch to Tab 2 → Progress updates automatically
- [ ] Works bidirectionally

#### Edge Cases
- [ ] localStorage disabled → Graceful degradation
- [ ] Private/Incognito mode → Functions but doesn't persist
- [ ] localStorage quota exceeded → Error handled
- [ ] Corrupt localStorage data → Resets to default

### Progress Indicator UI
- [ ] Progress bar displays correctly on homepage
- [ ] Percentage updates in real-time
- [ ] Completed chapters show checkmark
- [ ] "Read Again" vs "Read Chapter" button states
- [ ] Completion notification appears
- [ ] Notification auto-dismisses after 5 seconds

### Reading Sessions
- [ ] Session starts when chapter opens
- [ ] Session tracked accurately
- [ ] Session ends on page close
- [ ] Short sessions (< 10s) don't mark chapter complete
- [ ] Session data stored correctly

---

## 🌐 Cross-Browser Testing

### Required Browsers

**Desktop:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest) - macOS only
- [ ] Edge (latest)

**Mobile:**
- [ ] Safari Mobile (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Testing Checklist Per Browser

- [ ] Site loads without errors
- [ ] Navigation works
- [ ] Progress tracking functional
- [ ] localStorage works
- [ ] Light/dark mode toggle
- [ ] All styles render correctly
- [ ] No console errors
- [ ] Performance acceptable

### Known Browser-Specific Issues

Document any browser-specific quirks here:

**Safari:**
- localStorage has 5MB limit (should be fine for our use)
- May require user gesture for certain features

**Firefox:**
- Private mode blocks localStorage by default

**IE11:**
- Not supported (Docusaurus requires modern browsers)

---

## ⚡ Performance Testing

### Lighthouse Performance Audit

**Targets:**
- [ ] Performance Score: ≥ 90
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Time to Interactive (TTI): < 3.8s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Total Blocking Time (TBT): < 300ms

### Network Performance

**3G Fast:**
- [ ] Page loads in < 5s
- [ ] Content readable within 3s
- [ ] No timeouts

**Slow 3G:**
- [ ] Page loads in < 10s
- [ ] Progressive loading (content appears incrementally)

### Bundle Size

```bash
# Analyze bundle
npm run build

# Check build folder size
du -sh build/
```

**Targets:**
- [ ] Total build size: < 10MB
- [ ] JavaScript bundle: < 500KB (gzipped)
- [ ] CSS bundle: < 100KB (gzipped)
- [ ] Images optimized (WebP when possible)

---

## 🧪 Functional Testing

### Navigation
- [ ] Navbar links work
- [ ] Sidebar navigation functional
- [ ] Homepage chapter cards link correctly
- [ ] "Next/Previous" chapter navigation
- [ ] Breadcrumbs (if applicable)
- [ ] Back button works as expected

### Content
- [ ] All chapters load
- [ ] Markdown rendering correct
- [ ] Code blocks syntax highlighted
- [ ] Tables display properly
- [ ] Lists formatted correctly
- [ ] Links open correctly (internal and external)

### Interactive Features
- [ ] Light/dark mode toggle
- [ ] Search functionality (if enabled)
- [ ] Mobile menu opens/closes
- [ ] Smooth scrolling to anchors
- [ ] Copy code button (in code blocks)

### Error Handling
- [ ] 404 page displays for invalid URLs
- [ ] Broken image fallback
- [ ] JavaScript error boundaries (no white screen of death)

---

## 🔍 SEO Testing

### Meta Tags
- [ ] Title tags present on all pages
- [ ] Meta descriptions present
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URLs

### Structured Data
- [ ] Valid HTML5 structure
- [ ] Semantic HTML elements used
- [ ] Schema.org markup (if applicable)

### Tools
- **Google Search Console** - Submit sitemap
- **Lighthouse SEO Audit** - Score ≥ 90
- **Schema Markup Validator**
- **Facebook Sharing Debugger**
- **Twitter Card Validator**

---

## 📋 Pre-Release Checklist

### Content
- [ ] All chapters proofread
- [ ] No Lorem Ipsum or placeholder text
- [ ] Images have descriptive alt text
- [ ] Links verified (no broken links)
- [ ] Code examples tested
- [ ] Reading times accurate

### Technical
- [ ] TypeScript compilation successful (`npm run typecheck`)
- [ ] Production build successful (`npm run build`)
- [ ] No console errors or warnings
- [ ] All tests passing (if automated tests added)
- [ ] Dependencies up to date (`npm outdated`)
- [ ] Security audit clean (`npm audit`)

### Documentation
- [ ] README.md complete
- [ ] DEPLOYMENT.md accurate
- [ ] TESTING.md updated
- [ ] License file present
- [ ] Contributing guidelines (if applicable)

### Deployment
- [ ] Production URL configured
- [ ] Environment variables set
- [ ] Analytics configured (if using)
- [ ] DNS configured (if custom domain)
- [ ] SSL certificate active

---

## 🛠️ Testing Tools Reference

### Browser Extensions
- **Lighthouse** - Performance, accessibility, SEO
- **axe DevTools** - Accessibility testing
- **WAVE** - Web accessibility evaluation
- **React Developer Tools** - React debugging
- **Redux DevTools** - State debugging (if using Redux)

### Online Tools
- **PageSpeed Insights** - https://pagespeed.web.dev/
- **WebPageTest** - https://www.webpagetest.org/
- **GTmetrix** - https://gtmetrix.com/
- **Pingdom** - https://tools.pingdom.com/
- **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **HTML Validator** - https://validator.w3.org/
- **CSS Validator** - https://jigsaw.w3.org/css-validator/

### Command Line Tools
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-site.com --view

# Bundle analyzer
npm install -g webpack-bundle-analyzer
# (Configure in docusaurus.config.ts)

# Performance budget
npm install -g bundlesize
```

---

## 📊 Testing Report Template

After testing, document findings:

```markdown
## Test Report - [Date]

### Environment
- Browser: Chrome 120
- Device: MacBook Pro
- OS: macOS 14
- Screen: 2560×1600

### Results

#### Mobile Responsiveness
- 320px: ✅ Pass
- 375px: ✅ Pass
- 768px: ⚠️ Minor spacing issue on chapter cards
- 996px+: ✅ Pass

#### Accessibility
- Lighthouse Score: 98/100
- axe Violations: 0 critical, 1 moderate
- Keyboard Navigation: ✅ Pass
- Screen Reader: ✅ Pass (NVDA)

#### Performance
- Lighthouse: 95/100
- FCP: 1.2s
- LCP: 1.8s
- CLS: 0.05

#### Functional
- Navigation: ✅ Pass
- Progress Tracking: ✅ Pass
- Light/Dark Mode: ✅ Pass

### Issues Found
1. [Issue description]
   - Severity: Low/Medium/High
   - Steps to reproduce
   - Expected vs Actual
   - Screenshots

### Recommendations
1. [Recommendation]
2. [Recommendation]
```

---

**Happy Testing! 🧪**

For questions, open an issue on [GitHub](https://github.com/Talib1973/ai-book-ned/issues).
