import { CustomToast } from "../../../Components";
import { Action, API, EndPoints } from "../../../utils";
export const updateLogin = () => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: Action.UPDATE_LOGIN,
      payload: {
        loginData: {},
        loginToken: "",
      },
    });
  };
};

export const loginAPI = (
  email: string,
  password: string,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.login,
      {
        email: email,
        password: password,
        device_id: "12",
        device_name: "ios",
        device_token: "asdasda",
      },
      (success: any) => {
        console.log("success ", success);
        if (success.data.message === "Login Successfully!!") {
          dispatch({
            type: Action.USER_LOGIN,
            payload: {
              loginData: success.data.response,
              loginToken: success.data.response.jwttoken,
            },
          });
        } else {
          debugger
          CustomToast(success.data.message);
          debugger
          callback();
        }
        debugger
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
      }
    );
  };
};
