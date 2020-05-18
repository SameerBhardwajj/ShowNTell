import Config from "react-native-config";
const GoogleAPI = Config.GOOGLE_KEY;
export default {
  auth: {
    login: "/v1/parent/login",
    searchCentres: (query: string) =>
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GoogleAPI}`,
    nearByCentres: (lat: number, lon: number, page: number) =>
      `/v1/parent/nearbycenter?latitude=${lat}&longitude=${lon}&page=${page}`,
    centerList: "/v1/parent/centers",
  },
};
