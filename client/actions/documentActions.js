import axios from 'axios';
import * as types from './types';
import { beginAjaxCall } from './ajaxStatusActions';
import { handleError, throwError } from '../utilities/errorHandler';

export function getDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/documents?limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.LOAD_DOCUMENTS_SUCCESS,
          documents: res.data,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function searchDocument(query, offset = 0, limit = 9) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios
      .get(`/search/documents?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.SEARCH_SUCCESS,
          searchResult: res.data,
          query,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function saveDocument(document) {
  if (document.updateId) {
    return (dispatch) => {
      dispatch(beginAjaxCall());
      return axios.put(`/documents/${document.updateId}`, document)
        .then((res) => {
          dispatch({ type: types.UPDATE_DOCUMENT_SUCCESS, document: res.data });
        })
        .catch(error => throwError(error, dispatch));
    };
  }

  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/documents', document)
      .then((res) => {
        dispatch({ type: types.CREATE_DOCUMENT_SUCCESS, document: res.data });
      })
      .catch(error => throwError(error, dispatch));
  };
}

export function deleteDocument(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.delete(`/documents/${id}`)
      .then(() => {
        dispatch({
          type: types.DELETE_DOCUMENT_SUCCESS,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function getDocument(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/documents/${id}`)
      .then((res) => {
        dispatch({
          type: types.GET_DOCUMENT_SUCCESS,
          document: res.data
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}

export function getUserDocuments(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/${id}/documents`)
      .then((res) => {
        dispatch({
          type: types.GET_USER_DOCUMENTS_SUCCESS,
          documents: res.data
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}
