import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Higher order components that restricts access for non-admins
 *
 * @class EnsureUserIsAdmin
 * @extends {React.Component}
 */
class EnsureUserIsAdmin extends React.Component {
  /**
   * redirects user if he/she is not an admin
   *
   * @returns {Undefined} nothing
   */
  componentWillMount() {
    if (this.props.access.user.roleId !== 1) return this.context.router.push('/');
  }

  /**
   * Render the component
   *
   * @returns {Object} jsx object
   */
  render() {
    if (this.props.access.user.roleId === 1) {
      return this.props.children;
    }
    return null;
  }
}

EnsureUserIsAdmin.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

EnsureUserIsAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.access }))(EnsureUserIsAdmin);
