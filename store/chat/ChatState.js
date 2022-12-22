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
} from '../types';

const ChatState = (props) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    establishSocket();
    return () => {
      socket.close();
    };
  }, []);

  const establishSocket = async () => {
    const newSocket = io('ws://192.168.1.23:3000', {
      auth: {
        token: await AsyncStorage.getItem('user-auth-token'),
      },
      transports: ['websocket'],
    });
    newSocket.on('connect_error', (err) => {
      console.error('SOCKET ERROR');
      console.error(err);
    });
    setSocket(newSocket);
  };

  const initialState = {
    currentChatId: null,
    currentChatName: '',
    currentChatMessages: [],
    loading: true,
    userId: null,
    currentUserId: null,
    userInChat: false,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //   Functions
  const getCurrentChatMessages = async () => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    try {
      const response = await axios.get(`/chats/${state.currentChatId}`);

      if ((await response.data.success) === true) {
        dispatch({
          type: SET_CURRENT_CHAT_MESSAGES,
          payload: response.data.data,
        });
      }

      console.log(response.data.data);
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
        userId,
      },
    });
    await socket.emit('enter-conversation', {
      chatId: chatId,
      userId: userId,
    });
  };

  const sendMessage = ({ message, sender_id, sender_name }) => {
    if (!socket) establishSocket();
    console.log('SENDING MESSAGE - ' + message + ' ' + state.currentChatId);
    socket.emit('new-message', {
      chatId: state.currentChatId,
      message: message,
      sender_id: sender_id,
      sender: sender_name,
    });

    // Save to local
    let new_message_object = {
      sender_name: sender_name,
      sender_id: sender_id,
      timestamp: Date.now(),
      content: message,
      type: 'text',
    };

    dispatch({
      type: NEW_MESSAGE,
      payload: new_message_object,
    });
  };

  const listenToChatMessages = () => {
    socket.on('receive-new-message', (data) => {
      console.log('NEW MESSAGE - ', data);
      dispatch({
        type: NEW_MESSAGE,
        payload: data,
      });
    });

    socket.on('user-in-conversation', (data) => {
      console.log(
        `when user is in chat.... we know ${data.userId} and ${state.currentUserId}`
      );
      if (data.userId !== state.currentUserId) {
        dispatch({
          type: USER_IN_CHAT,
          payload: data.userId,
        });
      }
    });
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
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
