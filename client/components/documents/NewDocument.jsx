import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import TinyMCE from 'react-tinymce';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { login } from '../../actions/accessActions';
import { createDocument, getDocuments } from '../../actions/documentActions';
import { validateLogin } from '../../utilities/validator';

class NewDocument extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', content: '', access: 'null', errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // const { valid, errors } = validateLogin(this.state);
    // if (valid) {
    //   this.setState({ errors: {} });
    //   this.props.login(this.state)
    //     .then(() => {
    //       this.props.createDocument()
    //         .then(() => {
    //           this.context.router.push('/');
    //         });
    //     });
    // } else {
    //   this.setState({ errors });
    // }
    this.props.createDocument(this.state)
      .then(() => {
        this.props.getDocuments()
          .then(() => {
            this.context.router.push('/');
          });
      });
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

  // componentDidMount() {
  //   console.log('mounted');
  //   CKEDITOR.replace( 'contentField' );
  // }

  render() {
    const options = [
    { value: 'public', text: 'Public' },
    { value: 'private', text: 'private' },
    { value: 'role ', text: 'role' }];

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

            <div className="input-field center">
              <button className="waves-effect btn">Create</button>
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

export default connect(null, { createDocument, getDocuments })(NewDocument);
