import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const SignUpForm = ({ onSubmit, onChange, userDetails, options }) =>
  <div className="form-div">
    <div className="container">
      <h3 className="center">Sign Up</h3>

      <form onSubmit={onSubmit}>

        <TextInput
          name="fullName"
          label="Full Name"
          onChange={onChange}
          value={userDetails.fullName}
          error={userDetails.errors.fullName}
        />

        <TextInput
          name="email"
          label="Email"
          onChange={onChange}
          value={userDetails.email}
          error={userDetails.errors.email}
          type="email"
          icon="envelope"
        />

        <TextInput
          name="username"
          label="Username"
          onChange={onChange}
          value={userDetails.username}
          error={userDetails.errors.username}
          icon="user-secret"
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

        <SelectInput
          value={userDetails.roleId}
          name="roleId"
          label="Choose Role"
          onChange={onChange}
          error={userDetails.errors.roleId}
          options={options}
          icon="user-plus" />

        <div className="input-field">
          <i className="fa fa-comments-o prefix" />
          <textarea
            name="about"
            id="textarea1"
            className="materialize-textarea"
            onChange={onChange}
            value={userDetails.about}
            placeholder="About" />
        </div>

        <div className="input-field center">
          <button className="waves-effect btn">Save</button>
        </div>

      </form>
    </div>
  </div>;

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userDetails: PropTypes.object,
  options: PropTypes.array,
};

export default SignUpForm;
