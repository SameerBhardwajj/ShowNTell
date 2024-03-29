import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

// custom imports
import { vw, vh, Colors, Images, CommonFunctions } from "../../utils";
import ChildrenFlatlist from "./ChildrenFlatlist";

export interface AppProps {}

export default function App(props: AppProps) {
  const { data } = useSelector((state: { Profile: any }) => ({
    data: state.Profile.data,
  }));
  const [currentChild, setCurrentChild] = useState(data.Family.Children[0].id);

  const renderChild = (rowData: any) => {
    const { item, index } = rowData;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setCurrentChild(item.id), console.warn(item.id);
        }}
        style={[
          Styles.mainImageView,
          { borderWidth: item.id === currentChild ? vw(5) : 0 },
        ]}
      >
        <Image
          source={
            CommonFunctions.isNullUndefined(item.s3_photo_path)
              ? Images.Profile_Placeholder
              : { uri: item.s3_photo_path }
          }
          resizeMethod="resize"
          resizeMode="cover"
          style={
            CommonFunctions.isNullUndefined(item.s3_photo_path)
              ? {}
              : Styles.imageView
          }
        />
      </TouchableOpacity>
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ChildrenFlatlist item={item} index={index} currentChild={currentChild} />
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={Styles.mainView}>
        <View style={Styles.contactView}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            bounces={false}
            data={data.Family.Children}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderChild}
          />
          <View style={Styles.childView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              horizontal={false}
              data={data.Family.Children}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  contactView: {
    backgroundColor: "transparent",
    paddingTop: vh(8),
    alignItems: "center",
    width: "100%",
    flex: 1,
    borderRadius: vh(8),
    marginBottom: vh(16),
    paddingHorizontal: vw(16),
  },
  mainImageView: {
    borderRadius: vh(50),
    borderColor: Colors.violet,
    marginHorizontal: vw(15),
    marginTop: vh(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: vh(80),
    width: vh(80),
  },
  imageView: {
    height: vh(80),
    width: vh(80),
    borderRadius: vh(40),
  },
  childView: {
    width: "100%",
    backgroundColor: "white",
    margin: vh(16),
    padding: vh(16),
    borderRadius: vw(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vh(7),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    paddingBottom: vh(5),
  },
  DOBText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingLeft: vw(10),
  },
  DOBText2: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingBottom: vw(5),
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.separator,
    margin: vh(10),
  },
  avatarView: {
    flexDirection: "row",
    paddingTop: vh(10),
    alignItems: "center",
    width: "100%",
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
  },
  name: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
  },
  centerNameView: {
    alignItems: "flex-start",
    paddingHorizontal: vw(15),
    justifyContent: "center",
    width: "80%",
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
