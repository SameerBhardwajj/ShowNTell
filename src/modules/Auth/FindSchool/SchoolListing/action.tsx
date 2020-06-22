import { Action, API, EndPoints } from "../../../../utils";
import { CustomToast } from "../../../../Components";

export const fetchSchoolList = (
  value: any,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.auth.nearByCentres(value.lat, value.lng),
      {},
      (success: any) => {
        console.log("success ", success.data.response);
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
          payload: {
            schoolList: success.data.response,
          },
        });
        successCallback(success.data.response);
      },
      (error: any) => {
        console.log("error ", error);
        console.warn("errrr..................");
        // dispatch({
        //   type: Action.FETCH_SCHOOL_LIST,
        //   payload: {
        //     // isLoading: false,
        //   },
        // });
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
        failureCallback();
      }
    );
  };
};
