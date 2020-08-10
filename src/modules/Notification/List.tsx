import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
  Images,
} from "../../utils";
import { CustomButton } from "../../Components";

export interface AppProps {
  item: any;
  index: string;
  allData: Array<any>;
  acknowledge: Function;
}

export default function App(props: AppProps) {
  const { item } = props;
  const index = parseInt(props.index);

  const myDay = CommonFunctions.dayDateFormatter(props.item.create_dt);

  const msgDate =
    myDay === null
      ? CommonFunctions.DateFormatter(props.item.create_dt)
      : myDay;

  // Check for showing Day
  const allDay = () => {
    let myDay = CommonFunctions.dayDateFormatter(
      props.allData[index - 1].create_dt
    );
    return myDay === null
      ? CommonFunctions.DateFormatter(props.allData[index - 1].create_dt)
      : myDay;
  };

  return (
    <View style={Styles.innerView}>
      {index === 0 ? (
        <Text
          style={[Styles.heading, { paddingTop: vh(20), paddingLeft: vw(15) }]}
        >
          {msgDate}
        </Text>
      ) : msgDate !== allDay() ? (
        <Text
          style={[Styles.heading, { paddingTop: vh(20), paddingLeft: vw(15) }]}
        >
          {msgDate}
        </Text>
      ) : null}
      <View
        style={[
          Styles.contentView,
          {
            backgroundColor:
              item.notification_id === 3
                ? Colors.fadedPink
                : (index + 1) % 3 === 1
                ? Colors.lightWaterBlue
                : (index + 1) % 3 === 2
                ? Colors.lightPink
                : Colors.lightGreen,
          },
        ]}
      >
        <Text style={Styles.heading}>{item.Notification.name}</Text>
        <Text style={Styles.content}>{item.Notification.message}</Text>
        <Text style={Styles.time}>
          {CommonFunctions.timeFormatter(new Date(item.create_dt))}
        </Text>
        {item.notification_id === 3 ? (
          <CustomButton
            onPress={() => props.acknowledge(parseInt(item.Notification.id))}
            Text={Strings.Acknowledge}
            ButtonStyle={{ marginBottom: 0 }}
          />
        ) : null}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerView: {
    width: "100%",
    paddingHorizontal: vh(16),
  },
  contentView: {
    padding: vw(20),
    borderRadius: vh(10),
    marginTop: vh(12),
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
