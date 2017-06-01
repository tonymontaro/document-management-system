import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../../components/common/TextInput';

function setup() {
  const props = {
    name: 'username',
    onChange: () => {},
    value: 'tony',
    error: '',
    icon: 'user',
    label: 'Username'
  };

  return shallow(<TextInput {...props} />);
}

describe('TextInput', () => {
  it('renders the an input field', () => {
    const wrapper = setup();
    expect(wrapper.find('.input-field').length).toEqual(1);
  });

  it('renders the input component', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('correctly initializes the input component', () => {
    const wrapper = setup();
    expect(wrapper.find('input').prop('value')).toBe('tony');
  });
});
