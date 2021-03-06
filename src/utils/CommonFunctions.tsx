import moment from "moment";
import { Platform, PermissionsAndroid, Linking, Dimensions } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import CustomToast from "../Components/CustomToast";
import NetInfo from "@react-native-community/netinfo";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Strings from "./Strings";

const DateDifference = (date1: any, date2: any) => {
  let second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  date1 = new Date(date1);
  date2 = new Date(date2);

  let timediff = date2 - date1;

  if (isNaN(timediff)) return -1;
  else if (timediff < 1) return 1;
  else return Math.ceil(timediff / day) + 1;
};

const DateFormatter = (date: Date) => {
  return moment(date).format("MMM DD, YYYY");
};

const DateMonthFormatter = (date: Date) => {
  return moment(date).format("MMMM, YYYY");
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
    permissionError();
  }
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      (info) => {
        let position = {
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        };
        successCallback(position);
      },
      (error) => {
        failureCallback(error);
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
  } else if (error.response.data.message === undefined) {
    CustomToast("Server Error: Something went wrong !");
  } else {
    CustomToast(error.response.data.message);
  }
};

const netInfo = () => {
  let status = false;
  NetInfo.fetch().then((connection) => {
    status = connection.isConnected;
  });
  return status;
};

const getBadgeCount = () => {
  let badge = 0;
  PushNotificationIOS.getApplicationIconBadgeNumber((badgeCount) => {
    badge = badgeCount;
  });
  return badge !== 0;
};

const htmlParser = (data: string) => {
  let cleanText = data.replace(/<\/?[^>]+(>|$)/g, "");
  return cleanText;
};

const getLink = (data: string) => {
  let cleanText = data.replace(/<\/?[^>]+(>|$)/g, "");
  let link = cleanText.match(/ *\b\S*?http\S*\b/g);
  return link;
};

const onPressLink = (item: any) => {
  let link: any = getLink(item);
  link = link.join("").trim();
  isNullUndefined(link)
    ? null
    : Linking.canOpenURL(link)
      .then((supported: boolean) => {
        if (supported) {
          return Linking.openURL(link).catch(() =>
            CustomToast(Strings.URL_Unsupported)
          );
        }
      })
      .catch(() => {
        CustomToast(Strings.URL_Unsupported);
      });
};

const clearAllPush = () => {
  Platform.OS === "ios"
    ? PushNotificationIOS.removeAllDeliveredNotifications()
    : PushNotification.cancelAllLocalNotifications();
};

const iPhoneX = Dimensions.get("window").height >= 812;

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
  netInfo,
  getBadgeCount,
  htmlParser,
  getLink,
  onPressLink,
  clearAllPush,
  iPhoneX
};
