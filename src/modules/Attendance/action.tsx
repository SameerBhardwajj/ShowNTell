import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const viewAttendance = (
  type: string,
  child_id: number,
  date: string,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.attendance.viewAttendance(type, child_id, date),
      {},
      (success: any) => {
        let res = success.data.response;
        if (success.data.code === 200) {
          console.log("mysuccess ", res);
          dispatch({
            type: Action.VIEW_ATTENDANCE,
            payload: {
              data: CommonFunctions.isEmpty(res) ? [] : res,
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
          type: Action.VIEW_ATTENDANCE,
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
