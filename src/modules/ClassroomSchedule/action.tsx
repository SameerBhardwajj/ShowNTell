import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const updateClassChild = (value: Object, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.CLASSROOM_SCHEDULE,
      payload: {
        classroomChild: value,
      },
    });
    callback();
  };
};

export const hitClassScheduleAPI = (
  classID: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.classroomSchedule(classID),
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.CLASSROOM_SCHEDULE,
            payload: {
              data: res,
            },
          });
          successCallback(success.data.response);
        } else {
          dispatch({
            type: Action.CLASSROOM_SCHEDULE,
            payload: {
              data: [],
            },
          });
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);

        // dispatch({
        //   type: Action.CLASSROOM_SCHEDULE,
        //   payload: {
        //     data: [],
        //   },
        // });
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};
