import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../components/common/Pagination';

function setup() {
  const props = {
    collection: [],
    nextPage: () => {},
    prevPage: () => {},
    paginate: { page: 1, pageCount: 3, pageSize: 9, totalCount: 26 }
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

  it('correctly renders passed in props', () => {
    const wrapper = setup();
    expect(wrapper.find('div.center').text()).toEqual('Showing 9 of 26 results');
  });
});
