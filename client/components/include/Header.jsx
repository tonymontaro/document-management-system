import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import truncate from 'html-truncate';
import { logout } from '../../actions/accessActions';
import { getProfile } from '../../actions/userActions';
import { getDocuments, getUserDocuments } from '../../actions/documentActions';
import Navbar from './Navbar';
import { handleError } from '../../utilities/errorHandler';

/**
* Header
*
* @class Header
* @extends {React.Component}
*/
export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.getDocuments = this.getDocuments.bind(this);
    this.getUserDocuments = this.getUserDocuments.bind(this);
  }

  /**
  * Retrieves the user's profile and redirects to the profile page
  *
  * @returns {Void} returns nothing
  */
  getProfile() {
    if (this.props.access.loggedIn) {
      this.props.getProfile(this.props.access.user.id)
        .then(() => {
          this.context.router.push('/profile');
        })
        .catch(error => handleError(error));
    }
  }

  /**
  * Logs the user out
  *
  * @returns {Void} returns nothing
  */
  logout() {
    this.props.logout();
    this.context.router.push('/');
  }

  /**
  * Retrieves recent documents and redirects to the home page
  *
  * @returns {Void} returns nothing
  */
  getDocuments() {
    this.props.getDocuments()
      .then(() => {
        this.context.router.push('/');
      });
  }

  /**
  * Retrieves a user's documents and redirects to the myDocuments page
  *
  * @returns {Void} returns nothing
  */
  getUserDocuments() {
    this.props.getUserDocuments(this.props.access.user.id)
      .then(() => this.context.router.push('/mydocuments'))
      .catch(error => handleError(error));
  }

  /**
  * Render the component
  *
  * @returns {Object} jsx component
   */
  render() {
    const { access } = this.props;
    let accessClass;
    let username;
    if (access.loggedIn) {
      accessClass = 'regularUser';
      username = truncate(access.user.username, 30);
      if (access.user.roleId === 1) {
        accessClass = 'administrator';
      }
    } else {
      accessClass = 'guest';
    }

    return (
      <Navbar
        username={username}
        logout={this.logout}
        accessClass={accessClass}
        getDocuments={this.getDocuments}
        getProfile={this.getProfile}
        getUserDocuments={this.getUserDocuments} />
    );
  }
}

Header.propTypes = {
  access: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getUserDocuments: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired
};

Header.contextTypes = {
  router: PropTypes.object
};

export default connect(state => ({ access: state.access }),
  { logout, getProfile, getDocuments, getUserDocuments })(Header);

