import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = () => {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>
        Chat Bubble.... Hey! This is Nano Adam! The developer of this appp....
        we should be doing something important
      </Text>

      <View style={styles.rightArrow}></View>

      <View style={styles.rightArrowOverlap}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#5851DB',
    padding: 10,
    marginLeft: '45%',
    borderRadius: 5,
    marginTop: 5,
    marginRight: '5%',
    maxWidth: '50%',
    alignSelf: 'flex-end',
    borderRadius: 20
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#5851DB',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#000',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20
  }
});

export default ChatBubble;
