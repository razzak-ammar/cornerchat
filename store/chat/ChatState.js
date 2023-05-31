import { useEffect, useReducer, useState } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_LOADING,
  NEW_MESSAGE,
  USER_IN_CHAT,
  USER_LEFT_CHAT
} from '../types';

const ChatState = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log('ESTABLISHHH!');
    if (!socket) {
      establishSocket();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const establishSocket = async () => {
    // Check if we are already logged in
    AsyncStorage.getItem('user-auth-token').then(async (val) => {
      if (val === null) {
        console.log('User not logged in!');
      } else {
        // props.navigation.push('Dashboard');
        // console.log(socket.active);
        console.log('establishSocket: we are logged in!');
        const newSocket = io('ws://192.168.1.5:3000', {
          auth: {
            token: await AsyncStorage.getItem('user-auth-token')
          },
          transports: ['websocket']
        });
        newSocket.on('connect_error', (err) => {
          console.error('SOCKET ERROR');
          console.error(err);
        });
        // if (!socket) {
        console.log('establishSocket: about to setSocket(newSocket)');
        return setSocket(newSocket);
        // }
      }
    });
  };

  const disconnectSocket = () => {
    if (socket.active) {
      socket.close();
    }
  };

  const initialState = {
    currentChatId: null,
    currentChatName: '',
    currentChatMessages: [],
    loading: true,
    userId: null,
    currentUserId: null,
    userInChat: false
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //   Functions
  const getCurrentChatMessages = async () => {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    try {
      const response = await axios.get(`/chats/${state.currentChatId}`);

      if ((await response.data.success) === true) {
        dispatch({
          type: SET_CURRENT_CHAT_MESSAGES,
          payload: response.data.data
        });
      }

      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrentChat = async (chatId, chatName, userId) => {
    await dispatch({
      type: SET_CURRENT_CHAT,
      payload: {
        chatId,
        chatName,
        userId
      }
    });
  };

  const userLeftConversation = async () => {
    console.log(
      `User ${state.userId} left the conversation ${state.currentChatId}`
    );
    await socket.emit('leave-conversation', {
      userId: state.userId,
      chatId: state.currentChatId
    });
  };

  const sendMessage = ({ message, sender_id, sender_name }) => {
    if (!socket) establishSocket();
    console.log('SENDING MESSAGE - ' + message + ' ' + state.currentChatId);
    socket.emit('new-message', {
      chatId: state.currentChatId,
      message: message,
      sender_id: sender_id,
      sender: sender_name
    });

    // Save to local
    let new_message_object = {
      sender_name: sender_name,
      sender_id: sender_id,
      timestamp: Date.now(),
      content: message,
      type: 'text'
    };

    dispatch({
      type: NEW_MESSAGE,
      payload: new_message_object
    });
  };

  const listenToChatMessages = async () => {
    // if (!socket) establishSocket();
    if (!socket) {
      console.log(
        "listenToChatMessages: I am told to listen to messages but I don't have a socket"
      );
    }
    socket.on('receive-new-message', (data) => {
      console.log('NEW MESSAGE - ', data);
      dispatch({
        type: NEW_MESSAGE,
        payload: data
      });
    });

    console.log(
      `In chat ${state.currentChatId} the user ${state.userId} is listening to messages `
    );

    await socket.emit('enter-conversation', {
      chatId: state.currentChatId,
      userId: state.userId
    });

    socket.on('user-in-conversation', (data) => {
      console.log(
        `when user is in chat.... we know ${data.userId} and ${state.userId}`
      );
      if (data.userId !== state.userId) {
        dispatch({
          type: USER_IN_CHAT,
          payload: data.userId
        });
      }
    });

    socket.on('user-left-conversation', (data) => {
      if (data.userId !== state.userId) {
        console.log('The other user left the chat');
        dispatch({
          type: USER_LEFT_CHAT,
          payload: data.userId
        });
      }
    });
  };

  const stopListeningToMessages = () => {
    socket.removeAllListeners('receive-new-message');
    userLeftConversation();
  };

  return (
    <ChatContext.Provider
      value={{
        setCurrentChat,
        currentChatName: state.currentChatName,
        getCurrentChatMessages,
        currentChatMessages: state.currentChatMessages,
        loading: state.loading,
        sendMessage,
        listenToChatMessages,
        userInChat: state.userInChat,
        disconnectSocket: disconnectSocket,
        stopListeningToMessages: stopListeningToMessages,
        userLeftConversation: userLeftConversation
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
