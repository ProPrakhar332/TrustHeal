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
import upload from "../Resources/upload.png";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const PatientRegistration1 = ({ navigation }) => {
  const [patientDto, setpatientDto] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [mobno, setmobno] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [dob, setdob] = useState("");
  const dataGender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Other", value: "Other" },
  ];
  const [title, setTitle] = useState("");
  const dataTitle = [
    { key: "Mr.", value: "Mr." },
    { key: "Mrs.", value: "Mrs." },
    { key: "Ms.", value: "Ms." },
  ];
  const dataBloodGroup = [
    { key: "A+", value: "A+" },
    { key: "A-", value: "A-" },
    { key: "B+", value: "B+" },
    { key: "B-", value: "B-" },
    { key: "O+", value: "O+" },
    { key: "O-", value: "O-" },
    { key: "AB+", value: "AB+" },
    { key: "AB-", value: "AB-" },
  ];
  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);
  //geninfo
  const [showGenInfo, setShowGenInfo] = useState(true);
  const [GenInfoEdit, setGenInfoEdit] = useState(false);
  const [age, setAge] = useState("");

  //Medical Registration Feild
  const [showMedReg, setShowMedReg] = useState(false);
  const [BloodGroup, setBloodGroup] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");

  useEffect(() => {
    async function fetchData() {
      const p = JSON.parse(
        await AsyncStorage.getItem("PatientInitialRegistrationDetails")
      );
      setTitle(p.patientTitle);
      setName(p.patientName);
      setEmail(p.patientEmail);
      setGender(p.patientGender);
      setCity(p.patientCity);
      setdob(p.patientDob);
      setAge(p.patientAge);
    }
    fetchData();
  }, []);
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
      patientBloodGroup: BloodGroup,
      patientOccupation: Occupation,
      patientHeight: Height,
      patientWeight: Weight,
    };
    p = JSON.stringify(p);
    await AsyncStorage.setItem("PatientRegistrationDetails", p);
    console.log(await AsyncStorage.getItem("PatientRegistrationDetails"));
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
          <View
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                },
                showGenInfo ? { borderRadius: 0, marginBottom: 0 } : null,
              ]}
            >
              <TouchableOpacity
                style={[
                  { flexDirection: "row", width: "100%" },
                  showGenInfo
                    ? { borderBottomWidth: 0.5, borderBottomColor: "#707070" }
                    : null,
                ]}
                onPress={() => {
                  if (!showGenInfo) {
                    setShowGenInfo(!showGenInfo);
                  } else {
                    setShowGenInfo(!showGenInfo);
                  }
                }}
              >
                <Text
                  style={[
                    styles.label,
                    { width: "90%" },
                    showGenInfo ? { color: "#2B8ADA", width: "80%" } : null,
                  ]}
                >
                  General Information
                </Text>
                {showGenInfo ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#2B8ADA",
                      padding: 5,
                      textDecorationLine: "underline",
                    }}
                    onPress={() => {
                      Alert.alert("You can now edit General Information Field");
                      setGenInfoEdit(true);
                    }}
                  >
                    Edit
                  </Text>
                ) : null}
                <FAIcon
                  name={showGenInfo ? "chevron-down" : "chevron-right"}
                  style={[styles.label, { width: "10%", fontSize: 20 }]}
                  color={showGenInfo ? "#2B8ADA" : "gray"}
                ></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {showGenInfo ? (
            <View>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "column", marginVertical: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      backgroundColor: "#E8F0FE",
                      width: "90%",
                      height: 52,
                      borderRadius: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          alignItems: "center",
                          flex: 1,
                        }}
                        onPress={() => {}}
                      >
                        <Image
                          source={upload}
                          style={{ marginRight: "5%" }}
                        ></Image>
                        <Text style={{ fontSize: 12 }}>Upload Image</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ flex: 0.45, marginRight: "5%" }}>
                      <Text style={styles.inputLabel}>Title</Text>
                      {GenInfoEdit ? (
                        <SelectList
                          defaultOption={title}
                          placeholder={title}
                          setSelected={(val) => setTitle(val)}
                          data={dataTitle}
                          save="value"
                          boxStyles={[
                            {
                              backgroundColor: "white",
                              borderWidth: 0,
                              backgroundColor: "#d0e0fc",
                            },
                            GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                          ]}
                          dropdownStyles={{ backgroundColor: "white" }}
                          dropdownTextStyles={{
                            color: "#2b8ada",
                            fontWeight: "bold",
                          }}
                          badgeStyles={{ backgroundColor: "#2b8ada" }}
                        />
                      ) : (
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#d0e0fc" },
                            GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                          ]}
                          placeholderTextColor={"black"}
                          value={title}
                          editable={GenInfoEdit}
                        ></TextInput>
                      )}
                    </View>
                    <View style={{ flex: 0.45 }}>
                      <Text style={styles.inputLabel}>Full Name</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#d0e0fc" },
                          GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                        ]}
                        placeholderTextColor={"black"}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        editable={GenInfoEdit}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ flex: 0.45, marginRight: "5%" }}>
                      <Text style={styles.inputLabel}>Email</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#d0e0fc" },
                          GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                        ]}
                        placeholderTextColor={"black"}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType={"email-address"}
                        editable={GenInfoEdit}
                      ></TextInput>
                    </View>
                    <View style={{ flex: 0.45 }}>
                      <Text style={styles.inputLabel}>Gender</Text>
                      {GenInfoEdit ? (
                        <SelectList
                          setSelected={(val) => setGender(val)}
                          data={dataGender}
                          placeholder={gender}
                          defaultOption={gender}
                          save="value"
                          boxStyles={[
                            {
                              backgroundColor: "white",
                              borderWidth: 0,
                              backgroundColor: "#d0e0fc",
                            },
                            GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                          ]}
                          dropdownStyles={{ backgroundColor: "white" }}
                          dropdownTextStyles={{
                            color: "#2b8ada",
                            fontWeight: "bold",
                          }}
                          badgeStyles={{ backgroundColor: "#2b8ada" }}
                        />
                      ) : (
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#d0e0fc" },
                            GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                          ]}
                          value={gender}
                          editable={GenInfoEdit}
                        ></TextInput>
                      )}
                    </View>
                  </View>

                  <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
                    <Text style={styles.inputLabel}>City</Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        { backgroundColor: "#d0e0fc" },
                        GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                      ]}
                      placeholderTextColor={"black"}
                      onChangeText={(text) => setCity(text)}
                      value={city}
                      editable={GenInfoEdit}
                    ></TextInput>
                  </View>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ flex: 0.45, marginRight: "5%" }}>
                      <Text style={styles.inputLabel}>Date Of Birth</Text>
                      <View>
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#E8F0FE" },
                          ]}
                          placeholderTextColor={"black"}
                          onChangeText={(text) => setdob(text)}
                          value={dob}
                          editable={GenInfoEdit}
                        ></TextInput>
                        <FAIcon
                          name="calendar-alt"
                          color={"gray"}
                          size={16}
                          style={{
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            marginRight: "5%",
                            marginBottom: "5%",
                          }}
                          onPress={() => {
                            setdob("12 / 09 / 1987");
                            setAge("32");
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 0.45 }}>
                      <Text style={styles.inputLabel}>Age</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#E8F0FE" },
                        ]}
                        placeholderTextColor={"black"}
                        editable={false}
                        placeholder={age}
                      ></TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  ></View>
                  {GenInfoEdit ? (
                    <CustomButton
                      text="Update"
                      textstyle={{ color: "white", alignSelf: "center" }}
                      onPress={() => {
                        Alert.alert(
                          "All changes made in Genreal Information have been updated"
                        );
                        setGenInfoEdit(false);
                      }}
                      style={{
                        width: "50%",
                        marginTop: 15,
                        flexDirection: "column",
                        alignSelf: "center",
                        backgroundColor: "#2B8ADA",
                      }}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          <View
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginVertical: 10,
                  padding: 5,
                },
                showMedReg
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}
            >
              <TouchableOpacity
                style={[
                  { flexDirection: "row", width: "100%" },
                  showMedReg
                    ? { borderBottomWidth: 0.5, borderBottomColor: "#707070" }
                    : null,
                ]}
                onPress={() => {
                  if (!showMedReg) {
                    setShowMedReg(!showMedReg);
                  } else {
                    setShowMedReg(!showMedReg);
                  }
                }}
              >
                <Text
                  style={[
                    styles.label,
                    { width: "90%" },
                    showMedReg ? { color: "#2B8ADA" } : null,
                  ]}
                >
                  Other Details (Optional)
                </Text>
                <FAIcon
                  name={showMedReg ? "chevron-down" : "chevron-right"}
                  color={showMedReg ? "#2B8ADA" : "gray"}
                  style={[styles.label, { width: "10%", fontSize: 20 }]}
                ></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {showMedReg ? (
            <View>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "column", marginBottom: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flex: 0.45, marginRight: "5%" }}>
                      <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                        Blood Group
                      </Text>
                      <SelectList
                        defaultOption={BloodGroup}
                        placeholder={" "}
                        setSelected={(val) => setBloodGroup(val)}
                        data={dataBloodGroup}
                        save="value"
                        boxStyles={[
                          {
                            backgroundColor: "#E8F0FE",
                            borderWidth: 0,
                          },
                        ]}
                        dropdownStyles={{ backgroundColor: "white" }}
                        dropdownTextStyles={{
                          color: "#2b8ada",
                          fontWeight: "bold",
                        }}
                        badgeStyles={{ backgroundColor: "#2b8ada" }}
                      />
                    </View>
                    <View style={{ flex: 0.45 }}>
                      <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                        Occupation
                      </Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#E8F0FE" },
                        ]}
                        placeholderTextColor={"black"}
                        value={Occupation}
                        onChangeText={(text) => setOccupation(text)}
                      ></TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flex: 0.45, marginRight: "5%" }}>
                      <Text style={styles.inputLabel}>Height</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#E8F0FE" },
                        ]}
                        placeholderTextColor={"black"}
                        value={Height}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => setHeight(text)}
                      ></TextInput>
                    </View>
                    <View style={{ flex: 0.45 }}>
                      <Text style={styles.inputLabel}>Weight</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          { backgroundColor: "#E8F0FE" },
                        ]}
                        placeholderTextColor={"black"}
                        value={Weight}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => setWeight(text)}
                      ></TextInput>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              marginVertical: 15,
            }}
          >
            <CustomButton
              text="Submit"
              textstyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
              style={{
                flex: 0.45,
                marginRight: "5%",
                marginBottom: 50,
                marginVertical: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#2b8ada",
              }}
              onPress={() => {
                SetData();
                navigation.push("PatientHome");
              }}
            ></CustomButton>
            <CustomButton
              text="Save"
              textstyle={{
                color: "#2b8ada",
                fontSize: 16,
                fontWeight: "bold",
              }}
              style={{
                borderColor: "#2b8ada",
                borderWidth: 2,
                flex: 0.45,
                marginBottom: 50,
                marginVertical: 10,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                SetData();
                Alert.alert("All details have been saved!");
              }}
            ></CustomButton>
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
    flex: 0.45,
    padding: 5,
    backgroundColor: "#E8F0FE",
    borderRadius: 10,
    fontSize: 14,
    marginVertical: 5,
    color: "black",
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: "bold",
    marginTop: 10,
  },
  label: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
  },
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

export default PatientRegistration1;
