import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import {StorageService} from '../services/StorageService';
import {VoiceMessage} from '../types';

interface Props {
  navigation: any;
  route: any;
}

export const ShareHandlerScreen: React.FC<Props> = ({navigation, route}) => {
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    handleSharedFile();
  }, []);

  const handleSharedFile = async () => {
    try {
      // Get shared file data from navigation params
      const sharedData = route.params?.sharedData;
      
      if (!sharedData) {
        Alert.alert('Error', 'No file was shared', [
          {text: 'OK', onPress: () => navigation.navigate('Library')},
        ]);
        return;
      }

      // In a real implementation, you would get the shared file from react-native-share-menu
      // For now, we'll create a placeholder
      const fileName = sharedData.fileName || 'voice_message.ogg';
      const filePath = sharedData.filePath || '';
      
      // Copy file to app's document directory
      const destPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}_${fileName}`;
      
      if (filePath && await RNFS.exists(filePath)) {
        await RNFS.copyFile(filePath, destPath);
      }

      // Create voice message record
      const message: VoiceMessage = {
        id: Date.now().toString(),
        fileName,
        filePath: destPath,
        createdAt: new Date(),
        source: sharedData.source || 'Unknown',
      };

      // Save to storage
      await StorageService.saveVoiceMessage(message);

      // Navigate to transcript screen
      navigation.replace('Transcript', {message});
    } catch (error) {
      console.error('Error handling shared file:', error);
      Alert.alert(
        'Error',
        'Failed to process the shared file',
        [{text: 'OK', onPress: () => navigation.navigate('Library')}],
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Processing voice message...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
