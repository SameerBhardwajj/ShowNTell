import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader, CustomSearchBar } from "../../../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../../../utils";
import RecentFlatlist from "./RecentFlatlist";
import ResultFlatlist from "./ResultFlatlist";
import { searchCenter } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();

  const { searchList } = useSelector((state: { NearbySchool: any }) => ({
    searchList: state.NearbySchool.searchList,
  }));

  const [query, setQuery] = useState("");
  const [showRes, setshowRes] = useState(false);
  const [data, setData] = useState([]);

  const hitSearchAPI = () => {
    dispatch(
      searchCenter(query, () => {
        console.warn("list ", searchList);
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
        onPress={(text: string) => {
          props.navigation.navigate(ScreenName.SCHOOL_LISTING);
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
          setData([]);
          setQuery("");
          setshowRes(false);
          props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
            coordinates: item.geometry.location,
          });
        }}
      />
    );
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
            setQuery(text),
              query.length >= 2
                ? (hitSearchAPI(), setshowRes(true))
                : setshowRes(false);
          }}
          onPressCancel={() => {
            setQuery(""), setshowRes(false);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={Styles.currentLoc}
        >
          <Image source={Images.Location_icon} />
          <Text style={Styles.myLocText}>{Strings.Use_my_location}</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", paddingHorizontal: vw(10) }}>
          {showRes ? (
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
              data={DATA}
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
});

// Dummy data for Search API
const DATA = [
  { title: "27A Ann Street, Surry Hills" },
  { title: "851 South Dowling Street, Surry Hills" },
  { title: "89 Wigram Road, Glebe" },
  { title: "8 Challis Avenue, Potts Point" },
];
