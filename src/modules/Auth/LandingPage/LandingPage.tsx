import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

// custom imports
import { Images, vh, vw, Strings } from "../../../utils";
import { CustomButton, CustomToast, Customcartoon } from "../../../Components";
import TestimonialList from "./TestimonialList";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  let flatListRef: any = React.useRef();
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    autoScroll();
  });

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <TestimonialList item={item} index={index} />;
  };

  // Testimonial auto scroll -------------
  const autoScroll = () => {
    setTimeout(() => {
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
    }, 5000);
  };

  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      {/* Custom Cartoon view ------------- */}
      <Customcartoon navigation={props.navigation} />
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
          onPress={() => props.navigation.navigate("Login")}
        />
        {/* Find School Button ------------ */}
        <CustomButton
          Text={Strings.find_nearby_school}
          onPress={() => CustomToast()}
        />
        {/* Need help ------------- */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
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
    marginTop: vh(30),
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
