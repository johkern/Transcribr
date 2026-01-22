import {GoogleGenerativeAI} from '@google/generative-ai';
import {TranscriptionResult, SummaryResult} from '../types';
import {StorageService} from './StorageService';
import RNFS from 'react-native-fs';

export const TranscriptionService = {
  async transcribeAudio(audioPath: string): Promise<TranscriptionResult> {
    try {
      const settings = await StorageService.getSettings();
      
      if (!settings || !settings.apiKey) {
        return {
          transcript: '',
          success: false,
          error: 'API key not configured. Please set it in Settings.',
        };
      }

      if (settings.apiProvider === 'gemini') {
        return await this.transcribeWithGemini(audioPath, settings.apiKey);
      }

      return {
        transcript: '',
        success: false,
        error: 'Selected API provider not yet implemented',
      };
    } catch (error) {
      console.error('Transcription error:', error);
      return {
        transcript: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async transcribeWithGemini(
    audioPath: string,
    apiKey: string,
  ): Promise<TranscriptionResult> {
    try {
      // IMPORTANT LIMITATION: Google Gemini API does not yet support direct audio transcription
      // For production use, you should integrate with:
      // - Google Cloud Speech-to-Text API (https://cloud.google.com/speech-to-text)
      // - OpenAI Whisper API (https://platform.openai.com/docs/guides/speech-to-text)
      // - Azure Speech Services (https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/)
      // This implementation returns a demo message to demonstrate the app flow
      
      console.warn('Audio transcription not yet implemented - returning demo transcript');
      
      return {
        transcript: '[Demo Mode] This is a placeholder transcription. To enable real transcription, please integrate with Google Speech-to-Text API or OpenAI Whisper API. See DEVELOPMENT.md for implementation details.',
        success: false,
        error: 'Audio transcription requires additional API integration. This is demo mode.',
      };
    } catch (error) {
      console.error('Gemini transcription error:', error);
      
      return {
        transcript: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async summarizeText(text: string): Promise<SummaryResult> {
    try {
      const settings = await StorageService.getSettings();
      
      if (!settings || !settings.apiKey) {
        return {
          summary: '',
          success: false,
          error: 'API key not configured',
        };
      }

      if (settings.apiProvider === 'gemini') {
        return await this.summarizeWithGemini(text, settings.apiKey);
      }

      return {
        summary: '',
        success: false,
        error: 'Selected API provider not yet implemented',
      };
    } catch (error) {
      console.error('Summarization error:', error);
      return {
        summary: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async summarizeWithGemini(
    text: string,
    apiKey: string,
  ): Promise<SummaryResult> {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});

      const prompt = `Please provide a concise summary of the following transcript:\n\n${text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();

      return {
        summary,
        success: true,
      };
    } catch (error) {
      console.error('Gemini summarization error:', error);
      return {
        summary: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
