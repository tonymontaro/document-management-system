import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../components/include/Navbar';

function setup() {
  const props = {
    username: 'Rooney',
    logout: () => {},
    accessClass: 'admin-user',
    getDocuments: () => {},
    getProfile: () => {},
    getUsers: () => {},
    getUserDocuments: () => {}
  };

  return shallow(<Navbar {...props} />);
}

describe('Navbar', () => {
  it('renders the fixed navbar', () => {
    const wrapper = setup();
    expect(wrapper.find('.navbar-fixed').length).toEqual(1);
  });

  it('renders all navbar linkds', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).toEqual(13);
  });

  it('adds the access-class to the navbar', () => {
    const wrapper = setup();
    expect(wrapper.find('.admin-user').length).toEqual(1);
  });
});
