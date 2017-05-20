import { combineReducers } from 'redux';
import { documents, page } from './documentReducer';
import access from './accessReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  documents,
  access,
  users,
  page
});

export default rootReducer;
