import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  ScreenName,
  Strings,
  vw,
  vh,
  Images,
  Colors,
  CommonFunctions,
} from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  state: boolean;
}

export default function App(props: AppProps) {
  const credit = props.item.general_ledger_entry_type === "credit";
  return (
    <View style={Styles.itemView}>
      <Image
        source={credit ? Images.In_Time_Icon : Images.Out_Time_Icon}
        style={Styles.inTimeIcon}
      />
      <View style={Styles.contentView}>
        <Text numberOfLines={2} style={Styles.text1}>
          {props.item.memo_com}
        </Text>
        {props.state ? (
          <Text style={Styles.text2}>
            {Strings.Balance} {props.item.amount}
          </Text>
        ) : (
          <Text>{""}</Text>
        )}
        <Text style={Styles.text3}>
          {CommonFunctions.DateFormatter(props.item.date)}
        </Text>
      </View>
      <Text
        style={[
          Styles.amountText,
          { color: credit ? Colors.green : Colors.pink },
        ]}
      >
        {credit ? "+ $" : "- $"}
        {(Math.round(parseFloat(props.item.sns_amount) * 10) / 10).toFixed(1)}
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  itemView: {
    padding: vh(16),
    width: "100%",
    backgroundColor: "white",
    borderRadius: vw(10),
    marginVertical: vh(8),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inTimeIcon: {
    height: vh(54),
    width: vh(54),
  },
  contentView: {
    width: "50%",
  },
  amountText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(16),
  },
  text1: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  text2: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightBlack,
    paddingTop: vh(4),
    paddingBottom: vh(10),
  },
  text3: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(12),
    color: Colors.lightGrey,
  },
});
