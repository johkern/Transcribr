# Contributing to Transcribr

Thank you for your interest in contributing to Transcribr! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:

- Clear title describing the bug
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Device and OS version
- App version
- Screenshots or logs if applicable

### Suggesting Features

Feature requests are welcome! Please:

- Check existing issues first to avoid duplicates
- Clearly describe the feature and its use case
- Explain why this feature would be useful to most users
- Consider implementation complexity

### Code Contributions

#### Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Transcribr.git
   cd Transcribr
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Making Changes

1. **Follow the existing code style**:
   - Use TypeScript for all new code
   - Follow React Native best practices
   - Use meaningful variable and function names
   - Add comments for complex logic

2. **Keep changes focused**:
   - One feature or fix per pull request
   - Don't mix refactoring with new features
   - Update relevant documentation

3. **Test your changes**:
   - Test on Android (required)
   - Test on iOS if possible
   - Verify the app builds without errors
   - Check for TypeScript errors: `npx tsc --noEmit`
   - Run linter: `npm run lint`

#### Submitting Changes

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add brief description of changes"
   ```
   
   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Link related issues

#### Pull Request Guidelines

Your PR should:

- [ ] Have a clear title and description
- [ ] Reference related issues (e.g., "Fixes #123")
- [ ] Include screenshots for UI changes
- [ ] Update documentation if needed
- [ ] Pass all checks (linting, building)
- [ ] Be ready for code review

## Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Formatting**: Use Prettier (configured in project)
- **Naming**: 
  - Components: PascalCase (e.g., `LibraryScreen`)
  - Functions: camelCase (e.g., `loadMessages`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_KEY`)
- **Files**: 
  - Components: `.tsx` extension
  - Services: `.ts` extension
  - One component per file

### Component Structure

```typescript
// Imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Types/Interfaces
interface Props {
  // props definition
}

// Component
export const MyComponent: React.FC<Props> = ({prop1, prop2}) => {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // effect logic
  }, []);
  
  // Handlers
  const handleAction = () => {
    // handler logic
  };
  
  // Render
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Service Structure

```typescript
// Types
import {ResultType} from '../types';

// Service object
export const MyService = {
  async doSomething(param: string): Promise<ResultType> {
    try {
      // implementation
      return {success: true, data: result};
    } catch (error) {
      console.error('Service error:', error);
      return {success: false, error: error.message};
    }
  },
};
```

## Areas for Contribution

### High Priority

1. **Real Audio Transcription Integration**:
   - Implement Google Speech-to-Text API
   - Implement OpenAI Whisper API
   - Add support for multiple audio formats

2. **iOS Support**:
   - iOS share extension
   - iOS-specific UI adjustments
   - Test on iOS devices

3. **Testing**:
   - Unit tests for services
   - Integration tests
   - E2E tests with Detox

### Medium Priority

1. **Features**:
   - Audio playback in-app
   - Export transcripts (TXT, PDF)
   - Search functionality in library
   - Multiple language support

2. **UX Improvements**:
   - Dark mode support
   - Custom themes
   - Animations and transitions
   - Accessibility improvements

3. **Performance**:
   - Optimize storage
   - Lazy loading for large libraries
   - Background processing

### Lower Priority

1. **Nice to Have**:
   - Cloud sync option
   - Speaker identification
   - Batch processing
   - Custom API endpoints

## Testing

### Manual Testing

Before submitting PR, test:

1. **Basic Flow**:
   - App launches successfully
   - Navigate between screens
   - Settings save and persist

2. **Core Features**:
   - Share voice message to app
   - Transcription process
   - Summarization
   - Library management

3. **Edge Cases**:
   - No internet connection
   - Invalid API key
   - Large files
   - Corrupted audio files

### Automated Testing

```bash
# Run tests (once implemented)
npm test

# Run linter
npm run lint

# Check TypeScript
npx tsc --noEmit
```

## Documentation

When adding features, update:

- `README.md` - Main project overview
- `SETUP.md` - User setup instructions
- `DEVELOPMENT.md` - Developer documentation
- Code comments for complex logic
- Type definitions in `src/types/`

## Questions?

- Check existing [Issues](https://github.com/johkern/Transcribr/issues)
- Review [DEVELOPMENT.md](DEVELOPMENT.md)
- Ask in the issue comments

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Transcribr! 🎉
