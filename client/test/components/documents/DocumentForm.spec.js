import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentForm from '../../../components/documents/DocumentForm';

function setup() {
  const props = {
    document: {
      id: '1',
      title: 'Things fall apart',
      content: 'content',
      authorId: '1',
      errors: { title: '', access: '', content: '' },
      access: 'public'
    },
    accessOptions: [],
    getContent: () => {},
    onChange: () => {},
    onSubmit: () => {}
  };

  return shallow(<DocumentForm {...props} />);
}

describe('DocumentForm', () => {
  it('renders the document form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').length).toEqual(1);
  });
  it('renders select input', () => {
    const wrapper = setup();
    expect(wrapper.find('SelectInput').length).toEqual(1);
  });
  it('renders the content editor', () => {
    const wrapper = setup();
    expect(wrapper.find('TinyMCE').length).toEqual(1);
  });
  it('populates input fields with initial data', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').prop('value')).toEqual('Things fall apart');
    expect(wrapper.find('SelectInput').prop('value')).toEqual('public');
  });
});
