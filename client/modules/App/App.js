import React, { Component, PropTypes } from 'react';

// Import Style
// import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
// import DevTools from './components/DevTools';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  // clickAlert = () => {
  //   this.props.dispatch(toggleAddPost());
  // };

  render() {
    return (
      <div>
        {/* {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />} */}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          {/* <Header
            onClickAlert={this.clickAlert}
          /> */}
          <div className="styles.container">
            {/* {this.props.children} */}
            xau pa
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };


export default App;
