import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/accessActions';
import { getDocuments } from '../../actions/documentActions';
import { validateLogin } from '../../utilities/validator';
import LoginForm from './LoginForm';
import { handleError } from '../../utilities/errorHandler';

/**
 * LoginPage container
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Validate and submit the form
   *
   * @param {Object} event
   * @returns {Undefined} nothing
   */
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
        })
        .catch(error => handleError(error));
    } else {
      this.setState({ errors });
    }
  }

  /**
   * Control input fields
   *
   * @param {Object} event
   * @returns {Undefined} nothing
   */
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }


  /**
  * Render the component
  *
  * @returns {Object} jsx component
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        userDetails={this.state} />
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired
};

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login, getDocuments })(LoginPage);
