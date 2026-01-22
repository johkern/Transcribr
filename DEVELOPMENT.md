# Development Guide

## Project Structure

```
Transcribr/
├── android/                    # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/transcribr/  # Kotlin/Java source files
│   │   │   ├── res/                   # Android resources
│   │   │   └── AndroidManifest.xml    # App permissions & config
│   │   └── build.gradle               # App-level build config
│   ├── build.gradle                   # Project-level build config
│   └── gradle.properties              # Gradle settings
├── ios/                        # iOS native code
│   ├── Transcribr/
│   │   └── Info.plist         # iOS app configuration
│   └── Podfile                # iOS dependencies
├── src/                        # React Native source code
│   ├── screens/               # Screen components
│   │   ├── LibraryScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── TranscriptScreen.tsx
│   │   └── ShareHandlerScreen.tsx
│   ├── services/              # Business logic
│   │   ├── StorageService.ts
│   │   └── TranscriptionService.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── App.tsx                # Main app component
├── package.json               # Node.js dependencies
└── tsconfig.json             # TypeScript configuration
```

## Key Features Implementation

### 1. Voice Message Library
- **File**: `src/screens/LibraryScreen.tsx`
- **Storage**: Uses AsyncStorage via `StorageService.ts`
- Lists all transcribed voice messages with metadata
- Allows deletion of messages

### 2. Transcription Service
- **File**: `src/services/TranscriptionService.ts`
- Supports Google Gemini API (primary)
- Placeholder for OpenAI Whisper and other APIs
- Returns transcript with success/error status

### 3. Summarization
- **File**: Same as transcription service
- Uses Gemini Pro model to generate summaries
- Works on any transcript text

### 4. Settings Management
- **File**: `src/screens/SettingsScreen.tsx`
- Store API keys securely in AsyncStorage
- Select API provider (Gemini, OpenAI, Whisper)
- Instructions for obtaining API keys

### 5. Share Integration (Android)
- **File**: `android/app/src/main/AndroidManifest.xml`
- Intent filters for audio/* and application/ogg MIME types
- Receives forwarded voice messages from WhatsApp, Signal, etc.
- **Handler**: `src/screens/ShareHandlerScreen.tsx`

## Development Workflow

### Initial Setup

```bash
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# In another terminal:
# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

### Making Changes

1. **Adding a new screen**:
   - Create screen component in `src/screens/`
   - Add route in `src/App.tsx`
   - Update navigation types if needed

2. **Adding a new API provider**:
   - Update `AppSettings` type in `src/types/index.ts`
   - Add provider option in `SettingsScreen.tsx`
   - Implement transcription method in `TranscriptionService.ts`

3. **Modifying storage**:
   - Update relevant methods in `StorageService.ts`
   - Update types in `src/types/index.ts` if needed

### Building for Release

#### Android

```bash
cd android
./gradlew assembleRelease

# APK will be at:
# android/app/build/outputs/apk/release/app-release.apk
```

#### iOS (macOS only)

```bash
# Open Xcode
open ios/Transcribr.xcworkspace

# Use Xcode to build and archive for release
```

## Testing

### Manual Testing Checklist

1. **First Launch**:
   - [ ] App launches without errors
   - [ ] Empty library shows appropriate message
   - [ ] Settings screen loads

2. **Settings Configuration**:
   - [ ] Can enter API key
   - [ ] Can select API provider
   - [ ] Settings persist after app restart

3. **Sharing Voice Messages**:
   - [ ] Share intent appears when forwarding voice message
   - [ ] App receives and processes shared file
   - [ ] Message appears in library

4. **Transcription**:
   - [ ] Transcription starts automatically
   - [ ] Loading indicator shows during transcription
   - [ ] Transcript appears when complete
   - [ ] Error message shows if API key not configured

5. **Summarization**:
   - [ ] Summary button appears after transcription
   - [ ] Summary generates successfully
   - [ ] Summary persists in storage

6. **Library Management**:
   - [ ] All messages appear in library
   - [ ] Tap message to view details
   - [ ] Delete removes message

## Troubleshooting

### Android Build Issues

**Problem**: Gradle sync fails
```bash
# Solution: Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

**Problem**: SDK not found
```bash
# Solution: Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
```

### Metro Bundler Issues

**Problem**: Metro bundler cache issues
```bash
# Solution: Clear cache
npm start -- --reset-cache
```

### iOS Build Issues (macOS)

**Problem**: Pod install fails
```bash
# Solution: Update CocoaPods and retry
cd ios
pod repo update
pod install --repo-update
```

## API Configuration

### Google Gemini API

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated key
5. Paste in Transcribr Settings screen

**Note**: The current implementation uses Gemini Pro for summarization. For actual audio transcription in production, consider using:
- Google Speech-to-Text API
- OpenAI Whisper API
- Azure Speech Services

## Known Limitations

1. **Audio Transcription**: The current Gemini implementation is in demo mode and returns placeholder text. Production apps must integrate with dedicated speech-to-text services. See "Implementing Real Audio Transcription" section below.

2. **File Format Support**: Currently configured for `.ogg` files (common in WhatsApp). May need adjustments for other messenger apps.

3. **iOS Share Extension**: Not yet implemented. iOS users need to use file sharing methods.

4. **Audio Playback**: Not currently implemented in the app.

## Implementing Real Audio Transcription

The current app is in demo mode for transcription. To implement real transcription, choose one of these options:

### Option 1: Google Cloud Speech-to-Text (Recommended)

1. **Setup**:
   ```bash
   npm install @google-cloud/speech
   ```

2. **Get Credentials**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Speech-to-Text API
   - Create service account and download JSON key

3. **Implementation** (update `TranscriptionService.ts`):
   ```typescript
   import speech from '@google-cloud/speech';
   
   async transcribeWithGoogleSpeech(
     audioPath: string,
     apiKey: string,
   ): Promise<TranscriptionResult> {
     const client = new speech.SpeechClient({
       keyFilename: apiKey, // or use API key directly
     });
     
     const audioBytes = await RNFS.readFile(audioPath, 'base64');
     
     const request = {
       audio: {content: audioBytes},
       config: {
         encoding: 'OGG_OPUS',
         sampleRateHertz: 16000,
         languageCode: 'en-US',
       },
     };
     
     const [response] = await client.recognize(request);
     const transcription = response.results
       .map(result => result.alternatives[0].transcript)
       .join('\n');
     
     return {
       transcript: transcription,
       success: true,
     };
   }
   ```

### Option 2: OpenAI Whisper API

1. **Setup**:
   ```bash
   npm install openai
   ```

2. **Implementation** (update `TranscriptionService.ts`):
   ```typescript
   import OpenAI from 'openai';
   
   async transcribeWithWhisper(
     audioPath: string,
     apiKey: string,
   ): Promise<TranscriptionResult> {
     const openai = new OpenAI({apiKey});
     
     const transcription = await openai.audio.transcriptions.create({
       file: fs.createReadStream(audioPath),
       model: 'whisper-1',
     });
     
     return {
       transcript: transcription.text,
       success: true,
     };
   }
   ```

### Option 3: Azure Speech Services

1. **Setup**:
   ```bash
   npm install microsoft-cognitiveservices-speech-sdk
   ```

2. **Implementation** (update `TranscriptionService.ts`):
   ```typescript
   import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
   
   async transcribeWithAzure(
     audioPath: string,
     subscriptionKey: string,
     region: string,
   ): Promise<TranscriptionResult> {
     const audioConfig = sdk.AudioConfig.fromWavFileInput(
       fs.readFileSync(audioPath)
     );
     const speechConfig = sdk.SpeechConfig.fromSubscription(
       subscriptionKey,
       region
     );
     
     const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
     
     return new Promise((resolve) => {
       recognizer.recognizeOnceAsync((result) => {
         if (result.reason === sdk.ResultReason.RecognizedSpeech) {
           resolve({
             transcript: result.text,
             success: true,
           });
         } else {
           resolve({
             transcript: '',
             success: false,
             error: 'Recognition failed',
           });
         }
       });
     });
   }
   ```

### Testing Your Implementation

After implementing real transcription:

1. Update the API provider selection in Settings
2. Test with short voice messages first
3. Check for proper error handling
4. Test with different audio formats
5. Verify API quota and rate limits

## Future Enhancements

- [ ] Add audio playback functionality
- [ ] Implement search in library
- [ ] Add export functionality (text, PDF)
- [ ] Support for multiple languages
- [ ] Batch processing of multiple voice messages
- [ ] Cloud sync option
- [ ] Speaker identification in transcripts
