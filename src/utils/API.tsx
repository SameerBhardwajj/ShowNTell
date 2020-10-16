import Constants from "./Constants";
import { CustomToast } from "../Components";
import Strings from "./Strings";
import axios from "axios";

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const googleSearchApiCall = (
  endPoint: string,
  successCallback: Function,
  errorCallback: Function
) => {
  axios
    .get(endPoint)
    .then((response: any) => {
      console.log("Success: ", response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log("Error: ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const postApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .post(endPoint, params)
    .then((response: any) => {
      console.log("res ", response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log("Error.response.config ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};
/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .get(endPoint, params)
    .then((response: any) => {
      console.log("Success: ", response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log("Error.response.config ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const postHelpApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.needHelpInstance
    .post(endPoint, params)
    .then((response: any) => {
      console.log("res ", response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log("Error.response.config ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};

const getClientApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.clientAxiosInstance
    .get(endPoint, params)
    .then((response: any) => {
      console.log("Success: ", response);
      if (response.data.result === "invalid") {
        CustomToast(JSON.stringify(response.data.errors));
        errorCallback();
      } else {
        successCallback(response);
      }
    })
    .catch((error: any) => {
      console.log("Error.response.config ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};

const postClientApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.clientAxiosInstance
    .post(endPoint, params)
    .then((response: any) => {
      console.log("Success: ", response);
      if (response.data.result === "invalid") {
        CustomToast(JSON.stringify(response.data.errors));
        errorCallback();
      } else {
        successCallback(response);
      }
    })
    .catch((error: any) => {
      console.log("Error.response.config ", error);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error);
    });
};

const fileUpload = (
  endPoint: string,
  data: any,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .post(endPoint, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(
      (response: any) => {
        console.log(response);
        successCallback(response);
      },
      (error: any) => {
        console.log(error);
        if (error.message === "Network Error") {
          CustomToast(Strings.No_Internet);
        }
        if (error.code === "ECONNABORTED") {
          CustomToast(Strings.Timeout_error);
        }

        errorCallback(error);
      }
    );
};

/**
 * export all function
 */
export default {
  postApiCall,
  getApiCall,
  postHelpApiCall,
  googleSearchApiCall,
  getClientApiCall,
  postClientApiCall,
  fileUpload,
};
