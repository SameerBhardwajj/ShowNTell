import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "react-native-splash-screen";

// custom imports
import {
  Images,
  vh,
  vw,
  Strings,
  Colors,
  ScreenName,
  Constants,
} from "../../../utils";
import { CustomButton, Customcartoon, CustomLoader } from "../../../Components";
import Swiper from "react-native-swiper";
import { fetchTestimonials } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(true);
  const [data, setData] = useState([]);
  const [exitCounter, setExitCounter] = useState(false);

  const { loginToken } = useSelector((state: { Login: any }) => ({
    loginToken: state.Login.loginToken,
  }));

  useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(loginToken.length === 0 ? false : true);
    fetchTest();
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
  }, [exitCounter]);

  const fetchTest = () => {
    counter
      ? dispatch(
          fetchTestimonials(
            (success: any) => {
              setCounter(false);
              setData(success);
            },
            () => {}
          )
        )
      : null;
  };

  const inactiveDotColor = () => {
    return <View />;
  };

  const activeDotColor = () => {
    return <View />;
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
        {/* testimonial -------------- */}
        <Swiper
          showsButtons={false}
          loop={true}
          key={data.length}
          horizontal={true}
          autoplay={true}
          activeDot={activeDotColor()}
          dot={inactiveDotColor()}
          removeClippedSubviews={false}
          autoplayTimeout={3}
        >
          {data.length === 0 ? (
            <CustomLoader loading={true} />
          ) : (
            data.map((item: any) => (
              <View style={Styles.testimonialView}>
                <Image
                  source={Images.Testimonial_Base}
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={Styles.testimonialImg}
                />
                <Image
                  source={Images.Colen_Bubble}
                  style={Styles.testimonialColen}
                />
                <View style={Styles.testimonialTxtView}>
                  <Text numberOfLines={5} style={Styles.testimonialtext}>
                    {`"`}
                    {item.text.replace(/(<([^>]+)>)/gi, " ")}
                    {`"`}
                  </Text>
                  <Text style={Styles.testimonialAuthor}>
                    {item.name === "" ? "" : "- "}
                    {item.name}
                  </Text>
                  {/* <Text style={Styles.testimonialCentre}>{centre}</Text> */}
                </View>
              </View>
            ))
          )}
        </Swiper>
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
    height: vh(420),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(28),
    paddingTop: vh(10),
  },
  testimonialView: {
    width: vw(330),
    alignItems: "center",
    marginBottom: vh(20),
    marginHorizontal: vw(20),
    marginTop: vh(8),
  },
  testimonialImg: {
    marginTop: vw(40),
    width: "100%",
    height: vw(180),
  },
  testimonialColen: {
    position: "absolute",
    alignSelf: "center",
    marginTop: vw(15),
  },
  testimonialTxtView: {
    position: "absolute",
    marginHorizontal: vw(30),
    marginTop: vw(75),
    alignItems: "center",
    justifyContent: "center",
  },
  testimonialtext: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vw(16),
    textAlign: "center",
  },
  testimonialAuthor: {
    fontFamily: "Nunito-Bold",
    fontSize: vw(16),
    textAlign: "center",
    color: Colors.pink,
    paddingTop: vh(2),
  },
});
