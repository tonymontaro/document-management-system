import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { SignUpPage } from '../../../components/access/SignUpPage';

const saveUser = sinon.spy(() => Promise.resolve());

const props = {
  saveUser,
  profile: {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: '',
  }
};

describe('SignUpPage', () => {
  it('renders the signup input fields', () => {
    const wrapper = mount(<SignUpPage {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('input').length).toBe(5);
  });

  it('controls the signup input fields', () => {
    const wrapper = mount(<SignUpPage {...props} />,
    { context: { router: [] } });

    wrapper.find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: 'montaro' } });

    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('montaro');
  });

  it('can submit the form', () => {
    const wrapper = mount(<SignUpPage {...props} />,
    { context: { router: [] } });

    wrapper.setState({
      fullName: 'Zaraki Kenpachi',
      username: 'kenpachi',
      email: 'kenboss@bleach.com',
      password: 'bankai',
      confirmPassword: 'bankai',
      about: 'I am the strongest!',
    });
    wrapper.find('form').simulate('submit');

    expect(saveUser.callCount).toEqual(1);
  });

  it('can does not submit the form if a required field was not filled', () => {
    const wrapper = mount(<SignUpPage {...props} />,
    { context: { router: [] } });

    wrapper.setState({
      fullName: 'Zaraki Kenpachi',
      email: 'kenboss@bleach.com',
      password: 'bankai',
      confirmPassword: 'bankai',
      about: 'I am the strongest!',
    });
    wrapper.find('form').simulate('submit');

    expect(wrapper.find('.error').first().text()).toEqual('Please enter the username');
  });
});
