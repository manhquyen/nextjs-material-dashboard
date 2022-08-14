import axios from "axios";
import config from "./config";

export const API_MY_MASTER = axios.create({
  baseURL: config.apiMyMaster,
  timeout: config.TIMEOUT,
  headers: {
    "Session-Token": config.sessionToken,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
