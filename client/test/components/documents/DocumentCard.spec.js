import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentCard from '../../../components/documents/DocumentCard';

function setup() {
  const props = {
    document: {
      id: '1',
      title: 'Things fall apart',
      content: 'content',
      authorId: 1
    },
    confirmDelete: () => {},
    deleteDocument: () => {},
    user: { id: 1, roleId: 1 }
  };

  return shallow(<DocumentCard {...props} />);
}

describe('DocumentCard', () => {
  it('renders a card div', () => {
    const wrapper = setup();
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('receives the title from props', () => {
    const wrapper = setup();
    expect(wrapper.find('.card-title').text()).toEqual('Things fall apart');
  });
});
