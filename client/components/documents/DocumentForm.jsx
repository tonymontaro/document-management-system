import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';

/**
 * Document Form
 *
 * @param {Object} props { accessOptions, getContent, onChange, document, onSubmit }
 * @returns {Object} jsx object
 */
const DocumentForm = ({ accessOptions, getContent, onChange, document, onSubmit }) =>
  <div className="form-div new-document">
    <div className="container">
      <h3 className="center">New Document</h3>
      <form onSubmit={onSubmit} >

        <TextInput
          name="title"
          label="Title"
          onChange={onChange}
          value={document.title}
          error={document.errors.title}
          icon="book" />

        <SelectInput
        value={document.access}
        name="access"
        label="Select document access"
        onChange={onChange}
        error={document.errors.access}
        options={accessOptions}
        icon="user-plus" />

        <TinyMCE
          content={document.content}
          config={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={getContent}
        />
        {document.errors.content &&
          <div className="card-panel error white-text">{document.errors.content}</div>}

        <div className="input-field center">
          <button className="waves-effect btn">Save</button>
        </div>

      </form>
    </div>
  </div>;

DocumentForm.propTypes = {
  accessOptions: PropTypes.array.isRequired,
  document: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
};

export default DocumentForm;
