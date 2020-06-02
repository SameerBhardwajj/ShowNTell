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
      console.warn("error", error);
      console.log("Error: ", error.response);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error.response);
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
      console.warn("res ", response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.warn("error", error);
      console.log("Error: ", error.response);
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      } else if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      } else {
        errorCallback(error.response);
      }
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
      console.warn("error", error);
      console.log("Error: ", error);
      debugger;
      if (error.message === "Network Error") {
        CustomToast(Strings.No_Internet);
      }
      if (error.code === "ECONNABORTED") {
        CustomToast(Strings.Timeout_error);
      }
      errorCallback(error.response);
    });
};
/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const deleteApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .delete(endPoint + params, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            status: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            status: "",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const patchApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .patch(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            status: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            status: "",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const putApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  Constants.axiosInstance
    .put(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            status: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            status: "",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 * export all function
 */
export default {
  postApiCall,
  getApiCall,
  patchApiCall,
  putApiCall,
  deleteApiCall,
  googleSearchApiCall,
};
