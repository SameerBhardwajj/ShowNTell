import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitAbsenceReason = (
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.absence.absenceReason,
      {},
      (success: any) => {
        if (success.data.code === 200) {
          console.log("success ", success.data.response);
          dispatch({
            type: Action.ABSENCE,
            payload: {
              reasonList: success.data.response,
            },
          });
          successCallback(success.data.response);
        } else {
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

export const hitAbsenceList = (
  child: number,
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.absence.absenceList(child, page),
      {},
      (success: any) => {
        console.warn("success ", success);

        if (success.data.code === 200) {
          const { absenceList } = getState().Absence;
          const res = success.data.response;
          let finalArray;
          page === 0
            ? (finalArray = res.rows)
            : (finalArray = absenceList.concat(res.rows));
          dispatch({
            type: Action.ABSENCE,
            payload: {
              absenceList: finalArray,
              page: page + 1,
            },
          });
          successCallback(success.data.response);
        } else {
          failureCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        dispatch({
          type: Action.ABSENCE,
          payload: {
            absenceLists: [],
          },
        });
        failureCallback();
      }
    );
  };
};

export const hitAddAbsence = (
  data: Object,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn(data);

    API.postApiCall(
      EndPoints.absence.addAbsence,
      data,
      (success: any) => {
        if (success.data.code === 200) {
          console.log("success ", success.data.response);
          successCallback(success.data.response);
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

export const hitUpdateAbsence = (
  data: Object,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.absence.editAbsence,
      data,
      (success: any) => {
        if (success.data.code === 200) {
          console.log("success ", success.data.response);
          successCallback(success.data.response);
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
