import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Platform,
  Linking,
  PermissionsAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useIsFocused } from "@react-navigation/native";

// custom imports
import { PhotoLibraryAPI, updateDownload, updateSelect } from "./action";
import {
  CustomHeader,
  CustomToast,
  CustomLoader,
  CustomNoData,
} from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import SectionListing from "./SectionListing";
import { updatePermission } from "../Auth/Login/action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const {
    currentChild,
    downloadGallery,
    select,
    libraryData,
    page,
    permission,
  } = useSelector((state: { Home: any; PhotoLibrary: any; Login: any }) => ({
    tab: state.Home.tab,
    currentChild: state.Home.currentChild,
    downloadGallery: state.PhotoLibrary.downloadGallery,
    select: state.PhotoLibrary.select,
    libraryData: state.PhotoLibrary.libraryData,
    page: state.PhotoLibrary.page,
    permission: state.Login.permission,
  }));

  useEffect(() => {
    libraryData.length === 0 ? setLoading(true) : null;
  }, [currentChild]);

  useEffect(() => {
    focused ? hitPhotoLibraryAPI(0) : null;
  }, [focused]);

  // Get Photos --------------------
  const hitPhotoLibraryAPI = (page: number) => {
    dispatch(
      PhotoLibraryAPI(
        currentChild.child,
        page,
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setLoading(false);
        },
        () => setLoading(false)
      )
    );
  };

  // Download images -----------------
  const downloadAll = async () => {
    let temp = downloadGallery;
    Promise.all(
      temp.map(async (img: string) => {
        let result = await new Promise((resolve, reject) => {
          saveToCameraRoll(
            img,
            () => {
              CustomToast("Download Start...");
              resolve();
            },
            (error: any) => {
              reject();
            }
          );
        });
      })
    )
      .then(() => {
        CustomToast("All images are successfully saved !");
        emptyTheGallery();
      })
      .catch((error: any) => {
        emptyTheGallery();
      });
  };

  // Clear State ---------------------
  const emptyTheGallery = () => {
    dispatch(
      updateDownload([], () => {
        console.warn("empty");
      })
    );
  };

  // Grouping images into pairs of 3 ----------------
  const groupingData = (arr: any) => {
    let temp = new Array().slice(0);
    let i = 0;
    if (arr.length !== 0) {
      arr.map((item: any) => {
        if (!CommonFunctions.isNullUndefined(item.s3_photo_path)) {
          CommonFunctions.isNullUndefined(temp[i])
            ? (temp.push([]), temp[i].push(item))
            : temp[i].push(item);
        }
      });
    }
    temp.filter((item) => item !== undefined);
    return temp;
  };

  // Permission alert ------------------
  const permissionAccess = () => {
    Alert.alert(
      Platform.OS === "ios"
        ? "Please allow to access your Photo Gallery !"
        : "Please allow to access your Storage",
      "",
      [
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  /**
   *
   * Permission Status :
   * 0 -> Not Asked
   * 1 -> Denied
   * 2 -> Blocked
   * 3 -> Access Granted
   */

  // Save images to Gallery ---------------------
  const saveToCameraRoll = async (
    image: string,
    successCallback: Function,
    failureCallback: Function
  ) => {
    let myPermission;
    if (Platform.OS === "android") {
      myPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (myPermission === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: "jpg",
        })
          .fetch("GET", image)
          .then((res) => {
            CameraRoll.saveToCameraRoll(res.path())
              .then(() => successCallback())
              .catch((err) => failureCallback(err));
          });
      } else {
        myPermission === "never_ask_again" ? permissionAccess() : null;
        failureCallback("Blocked");
      }
    } else {
      CameraRoll.saveToCameraRoll(image)
        .then(() => successCallback())
        .catch((error) => {
          check(PERMISSIONS.IOS.PHOTO_LIBRARY)
            .then((result) => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.warn("unavailable");
                  break;
                case RESULTS.DENIED:
                  permission.storage === 1
                    ? permissionAccess()
                    : dispatch(updatePermission({ storage: 1 }, () => {}));
                  break;
                case RESULTS.GRANTED:
                  permission.storage === 3
                    ? null
                    : dispatch(updatePermission({ storage: 3 }, () => {}));
                  break;
                case RESULTS.BLOCKED:
                  permission.storage === 2
                    ? permissionAccess()
                    : dispatch(updatePermission({ storage: 2 }, () => {}));
                  break;
              }
            })
            .catch((error) => {
              CustomToast(error);
            });
        });
    }
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SectionListing index={index} item={item} navigation={props.navigation} />
    );
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
              select ? emptyTheGallery() : null;
              dispatch(updateSelect(!select));
            }}
          >
            <Text style={Styles.dateText}>{select ? "Cancel" : "Select"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {isLoading ? null : libraryData.length === 0 ? (
            <CustomNoData />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              onEndReached={() => (loadMore ? hitPhotoLibraryAPI(page) : null)}
              onEndReachedThreshold={0.5}
              data={groupingData(libraryData)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
          )}
        </View>
      </View>
      {select ? (
        <View style={Styles.bottomMain}>
          <TouchableOpacity
            style={Styles.btnView}
            activeOpacity={0.8}
            onPress={() => {
              downloadGallery.length === 0
                ? null
                : (downloadAll(), dispatch(updateSelect(false)));
            }}
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
    padding: vh(10),
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
