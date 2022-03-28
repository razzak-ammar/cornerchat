import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const IndividualChat = ({ name, message, unread, time, pfp }) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={styles.main}>
        {pfp && <Image source={pfp} style={styles.pfp}></Image>}
        <View style={styles.mid}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.midText}>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black'
  },
  mid: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  pfp: {
    height: 50,
    width: 50,
    borderRadius: 20
  },
  midText: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  },
  message: {
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 3,
    fontSize: 12
  },
  time: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 12,
    paddingVertical: 3
  }
});

export default IndividualChat;
