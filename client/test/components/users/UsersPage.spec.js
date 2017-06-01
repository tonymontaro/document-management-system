import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import UsersPage
  from '../../../components/users/UsersPage';

const onClick = sinon.spy();

function setup() {
  const props = {
    users: [{ name: 'tony' }, { name: 'eze' }],
    user: {},
    editRole: {},
    options: [],
    onClick,
    onChange: () => {},
    search: 'Doc-Mage',
    nextPage: () => {},
    prevPage: () => {},
    onSearch: () => {},
    onSubmit: () => {},
    deleteUser: () => {},
    paginate: {}
  };

  return shallow(<UsersPage
    {...props} />);
}

describe('UsersPage', () => {
  it('renders the top container', () => {
    const wrapper = setup();
    expect(wrapper.find('.documents-div').length).toEqual(1);
  });

  it('renders a table of users', () => {
    const wrapper = setup();
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the table header row and a table row for each user', () => {
    const wrapper = setup();
    expect(wrapper.find('tr').length).toEqual(3);
  });

  it('renders two forms for searching for and updating users', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(2);
  });

  it('renders the pagination component', () => {
    const wrapper = setup();
    expect(wrapper.find('Pagination').length).toEqual(1);
  });

  it('can call the onClick function to set state and launch the modal', () => {
    const wrapper = setup();
    wrapper.find('a.secondary-content').first().simulate('click');
    expect(onClick.callCount).toEqual(1);
  });
});
