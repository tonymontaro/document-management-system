import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/common/Spinner';

describe('Spinner', () => {
  it('renders the spinner wrapper', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.preloader-wrapper').length).toEqual(1);
  });

  it('renders the spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.circle').length).toEqual(3);
  });
});
