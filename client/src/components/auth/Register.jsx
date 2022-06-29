import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

function Register({ setAlert, register }) {
  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => (e) => {
    setFormDate((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return setAlert("Passwords did not match!", "danger");
    }
    register({ name, email, password });
  };

  return (
    <div className="">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange()}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
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
        <div className="form-group">
          <input
            onChange={handleChange()}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
