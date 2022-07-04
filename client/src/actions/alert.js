import {
  SET_ALERT,
  REMOVE_ALERT,
} from "./Types";
import { v4 as uuid } from "uuid";

export const setAlert =
  (msg, alertType) => (dispatch) => {
    console.log("alert action: ", msg)
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      3000
    );
  };
