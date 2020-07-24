import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
  Images,
} from "../../utils";
import { hitAnnouncementAPI } from "./action";
import List from "./List";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { tab, data, loginToken, loginData, currentChild, page } = useSelector(
    (state: { Home: any; Login: any; Announcement: any }) => ({
      tab: state.Home.tab,
      data: state.Announcement.data,
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
      currentChild: state.Home.currentChild,
      page: state.Announcement.page,
    })
  );
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);

  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    setLoading(true);
    hitAPI(0);
  }, [currentChild]);

  const hitAPI = (page: number) => {
    dispatch(
      hitAnnouncementAPI(
        currentChild.child,
        page,
        () => {
          setLoading(false);
        },
        () => setLoading(false)
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <List item={item} index={index} allData={data} />;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Announcement}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
        child={true}
        navigation={props.navigation}
      />
      <CustomLoader loading={loading} />
      {loading ? null : CommonFunctions.isNullUndefined(data) ? (
        <CustomNoData />
      ) : (
        <FlatList
          data={data}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          onEndReached={() => hitAPI(page)}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
    paddingBottom: iPhoneX ? vh(30) : vh(10),
  },
});
