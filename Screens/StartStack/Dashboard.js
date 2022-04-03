import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chats from '../MainTabs/Chats';
import Settings from '../MainTabs/Settings';

const MainTabs = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name='Chats'
        component={Chats}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: 'white', fontWeight: 'bold' },
          // tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='chat' color={'#461AB8'} size={size} />
          )
        }}
      />
      <MainTabs.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: 'white', fontWeight: 'bold' },
          // tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='chat' color={'#461AB8'} size={size} />
          )
        }}
      />
    </MainTabs.Navigator>
  );
};

export default Dashboard;
