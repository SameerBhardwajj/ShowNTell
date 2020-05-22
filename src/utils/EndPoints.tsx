import Config from "react-native-config";
const GoogleAPI = Config.GOOGLE_KEY;
export default {
  auth: {
    login: "/api/v1/parent/login",
    searchCentres: (query: string) =>
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GoogleAPI}`,
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
    resetPassword: "/api/v1/parent/reset-password",
    needHelp: "/api/v1/parent/need-help",
    testimonials: "https://snt-parent-api-test.mytle.com/api/v1/parent/testimonials",
  },
};
