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
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

// custom imports
import { CustomHeader, CustomLoader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import TopTabNavigation from "./TopTabNavigation";
import { hiBasicDetails, hitUploadCDNapi, hitUploadImage } from "./action";
import { updateProfilePic, updatePermission } from "../Auth/Login/action";
import ProfileModal from "./ProfileModal";

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
          dispatch(
            updateProfilePic(
              CommonFunctions.isNullUndefined(data.s3_photo_path)
                ? ""
                : data.s3_photo_path,
              () => {}
            )
          );
        },
        (err: any) => {
          setLoading(false);
          console.warn("err", err);
        }
      )
    );
  };

  // Change profile Picture --------------------
  const ImagePick = (value: number) => {
    if (value === 0) {
      ImagePicker.openPicker({
        cropping: true,
      })
        .then((image: any) => hitProfileUpdate(image))
        .catch((e) =>
          Platform.OS === "ios"
            ? iosPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY, 0)
            : androidPermissions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, 0)
        );
    } else {
      ImagePicker.openCamera({
        cropping: true,
      })
        .then((image: any) => hitProfileUpdate(image))
        .catch((e) =>
          Platform.OS === "android"
            ? iosPermissions(PERMISSIONS.ANDROID.CAMERA, 1)
            : androidPermissions(PERMISSIONS.IOS.CAMERA, 1)
        );
    }
  };

  const androidPermissions = async (permission: any, type: number) => {
    if (type === 0) {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    } else {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePick(type);
    } else {
      permission === "never_ask_again" ? permissionAccess(type) : null;
    }

    // if (permission === PermissionsAndroid.RESULTS.GRANTED) {
    //   ImagePick(type)
    // } else {
    //   permission === "never_ask_again" ? permissionAccess() : null;

    // }
    // }
  };

  // Check Permission --------------------
  const iosPermissions = (myPermission: any, type: number) => {
    check(myPermission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.warn("denied");
            type === 0
              ? permission.storage === 1
                ? permissionAccess(type)
                : dispatch(updatePermission({ storage: 1 }, () => {}))
              : permission.camera === 1
              ? permissionAccess(type)
              : dispatch(updatePermission({ storage: 1 }, () => {}));
            break;
          case RESULTS.GRANTED:
            type === 0
              ? permission.storage === 3
                ? null
                : dispatch(updatePermission({ storage: 3 }, () => {}))
              : permission.camera === 3
              ? null
              : dispatch(updatePermission({ camera: 3 }, () => {}));
            ImagePick(type);
            break;
          case RESULTS.BLOCKED:
            console.warn("blocked", permission);

            type === 0
              ? permission.storage === 2
                ? permissionAccess(type)
                : dispatch(updatePermission({ storage: 2 }, () => {}))
              : permission.camera === 2
              ? permissionAccess(type)
              : dispatch(updatePermission({ storage: 2 }, () => {}));
            break;
        }
      })
      .catch((error) => {
        CustomToast(error);
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
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const hitProfileUpdate = (image: any) => {
    setLoading(true);

    var formdata = new FormData();
    formdata.append("file", {
      uri: image.path.replace("file://", ""),
      name: "test" + ".jpeg",
      type: "image/jpeg",
    });
    setModalOpen(false);
    dispatch(
      hitUploadCDNapi(
        formdata,
        (data: any) => {
          console.warn("my  ", data.key);
          updateImage(data.key);
        },
        (e: any) => {
          setLoading(false);
          console.warn("error1  ", e);
        }
      )
    );
  };

  const updateImage = (img: string) => {
    dispatch(
      hitUploadImage(
        img,
        () => {
          HitProfileAPI();
        },
        (e: any) => {
          setLoading(false);
          console.warn("error3  ", e);
        }
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomLoader loading={isLoading} />
      <CustomHeader
        title={Strings.My_Profile}
        onPressBack={() => {
          props.navigation.pop();
          dispatch(
            updateProfilePic(
              CommonFunctions.isNullUndefined(data.s3_photo_path)
                ? ""
                : data.s3_photo_path,
              () => {}
            )
          );
        }}
      />
      <View style={Styles.profilePicView}>
        <View style={Styles.profilePic}>
          <Image
            source={
              CommonFunctions.isNullUndefined(data.s3_photo_path)
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
        </View>
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
          deleteProfile={() => updateImage("")}
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
});
