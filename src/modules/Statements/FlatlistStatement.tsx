import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Strings, vw, vh, Colors, CommonFunctions } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  state: boolean;
}

export default function App(props: AppProps) {
  const credit = props.item.general_ledger_entry_type === "credit";
  return (
    <View style={Styles.itemView}>
      <View style={Styles.contentView}>
        {CommonFunctions.isNullUndefined(props.item.memo_com) ? null : (
          <Text numberOfLines={2} style={Styles.text1}>
            {props.item.memo_com}
          </Text>
        )}
        {/* {props.state ? (
          <Text style={Styles.text2}>
            {Strings.Balance} {props.item.amount}
          </Text>
        ) : (
          <Text>{""}</Text>
        )} */}
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
        {credit
          ? (
              Math.round(parseFloat(props.item.sns_credit_amt) * 10) / 10
            ).toFixed(2)
          : (
              Math.round(parseFloat(props.item.sns_debit_amt) * 10) / 10
            ).toFixed(2)}
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
  contentView: {
    width: "75%",
  },
  amountText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(16),
  },
  text1: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(15),
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
