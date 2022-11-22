import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';
import IndividualChat from '../../Components/IndividualChat';
import UserHeader from '../../Components/UserHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../../store/auth/authContext';
import BottomModal from '../../Components/BottomModal';

const Chats = (props) => {
  const [searchText, setSearchText] = useState('');
  const [currentChat, setCurrentChat] = useState({
    username: '',
    name: '',
    email: '',
    chatId: null
  });
  const [chats, setChats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);

  const [newChatUsername, setNewChatUsername] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.load_user();
  }, []);

  useEffect(() => {
    console.log(authContext.user);

    if (authContext.user) {
      authContext.user.chats.length > 0
        ? setChats(authContext.user.chats)
        : setChats(null);

      console.log(authContext.user.chats);
    } else {
      setChats(null);
    }
  }, [authContext.user]);

  const dismissKeyboard = () => {
    if (Platform.OS != 'web') {
      Keyboard.dismiss();
    }
  };

  if (authContext.loading === true) {
    return <h1>Loading as....</h1>;
  } else {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View pointerEvents='auto' style={styles.main}>
            <StatusBar />
            <UserHeader
              name={authContext.user.name}
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
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => setModalOpen(!modalOpen)}
            >
              <Text style={styles.newButtonText}>New Chat</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Messages</Text>
            {chats ? (
              Array.isArray(chats) && chats.length > 0 ? (
                chats.map((chat) => (
                  <IndividualChat
                    name={chat.name}
                    message='2 New Messages'
                    unread={true}
                    time='5s'
                    pfp={require('../../assets/15.jpg')}
                    navigation={props.navigation}
                    setCurrentChat={setCurrentChat}
                    key={chat._id}
                  />
                ))
              ) : (
                <h1>Loading again</h1>
              )
            ) : (
              <h1>Loading</h1>
            )}
            <IndividualChat
              name='Nano Adam'
              message='2 New Messages'
              unread={true}
              time='2s'
              pfp={require('../../assets/15.jpg')}
              navigation={props.navigation}
              setCurrentChat={setCurrentChat}
            />

            {/* START BOTTOM MODAL */}
            <BottomModal
              modalOpen={modalOpen}
              modalClosed={modalClosed}
              setModalOpen={setModalOpen}
              setModalClosed={setModalClosed}
            >
              <Text style={styles.modalHeader}>New Chat</Text>

              <View style={styles.modalUsernameBox}>
                <Text style={styles.modalLabel}>Username (Ex. @no_one)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder='Username'
                  value={newChatUsername}
                  onChangeText={(text) => setNewChatUsername(text)}
                />
                {newChatUsername.length > 0 ? (
                  <>
                    <Text style={styles.modalLabel}>First Message to...</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder='First Message...'
                      value={newChatMessage}
                      onChangeText={(text) => setNewChatMessage(text)}
                      height={10}
                    />
                  </>
                ) : null}
                {newChatMessage.length > 0 ? (
                  <TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      // onPress={() => setModalClosed(true)}
                    >
                      <Text style={styles.modalCloseButtonText}>
                        Create Chat
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View>
                {/* <Text>Your Contacts</Text> */}
                <ScrollView></ScrollView>
              </View>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalClosed(true)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </BottomModal>
            {/* END BOTTOM MODAL */}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
};

// User
// Search bar
// Small Heading - Messages
// Messages list

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  main: {
    height: ScreenHeight
  },
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
  },
  newButton: {
    backgroundColor: '#5620E5',
    width: 100,
    borderRadius: 10,
    margin: 15
  },
  newButtonText: {
    color: 'white',
    padding: 8,
    textAlign: 'center'
  },
  modalHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  modalUsernameBox: {
    marginVertical: 10
  },
  modalLabel: {
    marginVertical: 4,
    color: '#ffffff'
  },
  modalInput: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 4,
    marginBottom: 5
  },
  modalCloseButton: {
    backgroundColor: '#ffffff',
    width: ScreenWidth - 200,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center'
  },
  modalCloseButtonText: {
    color: 'black',
    padding: 8,
    textAlign: 'center'
  }
});

export default Chats;
