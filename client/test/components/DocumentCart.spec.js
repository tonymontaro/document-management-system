import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentCard from '../../components/documents/DocumentCard';

function setup() {
  const props = {
    document: {
      id: '1',
      title: 'Things fall apart',
      content: 'content',
      authorId: '1'
    },
    editMode: false,
    deleteDocument: () => {},
    user: { id: 1, roleId: 1 }
  };

  return mount(<DocumentCard {...props} />);
}

describe('DocumentCard', () => {
  it('renders a card div', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
  });

  it('renders edit button', () => {
    const wrapper = setup();
    expect(wrapper.find('.edit-btn')).toExist;
  });
  it('receives the correct props', () => {
    const wrapper = setup();
    expect(wrapper.find('.card-title').text()).toEqual('Things fall apart');
  });
});
