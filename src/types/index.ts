/**
 * Type definitions for AI-Native Textbook
 * Physical AI & Humanoid Robotics
 */

/**
 * Represents a single chapter in the textbook
 */
export interface Chapter {
  /** Unique identifier (e.g., 'chapter-01') */
  id: string;

  /** Display title */
  title: string;

  /** URL slug for routing */
  slug: string;

  /** Estimated reading time in minutes */
  readingTime: number;

  /** Brief description/summary */
  description: string;

  /** Chapter number (1-6) */
  chapterNumber: number;

  /** Whether the chapter is part of MVP */
  isMvp?: boolean;
}

/**
 * User's reading progress tracked in localStorage
 */
export interface UserProgress {
  /** Array of chapter IDs that have been read */
  chaptersRead: string[];

  /** ID of the last chapter accessed */
  lastReadChapter: string | null;

  /** Total reading time in minutes */
  totalReadingTime: number;

  /** Timestamp of last activity (ISO 8601) */
  lastActivityTimestamp: string;

  /** Percentage of content completed (0-100) */
  progressPercentage: number;

  /** User preferences */
  preferences?: UserPreferences;
}

/**
 * User preferences for personalization
 */
export interface UserPreferences {
  /** Preferred theme: 'light' | 'dark' | 'auto' */
  theme: 'light' | 'dark' | 'auto';

  /** Font size multiplier (0.8 - 1.5) */
  fontSize: number;

  /** Language preference (for future i18n) */
  language: 'en' | 'ur';

  /** Whether to show reading time estimates */
  showReadingTime: boolean;
}

/**
 * Reading session data
 */
export interface ReadingSession {
  /** Chapter being read */
  chapterId: string;

  /** Session start timestamp */
  startTime: string;

  /** Session end timestamp (if completed) */
  endTime?: string;

  /** Duration in seconds */
  duration: number;
}

/**
 * Chapter metadata for frontmatter
 */
export interface ChapterFrontmatter {
  /** Chapter title */
  title: string;

  /** Reading time in minutes */
  reading_time: number;

  /** Optional description */
  description?: string;

  /** Optional tags */
  tags?: string[];

  /** Optional author override */
  author?: string;
}

/**
 * Navigation item structure
 */
export interface NavItem {
  /** Display label */
  label: string;

  /** Link URL */
  href?: string;

  /** Nested items */
  items?: NavItem[];

  /** Position: 'left' | 'right' */
  position?: 'left' | 'right';
}

/**
 * Site configuration type
 */
export interface SiteConfig {
  /** Site title */
  title: string;

  /** Site tagline */
  tagline: string;

  /** Production URL */
  url: string;

  /** Base URL path */
  baseUrl: string;

  /** GitHub organization/user */
  organizationName: string;

  /** GitHub repo name */
  projectName: string;
}

/**
 * localStorage key constants
 */
export const STORAGE_KEYS = {
  USER_PROGRESS: 'aibook_user_progress',
  USER_PREFERENCES: 'aibook_user_preferences',
  READING_SESSIONS: 'aibook_reading_sessions',
} as const;

/**
 * Chapter metadata constants
 */
export const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    title: 'Introduction',
    slug: 'intro',
    readingTime: 2,
    description: 'Welcome to the AI-Native Textbook for Physical AI & Humanoid Robotics',
    chapterNumber: 0,
    isMvp: true,
  },
  {
    id: 'chapter-01',
    title: 'Introduction to Physical AI',
    slug: 'chapter-01-intro-physical-ai',
    readingTime: 7,
    description: 'Understanding the foundations of Physical AI and its applications',
    chapterNumber: 1,
    isMvp: true,
  },
  {
    id: 'chapter-02',
    title: 'Humanoid Robot Fundamentals',
    slug: 'chapter-02-humanoid-fundamentals',
    readingTime: 8,
    description: 'Core concepts and architectures of humanoid robotics',
    chapterNumber: 2,
    isMvp: true,
  },
  {
    id: 'chapter-03',
    title: 'Sensors and Perception',
    slug: 'chapter-03-sensors-perception',
    readingTime: 8,
    description: 'How robots sense and understand their environment',
    chapterNumber: 3,
    isMvp: true,
  },
  {
    id: 'chapter-04',
    title: 'Actuation and Control',
    slug: 'chapter-04-actuation-control',
    readingTime: 8,
    description: 'Movement systems and control algorithms for humanoid robots',
    chapterNumber: 4,
    isMvp: true,
  },
  {
    id: 'chapter-05',
    title: 'AI Integration',
    slug: 'chapter-05-ai-integration',
    readingTime: 7,
    description: 'Integrating artificial intelligence into physical robot systems',
    chapterNumber: 5,
    isMvp: true,
  },
  {
    id: 'chapter-06',
    title: 'Real-World Applications',
    slug: 'chapter-06-real-world-applications',
    readingTime: 5,
    description: 'Current and future applications of humanoid robotics',
    chapterNumber: 6,
    isMvp: true,
  },
];

/**
 * Default user progress object
 */
export const DEFAULT_USER_PROGRESS: UserProgress = {
  chaptersRead: [],
  lastReadChapter: null,
  totalReadingTime: 0,
  lastActivityTimestamp: new Date().toISOString(),
  progressPercentage: 0,
  preferences: {
    theme: 'auto',
    fontSize: 1.0,
    language: 'en',
    showReadingTime: true,
  },
};
