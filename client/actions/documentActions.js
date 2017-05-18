import axios from 'axios';
import * as types from './types';

export function getDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/documents?limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.LOAD_DOCUMENTS_SUCCESS,
          documents: res.data
        });
      });
  };
}

export function saveDocument(document) {
  if (document.updateId) {
    return dispatch => axios.put(`/documents/${document.updateId}`, document)
    .then((res) => {
      dispatch({ type: types.UPDATE_DOCUMENT_SUCCESS, document: res.data });
    });
  }
  return dispatch => axios.post('/documents', document)
  .then((res) => {
    dispatch({ type: types.CREATE_DOCUMENT_SUCCESS, document: res.data });
  });
}

export function updatePage(direction) {
  if (direction === 'prev') {
    return { type: types.DECREMENT_PAGE_NUMBER };
  }
  return { type: types.INCREMENT_PAGE_NUMBER };
}
