import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import truncate from 'html-truncate';
import renderHTML from 'react-render-html';

const DocumentList = ({ document }) =>
  <div className="col s12 m4">
    <div className="card">
      <a href="#" className="btn-floating waves-effect waves-light edit-btn">
        <i className="material-icons">edit</i>
      </a>
      <a href="#" className="btn-floating waves-effect waves-light delete-btn">
        <i className="material-icons">delete</i>
      </a>
      <Link to={`document/${document.id}`}>
        <div className="card-content white-text">
          <span className="card-title">{truncate(document.title, 50)}</span>
          <hr />
          {/*<p>{truncate(document.content, 150)}</p>*/}
           <div>{renderHTML(truncate(document.content, 150))}</div>
        </div>
      </Link>
    </div>
  </div>;

export default DocumentList;
