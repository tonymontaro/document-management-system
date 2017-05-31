import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/accessActions';
import { validateSignUp } from '../../utilities/validator';
import SignUpForm from './SignUpForm';
import { handleError } from '../../utilities/errorHandler';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({ password: '', confirmPassword: '', errors: {} }, props.profile);
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
        Materialize.toast('Success!', 2000);
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
    return (
      <SignUpForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      userDetails={this.state} />
    );
  }
}

SignUpPage.propTypes = {
  signup: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({
  profile: state.users.userProfile
}), { signup })(SignUpPage);
