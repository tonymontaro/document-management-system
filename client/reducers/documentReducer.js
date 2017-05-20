import * as types from '../actions/types';
import initialState from './initialState';

export default function documents(state = initialState.documents, action) {
  const document = action.document;
  let newState;

  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;

    case types.CREATE_DOCUMENT_SUCCESS:
      newState = [Object.assign({}, document), ...state];
      if (newState.length > 9) newState.pop();
      return newState;

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [Object.assign({}, document), ...state.filter(item => item.id !== document.id)];

    case types.SEARCH_SUCCESS:
      return action.searchResult;

    default:
      return state;
  }
}
