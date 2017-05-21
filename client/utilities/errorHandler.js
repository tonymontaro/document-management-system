import { endAjaxCall } from '../actions/ajaxStatusActions';

export function handleError(error, dispatch) {
  if (dispatch) dispatch(endAjaxCall());
  if (error.response) {
    return Materialize.toast(error.response.data.message, 2000);
  }
  return Materialize.toast('Something went wrong', 2000);
}

export function throwError(error, dispatch) {
  dispatch(endAjaxCall());
  throw error;
}
