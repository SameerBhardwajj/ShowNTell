import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Images, vh, vw, Colors } from "../../../utils";

export interface AppProps {
  item: any;
  index: string;
  scrollableTest: Function;
}

export default function App(props: AppProps) {
  const { text, name } = props.item;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => props.scrollableTest()}
      style={Styles.testimonialView}
    >
      <Image
        source={Images.Testimonial_Base}
        resizeMode="contain"
        resizeMethod="resize"
        style={Styles.testimonialImg}
      />
      <Image source={Images.Colen_Bubble} style={Styles.testimonialColen} />
      <View style={Styles.testimonialTxtView}>
        <Text numberOfLines={5} style={Styles.testimonialtext}>
          {`"`}
          {text.replace(/(<([^>]+)>)/gi, " ")}
          {`"`}
        </Text>
        <Text style={Styles.testimonialAuthor}>
          {name === "" ? "" : "- "}
          {name}
        </Text>
        {/* <Text style={Styles.testimonialCentre}>{centre}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  testimonialView: {
    width: vw(330),
    alignItems: "center",
    marginBottom: vh(20),
    marginHorizontal: vw(20),
    marginTop: vh(8),
  },
  testimonialImg: {
    marginTop: vw(40),
    width: vw(350),
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
  testimonialCentre: {
    fontFamily: "Nunito-Medium",
    fontSize: vw(14),
    textAlign: "center",
    paddingTop: vh(2),
  },
});
