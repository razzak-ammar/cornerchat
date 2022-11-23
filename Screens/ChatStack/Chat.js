import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ChatBubble from '../../Components/ChatBubble';
import chatContext from '../../store/chat/chatContext';

const Chat = (props) => {
  const ChatContext = useContext(chatContext);

  const [currentChatName, setCurrentChatName] = useState('');
  const [messages, setCurrentMessages] = useState([]);

  useEffect(() => {
    if (ChatContext.currentChatName.length > 0) {
      setCurrentChatName(ChatContext.currentChatName);
      ChatContext.getCurrentChatMessages();
    }
  }, [ChatContext.currentChatName, ChatContext.currentChatId]);

  // Current messages
  useEffect(() => {
    setCurrentMessages(ChatContext.currentChatMessages);
  }, [ChatContext.currentChatMessages]);

  if (ChatContext.loading) {
    return <h1>Loading page... please wait </h1>;
  }

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
      {messages.length > 0
        ? messages.map((msg) => (
            <ChatBubble content={msg.content} key={msg.timestamp} />
          ))
        : null}
    </View>
  );
};

export default Chat;
