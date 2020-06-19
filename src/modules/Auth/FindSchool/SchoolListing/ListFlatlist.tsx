import * as React from "react";
import {
  View,
  Text,
  Linking,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";

// custom imports
import { CustomButton } from "../../../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../../../utils";
const IOS = "ios";
const MAP_SCHEME = "maps:0,0?q=";
const GEO_SCHEME = "geo:0,0?q=";
export interface AppProps {
  navigation?: any;
  item: any;
  openModal: Function;
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
        style={{
          height: vh(192),
          backgroundColor: Colors.creamWhite,
        }}
      >
        <Image
          source={
            item.center_image === null
              ? Images.Image_Placeholder
              : { uri: item.center_image }
          }
          style={
            item.center_image === null ? Styles.placeholderImg : Styles.imgView
          }
        />
      </Swiper>
      <View style={Styles.schoolView}>
        <Text style={Styles.name}>{item.name}</Text>
        <View style={Styles.locationView}>
          <Image source={Images.Distance_Pin_small} style={Styles.img1} />
          <Text style={Styles.locationText}>{`${Math.round(
            item.distance_in_km / 1.609
          )} ${Strings.Miles}`}</Text>
        </View>
        <View style={Styles.locationView}>
          <Image source={Images.Lcation_Pin_small} style={Styles.img2} />
          <Text
            style={Styles.locationText}
          >{`${item.address1} ${item.address2} ${item.city}`}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.locationView}
          onPress={() =>
            CommonFunctions.callNumber(parseInt(item.phone.replaceAll("-", "")))
          }
        >
          <Image source={Images.Phone_small} style={Styles.img3} />
          <Text style={Styles.locationText}>{`${item.phone}`}</Text>
        </TouchableOpacity>
        {/* <Text style={Styles.description}>{}</Text> */}
        <View style={Styles.btnView}>
          <CustomButton
            Text={Strings.Get_Directions}
            onPress={() => openGps(item.center_lat, item.center_long)}
            ButtonStyle={Styles.btn}
          />
          <CustomButton
            Text={
              item.calendar_id === null
                ? Strings.General_Info
                : Strings.Schedule_a_Tour
            }
            onPress={() =>
              item.calendar_id === null
                ? props.navigation.navigate(ScreenName.SCHEDULE_TOUR, {
                    id: item.location_id,
                    date: null,
                    time: null,
                  })
                : props.openModal()
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
    borderRadius: vw(4),
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
  placeholderImg: {
    alignSelf: "center",
    marginTop: vh(60),
  },
  schoolView: {
    padding: vh(16),
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: vh(10),
    borderBottomRightRadius: vh(10),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.borderGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: vw(20),
    elevation: 4,
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
    paddingVertical: vh(4),
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
