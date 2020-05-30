import Config from "react-native-config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

let token: string;
export function App() {
  const { loginToken } = useSelector((state: { Login: any }) => ({
    loginToken: state.Login.loginToken,
  }));
  token = loginToken;
  return <></>;
}

const $http = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    Authorization:
      // token === ""
      //   ? "Basic Y29yZTpjb3Jl"
      //   : 
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInRpbWVTdGFtcCI6MTU4OTk1ODQ5NTg3MiwidHlwZSI6IlBBUkVOVCIsImlhdCI6MTU4OTk1ODQ5NSwiZXhwIjoxNTkwMjE3Njk1fQ.RNMzOIP0LmqGO4C9uk-crtg4lmqwjo7vFcNQmtlH-OI",
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
