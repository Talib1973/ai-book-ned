# Physical AI & Humanoid Robotics - Interactive Textbook

An AI-native, mobile-first interactive textbook for learning Physical AI and Humanoid Robotics. Built with Docusaurus 3.x, React 18, and TypeScript 5.x.

## 📚 About This Textbook

This interactive textbook provides a comprehensive introduction to Physical AI and Humanoid Robotics in just 45 minutes of reading time. Designed for students, engineers, hobbyists, and professionals interested in understanding how AI systems interact with the physical world.

### Features

- **📖 6 Essential Chapters** - Complete coverage from fundamentals to real-world applications
- **📱 Mobile-First Design** - Optimized for all devices (320px to 4K displays)
- **💾 Progress Tracking** - Automatic localStorage-based progress saving
- **🎨 Light/Dark Mode** - Respects system preferences with manual toggle
- **♿ Accessible** - WCAG 2.1 AA compliant
- **⚡ Fast** - Static site generation for <2 second page loads
- **🔒 Privacy-First** - No backend, all data stored locally

## 📖 Chapter Overview

| Chapter | Title | Reading Time | Description |
|---------|-------|--------------|-------------|
| 0 | Introduction | 2 min | Welcome and overview |
| 1 | Introduction to Physical AI | 7 min | Understanding Physical AI foundations |
| 2 | Humanoid Robot Fundamentals | 8 min | Core concepts and architectures |
| 3 | Sensors and Perception | 8 min | How robots sense their environment |
| 4 | Actuation and Control | 8 min | Movement systems and control algorithms |
| 5 | AI Integration | 7 min | Combining AI with physical systems |
| 6 | Real-World Applications | 5 min | Current and future use cases |

**Total Reading Time:** ~45 minutes

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Talib1973/ai-book-ned.git
cd ai-book-ned

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`.

### Build for Production

```bash
# Create optimized production build
npm run build

# Serve production build locally
npm run serve

# Run TypeScript type checking
npm run typecheck
```

## 📂 Project Structure

```
ai-book-ned/
├── docs/                          # Markdown content files
│   ├── intro.md                   # Introduction page
│   ├── chapter-01-intro-physical-ai.md
│   ├── chapter-02-humanoid-fundamentals.md
│   ├── chapter-03-sensors-perception.md
│   ├── chapter-04-actuation-control.md
│   ├── chapter-05-ai-integration.md
│   └── chapter-06-real-world-applications.md
├── src/
│   ├── components/                # React components
│   │   ├── ProgressBar.tsx
│   │   └── ChapterProgressTracker.tsx
│   ├── css/                       # Styles
│   │   └── custom.css
│   ├── pages/                     # Custom pages
│   │   └── index.tsx              # Homepage
│   ├── theme/                     # Theme customizations
│   │   └── DocItem/               # Custom doc wrapper for progress tracking
│   ├── types/                     # TypeScript definitions
│   │   └── index.ts
│   └── utils/                     # Utility functions
│       └── localStorage.ts         # Progress tracking utilities
├── static/                        # Static assets
│   └── img/                       # Images and logos
├── docusaurus.config.ts          # Docusaurus configuration
├── sidebars.ts                    # Sidebar navigation
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## 🎨 Customization

### Modifying Content

All chapter content is in Markdown/MDX format in the `docs/` directory. Each file includes frontmatter:

```markdown
---
title: Chapter Title
sidebar_position: 1
reading_time: 7
description: Chapter description
tags: [tag1, tag2]
---

# Chapter Content Here
```

### Styling

Custom styles are in `src/css/custom.css`. The design uses CSS custom properties for theming:

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-font-size-base: 16px;
  /* Mobile-first responsive breakpoints */
}
```

### Adding New Chapters

1. Create new `.md` file in `docs/` directory
2. Add chapter to `CHAPTERS` array in `src/types/index.ts`
3. Update `sidebars.ts` with new chapter ID
4. Chapter will automatically integrate with progress tracking

## 💾 Progress Tracking

The textbook uses localStorage to track reading progress:

### Features

- **Auto-save**: Progress saved automatically as you read
- **Chapter completion**: Tracks which chapters you've completed
- **Reading time**: Cumulative reading time tracking
- **Cross-tab sync**: Progress syncs across browser tabs
- **Export/Import**: Backup and restore your progress

### localStorage Keys

- `aibook_user_progress` - Overall progress and preferences
- `aibook_reading_sessions` - Session history (last 50)

### Privacy

All data is stored locally in your browser. No data is sent to external servers.

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Mobile | 320px - 767px | Smartphones |
| Tablet | 768px - 995px | Tablets |
| Desktop | 996px - 1279px | Laptops/Desktops |
| Large Desktop | 1280px - 2559px | Large monitors |
| 4K | 2560px+ | 4K displays |

### Testing Responsiveness

```bash
# Start dev server
npm start

# Open in browser and test with DevTools responsive mode
# Test at: 320px, 768px, 996px, 1280px, 2560px
```

## ♿ Accessibility

- **WCAG 2.1 AA** compliant color contrast
- **Keyboard navigation** fully supported
- **Screen reader** compatible with ARIA labels
- **Focus indicators** for all interactive elements
- **Reduced motion** support for animations
- **Touch targets** minimum 44x44px on mobile

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
build
```

### GitHub Pages

```bash
# Update docusaurus.config.ts
organizationName: 'your-github-username'
projectName: 'ai-book-ned'

# Deploy
GIT_USER=your-username npm run deploy
```

### Static Hosting

The `build/` directory contains all static files. Upload to any static host (AWS S3, Cloudflare Pages, etc.).

## 📦 Technologies

- **[Docusaurus 3.x](https://docusaurus.io/)** - Static site generator
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type safety
- **[MDX](https://mdxjs.com/)** - Markdown with JSX
- **localStorage API** - Client-side data persistence

## 🧪 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run clear` - Clear Docusaurus cache

### Code Quality

The project uses:
- **TypeScript strict mode** - Maximum type safety
- **ESLint** - Code linting (via Docusaurus)
- **Prettier** - Code formatting (via Docusaurus)

## 📝 Content Guidelines

### Writing Style

- **Concise**: Keep explanations focused and brief
- **Progressive**: Build concepts sequentially
- **Examples**: Include real-world examples
- **Visual**: Use diagrams and tables where helpful

### Markdown Tips

```markdown
# Headings (H1)
## Subheadings (H2)
### Sub-subheadings (H3)

**Bold text** for emphasis
`code` for inline code

// Code blocks with language
```python
def example():
    pass
```

| Tables | Are | Supported |
|--------|-----|-----------|
| Row 1  | A   | B         |
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Docusaurus](https://docusaurus.io/)
- Developed using [Spec-Driven Development](https://specify.dev/) methodology
- AI-assisted content creation with Claude Code

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Talib1973/ai-book-ned/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Talib1973/ai-book-ned/discussions)

## 🗺️ Roadmap

### Current Version: v0.1.0 (MVP)

- ✅ 6 core chapters with ~15,000 words
- ✅ Mobile-first responsive design
- ✅ Progress tracking with localStorage
- ✅ Light/dark mode
- ✅ WCAG 2.1 AA accessibility

### Future Enhancements (v0.2.0+)

- 🔄 RAG-powered chatbot for Q&A
- 🔄 Better-Auth authentication system
- 🔄 Urdu language translation (i18n)
- 🔄 Auto-generated chapter quizzes
- 🔄 Interactive diagrams and visualizations
- 🔄 Code playground for examples
- 🔄 PDF export functionality
- 🔄 Offline Progressive Web App (PWA)

---

**Built with ❤️ using Spec-Driven Development and AI-assisted content creation**

