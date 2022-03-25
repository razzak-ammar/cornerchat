import React, { useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Keyboard
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';

const Login = () => {
  useEffect(() => {
    let socket = io('http://localhost:3000');
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          placeholderTextColor='#ffffff'
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          placeholderTextColor='#ffffff'
        />
        <TouchableOpacity>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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
    width: 300
  },
  button: {
    width: 300,
    color: 'white',
    backgroundColor: '#4596EC',
    padding: 8,
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 5
  }
});

export default Login;
