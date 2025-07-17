import axios from "axios";

const api = axios.create({
  baseURL: "https://test-xe0u.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");
  const token = storedUser ? JSON.parse(storedUser).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
