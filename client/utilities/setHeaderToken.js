import axios from 'axios';
/**
* Set and use a token for every ajax call
* @param {Object} token
* @returns {Undefined} returns nothing
*/
export default function setHeaderToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
