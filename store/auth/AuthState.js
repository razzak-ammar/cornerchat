import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from '../../axios';

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
    try {
      const data = await axios.post('/auth/', {
        email,
        password
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
