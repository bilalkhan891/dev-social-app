import React from "react";
import PropTypes from "prop-types";
import { getGithubRepos } from "../../../../actions/profile";
import { connect } from "mongoose";

const ProfileGithub = ({ profile, getGithubRepos }) => {
  React.useEffect(() => {
    console.log("useEffect Github:");
    // getGithubRepos(profile.githubusername);
  }, [getGithubRepos, profile.githubusername]);
  if (profile !== null) return <></>;
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {profile.repos.map((repo, index) => (
        <div className="repo bg-white p-1 my-1" key={`id-${index}`}>
          <div>
            <h4>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                Repo One
              </a>
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!
            </p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: 44</li>
              <li className="badge badge-dark">Watchers: 21</li>
              <li className="badge badge-light">Forks: 25</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = { profile: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
