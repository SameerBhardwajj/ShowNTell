import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { PhotoLibraryAPI, updateDownload, updateSelect } from "./action";
import { CustomHeader, CustomToast, CustomLoader } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";
import SectionListing from "./SectionListing";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const { currentChild, downloadGallery, select } = useSelector(
    (state: { Home: any; PhotoLibrary: any }) => ({
      tab: state.Home.tab,
      currentChild: state.Home.currentChild,
      downloadGallery: state.PhotoLibrary.downloadGallery,
      select: state.PhotoLibrary.select,
    })
  );

  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    setData([]);
    setPage(1);
    setData([]);
    setLoading(true);
    hitPhotoLibraryAPI();
  }, [currentChild]);

  const hitPhotoLibraryAPI = () => {
    console.warn(page);

    dispatch(
      PhotoLibraryAPI(
        currentChild.child,
        page,
        (res: ConcatArray<never>) => {
          console.warn("res  ", res);

          setData(data.concat(res));
          setPage(page + 1);
          setLoading(false);
        },
        () => setLoading(false)
      )
    );
  };

  const downloadAll = async () => {
    let temp = downloadGallery;
    Promise.all(
      temp.map(async (img: string) => {
        let result = await new Promise((resolve, reject) => {
          CommonFunctions.saveToCameraRoll(
            img,
            () => {
              resolve();
            },
            (error: any) => {
              console.warn("m error .. ", error);
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
        console.warn("m error .. ", error);
        emptyTheGallery();
      });
  };

  const emptyTheGallery = () => {
    dispatch(
      updateDownload([], () => {
        console.warn("empty");
      })
    );
  };

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
    return temp;
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
        {isLoading ? null : data.length === 0 ? null : (
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            onEndReached={hitPhotoLibraryAPI}
            onEndReachedThreshold={0.5}
            data={groupingData(data)}
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
            onPress={() => {
              CustomToast("Download Start...");
              downloadAll();
              dispatch(updateSelect(false));
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
