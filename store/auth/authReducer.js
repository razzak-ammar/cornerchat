import { AUTH_SUCCESS, LOAD_USER } from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return { ...state, token: payload.token, isAuthenticated: true };

    case LOAD_USER:
      return { ...state, user: payload.user, loading: false };

    default:
      return state;
  }
};
