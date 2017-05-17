import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './types';
import setHeaderToken from '../utilities/setHeaderToken';
import { getDocuments } from './documentActions';

export function loginSuccess(token) {
  setHeaderToken(token);

  return {
    type: types.LOGIN_SUCCESS,
    user: jwt.decode(token)
  };
}

export function login(userDetails) {
  return dispatch =>
    axios.post('/users/login', userDetails)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwToken', token);
        dispatch(loginSuccess(token));
      });
}

export function signup(userDetails) {
  return dispatch =>
    axios.post('/users', userDetails)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwToken', token);
        dispatch(loginSuccess(token));
      });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwToken');
    setHeaderToken(null);
    dispatch({ type: types.LOGOUT });
    dispatch(getDocuments());
  };
}
