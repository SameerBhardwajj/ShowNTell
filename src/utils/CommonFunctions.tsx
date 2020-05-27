import moment from "moment";
import { Platform, PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";

const DateDifference = (date1: any, date2: any) => {
  let second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  date1 = new Date(date1);
  date2 = new Date(date2);
  let timediff = date2 - date1;
  if (isNaN(timediff)) return 0;
  else return Math.floor(timediff / day) + 1;
};

const DateFormatter = (date: Date) => {
  let wMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = date.getMonth();
  return `${wMonths[month]} ${date.getDate()}, ${date.getFullYear()}`;
};

const requestLocationPermission = async (
  successCallback: Function,
  failureCallback: Function,
  permissionError: Function
) => {
  let hasPermission = true;
  if (Platform.OS === "android") {
    hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (!hasPermission) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
    }
  }
  if (!hasPermission) {
    permissionError();
  }
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      (info) => {
        let position = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        successCallback(position);
      },
      (error) => {
        failureCallback(error.code);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  }
};

export default {
  DateDifference,
  DateFormatter,
  requestLocationPermission,
};
