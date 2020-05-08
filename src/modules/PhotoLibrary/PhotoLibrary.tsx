import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "../Home/action";
import { updateLibrary } from "./action";
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";
import GalleryFlatlist from "./GalleryFlatlist";

export interface AppProps {
  navigation?: any;
}
const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";
const img2 =
  "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg";
let dataArray = new Array();

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [selected, setSelected] = useState(false);
  const { tab, libraryData } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      tab: state.Home.tab,
      libraryData: state.PhotoLibrary.libraryData,
    })
  );

  useEffect(() => {
    dispatch(updateLibrary(DATA));
  }, [tab]);

  const arrangeData = () => {
    let data = libraryData;
    // let temp: any[] = [];
    dataArray = new Array();
    for (let i = 0; i < data.length; i++) {
      dataArray.push([data[i], data[(i += 1)], data[(i += 1)]]);
      // console.warn(dataArray);
    }
    // dataArray = temp;
    console.log("data ", dataArray);
    return dataArray;
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;

    return (
      <GalleryFlatlist
        item={item}
        index={index}
        navigation={props.navigation}
        select={select}
        onPress={(data: any, dataIndex: number) =>
          select
            ? ((dataArray[index][dataIndex].selected = !dataArray[index][
                dataIndex
              ].selected),
              console.warn(dataArray[index][dataIndex].selected))
            : (dispatch(updateTab(false, () => {})),
              props.navigation.navigate(ScreenName.GALLERY_DETAILS, {
                item: data,
              }))
        }
      />
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={Styles.mainView}
    >
      <CustomHeader
        hideBackButton={true}
        title={Strings.Photo_Library}
        onPressBack={() => {}}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(16) }}
        child={true}
        navigation={props.navigation}
      />
      <View style={Styles.innerView}>
        <View style={Styles.headingView}>
          <Text style={Styles.dateText}>18 Jan, 2020</Text>
          <TouchableOpacity
            onPress={() => {
              setSelect(!select),
                dispatch(
                  updateTab(!tab, () => {
                    console.warn(tab);
                  })
                );
            }}
          >
            {select ? (
              <Text style={[Styles.dateText, { color: Colors.violet }]}>
                Cancel
              </Text>
            ) : (
              <Text style={[Styles.dateText, { color: Colors.violet }]}>
                Select
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={false}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={arrangeData()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
    </ScrollView>
  );
}

export const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vh(10),
    width: "100%",
    paddingBottom: vh(130),
  },
  headingView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  dateText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: Colors.lightBlack,
    paddingVertical: vh(16),
  },
});

const DATA = [
  {
    img: img,
    // img: 0,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 1,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img,
    // img: 2,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 3,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img,
    // img: 4,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 5,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img,
    // img: 6,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 7,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img,
    // img: 8,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 3,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img,
    // img: 4,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
  {
    img: img2,
    // img: 5,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
    selected: false,
  },
];
