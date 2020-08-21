import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

// custom imports
import { CustomHeader, CustomNoData, CustomLoader } from "../../Components";
import { Strings, vw, vh, Images, ScreenName, Colors } from "../../utils";
import AbsenceFlatlist from "./AbsenceFlatlist";
import { hitAbsenceList } from "./action";

const TYPE_ADD = "add";
const TYPE_UPDATE = "update";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { currentChild, absenceList, page } = useSelector(
    (state: { Home: any; Absence: any }) => ({
      currentChild: state.Home.currentChild,
      absenceList: state.Absence.absenceList,
      page: state.Absence.page,
    })
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [loadFooter, setLoadFooter] = useState(false);
  const focused = useIsFocused();
  useEffect(() => {
    absenceList.length === 0 ? setIsLoading(true) : null;
    hitListAPI(0);
  }, [currentChild, focused]);

  const hitListAPI = (page: number) => {
    page === 0 ? null : setLoadFooter(true);
    dispatch(
      hitAbsenceList(
        currentChild.child,
        page,
        (data: Array<any>) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setIsLoading(false);
          setLoadFooter(false);
        },
        () => {
          setIsLoading(false);
          setLoadFooter(false);
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <AbsenceFlatlist
        item={item}
        index={index}
        onPress={() =>
          props.navigation.navigate(ScreenName.CREATE_ABSENCE, {
            type: TYPE_UPDATE,
            item: item,
          })
        }
      />
    );
  };

  return (
    <View style={Styles.mainView}>
      {/* Custom Header -------------- */}
      <CustomHeader
        hideBackButton={true}
        title={Strings.Absence_Notification}
        onPressBack={() => {}}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(16) }}
        child={true}
        navigation={props.navigation}
      />
      {/* Add Btn ----------- */}
      <TouchableOpacity
        style={Styles.addBtnView}
        activeOpacity={0.8}
        onPress={() =>
          props.navigation.navigate(ScreenName.CREATE_ABSENCE, {
            type: TYPE_ADD,
          })
        }
      >
        <Image source={Images.Add_leave} style={Styles.addBtn} />
      </TouchableOpacity>
      {/* Message starts here -------- */}
      {isLoading ? (
        <CustomLoader loading={isLoading} />
      ) : absenceList.length === 0 ? (
        <CustomNoData />
      ) : (
        <View style={Styles.innerView}>
          <FlatList
            contentContainerStyle={{ paddingBottom: vh(90) }}
            bounces={false}
            data={absenceList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            onEndReachedThreshold={0.5}
            onEndReached={() => (loadMore ? hitListAPI(page) : null)}
            ListFooterComponent={() => {
              return (
                <ActivityIndicator
                  color={Colors.violet}
                  size="large"
                  animating={loadFooter}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
export const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    paddingHorizontal: vh(16),
    paddingTop: vh(20),
    paddingBottom: vh(80),
    width: "100%",
  },
  addBtnView: {
    position: "absolute",
    bottom: vh(24),
    right: vh(24),
    zIndex: 99,
  },
  addBtn: {
    height: vh(64),
    width: vh(64),
  },
});

const DATA = [
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.This is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates. for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
];
