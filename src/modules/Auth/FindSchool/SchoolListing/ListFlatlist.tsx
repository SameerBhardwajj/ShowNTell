import * as React from "react";
import { View, Text, Linking, Platform, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

// custom imports
import { CustomButton } from "../../../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../../../utils";
const IOS = "ios";
const MAP_SCHEME = "maps:";
const GEO_SCHEME = "geo:";

export interface AppProps {
  navigation?: any;
  item: any;
}

export default function App(props: AppProps) {
  const { item } = props;

  const inactiveDotColor = () => {
    return <View style={[Styles.dotColor, { opacity: 0.6 }]} />;
  };

  const activeDotColor = () => {
    return <View style={Styles.dotColor} />;
  };

  const openGps = (lat: number, lng: number) => {
    var scheme = Platform.OS === IOS ? MAP_SCHEME : GEO_SCHEME;
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  };
  return (
    <View style={Styles.mainView}>
      <Swiper
        index={0}
        activeDot={activeDotColor()}
        dot={inactiveDotColor()}
        showsButtons={false}
        loop={true}
        removeClippedSubviews={false}
        style={{ height: vh(192) }}
      >
        {item.schoolImages.map((img: string) => (
          <Image source={{ uri: img }} style={Styles.imgView} />
        ))}
      </Swiper>
      <View style={Styles.schoolView}>
        <Text style={Styles.name}>{item.schoolName}</Text>
        <View style={Styles.locationView}>
          <Image source={Images.Distance_Pin_small} style={Styles.img1} />
          <Text style={Styles.locationText}>{item.location.distance}</Text>
        </View>
        <View style={Styles.locationView}>
          <Image source={Images.Lcation_Pin_small} style={Styles.img2} />
          <Text style={Styles.locationText}>{item.location.address}</Text>
        </View>
        <View style={Styles.locationView}>
          <Image source={Images.Phone_small} style={Styles.img3} />
          <Text style={Styles.locationText}>{item.location.phone}</Text>
        </View>
        <Text style={Styles.description}>{item.description}</Text>
        <View style={Styles.btnView}>
          <CustomButton
            Text={Strings.Get_Directions}
            onPress={() =>
              openGps(item.coordinates.latitude, item.coordinates.longitude)
            }
            ButtonStyle={Styles.btn}
          />
          <CustomButton
            Text={Strings.Schedule_a_Tour}
            onPress={() =>
              props.navigation.navigate(ScreenName.DATE_TIME_SCHEDULE)
            }
            ButtonStyle={Styles.btn}
          />
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    marginBottom: vh(30),
    borderRadius: vh(10),
    alignItems: "center",
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
    backgroundColor: "white",
    borderBottomLeftRadius: vh(10),
    borderBottomRightRadius: vh(10),
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
    height: vw(15),
    width: vw(11),
  },
  img2: {
    height: vw(20),
    width: vw(10),
  },
  img3: {
    height: vw(12),
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    marginHorizontal: 0,
    width: "48%",
  },
});
