import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

// custom imports
import { useDispatch, useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings } from "../../utils";

const iPhoneX = Dimensions.get("window").height >= 812;

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [viewByDate, setViewByDate] = useState(true);

  return (
    <View style={Styles.mainView}>
      <View style={Styles.extraHeader} />
      <View style={Styles.headerView}>
        <Text style={Styles.headerText}>{Strings.Attendance}</Text>
        <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
          <Text style={Styles.childHeaderText}>Alex </Text>
          <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
        </TouchableOpacity>
      </View>
      <View style={Styles.viewByView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setViewByDate(true)}
            style={Styles.redioBtn}
          >
            {viewByDate ? (
              <Image
                source={Images.Radio_Button_Selected}
                style={{ padding: vh(10) }}
              />
            ) : (
              <Image
                source={Images.Radio_Button_Unselected}
                style={{ padding: vh(10) }}
              />
            )}
          </TouchableOpacity>
          <Text style={Styles.viewByText}>{Strings.View_by_Date}</Text>
        </View>
        <View style={Styles.separator} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setViewByDate(false)}
            style={Styles.redioBtn}
          >
            {viewByDate ? (
              <Image
                source={Images.Radio_Button_Unselected}
                style={{ padding: vh(10) }}
              />
            ) : (
              <Image
                source={Images.Radio_Button_Selected}
                style={{ padding: vh(10) }}
              />
            )}
          </TouchableOpacity>
          <Text style={Styles.viewByText}>{Strings.View_by_Month}</Text>
        </View>
      </View>
      {viewByDate ? (
        <View style={{ alignItems: "center", width: "100%" }}>
          <View style={Styles.attenanceView}>
            <Text style={Styles.attendenceHeading}>Feb 27, 2020</Text>
            <TouchableOpacity activeOpacity={0.8} style={Styles.calenderStyle}>
              <Image source={Images.Calendar_Icon} style={{ padding: 13 }} />
            </TouchableOpacity>
          </View>
          <View style={Styles.timeView}>
            <View style={Styles.inTimeView}>
              <Image source={Images.In_Time_Icon} />
              <Text style={Styles.inTimeText}>In Time</Text>
              <Text style={Styles.inTime}>10:15 AM</Text>
            </View>
            <View style={Styles.separatorView} />
            <View style={Styles.inTimeView}>
              <Image source={Images.Out_Time_Icon} />
              <Text style={Styles.inTimeText}>Out Time</Text>
              <Text style={Styles.inTime}>10:15 AM</Text>
            </View>
          </View>
          <View style={Styles.timeView}>
            <View style={Styles.inTimeView}>
              <Image source={Images.In_Time_Icon} />
              <Text style={Styles.inTimeText}>In Time</Text>
              <Text style={Styles.inTime}>10:15 AM</Text>
            </View>
            <View style={Styles.separatorView} />
            <View style={Styles.inTimeView}>
              <Image source={Images.Out_Time_Icon} />
              <Text style={Styles.inTimeText}>Out Time</Text>
              <Text style={Styles.inTime}>10:15 AM</Text>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={Styles.attenanceView}>
              <Text style={Styles.attendenceHeading}>February, 2020</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.calenderStyle}
              >
                <Image source={Images.Calendar_Icon} style={{ padding: 13 }} />
              </TouchableOpacity>
            </View>
            <Text style={Styles.attendenceDate}>Feb 27, Friday</Text>
            <View style={Styles.timeView}>
              <View style={Styles.inTimeView}>
                <Image source={Images.In_Time_Icon} />
                <Text style={Styles.inTimeText}>In Time</Text>
                <Text style={Styles.inTime}>10:15 AM</Text>
              </View>
              <View style={Styles.separatorView} />
              <View style={Styles.inTimeView}>
                <Image source={Images.Out_Time_Icon} />
                <Text style={Styles.inTimeText}>Out Time</Text>
                <Text style={Styles.inTime}>10:15 AM</Text>
              </View>
            </View>
            <View style={Styles.timeView}>
              <View style={Styles.inTimeView}>
                <Image source={Images.In_Time_Icon} />
                <Text style={Styles.inTimeText}>In Time</Text>
                <Text style={Styles.inTime}>10:15 AM</Text>
              </View>
              <View style={Styles.separatorView} />
              <View style={Styles.inTimeView}>
                <Image source={Images.Out_Time_Icon} />
                <Text style={Styles.inTimeText}>Out Time</Text>
                <Text style={Styles.inTime}>10:15 AM</Text>
              </View>
            </View>
            <View style={Styles.finalSeparator} />
            <View style={Styles.absenceMainView}>
              <Text style={[Styles.attendenceDate, { marginLeft: 0 }]}>
                Feb 26, Friday
              </Text>
              <View style={Styles.absenceView}>
                <TouchableOpacity
                  style={Styles.absentIcon}
                  activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate("AbsenceNotificationModal")
                  }
                >
                  <Image
                    source={Images.Absent_Icon}
                    style={{ padding: vh(25) }}
                  />
                </TouchableOpacity>
                <Text style={Styles.absenceText}>
                  {Strings.Absence_Notification}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  extraHeader: {
    backgroundColor: Colors.violet,
    width: "100%",
    height: iPhoneX ? vh(10) : 0,
  },
  headerView: {
    backgroundColor: Colors.violet,
    alignItems: "center",
    justifyContent: "center",
    height: vh(70),
    width: "100%",
    paddingTop: vh(20),
    flexDirection: "row",
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: "white",
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    right: vw(16),
    top: vh(33),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: vh(2),
    tintColor: Colors.violet,
  },
  viewByView: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.fadedPink,
    borderBottomLeftRadius: vh(15),
    borderBottomRightRadius: vh(15),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  viewByText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightBlack,
    paddingVertical: vh(27),
  },
  redioBtn: {
    height: vh(20),
    width: vh(20),
    alignItems: "center",
    justifyContent: "center",
    padding: vh(20),
  },
  separator: {
    width: vh(1),
    height: "60%",
    backgroundColor: Colors.darkFadedPink,
  },
  attenanceView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: vh(16),
    paddingHorizontal: vw(16),
    paddingBottom: vh(8),
  },
  attendenceHeading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
  },
  calenderStyle: {
    height: vh(30),
    width: vh(30),
    alignItems: "center",
    justifyContent: "center",
    padding: vh(20),
  },
  timeView: {
    paddingHorizontal: vw(16),
    marginVertical: vh(8),
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: vh(10),
    justifyContent: "space-around",
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
  attendenceDate: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
    marginVertical: vh(8),
    marginLeft: vw(16),
    alignSelf: "flex-start",
  },
  finalSeparator: {
    width: "90%",
    marginVertical: vh(20),
    backgroundColor: Colors.separator,
    height: vw(1),
  },
  absenceMainView: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: vw(16),
    marginBottom: vh(20),
  },
  absenceView: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.lightPink,
    borderRadius: vh(10),
    paddingTop: vh(8),
    paddingBottom: vh(28),
  },
  absenceText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    color: Colors.pink,
  },
  absentIcon: {
    height: vh(80),
    width: vh(80),
    alignItems: "center",
    justifyContent: "center",
  },
});
