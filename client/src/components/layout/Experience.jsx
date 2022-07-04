import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profile";

function Experience({ experiences, deleteExperience }) {
  const handleDelete = (_id) => (e) => {
    deleteExperience(_id);
  };
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences[0] &&
            experiences.map((exp) => (
              <tr key={exp._id} id={`id-${exp._id}`}>
                <td>{exp.title}</td>
                <td className="hide-sm">{exp.company}</td>
                <td className="hide-sm">
                  <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{" "}
                  {exp.current === true ? (
                    "Present"
                  ) : (
                    <Moment format="MM/DD/YYYY">{exp.to}</Moment>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={handleDelete(exp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  experiences: state.profile.profile.experience,
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
