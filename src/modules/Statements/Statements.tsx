import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// custom imports
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import FlatlistStatement from "./FlatlistStatement";
import FilterModal from "./FilterModal";
import { hitStatementApi, updateDates } from "./action";

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

  const { data, page, date, currentChild } = useSelector(
    (state: { Home: any; Statements: any }) => ({
      data: state.Statements.data,
      page: state.Statements.page,
      date: state.Statements.date,
      currentChild: state.Home.currentChild,
    })
  );

  useEffect(() => {
    data.length === 0 ? setLoading(true) : null;
    hitStatement(0);
  }, [currentChild]);

  const hitStatement = (page: number, myState?: boolean) => {
    let mystate = CommonFunctions.isNullUndefined(myState) ? state : myState;

    dispatch(
      hitStatementApi(
        (data: Array<any>) => {
          console.warn(data.length);
          data.length === 0
            ? (setState(true), setLoadMore(false))
            : setLoadMore(true);
          setLoading(false);
        },
        () => {
          setLoadMore(false);
          setLoading(false);
        },
        page,
        mystate ? "" : moment(date.fromDate).format("YYYY-MM-DD"),
        mystate ? "" : moment(date.toDate).format("YYYY-MM-DD")
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

  const headerDate = () => {
    return (
      <Text style={Styles.dateText}>
        {CommonFunctions.DateFormatter(fromDate)}
        {Strings.to}
        {CommonFunctions.DateFormatter(toDate)}
      </Text>
    );
  };

  return (
    <View
      style={[
        Styles.mainView,
        data.length === 0 ? { backgroundColor: "white" } : {},
      ]}
    >
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
            setLoading(true);
            setState(true);
            dispatch(
              updateDates({ fromDate: "", toDate: "" }, () => {
                hitStatement(0, true);
              })
            );
          }}
        >
          <Text style={Styles.clearText}>{Strings.Clear}</Text>
        </TouchableOpacity>
      )}
      <View style={Styles.innerView}>
        {data.length === 0 ? (
          <CustomNoData />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: state ? vh(80) : vh(0) }}
            ListHeaderComponent={state ? null : headerDate()}
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={data}
            onEndReachedThreshold={0.5}
            onEndReached={() => (loadMore ? hitStatement(page) : null)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
          />
        )}
      </View>
      {/* {state ? null : (
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
      )} */}
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
            dispatch(
              updateDates(
                { fromDate: fromDate.toString(), toDate: toDate.toString() },
                () => {}
              )
            );
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
    paddingTop: Platform.OS === "ios" ? vh(30) : vh(20),
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
    paddingBottom: vh(30),
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
