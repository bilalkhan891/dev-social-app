import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  PROFILE_CLEAR,
  ACCOUNT_DELETED,
  GET_REPOS,
  GET_PROFILES,
} from "./Types";
import { setAlert } from "./alert";

// Get Current Profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile/me");
    console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.state },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
    console.log("res: ", res);
  } catch (err) {
    console.log("err: ", err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.state },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.state },
    });
  }
};

// Get Github Repos by ID
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.state },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile Updated!" : "Profile Created!"));
      if (!edit) {
        history("/dashboard");
        console.log("createProfile reducer: ", history());
      }
    } catch (err) {
      console.log(err);
      const errors = await err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err?.response?.statusText, status: err?.response?.state },
      });
    }
  };

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const config = { "Content-Type": "application/json" };
    const res = await axios.put("api/profile/experience", formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });

    dispatch(setAlert("Experience Added", "info"));
    history("/dashboard");
  } catch (err) {
    const errors = await err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const config = { "Content-Type": "application/json" };
    const res = await axios.put("api/profile/education", formData, config);
    console.log(res.data);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert("Education Added", "info"));

    history("/dashboard");
  } catch (err) {
    const errors = await err.response?.data?.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("api/profile/experience/" + id);

    console.log(res);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
  } catch (err) {
    const errors = await err.response?.data?.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("api/profile/education/" + id);

    console.log(res);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
  } catch (err) {
    const errors = await err.response?.data?.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const deleteProfile = (id) => async (dispatch) => {
  if (!window.confirm("Are you sure you want to delete this profile?")) return false;
  try {
    const res = await axios.delete("api/profile/");

    console.log(res);

    dispatch({ type: PROFILE_CLEAR, payload: res.data.profile });
    dispatch({ type: ACCOUNT_DELETED, payload: res.data.profile });
  } catch (err) {
    const errors = await err.response?.data?.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
