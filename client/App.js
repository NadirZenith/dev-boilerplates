/**
 * Root Component
 */
import React from 'react';
// import { Router, browserHistory } from 'react-router';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
// import App from './modules/App/App';
// Import Routes
import routes from './routes';

// Base stylesheet
// require('./main.css');

export default function App(props) {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>

  //   <BrowserRouter>
  //   <div>
  //     <Route render={(props : ContextRouter) => (<App/>)}/>
  //     <Switch>
  //       <Route component={() => <h1>Page not found, sorry!</h1>}/>
  //     </Switch>
  //   </div>
  // </BrowserRouter>
)
  // <div>
  // </div>);
}

// App.propTypes = {
//   store: React.PropTypes.object.isRequired,
// };
