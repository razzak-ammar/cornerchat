import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Button } from '@react-native-material/core';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './Screens/StartStack/Welcome';
import Login from './Screens/StartStack/Login';
import Dashboard from './Screens/StartStack/Dashboard';
import { TouchableWithoutFeedback } from 'react-native';

const StartStack = createNativeStackNavigator();

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <NavigationContainer theme={DarkTheme}>
        <StartStack.Navigator screenOptions={{}}>
          <StartStack.Screen
            name='Welcome'
            component={Welcome}
            options={{ headerShown: false }}
          />
          <StartStack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <StartStack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{ headerShown: false }}
          />
        </StartStack.Navigator>
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    color: '#fff'
  }
});
