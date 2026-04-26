import axios from "axios";

const api = axios.create({
  baseURL: "https://auth-fullstack-6smn.onrender.com/api"
});

export default api;