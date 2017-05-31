import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import HomePageDiv from '../../../components/documents/HomePageDiv';

function setup() {
  const props = {
    search: 'doc',
    onSearch: () => {},
    onChange: () => {},
    access: { loggedIn: true, user: 'tony' },
    documents: [],
    toBeDeleted: {},
    confirmDelete: () => {},
    deleteDocument: () => {},
    nextPage: () => {},
    prevPage: () => {},
    paginate: { page: 1, pageCount: 3, pageSize: 9, totalCount: 26 }
  };

  return shallow(<HomePageDiv {...props} />);
}

describe('HomePageDiv', () => {
  it('renders the homepage div', () => {
    const wrapper = setup();
    expect(wrapper.find('.documents-div').length).toEqual(1);
  });

  it('renders search form', () => {
    const wrapper = setup();
    expect(wrapper.find('.search-form').length).toEqual(1);
  });

  it('renders recent-documents container', () => {
    const wrapper = setup();
    expect(wrapper.find('.recent-documents').length).toEqual(1);
  });

  it('renders the pagination', () => {
    const wrapper = setup();
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
