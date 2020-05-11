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
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={Styles.mainView}>
        <CustomHeader
          title={Strings.Class_Schedule}
          onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
          textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
          child={true}
          navigation={props.navigation}
        />
        {DATA.map((item, index) => (
          <View style={Styles.innerView}>
            <View
              style={[
                Styles.headingView,
                { backgroundColor: newColor(index + 1) },
              ]}
            >
              <Text style={Styles.heading}>{item.time}</Text>
            </View>
            <View
              style={[
                Styles.contentView,
                { backgroundColor: bgColor(index + 1) },
              ]}
            >
              <Text style={[Styles.content, { color: newColor(index + 1) }]}>
                {item.content}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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

// Dummy API data
const DATA = [
  {
    time: "8 AM to 9 AM",
    content: "Art and Craft",
  },
  {
    time: "9 AM to 10 AM",
    content: "Circle and Time Class",
  },
  {
    time: "10 AM to 11 AM",
    content: "Science Class",
  },
  {
    time: "11 AM to 12 PM",
    content: "Art and Craft",
  },
  {
    time: "11 AM to 12 PM",
    content: "Art and Craft",
  },
  {
    time: "11 AM to 12 PM",
    content: "Art and Craft",
  },
];
