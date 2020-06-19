import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomLoader } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";
import { hitAnnouncementAPI } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const {
    tab,
    data,
    currentChild,
    loginToken,
    loginData,
    otherCurrentChild,
    myFilter,
    filterNum,
  } = useSelector((state: { Home: any; Login: any; Announcement: any }) => ({
    tab: state.Home.tab,
    data: state.Announcement.data,
    currentChild: state.Home.currentChild,
    loginToken: state.Login.loginToken,
    loginData: state.Login.loginData,
    otherCurrentChild: state.Home.otherCurrentChild,
    myFilter: state.Home.myFilter,
    filterNum: state.Home.filterNum,
  }));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    setLoading(true);
    dispatch(
      hitAnnouncementAPI(
        otherCurrentChild.child,
        0,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, [otherCurrentChild]);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Announcement}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        child={true}
        navigation={props.navigation}
      />
      <CustomLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={Styles.scrollStyle}
      >
        {data.map((item: any, index: number) => (
          <View style={Styles.innerView}>
            {/* {item.date.length !== 0 ? (
              <Text style={Styles.heading}>{item.date}</Text>
            ) : null} */}
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
              <Text style={Styles.heading}>{item.Announcement.title}</Text>
              <Text style={Styles.content}>
                {item.Announcement.description}
              </Text>
              <Text style={Styles.time}>
                {CommonFunctions.timeFormatter(new Date(item.create_dt))}
              </Text>
            </View>
          </View>
        ))}
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
    width: '100%',
    flex:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  innerView: {
    padding: vh(16),
    alignItems: 'center',
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
  },
  content: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  time: {
    fontFamily: "Nunito-SemiBold",
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
