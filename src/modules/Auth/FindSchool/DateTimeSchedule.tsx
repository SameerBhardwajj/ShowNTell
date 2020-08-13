import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomNoData,
  CustomLoader,
} from "../../../Components";
import { Strings, vw, vh, Colors, ScreenName } from "../../../utils";
import { fetchSlotTime } from "./SchoolListing/action";
import SlotTimeFlatlist from "./SlotTimeFlatlist";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { centerId, calenderId, date } = props.route.params;
  const { slotTime } = useSelector((state: { SchoolListing: any }) => ({
    slotTime: state.SchoolListing.slotTime,
  }));

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(
      fetchSlotTime(
        calenderId,
        date,
        () => setIsLoading(false),
        () => setIsLoading(false)
      )
    );
  }, []);

  const renderSlotItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SlotTimeFlatlist
        item={item}
        index={index}
        current={time}
        setCurrent={(index: string) => setTime(parseInt(index))}
      />
    );
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
        {isLoading ? (
          <CustomLoader loading={true} />
        ) : slotTime.length === 0 ? (
          <CustomNoData />
        ) : (
          <FlatList
            data={slotTime}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSlotItems}
          />
        )}
        <CustomButton
          Text={Strings.Next}
          activeOpacity={time === -1 ? 1 : 0.8}
          onPress={() =>
            time === -1
              ? null
              : props.navigation.navigate(ScreenName.SCHEDULE_TOUR, {
                  centerId: centerId,
                  calenderId: calenderId,
                  date: date,
                  time: slotTime[time].time,
                })
          }
          ButtonStyle={{
            alignSelf: "center",
            width: "100%",
            marginTop: vh(30),
            backgroundColor: time === -1 ? Colors.disableViolet : Colors.violet,
          }}
        />
        <Text style={Styles.orText}>{Strings.Or}</Text>
        <CustomButton
          Text={Strings.general_information}
          onPress={() =>
            props.navigation.navigate(ScreenName.SCHEDULE_TOUR, {
              centerId: centerId,
              calenderId: calenderId,
              date: null,
              time: null,
            })
          }
          lightBtn={true}
          ButtonStyle={{ width: "100%", alignSelf: "center" }}
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
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
    maxHeight: "88%",
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
    alignSelf: "center",
  },
});
