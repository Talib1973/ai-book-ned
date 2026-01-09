# localStorage Interface Contract

**Feature**: 001-docusaurus-textbook-setup
**Date**: 2026-01-09
**Version**: 1.0

## Overview

This document defines the contract for interacting with browser localStorage for progress tracking. Since this is a client-side only feature, there are no REST/GraphQL APIs. Instead, this contract specifies the localStorage key-value interface and the TypeScript API for the React hook.

---

## localStorage Schema

### Key: `ai-textbook-progress`

**Type**: JSON string
**Max Size**: ~500 bytes (well under 5MB localStorage limit)
**Lifetime**: Persistent until manually cleared

**Value Structure**:

```typescript
{
  "version": "1.0",
  "completedChapters": string[],
  "currentChapter": string | null,
  "lastAccessed": string,           // ISO 8601 format
  "totalChapters": 6,
  "completionPercentage": number    // 0-100
}
```

**Example**:
```json
{
  "version": "1.0",
  "completedChapters": [
    "chapter-01-intro-physical-ai",
    "chapter-02-humanoid-fundamentals"
  ],
  "currentChapter": "chapter-03-sensors-perception",
  "lastAccessed": "2026-01-09T15:45:30.123Z",
  "totalChapters": 6,
  "completionPercentage": 33
}
```

---

## React Hook API: `useProgress`

### Type Definitions

```typescript
interface UserProgress {
  version: string;
  completedChapters: string[];
  currentChapter: string | null;
  lastAccessed: string;
  totalChapters: number;
  completionPercentage: number;
}

interface UseProgressReturn {
  // State
  progress: UserProgress;
  isLoading: boolean;
  error: Error | null;

  // Actions
  markChapterComplete: (chapterId: string) => void;
  markChapterIncomplete: (chapterId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  resetProgress: () => void;

  // Queries
  isChapterCompleted: (chapterId: string) => boolean;
  getCompletedCount: () => number;
  getNextIncompleteChapter: () => string | null;
}

function useProgress(): UseProgressReturn;
```

---

## API Methods

### `markChapterComplete(chapterId: string)`

**Purpose**: Mark a chapter as completed.

**Preconditions**:
- `chapterId` must be a valid chapter ID
- `chapterId` not already in `completedChapters`

**Postconditions**:
- `completedChapters` includes `chapterId`
- `completionPercentage` recalculated
- `lastAccessed` updated to current timestamp
- localStorage updated

**Side Effects**:
- Writes to localStorage
- Updates React state
- Re-renders components using the hook

**Error Handling**:
- Invalid `chapterId`: Log warning, no-op
- localStorage full: Catch `QuotaExceededError`, set `error` state
- Private browsing: Catch error, set `error` state

**Example**:
```typescript
const { markChapterComplete } = useProgress();
markChapterComplete("chapter-01-intro-physical-ai");
```

---

### `markChapterIncomplete(chapterId: string)`

**Purpose**: Remove completion status from a chapter (for re-reading).

**Preconditions**:
- `chapterId` must be in `completedChapters`

**Postconditions**:
- `completedChapters` no longer includes `chapterId`
- `completionPercentage` recalculated
- `lastAccessed` updated
- localStorage updated

**Example**:
```typescript
const { markChapterIncomplete } = useProgress();
markChapterIncomplete("chapter-01-intro-physical-ai");
```

---

### `setCurrentChapter(chapterId: string)`

**Purpose**: Update the current chapter being viewed (for resume functionality).

**Preconditions**:
- `chapterId` must be a valid chapter ID

**Postconditions**:
- `currentChapter` set to `chapterId`
- `lastAccessed` updated
- localStorage updated

**Side Effects**:
- Does NOT mark chapter as complete (separate action)
- Used for "Resume where you left off" feature

**Example**:
```typescript
const { setCurrentChapter } = useProgress();

// In chapter page component
useEffect(() => {
  setCurrentChapter("chapter-03-sensors-perception");
}, []);
```

---

### `resetProgress()`

**Purpose**: Clear all progress data (start fresh).

**Preconditions**: None

**Postconditions**:
- `completedChapters` = `[]`
- `currentChapter` = `null`
- `completionPercentage` = `0`
- `lastAccessed` updated to now
- localStorage updated

**Confirmation**: Should prompt user before executing (implemented in UI, not hook)

**Example**:
```typescript
const { resetProgress } = useProgress();

// In settings component
const handleReset = () => {
  if (confirm("Reset all progress? This cannot be undone.")) {
    resetProgress();
  }
};
```

---

### `isChapterCompleted(chapterId: string): boolean`

**Purpose**: Query if a specific chapter has been completed.

**Returns**:
- `true` if `chapterId` in `completedChapters`
- `false` otherwise

**Example**:
```typescript
const { isChapterCompleted } = useProgress();

const chapter1Done = isChapterCompleted("chapter-01-intro-physical-ai");
// → true if completed, false otherwise
```

---

### `getCompletedCount(): number`

**Purpose**: Get total number of completed chapters.

**Returns**: Length of `completedChapters` array (0-6)

**Example**:
```typescript
const { getCompletedCount } = useProgress();

const count = getCompletedCount();
console.log(`You've completed ${count} of 6 chapters`);
```

---

### `getNextIncompleteChapter(): string | null`

**Purpose**: Find the next chapter that hasn't been completed (for "Continue Reading" button).

**Logic**:
1. Get all chapters ordered by `order` field
2. Filter out completed chapters
3. Return first incomplete chapter ID
4. If all complete, return `null`

**Returns**:
- Chapter ID of next incomplete chapter
- `null` if all chapters completed

**Example**:
```typescript
const { getNextIncompleteChapter } = useProgress();

const nextChapter = getNextIncompleteChapter();
if (nextChapter) {
  navigate(`/docs/${nextChapter}`);
} else {
  showCompletionMessage();
}
```

---

## Error Handling

### localStorage Quota Exceeded

**Scenario**: User's localStorage is full (rare, limit is 5-10MB per origin)

**Detection**:
```typescript
try {
  localStorage.setItem('ai-textbook-progress', JSON.stringify(progress));
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // Handle quota error
  }
}
```

**Response**:
1. Set `error` state in hook
2. Log warning to console
3. Show user-friendly message: "Unable to save progress. Your storage may be full."
4. Continue functioning (progress just won't persist)

---

### Private Browsing Mode

**Scenario**: User in incognito/private mode where localStorage may throw errors

**Detection**:
```typescript
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
```

**Response**:
1. Detect on hook initialization
2. If unavailable, set `error` state
3. Show message: "Progress tracking unavailable in private browsing mode"
4. Allow reading without progress tracking

---

### Corrupted Data

**Scenario**: localStorage contains invalid JSON or malformed data

**Detection**:
```typescript
try {
  const data = JSON.parse(localStorage.getItem('ai-textbook-progress'));
  validateProgress(data);  // Schema validation
} catch (e) {
  // Corrupted data
}
```

**Response**:
1. Log error to console
2. Reset to initial state
3. Don't show error to user (transparent recovery)

---

### Invalid Chapter IDs

**Scenario**: User has chapter IDs in localStorage that don't exist (e.g., after content update)

**Detection**: Check if `chapterId` exists in list of valid chapters

**Response**:
1. Filter out invalid IDs when loading
2. Recalculate completion percentage
3. Save cleaned data back to localStorage

---

## State Initialization

### Initial State (Empty localStorage)

```typescript
const initialProgress: UserProgress = {
  version: "1.0",
  completedChapters: [],
  currentChapter: null,
  lastAccessed: new Date().toISOString(),
  totalChapters: 6,
  completionPercentage: 0
};
```

### Load from localStorage

```typescript
function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem('ai-textbook-progress');
    if (!stored) return initialProgress;

    const data = JSON.parse(stored);

    // Validate schema
    if (!validateProgress(data)) {
      console.warn('Invalid progress data, resetting');
      return initialProgress;
    }

    // Migrate if needed
    if (data.version !== "1.0") {
      return migrateProgress(data);
    }

    return data;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return initialProgress;
  }
}
```

---

## Performance Considerations

### localStorage is Synchronous

- All read/write operations block the main thread
- Typically <1ms for small data (<1KB)
- UserProgress JSON is ~500 bytes, well within acceptable range

### Optimization Strategies

1. **Debounce writes**: Don't save on every state change, debounce by 500ms
2. **Batch updates**: Combine multiple state changes into single localStorage write
3. **Read once**: Load on mount, keep in React state, don't re-read from localStorage

**Example Debounced Write**:
```typescript
const debouncedSave = debounce((progress: UserProgress) => {
  localStorage.setItem('ai-textbook-progress', JSON.stringify(progress));
}, 500);

// In hook
useEffect(() => {
  debouncedSave(progress);
}, [progress]);
```

---

## Testing Contract

### Unit Tests

```typescript
describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty progress', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.completedChapters).toEqual([]);
  });

  it('marks chapter as complete', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markChapterComplete('chapter-01');
    });

    expect(result.current.isChapterCompleted('chapter-01')).toBe(true);
    expect(result.current.progress.completionPercentage).toBe(17); // 1/6 ≈ 17%
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markChapterComplete('chapter-01');
    });

    const stored = JSON.parse(localStorage.getItem('ai-textbook-progress'));
    expect(stored.completedChapters).toContain('chapter-01');
  });

  it('handles localStorage quota error gracefully', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markChapterComplete('chapter-01');
    });

    expect(result.current.error).toBeTruthy();
  });
});
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-09 | Initial localStorage contract |

---

## Summary

**Interface Type**: Browser localStorage + React Hook
**Storage Key**: `ai-textbook-progress`
**Data Format**: JSON
**Max Size**: ~500 bytes
**Methods**: 8 (4 mutations, 3 queries, 1 reset)
**Error Handling**: Graceful degradation for all failure modes
**Performance**: <1ms operations, debounced writes

**Next**: Create quickstart.md for developer setup instructions
