import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chats from '../MainTabs/Chats';
import Chat from './Chat';

let ChatStack = createNativeStackNavigator();

const ChatStackComponent = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name='Chats'
        component={Chats}
        options={{ headerShown: false }}
      />
      <ChatStack.Screen
        name='Chat'
        component={Chat}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
};

export default ChatStackComponent;
