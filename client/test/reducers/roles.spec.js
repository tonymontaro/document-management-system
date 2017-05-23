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

    // act
    const newState = roles(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual('admin');
    expect(newState[1].name).toEqual('regular');
    expect(newState[2].name).toEqual('editor');
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

    // act
    const newState = roles(initialState, action);
    const updatedRole = newState.find(currentRole => currentRole.id === role.id);
    const untouchedRole = newState.find(currentRole => currentRole.id === '1');

    // assert
    expect(updatedRole.name).toEqual('New Role');
    expect(untouchedRole.name).toEqual('admin');
    expect(newState.length).toEqual(initialState.length);
  });
});
