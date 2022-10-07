import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Keyboard,
  StatusBar,
  Platform
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';
import AuthContext from '../../store/auth/authContext';

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const authContext = useContext(AuthContext);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // let socket = io('http://localhost:3000');

    // Check if we are already logged in
    AsyncStorage.getItem('user-auth-token').then((val) => {
      if (val === null) {
        console.log('Need to login');
      } else {
        props.navigation.push('Dashboard');
      }
    });
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

  const onSubmit = async () => {
    // Check Inputs
    // TODO: Make sure to validate the result sent to the function/server
    // if (formData['email'] > 3 && formData['password'].length > 8) {
    console.log('SUBMITTED!');
    let status = await authContext.loginUser(
      formData['email'],
      formData['password']
    );
    if (status === true) {
      props.navigation.push('Dashboard');
      // await authContext.load_user();
    }

    if (status === false) {
      setAlert('Authentication failed');
    }
    // }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container} pointerEvents='auto'>
        <StatusBar />
        <Text style={styles.text}>Login</Text>
        {alert.length > 1 ? <Text style={styles.alert}>{alert}</Text> : null}
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
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
    zIndex: 100,
    borderRadius: 5
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
    margin: 5,
    borderRadius: 4
  },
  alert: {
    backgroundColor: 'red',
    marginHorizontal: 40,
    borderRadius: 30,
    color: 'white',
    padding: 10,
    textAlign: 'center'
  }
});

export default Login;
