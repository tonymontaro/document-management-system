import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfilePage extends React.Component {
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
          </div>}
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired
};

export default connect(state => ({
  profile: state.users.userProfile,
  access: state.access
}))(ProfilePage);
