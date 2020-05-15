import { Action, API, EndPoints } from "../../../../utils";

export const fetchSchoolList = (
  value: any,
  page: number,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.auth.nearByCentres(41.063412, -74.133544, page),
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
