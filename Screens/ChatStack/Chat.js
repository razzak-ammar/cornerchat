import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import ChatBubble from '../../Components/ChatBubble';
import ChatInputBox from '../../Components/ChatInputBox';
import ChatTopBar from '../../Components/ChatTopBar';
import authContext from '../../store/auth/authContext';
import chatContext from '../../store/chat/chatContext';

let ScreenHeight = Dimensions.get('window').height;

const Chat = (props) => {
  const ChatContext = useContext(chatContext);
  const AuthContext = useContext(authContext);

  const [currentChatName, setCurrentChatName] = useState('');
  const [messages, setCurrentMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [scrollViewMultiplier, setScrollViewMultiplier] = useState(0.75);
  const [userInChat, setUserInChat] = useState(false);

  // Load Initial
  useEffect(() => {
    props.navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
  }, []);

  // Listen to Chat Messages
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      ChatContext.listenToChatMessages();

      return () => {
        // When not focussed
        ChatContext.stopListeningToMessages();
        props.navigation.getParent().setOptions({
          tabBarStyle: {
            display: 'flex'
          }
        });
        // ChatContext.userLeftConversation();
      };
    }, [])
  );

  // Setting Chat
  useEffect(() => {
    if (ChatContext.currentChatName.length > 0) {
      setCurrentChatName(ChatContext.currentChatName);
      ChatContext.getCurrentChatMessages();
    }
  }, [ChatContext.currentChatName, ChatContext.currentChatId]);

  // Current messages
  useEffect(() => {
    setCurrentMessages(ChatContext.currentChatMessages);
    console.log('There is a new message');
  }, [ChatContext.currentChatMessages]);

  // Set User in Chat
  useEffect(() => {
    setUserInChat(ChatContext.userInChat);
  }, [ChatContext.userInChat]);

  const scrollView = useRef();
  const scrollViewContainer = useRef();

  if (ChatContext.loading) {
    return <Text>Loading page... please wait </Text>;
  }

  const onSend = () => {
    // Need to send: message, sender_id, sender_name
    if (inputText.length >= 1) {
      ChatContext.sendMessage({
        message: inputText,
        sender_id: AuthContext.user._id,
        sender_name: AuthContext.user.name
      });
      setInputText('');
    }
  };

  return (
    <View style={styles.root}>
      <ChatTopBar
        chatName={currentChatName}
        userInChat={userInChat}
        navigation={props.navigation}
      />

      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={90}
        ref={scrollViewContainer}
        style={{
          maxHeight: ScreenHeight * scrollViewMultiplier,
          height: ScreenHeight * scrollViewMultiplier
        }}
      >
        <ScrollView
          ref={scrollView}
          style={{}}
          onContentSizeChange={(contentHeight, contentWidth) => {
            scrollView.current?.scrollToEnd({ animated: true });
          }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length > 0
            ? messages.map((msg) =>
                msg.sender_id == AuthContext.user._id ? (
                  <ChatBubble
                    content={msg.content}
                    key={msg.timestamp}
                    arrow={'right'}
                  />
                ) : (
                  <ChatBubble
                    content={msg.content}
                    key={msg.timestamp}
                    arrow={'left'}
                  />
                )
              )
            : null}
        </ScrollView>

        <ChatInputBox
          onSend={onSend}
          inputText={inputText}
          setInputText={setInputText}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: ScreenHeight,
    maxHeight: ScreenHeight
  }
});

export default Chat;
