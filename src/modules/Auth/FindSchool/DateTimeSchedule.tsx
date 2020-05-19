import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
} from "../../../Components";
import { Strings, vw, vh, Colors, ScreenName } from "../../../utils";

const SELECT_SCHOOL = "Select School";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [date, setDate] = useState(new Date());
  const [school, setSchool] = useState(SELECT_SCHOOL);

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
        {/* <CustomMenuList
          titleText={Strings.School_Name}
          onChangeText={(text: string) => setSchool(text)}
          currentText={school}
          viewStyle={Styles.menuView}
        /> */}
        <DatePicker
          minimumDate={new Date()}
          date={date}
          onDateChange={(text: Date) => setDate(text)}
        />
        <CustomButton
          activeOpacity={school === SELECT_SCHOOL ? 1 : 0.8}
          Text={Strings.Next}
          onPress={() =>
            school === SELECT_SCHOOL
              ? null
              : props.navigation.navigate(ScreenName.SCHEDULE_TOUR)
          }
          ButtonStyle={{
            width: "100%",
            marginTop: vh(30),
            backgroundColor:
              school === SELECT_SCHOOL ? Colors.disableViolet : Colors.violet,
          }}
        />
        <Text style={Styles.orText}>{Strings.Or}</Text>
        <CustomButton
          Text={Strings.general_information}
          onPress={() => props.navigation.navigate(ScreenName.SCHEDULE_TOUR)}
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

// Dummy data for School list API
const DATA = [
  { value: "School 1" },
  { value: "School 2" },
  { value: "School 3" },
];
