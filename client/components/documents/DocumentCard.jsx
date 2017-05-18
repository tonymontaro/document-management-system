import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import truncate from 'html-truncate';
import renderHTML from 'react-render-html';

const DocumentList = ({ document, user }) =>
  <div className="col s12 m4">
    <div className="card">

      {(user.id === document.authorId || user.roleId === 1) &&
      <span>
        <Link to={`document/${document.id}`} className="btn-floating waves-effect waves-light edit-btn">
          <i className="material-icons">edit</i>
        </Link>
        <a href="#" className="btn-floating waves-effect waves-light delete-btn">
          <i className="material-icons">delete</i>
        </a>
      </span>}

      <Link to={`/${document.id}`} className="view-document">
        <div className="card-content white-text">
          <span className="card-title">{truncate(document.title, 50)}</span>
          <hr />
           <div>{renderHTML(truncate(document.content, 150))}</div>
        </div>
      </Link>
    </div>
  </div>;

export default DocumentList;
