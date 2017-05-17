import { LOGIN_SUCCESS, LOGOUT } from '../actions/types';
import initialState from './initialState';

export default (state = initialState.access, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };

    case LOGOUT:
      return initialState.access;

    default:
      return state;
  }
};
