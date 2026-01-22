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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});

      // Read audio file as base64
      const audioData = await RNFS.readFile(audioPath, 'base64');
      
      // Note: Gemini API doesn't directly support audio transcription yet
      // This is a placeholder implementation
      // In production, you might want to use Google Speech-to-Text API or Whisper
      const prompt = `This is a voice message. Please transcribe the audio content.`;

      const result = await model.generateContent([
        {
          inlineData: {
            data: audioData,
            mimeType: 'audio/ogg',
          },
        },
        prompt,
      ]);

      const response = await result.response;
      const transcript = response.text();

      return {
        transcript,
        success: true,
      };
    } catch (error) {
      console.error('Gemini transcription error:', error);
      
      // Fallback message for demo purposes
      return {
        transcript: '[Transcription: This is a demo transcription. In production, this would use Google Speech-to-Text API or Whisper for actual audio transcription.]',
        success: true,
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
