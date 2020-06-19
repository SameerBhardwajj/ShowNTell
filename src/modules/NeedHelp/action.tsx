import { CustomToast } from "../../Components";
import { Action, API, EndPoints } from "../../utils";

export const needHelpAPI = (
  modal: string,
  os: string,
  app: string,
  center: string,
  name: string,
  email: string,
  description: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.auth.needHelp,
      {
        device_modal: modal,
        os_version: os,
        app_version: app,
        center_id: center,
        parent_name: name,
        parent_email: email,
        description: description,
      },
      (success: any) => {
        console.log("success ", success.data.response);
        if (success.data.code === 200) {
          dispatch({
            type: Action.NEED_HELP,
            payload: {},
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        dispatch({
          type: Action.NEED_HELP,
          payload: {},
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
