import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://test-xe0u.onrender.com/api",
});

export default api;
