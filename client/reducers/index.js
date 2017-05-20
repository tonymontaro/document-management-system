import { combineReducers } from 'redux';
import documents from './documentReducer';
import access from './accessReducer';
import users from './userReducer';
import roles from './roleReducer';
import pagination from './paginationReducer';

const rootReducer = combineReducers({
  documents,
  access,
  users,
  roles,
  pagination
});

export default rootReducer;
