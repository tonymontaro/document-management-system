import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { LoginPage } from '../../../components/access/LoginPage';

const login = sinon.spy(() => Promise.resolve());

const props = {
  login,
  getDocuments: () => Promise.resolve()
};

describe('LoginPage Component', () => {
  it('renders the login input fields', () => {
    const wrapper = mount(<LoginPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(2);
  });

  it('controls the login input fields', () => {
    const wrapper = mount(<LoginPage {...props} />,
    { context: { router: { push: () => {} } } });

    wrapper.find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: 'montaro' } });

    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('montaro');
  });

  it('can submit the form and log the user in', () => {
    const wrapper = mount(<LoginPage {...props} />,
    { context: { router: { push: () => {} } } });

    wrapper.find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: 'tony' } });
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'pass' } });
    wrapper.find('form').simulate('submit');

    expect(login.callCount).toEqual(1);
  });

  it('can does not submit the form if a required field was not filled', () => {
    const wrapper = mount(<LoginPage {...props} />,
    { context: { router: { push: () => {} } } });

    wrapper.find('input[name="username"]')
      .simulate('change', { target: { name: 'username', value: 'tony' } });
    wrapper.find('form').simulate('submit');

    expect(wrapper.find('.error').last().text()).toEqual('Please enter the password');
  });
});
