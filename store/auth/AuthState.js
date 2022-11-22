import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ERROR, AUTH_SUCCESS, LOAD_USER } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: '',
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Functions
  const loginUser = async (email, password) => {
    let status = false;

    try {
      const data = await axios.post('/auth/', {
        email,
        password
      });

      if ((await data.data.success) === true) {
        status = true;
        dispatch({
          type: AUTH_SUCCESS,
          payload: { token: data.data.data.token }
        });

        // Put User Token into AsyncStorage
        AsyncStorage.setItem('user-auth-token', data.data.data.token);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.errors[0].msg);

      dispatch({
        type: AUTH_ERROR,
        payload: { msg: 'There is something wrong...' }
      });
    }

    return status;
  };

  const load_user = async () => {
    let token = '';

    // Get Token
    token = await AsyncStorage.getItem('user-auth-token');

    try {
      const response = await axios.get('/auth', {
        headers: {
          'x-auth-token': token
        }
      });
      dispatch({
        type: LOAD_USER,
        payload: { user: response.data }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        load_user,
        user: state.user,
        loading: state.loadiing
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
