import { Action, API, EndPoints } from "../../../../utils";
import { CustomToast } from "../../../../Components";

export const searchCenter = (query: string, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    API.googleSearchApiCall(
      EndPoints.auth.searchCentres(query),
      (success: any) => {
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            searchList: success.data.results,
          },
        });
        callback(success);
      },
      (error: any) => {
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            // isLoading: false,
          },
        });
        CustomToast(error);
        callback([]);
      }
    );
  };
};

export const recentSearch = (item: any, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    const { recentList } = getState().NearbySchool;
    let temp = {
      name: item.formatted_address,
      coordinates: item.geometry.location,
    };
    let filteredList = recentList.filter(
      (item: any) =>
        item.coordinates.lat !== temp.coordinates.lat &&
        item.coordinates.lng !== temp.coordinates.lng
    );
    filteredList.length >= 5 ? filteredList.pop() : null;
    filteredList.unshift(temp);
    dispatch({
      type: Action.RECENT_SEARCH,
      payload: {
        recentList: filteredList,
      },
    });
    callback(filteredList);
  };
};
