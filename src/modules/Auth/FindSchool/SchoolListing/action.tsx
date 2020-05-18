import { Action, API, EndPoints } from "../../../../utils";

export const fetchSchoolList = (
  value: any,
  page: number,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn(page);
    
    API.getApiCall(
      EndPoints.auth.nearByCentres(value.lat, value.lng, page),
      undefined,
      (success: any) => {
        console.log("success ", success.data.response);
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
          payload: {
            schoolList: success.data.response,
          },
        });
        callback(success.data.response);
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.FETCH_SCHOOL_LIST,
          payload: {
            // isLoading: false,
          },
        });
        callback([]);
      }
    );
  };
};
