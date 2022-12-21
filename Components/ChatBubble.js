import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = (props) => {
  if (props.arrow === 'left') {
    return (
      <View style={styles.bubbleLeft}>
        <Text style={styles.text}>{props.content}</Text>

        {/* <View style={styles.leftArrow}></View> */}

        {/* <View style={styles.leftArrowOverlap}></View> */}
      </View>
    );
  } else {
    return (
      <View style={styles.bubbleRight}>
        <Text style={styles.text}>{props.content}</Text>

        <View style={styles.rightArrow}></View>

        <View style={styles.rightArrowOverlap}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bubbleRight: {
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
  bubbleLeft: {
    backgroundColor: '#000',
    borderColor: '#5851DB',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: '2%',
    marginRight: '5%',
    maxWidth: '50%',
    alignSelf: 'flex-start',
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
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#5851DB',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
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
  },
  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#000',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20
  }
});

export default ChatBubble;
