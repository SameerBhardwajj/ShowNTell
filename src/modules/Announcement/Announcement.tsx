import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// custom imports
import { updateTab } from "../Home/action";
import { useDispatch } from "react-redux";
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Colors, ScreenName } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateTab(true, () => {}));
  }, []);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Announcement}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={Styles.scrollStyle}
      >
        {DATA.map((item, index) => (
          <View style={Styles.innerView}>
            {item.date.length !== 0 ? (
              <Text style={Styles.heading}>{item.date}</Text>
            ) : null}
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
              <Text style={Styles.content}>{item.content}</Text>
              <Text style={Styles.time}>{item.time}</Text>
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
    backgroundColor: "white",
  },
  scrollStyle: {
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
