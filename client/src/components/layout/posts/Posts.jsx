import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/post";
import Spinner from "../Spinner";
import PostItem from "./partials/PostItem";
import Alert from "../Alert";
import { addNewPost } from "../../../actions/post";

const Posts = ({ getPosts, posts, loading, addNewPost }) => {
  const [postBox, setPostBox] = useState("");
  useEffect(() => {
    getPosts();
  }, []);

  const handleChange = () => (e) => {
    setPostBox((v) => e.target.value);
  };
  const handleSubmit = () => (e) => {
    e.preventDefault();
    addNewPost(postBox);
    setPostBox("");
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Post</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={handleSubmit()}>
          <textarea
            onChange={handleChange()}
            value={postBox}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        <h1>
          Total Likes: {posts.reduce((total, post) => total + post.likes.length, 0)}
        </h1>
        <PostItem />
      </div>
    </div>
  );
};

Posts.porpTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addNewPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.loading,
});

export default connect(mapStateToProps, { getPosts, addNewPost })(Posts);
