import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
    console.log("req.headers.authorization: ", req.headers.authorization);
  }

  return req;
});

API.interceptors.response.use((res) => {
  res.headers = {
    ...res.headers,
    "x-frame-options": "allow-from https://www.thehindu.com/",
  };

  return res;
});

//AUTH URL
export const register = (formData) => API.post(`/user/register`, formData); //returns { user: others, token }
export const login = (formData) => API.post(`/user/login`, formData); //returns { user: others, token }

//IFRAME URL
export const postFrames = (frameUrl) => API.post(`/iframes`, frameUrl); //returns { url: frame.url, id: frame._id }
export const getFrameById = (frameId) => API.get(`/iframes/${frameId}`); //returns { url: frame.url }
