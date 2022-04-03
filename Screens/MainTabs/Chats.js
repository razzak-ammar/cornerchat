import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import IndividualChat from '../../Components/IndividualChat';
import UserHeader from '../../Components/UserHeader';

const Chats = () => {
  const [searchText, setSearchText] = useState('');

  const dismissKeyboard = () => {
    if (Platform.OS != 'web') {
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View pointerEvents='auto'>
          <StatusBar />
          <UserHeader
            name='John Doe'
            picture={require('../../assets/14.jpg')}
          />
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder='Search chats...'
            placeholderTextColor='#ffffff'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Text style={styles.heading}>Messages</Text>
          <IndividualChat
            name='Nano Adam'
            message='2 New Messages'
            unread={true}
            time='2s'
            pfp={require('../../assets/15.jpg')}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    padding: 4.5,
    paddingHorizontal: 8
  }
});

export default Chats;
