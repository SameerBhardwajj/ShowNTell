import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  BackHandler,
  ToastAndroid,
  Modal,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab, updateChild } from "./action";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  Constants,
  CommonFunctions,
} from "../../utils";
import {
  CustomSearchBar,
  CustomLoader,
  CustomNoData,
  CustomToast,
} from "../../Components";
import HomeFlatlist from "./HomeFlatlist";
import { HomeAPI, addFilter, weDidItAPI } from "./action";
import FilterModal from "./Filter/FilterModal";

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
  // const [isRefreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [exitCounter, setExitCounter] = useState(false);

  const {
    tab,
    data,
    currentChild,
    loginToken,
    loginData,
    myFilter,
    filterNum,
  } = useSelector((state: { Home: any; Login: any }) => ({
    tab: state.Home.tab,
    data: state.Home.data,
    currentChild: state.Home.currentChild,
    loginToken: state.Login.loginToken,
    loginData: state.Login.loginData,
    myFilter: state.Home.myFilter,
    filterNum: state.Home.filterNum,
  }));

  React.useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    // setLoading(true);
    console.warn(
      "child ",
      currentChild,
      loginData.Children.length > 1,
      loginData.Children.length
    );
    loginData.Children.length > 1
      ? hitHomeAPI(currentChild.child, 0)
      : loginData.Children[0].id !== currentChild.child
      ? dispatch(
          updateChild(
            {
              child: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () => hitHomeAPI(loginData.Children[0].id, 0)
          )
        )
      : hitHomeAPI(currentChild.child, 0);
    // const unsubscribe =
    //   (props.navigation.addListener(DRAWER_OPEN, (e: any) => {
    //     dispatch(
    //       updateTab(true, () => {
    //         console.log("drawer open", tab);
    //       })
    //     );
    //   }),
    //   props.navigation.addListener(DRAWER_CLOSE, (e: any) => {
    //     dispatch(
    //       updateTab(false, () => {
    //         console.log("drawer close", tab);
    //       })
    //     );
    //   }));

    // return unsubscribe;
    BackHandler.addEventListener("hardwareBackPress", () => {
      exitCounter
        ? (ToastAndroid.show(" Exiting the app...", ToastAndroid.SHORT),
          BackHandler.exitApp())
        : (ToastAndroid.show("Press again to Exit", ToastAndroid.SHORT),
          setExitCounter(true),
          setTimeout(() => {
            setExitCounter(false);
          }, 2000));
      return true;
    });
  }, [exitCounter, currentChild]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <HomeFlatlist
        weDidIt={(id: string) => {
          setLoading(true);
          dispatch(
            weDidItAPI(
              id,
              () => hitSearchAPI(),
              () => {
                setLoading(false);
              }
            )
          );
        }}
        item={item}
        navigation={props.navigation}
      />
    );
  };

  const hitHomeAPI = (child_id: number, page?: number) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          setLoading(false);
          // setRefreshing(false);
        },
        () => {
          setLoading(false);
        },
        child_id,
        page
      )
    );
  };

  const hitFilterAPI = (
    activity?: string,
    fromDate?: string,
    toDate?: string,
    type?: string
  ) => {
    console.warn("final   ", activity, fromDate, toDate, type);

    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          setLoading(false);
          // setRefreshing(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        0,
        activity,
        fromDate,
        toDate,
        type
      )
    );
  };

  const hitSearchAPI = (query?: string) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          setLoading(false);
          // setRefreshing(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        0,
        myFilter.activity,
        myFilter.fromDate,
        myFilter.toDate,
        myFilter.type,
        query
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={loading}
      />
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
            activeOpacity={loginData.Children.length > 1 ? 0.8 : 1}
            style={Styles.childHeader}
            onPress={() =>
              loginData.Children.length > 1
                ? props.navigation.navigate(ScreenName.CHILD_MODAL, {
                    child: loginData.Children,
                  })
                : null
            }
          >
            <Text style={Styles.childHeaderText}>{currentChild.name}</Text>
            {loginData.Children.length > 1 ? (
              <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
            <Image source={Images.Notification_Icon} style={Styles.imgHeader} />
          </TouchableOpacity>
        </View>
        <View style={[Styles.upperHeader, { marginTop: vh(10) }]}>
          <CustomSearchBar
            value={query}
            placeholder={Strings.Search}
            onChangeText={(text: string) => {
              setQuery(text), hitSearchAPI(text);
            }}
            onPressCancel={() => {
              setQuery(""), hitSearchAPI();
            }}
            mainViewStyle={{ backgroundColor: "white", width: "87%" }}
            inputTextStyle={{ width: "64%" }}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalOpen(true)}
          >
            <Image source={Images.Filter_Icon} style={Styles.filterImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.innerView}>
        {loading ? (
          <CustomLoader loading={loading} />
        ) : data.length === 0 ? (
          <CustomNoData />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            // refreshing={isRefreshing}
            // onRefresh={() => {
            //   hitHomeAPI(currentChild.child, 0);
            // }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItems}
            nestedScrollEnabled={true}
          />
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <FilterModal
            setModalOpen={(value: boolean) => setModalOpen(value)}
            resetFilter={() => {
              setModalOpen(false), hitHomeAPI(currentChild.child, 0);
            }}
            applyFilter={(value: any, Activitytype: Array<any>, dates: any) => {
              console.warn("incoming  ", value, dates, Activitytype);

              let to = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.toDate, "ymd");
              let from = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.fromDate, "ymd");

              dispatch(
                addFilter(myFilter.activity, from, to, Activitytype, () => {
                  console.warn(" filter redux ...", myFilter);
                  hitFilterAPI(value, from, to, Activitytype.join(","));
                })
              );
            }}
          />
        </View>
      </Modal>
    </View>
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
    flex: 1,
  },
  emptyData: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
