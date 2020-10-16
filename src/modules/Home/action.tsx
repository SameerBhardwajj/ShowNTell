import {
  Action,
  API,
  EndPoints,
  CommonFunctions,
  Constants,
} from "../../utils";
import { CustomToast } from "../../Components";
import { Platform } from "react-native";

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
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          failCallback();
        }
      },
      (error: any) => {
        failCallback([]);
      }
    );
  };
};

export const updateFilter = (value: boolean) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        filterEnable: value,
      },
    });
  };
};

export const updateAWI = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        AWI: !getState().Home.AWI,
      },
    });
  };
};

export const updateNotificationCount = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        unreadNotifications: true,
      },
    });
  };
};

export const updateBadgeCount = (id: string) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.home.updateBadge,
      {
        device_id: id,
      },
      (success: any) => { },
      (error: any) => { }
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
  searchKey?: string,
  activity_status?: number
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
        searchKey,
        activity_status
      ),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          if (res === undefined) {
            failureCallback();
          } else {
            dispatch({
              type: Action.HOME_DATA,
              payload: {
                data: res.rows,
                chatEnable: res.permission.chatWithParent === 0 ? false : true,
                page: page === undefined ? 0 : page + 1,
                guardianData: res.guardianData,
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

export const hitChatCount = (callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    Constants.axiosInstance
      .get(EndPoints.home.checkChatCount)
      .then((success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          console.log("chat available", res);
          dispatch({
            type: Action.UPDATE_TAB,
            payload: {
              unreadMsgs: res.count,
              unreadNotifications:
                res.unReadCountNotification > 0 ? true : false,
            },
          });
        } else {
          console.log("chat not available");
          dispatch({
            type: Action.UPDATE_TAB,
            payload: {
              unreadMsgs: 0,
              unreadNotifications: false,
            },
          });
        }
        callback();
      })
      .catch((error: any) => {
        console.log(error);
        dispatch({
          type: Action.UPDATE_TAB,
          payload: {
            unreadMsgs: 0,
            unreadNotifications: false,
          },
        });
        callback();
      });
  };
};
