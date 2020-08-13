import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  StatusBar,
  Dimensions,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
// @ts-ignore
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

// custom imports
import { CustomHeader, CustomLoader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import TopTabNavigation from "./TopTabNavigation";
import { hiBasicDetails, hitUploadCDNapi, hitUploadImage } from "./action";
import { updatePermission } from "../Auth/Login/action";
import ProfileModal from "./ProfileModal";
import CameraModal from "./Modals/CameraModal";

const iPhoneX = Dimensions.get("window").height >= 812;

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { data, permission } = useSelector(
    (state: { Profile: any; Login: any }) => ({
      data: state.Profile.data,
      permission: state.Login.permission,
    })
  );
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [myProfile, setMyProfile] = useState("");

  useEffect(() => {
    CommonFunctions.isEmpty(data) ? setLoading(true) : null;
    HitProfileAPI();
  }, []);

  // Get profile Data -------------------
  const HitProfileAPI = () => {
    dispatch(
      hiBasicDetails(
        () => {
          setLoading(false);
        },
        (err: any) => {
          setLoading(false);
        }
      )
    );
  };

  // Change profile Picture --------------------
  const ImagePick = (value: number) => {
    if (value === 0) {
      if (Platform.OS === "android") {
        androidPermissions(0);
      } else {
        ImagePicker.openPicker({
          mediaType: "photo",
        })
          .then((image: any) => {
            hitProfileUpdate(image.path, value);
          })
          .catch((e) => {
            e.code === "E_PICKER_CANCELLED"
              ? null
              : iosPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY, 0);
            setModalOpen(false);
          });
      }
    } else {
      if (Platform.OS === "android") {
        androidPermissions(1);
      } else {
        CommonFunctions.Picker(
          (image: any, res: any) => {
            setMyProfile(image.uri);
            setModalOpen(false);
            hitProfileUpdate(image.uri, 1);
          },
          () => {
            setModalOpen(false);
          }
        );
      }
    }
  };

  const androidPermissions = async (type: number) => {
    let myPermission;
    if (type === 0) {
      myPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    } else {
      myPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }
    if (myPermission === PermissionsAndroid.RESULTS.GRANTED) {
      type === 0
        ? ImagePicker.openPicker({
            mediaType: "photo",
          })
            .then((image: any) => {
              console.log(image);

              setMyProfile(image.path);
              hitProfileUpdate(image.path, type);
            })
            .catch((e) => {
              setModalOpen(false);
            })
        : (setModalOpen(false), setCameraModalOpen(true));
    } else {
      myPermission === "never_ask_again"
        ? type === 0
          ? permission.storage === 2
            ? permissionAccess(type)
            : dispatch(
                updatePermission({ storage: 2 }, () => {
                  setModalOpen(false);
                })
              )
          : permission.camera === 2
          ? permissionAccess(type)
          : dispatch(
              updatePermission({ camera: 2 }, () => {
                setModalOpen(false);
              })
            )
        : null;
      setModalOpen(false);
    }
  };

  // Check Permission --------------------
  const iosPermissions = (myPermission: any, type: number) => {
    check(myPermission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            CustomToast(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            type === 0
              ? permission.storage === 1
                ? permissionAccess(type)
                : dispatch(
                    updatePermission({ storage: 1 }, () => {
                      setModalOpen(false);
                    })
                  )
              : permission.camera === 1
              ? permissionAccess(type)
              : dispatch(
                  updatePermission({ camera: 1 }, () => {
                    setModalOpen(false);
                  })
                );
            break;
          case RESULTS.GRANTED:
            type === 0 ? ImagePick(0) : ImagePick(1);
            break;
          case RESULTS.BLOCKED:
            type === 0
              ? permission.storage === 2
                ? permissionAccess(type)
                : dispatch(
                    updatePermission({ storage: 2 }, () => {
                      setModalOpen(false);
                    })
                  )
              : permission.camera === 2
              ? permissionAccess(type)
              : dispatch(
                  updatePermission({ camera: 2 }, () => {
                    setModalOpen(false);
                  })
                );
            break;
        }
      })
      .catch((error) => {
        CustomToast(`Permission Error: ${error}`);
      });
  };

  // Permission alert ------------------
  const permissionAccess = (type: number) => {
    Alert.alert(
      type === 0
        ? Platform.OS === "ios"
          ? "Please allow to access your Photo Gallery !"
          : "Please allow to access your Storage"
        : "Please allow to access Camera !",
      "",
      [
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
        {
          text: "Cancel",
          onPress: () => setModalOpen(false),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const hitProfileUpdate = (image: any, value: number) => {
    setLoading(true);
    console.warn("my img ", image);

    var formdata = new FormData();
    formdata.append("file", {
      uri:
        Platform.OS === "ios"
          ? value === 0
            ? image.replace("file://", "")
            : image.replace("file://", "")
          : value === 0
          ? `file://${image}`
          : `${image}`,
      name: "test" + ".jpg",
      type: "image/jpg",
    });
    setModalOpen(false);
    dispatch(
      hitUploadCDNapi(
        formdata,
        (data: any) => {
          updateImage(data.key, image);
        },
        (e: any) => {
          setLoading(false);
        }
      )
    );
  };

  const updateImage = (img: string, image: string) => {
    dispatch(
      hitUploadImage(
        img,
        () => {
          dispatch(
            hiBasicDetails(
              () => {
                setLoading(false);
                setMyProfile(image);
              },
              (err: any) => {
                setLoading(false);
              }
            )
          );
        },
        (e: any) => {
          setLoading(false);
          CustomToast(e);
        }
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomLoader loading={isLoading} />
      <StatusBar backgroundColor={picModalOpen ? "black" : Colors.violet} />
      <CustomHeader
        title={Strings.My_Profile}
        onPressBack={() => {
          props.navigation.pop();
        }}
      />

      <View style={Styles.profilePicView}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={Styles.profilePic}
          onPress={() => setPicModalOpen(true)}
        >
          <Image
            source={
              myProfile.length !== 0
                ? { uri: myProfile }
                : CommonFunctions.isNullUndefined(data.s3_photo_path)
                ? Images.Profile_Placeholder
                : { uri: data.s3_photo_path }
            }
            resizeMethod="resize"
            resizeMode={
              CommonFunctions.isNullUndefined(data.s3_photo_path)
                ? "center"
                : "cover"
            }
            style={Styles.pic}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.editView}
            onPress={() => setModalOpen(true)}
          >
            <Image
              source={Images.Edit_Image}
              style={Styles.editImg}
              resizeMode="center"
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={Styles.nameText}>
          {data.first_name} {data.last_name}
        </Text>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <TopTabNavigation />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <ProfileModal
          closeModal={() => setModalOpen(false)}
          openGallery={() => ImagePick(0)}
          openCamera={() => ImagePick(1)}
          deleteProfile={() => updateImage("", "")}
        />
      </Modal>
      <Modal animationType="slide" transparent={true} visible={picModalOpen}>
        <View style={Styles.picModalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPicModalOpen(false)}
            style={Styles.modalBack}
          >
            <Image source={Images.back_icon} />
          </TouchableOpacity>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
          >
            <Image source={{ uri: data.s3_photo_path }} style={Styles.img} />
          </ReactNativeZoomableView>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={cameraModalOpen}>
        <CameraModal
          closeModal={() => setCameraModalOpen(false)}
          onPress={(image: any) => {
            setCameraModalOpen(false);
            setMyProfile(image.uri);
            hitProfileUpdate(image.uri, 1);
          }}
        />
      </Modal>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  profilePicView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: Colors.violet,
    paddingVertical: vh(20),
  },
  profilePic: {
    height: vh(120),
    width: vh(120),
    borderRadius: vh(60),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  pic: {
    height: vh(120),
    width: vh(120),
    borderRadius: vh(60),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    color: "white",
    fontSize: vh(22),
    paddingTop: vh(16),
  },
  editView: {
    position: "absolute",
    paddingLeft: vw(10),
    paddingTop: vw(10),
    right: 0,
    bottom: 0,
  },
  editImg: {
    height: vh(35),
    width: vh(35),
  },
  picModalView: {
    flex: 1,
    backgroundColor: "black",
  },
  img: {
    width: "100%",
    height: vh(250),
    backgroundColor: "white",
  },
  modalBack: {
    position: "absolute",
    top: iPhoneX ? vh(30) : 0,
    left: 0,
    padding: vh(20),
    zIndex: 99,
  },
});
