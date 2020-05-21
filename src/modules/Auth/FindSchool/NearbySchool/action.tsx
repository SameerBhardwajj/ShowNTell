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

export const recentSearch = (item: any, callback: Function) => {
  debugger;
  return (dispatch: Function, getState: Function) => {
    debugger;
    const { recentList } = getState().NearbySchool;
    console.warn(getState().NearbySchool.recentList);
    debugger;
    let temp = {
      name: item.formatted_address,
      coordinates: item.geometry.location,
    };
    recentList.length >= 5 ? recentList.pop() : null;
    recentList.unshift(temp);
    debugger;
    dispatch({
      type: Action.RECENT_SEARCH,
      payload: {
        recentList: recentList,
      },
    });
    debugger;
    callback(recentList);
  };
};
