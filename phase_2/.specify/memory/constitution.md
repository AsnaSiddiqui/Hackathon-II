<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: [PRINCIPLE_1_NAME] → Specification Adherence, [PRINCIPLE_2_NAME] → Code Quality, [PRINCIPLE_3_NAME] → Security, [PRINCIPLE_4_NAME] → Modularity
Added sections: Key Standards section, Constraints section
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### Specification Adherence
All implementations must reference relevant specs (e.g., @specs/features/task-crud.md); Adherence to specifications through direct reference to Spec-Kit files; Direct compliance with documented requirements required.

### Code Quality
Code quality for maintainable and scalable full-stack development; Follow CLAUDE.md guidelines for frontend (Next.js patterns, Tailwind CSS) and backend (FastAPI conventions, SQLModel usage); Maintain clean, testable, well-documented code.

### Security
Security in authentication and data handling (e.g., JWT verification and user isolation); JWT tokens required for all API endpoints, with user data filtering; Protect user data and prevent unauthorized access.

### Modularity
Modularity (separation of frontend and backend concerns); Maintain clear separation between frontend and backend layers; Ensure components are loosely coupled and independently maintainable.

### Testing Discipline
Unit tests for API endpoints and frontend components; integration tests for full flows; Comprehensive test coverage required for all features; TDD approach encouraged for new functionality.

### Documentation
Inline comments and updated README.md; maintain spec files for changes; Clear documentation required for all public interfaces and complex logic; Keep documentation synchronized with code changes.

## Key Standards
All implementations must reference relevant specs (e.g., @specs/features/task-crud.md). Coding conventions: Follow CLAUDE.md guidelines for frontend (Next.js patterns, Tailwind CSS) and backend (FastAPI conventions, SQLModel usage). Authentication: JWT tokens required for all API endpoints, with user data filtering. Testing: Unit tests for API endpoints and frontend components; integration tests for full flows. Documentation: Inline comments and updated README.md; maintain spec files for changes.

## Constraints
Technology stack: Frontend - Next.js 16+ (App Router); Backend - Python FastAPI; ORM - SQLModel; Database - Neon Serverless PostgreSQL; Authentication follows JWT standards with user isolation requirements.

## Governance
All implementations must comply with these principles; Changes to architecture or core practices require explicit approval and documentation; Code reviews must verify adherence to all principles; Deviations require justification and approval.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date needed | **Last Amended**: 2026-01-19