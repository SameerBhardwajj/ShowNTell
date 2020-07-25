import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitNotificationAPI = (
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {

    API.getApiCall(
      EndPoints.notification.notification,
      {},
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        if(success.data.code === 200){
        dispatch({
          type: Action.NOTIFICATION,
          payload: {
            data: res.rows,
          },
        });
        successCallback(res.rows);}
        else{
          CustomToast(success.data.message)
          failureCallback()
        }
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.NOTIFICATION,
          payload: {
            data: [],
          },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};
