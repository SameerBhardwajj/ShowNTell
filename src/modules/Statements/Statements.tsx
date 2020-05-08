import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

// custom imports
import { ScreenName, Strings, vw, vh, Images, Colors } from "../../utils";
import { CustomHeader } from "../../Components";
import FlatlistStatement from "./FlatlistStatement";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <FlatlistStatement item={item} index={index} />;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Statements}
        onPressBack={() => props.navigation.pop()}
        textStyle={Styles.headerText}
      />
      <View style={Styles.innerView}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
      <TouchableOpacity
        style={Styles.filterIcon}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Image
          source={Images.Elipsis_Options_statement}
          style={Styles.filterBtn}
        />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerText: {
    alignSelf: "flex-start",
    paddingLeft: vw(50),
  },
  innerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vh(16),
    width: "100%",
  },
  filterIcon: {
    position: "absolute",
    bottom: vh(30),
    right: vw(0),
    paddingHorizontal: vw(8),
  },
  filterBtn: {
    height: vh(94),
    width: vh(94),
  },
});

// Dummy API data
const DATA = [
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "receive",
    heading: "Gift received for referral",
    balance: "$ 1100",
    date: "Feb 20, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "receive",
    heading: "Gift received for referral",
    balance: "$ 1100",
    date: "Feb 20, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "receive",
    heading: "Gift received for referral",
    balance: "$ 1100",
    date: "Feb 20, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "receive",
    heading: "Gift received for referral",
    balance: "$ 1100",
    date: "Feb 20, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "sent",
    heading: "Paid for daycare service",
    balance: "$ 1000",
    date: "Feb 25, 2020",
    time: "2pm",
    amount: "$100",
  },
  {
    type: "receive",
    heading: "Gift received for referral",
    balance: "$ 1100",
    date: "Feb 20, 2020",
    time: "2pm",
    amount: "$100",
  },
];
