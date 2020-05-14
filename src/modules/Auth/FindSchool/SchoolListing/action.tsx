import { Action, API, EndPoints } from "../../../../utils";

export const fetchSchoolList = (value: Object) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.FETCH_SCHOOL_LIST,
      payload: {
        isLoading: true,
      },
    });
    API.getApiCall(
      EndPoints.auth.nearByCentres,
      undefined,
      (success: Array<any>) => {
        console.log("success ", success);
      },
      (error: any) => {
        console.log("error ", error);
      }
    );
  };
};
