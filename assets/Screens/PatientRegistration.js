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
import CustomButton from "../Components/CustomButton";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

//icons
import patient from "../Resources/patient.png";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientRegistration = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [dob, setdob] = useState("");
  const [age, setage] = useState("");
  const [mobno, setmobno] = useState("");
  const dataGender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Other", value: "Other" },
  ];

  const dataTitle = [
    { key: "Mr.", value: "Mr." },
    { key: "Mrs.", value: "Mrs." },
    { key: "Ms.", value: "Ms." },
  ];

  const [checkTerms, setCheckTerms] = useState(false);

  const SetData = async () => {
    let p = {
      patientTitle: title,
      patientName: name,
      patientEmail: email,
      patientGender: gender,
      patientCity: city,
      patientDob: dob,
      patientAge: age,
      patientMobno: mobno,
    };
    p = JSON.stringify(p);
    await AsyncStorage.setItem("PatientInitialRegistrationDetails", p);
  };

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#E8F0FE",
          width: "100%",
          marginTop: 30,
        }}
      >
        <ScrollView
          style={{
            width: "90%",
            alignSelf: "center",
            marginVertical: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                borderWidth: 5,
                borderColor: "white",
                backgroundColor: "white",
                width: 100,
                height: 100,
                borderRadius: 150,
                alignSelf: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: 75,
                  height: 75,
                  marginVertical: 5,
                }}
                source={patient}
              ></Image>
            </View>
          </View>

          <View>
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Title*</Text>
              <SelectList
                defaultOption={"Mr."}
                placeholder={" "}
                setSelected={(val) => setTitle(val)}
                data={dataTitle}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Full Name*</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setName(text)}
                value={name}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Email*</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={"email-address"}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setEmail(text)}
                value={email}
              ></TextInput>
            </View>
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Gender*</Text>
              <SelectList
                setSelected={(val) => setGender(val)}
                data={dataGender}
                placeholder={" "}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>City*</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setCity(text)}
                value={city}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Date of Birth*</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={"gray"}
                  placeholder={"DD - MM - YYYY"}
                  onChangeText={(text) => setdob(text)}
                  value={dob}
                ></TextInput>
                <FAIcon
                  name="calendar-alt"
                  size={20}
                  style={{
                    position: "absolute",
                    right: 0,
                    alignSelf: "center",
                    marginRight: 10,
                    color: "gray",
                  }}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
                placeholderTextColor={"gray"}
                editable={false}
                onChangeText={(text) => setage(text)}
                value={age}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
                placeholderTextColor={"gray"}
                editable={false}
                onChangeText={(text) => setmobno(text)}
                value={mobno}
              ></TextInput>
            </View>

            <View
              style={{
                marginVertical: 10,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 10,
                  marginVertical: 5,
                  marginLeft: 10,
                }}
              >
                All the fields are mandatory
              </Text>
              <CheckBox
                title="I agree to the Terms and Conditions and Privacy Policy"
                containerStyle={{
                  width: "100%",
                  backgroundColor: "#e8f0fe",
                  borderWidth: 0,
                  padding: 0,
                  margin: 0,
                }}
                textStyle={{
                  fontSize: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                checkedColor={"#2b8ada"}
                checked={checkTerms}
                onPress={() => setCheckTerms(!checkTerms)}
              />
            </View>

            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <CustomButton
                text="Proceed for Next"
                textstyle={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                style={{
                  backgroundColor: "#2b8ada",
                  flex: 0.45,
                  marginBottom: 50,
                  marginVertical: 10,
                  marginRight: "5%",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setTermsView(true);
                }}
              ></CustomButton>
              {termsView ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={termsView}
                  onRequestClose={() => {
                    setTermsView(!termsView);
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.8)",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={[
                        styles.modalView,
                        {
                          flexDirection: "column",
                          borderRadius: 10,
                          height: 400,
                          width: "95%",
                        },
                      ]}
                    >
                      <Image source={require("../Resources/accept.png")} />
                      <Text style={{ fontWeight: "bold" }}>
                        Terms of Services
                      </Text>
                      <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                      <ScrollView style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>Term 1</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>Term 2</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>Term 3</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                      </ScrollView>
                      <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <CustomButton
                          text="Decline"
                          textstyle={{ color: "#2B8ADA", fontSize: 13 }}
                          style={{
                            borderWidth: 1,
                            borderColor: "#2B8ADA",
                            flex: 0.45,
                            marginRight: "5%",
                            alignSelf: "center",
                            padding: 5,
                          }}
                          onPress={() => setTermsView(false)}
                        />
                        <CustomButton
                          text="Accept"
                          textstyle={{ color: "white", fontSize: 13 }}
                          style={{
                            backgroundColor: "#2B8ADA",
                            flex: 0.45,
                            alignSelf: "center",
                            padding: 5,
                          }}
                          onPress={() => {
                            SetData();
                            navigation.push("PatientRegistration1");
                            setTermsView(false);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}
              <CustomButton
                text="Do it Later"
                textstyle={{
                  color: "#2b8ada",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                style={{
                  flex: 0.45,
                  marginBottom: 50,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#2b8ada",
                }}
                onPress={() => {
                  SetData();
                  navigation.push("PatientHome");
                }}
              ></CustomButton>
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
    backgroundColor: "#2B8ADA",
  },
  textInput: {
    width: "100%",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 16,
    color: "black",
  },
  label: {
    width: "70%",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    color: "#2b8ada",
  },
  inputLabel: { fontSize: 14, marginBottom: 6, fontWeight: "bold" },
  card: {
    margin: 20,
    backgroundColor: "#e6e3e3",
    alignSelf: "center",
    width: "90%",
  },
  modalView: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginVertical: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  headingTriple: {
    fontSize: 12,
  },
  pickerStyle: {
    marginVertical: 10,
    alignSelf: "center",
  },
  containerStyle: {
    backgroundColor: "white",
    borderWidth: 0,
    alignSelf: "flex-start",
  },
});

export default PatientRegistration;
