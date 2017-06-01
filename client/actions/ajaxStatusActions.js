import * as types from './types';

/**
* Dispatch action to start an ajax call
*
* @returns {Object} dispatch object
*/
export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}
/**
* Dispatch action to end an ajax call
*
* @returns {Object} dispatch object
*/
export function endAjaxCall() {
  return { type: types.END_AJAX_CALL };
}
