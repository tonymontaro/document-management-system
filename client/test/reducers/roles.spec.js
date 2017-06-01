import expect from 'expect';
import roles from '../../reducers/roleReducer';
import * as types from '../../actions/types';

describe('Roles Reducer', () => {
  it('should set roles when passed LOAD_ROLES_SUCCESS', () => {
    // arrange
    const initialState = [];
    const loadedRoles = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'regular' },
      { id: '3', name: 'editor' }
    ];
    const action = { type: types.LOAD_ROLES_SUCCESS, roles: loadedRoles };

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(loadedRoles);
  });

  it('should add role when passed CREATE_ROLE_SUCCESS', () => {
    // arrange
    const initialState = [
      { name: 'admin' },
      { name: 'regular' }
    ];
    const newRole = { name: 'editor' };
    const action = { type: types.CREATE_ROLE_SUCCESS, role: newRole };

    const expectedState = [
      { name: 'admin' },
      { name: 'regular' },
      { name: 'editor' }
    ];

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update role when passed UPDATE_ROLE_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'regular' },
      { id: '3', name: 'editor' }
    ];
    const role = { id: '2', name: 'New Role' };
    const action = { type: types.UPDATE_ROLE_SUCCESS, role };

    const expectedState = [
      { id: '1', name: 'admin' },
      { id: '3', name: 'editor' },
      { id: '2', name: 'New Role' }
    ];

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      iAmInitialState: true,
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = roles(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
