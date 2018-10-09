import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './include/Header';
import Footer from './include/Footer';
import Spinner from './common/Spinner';

/**
 * Top level application wrapper
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          {(this.props.loading > 0) && <Spinner />}
          { this.props.children }
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.number.isRequired,
};

export default connect(state => ({
  loading: state.ajaxCallsInProgress
}))(App);
