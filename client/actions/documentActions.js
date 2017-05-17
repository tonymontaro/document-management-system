import axios from 'axios';
import * as types from './types';

export function getDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get('/documents')
      .then((res) => {
        dispatch({
          type: types.LOAD_DOCUMENTS_SUCCESS,
          documents: res.data
        });
      });
  };
}

export function createDocument(document) {
  return dispatch => axios.post('/documents', document)
    .then(() => {
      dispatch({ type: types.CREATE_DOCUMENT_SUCCESS });
    });
}
