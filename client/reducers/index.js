import { combineReducers } from 'redux';
import documents from './documentReducer';
import access from './accessReducer';
import users from './userReducer';
import page from './pageReducer';

const rootReducer = combineReducers({
  documents,
  access,
  users,
  page
});

export default rootReducer;
