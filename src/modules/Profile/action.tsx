import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hiBasicDetails = (
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.profileDetails,
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.PROFILE,
            payload: {
              data: res,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);

        dispatch({
          type: Action.PROFILE,
          payload: {
            data: {},
          },
        });
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

export const updateProfile = (
  data: Object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.updateProfile,
      data,
      (success: any) => {
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

export const fetchStatesAPI = (
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.fetchStates,
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.PROFILE,
            payload: {
              stateList: res,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);

        dispatch({
          type: Action.PROFILE,
          payload: {
            stateList: [],
          },
        });
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

// export const hitUploadCDNapi = (
//   file: FormData,
//   successCallback: Function,
//   failCallback: Function
// ) => {
//   return (dispatch: Function, getState: Function) => {
//     API.postProfileApi(
//       EndPoints.drawer.uploadImage.uploadCDN,
//       { file: file },
//       (success: any) => {
//         console.warn("success ", success);

//         const res = success.data.response;
//         if (success.data.code === 200) {
//           successCallback(success.data.response);
//         } else {
//           CustomToast(success.data.message);
//           failCallback();
//         }
//       },
//       (error: any) => {
//         console.log("err ", error);
//         CommonFunctions.handleError(error);
//         failCallback(error);
//       }
//     );
//   };
// };

export const hitUploadCDNapi = (
  data: any,
  // params: any,
  successCallback: Function,
  failCallback: Function
) => {
  console.warn("my data   ", data);

  return (dispatch: Function) => {
    API.fileUpload(
      EndPoints.drawer.uploadImage.uploadCDN,
      data,
      // params,
      (success: any) => {
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        failCallback();
      }
    );
  };
};

export const hitInlineCDNapi = (
  file: string,
  successCallback: Function,
  failCallback: Function
) => {
  console.warn("step 2");

  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.uploadImage.inlineCDN(file),
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.warn("err ", error);
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

export const hitUploadImage = (
  file: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.uploadImage.uploadCDN,
      { image: file },
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};
