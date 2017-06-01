import { endAjaxCall } from '../actions/ajaxStatusActions';

/**
 * Handle ajax call errors
 * *
 * @param {Object} error
 * @param {Function} dispatch
 * @returns {Function} function that displays an error message
 */
export function handleError(error, dispatch) {
  if (dispatch) dispatch(endAjaxCall());
  if (error.response) {
    return Materialize.toast(error.response.data.message, 2000);
  }
  return Materialize.toast('Something went wrong', 2000);
}
/**
* Throw an ajax call error to be handle else where
*
* @param {Object} error
* @param {Function} dispatch
* @returns {Object} error
*/
export function throwError(error, dispatch) {
  dispatch(endAjaxCall());
  throw error;
}
