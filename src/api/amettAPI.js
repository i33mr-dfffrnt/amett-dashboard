import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5050",
  // baseURL: "https://api.amett.net",
  baseURL: "https://www.amett.net/api",
  // baseURL: "",
});

export default instance;
