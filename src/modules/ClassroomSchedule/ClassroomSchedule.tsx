import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { hitClassScheduleAPI } from "./action";
import { CustomHeader, CustomNoData, CustomLoader } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  Images,
  CommonFunctions,
} from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { classroomChild, loginData, data } = useSelector(
    (state: { ClassroomSchedule: any; Login: any }) => ({
      classroomChild: state.ClassroomSchedule.classroomChild,
      loginData: state.Login.loginData,
      data: state.ClassroomSchedule.data,
    })
  );
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    setLoading(true);
    dispatch(
      hitClassScheduleAPI(
        classroomChild.classroom,
        () => {
          setLoading(false);
        },
        (e: any) => {
          setLoading(false);
          console.warn("e ", e);
        }
      )
    );
  }, [classroomChild]);

  const bgColor = (index: number) => {
    return index % 3 === 0
      ? Colors.lightPink
      : index % 2 === 0
      ? Colors.lightGreen
      : Colors.lightWaterBlue;
  };

  const newColor = (index: number) => {
    return index % 3 === 0
      ? Colors.pink
      : index % 2 === 0
      ? Colors.green
      : Colors.waterBlue;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Class_Schedule}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
        child={false}
      />
      <TouchableOpacity
        activeOpacity={loginData.Children.length > 1 ? 0.8 : 1}
        style={Styles.childHeader}
        onPress={() =>
          loginData.Children.length > 1
            ? props.navigation.navigate(ScreenName.SCHEDULE_CHILD_MODAL, {
                child: loginData.Children,
              })
            : null
        }
      >
        <Text style={Styles.childHeaderText}>{classroomChild.name}</Text>
        {loginData.Children.length > 1 ? (
          <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
        ) : null}
      </TouchableOpacity>
      {isLoading ? (
        <CustomLoader loading={isLoading} />
      ) : CommonFunctions.isNullUndefined(data) ? (
        <CustomNoData />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {data.map((item: any, index: number) => (
            <View style={Styles.innerView}>
              <View
                style={[
                  Styles.headingView,
                  { backgroundColor: newColor(index + 1) },
                ]}
              >
                <Text style={Styles.heading}>
                  {CommonFunctions.timeConverter(item.begin_time)}
                  {Strings.to}
                  {CommonFunctions.timeConverter(item.end_time)}
                </Text>
              </View>
              <View
                style={[
                  Styles.contentView,
                  { backgroundColor: bgColor(index + 1) },
                ]}
              >
                <Text style={[Styles.content, { color: newColor(index + 1) }]}>
                  {item.Schedule.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    borderRadius: vh(10),
    paddingHorizontal: vh(16),
    marginVertical: vh(12),
  },
  headingView: {
    paddingVertical: vh(10),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
  },
  childHeader: {
    paddingVertical: vh(2),
    paddingHorizontal: vw(15),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    right: vw(20),
    top: vh(40),
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  dropdown: {
    height: vh(8),
    width: vh(14),
    marginHorizontal: vw(5),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: "white",
  },
  contentView: {
    paddingVertical: vh(20),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: vh(10),
    borderBottomRightRadius: vh(10),
  },
  content: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
  },
});
