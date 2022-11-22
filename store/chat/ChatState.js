import { useReducer } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from '../types';

const ChatState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //   Functions

  return (
    <ChatContext.Provider value={{}}>{props.children}</ChatContext.Provider>
  );
};

export default ChatState;
