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
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

export const hitUploadCDNapi = (
  data: any,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function) => {
    API.fileUpload(
      EndPoints.drawer.uploadImage.uploadCDN,
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

export const hitUploadImage = (
  file: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.uploadImage.uploadProfileImage,
      { image: file },
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
