import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile }) => {
  if (profile === null) return <></>;
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>

      {profile.experience.map((exp) => (
        <div>
          <h3 className="text-dark">{exp.company}</h3>
          <p>
            <Moment format="MMM YYYY">{exp.from}</Moment> -
            {exp.current ? "Present" : <Moment format="MMM YYYY">{exp.to}</Moment>}
          </p>
          <p>
            <strong>Position: </strong>
            {exp.title}
          </p>
          <p>
            <strong>Location: </strong>
            {exp.location}
          </p>
          <p>
            <strong>Description: </strong> {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
};

ProfileExperience.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileExperience;
