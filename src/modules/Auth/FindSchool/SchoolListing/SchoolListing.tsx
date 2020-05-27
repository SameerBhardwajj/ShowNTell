import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";

// custom imports
import { CustomHeader, CustomButton } from "../../../../Components";
import { Strings, vh, Colors, ScreenName } from "../../../../utils";
import ListFlatlist from "./ListFlatlist";
import { fetchSchoolList } from "./action";
let slotDate = new Date();
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [pageNum, setpageNum] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const { schoolList } = useSelector((state: { SchoolListing: any }) => ({
    schoolList: state.SchoolListing.schoolList,
  }));

  useEffect(() => {
    getSlotDate();
    handleUrl();
  }, []);

  const getSlotDate = () => {
    if (new Date().getHours() >= 18) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      slotDate = tomorrow;
    }
    return slotDate;
  };

  const handleUrl = () => {
    setIsLoading(true);
    dispatch(
      fetchSchoolList(props.route.params.coordinates, pageNum, (data: any) => {
        setData(data.concat(schoolList));
        setIsLoading(false);
        setpageNum(pageNum + 1);
        setisRefreshing(false);
      })
    );
  };

  const handleRefresh = () => {
    setpageNum(1);
    setData([]);
    setisRefreshing(true);
    handleUrl();
  };

  const renderItemResult = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ListFlatlist
        navigation={props.navigation}
        item={item}
        openModal={() => {
          setId(item.id);
          setName(item.name);
          setModalOpen(true);
        }}
      />
    );
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={Styles.mainView}>
        <CustomHeader
          title={Strings.Nearby_Schools}
          onPressBack={() => props.navigation.pop()}
          notify={true}
          notifyNumber={1}
        />
        {data.length === 0 ? (
          <View style={Styles.notFoundView}>
            {isLoading ? (
              <ActivityIndicator
                color={Colors.violet}
                animating={isLoading}
                size="large"
              />
            ) : (
              <Text>{Strings.No_data_Found}</Text>
            )}
          </View>
        ) : (
          <View style={Styles.innerView}>
            <Text style={Styles.headingText}>{Strings.Choose_a_Center}</Text>
            <View style={Styles.mainInnerView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemResult}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                onEndReached={handleUrl}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  <ActivityIndicator
                    size="large"
                    color={Colors.violet}
                    animating={pageNum !== 1 && isLoading}
                  />
                }
              />
            </View>
            <Modal animationType="slide" transparent={true} visible={modalOpen}>
              <TouchableOpacity
                activeOpacity={1}
                style={Styles.topModalView}
                onPress={() => setModalOpen(false)}
              />
              <View style={Styles.modalView}>
                <Text style={Styles.modalHeading}>{Strings.Select_Date}</Text>
                <DatePicker
                  minimumDate={slotDate}
                  date={date}
                  mode="date"
                  onDateChange={(text: Date) => {
                    setDate(text);
                  }}
                />
                <CustomButton
                  Text={Strings.View_Slots}
                  onPress={() => {
                    setModalOpen(false);
                    setDate(new Date());
                    props.navigation.navigate(ScreenName.DATE_TIME_SCHEDULE, {
                      id: id,
                      name: name,
                      date: date,
                    });
                  }}
                />
              </View>
            </Modal>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  notFoundView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    paddingVertical: vh(20),
    paddingHorizontal: vh(16),
    alignItems: "center",
    width: "100%",
    marginBottom: vh(100),
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingBottom: vh(16),
  },
  mainInnerView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.49,
    elevation: 5,
  },
  topModalView: {
    width: "100%",
    flex: 0.65,
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    flex: 0.4,
    paddingVertical: vh(30),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  modalHeading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
});
