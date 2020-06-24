import { Action, API, EndPoints } from "../../utils";
import { CustomToast } from "../../Components";

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

// export const updateOtherChild = (value: object, callback: Function) => {
//   return (dispatch: Function, getState: Function) => {
//     dispatch({
//       type: Action.UPDATE_TAB,
//       payload: {
//         otherCurrentChild: value,
//       },
//     });
//     callback();
//   };
// };

export const HomeAPI = (
  successCallback: Function,
  failureCallback: Function,
  child_id: number,
  page?: number,
  activity?: any,
  fromDate?: string,
  toDate?: string,
  type?: string,
  searchKey?: string
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn("check  ....  ", child_id);

    API.getApiCall(
      EndPoints.home.HomeData(
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
          console.warn("mysuccess ", res);
          dispatch({
            type: Action.HOME_DATA,
            payload: {
              data: res,
            },
          });
          successCallback(res);
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
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
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
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
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.data.message);
        }
        failCallback([]);
      }
    );
  };
};
