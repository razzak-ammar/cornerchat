import { useReducer } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_LOADING
} from '../types';

const ChatState = (props) => {
  const initialState = {
    currentChatId: null,
    currentChatName: '',
    currentChatMessages: [],
    loading: true
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

  const setCurrentChat = (chatId, chatName) => {
    dispatch({
      type: SET_CURRENT_CHAT,
      payload: {
        chatId,
        chatName
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
        loading: state.loading
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
