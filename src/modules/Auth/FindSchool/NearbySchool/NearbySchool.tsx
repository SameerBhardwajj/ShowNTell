import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Alert,
  BackHandler,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomSearchBar,
  CustomToast,
  CustomLoader,
} from "../../../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../../../utils";
import RecentFlatlist from "./RecentFlatlist";
import ResultFlatlist from "./ResultFlatlist";
import { searchCenter, recentSearch, getCoordinates } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const input1: any = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState(Object);
  const [coordinates, setCoordinates] = useState(Object);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const { searchList, recentList } = useSelector(
    (state: { NearbySchool: any }) => ({
      searchList: state.NearbySchool.searchList,
      recentList: state.NearbySchool.recentList,
    })
  );

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, []);

  const hitSearchAPI = () => {
    dispatch(
      searchCenter(
        query,
        () => {
          setData(searchList);
        },
        () => {
          Keyboard.dismiss();
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <RecentFlatlist
        item={item}
        index={index}
        currentData={isEmpty(coordinates)}
        onPress={() => {
          setQuery(item.description);
          input1.current.focus();
          setCurrentData(item);
          let temp: never[] = [];
          setData(temp.concat(item));
          dispatch(
            getCoordinates(item.place_id, (data: any) => {
              setCoordinates(data.result);
            })
          );
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
          setQuery(item.description);
          setCurrentData(item);
          let temp: never[] = [];
          setData(temp.concat(item));
          dispatch(
            getCoordinates(item.place_id, (data: any) => {
              setCoordinates(data.result);
            })
          );
        }}
      />
    );
  };

  const requestLocationPermission = () => {
    setIsLoading(true);
    CommonFunctions.requestLocationPermission(
      (position: object) => {
        setIsLoading(false);
        props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
          coordinates: position,
        });
      },
      (error: any) => {
        setIsLoading(false);
        error.code === 2
          ? CustomToast(Strings.Please_On_GPS)
          : error.code === 1
          ? Alert.alert(
              Strings.Permission_denied,
              "",
              [
                { text: "OK", onPress: () => Linking.openSettings() },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: true }
            )
          : CustomToast(error.message);
      },
      () => {
        setIsLoading(false);
        Linking.openSettings();
      }
    );
  };

  const isEmpty = (obj: object) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_Schools}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <CustomSearchBar
          ref={input1}
          value={query}
          placeholder={Strings.Search_placeholder}
          onChangeText={(text: string) => {
            setQuery(text), hitSearchAPI();
          }}
          autoFocus={true}
          onPressCancel={() => {
            setQuery(""), setData([]);
          }}
          onSubmitEditing={() => {
            isEmpty(currentData)
              ? null
              : (setIsLoading(true),
                dispatch(
                  recentSearch(currentData, (data: any) => {
                    setData([]);
                    setQuery("");
                    setCurrentData({});
                    setIsLoading(false);
                    props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
                      coordinates: coordinates.geometry.location,
                    });
                  })
                ));
          }}
        />
        <CustomLoader loading={isLoading} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsLoading(true);
            requestLocationPermission();
            Keyboard.dismiss();
          }}
          style={Styles.currentLoc}
        >
          <Image source={Images.Location_icon} />
          <Text style={Styles.myLocText}>{Strings.Use_my_location}</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", paddingHorizontal: vw(10) }}>
          {query.length !== 0 ? (
            !(data && data.length) ? (
              <Text style={Styles.noDataText}>{Strings.No_data_Found}</Text>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemResult}
              />
            )
          ) : (
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                recentList.length === 0 ? null : (
                  <Text style={Styles.headerText}>
                    {Strings.Recent_Searches}
                  </Text>
                )
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
  noDataText: {
    alignSelf: "center",
    paddingTop: vh(10),
    color: Colors.violet,
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
});
