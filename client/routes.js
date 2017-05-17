import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DocumentsPage from './components/documents/DocumentsPage';
import LoginPage from './components/access/LoginPage';
import SignUpPage from './components/access/SignUpPage';
import DocumentPage from './components/documents/DocumentPage';
import NewDocument from './components/documents/NewDocument';
import ProfilePage from './components/users/ProfilePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DocumentsPage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="document/new" component={NewDocument} />
    <Route path="document/:id" component={DocumentPage} />
    <Route path="*" component={DocumentsPage} />
  </Route>
);
