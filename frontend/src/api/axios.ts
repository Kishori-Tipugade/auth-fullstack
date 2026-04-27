import axios from "axios";

const api = axios.create({
  baseURL: "https://auth-fullstack-s6nm.onrender.com/api"
});

export default api;