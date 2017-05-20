import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/accessActions';
import { validateSignUp } from '../../utilities/validator';
import SignUpForm from './SignUpForm';

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
    return this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const options = [];
    this.props.roles.forEach(role => options.push({ value: role.id, text: role.name }));

    return (
      <SignUpForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      userDetails={this.state}
      options={options} />
    );
  }
}

SignUpPage.propTypes = {
  signup: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ roles: state.roles }), { signup })(SignUpPage);
