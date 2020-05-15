import Config from "react-native-config";
const GoogleAPI = Config.GOOGLE_KEY;
export default {
  auth: {
    login: "/v1/parent/login",
    searchCentres: (query: string) =>
      `?key=${GoogleAPI}&cx=017576662512468239146:omuauf_lfve&q=${query}`,
    nearByCentres: (lat: number, lon: number, page: number) =>
      `/v1/parent/nearbycenter?latitude=${lat}&longitude=${lon}&page=${page}`,
  },
};
