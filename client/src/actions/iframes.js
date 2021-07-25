import * as api from "../api/index";
import { POST, FETCH_BY_ID } from "../constants/actionTypes";

export const postFrames = (url) => async (dispatch) => {
  try {
    const { data } = await api.postFrames(url);
    console.log("Post Frames Data: ", data);
    const action = { type: POST, data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getFrameById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFrameById(id);
    data.id = id;
    const action = { type: FETCH_BY_ID, data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
