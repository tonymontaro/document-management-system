import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { ManageRoles } from '../../../components/roles/ManageRoles';

const saveRole = sinon.spy(() => Promise.resolve());
const deleteRole = sinon.spy(() => Promise.resolve());
const getRoles = sinon.spy(() => Promise.resolve());

const props = {
  getRoles,
  saveRole,
  deleteRole,
  roles: [{ name: 'admin', id: 1 }],
  access: { loggedIn: true, user: { username: 'tonymontaro', id: 3 } }
};

describe('ManageRoles Component', () => {
  it('renders the RolesPage', () => {
    const wrapper = shallow(<ManageRoles {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('RolesPage').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<ManageRoles {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('RolesPage').prop('roles'))
      .toEqual([{ name: 'admin', id: 1 }]);
  });

  it('can delete a role', () => {
    const wrapper = shallow(<ManageRoles {...props} />,
      { context: { router: [] } });

    wrapper.instance().deleteRole(2);
    expect(deleteRole.callCount).toBe(1);
  });

  it('can save a new role', () => {
    const wrapper = shallow(<ManageRoles {...props} />,
      { context: { router: [] } });

    wrapper.setState({ newRole: { name: 'editor' } });
    wrapper.instance().onSave({ preventDefault: () => {} }, 'new');
    expect(saveRole.callCount).toBe(1);
  });

  it('can update a role', () => {
    const wrapper = shallow(<ManageRoles {...props} />,
      { context: { router: [] } });

    wrapper.setState({ editRole: { name: 'editors', id: 3 } });
    wrapper.instance().onSave({ preventDefault: () => {} });
    expect(saveRole.callCount).toBe(2);
  });
});
