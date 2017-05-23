import * as types from '../actions/types';
import initialState from './initialState';

export default function pagination(state = initialState.pagination, action) {
  let newState;
  switch (action.type) {
  case types.INCREMENT_PAGE_NUMBER:
    newState = { currentPage: state.currentPage + 1, offset: state.offset + 9 };
    return Object.assign({}, newState, { query: state.query });

  case types.DECREMENT_PAGE_NUMBER:
    if (state.offset < 1) return state;
    newState = { currentPage: state.currentPage - 1, offset: state.offset - 9 };
    return Object.assign({}, newState, { query: state.query });

  case types.LOAD_USERS_SUCCESS:
  case types.LOAD_DOCUMENTS_SUCCESS:
    return action.offset === 0 ? initialState.pagination : state;

  case types.SEARCH_USERS_SUCCESS:
  case types.SEARCH_SUCCESS:
    newState = Object.assign({}, initialState.pagination, { query: action.query });
    return action.offset === 0 ? newState : state;

  default:
    return state;
  }
}
