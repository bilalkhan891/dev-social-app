import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profile";

function Education({ educations, deleteEducation }) {
  const handleDelete = (id) => (e) => {
    deleteEducation(id);
  };
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {educations[0] &&
            educations.map((exp) => (
              <tr key={exp._id} id={`id-${exp._id}`}>
                <td>{exp.school}</td>
                <td className="hide-sm">{exp.degree}</td>
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

Education.propTypes = {
  educations: PropTypes.array,
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  educations: state.profile.profile.education,
});

export default connect(mapStateToProps, { deleteEducation })(Education);
