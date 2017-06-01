import expect from 'expect';
import access from '../../reducers/accessReducer';
import * as types from '../../actions/types';
import initialState from '../../reducers/initialState';

describe('Access Reducer', () => {
  it('should set user when passed LOGIN_SUCCESS', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };
    const action = { type: types.LOGIN_SUCCESS, user };

    const expectedState = {
      loggedIn: true, user: { id: 1, username: 'admin', roleId: 1 }
    };

    // act
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set user when passed CLIENT_LOGIN', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };
    const action = { type: types.CLIENT_LOGIN, user };

    const expectedState = {
      loggedIn: true, user: { id: 1, username: 'admin', roleId: 1 }
    };

    // act
    const newState = access(initialState.access, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set initial state when passed LOGOUT', () => {
    // arrange
    const currentState = {
      loggedIn: true,
      user: { id: 1, username: 'admin', roleId: 1 },
    };
    const action = { type: types.LOGOUT };

    const expectedState = { loggedIn: false, user: {} };

    // act
    const newState = access(currentState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      iAmInitialState: true,
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = access(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
