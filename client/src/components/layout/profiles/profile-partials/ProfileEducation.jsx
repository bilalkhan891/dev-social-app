import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile }) => {
  if (profile === null) return <></>;
  return (
    <>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education.map((edu) => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format="MMM YYYY">{edu.from}</Moment> -
              {edu.current ? "Present" : <Moment format="MMM YYYY">{edu.to}</Moment>}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.dgree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

ProfileEducation.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileEducation;
