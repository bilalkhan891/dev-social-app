import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "./Alert";

function EditProfile({
  state,
  profile: { profile, profiles, loading },
  createProfile,
  history,
}) {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(true);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  history = useNavigate();
  React.useEffect(() => {
    getCurrentProfile();
    console.log(profile);
    console.log(profiles);
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills,
      githubusername: loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social.twitter ? "" : profile.social.twitter,
      facebook: loading || !profile.social.facebook ? "" : profile.social.facebook,
      linkedin: loading || !profile.social.linkedin ? "" : profile.social.linkedin,
      youtube: loading || !profile.social.youtube ? "" : profile.social.youtube,
      instagram: loading || !profile.social.instagram ? "" : profile.social.instagram,
    });
  }, [loading]);

  const onStatusChange = (e) => {
    console.log(state);
    setFormData((fd) => ({
      ...fd,
      status: e.target.value,
    }));
  };

  const handleFormSubmit = () => (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
    <Navigate to="/dashboard" />;
  };

  const handleInputChange = () => (e) => {
    setFormData((fd) => ({
      ...fd,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your profile
        stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleFormSubmit()}>
        <div className="form-group">
          <select value={status} onChange={(e) => onStatusChange(e)} name="status">
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={handleInputChange()}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={handleInputChange()}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={handleInputChange()}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input
            value={skills}
            onChange={handleInputChange()}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={handleInputChange()}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={handleInputChange()}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                value={twitter}
                onChange={handleInputChange()}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                value={facebook}
                onChange={handleInputChange()}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                value={youtube}
                onChange={handleInputChange()}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                value={linkedin}
                onChange={handleInputChange()}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                value={instagram}
                onChange={handleInputChange()}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
}

EditProfile.propType = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  state: state,
  profile: state.profile,
});

export default connect(mapStateToProp, {
  createProfile,
  getCurrentProfile,
})(EditProfile);
