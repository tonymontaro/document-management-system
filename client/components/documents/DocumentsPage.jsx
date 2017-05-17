import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentCard from './DocumentCard';

class DocumentsPage extends React.Component {
  render() {
    const { documents } = this.props;
    return (
      <div className="documents-div">

        <div className="container documents">
          <h3 className="recent-documents">Recently Added Documents</h3>
          <div className="row">

            {documents.map((document, index) =>
              <DocumentCard key={document.id} document={document} />
            )}

          </div>
        </div>
      </div>
    );
  }
}

function mapS(state, ownProps) {
  return {
    documents: state.documents,
    access: state.access
  };
}

export default connect(mapS)(DocumentsPage);
