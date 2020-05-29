import { CustomToast } from "../../../Components";
import { Action, API, EndPoints } from "../../../utils";
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
        CustomToast(error.data.message);
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
        device_id: "12",
        device_name: "ios",
        device_token: "asdasda",
      },
      (success: any) => {
        console.log("success ", success);
        const res = success.data.response;
        if (success.data.message === "Login Successfully!!") {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              loginData: res,
              loginToken: res.jwttoken,
            },
          });
        } else {
          CustomToast(success.data.message);
          callback();
        }
        debugger;
        callback();
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.USER_LOGIN,
          payload: {
            // isLoading: false,
          },
        });
        CustomToast(error.data.message);
        callback();
      }
    );
  };
};
