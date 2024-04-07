import axios from "axios";

const http = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default http;
