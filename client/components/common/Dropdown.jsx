import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Dropdown = ({ logout, getProfile }) =>
  <div>
    <ul id="profile-dropdown" className="dropdown-content">
      <li><a href="#!" onClick={getProfile} ><i className="fa fa-user" />Profile</a></li>
      <li className="divider"></li>
      <li><a href="#!" onClick={logout} ><i className="fa fa-sign-out" />Logout</a></li>
    </ul>

    <ul id="documents-dropdown" className="dropdown-content">
      <li><Link to="/document/new"><i className="fa fa-plus-circle" />New Document</Link></li>
      <li className="divider"></li>
      <li><a href="#!"><i className="fa fa-folder-open" />View Documents</a></li>
      <li><a href="#!"><i className="fa fa-book" />My Documents</a></li>
      <li><a href="#!"><i className="fa fa-users" />Role Documents</a></li>
    </ul>
  </div>;


export default Dropdown;
