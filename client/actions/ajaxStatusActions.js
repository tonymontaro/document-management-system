import * as types from './types';

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function endAjaxCall() {
  return { type: types.END_AJAX_CALL };
}
