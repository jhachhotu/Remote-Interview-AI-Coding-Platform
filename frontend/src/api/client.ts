import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("tokens");
  if (raw) {
    const { access } = JSON.parse(raw);
    if (access) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

