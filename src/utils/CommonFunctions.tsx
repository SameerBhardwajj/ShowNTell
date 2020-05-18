import moment from "moment";

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

export default {
  DateDifference,
  DateFormatter,
};
