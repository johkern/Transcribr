import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {VoiceMessage} from '../types';
import {StorageService} from '../services/StorageService';
import {TranscriptionService} from '../services/TranscriptionService';

interface Props {
  navigation: any;
}

export const LibraryScreen: React.FC<Props> = ({navigation}) => {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
    const unsubscribe = navigation.addListener('focus', () => {
      loadMessages();
    });
    return unsubscribe;
  }, [navigation]);

  const loadMessages = async () => {
    setLoading(true);
    const msgs = await StorageService.getVoiceMessages();
    setMessages(msgs);
    setLoading(false);
  };

  const handleMessagePress = (message: VoiceMessage) => {
    navigation.navigate('Transcript', {message});
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this voice message?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await StorageService.deleteVoiceMessage(id);
            loadMessages();
          },
        },
      ],
    );
  };

  const renderItem = ({item}: {item: VoiceMessage}) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => handleMessagePress(item)}>
      <View style={styles.messageContent}>
        <Text style={styles.fileName}>{item.fileName}</Text>
        <Text style={styles.date}>
          {item.createdAt.toLocaleDateString()} {item.createdAt.toLocaleTimeString()}
        </Text>
        {item.source && (
          <Text style={styles.source}>Source: {item.source}</Text>
        )}
        {item.transcript && (
          <Text style={styles.preview} numberOfLines={2}>
            {item.transcript}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No voice messages yet</Text>
        <Text style={styles.emptySubtext}>
          Share a voice message from your messenger app to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  messageItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageContent: {
    flex: 1,
    marginRight: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  source: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
