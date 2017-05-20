import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import truncate from 'html-truncate';
import { logout } from '../../actions/accessActions';
import { getProfile } from '../../actions/userActions';
import { getDocuments } from '../../actions/documentActions';
import Navbar from './Navbar';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.getDocuments = this.getDocuments.bind(this);
  }

  getProfile() {
    if (this.props.access.loggedIn) {
      this.props.getProfile(this.props.access.user.id)
        .then(() => {
          this.context.router.push('/profile');
        });
    }
  }

  logout() {
    this.props.logout();
    this.context.router.push('/');
  }

  getDocuments() {
    this.props.getDocuments()
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { access } = this.props;
    let accessClass;
    let username;
    if (access.loggedIn) {
      accessClass = 'regularUser';
      username = truncate(access.user.username, 20);
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
        getProfile={this.getProfile} />
    );
  }
}

Header.propTypes = {
  access: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.access }),
  { logout, getProfile, getDocuments })(Header);

