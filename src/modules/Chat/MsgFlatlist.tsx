import * as React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// custom Imports
import { vw, vh, Colors, CommonFunctions } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  allData: Array<any>;
}
export default function App(props: AppProps) {
  const admin = props.item.sent_by_guardian_id === null;
  const myDay = CommonFunctions.dayDateFormatter(props.item.create_dt);
  const msgDate =
    myDay === null
      ? CommonFunctions.DateFormatter(props.item.create_dt)
      : myDay;
  const index = parseInt(props.index);

  // Check for showing Day
  const allDay = () => {
    let myDay = CommonFunctions.dayDateFormatter(
      props.allData[index + 1].create_dt
    );
    return myDay === null
      ? CommonFunctions.DateFormatter(props.allData[index + 1].create_dt)
      : myDay;
  };

  return (
    <View style={Styles.mainView}>
      {props.allData.length - 1 === index ? (
        <View style={Styles.dayView}>
          <View style={Styles.dayLine} />
          <Text style={Styles.dayText}>{msgDate}</Text>
          <View style={Styles.dayLine} />
        </View>
      ) : msgDate !== allDay() ? (
        <View style={Styles.dayView}>
          <View style={Styles.dayLine} />
          <Text style={Styles.dayText}>{msgDate}</Text>
          <View style={Styles.dayLine} />
        </View>
      ) : null}
      <View
        style={[
          Styles.bubbleView,
          admin
            ? {
                backgroundColor: Colors.fadedPink,
                alignSelf: "flex-start",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: vw(8),
              }
            : {},
        ]}
      >
        <View
          style={[
            Styles.bubbleTriangle,
            admin
              ? {
                  left: 0,
                  borderTopColor: Colors.fadedPink,
                  borderRightWidth: 15,
                  borderTopWidth: 15,
                  borderBottomLeftRadius: vw(8),
                }
              : {
                  borderLeftWidth: 15,
                  borderTopWidth: 15,
                },
          ]}
        />
        <TextInput
          value={
            props.item.message === null
              ? props.item.canned_message.trim()
              : props.item.message.trim()
          }
          multiline={true}
          editable={false}
          style={[
            Styles.msgText,
            admin ? { color: "black", alignSelf: "flex-start" } : {},
          ]}
          scrollEnabled={false}
        />
        <Text
          style={[
            Styles.timeText,
            admin ? { alignSelf: "flex-start", color: Colors.lightGrey } : {},
          ]}
        >
          {CommonFunctions.timeFormatter(props.item.create_dt)}
        </Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    backgroundColor: "transparent",
    flex: 1,
    padding: vw(16),
  },
  dayView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: vw(16),
  },
  dayLine: {
    width: "45%",
    height: vw(1),
    backgroundColor: Colors.borderGrey,
  },
  dayText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.characterGrey,
    paddingHorizontal: vw(10),
    paddingVertical: vh(12),
  },
  bubbleView: {
    alignSelf: "flex-end",
    width: "60%",
    backgroundColor: Colors.violet,
    borderRadius: vw(8),
    alignItems: "center",
    justifyContent: "center",
    padding: vw(20),
    borderBottomRightRadius: 0,
  },
  bubbleTriangle: {
    position: "absolute",
    right: 0,
    bottom: -15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: Colors.violet,
    borderBottomRightRadius: vw(8),
  },
  msgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: "white",
    alignSelf: "flex-end",
  },
  timeText: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightViolet,
    alignSelf: "flex-end",
    paddingTop: vh(8),
  },
});
