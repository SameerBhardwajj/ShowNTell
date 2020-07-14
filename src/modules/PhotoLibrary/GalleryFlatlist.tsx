import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";
import { updateDownload, updateSelect } from "./action";

export interface AppProps {
  item: any;
  index: string;
  navigation: any;
  data: any;
}

export default function App(props: AppProps) {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const index = parseInt(props.index);
  const { navigation, item } = props;
  const dispatch = useDispatch();
  const { downloadGallery, select } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      downloadGallery: state.PhotoLibrary.downloadGallery,
      select: state.PhotoLibrary.select,
    })
  );

  useEffect(() => {
    select
      ? (setSelected1(false), setSelected2(false), setSelected3(false))
      : null;
  }, [select]);

  const addToDownload = (index: number) => {
    let imagePath = props.item[index].s3_photo_path;
    let temp = downloadGallery;
    temp = temp.concat(imagePath);
    dispatch(updateDownload(temp, () => {}));
  };

  const removeFromDownload = (index: number) => {
    let imagePath = props.item[index].s3_photo_path;
    let temp = downloadGallery;
    temp = temp.filter((item: any) => !item.includes(imagePath));
    dispatch(updateDownload(temp, () => {}));
  };

  const byLongPress = () => {
    select ? null : dispatch(updateSelect(true));
  };

  const mySelect = (index: number) => {
    index === 1
      ? (!selected1 ? addToDownload(0) : removeFromDownload(0),
        setSelected1(!selected1))
      : null;
    index === 2
      ? (!selected2 ? addToDownload(1) : removeFromDownload(1),
        setSelected2(!selected2))
      : null;
    index === 3
      ? (!selected3 ? addToDownload(2) : removeFromDownload(2),
        setSelected3(!selected3))
      : null;
  };

  // console.warn(
  //   "date ",
  //   CommonFunctions.DateFormatter(item[0].activity_dt),
  //   !CommonFunctions.isNullUndefined(item) && index === 0
  // );

  // console.log('value  ',item);
  

  return (
    <View style={Styles.mainView}>
      {!CommonFunctions.isNullUndefined(item) && index === 0 ? (
        <View style={Styles.headingView}>
          <Text style={Styles.dateText}>
            {CommonFunctions.DateFormatter(item[0].activity_dt)}
          </Text>
        </View>
      ) : null}
      {index % 2 === 0 ? (
        <View style={Styles.picsView}>
          {props.item[0] !== undefined ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.bigView,
                {
                  borderColor: select && selected1 ? Colors.orange : "white",
                },
              ]}
              onLongPress={() => {
                byLongPress(), mySelect(1);
              }}
              onPress={() =>
                select
                  ? mySelect(1)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[0],
                    })
              }
            >
              <Image
                source={{ uri: props.item[0].s3_photo_path }}
                style={Styles.bigImg}
              />
              {select && selected1 ? (
                <Image source={Images.Selected} style={Styles.selectedIcon} />
              ) : null}
            </TouchableOpacity>
          ) : null}
          <View style={{ justifyContent: "space-between" }}>
            {props.item[1] !== undefined ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  Styles.smallView,
                  {
                    borderColor: select && selected2 ? Colors.orange : "white",
                  },
                ]}
                onLongPress={() => {
                  byLongPress(), mySelect(2);
                }}
                onPress={() =>
                  select
                    ? mySelect(2)
                    : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                        item: item[1],
                      })
                }
              >
                <Image
                  source={{ uri: props.item[1].s3_photo_path }}
                  style={Styles.smallImg}
                />
                {select && selected2 ? (
                  <Image source={Images.Selected} style={Styles.selectedIcon} />
                ) : null}
              </TouchableOpacity>
            ) : null}
            {props.item[2] !== undefined ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  Styles.smallView,
                  {
                    borderColor: select && selected3 ? Colors.orange : "white",
                  },
                ]}
                onLongPress={() => {
                  byLongPress(), mySelect(3);
                }}
                onPress={() =>
                  select
                    ? mySelect(3)
                    : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                        item: item[2],
                      })
                }
              >
                <Image
                  source={{ uri: props.item[2].s3_photo_path }}
                  style={Styles.smallImg}
                />
                {select && selected3 ? (
                  <Image source={Images.Selected} style={Styles.selectedIcon} />
                ) : null}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ) : (
        <View style={Styles.picsView}>
          <View style={{ justifyContent: "space-between" }}>
            {props.item[0] !== undefined ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  Styles.smallView,
                  {
                    borderColor: select && selected1 ? Colors.orange : "white",
                  },
                ]}
                onLongPress={() => {
                  byLongPress(), mySelect(1);
                }}
                onPress={() =>
                  select
                    ? mySelect(1)
                    : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                        item: item[0],
                      })
                }
              >
                <Image
                  source={{ uri: props.item[0].s3_photo_path }}
                  style={Styles.smallImg}
                />
                {select && selected1 ? (
                  <Image source={Images.Selected} style={Styles.selectedIcon} />
                ) : null}
              </TouchableOpacity>
            ) : null}
            {props.item[1] !== undefined ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  Styles.smallView,
                  {
                    borderColor: select && selected2 ? Colors.orange : "white",
                  },
                ]}
                onLongPress={() => {
                  byLongPress(), mySelect(2);
                }}
                onPress={() =>
                  select
                    ? mySelect(2)
                    : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                        item: item[1],
                      })
                }
              >
                <Image
                  source={{ uri: props.item[1].s3_photo_path }}
                  style={Styles.smallImg}
                />
                {select && selected2 ? (
                  <Image source={Images.Selected} style={Styles.selectedIcon} />
                ) : null}
              </TouchableOpacity>
            ) : null}
          </View>
          {props.item[2] !== undefined ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.bigView,
                { borderColor: select && selected3 ? Colors.orange : "white" },
              ]}
              onLongPress={() => {
                byLongPress(), mySelect(3);
              }}
              onPress={() =>
                select
                  ? mySelect(3)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[2],
                    })
              }
            >
              <Image
                source={{ uri: props.item[2].s3_photo_path }}
                style={Styles.bigImg}
              />
              {select && selected3 ? (
                <Image source={Images.Selected} style={Styles.selectedIcon} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: "100%",
    padding: vw(1),
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
    paddingVertical: vh(14),
  },
  picsView: {
    flexDirection: "row",
    width: "100%",
    maxHeight: vh(198),
    minHeight: vh(95),
    justifyContent: "space-between",
    paddingBottom: vh(5),
  },
  bigView: {
    height: "100%",
    width: vw(190),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
    backgroundColor: Colors.veryLightBorder,
  },
  bigImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
  smallView: {
    height: vh(95),
    width: vw(190),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
    backgroundColor: Colors.veryLightBorder,
  },
  smallImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
  selectedIcon: {
    position: "absolute",
    bottom: vh(16),
    right: vw(16),
    height: vh(28),
    width: vh(28),
  },
});
