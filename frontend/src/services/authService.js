import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const signupUser = async (userData) => {
  return await API.post(
    "/auth/signup",
    userData
  );
};

export const loginUser = async (userData) => {
  return await API.post(
    "/auth/login",
    userData
  );
};