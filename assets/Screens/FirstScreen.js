import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import CountryPicker from "rn-country-picker";
import CustomButton from "../Components/CustomButton";

const FirstScreen = ({ navigation }) => {
  const { otp, setOtp } = useState("");
  const [mob, setMob] = useState("");
  const [OTPbar, setOTPbar] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const selectedValue = (value) => {
    setCountryCode("+" + value);
  };
  const onSubmitPressed = () => {
    navigation.push("Role");
  };
  const onSendOTPPressed = () => {
    if (mob.length < 10) Alert.alert("Enter Valid Mobile Number!");
    else {
      console.log("Send OTP");
      Alert.alert("OTP sent on mobile number  " + countryCode + " " + mob);
      setOTPbar(true);
    }
  };

  const onResendOTPPressed = () => {
    console.log("OTP Resend");
  };

  const layout = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={[
          styles.container,
          { marginVertical: 20, height: layout.height - 50 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../Resources/Logo.jpg")}
          style={{
            width: 210,
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
              borderBottomWidth: 2,
              padding: 10,
              borderColor: "black",
              marginVertical: 10,
              width: "60%",
            }}
            onChangeText={(text) => setMob(text)}
            value={mob}
            keyboardType={"number-pad"}
            maxLength={10}
          ></TextInput>
        </View>
        <CustomButton
          text="Send OTP"
          textstyle={{ color: "white" }}
          style={{ alignSelf: "flex-end", backgroundColor: "limegreen" }}
          onPress={onSendOTPPressed}
        ></CustomButton>

        {OTPbar ? (
          <View>
            <Text
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              Enter OTP
            </Text>
            <TextInput
              textstyle={{ color: "white" }}
              value={otp}
              setVale={setOtp}
              secureTextEntry
              keyboardType={"number-pad"}
              style={{
                padding: 10,
                fontSize: 15,
                borderBottomWidth: 2,
                borderColor: "black",
                marginBottom: 20,
                textAlign: "center",
              }}
              maxLength={6}
            ></TextInput>

            <CustomButton
              text="RESEND OTP"
              textstyle={{ color: "white" }}
              onPress={onResendOTPPressed}
              style={{ alignSelf: "flex-start", backgroundColor: "limegreen" }}
            ></CustomButton>
            <CustomButton
              text="SUBMIT"
              textstyle={{ color: "white" }}
              onPress={onSubmitPressed}
              style={{
                width: "80%",
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "limegreen",
              }}
            ></CustomButton>
          </View>
        ) : null}

        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 40 }}
        >
          <Text style={{ fontSize: 16 }}>Don't Have an account?</Text>
          <Text
            onPress={() => navigation.push("Role")}
            style={{ color: "orange", fontWeight: "bold", fontSize: 16 }}
          >
            Register Now
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
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
  titleText: {
    color: "#000",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold",
  },
  pickerTitleStyle: {
    flexDirection: "row",
    fontWeight: "bold",
  },
  pickerStyle: {
    height: 54,
    width: "30%",
    marginVertical: 10,
    borderColor: "#303030",
    alignItems: "center",
    padding: 10,

    borderBottomWidth: 2,
    fontSize: 16,
    color: "#000",
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: "#000",
    textAlign: "right",
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right",
  },

  searchBarStyle: {
    flex: 1,
  },
});

export default FirstScreen;
