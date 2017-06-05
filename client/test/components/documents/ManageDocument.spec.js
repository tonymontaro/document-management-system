import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { ManageDocument } from '../../../components/documents/ManageDocument';

const saveDocument = sinon.spy(() => Promise.resolve());

const props = {
  saveDocument,
  document: { title: 'Things fall apart', content: 'stuff', access: 'public' }
};

describe('ManageDocument', () => {
  it('renders the document form', () => {
    const wrapper = shallow(<ManageDocument {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('DocumentForm').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<ManageDocument {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('DocumentForm').prop('document'))
      .toEqual({ title: 'Things fall apart', content: 'stuff', access: 'public', errors: {} });
  });

  it('does not submit the form if a required field is missing or empty', () => {
    const wrapper = shallow(<ManageDocument {...props} />,
      { context: { router: [] } });

    wrapper.setState({ title: '' });

    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(saveDocument.callCount).toBe(0);
  });

  it('can submit the form', () => {
    const wrapper = shallow(<ManageDocument {...props} />,
      { context: { router: [] } });

    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(saveDocument.callCount).toBe(1);
  });
});
