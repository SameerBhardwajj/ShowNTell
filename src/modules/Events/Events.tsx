import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// custom imports
import { hitAPI } from "./action";
import { CustomHeader, CustomNoData, CustomLoader } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { loginData, data } = useSelector(
    (state: { Events: any; Login: any }) => ({
      loginData: state.Login.loginData,
      data: state.Events.data,
    })
  );
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    data.length === 0 ? setLoading(true) : null;
    dispatch(
      hitAPI(
        loginData.location_id,
        () => {
          setLoading(false);
        },
        (e: any) => {
          setLoading(false);
        }
      )
    );
  }, []);

  const bgColor = (index: number) => {
    return index % 3 === 1
      ? Colors.lightWaterBlue
      : index % 3 === 2
        ? Colors.lightGreen
        : Colors.lightPink;
  };

  const newColor = (index: number) => {
    return index % 3 === 1
      ? Colors.waterBlue
      : index % 3 === 2
        ? Colors.green
        : Colors.pink;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Events}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
      />
      {isLoading ? (
        <CustomLoader loading={isLoading} />
      ) : CommonFunctions.isNullUndefined(data) ? (
        <CustomNoData />
      ) : (
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {data.map((item: any, index: number) => (
                <View style={Styles.innerView}>
                  <View
                    style={[
                      Styles.headingView,
                      { backgroundColor: newColor(index + 1) },
                    ]}
                  >
                    <Text style={Styles.heading}>
                      {moment(item.start_date).format("MMMM DD, YYYY")}
                    </Text>
                  </View>
                  <View
                    style={[
                      Styles.contentView,
                      { backgroundColor: bgColor(index + 1) },
                    ]}
                  >
                    <Text style={[Styles.content, { color: newColor(index + 1) }]}>
                      {item.headline}
                    </Text>
                    <Text style={[Styles.contentDESC]}>{item.tagline}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: CommonFunctions.iPhoneX ? vh(30) : vh(10),
  },
  innerView: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    borderRadius: vh(10),
    paddingHorizontal: vh(16),
    marginVertical: vh(12),
  },
  headingView: {
    paddingVertical: vh(10),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    maxWidth: vw(120),
    right: vw(20),
    top: CommonFunctions.iPhoneX ? vh(40) : vh(30),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  dropdown: {
    height: vh(8),
    width: vh(15),
    marginHorizontal: vw(5),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: "white",
  },
  contentView: {
    padding: vh(16),
    width: "100%",
    borderBottomLeftRadius: vh(10),
    borderBottomRightRadius: vh(10),
  },
  content: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    paddingBottom: vh(16),
  },
  contentDESC: {
    fontFamily: "Nunito-SEMIBold",
    fontSize: vh(14),
  },
});
