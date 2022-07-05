import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfiles } from "../../../actions/profile";
import Alert from "../Alert";
import ProfileItem from "./ProfileItem";

function Profiles({ getProfiles, profiles, loading, state }) {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className="container">
      <Alert />
      <h1>Profiles</h1>
      <div className="profiles">
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          profiles?.length > 0 &&
          profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
        )}
      </div>
    </div>
  );
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.loading,
  state: state,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
