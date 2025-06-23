// src/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

console.log(token);

export const baseURL = "http://localhost:5000/api";

export const base = "http://localhost:5000/";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
