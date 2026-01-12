/**
 * Custom DocItem wrapper to add progress tracking
 * This wraps Docusaurus's default DocItem component
 */

import React, { useEffect } from 'react';
import DocItem from '@theme-original/DocItem';
import type { Props } from '@theme/DocItem';
import { useLocation } from '@docusaurus/router';
import ChapterProgressTracker from '../../components/ChapterProgressTracker';
import { CHAPTERS } from '../../types';

export default function DocItemWrapper(props: Props) {
  const location = useLocation();

  // Find matching chapter based on pathname
  const currentChapter = CHAPTERS.find((ch) => {
    const chapterPath = `/docs/${ch.slug}`;
    return location.pathname === chapterPath || location.pathname.startsWith(chapterPath);
  });

  return (
    <>
      <DocItem {...props} />
      {currentChapter && (
        <div style={{ marginTop: '2rem' }}>
          <ChapterProgressTracker
            chapterId={currentChapter.id}
            chapterTitle={currentChapter.title}
            readingTime={currentChapter.readingTime}
          />
        </div>
      )}
    </>
  );
}
