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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatTopBar = ({ chatName, userInChat, navigation }) => {
  // Manually modify the values
  userInChat = true;
  let isOnline = true;

  return (
    <SafeAreaView style={styles.headerBg}>
      <View style={styles.root}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name='chevron-left'
              size={30}
              color='white'
            ></MaterialCommunityIcons>
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
          {isOnline ? (
            userInChat ? (
              <Text style={styles.status}>They are in the conversation</Text>
            ) : (
              <Text style={styles.status}>Online</Text>
            )
          ) : (
            <Text style={styles.status}>Offline</Text>
          )}
        </View>
        <View style={styles.evenRight}>
          <MaterialCommunityIcons
            name='phone-outline'
            size={25}
            color='white'
          ></MaterialCommunityIcons>
        </View>
      </View>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: '#131333',
    zIndex: 20
  },
  root: {
    height: 60,
    lineHeight: 1.5,
    display: 'flex',
    flexDirection: 'row'
  },
  chatName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  status: {
    color: 'white',
    fontSize: 13
  },
  userPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginVertical: 5
  },
  middle: {},
  right: {
    marginLeft: 10,
    marginVertical: 5
  },
  left: {
    paddingLeft: 15,
    paddingVertical: 10
  },
  evenRight: {
    marginLeft: 50,
    marginVertical: 15
  }
});

export default ChatTopBar;
