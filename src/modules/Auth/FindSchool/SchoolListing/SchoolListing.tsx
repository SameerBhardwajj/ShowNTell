import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader } from "../../../../Components";
import { Strings, vh, Colors } from "../../../../utils";
import ListFlatlist from "./ListFlatlist";
import { fetchSchoolList } from "./action";

const class1 =
  "https://www.sciencespo.fr/sites/default/files/tables%20v3_1.jpg";
const class2 =
  "https://media.istockphoto.com/photos/empty-classroom-with-whiteboard-picture-id950607874?k=6&m=950607874&s=612x612&w=0&h=Fm0_zzZvq-0dC0UFsMdqMT8hxoLIwlXp07rjRutoJh8=";
const class3 =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();

  const { schoolList } = useSelector((state: { SchoolListing: any }) => ({
    schoolList: state.SchoolListing.schoolList,
  }));

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [pageNum, setpageNum] = useState(1);

  useEffect(() => {
    console.warn(props.route.params.coordinates);
    handleUrl();
  }, []);

  const handleUrl = async () => {
    setIsLoading(true);
    dispatch(
      fetchSchoolList(props.route.params.coordinates, pageNum, (data: any) => {
        console.warn("here ", schoolList);
        setData(data.concat(schoolList));
        console.warn("data  ", data);
        setIsLoading(false);
        setpageNum(pageNum + 1);
        setisRefreshing(false);
      })
    );
  };

  const handleRefresh = () => {
    setData([]);
    setpageNum(1);
    setisRefreshing(true);
    handleUrl();
  };

  const renderItemResult = (rowData: any) => {
    const { item, index } = rowData;
    return <ListFlatlist navigation={props.navigation} item={item} />;
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
});

const DATA = [
  {
    schoolImages: [class1, class2, class3],
    schoolName: "Kiddie Cloud Play School",
    location: {
      distance: "0.8 Miles",
      address: "851 South Dowling Street, Surry Hills",
      phone: "561 - 9637625",
    },
    description:
      "One of the best play school for kids which not only focus on learning but also on extracurricular activities.",
    coordinates: { longitude: 28.6728, latitude: 77.3863 },
  },
  {
    schoolImages: [class1, class2, class3],
    schoolName: "Kiddie Cloud Play School",
    location: {
      distance: "0.8 Miles",
      address: "851 South Dowling Street, Surry Hills",
      phone: "561 - 9637625",
    },
    description:
      "One of the best play school for kids which not only focus on learning but also on extracurricular activities.",
    coordinates: { longitude: 28.6728, latitude: 77.3863 },
  },
  {
    schoolImages: [class1, class2, class3],
    schoolName: "Kiddie Cloud Play School",
    location: {
      distance: "0.8 Miles",
      address: "851 South Dowling Street, Surry Hills",
      phone: "561 - 9637625",
    },
    description:
      "One of the best play school for kids which not only focus on learning but also on extracurricular activities.",
    coordinates: { longitude: 28.6728, latitude: 77.3863 },
  },
];
