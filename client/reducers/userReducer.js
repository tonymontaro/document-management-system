import * as types from '../actions/types';
import initialState from './initialState';

/**
* User reducer
*
* @export
* @param {Object} [state=initialState.users] initial state
* @param {Object} action action
* @returns {Object} reduced or initial state
*/
export default function documentReducer(state = initialState.users, action) {
  let newState;
  switch (action.type) {
  case types.GET_PROFILE_SUCCESS:
    return Object.assign({}, state, { userProfile: action.profile });

  case types.LOAD_USERS_SUCCESS:
    return Object.assign({}, state, { users: action.users });

  case types.UPDATE_USER_SUCCESS:
    newState = [action.user, ...state.users.filter(item => item.id !== action.user.id)];
    return Object.assign({}, state, { users: newState });

  case types.SEARCH_USERS_SUCCESS:
    return Object.assign({}, state, { users: action.searchResult });

  case types.LOGOUT:
    return Object.assign({}, state, { userProfile: initialState.users.userProfile });

  default:
    return state;
  }
}
