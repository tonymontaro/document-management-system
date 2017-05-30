import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class EnsureUserIsAdmin extends React.Component {
  componentWillMount() {
    if (this.props.access.user.roleId !== 1) return this.context.router.push('/');
  }


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
