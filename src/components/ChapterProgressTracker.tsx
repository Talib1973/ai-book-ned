/**
 * Chapter Progress Tracker Component
 * Tracks when a chapter is read and displays completion status
 */

import React, { useEffect, useState } from 'react';
import {
  markChapterAsRead,
  isChapterRead,
  startReadingSession,
  endReadingSession,
} from '../utils/localStorage';
import styles from './ChapterProgressTracker.module.css';

interface ChapterProgressTrackerProps {
  chapterId: string;
  chapterTitle: string;
  readingTime: number;
}

export default function ChapterProgressTracker({
  chapterId,
  chapterTitle,
  readingTime,
}: ChapterProgressTrackerProps) {
  const [isRead, setIsRead] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  useEffect(() => {
    // Check if chapter is already read
    setIsRead(isChapterRead(chapterId));

    // Start reading session
    startReadingSession(chapterId);

    // Mark as read after user has been on page for reasonable time
    const minReadTime = Math.min(readingTime * 60 * 0.3, 30); // 30% of reading time or 30 seconds
    const markAsReadTimer = setTimeout(() => {
      if (!isChapterRead(chapterId)) {
        markChapterAsRead(chapterId);
        setIsRead(true);
        setShowCompletionMessage(true);

        // Hide completion message after 5 seconds
        setTimeout(() => {
          setShowCompletionMessage(false);
        }, 5000);
      }
    }, minReadTime * 1000);

    // End session on unmount
    return () => {
      clearTimeout(markAsReadTimer);
      endReadingSession();
    };
  }, [chapterId, readingTime]);

  return (
    <>
      {isRead && (
        <div className={styles.completionBadge}>
          <span className={styles.checkmark}>✓</span>
          <span>Chapter Completed</span>
        </div>
      )}

      {showCompletionMessage && (
        <div className={styles.completionNotification} role="status" aria-live="polite">
          <div className={styles.notificationContent}>
            <span className={styles.notificationIcon}>🎉</span>
            <div className={styles.notificationText}>
              <strong>Chapter Completed!</strong>
              <p>Your progress has been saved automatically.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
