import { CustomToast } from "../../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../../utils";
import { Platform } from "react-native";

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
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn(deviceID, token);

    API.postApiCall(
      EndPoints.auth.login,
      {
        email: email,
        password: password,
        center_id: id,
        device_id: "12",
        device_name:"vivo",
        device_platform: Platform.OS,
        device_token: "asasd",
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
        CommonFunctions.handleError(error);
        callback();
      }
    );
  };
};
