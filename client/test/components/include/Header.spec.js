import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/include/Header';

const logout = sinon.spy(() => Promise.resolve());
const getProfile = sinon.spy(() => Promise.resolve());
const getDocuments = sinon.spy(() => Promise.resolve());
const getUserDocuments = sinon.spy(() => Promise.resolve());

const props = {
  logout,
  getDocuments,
  getProfile,
  getUserDocuments,
  access: { loggedIn: true, user: { username: 'tonymontaro', id: 3 } }
};

describe('Header Component', () => {
  it('renders the navigation bar', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('Navbar').length).toBe(1);
  });


  it('correctly passes in props', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('Navbar').prop('username'))
      .toEqual('tonymontaro');
  });

  it('can get user profile', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });

    wrapper.instance().getProfile();
    expect(getProfile.callCount).toBe(1);
  });

  it('can log a user out', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });

    wrapper.instance().logout();
    expect(logout.callCount).toBe(1);
  });

  it('can get documents and redirect user to the homepage', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });

    wrapper.instance().getDocuments();
    expect(getDocuments.callCount).toBe(1);
  });

  it('can get user documents', () => {
    const wrapper = shallow(<Header {...props} />,
      { context: { router: { push: () => {} } } });

    wrapper.instance().getUserDocuments();
    expect(getUserDocuments.callCount).toBe(1);
  });
});
