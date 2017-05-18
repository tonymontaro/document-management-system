import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import TinyMCE from 'react-tinymce';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { login } from '../../actions/accessActions';
import { saveDocument, getDocuments } from '../../actions/documentActions';
import { validateSaveDocument } from '../../utilities/validator';

class NewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ errors: {} }, props.document);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validateSaveDocument(this.state);
    if (valid) {
      this.setState({ errors: {} });
      this.props.saveDocument(this.state)
      .then(() => {
        this.context.router.push('/');
      });
    } else {
      this.setState({ errors });
    }
  }
  onChange(event) {
    const field = event.target.name;
    const state = this.state;
    state[field] = event.target.value;
    this.setState(state);
  }
  getContent(event) {
    this.setState({ content: event.target.getContent() });
  }

  render() {
    const options = [
    { value: 'public', text: 'Public' },
    { value: 'private', text: 'Private' },
    { value: 'role', text: 'Role' }];

    return (
      <div className="form-div new-document">
        <div className="container">
          <h3 className="center">New Document</h3>

          <form onSubmit={this.onSubmit} >

            <TextInput
              name="title"
              label="Title"
              onChange={this.onChange}
              value={this.state.title}
              error={this.state.errors.title}
              icon="book" />

            <SelectInput
            value={this.state.access}
            name="access"
            label="Select document access"
            onChange={this.onChange}
            error={this.state.errors.access}
            options={options}
            icon="user-plus" />

            <TinyMCE
              content={this.state.content}
              config={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
              }}
              onChange={this.getContent}
            />
            {this.state.errors.content &&
              <div className="card-panel error white-text">{this.state.errors.content}</div>}

            <div className="input-field center">
              <button className="waves-effect btn">Save</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

NewDocument.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateTopProps(state, ownProps) {
  let currentDocument = { title: '', content: '', access: 'null' };
  const documentId = ownProps.params.id;
  if (documentId) {
    state.documents.forEach((document) => {
      if (Number(documentId) === document.id) {
        currentDocument = {
          title: document.title,
          content: document.content,
          access: document.access,
          updateId: document.id
        };
      }
    });
  }

  // const formatedAuthors = state.authors.map(author => ({
  //   value: author.id,
  //   text: `${author.firstName} ${author.lastName}`
  // }));
  return {
    document: currentDocument,
    // authors: formatedAuthors,
  };
}

export default connect(mapStateTopProps, { saveDocument, getDocuments })(NewDocument);
