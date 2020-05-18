import { Action, API, EndPoints } from "../../../../utils";

export const searchCenter = (query: string, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    API.googleSearchApiCall(
      EndPoints.auth.searchCentres(query),
      (success: any) => {
        console.log("success ", success);
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            searchList: success.data.results,
          },
        });
        callback(success);
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            // isLoading: false,
          },
        });
        callback([]);
      }
    );
  };
};
