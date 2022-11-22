import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Chats from '../MainTabs/Chats';
import Settings from '../MainTabs/Settings';
import ChatStackComponent from '../ChatStack/ChatStack';

const MainTabs = createBottomTabNavigator();

const Dashboard = (props) => {
  useEffect(() => {
    // Check if we are already logged in
    AsyncStorage.getItem('user-auth-token').then((val) => {
      if (val === null) {
        props.navigation.push('Login');
      } else {
        // props.navigation.push('Dashboard');
        console.log('Logged in...');
      }
    });
  }, []);

  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name='ChatStack'
        component={ChatStackComponent}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: 'white', fontWeight: 'bold' },
          // tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='chat' color={'#fff'} size={size} />
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
