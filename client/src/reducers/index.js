import { combineReducers } from "redux";

import auth from "./auth";
import iframes from "./iframes";

export default combineReducers({ auth, iframes });
