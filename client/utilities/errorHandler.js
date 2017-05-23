import { endAjaxCall } from '../actions/ajaxStatusActions';

/**
 *
 * @export
 * @param {Object} error
 * @param {Function} dispatch
 * @returns {Function} error message
 */
export function handleError(error, dispatch) {
  if (dispatch) dispatch(endAjaxCall());
  if (error.response) {
    return error.response.data.errors ?
      Materialize.toast(error.response.data.errors[0].message, 2000) :
      Materialize.toast(error.response.data.message, 2000);
  }
  return Materialize.toast('Something went wrong', 2000);
}

export function throwError(error, dispatch) {
  dispatch(endAjaxCall());
  throw error;
}
