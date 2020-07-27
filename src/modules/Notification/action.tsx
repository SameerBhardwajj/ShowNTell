import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitNotificationAPI = (
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.notification.notification(page),
      {},
      (success: any) => {
        const { data } = getState().Notification;
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          let finalArray = [];
          page === 0
            ? (finalArray = res.rows)
            : (finalArray = data.concat(res.rows));
          dispatch({
            type: Action.NOTIFICATION,
            payload: {
              data: finalArray,
              page: page + 1,
            },
          });
          successCallback(res.rows);
        } else {
          CustomToast(success.data.message);
          failureCallback();
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
