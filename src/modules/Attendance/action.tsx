import { Action, API, EndPoints } from "../../utils";
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
        if (success.data.code === 200) {
          console.log("mysuccess ", success.data.response);
          dispatch({
            type: Action.VIEW_ATTENDANCE,
            payload: {
              data: success.data.response,
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
        CustomToast(error.data.message);
        failureCallback();
      }
    );
  };
};
