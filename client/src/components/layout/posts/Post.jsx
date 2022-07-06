import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deletePostById,
  addNewComment,
  deleteComment,
  getPostById,
} from "../../../actions/post";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Moment } from "react-moment";
import Spinner from "../Spinner";

const Post = ({
  auth,
  addNewComment,
  deletePostById,
  deleteComment,
  getPostById,
  post,
  loading,
  state,
}) => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const [postBox, setPostBox] = useState("");
  useEffect(() => {
    getPostById(postId);
  }, []);

  const handleDeletePost = (id) => async (e) => {
    if (!window.confirm("Are you sure?")) return false;
    await deletePostById(id);
    navigate("/posts");
  };

  const handleDeleteComment = (postId, commentId) => (e) => {
    deleteComment(postId, commentId);
  };

  const handleChange = () => (e) => {
    setPostBox(e.target.value);
  };
  const handleSubmit = () => (e) => {
    e.preventDefault();
    addNewComment(postBox, postId);
    setPostBox("");
  };
  return post == null ? (
    <Spinner />
  ) : (
    <div className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1" key={post?._id}>
        <div>
          <Link to="/profile">
            <img className="round-img" src={post?.avatar} alt="" />
            <h4>{post?.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post?.text}</p>
          <p className="post-date">Posted on {post?.date}</p>
          {auth.isAuthenticated && auth.user._id === post?.user ? (
            <button
              onClick={handleDeletePost(post?._id)}
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

      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={handleSubmit()}>
          <textarea
            onChange={handleChange()}
            value={postBox}
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div class="comments">
        {post?.comments.map((comment) => (
          <div class="post bg-white p-1 my-1" key={comment._id}>
            <div>
              <a href="profile.html">
                <img class="round-img" src={comment.avatar} alt="" />
                <h4>{comment.user}</h4>
              </a>
            </div>
            <div>
              <p class="my-1">{comment.text}</p>
              <p class="post-date">Posted on {comment.date}</p>
            </div>
            {auth.isAuthenticated && auth.user._id === comment?.user ? (
              <button
                onClick={handleDeleteComment(post?._id, comment?._id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  deletePostById: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
  auth: state.auth,
  state,
});

export default connect(mapStateToProps, {
  deletePostById,
  deleteComment,
  addNewComment,
  getPostById,
})(Post);
