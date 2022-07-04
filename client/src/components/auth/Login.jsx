import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../layout/Alert";

function Login({ login, isAuthenticated }) {
  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => (e) => {
    setFormDate((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login to Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange()}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/regiter">Register</Link>
      </p>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, { login })(Login);
