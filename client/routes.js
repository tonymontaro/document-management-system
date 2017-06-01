import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/documents/HomePage';
import LoginPage from './components/access/LoginPage';
import SignUpPage from './components/access/SignUpPage';
import DocumentPage from './components/documents/DocumentPage';
import ManageDocument from './components/documents/ManageDocument';
import ProfilePage from './components/users/ProfilePage';
import ManageRoles from './components/roles/ManageRoles';
import ManageUsers from './components/users/ManageUsers';
import EnsureUserIsAdmin from './components/access/EnsureUserIsAdmin';
import EnsureLoggedIn from './components/access/EnsureLoggedIn';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />

    <Route component={EnsureLoggedIn}>
      <Route path="mydocuments" component={HomePage} />
      <Route path="user/edit" component={SignUpPage} />
      <Route path="profile" component={ProfilePage} />
      <Route path="document/:id" component={ManageDocument} />
    </Route>

    <Route component={EnsureUserIsAdmin}>
      <Route path="user" component={ManageUsers} />
      <Route path="role" component={ManageRoles} />
    </Route>

    <Route path="document" component={ManageDocument} />
    <Route path="/:id" component={DocumentPage} />
    <Route path="*" component={HomePage} />
  </Route>
);
