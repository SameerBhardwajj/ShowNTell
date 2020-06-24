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

export const fetchSlotDates = (
  id: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getClientApiCall(
      EndPoints.auth.getSlotDate(id),
      {},
      (success: any) => {
        console.log("success ", success);
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
          payload: {
            slotDates: success.data.Status.OK,
          },
        });
        successCallback(success.data.Status.OK);
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
          CustomToast(error);
        }
        failureCallback();
      }
    );
  };
};

export const fetchSlotTime = (
  id: number,
  date: string,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getClientApiCall(
      EndPoints.auth.getSlotTime(id, date),
      {},
      (success: any) => {
        console.log("success ", success);
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
          payload: {
            slotTime: success.data.Status.OK.times,
          },
        });
        successCallback(success.data.Status.OK.times);
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
          CustomToast(error);
        }
        failureCallback();
      }
    );
  };
};
