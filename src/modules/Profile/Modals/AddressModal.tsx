import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import {
  Images,
  vw,
  Strings,
  vh,
  Colors,
  validate,
  CommonFunctions,
  ConstantName,
} from "../../../utils";
import {
  CustomInputText,
  CustomButton,
  CustomLoader,
} from "../../../Components";
import { updateProfile, fetchStatesAPI } from "../action";
import StateList from "./StateList";

export interface AppProps {
  setModalOpen: Function;
  updateModal: Function;
}

export default function App(props: AppProps) {
  const { data, stateList } = useSelector((state: { Profile: any }) => ({
    data: state.Profile.data,
    stateList: state.Profile.stateList,
  }));

  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const inputRef5: any = React.createRef();
  const [address1, setAddress1] = useState(data.address1);
  const [address2, setAddress2] = useState(data.address2);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(data.State.state_name);
  const [zipcode, setZipcode] = useState(data.postal_code);
  const [checkZipcode, setCheckZipcode] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    dispatch(
      fetchStatesAPI(
        () => {},
        (e: any) => {
          console.warn("state error ", e);
        }
      )
    );
  }, []);

  const validateAll = () => {
    validate(ConstantName.ZIPCODE, zipcode)
      ? (setLoading(true),
        dispatch(
          updateProfile(
            {
              type: "address_detail",
              countryCode: "",
              city: CommonFunctions.isNullUndefined(city) ? "" : city,
              zipCode: CommonFunctions.isNullUndefined(zipcode) ? "" : zipcode,
              state: CommonFunctions.isNullUndefined(state) ? "" : state,
              address1: CommonFunctions.isNullUndefined(address1)
                ? ""
                : address1,
              address2: CommonFunctions.isNullUndefined(address2)
                ? ""
                : address2,
            },
            () => {
              setLoading(false);
              props.updateModal();
            },
            (err: any) => {
              console.warn("err", err);
              setLoading(false);
            }
          )
        ))
      : (setCheckZipcode(false), inputRef5.current.focus());
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <StateList
        item={item}
        index={index}
        onPress={() => {
          setState(item.state_name);
          setShowList(false);
        }}
      />
    );
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={Styles.mainView}
    >
      <CustomLoader loading={isLoading} />
      <View style={Styles.mainView}>
        <View style={Styles.modalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cancelBtn}
            onPress={() => props.setModalOpen()}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          <Text style={Styles.headingText}>{Strings.Address_Details}</Text>
          <View style={Styles.separatorView} />
          <View style={Styles.msgView}>
            <CustomInputText
              ref={inputRef1}
              titleText={Strings.Address1}
              value={address1}
              onChangeText={(text: string) => setAddress1(text)}
              onSubmitEditing={() => {
                setAddress1(address1.trim());
                inputRef2.current.focus();
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef2}
              titleText={Strings.Address2}
              value={address2}
              onChangeText={(text: string) => setAddress2(text)}
              onSubmitEditing={() => {
                setAddress2(address2.trim());
                inputRef3.current.focus();
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef3}
              titleText={Strings.City}
              value={city}
              onChangeText={(text: string) => setCity(text)}
              onSubmitEditing={() => {
                setCity(city.trim());
                Keyboard.dismiss();
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <Text style={Styles.menuView}>{Strings.State}</Text>
            <TouchableOpacity
              style={Styles.inputTxtView}
              activeOpacity={0.8}
              onPress={() => {
                setShowList(true), Keyboard.dismiss();
              }}
            >
              <Text style={Styles.schoolText}>{state}</Text>
              <Image source={Images.Dropdown_icon} />
            </TouchableOpacity>
            <CustomInputText
              ref={inputRef5}
              titleText={Strings.Zip_Code}
              value={zipcode}
              onChangeText={(text: string) => {
                checkZipcode ? null : setCheckZipcode(true), setZipcode(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.ZIPCODE, zipcode)
                  ? validateAll()
                  : setCheckZipcode(false);
              }}
              check={true}
              incorrectText={Strings.Zipcode_error}
              keyboardType={'number-pad'}
              mainViewStyle={Styles.textInputView}
            />
          </View>
          <View style={Styles.btnView}>
            <CustomButton
              lightBtn={true}
              Text={Strings.Cancel}
              onPress={() => props.setModalOpen()}
              ButtonStyle={{ width: "45%" }}
            />
            <CustomButton
              Text={Strings.Update}
              onPress={() => {
                validateAll();
              }}
              ButtonStyle={{ width: "45%" }}
            />
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={showList}>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Styles.flatlistView}
        >
          <TouchableOpacity
            style={{ padding: vw(20), alignSelf: "flex-end" }}
            activeOpacity={0.8}
            onPress={() => {
              setShowList(false);
            }}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          {/* <CustomSearchBar
            value={query}
            onChangeText={(text: string) => {
              setQuery(text);
              text.length === 0 ? setSearchData(list.slice(0)) : null;
              search(text);
            }}
            placeholder={Strings.Search}
            onSubmitEditing={() => Keyboard.dismiss()}
            onPressCancel={() => {
              setQuery(""), setSearchData([]);
            }}
            mainViewStyle={{ width: "90%", alignSelf: "center" }}
          /> */}
          <FlatList
            nestedScrollEnabled={true}
            data={stateList}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            bounces={false}
            renderItem={renderItems}
          />
        </KeyboardAwareScrollView>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg2,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: vh(15),
    borderTopLeftRadius: vh(15),
    paddingVertical: vh(21),
    paddingHorizontal: vw(16),
  },
  textInputView: {
    marginBottom: vh(6),
  },
  cancelBtn: {
    position: "absolute",
    padding: vh(24),
    right: 0,
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  menuView: {
    marginTop: vh(6),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.titleColor,
  },
  inputTxtView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: Colors.veryLightGrey,
    height: vh(48),
    marginTop: vh(10),
    marginBottom: vh(26),
    borderRadius: vh(50),
    borderWidth: vh(1),
    borderColor: Colors.borderGrey,
    paddingHorizontal: vw(25),
  },
  schoolText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
  },
  flatlistView: {
    paddingVertical: vh(30),
    width: "100%",
    backgroundColor: "white",
    height: "100%",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
    marginVertical: vh(20),
  },
  msgView: {
    width: "100%",
  },
  btnView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
