import { CustomToast } from "../../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../../utils";

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
            type: Action.FETCH_SCHOOL_LIST,
            payload: {
              schoolList: success.data.response,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
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

export const register = (
  email: string,
  center: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.register,
      {
        email: email,
        center_id: center,
      },
      (success: any) => {
        console.log("success ", success);
        if (success.data.code === 200) {
          let res = success.data.response;
          dispatch({
            type: Action.REGISTER,
            payload: {
              email: email,
              name: `${res.first_name.trim()}${
                res.middle_name === null ? "" : `${res.middle_name.trim()}`
              } ${res.last_name.trim()}`,
              id: res.id,
            },
          });
          successCallback();
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

export const resendCode = (
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
          let res = success.data.response;
          dispatch({
            type: Action.RESEND_CODE,
            payload: {},
          });
          successCallback();
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

export const verifyCode = (
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
          let res = success.data.response;
          dispatch({
            type: Action.VERIFY_CODE,
            payload: {
              email: "",
              token: res.token,
            },
          });
          successCallback();
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

export const createPassword = (
  id: number,
  password1: string,
  password2: string,
  token: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.createPassword,
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
            type: Action.CREATE_PASSWORD,
            payload: {
              id: 0,
              name: "",
            },
          });
          successCallback();
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
