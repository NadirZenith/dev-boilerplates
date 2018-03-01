import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './Main';
import './index.css';
// ReactDom.render(<Main />, document.getElementById('root'));

const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <Main />
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextApp = require('./Main').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      mountApp,
    );
  });
  // If you use Webpack 2 in ES modules mode, you can
  // use <App /> here rather than require() a <NextApp />.
  // module.hot.accept('./Main', () => {
  //   render(
  //       <AppContainer>
  //         <Main/>
  //       </AppContainer>,
  //       mountApp,
  //   )
  // })
}
