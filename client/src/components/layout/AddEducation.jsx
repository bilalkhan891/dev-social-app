import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addEducation, getCurrentProfile } from "../../actions/profile";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function AddEducation({ addEducation }) {
  const [formData, setFormData] = useState({
    title: "",
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const navigation = useNavigate();

  const { title, school, degree, fieldofstudy, from, current, to, description } =
    formData;

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
    addEducation(formData, navigation);
    getCurrentProfile();
  };

  return (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that you have
        attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit()}>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={title}
            type="text"
            placeholder="* Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={school}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange()}
            value={degree}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange()}
            value={fieldofstudy}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
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
            placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation, useNavigate })(AddEducation);
