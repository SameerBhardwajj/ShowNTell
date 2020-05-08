import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from "react-native";

// custom imports
import { ScreenName, Strings, vw, vh, Images, Colors } from "../../utils";
import { CustomHeader, CustomButton } from "../../Components";
import FlatlistStatement from "./FlatlistStatement";
import FilterModal from "./FilterModal";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [state, setState] = useState(true);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <FlatlistStatement item={item} index={index} state={state} />;
  };

  const headerDate = () => {
    return (
      <Text style={Styles.dateText}>
        {fromDate.toLocaleDateString()}
        {Strings.to}
        {toDate.toLocaleDateString()}
      </Text>
    );
  };

  const footerStatement = () => {
    return (
      <CustomButton
        ButtonStyle={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {}}
        // @ts-ignore
        Text={
          <Text style={Styles.clearText}>
            {Strings.Download_Statement}
            {"\n"}
            <Text style={Styles.statementText}>
              {fromDate.toLocaleDateString()}
              {Strings.to}
              {toDate.toLocaleDateString()}
            </Text>
          </Text>
        }
      />
    );
  };

  const statementText = () => {
    return (
      <Text style={Styles.clearText}>
        {Strings.Download_Statement}
        {"\n"}
        <Text style={Styles.statementText}>
          {fromDate.toLocaleDateString()}
          {Strings.to}
          {toDate.toLocaleDateString()}
        </Text>
      </Text>
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Statements}
        onPressBack={() => props.navigation.pop()}
        textStyle={Styles.headerText}
      />
      {state ? null : (
        <TouchableOpacity
          style={Styles.clearBtn}
          activeOpacity={0.8}
          onPress={() => setState(!state)}
        >
          <Text style={Styles.clearText}>{Strings.Clear}</Text>
        </TouchableOpacity>
      )}
      <View style={Styles.innerView}>
        <FlatList
          ListHeaderComponent={state ? null : headerDate()}
          showsVerticalScrollIndicator={false}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          ListFooterComponent={state ? null : footerStatement()}
        />
      </View>
      {state ? (
        <TouchableOpacity
          style={Styles.filterIcon}
          activeOpacity={0.8}
          onPress={() => setModalOpen(true)}
        >
          <Image
            source={Images.Elipsis_Options_statement}
            style={Styles.filterBtn}
          />
        </TouchableOpacity>
      ) : null}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <TouchableOpacity
          style={Styles.topModalView}
          onPress={() => setModalOpen(false)}
        />
        <FilterModal
          setModalOpen={() => setModalOpen(false)}
          state={() => setState(!state)}
          fromDate={fromDate}
          toDate={toDate}
          getDate={(fromDate: Date, toDate: Date) => {
            setFromDate(fromDate);
            setToDate(toDate);
          }}
        />
      </Modal>
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
  clearBtn: {
    position: "absolute",
    right: 0,
    top: vh(15),
    paddingTop: vh(30),
    paddingHorizontal: vh(16),
  },
  clearText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: "white",
  },
  dateText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    paddingVertical: vh(10),
    paddingLeft: vh(16),
    alignSelf: "flex-start",
  },
  innerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vh(16),
    width: "100%",
    marginBottom: vh(100),
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
  topModalView: {
    width: "100%",
    backgroundColor: Colors.modalBg2,
  },
  statementText: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: "white",
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
