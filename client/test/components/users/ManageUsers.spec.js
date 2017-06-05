import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { ManageUsers } from '../../../components/users/ManageUsers';

const saveUser = sinon.spy(() => Promise.resolve());
const searchUsers = sinon.spy(() => Promise.resolve());
const getUsers = sinon.spy(() => Promise.resolve());

const props = {
  getUsers,
  saveUser,
  searchUsers,
  roles: [{ name: 'admin', id: 1 }],
  users: [{ username: 'tony' }],
  pagination: {},
  access: { loggedIn: true, user: { username: 'tonymontaro', id: 3 } }
};

describe('ManageUsers', () => {
  it('renders the UsersPage', () => {
    const wrapper = shallow(<ManageUsers {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('UsersPage').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<ManageUsers {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('UsersPage').prop('users'))
      .toEqual([{ username: 'tony' }]);
  });

  it('perform a search', () => {
    const wrapper = shallow(<ManageUsers {...props} />,
      { context: { router: [] } });

    wrapper.instance().onSearch({ preventDefault: () => {} });
    expect(searchUsers.callCount).toBe(1);
  });

  it('can update a user', () => {
    const wrapper = shallow(<ManageUsers {...props} />,
      { context: { router: [] } });

    wrapper.setState({ user: { id: 3, error: '', roleId: '2' } });
    wrapper.instance().onSubmit({ preventDefault: () => {} }, 'new');

    expect(saveUser.callCount).toBe(1);
  });
});
