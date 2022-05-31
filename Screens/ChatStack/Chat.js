import React from 'react';
import { View, Text } from 'react-native';
import ChatBubble from '../../Components/ChatBubble';

const Chat = (props) => {
  console.log(props.navigation);
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
        John Doe
      </Text>
      <ChatBubble />
    </View>
  );
};

export default Chat;
