import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { CHAPTERS } from '../types';
import ProgressBar from '../components/ProgressBar';
import {
  getUserProgress,
  isChapterRead,
  getProgressPercentage,
} from '../utils/localStorage';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning - 45 min read ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function ChapterCard({ chapter, isRead }: { chapter: typeof CHAPTERS[0]; isRead: boolean }) {
  return (
    <div className={clsx('card', styles.chapterCard, isRead && styles.chapterCardRead)}>
      <div className="card__header">
        <div className={styles.chapterCardHeader}>
          <h3>{chapter.title}</h3>
          {isRead && <span className={styles.completedBadge}>✓</span>}
        </div>
      </div>
      <div className="card__body">
        <p>{chapter.description}</p>
        <div className={styles.chapterMeta}>
          <span className={styles.readingTime}>
            📖 {chapter.readingTime} min read
          </span>
          {isRead && (
            <span className={styles.completedLabel}>Completed</span>
          )}
        </div>
      </div>
      <div className="card__footer">
        <Link
          className="button button--primary button--block"
          to={`/docs/${chapter.slug}`}>
          {isRead ? 'Read Again' : 'Read Chapter'}
        </Link>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: '📱 Mobile-First Design',
      description:
        'Optimized for reading on any device - from smartphones to 4K displays. Learn anytime, anywhere.',
    },
    {
      title: '🤖 AI-Native Content',
      description:
        'Comprehensive coverage of Physical AI and Humanoid Robotics with cutting-edge insights.',
    },
    {
      title: '⚡ Quick & Focused',
      description:
        'Complete the entire textbook in under 45 minutes. Concise, high-quality content that respects your time.',
    },
    {
      title: '💾 Progress Tracking',
      description:
        'Your reading progress is automatically saved. Pick up right where you left off.',
    },
    {
      title: '🎯 Structured Learning',
      description:
        'Six carefully designed chapters that build upon each other for optimal learning.',
    },
    {
      title: '🌐 Open & Accessible',
      description:
        'Free, open-source, and WCAG 2.1 AA compliant for maximum accessibility.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Why This Textbook?</h2>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className={clsx('col col--4', styles.feature)}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChaptersSection() {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [readChapters, setReadChapters] = useState<Set<string>>(new Set());

  // Filter out intro (chapter 0)
  const mainChapters = CHAPTERS.filter((ch) => ch.chapterNumber > 0);
  const totalReadingTime = mainChapters.reduce((sum, ch) => sum + ch.readingTime, 0);

  useEffect(() => {
    // Load progress on mount
    const loadProgress = () => {
      const percentage = getProgressPercentage();
      setProgressPercentage(percentage);

      const read = new Set<string>();
      mainChapters.forEach((chapter) => {
        if (isChapterRead(chapter.id)) {
          read.add(chapter.id);
        }
      });
      setReadChapters(read);
    };

    loadProgress();

    // Listen for storage events (cross-tab sync)
    const handleStorageChange = () => {
      loadProgress();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom progress update event
    window.addEventListener('progressUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('progressUpdated', handleStorageChange);
    };
  }, [mainChapters]);

  return (
    <section className={styles.chaptersSection}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <h2>Six Essential Chapters</h2>
          <p className={styles.totalTime}>
            Total Reading Time: ~{totalReadingTime} minutes
          </p>
        </div>

        {progressPercentage > 0 && (
          <div className={styles.progressContainer}>
            <ProgressBar percentage={progressPercentage} />
          </div>
        )}

        <div className={clsx('row', styles.chapterGrid)}>
          {mainChapters.map((chapter, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <ChapterCard
                chapter={chapter}
                isRead={readChapters.has(chapter.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className={clsx('hero hero--primary', styles.ctaSection)}>
      <div className="container text--center">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Dive into the fascinating world of Physical AI and Humanoid Robotics.
          <br />
          Learn the fundamentals in just 45 minutes.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Begin Learning Now →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="An AI-native interactive textbook for learning Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <ChaptersSection />
        <CallToActionSection />
      </main>
    </Layout>
  );
}
