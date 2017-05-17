import axios from 'axios';
import * as types from './types';

export function getProfile(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
      .then((res) => {
        dispatch({
          type: types.GET_PROFILE_SUCCESS,
          profile: res.data
        });
      });
  };
}
