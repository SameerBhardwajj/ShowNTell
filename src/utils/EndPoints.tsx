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
    getSlotDate: (id: number) => `/schedule-a-tour/dates.json?calendarID=${id}`,
    getSlotTime: (id: number, date: string) =>
      `/schedule-a-tour/get_times.json?calendarID=${id}&date=${date}`,
    scheduleTour: "/api/v1/parent/schedule-tour",
    scheduleTourByClient: {
      leadAPIAdd: "/leads/api_add/1/respond:0",
      appointment: `/schedule-a-tour/appointment.json`,
      leadAPIUpdate: `/leads/api_update/606706/respond:0`,
    },
    logout: "/api/v1/parent/logout",
  },
  home: {
    HomeData: (
      currentTime: string,
      child_id?: number,
      page?: number,
      activity?: any,
      fromDate?: string,
      toDate?: string,
      type?: string,
      searchKey?: string
    ) =>
      `/api/v1/parent/home-data?currentTime=${currentTime}&page=${page}${
        CommonFunctions.isNullUndefined(activity)
          ? ""
          : `&activity_value_id=${activity}`
      }${
        CommonFunctions.isNullUndefined(child_id) || child_id === 0
          ? ""
          : `&child_id=${child_id}`
      }${
        CommonFunctions.isNullUndefined(fromDate)
          ? ""
          : `&from_date=${fromDate}`
      }${CommonFunctions.isNullUndefined(type) ? "" : `&type=${type}`}${
        CommonFunctions.isNullUndefined(toDate) ? "" : `&to_date=${toDate}`
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
  notification: {
    notification: (page: number) =>
      `/api/v1/parent/list-notification?page=${page}`,
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
        ? `/api/v1/parent/photo-gallery?page=${page}`
        : `/api/v1/parent/photo-gallery?child_id=${childID}&page=${page}`,
  },
  drawer: {
    announcement: (childID: number, page: number) =>
      childID === 0
        ? `/api/v1/parent/list-announcement?page=${page}`
        : `/api/v1/parent/list-announcement?child_id=${childID}&page=${page}`,
    qotd: (current_date_time: string, child_id?: number, type?: string) =>
      `/api/v1/parent/list-question-of-the-day?current_date_time=${current_date_time}${
        CommonFunctions.isNullUndefined(child_id) || child_id === 0
          ? ""
          : `&child_id=${child_id}`
      }${CommonFunctions.isNullUndefined(type) ? "" : `&type=${type}`}`,
    profileDetails: `/api/v1/parent/get-basic-detail`,
    updateProfile: `/api/v1/parent/update-basic-detail`,
    classroomSchedule: (classID: number) =>
      `/api/v1/parent/classroom-schedule?classroom_id=${classID}`,
    fetchStates: `/api/v1/parent/states`,
    uploadImage: {
      uploadCDN: `/api/v1/parent/image/upload`,
      uploadProfileImage: `/api/v1/parent/profile-image`,
    },
    chat: {
      cannedMsg: `/api/v1/parent/chat-canned-messages`,
      sendMsg: `/api/v1/parent/send-message`,
      getMsg: (type: string, timestamp: string) =>
        `/api/v1/parent/get-chat-message?type=${type}&timestamp=${timestamp}`,
    },
    statement: (page: number, from_date?: string, to_date?: string) =>
      `/api/v1/parent/statement?page=${page}${
        CommonFunctions.isNullUndefined(from_date)
          ? ""
          : `&from_date=${from_date}`
      }${
        CommonFunctions.isNullUndefined(to_date) ? "" : `&to_date=${to_date}`
      }`,
  },
};
