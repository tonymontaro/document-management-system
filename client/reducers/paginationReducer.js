import * as types from '../actions/types';
import initialState from './initialState';

export default function pagination(state = initialState.pagination, action) {
  switch (action.type) {
  case types.SEARCH_USERS_SUCCESS:
  case types.SEARCH_SUCCESS:
  case types.LOAD_USERS_SUCCESS:
  case types.LOAD_DOCUMENTS_SUCCESS:
    return Object.assign(
      {}, action.metaData, { offset: action.offset, query: action.query }
    );

  default:
    return state;
  }
}
