import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import { Strings, vh } from "../../utils";
import { hitAPI } from "./action";
import { useDispatch, useSelector } from "react-redux";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { about } = useSelector((state: { Settings: any }) => ({
    about: state.Settings.about,
  }));
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    // about.length === 0
    //   ? (setIsLoading(true),
    //     dispatch(
    //       hitAPI(
    //         1,
    //         (myData: Array<any>) => {
    //           myData.map((a) => {
    //             setData(a.content);
    //           });
    //           setIsLoading(false);
    //         },
    //         () => {
    //           setIsLoading(false);
    //         }
    //       )
    //     ))
    //   : about.map((a: any) => {
    //       setData(a.content);
    //     });
  }, []);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Referrals}
        onPressBack={() => props.navigation.pop()}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ padding: vh(16) }}
      >
        {data.length === 0 ? (
          isLoading ? (
            <CustomLoader loading={true} />
          ) : (
            <CustomNoData />
          )
        ) : (
          <Text style={Styles.txt}>{data}</Text>
        )}
      </ScrollView> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  txt: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    letterSpacing: -0.32,
  },
});
