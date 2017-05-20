import axios from 'axios';
import * as types from './types';

export function getRoles() {
  return (dispatch) => {
    return axios.get('/roles')
      .then((res) => {
        dispatch({
          type: types.LOAD_ROLES_SUCCESS,
          roles: res.data,
        });
      });
  };
}

export function saveRole(role) {
  if (role.id) {
    return dispatch => axios.put(`/roles/${role.id}`, role)
    .then((res) => {
      dispatch({ type: types.UPDATE_ROLE_SUCCESS, role: res.data });
    });
  }
  return dispatch => axios.post('/roles', role)
  .then((res) => {
    dispatch({ type: types.CREATE_ROLE_SUCCESS, role: res.data });
  });
}

export function deleteRole(id) {
  return (dispatch) => {
    return axios.delete(`/roles/${id}`)
      .then(() => {
        dispatch({
          type: types.DELETE_ROLE_SUCCESS,
        });
      });
  };
}

// ===========================================

export function searchDocument(query, offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/search/documents?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.SEARCH_SUCCESS,
          searchResult: res.data,
          query,
          offset
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

export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then(() => {
        dispatch({
          type: types.DELETE_DOCUMENTS_SUCCESS,
        });
      });
  };
}
