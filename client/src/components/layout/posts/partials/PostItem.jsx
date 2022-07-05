import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { handleLikes } from "../../../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  handleLikes,
}) => {
  const handleDeletePost = () => (e) => {
    console.log(e.target);
  };
  const handleLikesClick = () => (e) => {
    handleLikes(_id);
  };

  return (
    <div className="post bg-white p-1 my-1" key={_id}>
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD-MM-MM-mm-ss">{date}</Moment>
        </p>
        <button onClick={handleLikesClick()} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span> {likes.length}</span>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span className="comment-count"> {comments.length}</span>
        </Link>
        {auth.isAuthenticated && auth.user._id === user ? (
          <button onClick={handleDeletePost()} type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        ) : (
          ""
        )}
        <h2>{auth.user.id}</h2>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLikes })(PostItem);
