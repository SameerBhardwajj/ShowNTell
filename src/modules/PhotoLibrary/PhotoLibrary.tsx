import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Platform,
  PermissionsAndroid,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";

// custom imports
import { updateTab } from "../Home/action";
import { updateLibrary, PhotoLibraryAPI } from "./action";
import { CustomHeader, CustomToast, CustomLoader } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";
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
  const [isLoading, setLoading] = useState(false);
  const { tab, libraryData, otherCurrentChild } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      tab: state.Home.tab,
      libraryData: state.PhotoLibrary.libraryData,
      otherCurrentChild: state.Home.otherCurrentChild,
    })
  );

  useEffect(() => {
    // dispatch(updateLibrary(DATA));
    console.warn(libraryData.length);

    dispatch(updateTab(true, () => {}));
    setLoading(true);
    dispatch(
      PhotoLibraryAPI(
        otherCurrentChild.child,
        0,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  const arrangeData = () => {
    let data = libraryData;
    dataArray = new Array();
    for (let i = 0; i < data.length; i++) {
      dataArray.push([data[i], data[(i += 1)], data[(i += 1)]]);
    }
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
        data={libraryData.length === 0 ? [] : arrangeData()}
        // onLongPress={() => setSelect(true)}
        // onPress={(data: any, dataIndex: number) =>
        //   select
        //     ? ((dataArray[index][dataIndex].selected = !dataArray[index][
        //         dataIndex
        //       ].selected),
        //       console.warn(dataArray[index][dataIndex].selected))
        //     : (dispatch(updateTab(false, () => {})),
        //       props.navigation.navigate(ScreenName.GALLERY_DETAILS, {
        //         item: data,
        //       }))
        // }
      />
    );
  };

  const saveToCameraRoll = async (image: string) => {
    let permission;
    if (Platform.OS === "android") {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (!permission) {
        Linking.openSettings();
      }
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: "jpg",
        })
          .fetch("GET", image)
          .then((res) => {
            CameraRoll.saveToCameraRoll(res.path())
              .then(() => CustomToast(Strings.image_saved))
              .catch((err) => CustomToast(err));
          });
      }
    } else {
      CameraRoll.saveToCameraRoll(image)
        .then(() => CustomToast(Strings.image_saved))
        .catch((error) => CustomToast(error));
    }
  };

  return (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   bounces={false}
    //   contentContainerStyle={[
    //     Styles.mainView,
    //     { paddingBottom: select ? vh(200) : vh(130) },
    //   ]}
    // >
    <View style={Styles.mainView}>
      <CustomHeader
        hideBackButton={true}
        title={Strings.Photo_Library}
        onPressBack={() => {}}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(16) }}
        child={true}
        navigation={props.navigation}
      />
      <CustomLoader loading={isLoading} />
      <View style={Styles.innerView}>
        {/* <View style={Styles.headingView}> */}
        {/* <Text style={Styles.dateText}>18 Jan, 2020</Text> */}
        {/* <TouchableOpacity
            onPress={() => {
              console.warn("here");

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
          </TouchableOpacity> */}
        {/* </View> */}
        {isLoading ? null : (
          <FlatList
            bounces={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={libraryData.length === 0 ? [] : arrangeData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
          />
        )}
      </View>
      {select ? (
        <View style={Styles.bottomMain}>
          <TouchableOpacity
            style={Styles.btnView}
            activeOpacity={0.8}
            // onPress={() => saveToCameraRoll(img)
            onPress={() => console.warn(dataArray)}
          >
            <Image source={Images.download_Icon} style={Styles.btn} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
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
  bottomMain: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  btnView: {
    paddingVertical: vh(12),
    width: "100%",
    alignItems: "center",
  },
  btn: {
    height: vh(22),
    width: vh(22),
    tintColor: Colors.violet,
  },
});
