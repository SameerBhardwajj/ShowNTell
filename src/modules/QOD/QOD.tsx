import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";

// custom imports
import { updateTab, weDidItAPI } from "../Home/action";
import { hitQOTDApi } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings, ScreenName } from "../../utils";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import QODFlatList from "./QODFlatList";
import FilterModal from "./FilterModal";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();

  const WEDIDIT = "wedidit";
  const DONE = "done";

  const { tab, data, otherCurrentChild } = useSelector(
    (state: { Home: any; QOTD: any }) => ({
      tab: state.Home.tab,
      data: state.QOTD.data,
      otherCurrentChild: state.Home.otherCurrentChild,
    })
  );

  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    hitQOTD();
  }, [otherCurrentChild]);

  const hitQOTD = (type?: string) => {
    setLoading(true);
    dispatch(
      hitQOTDApi(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        otherCurrentChild.child,
        type
      )
    );
  };

  const hitWeDidIt = (id: string) => {
    setLoading(true);
    dispatch(
      weDidItAPI(
        id,
        () => hitQOTD(),
        () => {
          setLoading(false);
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <QODFlatList
        item={item}
        index={index}
        weDidIt={(id: number) => hitWeDidIt(id.toString())}
      />
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.QOD_label}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
        child={!clear}
        navigation={props.navigation}
        clear={clear}
        onPressClear={() => {
          setClear(!clear);
          hitQOTD();
        }}
      />
      <View style={Styles.mainInnerView}>
        {loading ? (
          <CustomLoader loading={loading} />
        ) : data.length === 0 ? (
          <CustomNoData />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: vh(80) }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
          />
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.filter}
        onPress={() => setModalOpen(true)}
      >
        <Image source={Images.Elipsis_Options} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <FilterModal
          setModal={(value: boolean) => setModalOpen(value)}
          onPress={(value: boolean) => {
            setClear(!clear);
            setModalOpen(false), hitQOTD(value ? WEDIDIT : DONE);
          }}
        />
      </Modal>
    </View>
  );
}
export const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  mainInnerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vw(16),
    marginBottom: vh(35),
    width: "100%",
    flex: 1,
  },
  cardView: {
    marginVertical: vh(8),
    padding: vh(16),
    borderRadius: vh(10),
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
    marginBottom: vh(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vw(1),
    borderColor: Colors.borderGrey,
    backgroundColor: "white",
  },
  centerNameView: {
    alignItems: "flex-start",
    width: "75%",
    paddingHorizontal: vw(15),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  time: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(5),
  },
  btnQOD: {
    width: "100%",
    alignSelf: "center",
    marginTop: vh(20),
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  questionText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingVertical: vh(10),
  },
  timeBlack: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    padding: vh(5),
    paddingLeft: 0,
  },
  filter: {
    position: "absolute",
    right: vw(24),
    bottom: vh(54),
    alignItems: "center",
    justifyContent: "center",
  },
});

// Dummy API data
const DATA = [
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
];
