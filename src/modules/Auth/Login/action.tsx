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
  deviceName: string,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn("id  ", deviceID, "token  ", token, "name  ", deviceName);

    API.postApiCall(
      EndPoints.auth.login,
      {
        email: "Katherine.Herman@yahoo.com",
        password: "Sam@1234",
        center_id: 193,
        device_id: "msm12",
        device_name: "vivo",
        device_platform: "android",
        device_token:
          "fTT2tXwtSE6UCwTIO3pptq:APA91bFuMoDRE28xePVorzYA6dRPqshVXefm5I5wJ_FS4Mu6fDhx_pBHIoHHJSL0LPITNU7dSCfDM-d18DD66YKgGp04OGsHZyMH6jE7oYZ9a475sbXVLJ2jpTo_R6nyBO72qf240Mw4",
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
        CommonFunctions.handleError(error);
        callback();
      }
    );
  };
};
