import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENTS,
  UPDATE_POSTS,
  POST_DELETED,
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
          console.log(payload.removed._id, post._id);
          return post._id === payload.removed._id ? false : true;
        }),
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
        posts: state.posts.map((post) => {
          if (post._id === action.postId) {
            post.comments = payload;
            return post;
          }
          return post;
        }),
        loading: false,
      };
    default:
      return {
        ...state,
        loading: false,
      };
      break;
  }
}
