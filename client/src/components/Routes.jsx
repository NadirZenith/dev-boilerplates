/* eslint-disable react/forbid-prop-types,no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import Auth from '../modules/Auth';

const _PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
            Auth.isUserAuthenticated() ? (
              <Component {...props} {...rest} />
            ) : (
              <Redirect to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
        )}
  />
);

_PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};


const _LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
            Auth.isUserAuthenticated() ? (
              <Redirect to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            ) : (
              <Component {...props} {...rest} />
            )
        )}
  />
);

_LoggedOutRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};


const _PropsRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} {...rest} />
        )}
  />
);

_PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const PrivateRoute = withRouter(_PrivateRoute);
const LoggedOutRoute = withRouter(_LoggedOutRoute);
const PropsRoute = withRouter(_PropsRoute);

export {
  PrivateRoute, LoggedOutRoute, PropsRoute,
};
