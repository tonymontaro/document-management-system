import axios from 'axios';
import * as types from './types';
import { beginAjaxCall } from './ajaxStatusActions';
import { handleError, throwError } from '../utilities/errorHandler';

/**
* Get user profile
* @param {String} id user id
* @returns {Object} dispatch object
*/
export function getProfile(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/${id}`)
      .then((res) => {
        dispatch({
          type: types.GET_PROFILE_SUCCESS,
          profile: res.data
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
* get users
* @param {Number} offset
* @param {Number} limit
* @returns {Object} dispatch object
*/
export function getUsers(offset = 0, limit = 9) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users?limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.LOAD_USERS_SUCCESS,
          users: res.data,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

/**
* search users
* @param {String} query
* @param {Number} offset
* @param {Number} limit
* @returns {Object} dispatch object
*/
export function searchUsers(query, offset = 0, limit = 9) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/search/users?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: types.SEARCH_USERS_SUCCESS,
          searchResult: res.data,
          query,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

/**
* update user details
* @param {String} user
* @returns {Object} dispatch object
*/
export function saveUser(user) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.put(`/users/${user.id}`, user)
      .then((res) => {
        dispatch({ type: types.UPDATE_USER_SUCCESS, user: res.data });
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
* Delete a user
* @param {String} id user id
* @returns {Object} dispatch object
*/
export function deleteUser(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.delete(`/users/${id}`)
      .then(() => {
        dispatch({
          type: types.DELETE_USER_SUCCESS,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}
