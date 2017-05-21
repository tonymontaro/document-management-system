import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/accessActions';
import { validateSignUp } from '../../utilities/validator';
import SignUpForm from './SignUpForm';
import { handleError } from '../../utilities/errorHandler';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({ password: '', errors: {} }, props.profile);
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
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ errors });
    }
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const roleOptions = [];
    this.props.roles.forEach((role) => {
      if (role.id !== 1 || this.state.roleId === 1) {
        roleOptions.push({ value: role.id, text: role.name });
      }
    });

    return (
      <SignUpForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      userDetails={this.state}
      options={roleOptions} />
    );
  }
}

SignUpPage.propTypes = {
  signup: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired
};

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({
  roles: state.roles,
  profile: state.users.userProfile
}), { signup })(SignUpPage);
