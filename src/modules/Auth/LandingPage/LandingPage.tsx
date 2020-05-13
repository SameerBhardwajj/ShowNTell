import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";

// custom imports
import { Images, vh, vw, Strings, Colors, ScreenName } from "../../../utils";
import { CustomButton, Customcartoon } from "../../../Components";
import TestimonialList from "./TestimonialList";
import { updateScrollRef } from "./action";

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

  useEffect(() => {
    autoScroll();
  }, []);

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
          if (currentIndex < DATA.length - 1) {
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
          data={DATA}
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

const DATA = [
  {
    title: Strings.testimonialtext,
    author: Strings.testimonialAuthor,
    centre: Strings.testimonialCentre,
  },
  {
    title: Strings.testimonialtext,
    author: Strings.testimonialAuthor,
    centre: Strings.testimonialCentre,
  },
  {
    title: Strings.testimonialtext,
    author: Strings.testimonialAuthor,
    centre: Strings.testimonialCentre,
  },
  {
    title: Strings.testimonialtext,
    author: Strings.testimonialAuthor,
    centre: Strings.testimonialCentre,
  },
  {
    title: Strings.testimonialtext,
    author: Strings.testimonialAuthor,
    centre: Strings.testimonialCentre,
  },
];
