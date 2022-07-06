import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { handleLikes } from "../../../../actions/post";
import { deletePostById } from "../../../../actions/post";

const PostItem = ({ auth, posts, handleLikes, deletePostById }) => {
  const handleDeletePost = (id) => (e) => {
    if (!window.confirm("Are you sure?")) return false;
    deletePostById(id);
  };
  const handleLikesClick = (id) => (e) => {
    handleLikes(id);
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <div className="post bg-white p-1 my-1" key={post._id}>
            <div>
              <a href="profile.html">
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </a>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on <Moment format="DD MMM YY | hh:mm:ss">{post.date}</Moment>
              </p>
              <button
                onClick={handleLikesClick(post._id)}
                type="button"
                className={`btn btn-${
                  post.likes.some((like) => like.user === auth.user._id)
                    ? "primary"
                    : "light"
                }`}
              >
                <i className="fas fa-thumbs-up"></i>
                <span> {post.likes.length}</span>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-primary">
                Discussion <span className="comment-count"> {post.comments.length}</span>
              </Link>
              {auth.isAuthenticated && auth.user._id === post.user ? (
                <button
                  onClick={handleDeletePost(post._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

PostItem.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLikes, deletePostById })(PostItem);
