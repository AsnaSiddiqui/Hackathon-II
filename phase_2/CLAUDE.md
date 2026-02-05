# Todo Full-Stack Web Application Development Guidelines

## Project Overview

This project implements a multi-user full-stack web application with RESTful API, responsive frontend, persistent storage in Neon PostgreSQL, and secure authentication using Better Auth with JWT tokens.

## Technology Stack

- **Frontend**: Next.js 16+ (App Router), TypeScript 5.x, Tailwind CSS
- **Backend**: Python 3.11+, FastAPI, SQLModel ORM
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT integration
- **Testing**: pytest (Backend), Jest/React Testing Library (Frontend), Playwright (E2E)

## Development Guidelines

### Frontend Guidelines (Next.js + TypeScript + Tailwind CSS)

1. **Component Structure**:
   - Place reusable components in `/frontend/src/components/`
   - Use PascalCase for component filenames (e.g., `TaskCard.tsx`)
   - Follow Next.js App Router conventions for page structure

2. **Type Safety**:
   - Define TypeScript interfaces/types in `/frontend/src/types/index.ts`
   - Use strict typing for all props and state
   - Leverage TypeScript utility types where appropriate

3. **Styling**:
   - Use Tailwind CSS utility classes for styling
   - Create reusable component classes when needed
   - Follow responsive design principles

4. **API Integration**:
   - Create API clients in `/frontend/src/services/`
   - Handle authentication headers automatically
   - Implement proper error handling and loading states

### Backend Guidelines (FastAPI + Python)

1. **Project Structure**:
   - Models in `/backend/src/models/` using SQLModel
   - Services in `/backend/src/services/` for business logic
   - API routes in `/backend/src/api/` with proper dependency injection
   - Configuration in `/backend/src/core/`

2. **Database Operations**:
   - Use SQLModel for ORM operations
   - Implement proper database session management
   - Follow async/await patterns for database operations

3. **Authentication & Security**:
   - Implement JWT-based authentication
   - Enforce user isolation for all data access
   - Validate all inputs and sanitize outputs

4. **API Design**:
   - Follow RESTful conventions
   - Use Pydantic models for request/response validation
   - Implement proper error responses with appropriate HTTP status codes

## Code Quality Standards

- Maintain high test coverage (>80% for critical paths)
- Write clear, concise comments for complex logic
- Follow consistent naming conventions
- Implement proper error handling and logging
- Ensure all code passes linting and formatting checks

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT signing
- `NEON_DATABASE_URL`: Neon PostgreSQL connection string
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API calls from frontend

## Security Considerations

- All API endpoints require JWT authentication
- User data isolation enforced at the database and application layers
- Input validation required for all user inputs
- Proper CORS configuration
- Secure session management