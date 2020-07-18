import moment from "moment";
import { Platform, PermissionsAndroid, Linking } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";
import CustomToast from "../Components/CustomToast";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

const DateDifference = (date1: any, date2: any) => {
  let second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  date1 = new Date(date1);
  date2 = new Date(date2);
  let timediff = date2 - date1;
  if (isNaN(timediff)) return -1;
  else if (timediff < 0) return -1;
  else return Math.floor(timediff / day) + 1;
};

const DateFormatter = (date: Date) => {
  let myDate = new Date(date);
  const wMonths = [
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
  let month = myDate.getMonth();
  return `${wMonths[month]} ${myDate.getDate()}, ${myDate.getFullYear()}`;
};

const DateMonthFormatter = (date: Date) => {
  const wMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = date.getMonth();
  return `${wMonths[month]}, ${date.getFullYear()}`;
};

const dateTypeFormat = (date: string, format: string) => {
  let testDateUtc = moment.utc(date);
  let myDate;
  format === "dmy"
    ? (myDate = moment(testDateUtc).local().format("DD-MM-YYYY"))
    : format === "mdy"
    ? (myDate = moment(testDateUtc).local().format("MM-DD-YYYY"))
    : (myDate = moment(testDateUtc).local().format("YYYY-MM-DD"));
  return myDate;
};

const timeFormatter = (date: Date) => {
  let testDateUtc = moment.utc(date);
  let localTime = moment(testDateUtc).local().format("hh:mm A");
  return localTime;
};

const timeConverter = (time: string) => {
  let testDateUtc = moment(time, "hh:mm:ss");
  let localTime = moment(testDateUtc).format("h:mm A");
  return localTime;
};

const dayDateFormatter = (date: Date) => {
  let testDateUtc = moment.utc(date).local().format("MM-DD-YYYY");
  let LocalDay = null;
  moment(new Date()).format("MM-DD-YYYY") === testDateUtc
    ? (LocalDay = "Today")
    : null;
  moment(new Date()).add(-1, "days").format("MM-DD-YYYY") === testDateUtc
    ? (LocalDay = "Yesterday")
    : null;
  return LocalDay;
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
    console.warn("no permisssion");

    permissionError();
  }
  if (hasPermission) {
    console.warn("permission granted");

    Geolocation.getCurrentPosition(
      (info) => {
        console.warn("get position", info);

        let position = {
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        };
        successCallback(position);
      },
      (error) => {
        console.warn("err ", error);

        failureCallback(error);
        // console.warn(error);
      },
      { enableHighAccuracy: false, timeout: 20000 }
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

const isEmpty = (obj: object) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
const callNumber = (phone: number) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber: string;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        CustomToast("Phone number is not supported");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => CustomToast(err));
};

const handleError = (error: any) => {
  if (error.message === "Network Error" || error.code === "ECONNABORTED") {
  } else {
    CustomToast(error.response.data.message);
  }
};

const saveToCameraRoll = async (
  image: string,
  successCallback: Function,
  failureCallback: Function
) => {
  let permission;
  if (Platform.OS === "android") {
    permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (!permission) {
      Linking.openSettings();
    }
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: "jpg",
      })
        .fetch("GET", image)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(() => successCallback())
            .catch((err) => failureCallback(err));
        });
    }
  } else {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            CustomToast("This feature is not available on this device");
            break;
          case RESULTS.DENIED:
            CustomToast(
              "Permission denied! Please provide access to Photo Library"
            );
            break;
          case RESULTS.GRANTED:
            CameraRoll.saveToCameraRoll(image)
              .then(() => successCallback())
              .catch((error) => CustomToast(error));
            break;
          case RESULTS.BLOCKED:
            Linking.openSettings();
            break;
        }
      })
      .catch((error) => {
        CustomToast(error);
      });
  }
};

export default {
  DateDifference,
  DateFormatter,
  requestLocationPermission,
  timeFormatter,
  timeConverter,
  dayDateFormatter,
  binarySearch,
  dateTypeFormat,
  isNullUndefined,
  DateMonthFormatter,
  isEmpty,
  callNumber,
  handleError,
  saveToCameraRoll,
};
