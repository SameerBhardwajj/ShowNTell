import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import { Strings, vw, vh, ScreenName, CommonFunctions } from "../../utils";
import { hitAnnouncementAPI } from "./action";
import List from "./List";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { data, currentChild, page } = useSelector(
    (state: { Home: any; Login: any; Announcement: any }) => ({
      data: state.Announcement.data,
      currentChild: state.Home.currentChild,
      page: state.Announcement.page,
    })
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    data.length === 0 ? setLoading(true) : null;
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
      <View style={Styles.innerView}>
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
    paddingBottom: CommonFunctions.iPhoneX ? vh(30) : vh(10),
  },
  innerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vh(16),
    width: "100%",
    flex: 1,
  },
});
