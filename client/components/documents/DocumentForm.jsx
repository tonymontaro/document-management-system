import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';
import SelectInput from '../common/SelectInput';

const TextInput = ({ accessOptions, getContent, onChange, document }) => {
  return (
    <form onSubmit={this.onSubmit} >

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
      onChange={this.onChange}
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

      <div className="input-field center">
        <button className="waves-effect btn">Create</button>
      </div>

    </form>

  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
};

export default TextInput;
