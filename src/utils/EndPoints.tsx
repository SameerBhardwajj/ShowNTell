import Config from "react-native-config";
const GoogleAPI = Config.GOOGLE_KEY;
export default {
  auth: {
    login: "/api/v1/parent/login",
    searchCentres: (query: string) =>
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleAPI}&input=${query}&sessiontoken=1234567890`,
    centreCoordinates: (place_id: string) =>
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${GoogleAPI}`,
    nearByCentres: (lat: number, lon: number, page: number) =>
      `/api/v1/parent/nearbycenter?latitude=${lat}&longitude=${lon}&page=${page}`,
    centerList: (email: string) =>
      `/api/v1/parent/centers-by-email?email=${email}`,
    fetchAllCenters: (page: number) => `/api/v1/parent/centers?page=${page}`,
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
    HomeData: (child_id: number, page: number) =>
      child_id === 0
        ? `/api/v1/parent/home-data`
        : `/api/v1/parent/home-data?child_id=${child_id}&page=${page}`,
    filterData: (classroom: number) =>
      `/api/v1/parent/filter-data?classroom_id=${classroom}`,
  },
  attendance: {
    viewAttendance: (type: string, id: number, date: string) =>
      id === 0
        ? `/api/v1/parent/attendance?type=${type}&date=${date}`
        : `/api/v1/parent/attendance?type=${type}&child_id=${id}&date=${date}`,
  },
};
