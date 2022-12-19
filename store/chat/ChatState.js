import { useEffect, useReducer, useState } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_LOADING
} from '../types';

const ChatState = (props) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('192.168.1.18:3000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const initialState = {
    currentChatId: null,
    currentChatName: '',
    currentChatMessages: [],
    loading: true,
    userId: null
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
        userId
      }
    });
    await socket.emit('enter-conversation', {
      chatId: chatId
    });
  };

  const sendMessage = (message) => {
    socket.emit('new-message', {
      chatId: state.currentChatId,
      message: message
    });
  };

  const listenToChatMessages = () => {
    socket.on('receive-new-message', (data) => {
      dispatch({
        type: NEW_MESSAGE,
        data: data
      });
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
        listenToChatMessages
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
