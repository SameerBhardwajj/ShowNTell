import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitAnnouncementAPI = (
  child_id: number,
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.announcement(child_id, page),
      {},
      (success: any) => {
        let res = success.data.response;
        if (success.data.code === 200) {
          console.log("mysuccess ", res);
          dispatch({
            type: Action.ANNOUNCEMENT,
            payload: {
              data: res.rows,
            },
          });

          successCallback();
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.ANNOUNCEMENT,
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
