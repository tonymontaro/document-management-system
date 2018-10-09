import axios from 'axios';
import * as types from './types';
import { beginAjaxCall } from './ajaxStatusActions';
import { handleError, throwError } from '../utilities/errorHandler';

/**
* get roles
*
* @returns {Object} dispatch object
*/
export function getRoles() {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    return axios.get('/roles')
      .then((res) => {
        dispatch({
          type: types.LOAD_ROLES_SUCCESS,
          roles: res.data,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

/**
* Save a role
*
* @param {String} role
* @returns {Object} dispatch object
*/
export function saveRole(role) {
  if (role.id) {
    return (dispatch) => {
      dispatch(beginAjaxCall());

      return axios.put(`/roles/${role.id}`, role)
        .then((res) => {
          dispatch({ type: types.UPDATE_ROLE_SUCCESS, role: res.data });
        })
        .catch(error => throwError(error, dispatch));
    };
  }

  return (dispatch) => {
    dispatch(beginAjaxCall());

    return axios.post('/roles', role)
      .then((res) => {
        dispatch({ type: types.CREATE_ROLE_SUCCESS, role: res.data });
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
* Delete a role
*
* @param {String} id role id
* @returns {Object} dispatch object
*/
export function deleteRole(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    return axios.delete(`/roles/${id}`)
      .then(() => {
        dispatch({
          type: types.DELETE_ROLE_SUCCESS,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}
