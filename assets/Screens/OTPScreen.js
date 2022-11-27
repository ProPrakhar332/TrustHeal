import { useRoute } from "@react-navigation/native";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../Components/CustomButton";
import CountDown from "react-native-countdown-component";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const OTPScreen = ({ navigation }) => {
  const route = useRoute();
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

  const onFinishCount = () => {
    setShow(false);
    setResend(false);
  };

  const onResend = () => {
    console.log("Resend OTP requested");
    setShow(true);
    setResend(true);
    setVal(30);
  };

  const onSubmitPressed = () => {
    if (pin1 === "" && pin2 === "" && pin3 === "" && pin4 === "")
      Alert.alert("Please feed in Correct OTP!");
    else navigation.navigate("Role");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, alignSelf: "center", width: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={{ alignSelf: "center", alignItems: "center" }}>
              <Text
                style={{
                  color: "#EE6A5B",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Enter OTP
              </Text>
              <Text style={{ fontSize: 20, color: "black" }}>
                Enter 4 digit OTP
              </Text>
              <Text style={{ fontSize: 20, color: "black" }}>
                {" "}
                sent to your mobile number:-
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "black",
                  marginVertical: 30,
                }}
              >
                <FAIcon name="phone-alt" size={15} color="black" />{" "}
                {route.params.text}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.TextInputView}>
                <TextInput
                  ref={pin1Ref}
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
              textstyle={{ fontSize: 20, color: "black" }}
              style={{
                backgroundColor: "#EE6A5B",
                width: "90%",
                marginTop: 40,
                alignSelf: "center",
              }}
              onPress={onSubmitPressed}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  width: "70%",
                  marginLeft: 10,
                }}
              >
                Didn't recieve the OTP?
              </Text>
              {resend === false ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    width: "30%",
                    fontWeight: "bold",
                    color: "#EE6A5B",
                  }}
                  onPress={onResend}
                >
                  Resend OTP
                </Text>
              ) : null}
            </View>

            {show ? (
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ marginVertical: 12, color: "black" }}>
                  Resend OTP after
                </Text>
                <CountDown
                  size={16}
                  until={val}
                  digitStyle={{
                    marginHorizontal: 2,
                  }}
                  digitTxtStyle={{ color: "black" }}
                  timeToShow={["M", "S"]}
                  timeLabels={{ m: null, s: null }}
                  showSeparator={true}
                  onFinish={onFinishCount}
                />
              </View>
            ) : null}

            <View style={{ alignSelf: "center", alignItems: "center" }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 20,
                    color: "#EE6A5B",
                  }}
                >
                  <FAIcon name="phone-volume" size={15} color="#EE6A5B" /> OTP
                  ON CALL
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: "black" }}>
                You will receive OTP by a system generated.
              </Text>
            </View>
          </View>
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
    backgroundColor: "#f288b9",
  },
  TextInputView: {
    borderRadius: 5,
    backgroundColor: "white",
    width: 50,
    height: 50,
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
});

export default OTPScreen;
