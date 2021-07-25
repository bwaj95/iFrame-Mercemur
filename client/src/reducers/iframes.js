import { POST, FETCH_BY_ID } from "../constants/actionTypes";

const iframes = (state = { frameData: null }, action) => {
  //frameData -> {url, id}
  switch (action.type) {
    case FETCH_BY_ID:
      return { ...state, url: action.data.url, id: action.data.id };

    case POST:
      return { ...state, url: action.data.url, id: action.data.id };

    default:
      return state;
  }
};

export default iframes;
