import axios from "axios";
import Alert from "../components/layout/Alert";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_POSTS,
  POST_DELETED,
  POST_UPDATE,
  UPDATE_COMMENTS,
  DELETE_COMMENT,
} from "./Types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err.response.status },
    });
  }
};

// Get Single Post By Id
export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/post/${postId}`);

    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err.response.status },
    });
  }
};

// Delete Single Post By Id
export const deletePostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/post/${postId}`);

    dispatch({
      type: POST_DELETED,
      payload: res.data,
    });
    dispatch(setAlert("Post Deleted!", "info"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status },
    });
  }
};

// Handle Likes
export const handleLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    console.log(res);

    dispatch({
      payload: res.data,
      type: UPDATE_LIKES,
      postId,
    });
  } catch (err) {
    console.log("console Id:", postId);
    console.log("console err:", err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status },
    });
  }
};

// New Post
export const addNewPost = (text) => async (dispatch) => {
  try {
    const config = { "Content-Type": "application/json" };
    const data = {
      text,
    };
    const res = await axios.post("/api/posts/", data, config);

    dispatch({
      type: UPDATE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addNewComment = (text, postId) => async (dispatch) => {
  try {
    const config = {};
    const data = {
      text,
    };
    const res = await axios.post(`/api/posts/comment/${postId}`, data, config);

    console.log(res);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
      postId,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err.response.status },
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    console.log(res.data);

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err?.response?.statusText, status: err.response.status },
    });
  }
};
