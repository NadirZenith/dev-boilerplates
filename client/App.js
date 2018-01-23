/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Import Routes
import routes from './routes';

// Base stylesheet
// require('./main.css');

export default function App(props) {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

// App.propTypes = {
//   store: React.PropTypes.object.isRequired,
// };
