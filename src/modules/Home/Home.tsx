import React, { useState, useEffect } from "react";
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
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUniqueId } from "react-native-device-info";
import { useIsFocused } from "@react-navigation/native";

// custom imports
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
import { updateClassChild } from "../ClassroomSchedule/action";
import {
  HomeAPI,
  addFilter,
  weDidItAPI,
  updateQuery,
  updateChild,
  updateDeviceToken,
} from "./action";
import FilterModal from "./Filter/FilterModal";
import ShareModal from "./ShareModal";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "@aws-amplify/pushnotification";
import { addDeviceToken } from "../Auth/Login/action";

Platform.OS === "ios"
  ? PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
    })
      .then((data) => {
        console.warn(data);
      })
      .catch((e) => {
        console.warn(e);
      })
  : null;

// PushNotification.requestIOSPermissions({
//     alert: true,
//     badge: true,
//     sound: true,
//   })
// : null;

PushNotification.onNotification((notification: any) => {
  debugger;
  if (notification.foreground) {
    console.warn("1onNotification foreground", notification);
    // console.warn("2my foreground", notification.data);
  } else {
    console.warn("onNotification background or closed", notification);
    console.warn("my background");
  }
  // extract the data passed in the push notification
  // const data = JSON.parse(notification.data);
  // console.warn("onNotification data", data);
  // iOS only
  Platform.OS === "ios"
    ? notification.finish(PushNotificationIOS.FetchResult.NoData)
    : null;
});
PushNotification.onNotificationOpened((notification: any) => {
  console.warn("onNotificationOpened", notification);
  // console.warn("onNotificationOpened", notification.data);
  // extract the data passed in the push notification
  // const data = JSON.parse(notification["pinpoint.jsonBody"]);
  // console.warn(JSON.parse(notification.data));

  const data = JSON.parse(notification);
  console.warn("onNotificationOpened data", data);
});

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";
const CURRENT_TIME = moment(new Date())
  .format("YYYY-MM-DD HH:mm:ss")
  .toString();

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadFooter, setLoadFooter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState();
  const [exitCounter, setExitCounter] = useState(false);
  const [homeData, setHomeData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  const {
    currentChild,
    loginToken,
    loginData,
    deviceToken,
    myFilter,
    classroomChild,
    page,
    searchQuery,
    data,
  } = useSelector(
    (state: { Home: any; Login: any; ClassroomSchedule: any }) => ({
      currentChild: state.Home.currentChild,
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
      deviceToken: state.Login.deviceToken,
      myFilter: state.Home.myFilter,
      page: state.Home.page,
      classroomChild: state.ClassroomSchedule.classroomChild,
      searchQuery: state.Home.searchQuery,
      data: state.Home.data,
    })
  );

  const backHandler = () => {
    exitCounter
      ? (ToastAndroid.show(" Exiting the app...", ToastAndroid.SHORT),
        BackHandler.exitApp())
      : (ToastAndroid.show("Press again to Exit", ToastAndroid.SHORT),
        setExitCounter(true),
        setTimeout(() => {
          setExitCounter(false);
        }, 2000));
    return true;
  };

  React.useEffect(() => {
    // console.warn(props.navigation, exitCounter, currentChild);

    // SplashScreen.hide();
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    console.warn("device token1", deviceToken);

    CommonFunctions.isNullUndefined(deviceToken)
      ? dispatch(
          addDeviceToken((token: string) => {
            console.warn("device token2", token);
            dispatch(
              updateDeviceToken(
                getUniqueId(),
                token,
                () => {
                  console.warn("success");
                },
                () => {
                  console.warn("error");
                }
              )
            );
          })
        )
      : null;

    homeData.length === 0 ? setLoading(true) : null;
    CommonFunctions.isEmpty(classroomChild)
      ? dispatch(
          updateClassChild(
            {
              id: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () => {}
          )
        )
      : null;
    // let focusListener = props.navigation.addListener("focus", () => {

    // });
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

    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => {
      // focusListener;
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, [exitCounter, currentChild]);

  useEffect(() => {
    focused
      ? loginData.Children.length > 1
        ? hitHomeAPI(currentChild.child)
        : loginData.Children[0].id !== currentChild.child
        ? dispatch(
            updateChild(
              {
                child: loginData.Children[0].id,
                name: loginData.Children[0].first_name,
                classroom: loginData.Children[0].classroom_id,
              },
              () => hitHomeAPI(loginData.Children[0].id)
            )
          )
        : hitHomeAPI(currentChild.child)
      : null;
  }, [focused]);

  const utcFromDateTime = (date?: string) => {
    let myDate = "";
    let time = "";
    CommonFunctions.isNullUndefined(date)
      ? null
      : ((myDate = moment(date).format("YYYY-MM-DD").toString()),
        (time = moment(myDate + " 00:00:00")
          .utc()
          .format("YYYY-MM-DD HH:mm:ss")
          .toString()));

    return time;
  };

  const utcToDateTime = (date?: string) => {
    let myDate = "";
    let time = "";
    CommonFunctions.isNullUndefined(date)
      ? null
      : ((myDate = moment(date).format("YYYY-MM-DD").toString()),
        (time = moment(myDate + " 23:59:59")
          .utc()
          .format("YYYY-MM-DD HH:mm:ss")
          .toString()));

    return time;
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <HomeFlatlist
        weDidIt={(id: string) => {
          setLoading(true);
          dispatch(
            weDidItAPI(
              id,
              () => hitHomeAPI(currentChild.child),
              () => {
                setLoading(false);
              }
            )
          );
        }}
        item={item}
        navigation={props.navigation}
        openShareModal={(data: any) => {
          setShareData(data);
          setShareOpen(true);
        }}
      />
    );
  };

  const hitHomeAPI = (child_id: number) => {
    debugger;
    console.warn(
      "ok",
      child_id,
      CURRENT_TIME,
      0,
      myFilter,
      utcFromDateTime(myFilter.fromDate),
      utcToDateTime(myFilter.toDate),
      myFilter.type
    );

    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(data);
          setLoading(false);
          setRefreshing(false);
        },
        () => {
          setLoading(false);
          setRefreshing(false);
        },
        child_id,
        CURRENT_TIME,
        0,
        myFilter.activity,
        utcFromDateTime(myFilter.fromDate),
        utcToDateTime(myFilter.toDate),
        myFilter.type
      )
    );
  };

  const NewhitHomeAPI = () => {
    debugger;
    setLoadFooter(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(homeData.concat(data));
          setLoading(false);
          setLoadFooter(false);
        },
        () => {
          setLoading(false);
          setLoadFooter(false);
        },
        currentChild.child,
        CURRENT_TIME,
        page,
        myFilter.activity,
        utcFromDateTime(myFilter.fromDate),
        utcToDateTime(myFilter.toDate),
        myFilter.type,
        searchQuery
      )
    );
  };

  const hitFilterAPI = (
    activity?: string,
    fromDate?: string,
    toDate?: string,
    type?: string
  ) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        CURRENT_TIME,
        0,
        activity,
        utcFromDateTime(fromDate),
        utcToDateTime(toDate),
        type
      )
    );
  };

  const hitSearchAPI = (query: string) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          dispatch(updateQuery(query, () => {}));
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setLoading(false);
          setHomeData(data);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        CURRENT_TIME,
        0,
        myFilter.activity,
        utcFromDateTime(myFilter.fromDate),
        utcToDateTime(myFilter.toDate),
        myFilter.type,
        query
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      {/* Status bar ----------- */}
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={loading}
      />
      {/* Header -------------------- */}
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate(ScreenName.NOTIFICATION)}
            // onPress={() => CustomToast()}
          >
            <Image source={Images.Notification_Icon} style={Styles.imgHeader} />
          </TouchableOpacity>
        </View>
        <View style={[Styles.upperHeader, { marginTop: vh(10) }]}>
          <CustomSearchBar
            value={query}
            placeholder={Strings.Search}
            onChangeText={(text: string) => {
              setQuery(text);
              hitSearchAPI(text);
            }}
            onPressCancel={() => {
              setQuery("");
              hitHomeAPI(currentChild.child);
            }}
            mainViewStyle={{ backgroundColor: "white", width: "87%" }}
            inputTextStyle={{ width: "64%" }}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalOpen(true)}
          >
            <Image source={Images.Filter_Icon} style={Styles.filterImg} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Listing --------------------- */}
      <View style={Styles.innerView}>
        <CustomLoader loading={loading} />
        {homeData.length === 0 && !loading ? (
          <CustomNoData />
        ) : (
          <FlatList
            data={homeData}
            keyExtractor={(item, index) => index.toString()}
            bounces
            renderItem={renderItems}
            nestedScrollEnabled={true}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              hitHomeAPI(currentChild.child);
            }}
            onEndReached={() =>
              loadMore && page !== 0 ? NewhitHomeAPI() : null
            }
            onEndReachedThreshold={0.5}
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
        )}
      </View>
      {/* Filter modal ------------------------ */}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <FilterModal
            setModalOpen={(value: boolean) => setModalOpen(value)}
            resetFilter={() => {
              setModalOpen(false);
              hitFilterAPI();
            }}
            applyFilter={(value: any, Activitytype: Array<any>, dates: any) => {
              console.log("incoming  ", value, dates, Activitytype);
              dispatch(
                addFilter(
                  myFilter.activity,
                  dates.fromDate,
                  dates.toDate,
                  Activitytype,
                  () => {
                    console.warn(" filter redux ...", myFilter);
                    hitFilterAPI(
                      value,
                      dates.fromDate,
                      dates.toDate,
                      Activitytype.join(",")
                    );
                  }
                )
              );
            }}
          />
        </View>
      </Modal>
      {/* Share modal ------------------------ */}
      <Modal animationType="slide" transparent={true} visible={shareOpen}>
        <View style={Styles.modalView2}>
          <View />
          <ShareModal data={shareData} closeModal={() => setShareOpen(false)} />
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
  modalView2: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
});
