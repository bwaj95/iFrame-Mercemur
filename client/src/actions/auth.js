import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

//Action Creators
export const register = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.register(formData);
    const action = { type: AUTH, data }; //{user, token} from MongoDB
    dispatch(action);
    history.push("/iframes");
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    const action = { type: AUTH, data }; //{user, token} from MongoDB
    dispatch(action);
    history.push("/iframes");
  } catch (error) {
    console.log(error);
  }
};
