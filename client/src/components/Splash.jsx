import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import Auth from '../modules/Auth';

const Greeting = (props) => {
  if (!props.isLoggedIn) {
    return (<CardText
      style={{ fontSize: '16px', color: 'red' }}
    >
      You are not logged in.
            </CardText>);
  }

  return (<CardText style={{ fontSize: '16px', color: 'green' }}>
    Welcome! You are logged in.
          </CardText>);
};

class Splash extends React.Component {
  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();
  }

  render() {
    return (

      <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
        <Greeting isLoggedIn={Auth.isUserAuthenticated()} />
      </Card>
    );
  }
}

export default Splash;
