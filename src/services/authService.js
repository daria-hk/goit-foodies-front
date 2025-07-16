import axios from "./axiosInstance";

export const loginRequest = async (email, password) => {
  const res = await axios.post("/auth/login", { email, password });
  
  return res.data;
};

export const registerRequest = async (username, email, password) => {
  const res = await axios.post("/auth/register", {
    username,
    email,
    password,
  });

  return res.data;
};
