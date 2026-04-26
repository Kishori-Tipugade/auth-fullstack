import axios from "axios";

const baseURL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://auth-fullstack-6smn.onrender.com/api";

const api = axios.create({
  baseURL
});

export default api;