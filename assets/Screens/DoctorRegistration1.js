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
import { useEffect } from "react";
import axios from "axios";

const DoctorRegistrationStep1 = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setdob] = useState("");
  const [Day, setDay] = useState("");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");
  const [age, setage] = useState(0);
  const [gender, setGender] = useState("");
  const [speciality, setspeciality] = useState([]);
  const [Language, setLanguage] = useState([]);
  const [PIN, setPIN] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setmobile] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);
  const [doctorId, setDoctorId] = useState(0);

  const dataTitle = [
    { key: "Dr.", value: "Dr." },
    { key: "Mr.", value: "Mr." },
    { key: "Mrs.", value: "Mrs." },
    { key: "Ms.", value: "Ms." },
  ];

  const data = [
    { key: "Dermatologist", value: "Dermatologist" },
    { key: "Dietician & Nutition", value: "Dietician & Nutition" },
    { key: "ENT", value: "ENT" },
    { key: "Endocrinologist", value: "Endocrinologist" },
    { key: "Gastoentrologist", value: "Gastoentrologist" },
    { key: "Gynecologist", value: "Gynecologist" },
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

  const window = useWindowDimensions();
  const [termsView, setTermsView] = useState(false);

  const calculateAge = async () => {
    var year = Number(Year);
    var month = Number(Month) - 1;
    var day = Number(Day);
    var today = new Date();
    let x = today.getFullYear() - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      await AsyncStorage.setItem("age", x - 1 + "");
    }
    await AsyncStorage.setItem("age", x + "");
    console.log(await AsyncStorage.getItem("age"));
  };

  const SaveData = async () => {
    //console.log(JSON.stringify(splJson));

    await AsyncStorage.setItem("city", city);
    await AsyncStorage.setItem("dob", Year + "-" + Month + "-" + Day);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("fullName", name);
    await AsyncStorage.setItem("gender", gender);
    await AsyncStorage.setItem("mobileNumber", mobile);
    await AsyncStorage.setItem("PIN", PIN);
    await AsyncStorage.setItem("checkTerms", checkTerms + "");
    await AsyncStorage.setItem("title", title);

    await AsyncStorage.setItem("speciality", JSON.stringify(speciality));
    await AsyncStorage.setItem("language", JSON.stringify(Language));

    const pp = await AsyncStorage.getAllKeys();

    for (var i = 0; i < pp.length; ++i)
      console.log(pp[i] + "\t" + (await AsyncStorage.getItem(pp[i])));

    axios
      .post("http://10.0.2.2:8080/doctor/gernalinfo/save", {
        age: age,
        city: city,
        countryName: await AsyncStorage.getItem("countryName"),
        dob: await AsyncStorage.getItem("dob"),
        email: email,
        fullName: name,
        gender: gender,
        mobileNumber: mobile,
        pincode: PIN,
        profilephoto: "/aws/s3/pfp",
        termsAndCondition: checkTerms,
        title: title,
      })
      .then(async function (response) {
        if (response.status == 201) {
          await AsyncStorage.setItem("doctorId", response.data.doctorId + "");
          console.log(await AsyncStorage.getItem("doctorId"));
          Alert.alert("All details have been saved successfully!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const onLoadSetData = async () => {
      setmobile(await AsyncStorage.getItem("mobileNumber"));
    };
    onLoadSetData();
  }, []);

  useEffect(() => {
    if (Year.length == 4) calculateAge();
  }, [Year]);

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
                placeholderTextColor={"gray"}
                onChangeText={(text) => setEmail(text)}
                keyboardType={"email-address"}
                value={email}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Date of Bith*</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      marginBottom: 3,
                      textAlign: "center",
                    }}
                  >
                    Day
                  </Text>
                  <TextInput
                    onChangeText={(text) => setDay(text)}
                    value={Day}
                    style={[styles.textInput, { textAlign: "center" }]}
                    keyboardType={"number-pad"}
                    placeholder={"DD"}
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      marginBottom: 3,
                      textAlign: "center",
                    }}
                  >
                    Month
                  </Text>
                  <TextInput
                    onChangeText={(text) => setMonth(text)}
                    value={Month}
                    style={[styles.textInput, { textAlign: "center" }]}
                    keyboardType={"number-pad"}
                    placeholder={"MM"}
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      marginBottom: 3,
                      textAlign: "center",
                    }}
                  >
                    Year
                  </Text>
                  <TextInput
                    onChangeText={(text) => {
                      setYear(text);
                    }}
                    value={Year}
                    style={[styles.textInput, { textAlign: "center" }]}
                    keyboardType={"number-pad"}
                    placeholder={"YYYY"}
                    maxLength={4}
                  />
                </View>
              </View>
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
                placeholder={" "}
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
                placeholder={" "}
                setSelected={(val) => setspeciality(val)}
                data={data}
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
              <Text style={[styles.inputLabel]}>Language*</Text>
              <MultipleSelectList
                labelStyles={{ height: 0 }}
                placeholder={" "}
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
                }}
                value={PIN}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={[styles.textInput]}
                onChangeText={(text) => {
                  setCity(text);
                }}
                value={city}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: "#D0E0FC", color: "black" },
                ]}
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
                onPress={async () => {
                  // if (
                  //   name === "" ||
                  //   email === "" ||
                  //   gender === "" ||
                  //   speciality === "" ||
                  //   Language === "" ||
                  //   PIN === ""
                  // )
                  //   Alert.alert(
                  //     "Pls fill in all the details before continuing!"
                  //   );
                  // else {
                  //   SaveData();
                  //   setTermsView(true);
                  // }
                  console.log(await AsyncStorage.getItem("doctorId"));
                }}
              ></CustomButton>
              <CustomButton
                text="Save"
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
                  calculateAge();
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
