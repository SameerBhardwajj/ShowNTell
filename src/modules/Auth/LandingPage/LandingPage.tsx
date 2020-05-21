import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "react-native-splash-screen";

// custom imports
import { Images, vh, vw, Strings, Colors, ScreenName } from "../../../utils";
import { CustomButton, Customcartoon } from "../../../Components";
import TestimonialList from "./TestimonialList";
import { updateScrollRef, fetchTestimonials } from "./action";

export function isNullUndefined(item: any) {
  try {
    if (item == null || item == "" || item == 0 || item == undefined) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return true;
  }
}

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const flatListRef: any = React.useRef();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [scroll, setScroll] = useState(true);
  const [counter, setCounter] = useState(true);
  const [data, setData] = useState([]);

  const { fetchTest } = useSelector((state: { LandingPage: any }) => ({
    fetchTest: state.LandingPage.fetchTest,
  }));

  useEffect(() => {
    SplashScreen.hide();
    counter
      ? dispatch(
          fetchTestimonials(
            (success: any) => {
              setCounter(false);
              console.warn(success.length);

              setData(success);
            },
            () => {}
          )
        )
      : null;
    // autoScroll();
    BackHandler.addEventListener("hardwareBackPress", () => {
      ToastAndroid.show(" Exiting the app...", ToastAndroid.SHORT);
      BackHandler.exitApp();
      return true;
    });
  }, [currentIndex]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <TestimonialList
        item={item}
        index={index}
        scrollableTest={() => setScroll(false)}
      />
    );
  };

  // Testimonial auto scroll -------------
  const autoScroll = () => {
    scroll
      ? setTimeout(() => {
          if (flatListRef.current) {
            if (currentIndex < data.length - 1) {
              setCurrentIndex(currentIndex + 1);
              flatListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
              });
            } else {
              setCurrentIndex(0);
              flatListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
              });
            }
          }
        }, 5000)
      : null;
  };

  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={true}
      />
      {/* Custom Cartoon view ------------- */}
      <Customcartoon navigation={props.navigation} small={false} />
      <View style={Styles.loginView}>
        {/* testimonial Flatlist -------------- */}
        <FlatList
          ref={flatListRef}
          data={data.length === 0 ? DATA : data}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScrollToIndexFailed={(data) => {}}
          renderItem={renderItems}
        />
        {/* Login Custom Button ----------- */}
        <CustomButton
          Text={Strings.login}
          onPress={() => props.navigation.navigate(ScreenName.LOGIN)}
        />
        {/* Find School Button ------------ */}
        <CustomButton
          Text={Strings.find_nearby_school}
          onPress={() => props.navigation.navigate(ScreenName.FIND_SCHOOL)}
        />
        {/* Need help ------------- */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            props.navigation.navigate(ScreenName.NEED_HELP, {
              path: ScreenName.LANDING_PAGE,
            })
          }
        >
          <Text style={Styles.btnText}>{Strings.need_help}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  mainImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    marginBottom: vh(30),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(28),
    paddingTop: vh(10),
  },
});

const DATA = [{ text: "", name: "" }];
