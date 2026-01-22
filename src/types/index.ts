export interface VoiceMessage {
  id: string;
  fileName: string;
  filePath: string;
  duration?: number;
  transcript?: string;
  summary?: string;
  createdAt: Date;
  source?: string; // e.g., WhatsApp, Signal, etc.
}

export interface TranscriptionResult {
  transcript: string;
  success: boolean;
  error?: string;
}

export interface SummaryResult {
  summary: string;
  success: boolean;
  error?: string;
}

export interface AppSettings {
  apiKey: string;
  apiProvider: 'gemini' | 'openai' | 'whisper';
}
