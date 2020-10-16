import axios from "axios";
import { Platform } from "react-native";
import { getUniqueId, getDeviceId } from "react-native-device-info";

const DEV_BASE_URL = "http://showtelldevapi.appskeeper.com:4025";
const QA_BASE_URL = "http://showtellqaapi.appskeeper.com:7034";
const CLIENT_BASE_URL = "http://snt-parent-api-test.mytle.com";

const CLIENT_URL = "https://stage.thelearningexperience.com";

const BASE_URL = CLIENT_BASE_URL;

// Axios instance for all APIs
const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
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
  baseURL: CLIENT_URL,
  timeout: 30000,
});

// Axios instance for Need help API having constant authorization
const $httpHelp = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: "Basic Y29yZTpjb3Jl",
    "Content-Type": "application/json",
    "device-id": `${getUniqueId()}`,
    "device-name": `${getDeviceId()}`,
    platform: Platform.OS,
  },
});

export default {
  axiosInstance: $http,
  needHelpInstance: $httpHelp,
  clientAxiosInstance: clientHttp,
  setAuthorizationToken,
};
