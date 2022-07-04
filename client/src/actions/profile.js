import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./Types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
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
        payload: { msg: err.response.statusText, status: err.response.state },
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
  try {
    const res = await axios.delete("api/profile/" + id);

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
