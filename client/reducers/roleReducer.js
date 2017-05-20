import * as types from '../actions/types';
import initialState from './initialState';

export default function roles(state = initialState.roles, action) {
  const role = action.role;
  let newState;

  switch (action.type) {
    case types.LOAD_ROLES_SUCCESS:
      return action.roles;

    case types.CREATE_ROLE_SUCCESS:
      newState = [...state, Object.assign({}, role)];
      return newState;

    case types.UPDATE_ROLE_SUCCESS:
      return [...state.filter(item => item.id !== role.id), Object.assign({}, role)];

    default:
      return state;
  }
}
