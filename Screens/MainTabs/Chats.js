import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  StatusBar
} from 'react-native';
import IndividualChat from '../../Components/IndividualChat';
import UserHeader from '../../Components/UserHeader';

const Chats = () => {
  return (
    <View>
      <StatusBar />
      <UserHeader name='John Doe' picture={require('../../assets/14.jpg')} />
      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder='Search chats...' />
      <Text style={styles.heading}>Messages</Text>
      <IndividualChat />
    </View>
  );
};

// User
// Search bar
// Small Heading - Messages
// Messages list

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 15
  },
  searchBar: {
    backgroundColor: '#333',
    color: 'white',
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 8
  }
});

export default Chats;
