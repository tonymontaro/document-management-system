import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/documents/HomePage';
import LoginPage from './components/access/LoginPage';
import SignUpPage from './components/access/SignUpPage';
import DocumentPage from './components/documents/DocumentPage';
import ManageDocument from './components/documents/ManageDocument';
import ProfilePage from './components/users/ProfilePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="document" component={ManageDocument} />
    <Route path="document/:id" component={ManageDocument} />
    <Route path="/:id" component={DocumentPage} />
    <Route path="*" component={HomePage} />
  </Route>
);
