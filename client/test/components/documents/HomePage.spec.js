import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { HomePage } from '../../../components/documents/HomePage';

const deleteDocument = sinon.spy(() => Promise.resolve());
const searchDocument = sinon.spy(() => Promise.resolve());
const getUserDocuments = sinon.spy(() => Promise.resolve());

const props = {
  deleteDocument,
  searchDocument,
  getUserDocuments,
  getDocuments: () => {},
  access: {},
  documents: [],
  pagination: {},
  location: { pathname: '/' }
};

describe('HomePage', () => {
  it('renders the homepage', () => {
    const wrapper = mount(<HomePage {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('h3').text()).toEqual('Recently Added Documents');
  });

  it('controls the search form input field', () => {
    const wrapper = mount(<HomePage {...props} />,
    { context: { router: [] } });

    wrapper.find('input[name="search"]')
      .simulate('change', { target: { name: 'search', value: 'Doc' } });

    expect(wrapper.find('input[name="search"]').prop('value')).toEqual('Doc');
  });

  it('can perform a search', () => {
    const wrapper = mount(<HomePage {...props} />,
    { context: { router: [] } });

    wrapper.find('input[name="search"]')
    .simulate('change', { target: { name: 'search', value: 'Doc' } });
    wrapper.find('form').simulate('submit');

    expect(searchDocument.callCount).toEqual(1);
  });
});
