import React, { Component } from 'react';
// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import {
  FontIcon,
  Button,
  CardActions,
} from 'react-md';

// import Base from './components/Base.jsx';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import LogoutFunction from './containers/LogoutFunction';
import SignUpPage from './containers/SignUpPage';
import DashboardPage from './containers/DashboardPage';
import Auth from './modules/Auth';
import { PropsRoute, PrivateRoute, LoggedOutRoute } from './components/Routes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="top-bar">
            <CardActions className="md-cell md-cell--12">
              <Link to="/" className="md-cell--right">
                <Button raised>Home</Button>
              </Link>
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/logout">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link to="/login" className="md-cell--right">
                    <Button raised secondary>Login</Button>
                  </Link>
                  <Link to="/signup" className="md-cell--right">
                    <Button raised primary>Register</Button>
                  </Link>
                </div>
              )}
            </CardActions>
            <FontIcon>bookmark</FontIcon>
          </div>

          <PropsRoute
            exact
            path="/"
            component={HomePage}
            toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
          />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <LoggedOutRoute
            path="/login"
            component={LoginPage}
            toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
          />
          <LoggedOutRoute path="/signup" component={SignUpPage} />
          <Route path="/logout" component={LogoutFunction} />

        </div>
      </Router>
    );
  }
}

export default Main;
