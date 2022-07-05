import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/post";
import Spinner from "../Spinner";
import PostItem from "./partials/PostItem";
import Alert from "../Alert";

const Posts = ({ getPosts, posts, loading }) => {
  const [postBox, setPostBox] = useState("");
  useEffect(() => {
    getPosts();
  }, []);

  const handleChange = () => (e) => {
    setPostBox((v) => e.target.value);
  };
  const handleSubmit = () => (e) => {
    console.log(e.target);
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
        {posts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

Posts.porpTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.loading,
});

export default connect(mapStateToProps, { getPosts })(Posts);
