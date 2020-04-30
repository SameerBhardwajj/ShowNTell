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
import { updateTab } from "../Home/Action";
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
  CustomInputText,
} from "../../Components";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";
import GalleryFlatlist from "./GalleryFlatlist";

export interface AppProps {
  navigation?: any;
}
const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";
let dataArray = new Array();

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const { tab } = useSelector((state: { Home: any }) => ({
    tab: state.Home.tab,
  }));

  useEffect(() => {
    // arrangeData(DATA);
  }, []);

  const arrangeData = (data: Array<any>) => {
    let temp: any[] = [];
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
        onPress={(data: any) =>
          select
            ? null
            : props.navigation.navigate("GalleryDetails", { item: data })
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
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>
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
          data={arrangeData(DATA)}
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
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    right: vw(16),
    top: vh(43),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: vh(2),
    tintColor: Colors.violet,
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vh(16),
    width: "100%",
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
  picsView: {
    flexDirection: "row",
    width: "100%",
    height: vh(198),
    justifyContent: "space-between",
    marginBottom: vh(16),
  },
  bigView: {
    height: "100%",
    width: vw(178),
    borderRadius: vh(10),
    alignItems: "center",
    justifyContent: "center",
  },
  bigImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
  smallView: {
    height: "46%",
    width: vw(178),
    borderRadius: vh(10),
    alignItems: "center",
    justifyContent: "center",
  },
  smallImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
});

// const DATA = [
//   { img1: Images.any, img2: Images.any, },
//   { img1: Images.any, img2: Images.any, img3: Images.any },
//   { img1: Images.any, img2: Images.any, img3: Images.any },
//   { img1: Images.any, img2: Images.any, img3: Images.any },
//   { img1: Images.any, img2: Images.any, img3: Images.any },
//   { img1: Images.any, img2: Images.any, img3: Images.any },
// ];

const DATA = [
  {
    img: img,
    // img: 0,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 1,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 2,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 3,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 4,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 5,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 6,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 7,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
  {
    img: img,
    // img: 8,
    heading: "Lunch Time",
    category: "Healthy • Fresh and Green",
  },
];
