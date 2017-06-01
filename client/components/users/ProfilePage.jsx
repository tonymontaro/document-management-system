import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { deleteUser } from '../../actions/userActions';
import { logout } from '../../actions/accessActions';
import DeleteModal from '../common/DeleteModal';

/**
 * Profile page
 *
 * @class ProfilePage
 * @extends {React.Component}
 */
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.deleteProfile = this.deleteProfile.bind(this);
  }

  /**
  * Delete user profile
  *
   @param {Object} id user id
  * @returns {Undefined} nothing
  */
  deleteProfile(id) {
    this.props.deleteUser(id)
      .then(() => {
        this.props.logout();
        this.context.router.push('/');
        Materialize.toast('Profile deleted', 2000);
      });
  }

  /**
  * Initiates the modal after rendering the component
  *
  * @returns {Undefined} nothing
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * Render the component
  *
  * @returns {Object} jsx component
   */
  render() {
    const { profile, access } = this.props;
    return (
      <div className="form-div">
        <div className="container">
          <h3>Name: {profile.fullName}</h3>
          <h4>username: {profile.username}</h4>

          <div className="row">
            <div className="col s12">
              <div className="card about-card">
                <div className="card-content white-text">
                  <span className="card-title">About</span>
                  <p>{profile.about}</p>
                </div>
              </div>
            </div>
          </div>

          {(access.user.id === profile.id) && <div className="input-field center">
            <Link to="/user/edit" className="waves-effect btn">Edit</Link>
            {access.user.id !== 1 && <a
              href="#deleteModal"
              className="delete-btn btn">Delete</a>}
          </div>}
        </div>

        <DeleteModal
          toBeDeleted={{ id: profile.id, title: `Your profile, ${profile.username}?` }}
          deleteItem={this.deleteProfile} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(state => ({
  profile: state.users.userProfile,
  access: state.access
}), { deleteUser, logout })(ProfilePage);
