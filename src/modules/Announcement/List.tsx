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

export interface AppProps {
  item: any;
  index: string;
  allData: Array<any>;
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
              (index + 1) % 3 === 1
                ? Colors.lightWaterBlue
                : (index + 1) % 3 === 2
                ? Colors.lightPink
                : Colors.lightGreen,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={Styles.childAvatar}>
            <Image
              source={
                CommonFunctions.isNullUndefined(item.Child.s3_photo_path)
                  ? Images.Profile_Placeholder
                  : { uri: item.Child.s3_photo_path }
              }
              resizeMethod="resize"
              resizeMode="center"
              style={{ width: vh(40) }}
            />
          </View>
          <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
            <Text style={Styles.name}>
              {item.Child.first_name} {item.Child.last_name}
            </Text>
            <Text style={Styles.classText}>{item.Child.Classroom.name}</Text>
          </View>
        </View>
        <Text style={Styles.heading}>{item.Announcement.title}</Text>
        <Text style={Styles.content}>{item.Announcement.description}</Text>
        <Text style={Styles.time}>
          {CommonFunctions.timeFormatter(new Date(item.create_dt))}
        </Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerView: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: vh(10),
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
