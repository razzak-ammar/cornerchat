import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserHeader = ({ name, picture }) => {
  return (
    <View style={styles.container}>
      <Image source={picture} style={styles.userPicture} />
      <Text style={styles.username}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  userPicture: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  username: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default UserHeader;
