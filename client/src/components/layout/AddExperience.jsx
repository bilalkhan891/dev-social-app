import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addExperience, getCurrentProfile } from "../../actions/profile";
import { useNavigate } from "react-router-dom";

function AddExperience({ addExperience }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const navigation = useNavigate();

  const { title, company, location, from, current, to, description } = formData;

  const handleChange = () => (e) => {
    setFormData((fd) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "current") {
      setFormData((fd) => ({
        ...formData,
        current: e.target.checked,
      }));
    }
  };

  const handleSubmit = () => (e) => {
    e.preventDefault();
    addExperience(formData, navigation);
    getCurrentProfile();
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming positions
        that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit()}>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={title}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={company}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={location}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input onChange={handleChange()} value={from} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={handleChange()}
              value={current}
              type="checkbox"
              name="current"
            />{" "}
            Current Job
          </p>
        </div>
        {!current && (
          <div className="form-group">
            <h4>To Date</h4>
            <input onChange={handleChange()} value={to} type="date" name="to" />
          </div>
        )}
        <div className="form-group">
          <textarea
            onChange={handleChange()}
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </div>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience, useNavigate })(AddExperience);
