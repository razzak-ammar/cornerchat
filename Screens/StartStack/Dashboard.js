import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chats from '../MainTabs/Chats';

const MainTabs = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name='Chats'
        component={Chats}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='chat' color={color} size={size} />
          )
        }}
      />
    </MainTabs.Navigator>
  );
};

export default Dashboard;
