import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import RolesPage from '../../../components/roles/RolesPage';

function setup() {
  const props = {
    roles: [{ name: 'admin' }, { name: 'regular' }],
    editRole: {},
    newRole: {},
    onClick: () => {},
    onChange: () => {},
    onSave: () => {},
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
});
