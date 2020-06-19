import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  CommonFunctions,
  ScreenName,
} from "../../utils";
import { CustomButton, CustomHeader, CustomLoader } from "../../Components";
import { updateTab } from "../Home/action";
import { viewAttendance } from "./action";
import AttendanceList from "./AttendanceList";
import AttendanceMonth from "./AttendanceMonth";

const iPhoneX = Dimensions.get("window").height >= 812;
const DATE_TYPE = "by_date";
const MONTH_TYPE = "by_month";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [viewByDate, setViewByDate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { tab, otherCurrentChild, data } = useSelector(
    (state: { Home: any; Attendance: any }) => ({
      tab: state.Home.tab,
      otherCurrentChild: state.Home.otherCurrentChild,
      data: state.Attendance.data,
    })
  );

  useEffect(() => {
    // dispatch(updateTab(true, () => {}));

    setLoading(true);
    hitAttendance();
  }, [otherCurrentChild, viewByDate]);

  const hitAttendance = () => {
    dispatch(
      viewAttendance(
        viewByDate ? DATE_TYPE : MONTH_TYPE,
        otherCurrentChild.child,
        CommonFunctions.dateTypeFormat(date, "ymd"),
        () => {
          {
            setLoading(false), setRefreshing(false);
          }
        },
        () => {
          {
            setLoading(false), setRefreshing(false);
          }
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <AttendanceList
        index={index}
        item={item}
        currentChild={otherCurrentChild.child}
        allData={data}
      />
    );
  };

  const renderMonthItem = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <AttendanceMonth
        index={index}
        item={item}
        currentChild={otherCurrentChild.child}
        allData={data}
        onPressAbsence={() =>
          props.navigation.navigate(ScreenName.ABSENCE_NOTIFICATION_MODAL, {
            item: item,
          })
        }
      />
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        hideBackButton={true}
        title={Strings.Attendance}
        onPressBack={() => {}}
        child={true}
        navigation={props.navigation}
      />
      <CustomLoader loading={isLoading} />
      {/* view by date and month ------------------ */}
      <View style={Styles.viewByView}>
        <View style={Styles.mainViewBy}>
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
        <View style={Styles.mainViewBy}>
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
      {/* View by Date ------------------------- */}
      {viewByDate ? (
        <View style={Styles.monthView}>
          {isLoading ? null : (
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={Styles.headingView}>
                    {otherCurrentChild.child === 0 ? null : data.length ===
                      0 ? null : (
                      <Text style={Styles.attendenceHeading}>
                        {data[0].classroom_name}
                      </Text>
                    )}
                    <View style={Styles.attenanceView}>
                      <Text style={Styles.attendenceHeading}>
                        {CommonFunctions.DateFormatter(currentDate)}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={Styles.calenderStyle}
                        onPress={() => setModalOpen(true)}
                      >
                        <Image
                          source={Images.Calendar_Icon}
                          style={{ padding: 13 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              data={data}
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              onRefresh={() => {
                setRefreshing(true), hitAttendance();
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
          )}
        </View>
      ) : (
        <View style={Styles.monthView}>
          {/* View by Month ------------------------- */}
          {isLoading ? null : (
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={Styles.headingView}>
                    {otherCurrentChild.child === 0 ? null : data.length ===
                      0 ? null : (
                      <Text style={Styles.attendenceHeading}>
                        {data[0].classroom_name}
                      </Text>
                    )}
                    <View style={Styles.attenanceView}>
                      <Text style={Styles.attendenceHeading}>
                        {CommonFunctions.DateMonthFormatter(currentMonth)}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={Styles.calenderStyle}
                        onPress={() => setModalOpen(true)}
                      >
                        <Image
                          source={Images.Calendar_Icon}
                          style={{ padding: 13 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              data={data}
              refreshing={isRefreshing}
              onRefresh={() => {
                setRefreshing(true), hitAttendance();
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMonthItem}
            />
          )}
          {/* absence -------------------------------------------- */}
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <TouchableOpacity
          style={Styles.topModalView}
          onPress={() => setModalOpen(false)}
        />
        <View style={Styles.modalView}>
          <DatePicker
            maximumDate={new Date()}
            date={date}
            mode="date"
            onDateChange={(text: Date) => {
              setDate(text);
            }}
          />
          <CustomButton
            Text="Set Date"
            onPress={() => {
              viewByDate ? setCurrentDate(date) : setCurrentMonth(date),
                hitAttendance(),
                setModalOpen(false);
            }}
          />
        </View>
      </Modal>
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
  viewByView: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.fadedPink,
    borderBottomLeftRadius: vh(15),
    borderBottomRightRadius: vh(15),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mainViewBy: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
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
  headingView: {
    paddingTop: vh(16),
    paddingHorizontal: vw(16),
  },
  attenanceView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
  attendenceDate: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
    marginVertical: vh(8),
    marginLeft: vw(16),
    alignSelf: "flex-start",
  },
  monthView: {
    width: "100%",
    marginBottom: vh(20),
    flex: 1,
  },
  topModalView: {
    width: "100%",
    flex: 0.65,
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    flex: 0.35,
    paddingVertical: vh(30),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
});
