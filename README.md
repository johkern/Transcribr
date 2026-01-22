# Transcribr

A React Native mobile app to transcribe voice messages from messengers (WhatsApp, Signal, Threema, etc.) using AI-powered transcription.

## Features

- 📱 **Share Integration**: Forward voice messages from any messenger app directly to Transcribr
- 🎤 **AI Transcription**: Framework ready for transcription using Google Speech-to-Text or Whisper API
- 📝 **Smart Summarization**: Generate concise summaries of transcripts using Google Gemini API
- 📚 **Message Library**: Keep a history of all transcribed voice messages
- ⚙️ **Flexible API Settings**: Configure your preferred API provider (Gemini, OpenAI, Whisper)
- 🔐 **Secure Storage**: All data stored locally on your device
- 🤖 **Android First**: Optimized for Android with iOS support planned

⚠️ **Important Note**: The current implementation includes a demo transcription mode. For production use with real audio transcription, you need to integrate:
- Google Cloud Speech-to-Text API, or
- OpenAI Whisper API, or  
- Azure Speech Services

See `DEVELOPMENT.md` for integration instructions.

## Setup

### Prerequisites

- Node.js (>= 18)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johkern/Transcribr.git
cd Transcribr
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS (macOS only)
```bash
npm run ios
```

### Development
```bash
# Start Metro bundler
npm start

# Run linter
npm run lint

# Run tests
npm test
```

## Configuration

1. **Get an API Key**:
   - For Google Gemini: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - For OpenAI: Visit [OpenAI Platform](https://platform.openai.com/api-keys)

2. **Configure in App**:
   - Open the app
   - Navigate to Settings tab
   - Select your preferred API provider
   - Enter your API key
   - Save settings

## Usage

1. **Transcribe a Voice Message**:
   - Open WhatsApp, Signal, or any messenger app
   - Find a voice message you want to transcribe
   - Tap the share/forward button
   - Select "Transcribr" from the share menu
   - View the transcript automatically

2. **Generate Summary**:
   - After transcription, tap "Generate Summary"
   - View the AI-generated summary of the transcript

3. **View Library**:
   - All transcribed messages are saved in the Library tab
   - Tap any message to view its transcript and summary
   - Swipe to delete messages you no longer need

## Architecture

```
src/
├── screens/           # React Native screens
│   ├── LibraryScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── TranscriptScreen.tsx
│   └── ShareHandlerScreen.tsx
├── services/          # Business logic and API integrations
│   ├── StorageService.ts
│   └── TranscriptionService.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── App.tsx           # Main app component with navigation
```

## Tech Stack

- **React Native 0.73**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence
- **Google Generative AI SDK**: AI-powered transcription and summarization
- **React Native FS**: File system access

## Roadmap

- [x] Basic transcription with Gemini API
- [x] Voice message library
- [x] Summarization feature
- [x] Settings screen with API configuration
- [ ] Support for additional API providers (OpenAI Whisper, etc.)
- [ ] iOS share extension
- [ ] Audio playback in app
- [ ] Export transcripts
- [ ] Search functionality in library
- [ ] Multiple language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.