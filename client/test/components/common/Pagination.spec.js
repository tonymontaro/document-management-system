import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../components/common/Pagination';

function setup() {
  const props = {
    collection: [],
    nextPage: () => {},
    prevPage: () => {},
    currentPage: 1
  };

  return shallow(<Pagination {...props} />);
}

describe('Pagination', () => {
  it('renders the Pagination component', () => {
    const wrapper = setup();
    expect(wrapper.find('.pagination').length).toEqual(1);
  });
  it('renders the next and prev buttons', () => {
    const wrapper = setup();
    expect(wrapper.find('.material-icons').length).toEqual(2);
    expect(wrapper.find('.material-icons').first().text()).toEqual('chevron_left');
    expect(wrapper.find('.material-icons').last().text()).toEqual('chevron_right');
  });
});
