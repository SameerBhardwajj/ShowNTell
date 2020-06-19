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
import { updateTab } from "../Home/action";

export interface AppProps {
  item: any;
  index: string;
  // onPress: Function;
  select: boolean;
  navigation: any;
  data: any;
  // onLongPress: Function;
}

export default function App(props: AppProps) {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  // const [select, setSelect] = useState(false);
  const index = parseInt(props.index);
  const { navigation, item, select } = props;
  const dispatch = useDispatch();
  const { tab, libraryData, otherCurrentChild } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      tab: state.Home.tab,
      libraryData: state.PhotoLibrary.libraryData,
      otherCurrentChild: state.Home.otherCurrentChild,
    })
  );

  useEffect(() => {
    select === true
      ? (setSelected1(false), setSelected2(false), setSelected3(false))
      : null;
  }, [select]);

  // console.warn('my    ',index, item);

  return (
    <View style={Styles.mainView}>
      {index === 0 ? (
        <View style={Styles.headingView}>
          <Text style={Styles.dateText}>
            {CommonFunctions.DateFormatter(new Date(item[0].activity_dt))}
          </Text>
        </View>
      ) : 
      // item[index].activity_dt !== undefined ? (
      //   item[index].activity_dt === props.data[index - 1].activity_dt ? null : (
      //     <Text style={Styles.dateText}>
      //       {CommonFunctions.DateFormatter(new Date(item[index].activity_dt))}
      //     </Text>
      //   )
      // ) :
       null}
      {index % 2 === 0 ? (
        <View style={Styles.picsView}>
          {props.item[0] !== undefined ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.bigView,
                { borderColor: select && selected1 ? Colors.orange : "white" },
              ]}
              onLongPress={() => setSelected1(!selected1)}
              onPress={() =>
                select
                  ? setSelected1(!selected1)
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
                onLongPress={() => setSelected1(!selected2)}
                onPress={() =>
                  select
                    ? setSelected2(!selected2)
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
                onLongPress={() => setSelected1(!selected3)}
                onPress={() =>
                  select
                    ? setSelected3(!selected3)
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
                onLongPress={() => setSelected1(!selected1)}
                onPress={() =>
                  select
                    ? setSelected1(!selected1)
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
                onLongPress={() => setSelected1(!selected2)}
                onPress={() =>
                  select
                    ? setSelected2(!selected2)
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
              onLongPress={() => setSelected1(!selected3)}
              onPress={() =>
                select
                  ? setSelected3(!selected3)
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
    alignItems: "center",
    width: "100%",
  },
  headingView: {
    alignItems: "center",
    // justifyContent: "space-between",
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
    width: "95%",
    height: vh(198),
    justifyContent: "space-between",
    marginBottom: vh(16),
  },
  bigView: {
    height: "100%",
    width: vw(175),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
  },
  bigImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
  smallView: {
    height: "46%",
    width: vw(175),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
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
