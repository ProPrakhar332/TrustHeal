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
import doctor from "../Resources/doctor.png";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DoctorRegistrationStep1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setmobile] = useState("");
  const [PIN, setPIN] = useState("");
  const [speciality, setspeciality] = useState([]);
  const [Language, setLanguage] = useState([]);

  const [splJson, setsplJson] = useState([]);

  const data = [
    { key: "Dermatologist", value: "Dermatologist" },
    { key: "Dietician & Nutition", value: "Dietician & Nutition" },
    { key: "ENT", value: "ENT" },
    { key: "Endocrinologist", value: "Endocrinologist" },
    { key: "Gastoentrologist", value: "Gastoentrologist" },
    { key: "Gynecologist", value: "Dermatologist" },
    { key: "Lifestyle Diseases", value: "Lifestyle Diseases" },
    { key: "Ophthalmologist", value: "Ophthalmologist" },
    { key: "Pediatrician", value: "Pediatrician" },
    { key: "Physician", value: "Physician" },
    { key: "Psychiatrist", value: "Psychiatrist" },
    { key: "Psychological Counselling", value: "Psychological Counselling" },
  ];
  const dataLang = [
    { key: "English", value: "English" },
    { key: "Hindi", value: "Hindi" },
    { key: "Bengali", value: "Bengali" },
    { key: "Marathi", value: "Marathi" },
    { key: "Telgu", value: "Telgu" },
    { key: "Tamil", value: "Tamil" },
    { key: "Gujarati", value: "Gujarati" },
    { key: "Urdu", value: "Urdu" },
    { key: "Kannada", value: "Kannada" },
    { key: "Odia", value: "Odia" },
    { key: "Malayalam", value: "Malayalam" },
    { key: "Punjabi", value: "Punjabi" },
    { key: "Assamese", value: "Assamese" },
    { key: "Maithili", value: "Maithili" },
    { key: "Manipuri", value: "Manipuri" },
  ];
  const dataGender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Other", value: "Other" },
  ];

  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [splModalVisible, setSplModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);

  const genderSubmit = () => {
    console.log(gender);
  };

  const sp = async () => {
    //console.log(JSON.stringify(splJson));
    await AsyncStorage.setItem("speciality", JSON.stringify(splJson));
    console.log("From Cache");
    console.log(await AsyncStorage.getItem("speciality"));
  };

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
                backgroundColor: "white",
                width: "90%",
                height: 10,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  width: "33%",
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "#2b8ada",
                }}
              ></View>
            </View>
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
                source={doctor}
              ></Image>
            </View>
          </View>

          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Title*</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setTitle(text)}
                value={title}
              ></TextInput>
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
                labelStyles={{ height: 0 }}
                setSelected={(val) => setGender(val)}
                data={dataGender}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Speciality*</Text>
              <MultipleSelectList
                labelStyles={{ height: 0 }}
                setSelected={(val) => setspeciality(val)}
                data={data}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>
            <CustomButton
              text="Check Speciality"
              onPress={() => {
                var temp = [];
                speciality.forEach(function (item) {
                  temp.push({
                    key: item,
                    value: item,
                  });
                });
                console.log("Before splJson");
                console.log(splJson);
                console.log("temp");
                console.log(temp);
                console.log("After splJson");
                setsplJson(temp);
                console.log(splJson);
              }}
            />

            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Language*</Text>
              <MultipleSelectList
                labelStyles={{ height: 0 }}
                setSelected={(val) => setLanguage(val)}
                data={dataLang}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>PIN CODE*</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"gray"}
                maxLength={6}
                keyboardType={"number-pad"}
                onChangeText={(text) => {
                  setPIN(text);
                  setCity("Dehradun");
                }}
                value={PIN}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
                editable={false}
                value={city}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
                editable={false}
                value={mobile}
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
                  sp();
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
                            navigation.push("DoctorRegistrationStep2");
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
                onPress={() => navigation.push("DoctorHome")}
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

export default DoctorRegistrationStep1;
