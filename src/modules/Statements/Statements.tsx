import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// custom imports
import {
  ScreenName,
  Strings,
  vw,
  vh,
  Images,
  Colors,
  CommonFunctions,
} from "../../utils";
import {
  CustomHeader,
  CustomButton,
  CustomLoader,
  CustomToast,
} from "../../Components";
import FlatlistStatement from "./FlatlistStatement";
import FilterModal from "./FilterModal";
import { hitStatementApi } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const { data, page, currentChild } = useSelector(
    (state: { Home: any; Statements: any }) => ({
      data: state.Statements.data,
      page: state.Statements.page,
      currentChild: state.Home.currentChild,
    })
  );

  useEffect(() => {
    setLoading(true);
    hitStatement(0);
  }, [currentChild]);

  const hitStatement = (page: number) => {
    dispatch(
      hitStatementApi(
        (data: Array<any>) => {
          console.warn(data.length);
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setLoading(false);
        },
        () => {
          setLoadMore(false);
          setLoading(false);
        },
        page,
        state ? moment(fromDate).format("YYYY-MM-DD") : "",
        state ? moment(toDate).format("YYYY-MM-DD") : ""
      )
    );
  };

  const hitStatementFilter = (
    page: number,
    from_date: string,
    to_date: string
  ) => {
    console.warn("apply", from_date, to_date);

    dispatch(
      hitStatementApi(
        (data: Array<any>) => {
          data.length === 0
            ? setLoadMore(false)
            : (setState(false), setLoadMore(true));
          setLoading(false);
        },
        () => {
          setLoadMore(false);
          setLoading(false);
        },
        page,
        from_date,
        to_date
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <FlatlistStatement item={item} index={index} state={state} />;
  };

  const keyExtractor = useCallback((item, index) => index.toString(), []);

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

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Statements}
        onPressBack={() => props.navigation.pop()}
        textStyle={Styles.headerText}
      />
      {<CustomLoader loading={loading} />}
      {state ? null : (
        <TouchableOpacity
          style={Styles.clearBtn}
          activeOpacity={0.8}
          onPress={() => {
            hitStatement(0), setState(true);
          }}
        >
          <Text style={Styles.clearText}>{Strings.Clear}</Text>
        </TouchableOpacity>
      )}
      <View style={Styles.innerView}>
        <FlatList
          contentContainerStyle={{ paddingBottom: vh(100) }}
          ListHeaderComponent={state ? null : headerDate()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={data}
          onEndReachedThreshold={0.5}
          onEndReached={() => (loadMore ? hitStatement(page) : null)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
      {state ? null : (
        <CustomButton
          ButtonStyle={Styles.dowbloadBtn}
          onPress={() => CustomToast()}
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
      )}
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
          fromDate={fromDate}
          toDate={toDate}
          getDate={(fromDate: Date, toDate: Date) => {
            setModalOpen(false);
            setFromDate(fromDate);
            setToDate(toDate);
            setLoading(true);
            hitStatementFilter(
              0,
              moment(fromDate).format("YYYY-MM-DD"),
              moment(toDate).format("YYYY-MM-DD")
            );
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
  dowbloadBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: vh(20),
  },
  innerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vh(16),
    width: "100%",
    flex: 1,
    paddingBottom: vh(90),
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
