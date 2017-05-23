import * as types from './types';

/**
* Update pagination page number
* @param {String} direction
* @returns {Object} dispatch object
*/
function updatePage(direction) {
  if (direction === 'prev') {
    return { type: types.DECREMENT_PAGE_NUMBER };
  }
  return { type: types.INCREMENT_PAGE_NUMBER };
}

export default updatePage;
