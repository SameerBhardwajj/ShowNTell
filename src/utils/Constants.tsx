import Config from "react-native-config";
import axios from "axios";

const $http = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Authorization: "Basic IyNXZWJpbG9naWNzQEA6QEBXZWJpbG9naWNzIyNA",
    "Content-Type": "application/json",
  },
});

export default {
  successStatus: 200,
  unAuthorizedStatus: 401,
  notAuthorizedForInfo: 400,
  axiosInstance: $http,
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
