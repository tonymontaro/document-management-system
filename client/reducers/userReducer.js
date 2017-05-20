import * as types from '../actions/types';
import initialState from './initialState';

export default function documentReducer(state = initialState.users, action) {
  let newState;
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      newState = Object.assign({}, state);
      newState.userProfile = action.profile;
      return newState;

    default:
      return state;
  }
}
