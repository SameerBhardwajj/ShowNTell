import { Action, API, EndPoints, CommonFunctions } from "../../../../utils";

export const fetchSchoolList = (
  value: any,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn("value  ", value);

    API.getApiCall(
      EndPoints.auth.nearByCentres(value.lat, value.lng),
      {},
      (success: any) => {
        if (success.data.code === 200) {
          console.warn("success ", success.data.response);
          dispatch({
            type: Action.FETCH_SCHOOL_LIST,
            payload: {
              schoolList: success.data.response,
            },
          });
          successCallback(success.data.response);
        } else {
          failureCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
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
        CommonFunctions.handleError(error);
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
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};
