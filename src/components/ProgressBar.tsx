/**
 * Progress Bar Component
 * Displays overall reading progress
 */

import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  percentage,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      {showLabel && (
        <div className={styles.progressLabel}>
          <span className={styles.progressText}>Reading Progress</span>
          <span className={styles.progressPercentage}>{clampedPercentage}%</span>
        </div>
      )}
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Reading progress: ${clampedPercentage}%`}
        />
      </div>
    </div>
  );
}
