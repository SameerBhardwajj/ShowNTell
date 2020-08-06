import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";
import { Platform } from "react-native";

export const updateTab = (value: boolean, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        tab: value,
        forceRerendering: !getState().Home.forceRerendering,
      },
    });
    callback();
  };
};

export const updateChild = (value: object, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        currentChild: value,
      },
    });
    callback();
  };
};

export const updatePage = (value: number, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        page: value,
      },
    });
    callback();
  };
};

export const updateQuery = (value: string, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        searchQuery: value,
      },
    });
    callback();
  };
};

export const updateDeviceToken = (
  id: string,
  token: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.home.updateDeviceToken,
      {
        device_id: id,
        device_platform: Platform.OS,
        device_token: token,
      },
      (success: any) => {
        console.log("success ", success.data.response);
        // dispatch({
        //   type: Action.UPDATE_TAB,
        //   payload: {},
        // });
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          // CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        // CommonFunctions.handleError(error);
        failCallback([]);
      }
    );
  };
};

export const HomeAPI = (
  successCallback: Function,
  failureCallback: Function,
  child_id: number,
  currentTime: string,
  page?: number,
  activity?: any,
  fromDate?: string,
  toDate?: string,
  type?: string,
  searchKey?: string
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.home.HomeData(
        currentTime,
        child_id,
        page,
        activity,
        fromDate,
        toDate,
        type,
        searchKey
      ),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          console.log("receiving page num ", page);

          // console.warn("mysuccess ", res);
          if (res === undefined) {
            failureCallback();
          } else {
            dispatch({
              type: Action.HOME_DATA,
              payload: {
                data: res.rows,
                chatEnable: res.permission.chatWithParent === 0 ? false : true,
                page: page === undefined ? 0 : page + 1,
              },
            });
            successCallback(res.rows);
          }
        } else {
          CustomToast(success.data.message);
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

export const HomeFilter = (
  classroom_id: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.home.filterData(classroom_id),
      {},
      (success: any) => {
        if (success.data.code === 200) {
          console.log("mysuccess ", success.data.response);
          dispatch({
            type: Action.HOME_DATA,
            payload: {
              filterData: success.data.response,
            },
          });

          successCallback(success.data.response);
        } else {
          dispatch({
            type: Action.HOME_DATA,
            payload: {
              filterData: [],
            },
          });
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        dispatch({
          type: Action.HOME_DATA,
          payload: {
            filterData: [],
          },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};

export const addFilter = (
  activity: Array<any>,
  fromDate: string,
  toDate: string,
  type: Array<any>,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        myFilter: {
          activity: activity,
          fromDate: fromDate,
          toDate: toDate,
          type: type,
        },
      },
    });
    callback();
  };
};

export const countFilter = (value: number, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        filterNum: value,
      },
    });
    callback();
  };
};

export const weDidItAPI = (
  id: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.home.weDidIt,
      {
        id: id,
      },
      (success: any) => {
        console.log("success ", success.data.response);
        dispatch({
          type: Action.UPDATE_TAB,
          payload: {},
        });
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        failCallback([]);
      }
    );
  };
};
