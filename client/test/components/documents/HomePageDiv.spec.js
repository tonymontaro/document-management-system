import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import HomePageDiv from '../../../components/documents/HomePageDiv';

function setup() {
  const props = {
    search: 'doc',
    onSearch: () => {},
    onChange: () => {},
    access: { loggedIn: true, user: { username: 'tony' } },
    documents: [{ title: 'Manny' }, {}, {}],
    toBeDeleted: {},
    confirmDelete: () => {},
    deleteDocument: () => {},
    nextPage: () => {},
    prevPage: () => {},
    paginate: { page: 1, pageCount: 3, pageSize: 9, totalCount: 26 },
    isMyDocuments: false
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

  it('renders correct number of documents', () => {
    const wrapper = setup();
    expect(wrapper.find('DocumentCard').length).toEqual(3);
  });

  it('correctly passes in props when rendering a DocumentCard', () => {
    const wrapper = setup();
    expect(wrapper.find('DocumentCard').first().prop('document')).toEqual({ title: 'Manny' });
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
