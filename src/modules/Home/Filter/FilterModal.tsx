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
import { HomeFilter, countFilter, addFilter, updateAWI } from "../action";

const TYPE1 = "ANNOUNCEMENT";
const TYPE2 = "ACTIVITY";
const TYPE3 = "QOTD";

export interface AppProps {
  setModalOpen: Function;
  applyFilter: Function;
  resetFilter: Function;
}

export default function App(props: AppProps) {
  const { filterData, filterNum, currentChild, myFilter, AWI } = useSelector(
    (state: { Home: any }) => ({
      filterData: state.Home.filterData,
      filterNum: state.Home.filterNum,
      currentChild: state.Home.currentChild,
      myFilter: state.Home.myFilter,
      AWI: state.Home.AWI,
    })
  );

  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [fromDate, setFromDate] = useState(
    CommonFunctions.isNullUndefined(myFilter.fromDate)
      ? new Date()
      : new Date(myFilter.fromDate)
  );
  const [toDate, setToDate] = useState(
    CommonFunctions.isNullUndefined(myFilter.toDate)
      ? new Date()
      : new Date(myFilter.toDate)
  );
  const [activityType1, setactivityType1] = useState(false);
  const [activityType2, setactivityType2] = useState(false);
  const [activityType3, setactivityType3] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState(Object);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [dateApply, setdateApply] = useState(false);

  React.useEffect(() => {
    myFilter.type.length === 0
      ? null
      : (myFilter.type.includes(TYPE1) ? setactivityType1(true) : null,
        myFilter.type.includes(TYPE2) ? setactivityType2(true) : null,
        myFilter.type.includes(TYPE3) ? setactivityType3(true) : null);

    CommonFunctions.isNullUndefined(myFilter.fromDate)
      ? null
      : (setFromDate(new Date(myFilter.fromDate)),
        setToDate(new Date(myFilter.toDate)),
        setdateApply(true));
    setCategory(myFilter);
    hitHomeFilter();
  }, [query]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <FilterList item={item} index={index} />;
  };

  const hitHomeFilter = () => {
    setLoading(true),
      dispatch(
        HomeFilter(
          currentChild.classroom,
          (filterData: any) => {
            let counter = 0;
            let temp: Array<any> = [];
            let searchArr: any = [];
            filterData.activityCategory.map((items: any) => {
              searchArr.includes(items.name)
                ? null
                : (searchArr = searchArr.concat({
                    name: items.name,
                    id: items.id,
                    aid: items.id,
                  }));
              items.ActivityValuesOri.map((item: any) => {
                temp = temp.concat(item.id.toString());
                counter = counter + 1;
                searchArr.includes(item.name)
                  ? null
                  : (searchArr = searchArr.concat({
                      name: item.name,
                      id: items.id,
                      aid: item.id,
                    }));
              });
            });
            setTempData(
              searchArr.sort((a: any, b: any) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
              )
            );
            filterNum !== counter && filterNum !== 0
              ? dispatch(
                  addFilter(
                    temp,
                    myFilter.fromDate,
                    myFilter.toDate,
                    myFilter.type,
                    () => {
                      dispatch(
                        countFilter(counter, () => {
                          setLoading(false);
                        })
                      );
                    }
                  )
                )
              : null;
          },
          () => setLoading(false)
        )
      );
  };

  const onlyUnique = (value: number, index: number, self: any) => {
    return self.indexOf(value) === index;
  };

  // Activity Searching -------------------------
  const searching = (query: string) => {
    if (query.length === 0) setSearchData(filterData.activityCategory);
    else {
      let myFilterData: any = new Object();
      Object.assign(myFilterData, filterData);
      let currData: any = [];
      let currAct: any = [];
      let temp: any[] = [];
      temp = CommonFunctions.binarySearch(query, tempData);
      temp.map((item: any) => {
        currAct = currAct.concat(item.id);
      });
      currAct = currAct.filter(onlyUnique);
      temp.map((item: any) => {
        currData = currData.concat(item.aid);
      });
      let newSearch: any = [];
      currAct.map((items: any) => {
        myFilterData.activityCategory.map((item: any) => {
          items === item.id ? (newSearch = newSearch.concat(item)) : null;
        });
      });
      newSearch.map((item: any) => {
        item.ActivityValuesOri = item.ActivityValuesOri.filter((items: any) =>
          currData.includes(items.id)
        );
      });
      setSearchData(newSearch);
    }
  };

  const checkActivityTypes = () => {
    let arr: any[] = [];
    activityType1 ? (arr = arr.concat(TYPE1)) : null;
    activityType2 ? (arr = arr.concat(TYPE2)) : null;
    activityType3 ? (arr = arr.concat(TYPE3)) : null;
    return arr;
  };

  return (
    <View style={Styles.innerModalView}>
      <View style={Styles.headingView}>
        <Text style={Styles.childHeaderText}>{Strings.Home_Feed_Options}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            dispatch(
              addFilter(
                category.activity,
                category.fromDate,
                category.toDate,
                category.type,
                () => {}
              )
            );
            props.setModalOpen(false);
          }}
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
              value={query}
              placeholder={Strings.Search}
              onChangeText={(text: string) => {
                setQuery(text.trim()), searching(text.trim());
              }}
              onPressCancel={() => {
                setQuery(""), setSearchData([]);
              }}
              onSubmitEditing={() => Keyboard.dismiss()}
              mainViewStyle={{ marginBottom: vh(10) }}
            />
            {CommonFunctions.isEmpty(filterData) ? (
              <CustomLoader loading={isLoading} />
            ) : query.trim() !== "" && searchData.length === 0 ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>{Strings.Category_Unavailable}</Text>
              </View>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={
                  query.trim() === "" ? filterData.activityCategory : searchData
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
              />
            )}
          </View>
        ) : current === 2 ? (
          // Date Category --------------------
          <View style={Styles.rightFilter}>
            <CustomDate
              date={fromDate}
              heading={Strings.From}
              maxDate={new Date()}
              getDate={(date: Date) => {
                setFromDate(date);
                setdateApply(true);
              }}
              mainViewStyle={{ marginTop: 0 }}
            />
            <CustomDate
              date={toDate}
              heading={Strings.To}
              minDate={fromDate}
              maxDate={new Date()}
              getDate={(date: Date) => {
                setToDate(new Date(date));
                setdateApply(true);
              }}
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
            <View
              style={[
                Styles.activityHeadView,
                Styles.activityTypeView,
                activityType2
                  ? { borderBottomWidth: 0 }
                  : { borderBottomWidth: vw(1) },
              ]}
            >
              <Text
                style={[
                  Styles.subActivityText,
                  { marginTop: vh(25), marginBottom: vh(25) },
                ]}
              >
                {Strings.Activities}
              </Text>
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
            {activityType2 ? (
              <View style={[Styles.activityHeadView, Styles.activityTypeView]}>
                <Text
                  style={[
                    Styles.subActivityText,
                    {
                      fontSize: vh(14),
                      marginBottom: vh(25),
                      marginTop: vh(5),
                    },
                  ]}
                >
                  {Strings.Activity_without_image}
                </Text>
                <TouchableOpacity
                  style={[Styles.iconView, { paddingRight: 0, paddingTop: 0 }]}
                  activeOpacity={0.8}
                  onPress={() => dispatch(updateAWI())}
                >
                  <Image
                    source={
                      AWI ? Images.Check_Box_Active : Images.Check_Box_inactive
                    }
                    style={{ alignSelf: "center" }}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
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
          onPress={() => {
            dispatch(addFilter([], "", "", [], () => {}));
            props.resetFilter();
          }}
          Text={Strings.Reset}
          ButtonStyle={Styles.applyBtn}
        />
        <CustomButton
          onPress={() => {
            props.setModalOpen(false);
            props.applyFilter(
              myFilter.activity.sort().join(","),
              checkActivityTypes(),
              dateApply ? { fromDate: fromDate, toDate: toDate } : {}
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
    width: "100%",
  },
  leftFilter: {
    backgroundColor: Colors.lightPink,
    width: "30%",
  },
  categoryView: {
    justifyContent: "center",
    paddingVertical: vh(24),
    paddingHorizontal: vw(20),
    borderBottomWidth: vw(2.5),
    borderColor: Colors.lightPink,
  },
  rightFilter: {
    padding: vh(16),
    paddingBottom: 0,
    width: "70%",
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
    justifyContent: "space-around",
    paddingBottom: vh(20),
    borderTopWidth: vw(1),
    borderColor: Colors.borderGrey,
  },
  applyBtn: {
    width: "40%",
    marginVertical: vh(20),
  },
});
