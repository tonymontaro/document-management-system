import * as types from '../actions/types';
import initialState from './initialState';

export function documents(state = initialState.documents, action) {
  const document = action.document;
  let newState;

  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;

    case types.CREATE_DOCUMENT_SUCCESS:
      newState = [Object.assign({}, document), ...state];
      newState.pop();
      return newState;

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [Object.assign({}, document), ...state.filter(item => item.id !== document.id)];

    case types.SEARCH_SUCCESS:
      return action.searchResult;

    default:
      return state;
  }
}

export function page(state = initialState.page, action) {
  let newState;
  switch (action.type) {
    case types.INCREMENT_PAGE_NUMBER:
      newState = { currentPage: state.currentPage + 1, offset: state.offset + 9 };
      return Object.assign({}, newState);

    case types.DECREMENT_PAGE_NUMBER:
      newState = { currentPage: state.currentPage - 1, offset: state.offset - 9 };
      return Object.assign({}, newState);

    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.offset === 0 ? initialState.page : state;

    case types.SEARCH_SUCCESS:
      return action.offset === 0 ? initialState.page : state;

    default:
      return state;
  }
}
