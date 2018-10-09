import { LOGIN_SUCCESS, LOGOUT, CLIENT_LOGIN } from '../actions/types';
import initialState from './initialState';

/**
 * Access reducer
 *
 * @export
 * @param {Object} [state=initialState.access] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default function access(state = initialState.access, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
  case CLIENT_LOGIN:
    return {
      loggedIn: true,
      user: action.user
    };

  case LOGOUT:
    return initialState.access;

  default:
    return state;
  }
}
