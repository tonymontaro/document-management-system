import React, { PropTypes } from 'react';
import Header from './include/Header';
import Footer from './include/Footer';

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
