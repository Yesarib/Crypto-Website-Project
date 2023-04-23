import axios from "axios";

const LOGIN_URL = "http://localhost:5258/api/User/login";
const RegisterURL = "http://localhost:5258/api/User/register";

const signup = (email, password,name,surname) => {
  return axios
    .post(RegisterURL, {
      email: email,
      password: password,
      name: name,
      surname: surname,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}; 

const login = (email, password) => {
  return axios
    .post(LOGIN_URL, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userToken", JSON.stringify(response.data.token));

      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();

};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;