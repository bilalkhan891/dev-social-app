import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfileById } from "../../../actions/profile";
import Alert from "../Alert";
import ProfileTop from "./profile-partials/ProfileTop";
import ProfileAbout from "./profile-partials/ProfileAbout";
import ProfileEducation from "./profile-partials/ProfileEducation";
import ProfileExperience from "./profile-partials/ProfileExperience";
import ProfileGithub from "./profile-partials/ProfileGithub";

const Profile = ({ loading, auth, profile }) => {
  const id = useParams().id;
  React.useEffect(() => {
    console.log(id);
    getProfileById(id);
  }, [id]);
  return (
    <>
      <Alert />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && (
            <Link to="/edit-profile" className="btn btn-warning">
              Edit Profile
            </Link>
          )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
            <ProfileGithub profile={profile} />
          </div>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.loading,
  state: state,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
