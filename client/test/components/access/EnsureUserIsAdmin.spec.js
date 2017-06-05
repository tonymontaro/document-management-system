import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { EnsureUserIsAdmin } from '../../../components/access/EnsureUserIsAdmin';

const props = {
  access: { user: { roleId: 1 } },
  children: <input />
};

describe('EnsureUserIsAdmin Component', () => {
  it('renders the children if the user is an admin', () => {
    const wrapper = shallow(<EnsureUserIsAdmin {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('does not render the children if the user is not an admin', () => {
    props.access.user.roleId = 2;

    const wrapper = shallow(<EnsureUserIsAdmin {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('input').length).toBe(0);
  });
});
