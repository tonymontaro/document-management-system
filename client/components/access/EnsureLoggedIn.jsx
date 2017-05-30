import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class EnsureLoggedIn extends React.Component {
  componentWillMount() {
    if (!this.props.access.user.username) return this.context.router.push('/');
  }


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
