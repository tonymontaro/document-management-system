import * as types from '../actions/types';
import initialState from './initialState';

/**
* Documents reducer
*
* @export
* @param {Object} [state=initialState.documents] initial state
* @param {Array} action action
* @returns {Array} reduced or initial state
*/
export function documents(state = initialState.documents, action) {
  const newDocument = action.document;
  let newState;

  switch (action.type) {
  case types.LOAD_DOCUMENTS_SUCCESS:
    return action.documents;

  case types.CREATE_DOCUMENT_SUCCESS:
    newState = [Object.assign({}, newDocument), ...state];
    if (newState.length > 9) newState.pop();
    return newState;

  case types.UPDATE_DOCUMENT_SUCCESS:
    return [Object.assign({}, newDocument), ...state.filter(item => item.id !== newDocument.id)];

  case types.SEARCH_SUCCESS:
    return action.searchResult;

  case types.GET_USER_DOCUMENTS_SUCCESS:
    return action.documents;


  default:
    return state;
  }
}

/**
* Document reducer
*
* @export
* @param {Object} [state=initialState.document] initial state
* @param {Object} action action
* @returns {Object} reduced or initial state
*/
export function document(state = initialState.document, action) {
  if (action.type === types.GET_DOCUMENT_SUCCESS) {
    return action.document;
  }
  return state;
}
