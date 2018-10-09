import expect from 'expect';
import users from '../../reducers/userReducer';
import * as types from '../../actions/types';

describe('Users Reducer', () => {
  it('should set user profile when passed GET_PROFILE_SUCCESS', () => {
    // arrange
    const initialState = {
      users: [],
      userProfile: { username: '' }
    };
    const loadedProfile = { username: 'Anthony' };
    const action = { type: types.GET_PROFILE_SUCCESS, profile: loadedProfile };

    // act
    const newState = users(initialState, action);

    expect(newState.userProfile).toEqual(loadedProfile);
  });

  it('should set users when passed LOAD_USERS_SUCCESS', () => {
    // arrange
    const initialState = {
      users: [],
      userProfile: { username: '' }
    };
    const loadedUsers = [
      { id: '1', username: 'Tony' },
      { id: '2', username: 'Eze' },
      { id: '3', username: 'Kenpachi' }
    ];
    const action = { type: types.LOAD_USERS_SUCCESS, users: loadedUsers };

    // act
    const newState = users(initialState, action);

    expect(newState.users).toEqual(loadedUsers);
  });

  it('should update user when passed UPDATE_USER_SUCCESS', () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', username: 'Tony' },
        { id: '2', username: 'Eze' },
        { id: '3', username: 'Kenpachi' }
      ],
      userProfile: { username: '' }
    };
    const action = { type: types.UPDATE_USER_SUCCESS, user: { id: '2', username: 'NewUsername' } };

    const expectedState = {
      users: [
        { id: '2', username: 'NewUsername' },
        { id: '1', username: 'Tony' },
        { id: '3', username: 'Kenpachi' }
      ],
      userProfile: { username: '' }
    };

    // act
    const newState = users(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set users when passed SEARCH_USERS_SUCCESS', () => {
    // arrange
    const initialState = {
      users: [],
      userProfile: { username: '' }
    };

    const expectedState = {
      users: [{ username: 'Anthony' }],
      userProfile: { username: '' }
    };

    const action = { type: types.SEARCH_USERS_SUCCESS, searchResult: [{ username: 'Anthony' }] };

    // act
    const newState = users(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set user profile to the initial state when passed LOGOUT', () => {
    // arrange
    const currentState = {
      users: [{ name: 'kempachi' }],
      userProfile: { username: 'anthony' }
    };

    const expectedState = {
      users: [{ name: 'kempachi' }],
      userProfile: { username: '', about: '', fullName: '', email: '' }
    };

    const action = { type: types.LOGOUT };

    // act
    const newState = users(currentState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      iAmInitialState: true,
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = users(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
