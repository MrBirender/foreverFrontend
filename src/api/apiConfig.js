import axios from "axios";

export const ENV = "local"; // 'local' | 'test' | 'production'

const baseUrls = {
  local: "http://localhost:4000",
};

export const baseUrl = baseUrls[ENV];

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true,
});

export default api;
