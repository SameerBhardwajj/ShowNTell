import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  CommonFunctions,
} from "../../../utils";
import {
  CustomButton,
  CustomSearchBar,
  CustomDate,
  CustomLoader,
} from "../../../Components";
import FilterList from "./FilterList";
import { HomeFilter, countFilter, addFilter } from "../action";

export interface AppProps {
  setModalOpen: Function;
  applyFilter: Function;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [days, setDays] = useState("0");
  const [activityType1, setactivityType1] = useState(true);
  const [activityType2, setactivityType2] = useState(true);
  const [activityType3, setactivityType3] = useState(true);
  const [reset, setReset] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { filterData, filterNum, currentChild, myFilter } = useSelector(
    (state: { Home: any }) => ({
      filterData: state.Home.filterData,
      filterNum: state.Home.filterNum,
      currentChild: state.Home.currentChild,
      myFilter: state.Home.myFilter,
    })
  );

  React.useEffect(() => {
    hitHomeFilter();
    // console.warn(str.join(","));
    // str = str.concat("8");
    // str = str.concat("6");
    // console.warn(str.join(","));
    // console.warn("sort ", str.sort().join(","));

    // console.warn(filterData.activityCategory);
    // filterData.activityCategory.map((item: any) => {
    //   item.ActivityValuesOri.map((item: any) => {
    //     console.warn(item.id);
    //   });
    // });
  }, []);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <FilterList item={item} index={index} />;
  };

  const resetting = () => {
    setReset(true);
    setactivityType1(true);
    setactivityType2(true);
    setactivityType3(true);
  };

  const hitHomeFilter = () => {
    filterNum === 0
      ? (setLoading(true),
        dispatch(
          HomeFilter(
            currentChild.classroom,
            (filterData: any) => {
              let counter = 0;
              let temp: Array<any> = [];
              filterData.activityCategory.map((item: any) => {
                item.ActivityValuesOri.map((item: any) => {
                  temp = temp.concat(item.id.toString());
                  counter = counter + 1;
                });
              });
              console.warn("temp ", temp.sort().join(","), temp);
              filterNum !== counter
                ? dispatch(
                    addFilter(temp, myFilter.date, () => {
                      dispatch(
                        countFilter(counter, () => {
                          setLoading(false);
                        })
                      );
                    })
                  )
                : null;
            },
            () => setLoading(false)
          )
        ))
      : null;
  };

  return (
    <View style={Styles.innerModalView}>
      <View style={Styles.headingView}>
        <Text style={Styles.childHeaderText}>{Strings.Home_Feed_Options}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.setModalOpen(false)}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
      </View>
      <View style={Styles.filterView}>
        {/* Left Side ------------------- */}
        <View style={Styles.leftFilter}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.categoryView,
              { backgroundColor: current === 1 ? Colors.lightPink : undefined },
            ]}
            onPress={() => setCurrent(1)}
          >
            <Text style={Styles.childHeaderText}>
              {Strings.Activity_Category}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.categoryView,
              { backgroundColor: current === 2 ? Colors.lightPink : undefined },
            ]}
            onPress={() => setCurrent(2)}
          >
            <Text style={Styles.childHeaderText}>{Strings.Date}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.categoryView,
              {
                borderBottomWidth: 0,
                backgroundColor: current === 3 ? Colors.lightPink : undefined,
              },
            ]}
            onPress={() => setCurrent(3)}
          >
            <Text style={Styles.childHeaderText}>{Strings.Activity_Types}</Text>
          </TouchableOpacity>
        </View>
        {/* Right Side ------------------- */}
        {current === 1 ? (
          // Activity Category --------------------
          <View style={Styles.rightFilter}>
            <CustomSearchBar
              value=""
              placeholder={Strings.Search}
              onChangeText={() => {}}
              onPressCancel={() => {}}
              onSubmitEditing={() => Keyboard.dismiss()}
              mainViewStyle={{ width: "68%", marginBottom: vh(10) }}
            />
            {CommonFunctions.isEmpty(filterData) ? (
              <CustomLoader loading={isLoading} />
            ) : (
              <FlatList
                bounces={false}
                data={filterData.activityCategory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
              />
            )}
          </View>
        ) : current === 2 ? (
          // Date Category --------------------
          <View style={Styles.rightFilter}>
            <CustomDate
              heading={Strings.From}
              getDate={(date: Date) => {
                setFromDate(date);
                setDays(
                  CommonFunctions.DateDifference(fromDate, date).toString()
                );
              }}
              mainViewStyle={{ marginTop: 0, width: "68%" }}
            />
            <CustomDate
              heading={Strings.To}
              minDate={fromDate}
              getDate={(date: Date) => {
                setToDate(date);
                setDays(
                  CommonFunctions.DateDifference(fromDate, date).toString()
                );
              }}
              mainViewStyle={{ width: "68%" }}
            />
          </View>
        ) : (
          // Activity Types I --------------------
          <View style={{ width: "70%", paddingHorizontal: vh(16) }}>
            <View style={[Styles.activityHeadView, Styles.activityTypeView]}>
              <View style={{ marginVertical: vh(25) }}>
                <Text style={Styles.subActivityText}>
                  {Strings.Announcements}
                </Text>
              </View>
              <TouchableOpacity
                style={[Styles.iconView, { paddingRight: 0 }]}
                activeOpacity={0.8}
                onPress={() => setactivityType1(!activityType1)}
              >
                <Image
                  source={
                    activityType1
                      ? Images.Check_Box_Active
                      : Images.Check_Box_inactive
                  }
                  style={{ alignSelf: "center" }}
                  resizeMode="center"
                  resizeMethod="resize"
                />
              </TouchableOpacity>
            </View>
            {/* Activity Types II -------------------- */}
            <View style={[Styles.activityHeadView, Styles.activityTypeView]}>
              <View style={{ marginVertical: vh(25) }}>
                <Text style={Styles.subActivityText}>{Strings.Activities}</Text>
              </View>
              <TouchableOpacity
                style={[Styles.iconView, { paddingRight: 0 }]}
                activeOpacity={0.8}
                onPress={() => setactivityType2(!activityType2)}
              >
                <Image
                  source={
                    activityType2
                      ? Images.Check_Box_Active
                      : Images.Check_Box_inactive
                  }
                  style={{ alignSelf: "center" }}
                  resizeMode="center"
                  resizeMethod="resize"
                />
              </TouchableOpacity>
            </View>
            {/* Activity Types III -------------------- */}
            <View
              style={[
                Styles.activityHeadView,
                Styles.activityTypeView,
                { borderBottomWidth: 0 },
              ]}
            >
              <View style={{ marginVertical: vh(25) }}>
                <Text style={Styles.subActivityText}>
                  {Strings.Question_of_the_Day}
                </Text>
              </View>
              <TouchableOpacity
                style={[Styles.iconView, { paddingRight: 0 }]}
                activeOpacity={0.8}
                onPress={() => setactivityType3(!activityType3)}
              >
                <Image
                  source={
                    activityType3
                      ? Images.Check_Box_Active
                      : Images.Check_Box_inactive
                  }
                  style={{ alignSelf: "center" }}
                  resizeMode="center"
                  resizeMethod="resize"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={Styles.bottomView}>
        <CustomButton
          lightBtn={true}
          onPress={() => props.setModalOpen(false)}
          Text={Strings.Reset}
          ButtonStyle={Styles.applyBtn}
        />
        <CustomButton
          onPress={() => {
            props.setModalOpen(false),
              props.applyFilter(
                filterNum === myFilter.activity.length
                  ? null
                  : myFilter.activity.join(",")
              );
          }}
          Text={Strings.Apply}
          ButtonStyle={Styles.applyBtn}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerModalView: {
    backgroundColor: "white",
    borderTopLeftRadius: vh(20),
    borderTopRightRadius: vh(20),
    width: "100%",
    flex: 0.88,
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: vh(20),
    borderBottomWidth: vw(1),
    borderColor: Colors.veryLightBorder,
  },
  filterView: {
    flexDirection: "row",
    height: vh(480),
  },
  leftFilter: {
    backgroundColor: Colors.lightPink,
    width: vw(120),
  },
  categoryView: {
    justifyContent: "center",
    paddingVertical: vh(24),
    paddingLeft: vw(20),
    borderBottomWidth: vw(2.5),
    borderColor: Colors.lightPink,
  },
  rightFilter: {
    padding: vh(16),
    paddingBottom: 0,
    width: "100%",
  },
  activityHeadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subActivityText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
  iconView: {
    padding: vh(14),
    alignItems: "center",
    justifyContent: "center",
  },
  activityTypeView: {
    borderBottomWidth: vw(1),
    borderColor: Colors.veryLightBorder,
  },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: vh(20),
    borderTopWidth: vw(1),
    borderColor: Colors.borderGrey,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -5,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  applyBtn: {
    width: "40%",
    marginVertical: vh(20),
  },
});
