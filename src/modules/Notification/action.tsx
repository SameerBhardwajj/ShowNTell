import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitNotificationAPI = (
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.notification.notification(page),
      {},
      (success: any) => {
        const { data } = getState().Notification;
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          let finalArray = [];
          page === 0
            ? (finalArray = res.rows)
            : (finalArray = data.concat(res.rows));
          dispatch({
            type: Action.NOTIFICATION,
            payload: {
              data: finalArray,
              page: page + 1,
            },
          });
          successCallback(res.rows);
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.NOTIFICATION,
          payload: {
            data: [],
          },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};

export const hitAcknowledgeSupply = (
  id: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.notification.acknowledgeSupply,
      { id: id },
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          successCallback();
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        console.warn("error ", error);
        // dispatch({
        //   type: Action.NOTIFICATION,
        //   payload: {
        //     data: [],
        //   },
        // });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};

export const hitNotificationSetting = (
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.notification.notificationSetting,
      {},
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          dispatch({
            type: Action.NOTIFICATION,
            payload: {
              settingList: res,
            },
          });
          successCallback(res);
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

export const hitNotificationActionSetting = (
  data: object,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.notification.notificationAction,
      data,
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          // dispatch({
          //   type: Action.NOTIFICATION,
          //   payload: {
          //     settingList: res,
          //   },
          // });
          successCallback(res);
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

export const hitReadNotifications = (
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.notification.readNotification,
      {},
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        if (success.data.code === 200) {
          // dispatch({
          //   type: Action.NOTIFICATION,
          //   payload: {
          //     settingList: res,
          //   },
          // });
          successCallback(res);
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

export const hitAllNotifications = (
  data: object,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.notification.toggleAll,
      data,
      (success: any) => {
        let res = success.data.response;
        console.warn("mysuccess ", success.config);
        if (success.data.code === 200) {
          // dispatch({
          //   type: Action.NOTIFICATION,
          //   payload: {
          //     settingList: res,
          //   },
          // });
          successCallback(res);
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
