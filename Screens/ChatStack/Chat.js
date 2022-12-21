import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import ChatBubble from '../../Components/ChatBubble';
import ChatInputBox from '../../Components/ChatInputBox';
import authContext from '../../store/auth/authContext';
import chatContext from '../../store/chat/chatContext';

const Chat = (props) => {
  const ChatContext = useContext(chatContext);
  const AuthContext = useContext(authContext);

  const scrollView = useRef();

  let ScreenHeight = Dimensions.get('window').height;

  const [currentChatName, setCurrentChatName] = useState('');
  const [messages, setCurrentMessages] = useState([]);
  const [inputText, setInputText] = useState('');

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

  useEffect(() => {
    ChatContext.listenToChatMessages();
  }, []);

  if (ChatContext.loading) {
    return <Text>Loading page... please wait </Text>;
  }

  const onSend = () => {
    // Need to send: message, sender_id, sender_name
    console.log(AuthContext.user._id);
    console.log('I am sending a message');
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
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'white',
          margin: 50
        }}
      >
        {currentChatName}
      </Text>
      <ScrollView
        ref={scrollView}
        style={{ maxHeight: ScreenHeight * 0.3, height: ScreenHeight * 0.3 }}
        onContentSizeChange={(contentHeight, contentWidth) => {
          scrollView.current.scrollToEnd({ animated: true });
        }}
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
    </View>
  );
};

export default Chat;
