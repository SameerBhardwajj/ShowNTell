import { CustomToast } from "../../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../../utils";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import FirebaseServices from "../../../utils/FirebaseServices";

export const updateLogin = (data: object, token: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: Action.UPDATE_LOGIN,
      payload: {
        loginData: data,
        loginToken: token,
      },
    });
  };
};

export const logout = () => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: "USER_LOGGED_OUT",
      payload: {
        logout: true,
      },
    });
  };
};

export const updateProfilePic = (data: string, callback: Function) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: Action.USER_LOGIN,
      payload: {
        profilePic: data,
      },
    });
    callback();
  };
};

export const updatePermission = (data: object, callback: Function) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: Action.USER_LOGIN,
      payload: {
        permission: data,
      },
    });
    callback();
  };
};

export const addDeviceToken = (callback: Function) => {
  return (dispatch: any, getState: any) => {
    Platform.OS === "ios"
      ? PushNotificationIOS.addEventListener("register", (token) => {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              deviceToken: token,
            },
          });
          callback(token);
        })
      : FirebaseServices.getToken((token: string) => {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              deviceToken: token,
            },
          });
          callback(token);
        });
  };
};

export const fetchSchoolList = (
  email: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.auth.centerList(email),
      {},
      (success: any) => {
        console.log("success ", success.data.response);
        if (success.data.code === 200) {
          dispatch({
            type: Action.FETCH_SCHOOL_LOGIN,
            payload: {
              schoolList: success.data.response,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback([]);
        }
      },
      (error: any) => {
        dispatch({
          type: Action.FETCH_SCHOOL_LOGIN,
          payload: {
            schoolList: [],
          },
        });
        CommonFunctions.handleError(error);
        failCallback([]);
      }
    );
  };
};

export const loginAPI = (
  email: string,
  password: string,
  id: string,
  deviceID: string,
  token: string,
  deviceName: string,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.login,
      {
        email: email,
        password: password,
        center_id: id,
        device_id: deviceID,
        device_name: deviceName,
        device_platform: Platform.OS,
        device_token: token,
      },
      (success: any) => {
        console.warn("success ", success);
        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              loginData: res,
              loginToken: res.jwttoken,
              loginEmail: email,
              profilePic: res.s3_photo_path,
            },
          });
        } else {
          CustomToast(success.data.message);
          callback();
        }
        callback();
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        callback();
      }
    );
  };
};
