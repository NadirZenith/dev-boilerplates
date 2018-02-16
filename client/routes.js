/* eslint-disable global-require */
import React from 'react';
import App from './modules/App/App';
// import Hello from './modules/Hello/Hello';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import type {ContextRouter} from 'react-router-dom'
// import SignUp from './modules/SignUp/SignUp'

// require.ensure polyfill for node
// if (typeof require.ensure !== 'function') {
//   require.ensure = function requireModule(deps, callback) {
//     callback(require);
//   };
// }

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
// if (process.env.NODE_ENV !== 'production') {
//    Require async routes only in development for react-hot-reloader to work.
//   require('./modules/Post/pages/PostListPage/PostListPage');
//   require('./modules/Post/pages/PostDetailPage/PostDetailPage');
// }

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
const Routes = (
    <div>
      <Route path="/" component={App} />
      <Switch>
        {/* <Route path="/login" component={LoginPage} /> */}
        {/* <Route path="/register" component={RegisterPage} /> */}
        {/* <Route exact path='/signup' component={SignUp}/> */}
        {/* <Route exact path="/hello" component={Hello} /> */}
        <Route exact path="/hello" render={() => (<h2>hello</h2>)} />
        <Route
          exact
          path="/signup"
          render={() => (
            <h2>SignUp</h2>
                  )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <h2>Login</h2>
                  )}
        />

        <Route component={() => <h1>Page not found, sorry!</h1>} />
      </Switch>
    </div>
  );

export default Routes;
