import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText, Button, TextField } from 'react-md';

const LoginForm = ({
  onSubmit,
  // onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <Card className="md-grid">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          label="Email"
          placeholder="jonh.doe@acme.com"
          id="email"
          name="email"
          errorText={errors.email}
          // onChange={onChange}
          // value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          label="Password"
          type="password"
          id="password"
          name="password"
          // onChange={onChange}
          errorText={errors.password}
          // value={user.password}
        />
      </div>

      <div className="button-line">
        <Button raised type="submit" primary >Log in</Button>
      </div>

      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
