import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const ChatInputBox = ({ onSend, inputText, setInputText }) => {
  const inputBox = useRef();

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      onSend();
      inputBox.focus();
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={(e) => {
          setInputText(e);
        }}
        placeholder={'Message...'}
        placeholderTextColor={'#fff'}
        onKeyPress={handleKeyDown}
        ref={inputBox}
      ></TextInput>
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
    margin: 30,
    marginHorizontal: 10,
    height: 50,
    padding: 10,
    color: 'white',
    borderRadius: 20,
  },
  button: {
    width: 100,
    margin: 0,
    position: 'absolute',
    right: 2,
    bottom: 40,
  },
  buttonText: {
    color: 'white',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ChatInputBox;
