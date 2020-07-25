import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const viewAttendanceAPI = (
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
        console.warn(type, child_id, date);

        let res = success.data.response;
        if (success.data.code === 200) {
          console.warn("mysuccess ", res);
          dispatch({
            type: Action.VIEW_ATTENDANCE,
            payload:
              type === "by_month"
                ? {
                    monthData: CommonFunctions.isEmpty(res) ? [] : res,
                  }
                : {
                    dateData: CommonFunctions.isEmpty(res) ? [] : res,
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
          payload:
            type === "by_month"
              ? {
                  monthData: [],
                }
              : {
                  dateData: [],
                },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};
