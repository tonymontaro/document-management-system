import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import truncate from 'html-truncate';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/accessActions';
import { getProfile } from '../../actions/userActions';
import Dropdown from './Dropdown';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
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
      <header className={`navbar-fixed ${accessClass}`}>
        <nav>
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo hide-on-med-and-down">DMS</Link>

            <ul className="right">
              <li><a href="#!">About</a></li>
              <span className="notLoggedIn">
                <li><Link to="login">Login</Link></li>
                <li><Link to="signup">SignUp</Link></li>
              </span>
              <span className="forAdmin">
                <li><a href="#!">Users</a></li>
                <li><a href="#!" onClick={() => { Materialize.toast('I am a tretoast!', 4000); }}>Roles</a></li>
              </span>
              <span className="loggedIn">
                <li><a className="dropdown-button" href="#!" data-activates="documents-dropdown">
                  Documents<i className="material-icons right">arrow_drop_down</i>
                </a></li>
                <li><a className="dropdown-button" href="#!" data-activates="profile-dropdown">
                  {username}<i className="material-icons left">person_pin</i>
                </a></li>
              </span>
            </ul>
          </div>
        </nav>
        <Dropdown logout={this.logout} getProfile={this.getProfile} />
      </header>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.access }), { logout, getProfile })(Header);

