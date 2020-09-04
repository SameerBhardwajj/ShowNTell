import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
  CustomHeader,
  CustomLoader,
  CustomNoData,
  CustomToast,
} from "../../Components";
import {
  Strings,
  vh,
  Images,
  ScreenName,
  Colors,
  CommonFunctions,
} from "../../utils";
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
        () => {
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
      {CommonFunctions.isNullUndefined(list) ? (
        isLoading ? (
          <CustomLoader loading={true} />
        ) : (
          <CustomNoData />
        )
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{ marginHorizontal: vh(16) }}
          contentContainerStyle={{
            paddingBottom: vh(130),
            width: "100%",
          }}
        >
          {list.map((item: any, index: number) => (
            <ImageBackground
              source={
                (index + 1) % 3 === 1
                  ? Images.BG_PAttern
                  : (index + 1) % 3 === 2
                  ? Images.BG_PAttern_3
                  : Images.BG_PAttern_5
              }
              imageStyle={{
                alignSelf: "center",
                height: item.Testimonial.text.length > 400 ? vh(200) : "100%",
                marginTop: vh(30),
              }}
              style={[
                Styles.innerView,
                {
                  backgroundColor:
                    (index + 1) % 3 === 1
                      ? Colors.lightPink
                      : (index + 1) % 3 === 2
                      ? Colors.lightWaterBlue
                      : Colors.lightGreen,
                },
              ]}
            >
              <Text style={Styles.descTxt}>
                {`"${item.Testimonial.text.replace(/(<([^>]+)>)/g, " ")}"`}
              </Text>
              <Text
                style={[
                  Styles.nameTxt,
                  {
                    color:
                      (index + 1) % 3 === 1
                        ? Colors.pink
                        : (index + 1) % 3 === 2
                        ? Colors.waterBlue
                        : Colors.green,
                  },
                ]}
              >
                - {item.Testimonial.name}
              </Text>
            </ImageBackground>
          ))}
        </ScrollView>
      )}
      {/* Add Btn ----------- */}
      <TouchableOpacity
        style={Styles.addBtnView}
        activeOpacity={0.8}
        onPress={() => CustomToast()}
        // onPress={() => props.navigation.navigate(ScreenName.ADD_TESTIMONIALS)}
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
    flex: 1,
    alignSelf: "center",
    borderRadius: vh(10),
    paddingVertical: vh(20),
    paddingHorizontal: vh(20),
    marginTop: vh(16),
  },
  descTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    lineHeight: vh(22),
  },
  nameTxt: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    paddingTop: vh(10),
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
