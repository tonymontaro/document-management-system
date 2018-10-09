import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as roleActions from '../../actions/roleActions';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Role Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('GetRoles', () => {
    it('retrieves roles and dispatches LOAD_ROLES_SUCCESS', () => {
      moxios.stubRequest('/roles', {
        status: 200,
        response: [{ name: 'editor' }]
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'LOAD_ROLES_SUCCESS', roles: [{ name: 'editor' }] }
      ];
      const store = mockStore();

      return store.dispatch(roleActions.getRoles())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('SaveRole', () => {
    it('saves a new role and dispatches CREATE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles', {
        status: 200,
        response: { name: 'editor' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'CREATE_ROLE_SUCCESS', role: { name: 'editor' } }
      ];
      const store = mockStore();

      return store.dispatch(roleActions.saveRole({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('updates a role dispatching UPDATE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles/3', {
        status: 200,
        response: { name: 'editor' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'UPDATE_ROLE_SUCCESS', role: { name: 'editor' } }
      ];

      const store = mockStore({});
      return store.dispatch(roleActions.saveRole({ id: 3 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('DeleteRole', () => {
    it('deletes a role and dispatches DELETE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'DELETE_ROLE_SUCCESS' }
      ];
      const store = mockStore();

      return store.dispatch(roleActions.deleteRole(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
