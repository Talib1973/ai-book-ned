# Data Model: Docusaurus Textbook Setup

**Feature**: 001-docusaurus-textbook-setup
**Date**: 2026-01-09
**Phase**: 1 (Design)

## Overview

This document defines the data structures for the Physical AI textbook platform. Since this is a static site with client-side progress tracking, there is no backend database. All data entities are either content files (Markdown/MDX) or client-side state (localStorage).

---

## Entity 1: Chapter

**Purpose**: Represents a single unit of learning content in the textbook.

**Storage**: MDX files in `/docs` directory

**Structure**:

```typescript
interface Chapter {
  // Frontmatter metadata
  id: string;                    // Unique identifier (e.g., "chapter-01-intro-physical-ai")
  title: string;                 // Display title (e.g., "Chapter 1: Introduction to Physical AI")
  description: string;           // Brief summary for table of contents
  readingTime: number;           // Estimated minutes to read (calculated automatically)
  order: number;                 // Chapter sequence number (1-6)
  slug: string;                  // URL path (derived from id)

  // Content
  content: string;               // Markdown/MDX body

  // Optional metadata
  keywords?: string[];           // Topics covered (for future search)
  lastUpdated?: string;          // ISO date string
  author?: string;               // Content author
}
```

**Example (Frontmatter)**:

```mdx
---
id: chapter-01-intro-physical-ai
title: "Chapter 1: Introduction to Physical AI"
description: "Explore the foundations of Physical AI and its real-world applications in robotics, autonomous systems, and embodied intelligence"
readingTime: 7
order: 1
keywords: ["physical AI", "embodied intelligence", "robotics", "autonomous systems"]
lastUpdated: "2026-01-09"
---
```

**Validation Rules**:
- `id` must be unique across all chapters
- `title` required, max 100 characters
- `description` required, max 200 characters
- `readingTime` must be 6-8 minutes (spec requirement)
- `order` must be 1-6 (exactly 6 chapters)
- `content` must be at least 1,200 words, max 1,500 words

**Relationships**:
- **Next Chapter**: `order + 1` (null if order === 6)
- **Previous Chapter**: `order - 1` (null if order === 1)
- **Parent**: Textbook (implicit)

**Access Patterns**:
1. Get chapter by ID: `docs/{id}.md`
2. Get chapter by order: Filter chapters where `order === n`
3. Get all chapters: Read all files in `docs/` matching `chapter-*.md` pattern
4. Get next/previous: Calculate from current `order`

---

## Entity 2: UserProgress

**Purpose**: Tracks a reader's journey through the textbook, including completed chapters and current position.

**Storage**: Browser `localStorage` (key: `ai-textbook-progress`)

**Structure**:

```typescript
interface UserProgress {
  version: string;                   // Schema version for future migrations ("1.0")
  completedChapters: string[];       // Array of chapter IDs marked complete
  currentChapter: string | null;     // ID of last visited chapter
  lastAccessed: string;              // ISO timestamp of last activity
  totalChapters: number;             // Total chapters in textbook (6)
  completionPercentage: number;      // Calculated: (completed.length / total) * 100
}
```

**Example (localStorage JSON)**:

```json
{
  "version": "1.0",
  "completedChapters": [
    "chapter-01-intro-physical-ai",
    "chapter-02-humanoid-fundamentals",
    "chapter-03-sensors-perception"
  ],
  "currentChapter": "chapter-04-actuation-control",
  "lastAccessed": "2026-01-09T14:30:00.000Z",
  "totalChapters": 6,
  "completionPercentage": 50
}
```

**Validation Rules**:
- `completedChapters` must be array of valid chapter IDs (no duplicates)
- `currentChapter` must be valid chapter ID or null
- `lastAccessed` must be valid ISO 8601 date string
- `totalChapters` must always be 6
- `completionPercentage` must be integer 0-100

**State Transitions**:

```
Initial State:
  completedChapters: []
  currentChapter: null
  completionPercentage: 0

User visits chapter:
  currentChapter ← chapterId
  lastAccessed ← new Date().toISOString()

User completes chapter:
  completedChapters ← [...completedChapters, chapterId]
  completionPercentage ← (completedChapters.length / 6) * 100

User resets progress:
  completedChapters ← []
  currentChapter ← null
  completionPercentage ← 0
  lastAccessed ← new Date().toISOString()
```

**Error Handling**:
- **localStorage full**: Catch `QuotaExceededError`, log to console, gracefully degrade (no progress tracking)
- **Corrupted data**: Try `JSON.parse`, catch error, reset to initial state
- **Invalid chapter ID**: Ignore invalid IDs when loading from localStorage
- **Private browsing**: Detect via try/catch on `localStorage.setItem`, show warning

**Relationships**:
- **Chapters**: References chapter IDs (foreign key relationship)

**Access Patterns**:
1. Load progress: `JSON.parse(localStorage.getItem('ai-textbook-progress'))`
2. Save progress: `localStorage.setItem('ai-textbook-progress', JSON.stringify(progress))`
3. Reset progress: `localStorage.removeItem('ai-textbook-progress')`
4. Check if chapter complete: `progress.completedChapters.includes(chapterId)`

---

## Entity 3: NavigationItem

**Purpose**: Represents an entry in the table of contents for easy navigation.

**Storage**: Derived from Chapter metadata (not persisted separately)

**Structure**:

```typescript
interface NavigationItem {
  id: string;                    // Chapter ID
  label: string;                 // Display text (chapter title)
  href: string;                  // Link URL (/docs/chapter-01-intro-physical-ai)
  order: number;                 // Position in navigation (1-6)
  readingTime: number;           // Minutes to read
  isCompleted: boolean;          // Derived from UserProgress
  isActive: boolean;             // True if currently viewing this chapter
}
```

**Example (Runtime)**:

```typescript
const navItems: NavigationItem[] = [
  {
    id: "chapter-01-intro-physical-ai",
    label: "Chapter 1: Introduction to Physical AI",
    href: "/docs/chapter-01-intro-physical-ai",
    order: 1,
    readingTime: 7,
    isCompleted: true,    // Derived from UserProgress
    isActive: false
  },
  {
    id: "chapter-02-humanoid-fundamentals",
    label: "Chapter 2: Humanoid Robotics Fundamentals",
    href: "/docs/chapter-02-humanoid-fundamentals",
    order: 2,
    readingTime: 8,
    isCompleted: true,
    isActive: false
  },
  {
    id: "chapter-03-sensors-perception",
    label: "Chapter 3: Sensors and Perception",
    href: "/docs/chapter-03-sensors-perception",
    order: 3,
    readingTime: 6,
    isCompleted: false,
    isActive: true        // Currently viewing
  }
  // ... chapters 4-6
];
```

**Derivation Logic**:

```typescript
function buildNavigationItems(
  chapters: Chapter[],
  progress: UserProgress,
  activeChapterId: string
): NavigationItem[] {
  return chapters
    .sort((a, b) => a.order - b.order)
    .map(chapter => ({
      id: chapter.id,
      label: chapter.title,
      href: `/docs/${chapter.slug}`,
      order: chapter.order,
      readingTime: chapter.readingTime,
      isCompleted: progress.completedChapters.includes(chapter.id),
      isActive: chapter.id === activeChapterId
    }));
}
```

**Relationships**:
- **Chapter**: One-to-one mapping
- **UserProgress**: Uses completion status to determine `isCompleted`

**Access Patterns**:
1. Get all navigation items: Build from all chapters + current progress
2. Get active item: Filter where `isActive === true`
3. Get next incomplete: Filter where `isCompleted === false`, take first

---

## Entity 4: ThemePreference

**Purpose**: Stores user's light/dark mode preference.

**Storage**: Browser `localStorage` (key: `theme`) - managed by Docusaurus

**Structure**:

```typescript
type ThemePreference = "light" | "dark";
```

**Example**:
```
localStorage.getItem('theme') → "dark"
```

**Validation Rules**:
- Must be exactly "light" or "dark"
- Defaults to system preference if not set
- Invalid values fallback to system preference

**State Transitions**:
```
Initial: Check system preference (prefers-color-scheme: dark)
User toggles: "light" ↔ "dark"
Store in localStorage for persistence
```

---

## Data Flow Diagrams

### Reading a Chapter

```
User navigates to chapter
  ↓
Load Chapter from /docs/{id}.md
  ↓
Load UserProgress from localStorage
  ↓
Update currentChapter in UserProgress
  ↓
Save UserProgress to localStorage
  ↓
Render chapter with progress indicator
```

### Completing a Chapter

```
User clicks "Mark as Complete"
  ↓
Load UserProgress from localStorage
  ↓
Add chapter ID to completedChapters
  ↓
Recalculate completionPercentage
  ↓
Update lastAccessed timestamp
  ↓
Save UserProgress to localStorage
  ↓
Update UI (show checkmark, update progress bar)
```

### Building Table of Contents

```
Load all Chapter metadata from /docs/*.md
  ↓
Load UserProgress from localStorage
  ↓
Build NavigationItem[] with completion status
  ↓
Render table of contents with visual indicators
```

---

## Constraints and Invariants

### Data Integrity

1. **Chapter Order Uniqueness**: No two chapters can have the same `order` value
2. **Completion Immutability**: Once marked complete, chapter stays complete until reset
3. **Total Chapters**: Always exactly 6 chapters (hardcoded in spec)
4. **Reading Time**: Each chapter 6-8 minutes, total under 45 minutes

### localStorage Constraints

1. **Size Limit**: UserProgress typically <1KB, well under 5MB localStorage limit
2. **Same-Origin Policy**: Progress only accessible from same domain
3. **Synchronous API**: All localStorage operations block, but fast enough (<1ms)

### Performance Constraints

1. **Chapter Load Time**: Entire chapter (text + metadata) loads in <200ms
2. **Progress Update**: Save to localStorage in <10ms
3. **Navigation Build**: Generate NavigationItems in <50ms

---

## Migration Strategy

### Future Schema Changes

When `UserProgress` schema changes, handle with version field:

```typescript
function migrateProgress(data: any): UserProgress {
  if (data.version === "1.0") {
    return data as UserProgress;
  }

  // Handle older versions
  if (!data.version) {
    // Migrate from pre-version schema
    return {
      version: "1.0",
      completedChapters: data.completed || [],
      currentChapter: data.current || null,
      lastAccessed: new Date().toISOString(),
      totalChapters: 6,
      completionPercentage: /* calculate */
    };
  }

  // Unknown version: reset
  return initializeProgress();
}
```

---

## Summary

**Entities Defined**: 4
1. **Chapter**: Content files (MDX)
2. **UserProgress**: localStorage state
3. **NavigationItem**: Derived runtime data
4. **ThemePreference**: localStorage state (Docusaurus-managed)

**Storage**:
- File system (MDX files)
- Browser localStorage (progress, theme)

**Relationships**:
- Chapters linked by order
- NavigationItems derived from Chapters + UserProgress

**Next Step**: Define localStorage API contract in contracts/localStorage-interface.md
