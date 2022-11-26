import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const ChatInputBox = ({ onSend }) => {
  return (
    <View style={styles.root}>
      <TextInput style={styles.input}></TextInput>
      <TouchableOpacity style={styles.button} onPress={onSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#5620E5',
    width: ScreenWidth - 20,
    margin: 10,
    height: 30,
    padding: 10,
    color: 'white'
  },
  button: {
    backgroundColor: '#5620E5',
    width: 100,
    borderRadius: 10,
    margin: 15
  },
  buttonText: {
    color: 'white',
    padding: 8,
    textAlign: 'center'
  }
});

export default ChatInputBox;
