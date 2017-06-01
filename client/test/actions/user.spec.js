import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('GetProfile', () => {
    it("fetches a user's profile and dispatches GET_PROFILE_SUCCESS", () => {
      moxios.stubRequest('/users/3', {
        status: 200,
        response: { username: 'tony' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_PROFILE_SUCCESS', profile: { username: 'tony' } }
      ];
      const store = mockStore();

      return store.dispatch(userActions.getProfile(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('GetUsers', () => {
    it('retrieves users and dispatches LOAD_USERS_SUCCESS', () => {
      moxios.stubRequest('/users?limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ username: 'tony' }],
          metaData: {}
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'LOAD_USERS_SUCCESS', users: [{ username: 'tony' }], metaData: {}, offset: 0, query: '' }
      ];
      const store = mockStore();

      return store.dispatch(userActions.getUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('SearchUsers', () => {
    it('searches for users and dispatches SEARCH_USERS_SUCCESS', () => {
      moxios.stubRequest('/search/users?q=tony&limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ username: 'tony' }],
          metaData: {}
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'SEARCH_USERS_SUCCESS', searchResult: [{ username: 'tony' }], metaData: {}, offset: 0, query: 'tony' }
      ];
      const store = mockStore();

      return store.dispatch(userActions.searchUsers('tony'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('SaveUser', () => {
    it("updates a user's dispatching UPDATE_USER_SUCCESS", () => {
      moxios.stubRequest('/users/3', {
        status: 200,
        response: { username: 'tony' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'UPDATE_USER_SUCCESS', user: { username: 'tony' } }
      ];

      const store = mockStore({});
      return store.dispatch(userActions.saveUser({ id: 3 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('DeleteUser', () => {
    it("deletes a user's profile and dispatches DELETE_USER_SUCCESS", () => {
      moxios.stubRequest('/users/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'DELETE_USER_SUCCESS' }
      ];
      const store = mockStore();

      return store.dispatch(userActions.deleteUser(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
