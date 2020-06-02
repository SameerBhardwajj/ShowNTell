import { CustomToast } from "../../../Components";
import { Action, API, EndPoints } from "../../../utils";

export const forgotPassword = (
  email: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.forgotPassword,
      {
        email: email,
      },
      (success: any) => {
        console.log("success ", success);
        let res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.FORGOT_PASSWORD,
            payload: {
              email: email,
              id: res.guardian_id,
              name: `${res.first_name}${
                res.middle_name === null ? "" : `${" "}${res.middle_name}`
              } ${res.last_name}`,
            },
          });
          successCallback();
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CustomToast(error.data.message);
        failCallback();
      }
    );
  };
};

export const fpresendCode = (
  email: string,
  phone: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.resendCode,
      {
        email: email,
        phone_number: phone,
      },
      (success: any) => {
        console.log("success ", success);
        if (success.data.code === 200) {
          dispatch({
            type: Action.FP_RESEND_CODE,
            payload: {},
          });
          successCallback();
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CustomToast(error.data.message);
        failCallback();
      }
    );
  };
};

export const fpverifyCode = (
  code: string,
  id: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.verifyCode,
      {
        access_code: code,
        guardian_id: id,
      },
      (success: any) => {
        console.log("success ", success);
        if (success.data.code === 200) {
          dispatch({
            type: Action.FP_VERIFY_CODE,
            payload: {
              email: "",
              name: "",
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CustomToast(error.data.message);
        failCallback();
      }
    );
  };
};

export const resetPassword = (
  id: number,
  password1: string,
  password2: string,
  token: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.resetPassword,
      {
        guardian_id: id,
        password: password1,
        confirm_password: password2,
        token: token,
      },
      (success: any) => {
        console.log("success ", success);
        if (success.data.code === 200) {
          dispatch({
            type: Action.RESET_PASSWORD,
            payload: {
              id: 0,
            },
          });
          successCallback();
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.warn("my ", error);

        CustomToast(error.data.message);
        failCallback();
      }
    );
  };
};
