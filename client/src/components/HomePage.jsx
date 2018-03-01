import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import Auth from '../modules/Auth';

const Greeting = (props) => {
  const data = (!props.isLoggedIn)
    ? { message: 'You are not logged in.', color: 'red' }
    : { message: 'Welcome! You are logged in.', color: 'green' };

  return (
    <CardText style={{ fontSize: '16px', color: data.color }}>
      {data.message}
    </CardText>);
};

class HomePage extends React.Component {
  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
      <Card className="container">
        <CardTitle title="Dev Boilerplates" subtitle="This is the home page." />
        <Greeting isLoggedIn={Auth.isUserAuthenticated()} />
      </Card>
    );
  }
}

export default HomePage;
