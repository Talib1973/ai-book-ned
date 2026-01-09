<!--
Sync Impact Report:
- Version change: Initial → 1.0.0
- New constitution created for AI-Native Physical AI Textbook
- Principles defined: 6 core principles established
- Added sections: Technical Stack, Quality Gates, Governance
- Templates requiring updates:
  ✅ plan-template.md (Constitution Check section validated)
  ✅ spec-template.md (Success criteria alignment validated)
  ✅ tasks-template.md (Task categorization alignment validated)
- Follow-up TODOs: None - all placeholders filled
-->

# AI-Native Physical AI Textbook Constitution

## Core Principles

### I. AI-Native First

Every feature MUST leverage AI capabilities as a foundational component, not an add-on.

**Non-negotiable rules:**
- RAG chatbot MUST answer ONLY from book content (grounded responses)
- Personalization MUST adapt content based on user background
- Auto-generation MUST produce summaries, quizzes, and learning boosters per chapter
- No feature ships without demonstrating AI value

**Rationale:** This is an AI-powered education platform, not a static book. AI integration defines the product's core value proposition and differentiates it from traditional textbooks.

### II. Speed & Simplicity

The platform MUST be fast, simple, and frictionless.

**Non-negotiable rules:**
- Entire book MUST be readable in under 45 minutes total
- Chapters MUST be short, clean, and modern (6-8 chapters maximum)
- Page load times MUST be optimized for fast rendering
- UI MUST be minimal with clear navigation
- No unnecessary complexity or feature bloat

**Rationale:** Users expect instant access and quick learning. Cognitive overload and slow performance kill engagement in educational platforms.

### III. Mobile-First User Experience

Clean, beautiful, mobile-friendly design is mandatory.

**Non-negotiable rules:**
- UI MUST be fully responsive and mobile-optimized
- Navigation MUST be intuitive (minimal user confusion)
- Visual design MUST be clean and modern
- Accessibility MUST be considered in all UI decisions
- User flows MUST be tested on mobile devices

**Rationale:** Modern learners access content primarily on mobile. Poor mobile experience means lost users.

### IV. Content Quality & Accuracy

All content and AI responses MUST be accurate and high-quality.

**Non-negotiable rules:**
- Chatbot MUST use chunking + MiniLM embeddings for high accuracy
- RAG responses MUST cite sources from the book
- Translations MUST be accurate (Urdu translation validated)
- Quizzes and summaries MUST align with chapter content
- Low accuracy is unacceptable - test and validate

**Rationale:** Educational content demands accuracy. Misleading AI responses or poor translations damage trust and learning outcomes.

### V. Personalization & Accessibility

Content MUST adapt to users and be accessible in multiple languages.

**Non-negotiable rules:**
- User authentication MUST be implemented via Better-Auth
- Content MUST personalize based on user background
- One-click Urdu translation MUST be available for every chapter
- User preferences MUST persist across sessions
- Personalization MUST be meaningful, not cosmetic

**Rationale:** Different learners have different backgrounds and language preferences. Generic content reduces effectiveness.

### VI. Observability & Reliability

The system MUST be observable, reliable, and maintainable.

**Non-negotiable rules:**
- Health checks MUST be implemented for all services
- Logging MUST capture critical operations and errors
- Token usage MUST be monitored and optimized (implement in phases)
- Error handling MUST provide clear user feedback
- Backend errors MUST be logged and tracked

**Rationale:** Production systems fail silently without observability. Token costs can spiral without monitoring. Debugging requires logs.

## Technical Stack

**Frontend:** Docusaurus-based interactive textbook (React)
**Backend:** API services for RAG, personalization, translation
**Authentication:** Better-Auth
**AI/ML:** RAG with chunking, MiniLM embeddings
**Database:** User preferences, authentication data
**Deployment:** Stable URLs (frontend + backend)

All technology choices MUST align with the goal of fast, simple, beautiful delivery.

## Quality Gates

Before any feature is considered complete, it MUST pass these gates:

**Functional Completeness:**
- ✅ All chapters visible and readable
- ✅ Chatbot fully functional with grounded answers
- ✅ Auth + personalization + translation working
- ✅ Quizzes + summaries generated per chapter

**Performance & UX:**
- ✅ Clean UI, fast loading, mobile-friendly
- ✅ Book readable in < 45 minutes total
- ✅ Chatbot accuracy validated (chunking + embeddings)

**Production Readiness:**
- ✅ Fully deployed URLs live and stable
- ✅ Health checks + logging operational
- ✅ Token usage monitored

**Demo & Validation:**
- ✅ 90-second demo recorded
- ✅ User validation on mobile device

## Risk Mitigation

**Known Risks:**

1. **RAG low accuracy** → Mitigation: Use chunking + MiniLM embeddings, validate responses
2. **Token usage high** → Mitigation: Implement in phases, monitor usage, set limits
3. **User confusion** → Mitigation: Keep UI minimal and clean, conduct user testing
4. **Backend errors** → Mitigation: Add health checks + logging, error handling

## Governance

### Amendment Procedure

Constitution changes MUST follow this process:
1. Propose change via `/sp.constitution` with rationale
2. Document impact on existing features and templates
3. Update version number following semantic versioning
4. Propagate changes to dependent templates
5. Document in Sync Impact Report

### Versioning Policy

- **MAJOR** (X.0.0): Backward incompatible governance/principle removals or redefinitions
- **MINOR** (0.X.0): New principle/section added or materially expanded guidance
- **PATCH** (0.0.X): Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review

- All feature specs MUST reference relevant constitution principles
- All implementation plans MUST include Constitution Check section
- All PRs MUST verify compliance with constitution principles
- Complexity MUST be justified against constitution guidelines

### Runtime Guidance

For day-to-day development guidance, consult `CLAUDE.md` and agent-specific command files in `.specify/templates/commands/`.

**Version**: 1.0.0 | **Ratified**: 2026-01-09 | **Last Amended**: 2026-01-09
