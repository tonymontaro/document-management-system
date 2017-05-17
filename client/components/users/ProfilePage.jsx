import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

class ProfilePage extends React.Component {
  render() {
    const { profile, loggedIn } = this.props;
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

          {loggedIn && <div className="input-field center">
            <button className="waves-effect btn">Edit</button>
          </div>}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  profile: state.users.userProfile,
  loggedIn: state.access.loggedIn
}))(ProfilePage);
