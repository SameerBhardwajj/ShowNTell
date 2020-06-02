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
  StatusBar,
  BackHandler,
  ToastAndroid,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "./action";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  ConstantName,
} from "../../utils";
import { CustomSearchBar, CustomToast, CustomLoader } from "../../Components";
import HomeFlatlist from "./HomeFlatlist";
import { HomeAPI } from "./action";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { tab, data, currentChild } = useSelector((state: { Home: any }) => ({
    tab: state.Home.tab,
    data: state.Home.data,
    currentChild: state.Home.currentChild,
  }));

  React.useEffect(() => {
    SplashScreen.hide();
    hitHomeAPI(0, 0);
    BackHandler.addEventListener("hardwareBackPress", () => {
      ToastAndroid.show(" Exiting the app...", ToastAndroid.SHORT);
      BackHandler.exitApp();
      return true;
    });
    const unsubscribe =
      (props.navigation.addListener(DRAWER_OPEN, (e: any) => {
        dispatch(
          updateTab(true, () => {
            console.warn("drawer open", tab);
          })
        );
      }),
      props.navigation.addListener(DRAWER_CLOSE, (e: any) => {
        dispatch(
          updateTab(false, () => {
            console.warn("drawer close", tab);
          })
        );
      }));

    return unsubscribe;
  }, [props.navigation]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <HomeFlatlist item={item} navigation={props.navigation} />;
  };

  const hitHomeAPI = (child_id: number, page: number) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        child_id,
        page,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: "white" }}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={loading}
      />
      <CustomLoader loading={loading} />
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.childHeader}
              onPress={() =>
                props.navigation.navigate(ScreenName.CHILD_MODAL, {
                  child: data.children,
                })
              }
            >
              <Text style={Styles.childHeaderText}>{currentChild.name}</Text>
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
              onSubmitEditing={() => {}}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
              <Image source={Images.Filter_Icon} style={Styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.innerView}>
          <FlatList
            data={data.activity}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItems}
          />
        </View>
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
    height: iPhoneX ? vh(30) : vh(10),
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
  innerView: {
    width: "100%",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
