import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/Types";

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
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.post.posts.map((post) =>
          post._id === action.postId ? (post.likes = payload) : post
        ),
      };
    default:
      return {
        ...state,
      };
      break;
  }
}
