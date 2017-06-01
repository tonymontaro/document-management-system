import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';

/**
 * Login Form
 *
 * @param {Object} props { onSubmit, onChange, userDetails }
 * @returns {Object} jsx object
 */
const LoginForm = ({ onSubmit, onChange, userDetails }) =>
  <div className="form-div">
    <div className="container">
      <h3 className="center">Login</h3>

      <form onSubmit={onSubmit} >

        <TextInput
          name="username"
          label="Username"
          onChange={onChange}
          value={userDetails.username}
          error={userDetails.errors.username}
        />

        <TextInput
          name="password"
          label="Password"
          onChange={onChange}
          value={userDetails.password}
          type="password"
          icon="unlock-alt"
          error={userDetails.errors.password}
        />

        <div className="input-field center">
          <button className="waves-effect btn">Log In</button>
        </div>

      </form>
    </div>
  </div>;

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default LoginForm;
