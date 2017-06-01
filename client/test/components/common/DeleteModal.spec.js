import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import DeleteModal from '../../../components/common/DeleteModal';

const deleteItem = sinon.spy();

function setup() {
  const props = {
    toBeDeleted: { title: '', id: 25 },
    deleteItem
  };

  return shallow(<DeleteModal {...props} />);
}

describe('DeleteModal', () => {
  it('renders the delete modal', () => {
    const wrapper = setup();
    expect(wrapper.find('#deleteModal').length).toEqual(1);
  });

  it('renders confirm and reject buttons', () => {
    const wrapper = setup();
    expect(wrapper.find('a.modal-action').length).toEqual(2);
    expect(wrapper.find('a.modal-action').first().text()).toEqual('No');
    expect(wrapper.find('a.modal-action').last().text()).toEqual('Yes');
  });

  it('can call the deleteItem function', () => {
    const wrapper = setup();
    wrapper.find('a.modal-action').last().simulate('click');
    expect(deleteItem.callCount).toEqual(1);
  });
});
