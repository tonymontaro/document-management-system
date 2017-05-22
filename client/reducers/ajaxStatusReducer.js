import * as types from '../actions/types';
import initialState from './initialState';

export default function ajaxCallsInProgress(state = initialState.ajaxCallsInProgress, action) {
  const type = action.type;

  if (type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (type.substring(type.length - 7) === 'SUCCESS' || type === types.END_AJAX_CALL) {
    return state - 1;
  }

  return state;
}
