import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as accessActions from '../../actions/accessActions';
import * as types from '../../actions/types';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNDk2MDA5MjQxLCJleHAiOjE0OTY2MTQwNDF9.hkWYITDnqi7paQjhkqhh5Fe0yAiPf34Ffji9jKHQ_Ik';

describe('Access Actions', () => {
  describe('ClientLogin', () => {
    it('logins in a user and returns CLIENT_LOGIN', () => {
      const expectedAction = { type: 'CLIENT_LOGIN', user: { id: 1, roleId: 1, username: 'admin' } };

      const action = accessActions.clientLogin(token, types.CLIENT_LOGIN);
      expect(action.type).toEqual(expectedAction.type);
    });
  });


  describe('Login', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetches user token and logs the user in returning LOGIN_SUCCESS', () => {
      moxios.stubRequest('/users/login', {
        status: 200,
        response: {
          token,
          message: 'Login successful'
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'LOGIN_SUCCESS', user: { id: 1, roleId: 1, username: 'admin' } }
      ];
      const store = mockStore({ loggedIn: false, user: {} });

      return store.dispatch(accessActions.login({ username: 'admin', password: 'alpine' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
