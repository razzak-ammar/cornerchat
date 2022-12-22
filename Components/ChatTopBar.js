import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const ChatTopBar = ({ chatName, userInChat }) => {
  return (
    <SafeAreaView style={styles.headerBg}>
      <View style={styles.root}>
        <View style={styles.left}>
          <TouchableOpacity style={styles.tempArrowContainer}>
            <Text style={styles.tempArrow}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
          <Image
            source={require('../assets/14.jpg')}
            style={styles.userPicture}
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.chatName}>{chatName}</Text>
          <Text style={styles.status}>Offline</Text>
          {userInChat ? (
            <Text style={styles.status}>They are in the conversation</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: '#131333'
  },
  root: {
    padding: 20,
    height: 75,
    lineHeight: 1.5,
    display: 'flex',
    flexDirection: 'row'
  },
  chatName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  status: {
    color: 'white',
    fontSize: 13
  },
  userPicture: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  right: {
    marginLeft: 10
  },
  left: {},
  tempArrow: {
    color: 'white',
    flex: 1
  },
  tempArrowContainer: {
    height: 75,
    display: 'flex',
    marginLeft: 10,
    marginRight: 15
  }
});

export default ChatTopBar;
