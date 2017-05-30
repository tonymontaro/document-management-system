import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import truncate from 'html-truncate';
import renderHTML from 'react-render-html';

const DocumentList = ({ document, user, deleteDocument }) =>
  <div className="col s12 m4">
    <div className="card">
      <div className="document-access">{document.access}</div>

      {(user.id === document.authorId) &&
      <span>
        <Link
          to={`document/${document.id}`}
          className="btn-floating waves-effect waves-light edit-btn">
          <i className="material-icons">edit</i>
        </Link>
        <button
          onClick={() => {
            if (confirm(`Delete: ${document.title}?`)) deleteDocument(document.id);
          }}
          className="btn-floating waves-effect waves-light delete-btn">
          <i className="material-icons">delete</i>
        </button>
      </span>}

      <Link to={`/${document.id}`} className="view-document">
        <div className="card-content">
          <span className="card-title">{truncate(document.title, 50)}</span>
          <hr />
          <div>{renderHTML(truncate(document.content, 150))}</div>
        </div>
      </Link>
    </div>
  </div>;

DocumentList.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default DocumentList;
