import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import { Strings, vh, Images, ScreenName } from "../../utils";
import { hitAPI } from "./action";
import { useDispatch, useSelector } from "react-redux";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { list, loginData } = useSelector(
    (state: { Testimonials: any; Login: any }) => ({
      list: state.Testimonials.list,
      loginData: state.Login.loginData,
    })
  );
  // const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    list.length === 0 ? setIsLoading(true) : null;
    dispatch(
      hitAPI(
        loginData.center_id,
        (myData: Array<any>) => {
          // myData.map((a) => {
          //   setData(a.content);
          // });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      )
    );
  }, []);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Testimonials}
        onPressBack={() => props.navigation.pop()}
      />
      {list.length === 0 ? (
        isLoading ? (
          <CustomLoader loading={true} />
        ) : (
          <CustomNoData />
        )
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {list.map((item: any, index: number) => (
            <View style={Styles.innerView}></View>
          ))}
        </ScrollView>
      )}
      {/* Add Btn ----------- */}
      <TouchableOpacity
        style={Styles.addBtnView}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.ADD_TESTIMONIALS)}
      >
        <Image source={Images.Add_leave} style={Styles.addBtn} />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    borderRadius: vh(10),
    paddingHorizontal: vh(16),
    marginVertical: vh(12),
  },
  addBtnView: {
    position: "absolute",
    bottom: vh(54),
    right: vh(24),
    zIndex: 99,
  },
  addBtn: {
    height: vh(64),
    width: vh(64),
  },
});
