import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
  Images,
} from "../../utils";
import { hitAnnouncementAPI } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { tab, data, loginToken, loginData, currentChild } = useSelector(
    (state: { Home: any; Login: any; Announcement: any }) => ({
      tab: state.Home.tab,
      data: state.Announcement.data,
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
      currentChild: state.Home.currentChild,
    })
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    setLoading(true);
    dispatch(
      hitAnnouncementAPI(
        currentChild.child,
        0,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, [currentChild]);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Announcement}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
        child={true}
        navigation={props.navigation}
      />
      <CustomLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={Styles.scrollStyle}
      >
        {loading ? null : CommonFunctions.isNullUndefined(data) ? (
          <CustomNoData />
        ) : (
          data.map((item: any, index: number) => (
            <View style={Styles.innerView}>
              <Text style={Styles.heading}>
                {CommonFunctions.dateTypeFormat(
                  new Date().toDateString(),
                  "dmy"
                ) === CommonFunctions.dateTypeFormat(item.create_dt, "dmy")
                  ? "Today"
                  : CommonFunctions.DateFormatter(new Date(item.create_dt))}
              </Text>
              <View
                style={[
                  Styles.contentView,
                  {
                    backgroundColor:
                      index % 3 === 0
                        ? Colors.lightWaterBlue
                        : index % 2 === 0
                        ? Colors.lightPink
                        : Colors.lightGreen,
                  },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={
                      CommonFunctions.isNullUndefined(item.Child.s3_photo_path)
                        ? Images.Profile_Placeholder
                        : { uri: item.Child.s3_photo_path }
                    }
                    resizeMethod="resize"
                    resizeMode="center"
                    style={Styles.childAvatar}
                  />
                  <View
                    style={[
                      Styles.centerNameView,
                      { justifyContent: "center" },
                    ]}
                  >
                    <Text style={Styles.name}>
                      {item.Child.first_name} {item.Child.last_name}
                    </Text>
                    <Text style={Styles.classText}>
                      {item.Child.Classroom.name}
                    </Text>
                  </View>
                </View>
                <Text style={Styles.heading}>{item.Announcement.title}</Text>
                <Text style={Styles.content}>
                  {item.Announcement.description}
                </Text>
                <Text style={Styles.time}>
                  {CommonFunctions.timeFormatter(new Date(item.create_dt))}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollStyle: {
    // alignItems: "center",
    width: "100%",
    flex: 1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  childAvatar: {
    height: vh(60),
    width: vh(60),
    borderRadius: vh(30),
    marginBottom: vh(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vw(1),
    borderColor: Colors.borderGrey,
    backgroundColor: "white",
  },
  centerNameView: {
    alignItems: "flex-start",
    width: "75%",
    paddingHorizontal: vw(15),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  innerView: {
    padding: vh(16),
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contentView: {
    padding: vw(20),
    borderRadius: vh(10),
    marginTop: vh(15),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  content: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  time: {
    fontFamily: "Frutiger",
    fontSize: vh(14),
    paddingTop: vh(10),
    color: Colors.lightBlack,
  },
});

const DATA = [
  {
    date: "Today",
    content:
      "Parent workshop has been conducted in the school premisis on 07th February. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
  {
    date: "Yesterday",
    content:
      "We will be celebrating X-Mas tomorrow. Please bring some candles and be dressed up. Let’s Celebrate the festival together.",
    time: "10:00 AM",
  },
  {
    date: "Jan 20, 2020",
    content:
      "Parent workshop has been conducted in the school premisis on 27th january. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
  {
    date: "",
    content:
      "Parent workshop has been conducted in the school premisis on 27th january. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
];
