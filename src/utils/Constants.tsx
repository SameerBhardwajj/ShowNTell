import Config from "react-native-config";
import axios from "axios";

const $http = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthorizationToken = (token: boolean) => {
  $http.defaults.headers.common.Authorization = token
    ? "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInRpbWVTdGFtcCI6MTU4OTk1ODQ5NTg3MiwidHlwZSI6IlBBUkVOVCIsImlhdCI6MTU4OTk1ODQ5NSwiZXhwIjoxNTkwMjE3Njk1fQ.RNMzOIP0LmqGO4C9uk-crtg4lmqwjo7vFcNQmtlH-OI"
    : "Basic Y29yZTpjb3Jl";
};

export default {
  successStatus: 200,
  unAuthorizedStatus: 401,
  notAuthorizedForInfo: 400,
  axiosInstance: $http,
  setAuthorizationToken,
  status_code: {
    success: 200,
    successAction: 201,
    notFound: 204,
    badRequest: 400,
    Unauthorized: 401,
    invalid: 400,
    timeout: 408,
    userDelete: 410,
    serverError: 500,
  },
};
