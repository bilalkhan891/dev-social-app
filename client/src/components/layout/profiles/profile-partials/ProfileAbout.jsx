import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  if (profile === null) return <></>;
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{profile.user.name}'s Bio</h2>
      <p>{profile.bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.map((skill, index) => (
          <div className="p-1" key={`id-${skill}-${index}`}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileAbout;
