import { combineReducers } from 'redux';
import { documents, document } from './documentReducer';
import access from './accessReducer';
import users from './userReducer';
import roles from './roleReducer';
import pagination from './paginationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  documents,
  access,
  users,
  roles,
  document,
  pagination,
  ajaxCallsInProgress
});

export default rootReducer;
