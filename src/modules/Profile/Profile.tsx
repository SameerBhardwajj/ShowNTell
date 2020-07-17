import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader, CustomLoader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import TopTabNavigation from "./TopTabNavigation";
import { hiBasicDetails, hitUploadCDNapi, hitUploadImage } from "./action";
import { updateProfilePic } from "../Auth/Login/action";
import ProfileModal from "./ProfileModal";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { data } = useSelector((state: { Profile: any }) => ({
    data: state.Profile.data,
  }));
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    HitProfileAPI();
  }, []);

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

  const ImagePick = (value: number) => {
    value === 1
      ? ImagePicker.openPicker({
          cropping: true,
        })
          .then((image: any) => hitProfileUpdate(image))
          .catch((e) => CustomToast(e))
      : ImagePicker.openCamera({
          cropping: true,
        })
          .then((image: any) => hitProfileUpdate(image))
          .catch((e) => CustomToast(e));
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
        onPressBack={() => props.navigation.pop()}
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
          openGallery={() => ImagePick(1)}
          openCamera={() => ImagePick(2)}
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
