import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import RolesPage from '../../../components/roles/RolesPage';

const onClick = sinon.spy();
const onChange = sinon.spy();
const onSave = sinon.spy();

function setup() {
  const props = {
    roles: [{ name: 'admin' }, { name: 'regular' }],
    editRole: {},
    newRole: {},
    onClick,
    onChange,
    onSave,
    deleteRole: () => {}
  };

  return shallow(<RolesPage {...props} />);
}

describe('RolesPage', () => {
  it('renders a collection of roles', () => {
    const wrapper = setup();
    expect(wrapper.find('.collection').length).toEqual(1);
  });

  it('renders a collection-item div for each role', () => {
    const wrapper = setup();
    expect(wrapper.find('.collection-item').length).toEqual(2);
  });

  it('renders two forms for creating and updating roles', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(2);
  });

  it('can call the onClick function to set state and launch the modal', () => {
    const wrapper = setup();
    wrapper.find('.delete-role').first().simulate('click');
    wrapper.find('.edit-role').first().simulate('click');
    expect(onClick.callCount).toEqual(2);
  });

  it('can call the onSave function to submit the forms', () => {
    const wrapper = setup();
    wrapper.find('form').first().simulate('submit');
    expect(onSave.callCount).toEqual(1);
  });

  it('can call the onChange to specially control a form field', () => {
    const wrapper = setup();
    wrapper.find('#newRole').simulate('change');
    expect(onChange.callCount).toEqual(1);
  });
});
