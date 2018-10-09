import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '../../../components/common/SelectInput';

function setup() {
  const props = {
    name: 'access',
    onChange: () => {},
    value: 'null',
    error: '',
    icon: 'user-secret',
    options: [{ value: 'public', text: 'Public' }],
    label: 'Choose access control'
  };

  return shallow(<SelectInput {...props} />);
}

describe('SelectInput', () => {
  it('renders the an input field', () => {
    const wrapper = setup();
    expect(wrapper.find('.input-field').length).toEqual(1);
  });

  it('renders a select component', () => {
    const wrapper = setup();
    expect(wrapper.find('select').length).toEqual(1);
  });

  it('correctly initializes the select input', () => {
    const wrapper = setup();
    expect(wrapper.find('select').prop('value')).toBe('null');
  });
});
