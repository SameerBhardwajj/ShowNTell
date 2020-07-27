import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom imports
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import { Strings, vh, vw, Colors, CommonFunctions } from "../../utils";
import List from "./List";
import { hitNotificationAPI } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { data, page } = useSelector((state: { Notification: any }) => ({
    data: state.Notification.data,
    page: state.Notification.page,
  }));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let focusListener = props.navigation.addListener("focus", () => {
      hitAPI(0);
    });
    return focusListener;
  }, [props.navigation]);

  const hitAPI = (page: number) => {
    dispatch(
      hitNotificationAPI(
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
        title={Strings.Notification}
        onPressBack={() => props.navigation.pop()}
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
    paddingBottom: vh(30),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
