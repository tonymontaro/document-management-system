import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import renderHTML from 'react-render-html';

class DocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: Object.assign({}, props.document)
    };
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.document.title) this.context.router.push('/');
  }

  render() {
    const { document } = this.props;

    return (
      <div className="document-div">
        <div className="document container">
          <h3>{document.title}</h3>
          <p className="meta-info">posted on: {new Date(document.createdAt).toDateString()},
            by: <Link to="document/sdfafd">{document.author}</Link></p>
          <div>{document.content && renderHTML(document.content)}</div>
        </div>
      </div>
    );
  }
}

function mapStateTopProps(state, ownProps) {
  let document = {};
  const documentId = ownProps.params.id;
  if (documentId) {
    state.documents.forEach((currentDocument) => {
      if (String(currentDocument.id) === documentId) {
        document = currentDocument;
      }
    });
  }

  return {
    document,
  };
}

DocumentPage.propTypes = {
  document: PropTypes.object.isRequired
};

DocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateTopProps)(DocumentPage);
