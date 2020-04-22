import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import Swiper from "react-native-swiper";

// custom imports
import { CustomHeader, CustomButton } from "../../../Components";
import { Strings, vw, vh, Images, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const inactiveDotColor = () => {
    return <View style={[Styles.dotColor, { opacity: 0.6 }]} />;
  };

  const activeDotColor = () => {
    return <View style={Styles.dotColor} />;
  };

  const openGps = (lat: number, lng: number) => {
    var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_Schools}
        onPressBack={() => props.navigation.pop()}
        notify={true}
        notifyNumber={1}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={Styles.innerView}>
          <Text style={Styles.headingText}>{Strings.Choose_a_Center}</Text>
          <View style={Styles.mainInnerView}>
            <Swiper
              index={0}
              activeDot={activeDotColor()}
              dot={inactiveDotColor()}
              showsButtons={false}
              loop={true}
              style={{ height: vh(192) }}
            >
              <Image source={Images.any} style={Styles.imgView} />
              <Image source={Images.any} style={Styles.imgView} />
              <Image source={Images.any} style={Styles.imgView} />
            </Swiper>
            <View style={Styles.schoolView}>
              <Text style={Styles.name}>Kiddie Cloud Play School</Text>
              <View style={Styles.locationView}>
                <Image source={Images.Distance_Pin_small} style={Styles.img1} />
                <Text style={Styles.locationText}>0.8 Miles</Text>
              </View>
              <View style={Styles.locationView}>
                <Image source={Images.Lcation_Pin_small} style={Styles.img2} />
                <Text style={Styles.locationText}>
                  851 South Dowling Street, Surry Hills0.8 Miles
                </Text>
              </View>
              <View style={Styles.locationView}>
                <Image source={Images.Phone_small} style={Styles.img3} />
                <Text style={Styles.locationText}>561 - 9637625</Text>
              </View>
              <Text style={Styles.description}>
                One of the best play school for kids which not only focus on
                learning but also on extracurricular activities.
              </Text>
              <View style={Styles.btnView}>
                <CustomButton
                  Text={Strings.Get_Directions}
                  onPress={() => openGps(28.6728, 77.3863)}
                  ButtonStyle={Styles.btn}
                />
                <CustomButton
                  Text={Strings.Schedule_a_Tour}
                  onPress={() => props.navigation.navigate("DateTimeSchedule")}
                  ButtonStyle={Styles.btn}
                />
              </View>
            </View>
          </View>
          <Image source={Images.any} style={Styles.finalImg} />
        </View>
      </ScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    paddingVertical: vh(20),
    paddingHorizontal: vh(16),
    alignItems: "center",
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingBottom: vh(16),
  },
  mainInnerView: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: vh(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.49,
  },
  dotColor: {
    backgroundColor: "white",
    width: vw(8),
    height: vw(8),
    borderRadius: 4,
    marginStart: 3,
    marginEnd: 3,
    marginTop: vh(3),
    marginBottom: vh(3),
  },
  imgView: {
    width: "100%",
    height: vh(192),
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
  },
  schoolView: {
    padding: vh(16),
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(18),
    alignSelf: "flex-start",
  },
  locationView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: vh(4),
  },
  img1: {
    height: vh(12),
    width: vw(11),
  },
  img2: {
    height: vh(17),
    width: vw(11),
  },
  img3: {
    height: vh(10),
    width: vw(11),
  },
  locationText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    paddingLeft: vw(8),
  },
  description: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(12),
  },
  btnView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  btn: {
    marginHorizontal: 0,
    width: vw(165),
  },
  finalImg: {
    width: "100%",
    height: vh(192),
    borderRadius: vh(10),
    marginVertical: vh(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.49,
  },
});
