import Config from "react-native-config";
import axios from "axios";

const $http = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const $httpProfile = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
});

const setAuthorizationToken = (token: boolean, myToken: string) => {
  $http.defaults.headers.common.Authorization = token
    ? `Bearer ${myToken}`
    : "Basic Y29yZTpjb3Jl";
  $httpProfile.defaults.headers.common.Authorization = token
    ? `Bearer ${myToken}`
    : "Basic Y29yZTpjb3Jl";
};

const clientHttp = axios.create({
  baseURL: Config.CLIENT_BASE_URL,
  timeout: 30000,
});

export default {
  successStatus: 200,
  unAuthorizedStatus: 401,
  notAuthorizedForInfo: 400,
  axiosInstance: $http,
  axiosProfileInstance: $httpProfile,
  clientAxiosInstance: clientHttp,
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
