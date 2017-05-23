import expect from 'expect';
import users from '../../reducers/userReducer';
// import initialState from '../../reducers/initialState';
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

    // assert
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
    const user = { id: '2', username: 'NewUsername' };
    const action = { type: types.UPDATE_USER_SUCCESS, user };

    // act
    const newState = users(initialState, action);
    const updatedUser = newState.users.find(currentUser => currentUser.id === user.id);
    const untouchedRole = newState.users.find(currentUser => currentUser.id === '1');

    // assert
    expect(updatedUser.username).toEqual('NewUsername');
    expect(untouchedRole.username).toEqual('Tony');
    expect(newState.length).toEqual(initialState.length);
  });
});
