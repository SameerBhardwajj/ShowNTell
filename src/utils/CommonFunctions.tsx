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

const dateTypeFormat = (date: Date, format: string) => {
  let d = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  let m = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}`;
  let y = date.getFullYear();
  let myDate;
  format === "dmy"
    ? (myDate = `${d}-${m}-${y}`)
    : format === "mdy"
    ? (myDate = `${m}-${d}-${y}`)
    : (myDate = `${y}-${m}-${d}`);
  return myDate;
};

const timeFormatter = (date: Date) => {
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const min = date.getMinutes();
  const time = date.getHours() > 12 ? "pm" : "am";
  return `${hour < 10 ? "0" + hour : hour}:${
    min < 10 ? "0" + min : min
  } ${time}`;
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
        failureCallback(error);
        // console.warn(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  }
};

const binarySearch = (needle: string, haystack: Array<any>) => {
  if (needle === "") return [];
  const haystackLength = haystack.length;
  let letterNumber = needle.length;
  needle = needle.toLowerCase();

  /* start binary search, Get middle position */
  let getElementPosition = findElement();

  /* get interval and return result array */
  if (getElementPosition == -1) return [];
  return findRangeElement();

  // find middle position
  function findElement() {
    if (typeof haystack === "undefined" || !haystackLength) return -1;

    var high = haystack.length - 1;
    var low = 0;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      var element = haystack[mid].name.substr(0, letterNumber);
      element = element.toLowerCase();

      if (element > needle) {
        high = mid - 1;
      } else if (element < needle) {
        low = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }

  // searching
  function findRangeElement() {
    let start: number = 0,
      end: number = 0;
    for (let i = getElementPosition; i > 0; i--) {
      var element = haystack[i].name.substr(0, letterNumber).toLowerCase();
      if (element != needle) {
        start = i + 1;
        break;
      } else {
        start = 0;
      }
    }
    for (let i = getElementPosition; i < haystackLength; i++) {
      var element = haystack[i].name.substr(0, letterNumber).toLowerCase();
      if (element != needle) {
        end = i;
        break;
      } else {
        end = haystackLength - 1;
      }
    }
    var result = [];
    for (let i = start; i < end; i++) {
      result.push(haystack[i]);
    }

    return result;
  }
};

const isNullUndefined = (item: any) => {
  try {
    if (item == null || item == "" || item == 0 || item == undefined) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return true;
  }
};

export default {
  DateDifference,
  DateFormatter,
  requestLocationPermission,
  binarySearch,
  timeFormatter,
  dateTypeFormat,
  isNullUndefined,
};
