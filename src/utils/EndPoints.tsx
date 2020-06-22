import Config from "react-native-config";
import CommonFunctions from "./CommonFunctions";
const GoogleAPI = Config.GOOGLE_KEY;
export default {
  auth: {
    login: "/api/v1/parent/login",
    searchCentres: (query: string) =>
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleAPI}&input=${query}&sessiontoken=1234567890`,
    centreCoordinates: (place_id: string) =>
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${GoogleAPI}`,
    nearByCentres: (lat: number, lon: number) =>
      `/api/v1/parent/nearbycenter?latitude=${lat}&longitude=${lon}`,
    centerList: (email: string) =>
      `/api/v1/parent/centers-by-email?email=${email}`,
    fetchAllCenters: `/api/v1/parent/centers`,
    register: "/api/v1/parent/register",
    resendCode: "/api/v1/parent/resend-access-code",
    verifyCode: "/api/v1/parent/verify-access-code",
    createPassword: "/api/v1/parent/create-password",
    forgotPassword: "/api/v1/parent/forgot-password",
    verifyPincode: "/api/v1/parent/verify-pincode",
    resetPassword: "/api/v1/parent/reset-password",
    needHelp: "/api/v1/parent/need-help",
    testimonials: "/api/v1/parent/testimonials",
    scheduleTour: "/api/v1/parent/schedule-tour",
    logout: "/api/v1/parent/logout",
  },
  home: {
    HomeData: (
      child_id?: number,
      page?: number,
      activity?: any,
      fromDate?: string,
      toDate?: string,
      type?: string,
      searchKey?: string
    ) =>
      `/api/v1/parent/home-data?page=${page}${
        CommonFunctions.isNullUndefined(activity) || child_id === 0
          ? ""
          : `&child_id=${child_id}`
      }${
        CommonFunctions.isNullUndefined(activity)
          ? ""
          : `&activity_value_id=${activity}`
      }${
        CommonFunctions.isNullUndefined(fromDate)
          ? ""
          : `&from_date=${fromDate}`
      }${CommonFunctions.isNullUndefined(toDate) ? "" : `&to_date=${toDate}`}${
        CommonFunctions.isNullUndefined(type) ? "" : `&type=${type}`
      }${
        CommonFunctions.isNullUndefined(searchKey)
          ? ""
          : `&searchKey=${searchKey}`
      }`,
    filterData: (classroom: number) =>
      classroom === 0
        ? `/api/v1/parent/filter-data`
        : `/api/v1/parent/filter-data?classroom_id=${classroom}`,
    weDidIt: `/api/v1/parent/we-did-it`,
  },
  attendance: {
    viewAttendance: (type: string, id: number, date: string) =>
      id === 0
        ? `/api/v1/parent/attendance?type=${type}&date=${date}`
        : `/api/v1/parent/attendance?type=${type}&child_id=${id}&date=${date}`,
  },
  photoLibrary: {
    gallery: (childID: number, page: number) =>
      childID === 0
        ? `/api/v1/parent/photo-gallery`
        : `/api/v1/parent/photo-gallery?child_id=${childID}&page=${page}`,
  },
  drawer: {
    announcement: (childID: number, page: number) =>
      childID === 0
        ? `/api/v1/parent/list-announcement`
        : `/api/v1/parent/list-announcement?child_id=${childID}&page=${page}`,
  },
};
