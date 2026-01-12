# Tasks: Docusaurus Textbook Setup

**Input**: Design documents from `/specs/001-docusaurus-textbook-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT requested in the specification. Tasks focus on implementation only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Docusaurus structure - `docs/`, `src/`, `static/` at repository root
- All paths are relative to repository root `/mnt/c/Users/DELL/Desktop/GENERATIVE AI/AI_BOOK_NED/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Docusaurus setup

- [ ] T001 Initialize Docusaurus project with TypeScript template in repository root
- [ ] T002 [P] Configure TypeScript with tsconfig.json for React 18 and strict mode
- [ ] T003 [P] Install dependencies (Docusaurus 3.x, React 18, TypeScript 5.x) via package.json
- [ ] T004 [P] Configure Docusaurus settings in docusaurus.config.js (site metadata, theme, navbar)
- [ ] T005 [P] Configure sidebar navigation structure in sidebars.js for 6 chapters
- [ ] T006 Create .gitignore file with node_modules, build, .docusaurus
- [ ] T007 Create README.md with project overview and quickstart instructions

**Checkpoint**: Docusaurus skeleton ready - can run `npm start` successfully

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Configure custom CSS theme in src/css/custom.css for mobile-first responsive design
- [ ] T009 [P] Configure light mode color palette in src/css/custom.css (background, text, primary colors)
- [ ] T010 [P] Configure dark mode color palette in src/css/custom.css with WCAG AA contrast ratios
- [ ] T011 [P] Set up responsive breakpoints in src/css/custom.css (320px, 768px, 996px, 1440px)
- [ ] T012 Create shared TypeScript types file src/types/index.ts for Chapter, UserProgress interfaces
- [ ] T013 Create static assets directory structure static/img/ for chapter diagrams
- [ ] T014 [P] Configure accessibility settings in docusaurus.config.js (WCAG 2.1 AA compliance)
- [ ] T015 [P] Add meta tags for responsive viewport in docusaurus.config.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read Textbook Chapters on Any Device (Priority: P1) 🎯 MVP

**Goal**: Users can read all 6 chapters on any device with clean, responsive design

**Independent Test**: Open textbook on mobile device, navigate to any chapter, verify readable text and proper formatting without horizontal scrolling

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create Chapter 1 MDX file docs/chapter-01-intro-physical-ai.md with frontmatter (id, title, description, readingTime: 7, order: 1)
- [ ] T017 [P] [US1] Create Chapter 2 MDX file docs/chapter-02-humanoid-fundamentals.md with frontmatter (readingTime: 8, order: 2)
- [ ] T018 [P] [US1] Create Chapter 3 MDX file docs/chapter-03-sensors-perception.md with frontmatter (readingTime: 6, order: 3)
- [ ] T019 [P] [US1] Create Chapter 4 MDX file docs/chapter-04-actuation-control.md with frontmatter (readingTime: 7, order: 4)
- [ ] T020 [P] [US1] Create Chapter 5 MDX file docs/chapter-05-ai-integration.md with frontmatter (readingTime: 8, order: 5)
- [ ] T021 [P] [US1] Create Chapter 6 MDX file docs/chapter-06-real-world-applications.md with frontmatter (readingTime: 7, order: 6)
- [ ] T022 [P] [US1] Write content for Chapter 1 (1,200-1,500 words on Introduction to Physical AI)
- [ ] T023 [P] [US1] Write content for Chapter 2 (1,200-1,500 words on Humanoid Robotics Fundamentals)
- [ ] T024 [P] [US1] Write content for Chapter 3 (1,200-1,500 words on Sensors and Perception)
- [ ] T025 [P] [US1] Write content for Chapter 4 (1,200-1,500 words on Actuation and Control)
- [ ] T026 [P] [US1] Write content for Chapter 5 (1,200-1,500 words on AI Integration and Learning)
- [ ] T027 [P] [US1] Write content for Chapter 6 (1,200-1,500 words on Real-world Applications and Future Trends)
- [ ] T028 [P] [US1] Add responsive images to Chapter 1 in static/img/chapter-01/ with WebP format and alt text
- [ ] T029 [P] [US1] Add responsive images to Chapter 2 in static/img/chapter-02/ with WebP format and alt text
- [ ] T030 [P] [US1] Add responsive images to Chapter 3 in static/img/chapter-03/ with WebP format and alt text
- [ ] T031 [P] [US1] Add responsive images to Chapter 4 in static/img/chapter-04/ with WebP format and alt text
- [ ] T032 [P] [US1] Add responsive images to Chapter 5 in static/img/chapter-05/ with WebP format and alt text
- [ ] T033 [P] [US1] Add responsive images to Chapter 6 in static/img/chapter-06/ with WebP format and alt text
- [ ] T034 [US1] Update sidebars.js to include all 6 chapters in correct order
- [ ] T035 [US1] Create custom homepage src/pages/index.tsx with table of contents showing all chapters
- [ ] T036 [US1] Add semantic HTML structure to homepage (main, article, nav elements)
- [ ] T037 [US1] Verify mobile responsiveness on 320px width devices (no horizontal scrolling)
- [ ] T038 [US1] Verify tablet responsiveness in landscape mode (images and text properly sized)
- [ ] T039 [US1] Verify desktop layout with proper margins and centered content
- [ ] T040 [US1] Test page load times on simulated 4G connection (target <2 seconds)
- [ ] T041 [US1] Verify lazy loading of images and progressive content rendering

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - textbook is readable on all devices

---

## Phase 4: User Story 2 - Navigate Between Chapters Easily (Priority: P2)

**Goal**: Users can easily navigate between chapters with clear table of contents and position indicators

**Independent Test**: Open textbook, use navigation menu to jump between chapters, verify current chapter highlighting and next/prev buttons work

### Implementation for User Story 2

- [ ] T042 [P] [US2] Create ChapterNav component in src/components/ChapterNav/ChapterNav.tsx for next/previous navigation
- [ ] T043 [P] [US2] Create ChapterNav styles in src/components/ChapterNav/ChapterNav.module.css with mobile-first responsive design
- [ ] T044 [P] [US2] Create ReadingProgress component in src/components/ReadingProgress/ReadingProgress.tsx showing current position
- [ ] T045 [P] [US2] Create ReadingProgress styles in src/components/ReadingProgress/ReadingProgress.module.css
- [ ] T046 [US2] Implement chapter metadata extraction logic in src/utils/chapterUtils.ts (get all chapters, order, titles)
- [ ] T047 [US2] Add ChapterNav component to each chapter MDX file (at bottom for next/previous buttons)
- [ ] T048 [US2] Add breadcrumb navigation to docusaurus.config.js theme configuration
- [ ] T049 [US2] Update homepage table of contents in src/pages/index.tsx to show reading time estimates
- [ ] T050 [US2] Highlight current chapter in sidebar navigation using Docusaurus theme hooks
- [ ] T051 [US2] Ensure keyboard navigation works (tab through chapters, enter to navigate)
- [ ] T052 [US2] Test navigation menu on mobile (hamburger menu opens/closes smoothly)
- [ ] T053 [US2] Test next/previous buttons take user to correct chapters
- [ ] T054 [US2] Test browser back button returns to previous chapter correctly

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - textbook is readable with full navigation

---

## Phase 5: User Story 3 - Track Reading Progress (Priority: P3)

**Goal**: Users can track completed chapters and resume where they left off

**Independent Test**: Read multiple chapters, close browser, reopen textbook, verify progress is remembered and chapters show completion status

### Implementation for User Story 3

- [ ] T055 [P] [US3] Create useProgress hook in src/hooks/useProgress.ts implementing localStorage interface
- [ ] T056 [P] [US3] Implement loadProgress function in src/hooks/useProgress.ts with JSON parsing and validation
- [ ] T057 [P] [US3] Implement saveProgress function in src/hooks/useProgress.ts with error handling for quota exceeded
- [ ] T058 [P] [US3] Implement markChapterComplete function in src/hooks/useProgress.ts
- [ ] T059 [P] [US3] Implement markChapterIncomplete function in src/hooks/useProgress.ts
- [ ] T060 [P] [US3] Implement setCurrentChapter function in src/hooks/useProgress.ts
- [ ] T061 [P] [US3] Implement resetProgress function in src/hooks/useProgress.ts
- [ ] T062 [P] [US3] Implement isChapterCompleted query function in src/hooks/useProgress.ts
- [ ] T063 [P] [US3] Implement getCompletedCount query function in src/hooks/useProgress.ts
- [ ] T064 [P] [US3] Implement getNextIncompleteChapter query function in src/hooks/useProgress.ts
- [ ] T065 [P] [US3] Add error handling for private browsing mode in src/hooks/useProgress.ts
- [ ] T066 [P] [US3] Add error handling for corrupted localStorage data in src/hooks/useProgress.ts
- [ ] T067 [US3] Create ProgressTracker component in src/components/ProgressTracker/ProgressTracker.tsx using useProgress hook
- [ ] T068 [US3] Create ProgressTracker styles in src/components/ProgressTracker/ProgressTracker.module.css
- [ ] T069 [US3] Add completion checkmarks to table of contents in src/pages/index.tsx
- [ ] T070 [US3] Add overall completion percentage display to homepage in src/pages/index.tsx
- [ ] T071 [US3] Add "Resume Reading" button to homepage showing last visited chapter
- [ ] T072 [US3] Add "Mark as Complete" button at end of each chapter MDX file
- [ ] T073 [US3] Add progress reset functionality to homepage settings area
- [ ] T074 [US3] Test progress persistence across browser sessions (close and reopen)
- [ ] T075 [US3] Test completion percentage calculation (verify correct when 0, 3, 6 chapters complete)
- [ ] T076 [US3] Test reset functionality clears all progress data
- [ ] T077 [US3] Verify localStorage data structure matches contract (ai-textbook-progress key)

**Checkpoint**: All user stories should now be independently functional - textbook with reading, navigation, and progress tracking

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final production readiness

- [ ] T078 [P] Add favicon and app icons to static/img/
- [ ] T079 [P] Configure SEO metadata in docusaurus.config.js (description, keywords, og:image)
- [ ] T080 [P] Add Google Analytics or privacy-friendly analytics to docusaurus.config.js (optional)
- [ ] T081 Optimize all images in static/img/ (compress, ensure <200KB each)
- [ ] T082 Run Lighthouse audit on all pages and achieve Performance score 90+
- [ ] T083 Run Lighthouse audit for Accessibility and achieve score 100
- [ ] T084 Test keyboard navigation through all interactive elements (no keyboard traps)
- [ ] T085 Test with screen reader (NVDA or VoiceOver) for all chapters
- [ ] T086 Verify WCAG 2.1 AA color contrast ratios using axe DevTools
- [ ] T087 Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] T088 Test on physical mobile devices (iOS and Android)
- [ ] T089 Verify total reading time is under 45 minutes (test with 3 readers)
- [ ] T090 Create production build with npm run build and verify no errors
- [ ] T091 Test production build locally with npm run serve
- [ ] T092 Configure deployment to Vercel or Netlify
- [ ] T093 Deploy to production and verify live URL works
- [ ] T094 Create documentation in docs/intro.md explaining how to use the textbook
- [ ] T095 Update README.md with deployment URL and features list

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Technically independent but builds on US1 chapters
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Technically independent but enhances US1+US2

### Within Each User Story

**User Story 1**:
- T016-T021 (chapter files) can run in parallel
- T022-T027 (content writing) can run in parallel after chapter files exist
- T028-T033 (images) can run in parallel after content is written
- T034-T036 must run after all chapters exist
- T037-T041 (testing) must run after implementation complete

**User Story 2**:
- T042-T045 (components) can run in parallel
- T046 (utils) can run in parallel with components
- T047-T050 must run after components are created
- T051-T054 (testing) must run after implementation complete

**User Story 3**:
- T055-T066 (hook functions) can run in parallel
- T067-T068 (component) must run after hook is complete
- T069-T073 (integration) must run after component is complete
- T074-T077 (testing) must run after implementation complete

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Within each user story, all tasks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all chapter file creation together:
Task: "Create Chapter 1 MDX file docs/chapter-01-intro-physical-ai.md..."
Task: "Create Chapter 2 MDX file docs/chapter-02-humanoid-fundamentals.md..."
Task: "Create Chapter 3 MDX file docs/chapter-03-sensors-perception.md..."
Task: "Create Chapter 4 MDX file docs/chapter-04-actuation-control.md..."
Task: "Create Chapter 5 MDX file docs/chapter-05-ai-integration.md..."
Task: "Create Chapter 6 MDX file docs/chapter-06-real-world-applications.md..."

# Then launch all content writing in parallel:
Task: "Write content for Chapter 1 (1,200-1,500 words)..."
Task: "Write content for Chapter 2 (1,200-1,500 words)..."
Task: "Write content for Chapter 3 (1,200-1,500 words)..."
Task: "Write content for Chapter 4 (1,200-1,500 words)..."
Task: "Write content for Chapter 5 (1,200-1,500 words)..."
Task: "Write content for Chapter 6 (1,200-1,500 words)..."
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently on mobile device
5. Deploy/demo if ready

**MVP Deliverable**: Readable textbook with 6 chapters, mobile-first responsive design, accessible on all devices

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Polish phase → Final production deploy
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (chapters + content)
   - Developer B: User Story 2 (navigation components)
   - Developer C: User Story 3 (progress tracking)
3. Stories complete and integrate independently
4. Team collaborates on Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No tests included (not requested in spec; can add later if needed)
- Focus on implementation and manual validation per acceptance scenarios

---

## Task Summary

**Total Tasks**: 95
- Phase 1 Setup: 7 tasks
- Phase 2 Foundational: 8 tasks (BLOCKING)
- Phase 3 User Story 1 (P1): 26 tasks (MVP)
- Phase 4 User Story 2 (P2): 13 tasks
- Phase 5 User Story 3 (P3): 23 tasks
- Phase 6 Polish: 18 tasks

**Parallel Opportunities**: 67 tasks can run in parallel (marked with [P])
**Critical Path**: Setup → Foundational → User Story 1 (MVP)
**Estimated Completion**: MVP (US1) = ~30 tasks, Full Feature = 95 tasks
