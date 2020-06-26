import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";

// custom imports
import { updateTab } from "../Home/action";
import { updateLibrary, PhotoLibraryAPI, updateDownload } from "./action";
import { CustomHeader, CustomToast, CustomLoader } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import SectionListing from "./SectionListing";

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
  const [isLoading, setLoading] = useState(false);
  const { tab, libraryData, currentChild } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      tab: state.Home.tab,
      libraryData: state.PhotoLibrary.libraryData,
      currentChild: state.Home.currentChild,
    })
  );

  useEffect(() => {
    dispatch(updateTab(true, () => {}));
    setLoading(true);
    dispatch(
      PhotoLibraryAPI(
        currentChild.child,
        0,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, [currentChild]);

  const groupingData = (arr: any) => {
    let temp = new Array().slice(0);
    let i = 0;
    if (arr.length !== 0) {
      arr.map((item: any, index: number) => {
        if (!CommonFunctions.isNullUndefined(item.s3_photo_path)) {
          if (
            index !== 0 &&
            item.activity_date.toString() !=
              arr[index - 1].activity_date.toString()
          ) {
            i++;
            temp[i] = [];
          }
          CommonFunctions.isNullUndefined(temp[i])
            ? (temp.push([]), temp[i].push(item))
            : temp[i].push(item);
        }
      });
    }
    temp.filter((item) => item !== undefined);
    console.log("temp ", temp);

    return temp;
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    console.warn("my .... ", item);
    return (
      <SectionListing
        index={index}
        item={item}
        navigation={props.navigation}
        select={select}
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
      <View style={[Styles.innerView, { marginBottom: select ? vh(50) : 0 }]}>
        <View style={Styles.headingView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelect(!select),
                dispatch(
                  updateTab(!tab, () => {
                    console.warn(tab);
                    select
                      ? dispatch(
                          updateDownload([], () => {
                            console.warn("empty");
                          })
                        )
                      : null;
                  })
                );
            }}
          >
            <Text style={Styles.dateText}>{select ? "Cancel" : "Select"}</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? null : libraryData.length === 0 ? null : (
          <FlatList
            bounces={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={groupingData(libraryData)}
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
    paddingHorizontal: vh(10),
    width: "100%",
    flex: 1,
  },
  headingView: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
  },
  dateText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: Colors.violet,
    paddingTop: vh(16),
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
    alignSelf: "flex-end",
    marginRight: vw(20),
  },
});
