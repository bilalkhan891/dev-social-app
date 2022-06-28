import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
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
    if (password !== password2) return console.log("Passwords did not match!");

    try {
      const newUser = {
        name,
        email,
        password,
      };
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/users", newUser, config);
      console.log(response.data);
    } catch (error) {
      console.log(error.request.response);
    }
  };

  return (
    <div className="container">
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

export default Register;
