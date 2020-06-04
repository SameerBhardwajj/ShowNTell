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
            searchList: success.data.predictions,
          },
        });
        console.log(success);

        callback(success.data);
      },
      (error: any) => {
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            // isLoading: false,
          },
        });
        console.log(error);

        CustomToast(error);
        callback([]);
      }
    );
  };
};

export const getCoordinates = (place_id: string, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    API.googleSearchApiCall(
      EndPoints.auth.centreCoordinates(place_id),
      (success: any) => {
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            searchList: success.data.predictions,
          },
        });
        callback(success.data);
      },
      (error: any) => {
        dispatch({
          type: Action.SEARCH_CENTER,
          payload: {
            // isLoading: false,
          },
        });
        console.log(error);

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
      place_id: item.place_id,
    };
    let filteredList = recentList.filter(
      (item: any) => item.place_id !== temp.place_id
    );
    filteredList.length >= 4 ? filteredList.pop() : null;
    filteredList.unshift(item);
    dispatch({
      type: Action.RECENT_SEARCH,
      payload: {
        recentList: filteredList,
        searchList: [],
      },
    });
    callback(filteredList);
  };
};
