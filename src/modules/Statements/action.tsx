import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const updateDates = (value: Object, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.STATEMENT,
      payload: {
        date: value,
      },
    });
    callback();
  };
};

export const hitStatementApi = (
  successCallback: Function,
  failCallback: Function,
  page: number,
  from_date?: string,
  to_date?: string
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn(from_date, to_date);

    API.getApiCall(
      EndPoints.drawer.statement(page, from_date, to_date),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          const { data } = getState().Statements;
          let finalArray = [];
          page === 0
            ? (finalArray = res.rows)
            : (finalArray = data.concat(res.rows));
          dispatch({
            type: Action.STATEMENT,
            payload: {
              data: finalArray,
              page: page + 1,
            },
          });
          successCallback(res.rows);
        } else {
          page === 0
            ? dispatch({
                type: Action.STATEMENT,
                payload: {
                  data: [],
                  page: page + 1,
                },
              })
            : null;
          failCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        failCallback();
      }
    );
  };
};
