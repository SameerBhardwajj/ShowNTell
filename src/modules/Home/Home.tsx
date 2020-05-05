import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";

// custom imports
import { updateTab } from "./Action";
import { useDispatch, useSelector } from "react-redux";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  ConstantName,
} from "../../utils";
import { CustomSearchBar, CustomToast } from "../../Components";
import HomeFlatlist from "./HomeFlatlist";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { tab } = useSelector((state: { Home: any }) => ({
    tab: state.Home.tab,
  }));

  React.useEffect(() => {
    const unsubscribe =
      (props.navigation.addListener(DRAWER_OPEN, (e: any) => {
        dispatch(
          updateTab(true, () => {
            console.log("drawer open", tab);
          })
        );

        debugger;
      }),
      props.navigation.addListener(DRAWER_CLOSE, (e: any) => {
        dispatch(
          updateTab(false, () => {
            console.log("drawer close", tab);
          })
        );

        debugger;
      }));

    return unsubscribe;
  }, []);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <HomeFlatlist item={item} navigation={props.navigation} />;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      {console.log("rendered", tab)}
      <View style={Styles.mainView}>
        <View style={Styles.extraHeader} />
        <View style={Styles.header}>
          <View style={Styles.upperHeader}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.toggleDrawer()}
            >
              <Image source={Images.Hamburger} style={Styles.hamburgerImg} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
              <Text style={Styles.childHeaderText}>Alex </Text>
              <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={Images.Notification_Icon}
                style={Styles.imgHeader}
              />
            </TouchableOpacity>
          </View>
          <View style={[Styles.upperHeader, { marginTop: vh(10) }]}>
            <CustomSearchBar
              value={query}
              placeholder={Strings.Search}
              onChangeText={(text: string) => setQuery(text)}
              onPressCancel={() => setQuery("")}
              mainViewStyle={{ backgroundColor: "white", width: "87%" }}
              inputTextStyle={{ width: "64%" }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
              <Image source={Images.Filter_Icon} style={Styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
        />
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  extraHeader: {
    width: "100%",
    height: iPhoneX ? vh(20) : 0,
    backgroundColor: Colors.violet,
  },
  header: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.violet,
    borderBottomLeftRadius: vh(8),
    borderBottomRightRadius: vh(8),
  },
  upperHeader: {
    marginVertical: vh(15),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: vw(16),
  },
  childHeader: {
    paddingVertical: vw(5),
    paddingHorizontal: vw(15),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  dropdown: {
    height: vh(8),
    width: vh(14),
    marginHorizontal: vw(5),
  },
  hamburgerImg: {
    height: vw(22),
    width: vw(32),
  },
  imgHeader: {
    height: vw(27),
    width: vw(25),
  },
  filterImg: {
    height: vw(28),
    width: vw(28),
  },
});

// Dummy data for Home API
const DATA = [
  {
    activityType: "Lunch",
    name: "Alex",
    category: "Healthy Food",
    content: "Green Veggies and Salads",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.lunch_description,
  },
  {
    activityType: "Announcement",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.anonsmtDescription,
  },
  {
    activityType: "QOA",
    name: "Alex",
    class: "Infant A",
    category: Strings.QOD_category,
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.QOD_description,
  },
  {
    activityType: "Announcement",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.anonsmtDescription,
  },
  {
    activityType: "QOA",
    name: "Alex",
    class: "Infant A",
    category: Strings.QOD_category,
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.QOD_description,
  },
];
