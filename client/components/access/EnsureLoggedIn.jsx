import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Higher order component that restricts access to guests
 *
 * @class EnsureLoggedIn
 * @extends {React.Component}
 */
class EnsureLoggedIn extends React.Component {
  /**
   * redirects user if he/she is not logged in
   *
   * @returns {Undefined} nothing
   */
  componentWillMount() {
    if (!this.props.access.user.username) return this.context.router.push('/');
  }


  /**
   * Render the component
   *
   * @returns {Object|Null} jsx component
   */
  render() {
    if (this.props.access.user.username) {
      return this.props.children;
    }
    return null;
  }
}

EnsureLoggedIn.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

EnsureLoggedIn.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.access }))(EnsureLoggedIn);
