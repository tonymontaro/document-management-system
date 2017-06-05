import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { DocumentPage } from '../../../components/documents/DocumentPage';

const props = {
  document: { title: 'Legend of Kora', content: 'stuff', id: 3 },
  getDocument: () => Promise.resolve(),
  params: { id: 3 }
};

describe('DocumentPage', () => {
  it('renders the document', () => {
    const wrapper = mount(<DocumentPage {...props} />,
      { context: { router: [] } });
    expect(wrapper.find('h3').text()).toEqual('Legend of Kora');
  });

  it('redirects the user if the document cannot be retrieved', () => {
    props.getDocument = sinon.spy(() => Promise.reject({ response: 'error' }));
    mount(<DocumentPage {...props} />, { context: { router: [] } });

    expect(props.getDocument.callCount).toEqual(1);
  });
});
