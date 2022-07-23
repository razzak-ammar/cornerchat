import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Keyboard,
  SafeAreaView,
  Platform
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';
import AuthContext from '../../store/auth/authContext';

const Login = () => {
  const [formData, setFormData] = useState({});
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // let socket = io('http://localhost:3000');
    // authContext.loginUser('the@gmail.com', 'test123');
  }, []);

  const onChange = (type, text) => {
    setFormData({
      ...formData,
      [type]: text
    });
  };

  const dismissKeyboard = () => {
    if (Platform.OS != 'web') {
      Keyboard.dismiss();
    }
  };

  const onSubmit = () => {
    // Check Inputs
    if (formData['email'].length > 3 && formData['password'].length > 8) {
      authContext.loginUser(formData['email'], formData['password']);
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.over}>
        <View style={styles.container} pointerEvents='auto'>
          <Text style={styles.text}>Login</Text>
          <TextInput
            placeholder='Email'
            style={styles.input}
            placeholderTextColor='#ffffff'
            value={formData.email || ''}
            onChangeText={(text) => onChange('email', text)}
          />
          <TextInput
            placeholder='Password'
            style={styles.input}
            placeholderTextColor='#ffffff'
            value={formData.password || ''}
            onChangeText={(text) => onChange('password', text)}
          />
          <TouchableOpacity>
            <Text style={styles.button} onPress={onSubmit}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  over: {
    zIndex: 10
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 34,
    margin: 10
  },
  input: {
    color: '#ffffff',
    backgroundColor: '#222',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
    width: 300,
    zIndex: 100
  },
  button: {
    width: 300,
    color: 'white',
    // backgroundColor: '#4596EC',
    backgroundColor: '#461AB8',
    padding: 8,
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 5
  }
});

export default Login;
