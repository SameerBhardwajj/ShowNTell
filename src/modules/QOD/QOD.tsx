import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { hitQOTDApi } from "./action";
import { vh, Images, vw, Strings, ScreenName } from "../../utils";
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

  const { data, currentChild } = useSelector(
    (state: { Home: any; QOTD: any }) => ({
      data: state.QOTD.data,
      currentChild: state.Home.currentChild,
    })
  );

  useEffect(() => {
    hitQOTD();
  }, [currentChild]);

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
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString(),
        currentChild.child,
        type
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <QODFlatList item={item} index={index} />;
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
          setClear(false);
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
      {clear ? null : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.filter}
          onPress={() => setModalOpen(true)}
        >
          <Image source={Images.Elipsis_Options} />
        </TouchableOpacity>
      )}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <FilterModal
          setModal={(value: boolean) => setModalOpen(value)}
          onPress={(value: boolean) => {
            setClear(true);
            setModalOpen(false), hitQOTD(value ? WEDIDIT : DONE);
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
    backgroundColor: "white",
  },
  mainInnerView: {
    flex: 1,
    paddingVertical: vh(8),
    paddingHorizontal: vw(16),
    marginBottom: vh(35),
    width: "100%",
  },
  filter: {
    position: "absolute",
    right: vw(24),
    bottom: vh(54),
    alignItems: "center",
    justifyContent: "center",
  },
});
