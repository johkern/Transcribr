# Quick Setup Guide

## Prerequisites

Before you begin, make sure you have:

- A smartphone running Android 6.0 (API 23) or higher
- A Google account for obtaining Gemini API key
- Voice messages from WhatsApp, Signal, Threema, or other messaging apps

## Step 1: Install the App

### For Developers (Building from Source)

1. **Install Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install Android Studio** (for Android development)
   - Download from [developer.android.com](https://developer.android.com/studio)

3. **Clone and Build**
   ```bash
   git clone https://github.com/johkern/Transcribr.git
   cd Transcribr
   npm install
   npm run android  # For Android
   ```

### For End Users

*Note: Once published, the app will be available on Google Play Store*

## Step 2: Get Your API Key

### Google Gemini API (Recommended)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key
5. Keep this key safe - you'll need it in the next step

### Cost Information

- Google Gemini API offers a **free tier** with generous limits
- Perfect for personal use
- Check current pricing at [ai.google.dev/pricing](https://ai.google.dev/pricing)

## Step 3: Configure the App

1. **Open Transcribr** on your phone
2. Go to the **Settings** tab (gear icon)
3. Select **"Google Gemini"** as your API provider
4. Paste your API key in the **"API Key"** field
5. Tap **"Save Settings"**

✅ You're all set!

## Step 4: Transcribe Your First Voice Message

### Method 1: Using Share/Forward (Recommended)

1. **Open your messaging app** (WhatsApp, Signal, etc.)
2. **Find a voice message** you want to transcribe
3. **Tap and hold** the voice message
4. Select **"Forward"** or **"Share"**
5. Choose **"Transcribr"** from the list of apps
6. The app will automatically:
   - Process the voice message
   - Generate a transcript
   - Save it to your library

### Method 2: From Files App

1. Save the voice message to your device
2. Open your file manager
3. Find the audio file
4. Tap "Share" and select "Transcribr"

## Using the App

### Viewing Transcripts

- Open the **Library** tab
- Tap any message to view its full transcript
- Transcripts are automatically saved for future reference

### Creating Summaries

1. Open any transcribed message
2. Tap **"Generate Summary"** button
3. Wait a few seconds for AI to create a summary
4. The summary will be saved with the message

### Managing Your Library

- **View All Messages**: Check the Library tab
- **Delete Messages**: Tap "Delete" on any message
- **Sort by Date**: Most recent messages appear first

## Tips & Best practices

### For Best Results

✓ Use clear audio recordings
✓ Ensure good internet connection during transcription
✓ Voice messages in clear language work best
✓ Short to medium length messages (< 5 minutes) are ideal

### Privacy & Security

- All transcripts are stored **locally on your device**
- Your API key is stored **securely in the app**
- Voice files are sent to the API provider for processing
- Delete messages you no longer need to save storage

### Troubleshooting

**Problem**: "API key not configured" error
- **Solution**: Go to Settings and enter your API key

**Problem**: Transcription fails
- **Solution**: 
  1. Check internet connection
  2. Verify API key is correct
  3. Check API quota hasn't been exceeded

**Problem**: App doesn't appear in share menu
- **Solution**: 
  1. Restart the app
  2. Clear cache in Android settings
  3. Reinstall if necessary

**Problem**: Transcript is incomplete or inaccurate
- **Solution**: 
  - Current version uses Gemini for demo
  - Consider using Google Speech-to-Text API for production
  - Check audio quality of the original message

## Supported Messengers

Currently tested with:
- ✅ WhatsApp
- ✅ Signal
- ✅ Threema
- ✅ Telegram
- ✅ Any app that can share audio files

## FAQ

**Q: Is this app free?**
A: The app itself is free. You need a free Google Gemini API key for transcription.

**Q: Does it work offline?**
A: No, an internet connection is required for AI transcription.

**Q: Where is my data stored?**
A: All data is stored locally on your device. Nothing is uploaded to cloud servers except for API calls during transcription.

**Q: Can I export transcripts?**
A: Export functionality is planned for future releases. Currently, you can copy text manually.

**Q: Which languages are supported?**
A: Depends on your API provider. Gemini supports many languages. Check Google AI documentation for details.

**Q: Can I use my own OpenAI key instead?**
A: OpenAI Whisper integration is planned for future releases.

**Q: Is iOS supported?**
A: iOS support is in development. Android is the priority platform.

## Getting Help

- **Issues**: Report bugs on [GitHub Issues](https://github.com/johkern/Transcribr/issues)
- **Documentation**: Check the [README](README.md) and [DEVELOPMENT](DEVELOPMENT.md) guides
- **Updates**: Watch the GitHub repository for new releases

## Next Steps

Now that you're set up:

1. Try transcribing a few voice messages
2. Experiment with the summarization feature
3. Star the project on GitHub if you find it useful! ⭐
4. Share feedback and feature requests

---

**Happy transcribing! 🎤✍️**
