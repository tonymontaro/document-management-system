import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          { this.props.children }
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
