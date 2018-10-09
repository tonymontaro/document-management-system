import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage } from '../../../components/users/ProfilePage';

const logout = sinon.spy(() => Promise.resolve());
const deleteUser = sinon.spy(() => Promise.resolve());

const props = {
  logout,
  deleteUser,
  profile: { username: 'tonymontaro', fullName: 'Tony Montaro', id: 3 },
  access: { loggedIn: true, user: { username: 'tonymontaro', id: 3 } }
};

describe('ProfilePage', () => {
  it('renders the UsersPage', () => {
    const wrapper = shallow(<ProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('.form-div').length).toBe(1);
  });

  it("correctly displays user's profile", () => {
    const wrapper = shallow(<ProfilePage {...props} />,
      { context: { router: { push: () => {} } } });

    expect(wrapper.find('h3').first().text())
      .toEqual('Name: Tony Montaro');
  });

  it("can delete a user's profile", () => {
    const wrapper = shallow(<ProfilePage {...props} />,
      { context: { router: { push: () => {} } } });

    wrapper.instance().deleteProfile(3);

    expect(deleteUser.callCount).toBe(1);
  });
});
