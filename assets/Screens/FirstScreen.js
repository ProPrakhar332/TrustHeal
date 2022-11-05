import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import CountryPicker from "rn-country-picker";
import CustomButton from "../Components/CustomButton";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import BrandIcons from "react-native-vector-icons/AntDesign";
import CountDown from "react-native-countdown-component";

const FirstScreen = ({ navigation }) => {
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(9000);
  const [resend, setResend] = useState(false);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [privatePolicy, setprivatePolicy] = useState(false);
  const [notification, setnotification] = useState(false);
  const [mob, setMob] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [modalVisible, setModalVisible] = useState(false);

  const selectedValue = (value) => {
    setCountryCode("+" + value);
  };
  const onFinishCount = () => {
    setShow(false);
    setResend(false);
  };

  const onResend = () => {
    console.log("Resend OTP requested");
    setPin1("");
    setPin2("");
    setPin3("");
    setPin4("");
    setShow(true);
    setResend(true);
    setVal(30);
  };

  const reset = () => {
    setModalVisible(false);
    setPin1("");
    setPin2("");
    setPin3("");
    setPin4("");
    setMob("");
    setnotification(false);
    setprivatePolicy(false);
  };

  const onContinuePressed = () => {
    if (mob.length < 10) Alert.alert("Enter Valid Mobile Number!");
    else {
      let no = countryCode + "" + mob;
      setModalVisible(true);
      //navigation.navigate("OTPScreen", { text: no });
    }
  };

  const loginWithLinkedIn = () => {
    console.log("Login With LinkedIn");
  };
  const loginWithGoogle = () => {
    console.log("Login With Google");
  };
  const loginWithFacebook = () => {
    console.log("Login With Facebook");
  };

  const onSubmitPressed = () => {
    if (pin1 == "" || pin2 == "" || pin3 == "" || pin4 == "")
      Alert.alert("Please feed in Correct OTP!");
    else {
      reset();
      navigation.push("Location");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#e8f0fe",
          width: "100%",
          marginTop: 30,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../Resources/Logo.jpg")}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              borderRadius: 50,
              margin: 20,
            }}
          ></Image>

          <View style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}>
            <CountryPicker
              disable={false}
              animationType={"slide"}
              language="en"
              containerStyle={styles.pickerStyle}
              pickerTitleStyle={styles.pickerTitleStyle}
              selectedCountryTextStyle={styles.selectedCountryTextStyle}
              countryNameTextStyle={styles.countryNameTextStyle}
              pickerTitle={"Country Picker"}
              searchBarPlaceHolder={"Search......"}
              hideCountryFlag={false}
              hideCountryCode={false}
              searchBarStyle={styles.searchBarStyle}
              countryCode={"91"}
              selectedValue={selectedValue}
            />
            <TextInput
              placeholder="Enter Mobile Number"
              style={{
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                padding: 10,
                marginVertical: 10,
                backgroundColor: "white",
                width: "60%",
                fontSize: 15,
              }}
              onChangeText={(text) => setMob(text)}
              value={mob}
              keyboardType={"number-pad"}
              maxLength={10}
              contextMenuHidden={true}
            ></TextInput>
          </View>
          <View style={{ width: "80%", alignSelf: "center" }}>
            <CheckBox
              title="By signing in, you agree to Aarogya Terms and Conditions and Private Policy"
              containerStyle={styles.containerStyle}
              textStyle={{ width: "80%", fontSize: 11 }}
              checkedColor={"#2b8ada"}
              checked={privatePolicy}
              iconType={""}
              onPress={() => setprivatePolicy(!privatePolicy)}
            />
            <CheckBox
              title={"Allow us to send WhatsApp for notification"}
              containerStyle={styles.containerStyle}
              textStyle={{ width: "80%", fontSize: 11 }}
              checkedColor={"#2b8ada"}
              checked={notification}
              onPress={() => setnotification(!notification)}
            />
          </View>
          <CustomButton
            text="Continue"
            textstyle={{
              color: "white",
              fontSize: 15,
              fontFamily: "sans-serif-medium",
            }}
            style={{
              backgroundColor: "#2b8ada",
              width: "90%",
              alignSelf: "center",
              marginVertical: 10,
              borderRadius: 5,
            }}
            onPress={onContinuePressed}
          ></CustomButton>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: "white",
                marginTop: 10,
              }}
              onPress={loginWithLinkedIn}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Image
                  source={require("../Resources/linkedIn.png")}
                  style={{ marginRight: "5%" }}
                />
                <Text style={{ fontSize: 12 }}>Login with LinkedIn</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: "white",
                marginTop: 10,
              }}
              onPress={loginWithGoogle}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Image
                  source={require("../Resources/google.png")}
                  style={{ marginRight: "5%" }}
                />
                <Text style={{ fontSize: 12 }}>Login with Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: "white",
                marginTop: 10,
              }}
              onPress={loginWithFacebook}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Image
                  source={require("../Resources/facebook.png")}
                  style={{ marginRight: "5%" }}
                />
                <Text style={{ fontSize: 12 }}>Login with Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 40 }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "bold",
                fontFamily: "sans-serif-medium",
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Text
              onPress={() => navigation.push("Location")}
              style={{ color: "#2b8ada", fontWeight: "bold", fontSize: 13 }}
            >
              Register Now
            </Text>
          </View>
          {modalVisible ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.8)" }}
              >
                <View style={[styles.modalView, { flexDirection: "column" }]}>
                  <View
                    style={{
                      width: "100%",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        alignSelf: "center",
                        marginTop: 15,
                      }}
                    >
                      Enter OTP
                    </Text>
                    <FAIcon
                      name="window-close"
                      color="black"
                      size={26}
                      style={{ position: "absolute", top: 10, right: 10 }}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                  <View
                    style={{
                      width: "75%",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        marginVertical: 16,
                      }}
                    >
                      Enter 4 digit OTP sent to your mobile number and
                      Registered email
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      <FAIcon name="phone-alt" size={22} color="black" />
                      {"  "}
                      {mob}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin1Ref}
                        value={pin1}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        onChange={(pin1) => {
                          setPin1(pin1);
                          if (pin1 != "") {
                            pin2Ref.current.focus();
                          }
                        }}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin2Ref}
                        value={pin2}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        onChange={(pin2) => {
                          setPin2(pin2);
                          if (pin2 != "") {
                            pin3Ref.current.focus();
                          }
                        }}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin3Ref}
                        value={pin3}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        onChange={(pin3) => {
                          setPin3(pin3);
                          if (pin3 != "") {
                            pin4Ref.current.focus();
                          }
                        }}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin4Ref}
                        value={pin4}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        onChange={(pin4) => {
                          setPin4(pin4);
                        }}
                        style={styles.TextInputText}
                      />
                    </View>
                  </View>
                  <CustomButton
                    text="Submit"
                    style={{
                      alignSelf: "center",
                      width: "90%",
                      backgroundColor: "#2b8ada",
                    }}
                    textstyle={{ color: "white", fontSize: 16 }}
                    onPress={onSubmitPressed}
                  ></CustomButton>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        alignSelf: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Didn't recieve the OTP.{" "}
                    </Text>
                    {resend === false ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: "black",
                          width: "30%",
                          fontWeight: "bold",
                          color: "#2b8ada",
                        }}
                        onPress={onResend}
                      >
                        Resend OTP
                      </Text>
                    ) : null}
                  </View>

                  {show ? (
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <Text style={{ color: "black" }}>
                        Resend OTP after
                        {
                          <CountDown
                            size={16}
                            until={val}
                            digitStyle={{
                              marginHorizontal: 2,
                            }}
                            digitTxtStyle={{ color: "#2b8ada", marginTop: 25 }}
                            timeToShow={["S"]}
                            timeLabels={{ s: null }}
                            showSeparator={true}
                            onFinish={onFinishCount}
                          />
                        }
                        sec
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Modal>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B8ADA",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fe9703",
    margin: 50,
    alignSelf: "center",
  },

  logo: {
    width: 66,
    height: 58,
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: "black",
  },
  pickerTitleStyle: {
    flexDirection: "row",
    fontWeight: "bold",
  },
  pickerStyle: {
    height: 50,
    width: "30%",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    marginRight: 1,
    fontSize: 15,
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    textAlign: "right",
  },
  TextInputView: {
    marginVertical: 1,
    borderRadius: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#2b8ada",
    backgroundColor: "white",
    width: 61,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputText: {
    width: 30,
    height: 30,
    fontSize: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right",
  },

  searchBarStyle: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "#e8f0fe",
    marginVertical: 0,
    borderWidth: 0,
  },
  modalView: {
    position: "absolute",
    width: "100%",
    height: 400,
    bottom: 0,
    backgroundColor: "white",
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default FirstScreen;
