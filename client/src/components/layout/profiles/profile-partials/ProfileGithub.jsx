import React from "react";
import PropTypes from "prop-types";
import { getGithubRepos } from "../../../../actions/profile";
import { connect } from "react-redux";

const ProfileGithub = ({ profile, getGithubRepos, repos }) => {
  React.useEffect(() => {
    console.log("useEffect Github:", repos);
    getGithubRepos(profile.profile.githubusername);
  }, []);
  if (profile === null) return <></>;
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.map((repo, index) => (
        <div className="repo bg-white p-1 my-1" key={`id-${repo.id}`}>
          <div>
            <h4>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li key="1" className="badge badge-primary">
                Stars: {repo.stars_count}
              </li>
              <li key="2" className="badge badge-dark">
                Watchers: {repo.watchers_count}
              </li>
              <li key="3" className="badge badge-light">
                Forks: {repo.forks_count}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
