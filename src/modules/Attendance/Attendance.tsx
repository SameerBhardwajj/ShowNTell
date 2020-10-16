import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
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
import {
  CustomButton,
  CustomHeader,
  CustomLoader,
  CustomNoData,
} from "../../Components";
import { viewAttendanceAPI } from "./action";
import AttendanceList from "./AttendanceList";
import AttendanceMonth from "./AttendanceMonth";

const DATE_TYPE = "by_date";
const MONTH_TYPE = "by_month";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [viewByDate, setViewByDate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [defaultMonth, setDefaultMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { currentChild, monthData, dateData } = useSelector(
    (state: { Home: any; Attendance: any }) => ({
      currentChild: state.Home.currentChild,
      monthData: state.Attendance.monthData,
      dateData: state.Attendance.dateData,
    })
  );

  useEffect(() => {
    let focusListener = props.navigation.addListener("focus", () => {
      hitAttendance();
    });
    monthData.length === 0 || dateData.length === 0 ? setLoading(true) : null;
    return focusListener;
  }, [props.navigation, currentChild, viewByDate]);

  const hitAttendance = (value?: boolean) => {
    dispatch(
      viewAttendanceAPI(
        CommonFunctions.isNullUndefined(value)
          ? viewByDate
            ? DATE_TYPE
            : MONTH_TYPE
          : value
            ? DATE_TYPE
            : MONTH_TYPE,
        currentChild.child,
        CommonFunctions.isNullUndefined(value)
          ? viewByDate
            ? CommonFunctions.dateTypeFormat(
              defaultDate.toLocaleDateString(),
              "ymd"
            )
            : CommonFunctions.dateTypeFormat(
              defaultMonth.toLocaleDateString(),
              "ymd"
            )
          : value
            ? CommonFunctions.dateTypeFormat(
              defaultDate.toLocaleDateString(),
              "ymd"
            )
            : CommonFunctions.dateTypeFormat(
              defaultMonth.toLocaleDateString(),
              "ymd"
            ),
        () => {
          setLoading(false), setRefreshing(false);
        },
        () => {
          setLoading(false), setRefreshing(false);
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
        currentChild={currentChild.child}
        allData={dateData}
        onPressAbsence={() =>
          props.navigation.navigate(ScreenName.ABSENCE_NOTIFICATION_MODAL, {
            item: item,
          })
        }
      />
    );
  };

  const renderMonthItem = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <AttendanceMonth
        index={index}
        item={item}
        currentChild={currentChild.child}
        allData={monthData}
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
        onPressBack={() => { }}
        child={true}
        navigation={props.navigation}
      />

      {/* view by date and month ------------------ */}
      <View style={Styles.viewByView}>
        <View style={Styles.mainViewBy}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setViewByDate(true);
              hitAttendance(true);
            }}
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
            onPress={() => {
              setViewByDate(false);
              hitAttendance(false);
            }}
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
      <View style={Styles.headingView}>
        {currentChild.child === 0 || dateData.length === 0 ? null : (
          <Text style={Styles.attendenceHeading}>
            {dateData[0].classroom_name}
          </Text>
        )}
        <View style={Styles.attenanceView}>
          <Text style={Styles.attendenceHeading}>
            {viewByDate
              ? CommonFunctions.DateFormatter(currentDate)
              : CommonFunctions.DateMonthFormatter(currentMonth)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.calenderStyle}
            onPress={() => setModalOpen(true)}
          >
            <Image
              source={Images.Calendar_Icon}
              style={{ padding: 13, height: vh(21), width: vh(21) }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {viewByDate ? (
        <View style={Styles.monthView}>
          {isLoading ? (
            <CustomLoader loading={isLoading} />
          ) : dateData.length === 0 ? (
            <CustomNoData />
          ) : (
                <FlatList
                  data={dateData}
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
            {isLoading ? (
              <CustomLoader loading={isLoading} />
            ) : monthData.length === 0 ? (
              <CustomNoData />
            ) : (
                  <FlatList
                    data={monthData}
                    refreshing={isRefreshing}
                    onRefresh={() => {
                      setRefreshing(true), hitAttendance();
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMonthItem}
                  />
                )}
          </View>
        )}

      {/* absence -------------------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <TouchableOpacity
          style={Styles.topModalView}
          onPress={() => setModalOpen(false)}
        />
        <View style={Styles.modalView}>
          <DatePicker
            minimumDate={new Date(2000, 1)}
            maximumDate={new Date()}
            date={viewByDate ? defaultDate : defaultMonth}
            mode="date"
            onDateChange={(text: Date) => {
              viewByDate ? setDefaultDate(text) : setDefaultMonth(text);
            }}
          />
          <CustomButton
            Text="Set Date"
            onPress={() => {
              viewByDate
                ? setCurrentDate(defaultDate)
                : setCurrentMonth(defaultMonth),
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
    paddingHorizontal: vw(16),
    alignSelf: "flex-start",
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
    paddingHorizontal: vw(25),
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
