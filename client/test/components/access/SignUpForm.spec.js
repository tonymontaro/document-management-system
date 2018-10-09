import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../components/access/SignUpForm';

function setup() {
  const props = {
    userDetails: { username: '', errors: {}, password: '', fullName: 'Kenpachi' },
    onSubmit: () => {},
    onChange: () => {},
    options: []
  };

  return shallow(<SignUpForm {...props} />);
}

describe('SignUpForm', () => {
  it('renders a text input for the fullName', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(0).prop('name')).toBe('fullName');
  });

  it('renders a text input for the email', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(1).prop('name')).toBe('email');
  });

  it('renders a text input for the username', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(2).prop('name')).toBe('username');
  });

  it('renders a text input for the password', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(3).prop('name')).toBe('password');
  });

  it('renders a textarea for the about section', () => {
    const wrapper = setup();
    expect(wrapper.find('textarea').length).toEqual(1);
  });

  it('renders the save button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('populates a field with initial data', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(0).prop('value')).toBe('Kenpachi');
  });
});
