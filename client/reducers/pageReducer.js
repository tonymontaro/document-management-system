import * as types from '../actions/types';
import initialState from './initialState';

let newState;
export default function pageReducer(state = initialState.page, action) {
  switch (action.type) {
    case types.INCREMENT_PAGE_NUMBER:
      newState = { currentPage: state.currentPage + 1, offset: state.offset + 9 };
      return Object.assign({}, newState);

    case types.DECREMENT_PAGE_NUMBER:
      newState = { currentPage: state.currentPage - 1, offset: state.offset - 9 };
      return Object.assign({}, newState);

    default:
      return state;
  }
}
