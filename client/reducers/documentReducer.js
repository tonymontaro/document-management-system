import * as types from '../actions/types';
import initialState from './initialState';

export default function documentReducer(state = initialState.documents, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;

    default:
      return state;
  }
}
