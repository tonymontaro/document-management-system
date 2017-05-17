import { combineReducers } from 'redux';
import documents from './documentReducer';
import access from './accessReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  documents,
  access,
  users
});

export default rootReducer;
