import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import { login } from '../../actions/accessActions';
import { getDocuments } from '../../actions/documentActions';
import { validateLogin } from '../../utilities/validator';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validateLogin(this.state);
    if (valid) {
      this.setState({ errors: {} });
      this.props.login(this.state)
        .then(() => {
          this.props.getDocuments()
            .then(() => {
              this.context.router.push('/');
            });
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
    return (
      <div className="form-div">
        <div className="container">
         <h3 className="center">Login</h3>

          <form onSubmit={this.onSubmit} >

            <TextInput
              name="username"
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              error={this.state.errors.username}
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

            <div className="input-field center">
              <button className="waves-effect btn">Log In</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login, getDocuments })(LoginPage);
