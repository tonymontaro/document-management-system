import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveDocument } from '../../actions/documentActions';
import { validateSaveDocument } from '../../utilities/validator';
import DocumentForm from './DocumentForm';
import { handleError } from '../../utilities/errorHandler';

/**
 * Document form container
 *
 * @class ManageDocument
 * @extends {React.Component}
 */
class ManageDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ errors: {} }, props.document);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  /**
  * Validate and submit the form
  *
  * @param {Object} event
   * @returns {Undefined} nothing
   */
  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validateSaveDocument(this.state);
    if (valid) {
      this.setState({ errors: {} });
      this.props.saveDocument(this.state)
      .then(() => {
        this.context.router.push('/');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ errors });
    }
  }

  /**
  * Control input fields
  *
  * @param {Object} event
  * @returns {Undefined} nothing
  */
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * Get the content of the TinyMCE editor
  *
  * @param {Object} event
  * @returns {Undefined} nothing
  */
  getContent(event) {
    this.setState({ content: event.target.getContent() });
  }

  /**
  * Render the component
  *
  * @returns {Object} jsx component
   */
  render() {
    const accessOptions = [
    { value: 'public', text: 'Public' },
    { value: 'private', text: 'Private' },
    { value: 'role', text: 'Role' }];

    return (
      <DocumentForm
      onChange={this.onChange}
      document={this.state}
      onSubmit={this.onSubmit}
      getContent={this.getContent}
      accessOptions={accessOptions} />
    );
  }
}

ManageDocument.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Filter and map the correct document to props
 *
 * @param {Object} state redux store state
 * @param {Object} ownProps own props
 * @returns {Object} document object
 */
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

  return {
    document: currentDocument
  };
}

ManageDocument.propTypes = {
  document: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired
};

export default connect(mapStateTopProps, { saveDocument })(ManageDocument);
