import Config from "react-native-config";
import axios from "axios";
import { Platform } from "react-native";
import { getUniqueId, getDeviceId } from "react-native-device-info";

const BASE_URL = Config.CLIENT_BASE_URL;

// Axios instance for all APIs
const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "device-id": `${getUniqueId()}`,
    "device-name": `${getDeviceId()}`,
    platform: Platform.OS,
  },
});

// Setting authorization token for the App
const setAuthorizationToken = (token: boolean, myToken: string) => {
  $http.defaults.headers.common.Authorization = token
    ? `Bearer ${myToken}`
    : "Basic Y29yZTpjb3Jl";
};

// Axios instance for client APIs
const clientHttp = axios.create({
  baseURL: Config.CLIENT_URL,
  timeout: 20000,
});

// Axios instance for Need help API having constant authorization
const $httpHelp = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    Authorization: "Basic Y29yZTpjb3Jl",
    "Content-Type": "application/json",
    "device-id": `${getUniqueId()}`,
    "device-name": `${getDeviceId()}`,
    platform: Platform.OS,
  },
});

export default {
  successStatus: 200,
  unAuthorizedStatus: 401,
  notAuthorizedForInfo: 400,
  axiosInstance: $http,
  needHelpInstance: $httpHelp,
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
