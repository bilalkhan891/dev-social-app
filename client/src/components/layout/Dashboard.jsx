import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProfile, getCurrentProfile } from "../../actions/profile";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Alert from "./Alert";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const handleAccDelete = () => (e) => {
    console.log(e);
    deleteProfile();
  };

  return (
    <div>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <div className="container">
          <Alert />
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">Welcome {user && user.name}</p>
          <div className="">
            {profile === null ? (
              <>
                <p>You have not yet setup a profile, please add some info.</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </>
            ) : (
              <>
                <DashboardActions />
                <Experience />
                <Education />
              </>
            )}
          </div>
          <div className="my-2">
            <button className="btn btn-danger" onClick={handleAccDelete()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProp, {
  getCurrentProfile,
  deleteProfile,
})(Dashboard);
