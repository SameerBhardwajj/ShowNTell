import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { vh, Colors, Images, vw, Strings, CommonFunctions } from "../../utils";

const ATTENDANCE = "ATTENDANCE";

export interface AppProps {
  item: any;
  index: string;
  currentChild: number;
  allData: any;
  onPressAbsence: Function;
}

export default function App(props: AppProps) {
  const timeFormatter = (date: Date) => {
    return moment.utc(date).local().format("hh:mm A");
  };

  const childData = () => {
    return (
      <View style={Styles.imgView}>
        <Image
          style={Styles.img}
          resizeMethod="resize"
          resizeMode="contain"
          source={
            props.item.s3_photo_path === null
              ? Images.Profile_Placeholder
              : { uri: props.item.s3_photo_path }
          }
        />
        <View>
          <Text style={[Styles.attendenceDate, { marginVertical: 0 }]}>
            {props.item.first_name} {props.item.last_name}
          </Text>
          <Text style={[Styles.attendenceDate, { marginVertical: 0 }]}>
            {props.item.classroom_name}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.mainView}>
      {props.currentChild === 0
        ? parseInt(props.index) === 0
          ? childData()
          : props.item.first_name ===
            props.allData[parseInt(props.index) - 1].first_name
          ? null
          : childData()
        : null}
      {props.item.type === ATTENDANCE ? (
        <View style={Styles.timeView}>
          <View style={Styles.inTimeView}>
            <Image source={Images.In_Time_Icon} />
            <Text style={Styles.inTimeText}>{Strings.In_Time}</Text>
            <Text style={Styles.inTime}>
              {CommonFunctions.isNullUndefined(props.item.in_date_time)
                ? ""
                : timeFormatter(props.item.in_date_time)}
            </Text>
          </View>
          <View style={Styles.separatorView} />
          <View style={Styles.inTimeView}>
            <Image source={Images.Out_Time_Icon} />
            <Text style={Styles.inTimeText}>{Strings.Out_Time}</Text>
            <Text style={Styles.inTime}>
              {CommonFunctions.isNullUndefined(props.item.out_date_time)
                ? ""
                : timeFormatter(props.item.out_date_time)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={Styles.timeView}>
          <TouchableOpacity
            style={Styles.absenceView}
            activeOpacity={0.8}
            onPress={() => props.onPressAbsence()}
          >
            <Image source={Images.Absent_Icon} style={{ padding: vh(25) }} />
            <Text style={Styles.absenceText}>
              {Strings.Absence_Notification}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: vw(16),
  },
  attendenceDate: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
    marginVertical: vh(8),
    alignSelf: "flex-start",
    textTransform: "capitalize",
  },
  img: {
    height: vh(50),
    width: vh(50),
    borderRadius: vh(25),
    borderWidth: vw(1),
    borderColor: Colors.veryLightGrey,
    marginHorizontal: vw(10),
  },
  imgView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vh(10),
  },
  timeView: {
    marginVertical: vh(8),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    borderRadius: vh(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 4,
  },
  inTimeView: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vh(25),
    width: "50%",
  },
  inTimeText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightGrey,
    marginVertical: vh(11),
  },
  inTime: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  separatorView: {
    width: vw(1),
    height: "80%",
    backgroundColor: Colors.separator,
  },
  absenceView: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.lightPink,
    borderRadius: vh(10),
    paddingTop: vh(28),
    paddingBottom: vh(28),
  },
  absenceText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    color: Colors.pink,
    paddingTop: vh(20),
  },
});
