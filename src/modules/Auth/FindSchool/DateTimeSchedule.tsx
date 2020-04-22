import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import DatePicker from "react-native-date-picker";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
} from "../../../Components";
import { Strings, vw, vh, Images, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [date, setDate] = useState(new Date());

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_Schools}
        onPressBack={() => props.navigation.pop()}
        notify={true}
        notifyNumber={2}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.heading}>{Strings.Please_select_date_time}</Text>
        <CustomMenuList
          titleText={Strings.School_Name}
          onPress={() => {}}
          viewStyle={Styles.menuView}
        />
        <DatePicker date={date} onDateChange={setDate} />
        <CustomButton
          Text={Strings.Next}
          onPress={() => props.navigation.navigate("ScheduleTour")}
          ButtonStyle={{ width: "100%", marginTop: vh(30) }}
        />
        <Text style={Styles.orText}>{Strings.Or}</Text>
        <CustomButton
          Text={Strings.general_information}
          onPress={() => {}}
          lightBtn={true}
          ButtonStyle={{ width: "100%" }}
        />
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  menuView: {
    marginVertical: vh(28),
  },
  orText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightGrey,
  },
});
