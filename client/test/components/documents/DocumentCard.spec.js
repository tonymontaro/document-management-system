import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import DocumentCard from '../../../components/documents/DocumentCard';

const confirmDelete = sinon.spy();

function setup() {
  const props = {
    document: {
      id: '1',
      title: 'Things fall apart',
      content: 'content',
      authorId: 1
    },
    confirmDelete,
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

  it('can call the confirmDelete modal', () => {
    const wrapper = setup();
    wrapper.find('.delete-btn').simulate('click');
    expect(confirmDelete.callCount).toEqual(1);
  });
});
