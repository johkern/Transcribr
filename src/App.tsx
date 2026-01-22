import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LibraryScreen} from './screens/LibraryScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {TranscriptScreen} from './screens/TranscriptScreen';
import {ShareHandlerScreen} from './screens/ShareHandlerScreen';
import {Text} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 24, color}}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 24, color}}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            title: 'Transcribr',
          }}
        />
        <Stack.Screen
          name="Transcript"
          component={TranscriptScreen}
          options={{
            title: 'Transcript',
          }}
        />
        <Stack.Screen
          name="ShareHandler"
          component={ShareHandlerScreen}
          options={{
            title: 'Processing...',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
