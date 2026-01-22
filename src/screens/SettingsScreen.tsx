import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import {AppSettings} from '../types';
import {StorageService} from '../services/StorageService';

interface Props {
  navigation: any;
}

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState<'gemini' | 'openai' | 'whisper'>('gemini');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await StorageService.getSettings();
    if (settings) {
      setApiKey(settings.apiKey);
      setApiProvider(settings.apiProvider);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter an API key');
      return;
    }

    setLoading(true);
    try {
      const settings: AppSettings = {
        apiKey: apiKey.trim(),
        apiProvider,
      };
      await StorageService.saveSettings(settings);
      Alert.alert('Success', 'Settings saved successfully', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>API Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>API Provider</Text>
          <View style={styles.providerContainer}>
            <TouchableOpacity
              style={[
                styles.providerButton,
                apiProvider === 'gemini' && styles.providerButtonActive,
              ]}
              onPress={() => setApiProvider('gemini')}>
              <Text
                style={[
                  styles.providerText,
                  apiProvider === 'gemini' && styles.providerTextActive,
                ]}>
                Google Gemini
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.providerButton,
                apiProvider === 'openai' && styles.providerButtonActive,
              ]}
              onPress={() => setApiProvider('openai')}>
              <Text
                style={[
                  styles.providerText,
                  apiProvider === 'openai' && styles.providerTextActive,
                ]}>
                OpenAI (Soon)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.providerButton,
                apiProvider === 'whisper' && styles.providerButtonActive,
              ]}
              onPress={() => setApiProvider('whisper')}>
              <Text
                style={[
                  styles.providerText,
                  apiProvider === 'whisper' && styles.providerTextActive,
                ]}>
                Whisper (Soon)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your API key"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.hint}>
            Get your API key from Google AI Studio (https://makersuite.google.com/app/apikey)
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save Settings'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to use:</Text>
          <Text style={styles.infoText}>
            1. Set up your API key here{'\n'}
            2. Share/forward a voice message from WhatsApp, Signal, or other apps{'\n'}
            3. Select "Transcribr" from the share menu{'\n'}
            4. View the transcript and optionally generate a summary
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  providerContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  providerButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  providerButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  providerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  providerTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
