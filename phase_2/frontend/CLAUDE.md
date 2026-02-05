# Frontend Development Guidelines for Todo Full-Stack Web Application

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth with JWT integration
- **Testing**: Jest, React Testing Library, Playwright

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   └── ...
│   ├── app/             # Next.js App Router pages
│   │   ├── page.tsx     # Home/dashboard page
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── ...
│   ├── services/        # API clients and utilities
│   │   ├── api.ts       # API client
│   │   └── auth.ts      # Authentication utilities
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   └── styles/          # Global styles
│       └── globals.css  # Tailwind CSS configuration
├── tests/
│   ├── unit/            # Component unit tests
│   ├── integration/     # Integration tests
│   └── e2e/             # End-to-end tests
├── package.json         # Node.js dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Frontend documentation
```

## Component Development

### Naming Convention
- Use PascalCase for component filenames (e.g., `TaskCard.tsx`)
- Use descriptive names that indicate the component's purpose
- Group related components in subdirectories when appropriate

### Component Structure
```typescript
'use client';

import React from 'react';
// Import other dependencies

interface ComponentProps {
  // Define prop types
}

const ComponentName: React.FC<ComponentProps> = ({ /* props */ }) => {
  // Component logic

  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### TypeScript Best Practices
- Define interfaces for all component props
- Use TypeScript utility types when appropriate
- Implement proper error handling with TypeScript

## API Integration

### API Client
- Create centralized API client in `src/services/api.ts`
- Handle authentication headers automatically
- Implement request/response interceptors for common operations
- Use environment variables for API base URLs

### Authentication
- Integrate Better Auth for JWT handling
- Implement automatic token refresh
- Handle 401 responses appropriately
- Store tokens securely

## Styling with Tailwind CSS

### Responsive Design
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
- Implement mobile-first design approach
- Test components on various screen sizes

### Utility Classes
- Leverage Tailwind's extensive utility class library
- Create reusable component classes when needed
- Use arbitrary values sparingly

## Testing

### Unit Tests
- Write tests for individual components using Jest and React Testing Library
- Test component rendering, user interactions, and state changes
- Mock external dependencies appropriately

### Integration Tests
- Test component interactions and API communications
- Verify proper authentication flow
- Test error handling scenarios

### End-to-End Tests
- Use Playwright for full user flow testing
- Test complete user journeys (signup, login, task management)
- Verify data persistence and user isolation

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API calls
- `NEXT_PUBLIC_AUTH_URL`: Authentication service URL
- Store sensitive data in environment variables and never commit to version control

## Performance Optimization

- Implement code splitting for large components
- Use lazy loading for non-critical components
- Optimize images and assets
- Implement proper caching strategies

## Security Considerations

- Sanitize user inputs before displaying
- Implement proper CORS handling
- Secure authentication tokens
- Validate data received from backend