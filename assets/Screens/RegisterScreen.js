import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
import CountryPicker from "rn-country-picker";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [spl, setSpl] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [gender, setGender] = useState("");
  const [check, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [curdate, setCurDate] = useState(new Date());

  const selectedValue = (value) => {
    setCountryCode(value);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    console.log(fDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          backgroundColor: "white",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                borderWidth: 5,
                borderColor: "orange",
                width: 150,
                height: 150,
                borderRadius: 150,
                alignSelf: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: "center",
                }}
                source={require("../Resources/doctor.png")}
              ></Image>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                marginBottom: 10,
              }}
            >
              Start Your Journey by filling in some basic details
            </Text>
          </View>
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text>Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your Full Name"
                onChangeText={(text) => setName(text)}
                value={name}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your Mobile Number"
                onChangeText={(text) => setMob(text)}
                value={mob}
                keyboardType={"number-pad"}
                maxLength={10}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>E-mail</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your Email ID"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType={"email-address"}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Select a Speciality</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Speciality"
                onChangeText={(text) => setSpl(text)}
                value={spl}
              ></TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{ marginVertical: 10, width: "33%", marginRight: 10 }}
              >
                <Text style={styles.headingTriple}>Date Of Birth</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="DD/MM/YYY"
                  onChangeText={(text) => setDate(text)}
                  value={date}
                ></TextInput>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    display="spinner"
                    onChange={onChange}
                    positiveButtonLabel="OK!"
                  ></DateTimePicker>
                )}
              </View>

              <View
                style={{ marginVertical: 10, width: "20%", marginRight: 10 }}
              >
                <Text style={styles.headingTriple}>Country</Text>
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
                  hideCountryCode={true}
                  searchBarStyle={styles.searchBarStyle}
                  countryCode={countryCode}
                  selectedValue={selectedValue}
                />
              </View>

              <View style={{ marginVertical: 10, width: "43%" }}>
                <Text style={styles.headingTriple}>Gender</Text>

                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <View>
              <CheckBox
                textStyle={{ textAlign: "center" }}
                checkedColor={"limegreen"}
                uncheckedColor={"black"}
                title="Allow us to send WhatsApp for notification"
                checked={check}
                onIconPress={() => setChecked(!check)}
              ></CheckBox>
            </View>

            <CustomButton
              text="SUBMIT"
              textstyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
              style={{
                backgroundColor: "limegreen",
                marginVertical: 10,
                padding: 15,
                borderRadius: 50,
              }}
              onPress={() => setModalVisible(true)}
            ></CustomButton>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={[styles.modalView]}>
                <Text style={styles.heading}>Terms Of Service</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalText}>
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjfbhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjfbhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                    bhbchdbkjbvjkdbvkjsbdkvbsdhvbsdhbvhdbhvbadva
                    bfehjbfhwebhfbewhjfbhwebfhewbfhbehfbwehjbfhewbfhw
                    jfekjbwebfhwebghwebhgbehghbewhgbkewbgkjewbgkjbekj
                    kbeskfbeshbfhesjbejfjebfjsebjf
                  </Text>
                </ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    marginTop: 30,
                  }}
                >
                  <CustomButton
                    text="Decline"
                    style={{ backgroundColor: "orange", marginRight: 30 }}
                    textstyle={{ color: "white" }}
                    onPress={() => setModalVisible(false)}
                  ></CustomButton>
                  <CustomButton
                    text="Accept"
                    style={{ backgroundColor: "limegreen" }}
                    textstyle={{ color: "white" }}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.push("DoctorHome");
                    }}
                  ></CustomButton>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  textInput: {
    width: "100%",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  headingTriple: {
    fontSize: 12,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pickerStyle: {
    marginVertical: 10,
  },
});

export default RegisterScreen;
