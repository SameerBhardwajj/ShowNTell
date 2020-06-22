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
  Image,
  BackHandler,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomSearchBar,
} from "../../../../Components";
import {
  Strings,
  vh,
  Colors,
  ScreenName,
  Images,
  CommonFunctions,
} from "../../../../utils";
import ListFlatlist from "./ListFlatlist";
import { fetchSchoolList } from "./action";
import ResultFlatlist from "./ResultFlatlist";

const getSlotDate = () => {
  if (new Date().getHours() >= 18) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    slotDate = tomorrow;
  }
  return slotDate;
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(getSlotDate());
  const [id, setId] = useState(0);
  const [query, setQuery] = useState("");
  const [temp, setTemp] = useState([]);
  const [result, setResult] = useState([]);
  const { schoolList } = useSelector((state: { SchoolListing: any }) => ({
    schoolList: state.SchoolListing.schoolList,
  }));

  useEffect(() => {
    getSlotDate();
    handleUrl();
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, []);

  const search = (query: string) => {
    let tempDAta: any = data.slice(0);
    tempDAta.sort((a: any, b: any) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    let res: any = CommonFunctions.binarySearch(query, tempDAta);
    setResult(res);
  };

  const handleUrl = () => {
    setIsLoading(true);
    dispatch(
      fetchSchoolList(
        props.route.params.coordinates,
        (data: any) => {
          setData(data.concat(schoolList));
          setTemp(temp.concat(schoolList));
          setIsLoading(false);
          setisRefreshing(false);
        },
        () => {
          setIsLoading(false);
          setisRefreshing(false);
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ListFlatlist
        navigation={props.navigation}
        item={item}
        openModal={() => {
          setId(item.location_id);
          setModalOpen(true);
        }}
      />
    );
  };

  const renderItemResult = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ResultFlatlist
        item={item}
        index={index}
        onPress={() => {
          let emptyArr: any = [];
          setTemp(emptyArr.concat(item));
          setQuery("");
          setResult([]);
          Keyboard.dismiss();
        }}
      />
    );
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
            <CustomSearchBar
              placeholder={Strings.Search}
              value={query}
              onChangeText={(text: string) => {
                setQuery(text), search(text);
              }}
              onPressCancel={() => {
                setQuery(""), setTemp([]);
              }}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            {query.length !== 0 ? (
              !(result && result.length) ? null : (
                <FlatList
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: 99,
                    top: vh(80),
                  }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  data={result}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItemResult}
                />
              )
            ) : (
              <View style={{ width: "100%" }}>
                <Text style={Styles.headingText}>
                  {Strings.Choose_a_Center}
                </Text>
                <View style={Styles.mainInnerView}>
                  <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={true}
                    data={temp.length === 0 ? data : temp}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItems}
                  />
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalOpen}
                >
                  <View style={Styles.mainModalView}>
                    <View />
                    <View style={Styles.modalView}>
                      <Text style={Styles.modalHeading}>
                        {Strings.Select_Date}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={Styles.topModalView}
                        onPress={() => setModalOpen(false)}
                      >
                        <Image source={Images.Cancel_Icon} />
                      </TouchableOpacity>
                      <DatePicker
                        minimumDate={getSlotDate()}
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
                          setDate(getSlotDate());
                          console.warn(id, date);

                          console.warn(date, getSlotDate(), id);
                          props.navigation.navigate(
                            ScreenName.DATE_TIME_SCHEDULE,
                            {
                              id: id,
                              date: date,
                            }
                          );
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            )}
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
    marginBottom: vh(300),
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingVertical: vh(16),
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
  mainModalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.modalBg,
  },
  topModalView: {
    position: "absolute",
    right: 0,
    padding: vh(20),
    bottom: vh(290),
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
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
