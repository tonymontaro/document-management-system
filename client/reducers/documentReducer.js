import * as types from '../actions/types';
import initialState from './initialState';

export default function documentReducer(state = initialState.documents, action) {
  const document = action.document;

  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;

    case types.CREATE_DOCUMENT_SUCCESS:
      return [Object.assign({}, document), ...state];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [Object.assign({}, document), ...state.filter(item => item.id !== document.id)];
    default:
      return state;
  }
}
