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

export const updateOtherChild = (value: object, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        otherCurrentChild: value,
      },
    });
    callback();
  };
};

export const HomeAPI = (
  child_id: number,
  page: number,
  activity: any,
  date: string,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.home.HomeData(child_id, page, activity, date),
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
        console.log("error ", error);
        // dispatch({
        //   type: Action.HOME_DATA,
        //   payload: {
        //     // isLoading: false,
        //   },
        // });
        CustomToast(error.data.message);
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
        console.log("error ", error);
        // dispatch({
        //   type: Action.HOME_DATA,
        //   payload: {
        //     // isLoading: false,
        //   },
        // });
        CustomToast(error.data.message);
        failureCallback();
      }
    );
  };
};

export const addFilter = (
  activity: Array<any>,
  date: string,
  callback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        myFilter: { activity: activity, date: date },
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
