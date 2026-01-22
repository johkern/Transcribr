import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {VoiceMessage} from '../types';
import {StorageService} from '../services/StorageService';
import {TranscriptionService} from '../services/TranscriptionService';

interface Props {
  route: any;
  navigation: any;
}

export const TranscriptScreen: React.FC<Props> = ({route, navigation}) => {
  const [message, setMessage] = useState<VoiceMessage>(route.params?.message);
  const [transcribing, setTranscribing] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    if (!message.transcript) {
      transcribeMessage();
    }
  }, []);

  const transcribeMessage = async () => {
    setTranscribing(true);
    try {
      const result = await TranscriptionService.transcribeAudio(
        message.filePath,
      );
      
      if (result.success && result.transcript) {
        const updatedMessage = {...message, transcript: result.transcript};
        setMessage(updatedMessage);
        await StorageService.updateVoiceMessage(message.id, {
          transcript: result.transcript,
        });
      } else {
        Alert.alert('Error', result.error || 'Failed to transcribe audio');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to transcribe audio');
    } finally {
      setTranscribing(false);
    }
  };

  const handleSummarize = async () => {
    if (!message.transcript) {
      Alert.alert('Error', 'No transcript available to summarize');
      return;
    }

    setSummarizing(true);
    try {
      const result = await TranscriptionService.summarizeText(
        message.transcript,
      );
      
      if (result.success && result.summary) {
        const updatedMessage = {...message, summary: result.summary};
        setMessage(updatedMessage);
        await StorageService.updateVoiceMessage(message.id, {
          summary: result.summary,
        });
      } else {
        Alert.alert('Error', result.error || 'Failed to generate summary');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate summary');
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.fileName}>{message.fileName}</Text>
          <Text style={styles.date}>
            {message.createdAt.toLocaleDateString()}{' '}
            {message.createdAt.toLocaleTimeString()}
          </Text>
          {message.source && (
            <Text style={styles.source}>Source: {message.source}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transcript</Text>
            {!transcribing && message.transcript && (
              <TouchableOpacity onPress={transcribeMessage}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {transcribing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Transcribing...</Text>
            </View>
          ) : message.transcript ? (
            <View style={styles.transcriptContainer}>
              <Text style={styles.transcriptText}>{message.transcript}</Text>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Transcription not available
              </Text>
            </View>
          )}
        </View>

        {message.transcript && !transcribing && (
          <TouchableOpacity
            style={[
              styles.summarizeButton,
              summarizing && styles.summarizeButtonDisabled,
            ]}
            onPress={handleSummarize}
            disabled={summarizing}>
            <Text style={styles.summarizeButtonText}>
              {summarizing ? 'Generating Summary...' : 'Generate Summary'}
            </Text>
          </TouchableOpacity>
        )}

        {message.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>{message.summary}</Text>
            </View>
          </View>
        )}
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
  header: {
    marginBottom: 24,
  },
  fileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
  },
  transcriptContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  summarizeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  summarizeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  summarizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
