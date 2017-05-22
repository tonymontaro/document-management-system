import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import { getDocument } from '../../actions/documentActions';

class DocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentWillMount() {
    this.props.getDocument(this.props.params.id)
      .catch((error) => {
        if (error.response) {
          Materialize.toast(error.response.data.message, 2000);
        }
        this.context.router.push('/');
      });
  }

  render() {
    const { document } = this.props;

    return (
      <div className="document-div">
        <div className="document container">
          <h3>{document.title}</h3>
          <p className="meta-info">posted on: {new Date(document.createdAt).toDateString()},
            by: <span className="teal-text">{document.author}</span></p>
          <div>{document.content && renderHTML(document.content)}</div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  getDocument: PropTypes.func.isRequired,
  params: PropTypes.object
};

DocumentPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(state => ({ document: state.document }), { getDocument })(DocumentPage);
