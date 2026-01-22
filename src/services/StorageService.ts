import AsyncStorage from '@react-native-async-storage/async-storage';
import {VoiceMessage, AppSettings} from '../types';

const STORAGE_KEYS = {
  VOICE_MESSAGES: '@transcribr_voice_messages',
  SETTINGS: '@transcribr_settings',
};

export const StorageService = {
  async saveVoiceMessage(message: VoiceMessage): Promise<void> {
    try {
      const messages = await this.getVoiceMessages();
      messages.unshift(message);
      await AsyncStorage.setItem(
        STORAGE_KEYS.VOICE_MESSAGES,
        JSON.stringify(messages),
      );
    } catch (error) {
      console.error('Error saving voice message:', error);
      throw error;
    }
  },

  async getVoiceMessages(): Promise<VoiceMessage[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.VOICE_MESSAGES);
      if (data) {
        const messages = JSON.parse(data);
        return messages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting voice messages:', error);
      return [];
    }
  },

  async updateVoiceMessage(id: string, updates: Partial<VoiceMessage>): Promise<void> {
    try {
      const messages = await this.getVoiceMessages();
      const index = messages.findIndex(msg => msg.id === id);
      if (index !== -1) {
        messages[index] = {...messages[index], ...updates};
        await AsyncStorage.setItem(
          STORAGE_KEYS.VOICE_MESSAGES,
          JSON.stringify(messages),
        );
      }
    } catch (error) {
      console.error('Error updating voice message:', error);
      throw error;
    }
  },

  async deleteVoiceMessage(id: string): Promise<void> {
    try {
      const messages = await this.getVoiceMessages();
      const filtered = messages.filter(msg => msg.id !== id);
      await AsyncStorage.setItem(
        STORAGE_KEYS.VOICE_MESSAGES,
        JSON.stringify(filtered),
      );
    } catch (error) {
      console.error('Error deleting voice message:', error);
      throw error;
    }
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  async getSettings(): Promise<AppSettings | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  },
};
