import {
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_LOADING,
  NEW_MESSAGE,
  USER_IN_CHAT,
  USER_LEFT_CHAT
} from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChatId: payload.chatId,
        currentChatName: payload.chatName,
        loading: false,
        userId: payload.userId
      };
    case SET_CURRENT_CHAT_MESSAGES:
      return {
        ...state,
        currentChatMessages: payload.messages,
        loading: false
      };
    case SET_LOADING:
      return { ...state, loading: payload };
    case NEW_MESSAGE:
      console.log('chatReducer: NEW_MESSAGE');
      return {
        ...state,
        currentChatMessages: [...state.currentChatMessages, payload]
      };
    case USER_IN_CHAT:
      return {
        ...state,
        userInChat: true
      };
    case USER_LEFT_CHAT:
      return {
        ...state,
        userInChat: false
      };
    default:
      return state;
  }
};
