import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { EnsureLoggedIn } from '../../../components/access/EnsureLoggedIn';

const props = {
  access: { user: { username: 'tony' } },
  children: <input />
};

describe('EnsureLoggedIn Component', () => {
  it('renders the children if the user is logged in', () => {
    const wrapper = shallow(<EnsureLoggedIn {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('does not render the children if the user is not logged in', () => {
    props.access.user = {};

    const wrapper = shallow(<EnsureLoggedIn {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('input').length).toBe(0);
  });
});
