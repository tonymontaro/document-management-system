import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/include/Footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toEqual(1);
  });

  it('renders the footer content', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.container').text())
      .toBe('© 2017 Andela, developed by Anthony Ngene.');
  });
});
