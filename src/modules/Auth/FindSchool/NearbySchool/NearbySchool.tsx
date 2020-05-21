import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";

// custom imports
import {
  CustomHeader,
  CustomSearchBar,
  CustomToast,
} from "../../../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../../../utils";
import RecentFlatlist from "./RecentFlatlist";
import ResultFlatlist from "./ResultFlatlist";
import { searchCenter, recentSearch } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { searchList, recentList } = useSelector(
    (state: { NearbySchool: any }) => ({
      searchList: state.NearbySchool.searchList,
      recentList: state.NearbySchool.recentList,
    })
  );

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const hitSearchAPI = () => {
    dispatch(
      searchCenter(query, () => {
        setData(searchList);
      })
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <RecentFlatlist
        item={item}
        index={index}
        onPress={() => {
          props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
            coordinates: item.coordinates,
          });
        }}
      />
    );
  };

  const renderItemResult = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ResultFlatlist
        item={item}
        index={index}
        onPress={() => {
          dispatch(
            recentSearch(item, (data: any) => {
              console.warn("det data ", data);
              setData([]);
              setQuery("");
              props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
                coordinates: item.geometry.location,
              });
            })
          );
        }}
      />
    );
  };

  const requestLocationPermission = async () => {
    let hasPermission = true;
    if (Platform.OS === "android") {
      hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    if (!hasPermission) {
      setIsLoading(false);
      Linking.openSettings();
    }
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (info) => {
          let position = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          };
          setIsLoading(false);
          props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
            coordinates: position,
          });
        },
        (error) => {
          setIsLoading(false);
          error.code === 2
            ? CustomToast(Strings.Please_On_GPS)
            : CustomToast(Strings.Unknown_error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
    }
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_Schools}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <CustomSearchBar
          value={query}
          placeholder={Strings.Search_placeholder}
          onChangeText={(text: string) => {
            setQuery(text), query.length >= 2 ? hitSearchAPI() : setData([]);
          }}
          onPressCancel={() => {
            setQuery(""), setData([]);
          }}
        />
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsLoading(true), requestLocationPermission();
          }}
          style={Styles.currentLoc}
        >
          <Image source={Images.Location_icon} />
          <Text style={Styles.myLocText}>{Strings.Use_my_location}</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", paddingHorizontal: vw(10) }}>
          {data.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItemResult}
            />
          ) : (
            <FlatList
              ListHeaderComponent={
                <Text style={Styles.headerText}>{Strings.Recent_Searches}</Text>
              }
              data={recentList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
  },
  currentLoc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: vw(7.8),
    borderBottomWidth: vw(1),
    borderColor: Colors.veryLightGrey,
  },
  myLocText: {
    color: Colors.violet,
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    marginLeft: vw(7.8),
    marginVertical: vh(20),
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    color: Colors.lightGrey,
    fontSize: vh(14),
    marginTop: vh(20),
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});
