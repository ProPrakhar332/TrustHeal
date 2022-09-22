import React, { useState } from "react";
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CountryPicker from "rn-country-picker";
import { CheckBox } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
const PatientRegistration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [occ, setOcc] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [check, setChecked] = useState(false);
  const [det, setDet] = useState(false);
  const selectedValue = (value) => {
    setCountryCode(value);
  };
  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "white",
        }}
      >
        <ScrollView
          style={{
            width: "80%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                borderWidth: 5,
                borderColor: "limegreen",
                width: 150,
                height: 150,
                borderRadius: 150,
                alignSelf: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: 120,
                  height: 120,
                  marginVertical: 5,
                }}
                source={require("../Resources/patient.png")}
              ></Image>
            </View>
          </View>
          <View style={{ width: "60%", alignSelf: "center" }}>
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Start Your Journey By Filling In Basic Details
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
                maxLength={10}
                keyboardType={"number-pad"}
              ></TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{ marginVertical: 10, width: "33%", marginRight: 10 }}
              >
                <Text style={styles.headingTriple}>Date Of Birth</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="DD/MM/YYYY"
                  onChangeText={(text) => setDate(text)}
                  value={date}
                ></TextInput>
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
                  mode={"dialog"}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "limegreen",
                  marginVertical: 20,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", width: "80%" }}
                  onPress={() => {
                    setDet(!det);
                  }}
                >
                  <Text style={styles.label}>Other Details</Text>
                </TouchableOpacity>
                <CustomButton
                  text="+"
                  textstyle={{ color: "white", fontWeight: "bold" }}
                  style={{
                    backgroundColor: "white",
                    width: "20%",
                    backgroundColor: "limegreen",
                  }}
                  onPress={() => navigation.push("AddDocument")}
                ></CustomButton>
              </View>
            </View>
            {det == true ? (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}
                >
                  <Text style={{ fontSize: 10 }}>Blood Group</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="A+"
                    onChangeText={(text) => setDate(text)}
                    value={date}
                  ></TextInput>
                </View>

                <View
                  style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}
                >
                  <Text style={{ fontSize: 10 }}>Occupation</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Service"
                    onChangeText={(text) => setOcc(text)}
                    value={occ}
                  ></TextInput>
                </View>

                <View
                  style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}
                >
                  <Text style={{ fontSize: 10 }}>Height</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="in cm"
                    onChangeText={(text) => setHeight(text)}
                    value={height}
                    keyboardType={"decimal-pad"}
                  ></TextInput>
                </View>
                <View style={{ marginVertical: 10, flex: 0.25 }}>
                  <Text style={{ fontSize: 10 }}>Weight</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="in kg"
                    onChangeText={(text) => setWeight(text)}
                    value={weight}
                    keyboardType={"decimal-pad"}
                  ></TextInput>
                </View>
              </View>
            ) : null}

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
                      navigation.push("PatientHome");
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
  textInput: {
    width: "100%",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  label: {
    width: "70%",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    color: "white",
  },
  card: {
    margin: 20,
    backgroundColor: "#e6e3e3",
    alignSelf: "center",
    width: "80%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headingTriple: {
    fontSize: 12,
  },
  pickerStyle: {
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default PatientRegistration;
