import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  
  return (
    <div className=" ">
      {isAuthenticated && !loading ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
