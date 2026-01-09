/**
 * localStorage Utilities for Progress Tracking
 * Implements the localStorage interface contract
 */

import {
  UserProgress,
  UserPreferences,
  ReadingSession,
  STORAGE_KEYS,
  DEFAULT_USER_PROGRESS,
  CHAPTERS,
} from '../types';

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get user progress from localStorage
 */
export function getUserProgress(): UserProgress {
  if (!isLocalStorageAvailable()) {
    return DEFAULT_USER_PROGRESS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (!stored) {
      return DEFAULT_USER_PROGRESS;
    }

    const progress = JSON.parse(stored) as UserProgress;

    // Validate and migrate if needed
    const mergedProgress: UserProgress = {
      ...DEFAULT_USER_PROGRESS,
      ...progress,
      preferences: {
        ...DEFAULT_USER_PROGRESS.preferences!,
        ...(progress.preferences || {}),
      },
    };

    return mergedProgress;
  } catch (error) {
    console.error('Error reading user progress:', error);
    return DEFAULT_USER_PROGRESS;
  }
}

/**
 * Save user progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available');
    return;
  }

  try {
    const updated = {
      ...progress,
      lastActivityTimestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
}

/**
 * Mark a chapter as read
 */
export function markChapterAsRead(chapterId: string): void {
  const progress = getUserProgress();

  // Add to chaptersRead if not already there
  if (!progress.chaptersRead.includes(chapterId)) {
    progress.chaptersRead.push(chapterId);
  }

  // Update last read chapter
  progress.lastReadChapter = chapterId;

  // Calculate progress percentage
  const totalChapters = CHAPTERS.length;
  progress.progressPercentage = Math.round(
    (progress.chaptersRead.length / totalChapters) * 100
  );

  // Add reading time for this chapter
  const chapter = CHAPTERS.find((ch) => ch.id === chapterId);
  if (chapter) {
    progress.totalReadingTime += chapter.readingTime;
  }

  saveUserProgress(progress);
}

/**
 * Check if a chapter has been read
 */
export function isChapterRead(chapterId: string): boolean {
  const progress = getUserProgress();
  return progress.chaptersRead.includes(chapterId);
}

/**
 * Get progress percentage (0-100)
 */
export function getProgressPercentage(): number {
  const progress = getUserProgress();
  return progress.progressPercentage;
}

/**
 * Get list of read chapters
 */
export function getReadChapters(): string[] {
  const progress = getUserProgress();
  return progress.chaptersRead;
}

/**
 * Get total reading time in minutes
 */
export function getTotalReadingTime(): number {
  const progress = getUserProgress();
  return progress.totalReadingTime;
}

/**
 * Reset all progress (for testing or user request)
 */
export function resetProgress(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.READING_SESSIONS);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

/**
 * Get user preferences
 */
export function getUserPreferences(): UserPreferences {
  const progress = getUserProgress();
  return progress.preferences || DEFAULT_USER_PROGRESS.preferences!;
}

/**
 * Update user preferences
 */
export function updateUserPreferences(
  preferences: Partial<UserPreferences>
): void {
  const progress = getUserProgress();
  progress.preferences = {
    ...progress.preferences!,
    ...preferences,
  };
  saveUserProgress(progress);
}

/**
 * Start a reading session
 */
export function startReadingSession(chapterId: string): ReadingSession {
  const session: ReadingSession = {
    chapterId,
    startTime: new Date().toISOString(),
    duration: 0,
  };

  if (!isLocalStorageAvailable()) {
    return session;
  }

  try {
    // Store current session in sessionStorage (temporary)
    sessionStorage.setItem('current_reading_session', JSON.stringify(session));
  } catch (error) {
    console.error('Error starting reading session:', error);
  }

  return session;
}

/**
 * End a reading session
 */
export function endReadingSession(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const sessionData = sessionStorage.getItem('current_reading_session');
    if (!sessionData) {
      return;
    }

    const session = JSON.parse(sessionData) as ReadingSession;
    const endTime = new Date();
    const startTime = new Date(session.startTime);
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    session.endTime = endTime.toISOString();
    session.duration = duration;

    // Mark chapter as read if session was meaningful (>10 seconds)
    if (duration > 10) {
      markChapterAsRead(session.chapterId);
    }

    // Save to reading sessions history
    const sessions = getReadingSessions();
    sessions.push(session);
    localStorage.setItem(
      STORAGE_KEYS.READING_SESSIONS,
      JSON.stringify(sessions.slice(-50)) // Keep last 50 sessions
    );

    // Clear current session
    sessionStorage.removeItem('current_reading_session');
  } catch (error) {
    console.error('Error ending reading session:', error);
  }
}

/**
 * Get reading sessions history
 */
export function getReadingSessions(): ReadingSession[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.READING_SESSIONS);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as ReadingSession[];
  } catch (error) {
    console.error('Error reading sessions:', error);
    return [];
  }
}

/**
 * Export progress data (for backup or transfer)
 */
export function exportProgressData(): string {
  const progress = getUserProgress();
  const sessions = getReadingSessions();

  return JSON.stringify(
    {
      progress,
      sessions,
      exportDate: new Date().toISOString(),
      version: '1.0',
    },
    null,
    2
  );
}

/**
 * Import progress data (from backup or transfer)
 */
export function importProgressData(data: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const imported = JSON.parse(data);

    if (imported.progress) {
      saveUserProgress(imported.progress);
    }

    if (imported.sessions) {
      localStorage.setItem(
        STORAGE_KEYS.READING_SESSIONS,
        JSON.stringify(imported.sessions)
      );
    }

    return true;
  } catch (error) {
    console.error('Error importing progress data:', error);
    return false;
  }
}
