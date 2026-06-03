# Contributing to NEXERGY AI Platform

Thank you for your interest in contributing to NEXERGY AI! This document provides guidelines and instructions for developers, designers, and community members who want to contribute to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read and follow our Code of Conduct:

- Treat all contributors with respect and professionalism
- Welcome diverse perspectives and backgrounds
- Focus on constructive feedback
- Report violations to conduct@nexergy.ai

## Getting Started

### Prerequisites

- Node.js 22.13.0 or higher
- pnpm 10.4.1 or higher
- Git
- Basic knowledge of React, TypeScript, and Express.js

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/nexergy-ai/nexergy-ai-platform.git
cd nexergy-ai-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm check

# Format code
pnpm format
```

The development server will start at `http://localhost:3000`.

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Follow the coding standards outlined below
- Keep commits atomic and well-documented
- Test your changes locally
- Update documentation as needed

### 3. Write Tests

All new features must include corresponding tests:

```bash
# Create test file alongside your component
# Example: src/components/MyComponent.test.ts

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

Run tests with:

```bash
pnpm test
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"

# Follow conventional commits:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructuring
# test: test additions
# chore: maintenance
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
# Fill out the PR template completely
```

## Coding Standards

### TypeScript

- Use strict type checking (`strict: true` in tsconfig.json)
- Avoid `any` types; use proper type inference
- Export types for public APIs
- Document complex types with JSDoc comments

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Avoid
const user: any = { id: '1', name: 'John' };
```

### React Components

- Use functional components with hooks
- Keep components focused and single-responsibility
- Use TypeScript for prop types
- Memoize expensive computations with `useMemo`
- Optimize re-renders with `React.memo` when appropriate

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, label, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
```

### Styling

- Use Tailwind CSS for styling
- Follow the design system color palette
- Avoid inline styles
- Use CSS variables for theme values
- Maintain dark mode compatibility

```typescript
// Good
<div className="p-4 bg-background text-foreground rounded-lg border border-border">
  Content
</div>

// Avoid
<div style={{ padding: '16px', backgroundColor: '#0a0e27' }}>
  Content
</div>
```

### Performance

- Use `React.lazy` for code splitting
- Optimize images and assets
- Avoid unnecessary re-renders
- Profile with React DevTools
- Monitor bundle size with `npm run build`

### Accessibility

- Use semantic HTML elements
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast

```typescript
// Good
<button aria-label="Close menu" onClick={handleClose}>
  <X />
</button>

// Avoid
<div onClick={handleClose}>X</div>
```

## File Structure

When adding new features, follow this structure:

```
src/
├── components/
│   ├── MyComponent.tsx          # Component implementation
│   ├── MyComponent.test.ts      # Component tests
│   └── index.ts                 # Export
├── pages/
│   ├── MyPage.tsx               # Page component
│   └── index.ts                 # Export
├── hooks/
│   ├── useMyHook.ts             # Custom hook
│   └── index.ts                 # Export
└── lib/
    ├── myUtility.ts             # Utility functions
    └── index.ts                 # Export
```

## Documentation

### Code Comments

- Write clear, concise comments
- Explain the "why", not the "what"
- Use JSDoc for functions and types
- Keep comments up-to-date with code

```typescript
// Good
/**
 * Calculates the operational efficiency score based on uptime and performance metrics.
 * @param uptime - System uptime percentage (0-100)
 * @param performance - Performance score (0-100)
 * @returns Efficiency score (0-100)
 */
function calculateEfficiency(uptime: number, performance: number): number {
  return (uptime * 0.6 + performance * 0.4);
}

// Avoid
// Calculate efficiency
function calcEff(u: number, p: number): number {
  return u * 0.6 + p * 0.4;
}
```

### README Updates

Update relevant README sections when:
- Adding new features
- Changing API endpoints
- Modifying configuration
- Adding dependencies

## Pull Request Process

### Before Submitting

1. **Update Documentation**: Update README, docs, and comments
2. **Run Tests**: Ensure all tests pass (`pnpm test`)
3. **Type Check**: Run type checking (`pnpm check`)
4. **Format Code**: Run formatter (`pnpm format`)
5. **Build**: Verify build succeeds (`pnpm build`)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Code formatted
- [ ] Types checked
```

### Review Process

- At least one maintainer review required
- Address feedback constructively
- Keep discussion professional
- Update PR based on feedback
- Squash commits before merge

## Reporting Issues

### Bug Reports

Include the following information:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Exact steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable

### Feature Requests

Include:

- **Description**: Clear feature description
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How it should work
- **Alternatives**: Other possible approaches
- **Priority**: Low, Medium, High

## Performance Guidelines

### Frontend Performance

- Keep bundle size under 500KB (gzipped)
- Aim for Lighthouse score > 90
- Target First Contentful Paint < 2s
- Optimize images to < 100KB
- Use lazy loading for off-screen content

### Backend Performance

- API response time < 100ms
- Database queries < 50ms
- Cache frequently accessed data
- Use pagination for large datasets
- Monitor with performance tools

## Security Guidelines

- Never commit secrets or credentials
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize HTML output
- Use HTTPS for all communications
- Keep dependencies updated
- Report security issues privately

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH):

1. **MAJOR**: Breaking changes
2. **MINOR**: New features (backward compatible)
3. **PATCH**: Bug fixes

### Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Create git tag
- [ ] Build and test
- [ ] Deploy to production
- [ ] Announce release

## Getting Help

- **Documentation**: Read PROJECT_ARCHITECTURE.md
- **Issues**: Search existing issues on GitHub
- **Discussions**: Join community discussions
- **Email**: developers@nexergy.ai
- **Discord**: Join our developer community

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project website
- Community announcements

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Questions?

Don't hesitate to ask questions! We're here to help. Reach out to:

- **Technical Questions**: developers@nexergy.ai
- **General Inquiries**: hello@nexergy.ai
- **Bug Reports**: issues@nexergy.ai

Thank you for contributing to NEXERGY AI!
