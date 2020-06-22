import { CustomToast } from "../../../Components";
import { Action, API, EndPoints } from "../../../utils";
import { Platform } from "react-native";
import {
  getDeviceId,
  getDeviceToken,
  isEmulatorSync,
} from "react-native-device-info";
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
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
        failCallback([]);
      }
    );
  };
};

export const loginAPI = (
  email: string,
  password: string,
  id: string,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.login,
      {
        email: email,
        password: password,
        center_id: id,
        device_id: isEmulatorSync() ? "12" : getDeviceId(),
        device_name: Platform.OS,
        device_token: isEmulatorSync() ? "asdasda" : getDeviceToken(),
      },
      (success: any) => {
        debugger;
        console.log("success ", success);
        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              loginData: res,
              loginToken: res.jwttoken,
              loginEmail: email,
            },
          });
        } else {
          CustomToast(success.data.message);
          callback();
        }
        callback();
      },
      (error: any) => {
        debugger;
        console.warn("my error ", error.response);
        // dispatch({
        //   type: Action.USER_LOGIN,
        //   payload: {
        //     // isLoading: false,
        //   },
        // });
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
        callback();
      }
    );
  };
};
