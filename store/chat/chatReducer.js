import {
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_LOADING
} from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChatId: payload.chatId,
        currentChatName: payload.chatName,
        loading: false
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
      return {
        ...state,
        currentChatMessages: state.currentChatMessages.push()
      };
    default:
      return state;
  }
};
