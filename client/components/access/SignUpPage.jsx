import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { signup } from '../../actions/accessActions';
import { validateSignUp } from '../../utilities/validator';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', about: '', fullName: '', email: '', roleId: 'null', errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validateSignUp(this.state);
    if (valid) {
      this.setState({ errors: {} });
      this.props.signup(this.state)
      .then(() => {
        this.context.router.push('/');
      });
    } else {
      this.setState({ errors });
    }
  }
  onChange(event) {
    const field = event.target.name;
    const userDetails = this.state;
    userDetails[field] = event.target.value;
    return this.setState(userDetails);
  }

  render() {
    const options = [
      { value: '2', text: 'Regular' },
      { value: '3 ', text: 'Editor' }];

    return (
      <div className="form-div">
        <div className="container">
          <h3 className="center">Sign Up</h3>

          <form onSubmit={this.onSubmit}>

            <TextInput
              name="fullName"
              label="Full Name"
              onChange={this.onChange}
              value={this.state.fullName}
              error={this.state.errors.fullName}
            />

            <TextInput
              name="email"
              label="Email"
              onChange={this.onChange}
              value={this.state.email}
              error={this.state.errors.email}
              type="email"
              icon="envelope"
            />

            <TextInput
              name="username"
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              error={this.state.errors.username}
              icon="user-secret"
            />

            <TextInput
              name="password"
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              icon="unlock-alt"
              error={this.state.errors.password}
            />

            <SelectInput
            value={this.state.roleId}
            name="roleId"
            label="Choose Role"
            onChange={this.onChange}
            error={this.state.errors.roleId}
            options={options}
            icon="user-plus" />

            <div className="input-field">
              <i className="fa fa-comments-o prefix" />
              <textarea
                name="about"
                id="textarea1"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.about} />
              <label htmlFor="textarea1">About</label>
              {this.state.errors.about && <div className="card-panel error white-text">
                {this.state.errors.about}
              </div>}
            </div>

            <div className="input-field center">
              <button className="waves-effect btn">Sign Up</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { signup })(SignUpPage);
