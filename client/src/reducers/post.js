import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  UPDATE_POSTS,
  POST_DELETED,
  POST_UPDATE,
  POST_LOADING,
  DELETE_COMMENT,
} from "../actions/Types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case UPDATE_POSTS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case POST_UPDATE:
      console.log("POST_UPDATE");
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id === payload.removed._id ? false : true;
        }),
        post: state.post?._id === payload.removed._id ? null : state.post,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.postId) {
            post.likes = payload;
            return post;
          }
          return post;
        }),
        loading: false,
      };
    case UPDATE_COMMENTS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    default:
      return {
        ...state,
        loading: false,
      };
  }
}
