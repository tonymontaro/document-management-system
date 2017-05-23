import expect from 'expect';
import access from '../../reducers/accessReducer';
import * as types from '../../actions/types';
import initialState from '../../reducers/initialState';

describe('Access Reducer', () => {
  it('should set user when passed LOGIN_SUCCESS', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };

    const action = { type: types.LOGIN_SUCCESS, user };
    // act
    const newState = access(initialState.access, action);

    expect(newState.loggedIn).toEqual(true);
    expect(newState.user).toEqual(user);
  });
  it('should set user when passed CLIENT_LOGIN', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };

    const action = { type: types.CLIENT_LOGIN, user };
    // act
    const newState = access(initialState.access, action);

    expect(newState.loggedIn).toEqual(true);
    expect(newState.user).toEqual(user);
  });
  it('should set initial state passed LOGOUT', () => {
    // arrange
    const currentState = {
      loggedIn: true,
      user: { id: 1, username: 'admin', roleId: 1 },
    };
    const action = { type: types.LOGOUT };
    // act
    const newState = access(currentState, action);

    expect(newState.loggedIn).toEqual(false);
    expect(newState).toEqual(initialState.access);
  });
});
