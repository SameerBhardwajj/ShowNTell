import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomTimeSlot,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../../utils";

const currentTime = new Date().getHours();
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const [time, setTime] = useState(0);
  const { id, name, date } = props.route.params;

  const setDisabled = (time: number) => {
    console.warn(CommonFunctions.DateDifference(new Date(), date));

    let disable = false;
    new Date() > date
      ? CommonFunctions.DateDifference(new Date(), date) !== 0
      : CommonFunctions.DateDifference(date, new Date()) !== 0
      ? null
      : currentTime >= time
      ? (disable = true)
      : null;
    return disable;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_Schools}
        onPressBack={() => props.navigation.pop()}
        notify={true}
        notifyNumber={2}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.heading}>{Strings.Preferred_slot}</Text>
        <CustomTimeSlot
          time="11:00 am"
          pressed={time === 11 ? true : false}
          disabled={setDisabled(11)}
          onPress={() => setTime(11)}
        />
        <CustomTimeSlot
          time="12:00 am"
          pressed={time === 12 ? true : false}
          disabled={setDisabled(12)}
          onPress={() => setTime(12)}
        />
        <CustomTimeSlot
          time="02:00 pm"
          pressed={time === 2 ? true : false}
          disabled={setDisabled(14)}
          onPress={() => setTime(2)}
        />
        <CustomTimeSlot
          time="04:00 pm"
          pressed={time === 4 ? true : false}
          disabled={setDisabled(16)}
          onPress={() => setTime(4)}
        />
        <CustomTimeSlot
          time="05:00 pm"
          pressed={time === 5 ? true : false}
          disabled={setDisabled(17)}
          onPress={() => setTime(5)}
        />
        <CustomTimeSlot
          time="06:00 pm"
          pressed={time === 6 ? true : false}
          disabled={setDisabled(18)}
          onPress={() => setTime(6)}
        />
        <CustomButton
          Text={Strings.Next}
          activeOpacity={time === 0 ? 1 : 0.8}
          onPress={() =>
            time === 0
              ? null
              : props.navigation.navigate(ScreenName.SCHEDULE_TOUR, {
                  id: id,
                  name: name,
                  date: date,
                  time: time,
                })
          }
          ButtonStyle={{
            width: "100%",
            marginTop: vh(30),
            backgroundColor: time === 0 ? Colors.disableViolet : Colors.violet,
          }}
        />
        <Text style={Styles.orText}>{Strings.Or}</Text>
        <CustomButton
          Text={Strings.general_information}
          onPress={() =>
            props.navigation.navigate(ScreenName.SCHEDULE_TOUR, {
              id: id,
              name: name,
              date: date,
              time: 0,
            })
          }
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
    marginBottom: vh(15),
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
