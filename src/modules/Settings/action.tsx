import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hitAPI = (
  id: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.about(id),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.SETTINGS,
            payload:
              id === 1
                ? {
                    about: res,
                  }
                : {
                    tnc: res,
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

export const hitChangePasswordAPI = (
  data: object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.changePassword,
      data,
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          successCallback(res);
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
