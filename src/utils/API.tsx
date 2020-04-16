import axios from "axios";
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
  axios
    .post(endPoint, params)
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
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function
) => {
  axios
    .get(endPoint + params, {})
    .then((response: any) => {
      console.log("response", response);
      successCallback(response);
    })
    .catch((error: any) => {
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            //or whatever the code we are using
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
const deleteApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function
) => {
  axios
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
  axios
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
  axios
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
export {
  postApiCall,
  getApiCall,
  patchApiCall,
  putApiCall,
  deleteApiCall,
};
