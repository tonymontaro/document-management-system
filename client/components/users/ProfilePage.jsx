import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
  render() {
    const { profile, access } = this.props;
    return (
      <div className="form-div">
        <div className="container">
          <h3 className="center">{profile.fullName}</h3>

          <div className="row">
            <div className="col s12">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">About</span>
                  <p>{profile.about}</p>
                </div>
              </div>
            </div>
          </div>

          {(access.user.id === profile.id) && <div className="input-field center">
            <button className="waves-effect btn">Edit</button>
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
