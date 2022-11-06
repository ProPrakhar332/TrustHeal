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

//icons
import doctor from "../Resources/doctor.png";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";

const PatientRegistration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [wan, setWAN] = useState("");
  const [deg, setDeg] = useState("");
  const [degView, setDegView] = useState(false);
  const [spl, setSpl] = useState("");
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [other, setOther] = useState(false);

  const [checkSpl0, setCheckSpl0] = useState(false);
  const [checkSpl1, setCheckSpl1] = useState(false);
  const [checkSpl2, setCheckSpl2] = useState(false);
  const [checkSpl3, setCheckSpl3] = useState(false);
  const [checkSpl4, setCheckSpl4] = useState(false);
  const [checkSpl5, setCheckSpl5] = useState(false);
  const [checkSpl6, setCheckSpl6] = useState(false);
  const [checkSpl7, setCheckSpl7] = useState(false);
  const [checkSpl8, setCheckSpl8] = useState(false);
  const [checkSpl9, setCheckSpl9] = useState(false);
  const [checkSpl10, setCheckSpl10] = useState(false);
  const [checkSpl11, setCheckSpl11] = useState(false);

  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [splModalVisible, setSplModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);

  const splSubmit = () => {
    let p = "";
    if (checkSpl0) p += "Allergy and Immunology\n";
    if (checkSpl1) p += "Anesthesiology\n";
    if (checkSpl2) p += "Cardilogy\n";
    if (checkSpl3) p += "Dentist\n";
    if (checkSpl4) p += "Dermatology\n";
    if (checkSpl5) p += "Diabetologist\n";
    if (checkSpl6) p += "Dieticians\n";
    if (checkSpl7) p += "Disability\n";
    if (checkSpl8) p += "EmergencyMedicine\n";
    if (checkSpl9) p += "Endocrinology\n";
    if (checkSpl10) p += "Epidemilogy\n";
    if (checkSpl11) p += "Fitness\n";
    p = p.substring(0, p.length - 1);
    console.log(p);
    setSpl(p);
  };

  const genderSubmit = () => {
    console.log(gender);
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
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", width: "100%" }}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <Text style={[styles.label, { width: "90%" }]}>
                      {gender}
                    </Text>

                    <FAIcon
                      name="chevron-down"
                      color="black"
                      size={13}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
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
                  <View
                    style={[
                      styles.modalView,
                      {
                        flexDirection: "column",
                        bottom: 0,
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                      },
                    ]}
                  >
                    <View
                      style={{
                        borderBottomColor: "#2b8ada",
                        borderBottomWidth: 4,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#2b8ada",
                          fontWeight: "bold",
                          alignSelf: "center",
                          marginBottom: 10,
                        }}
                      >
                        Select Gender
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => setModalVisible(false)}
                      />
                    </View>
                    <ScrollView style={{ height: 200 }} bounces={false}>
                      <CheckBox
                        title="Male"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={male}
                        onPress={() => {
                          setMale(true);
                          setFemale(false);
                          setOther(false);
                          setGender("Male");
                        }}
                      />
                      <CheckBox
                        title="Female"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={female}
                        onPress={() => {
                          setFemale(true);
                          setMale(false);
                          setOther(false);
                          setGender("Female");
                        }}
                      />
                      <CheckBox
                        title="Other"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={other}
                        onPress={() => {
                          setOther(true);
                          setFemale(false);
                          setMale(false);
                          setGender("Other");
                        }}
                      />
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                      <CustomButton
                        text="Save"
                        style={{ backgroundColor: "#2b8ada", flex: 0.4 }}
                        textstyle={{ color: "white" }}
                        onPress={() => {
                          setModalVisible(false);
                          genderSubmit();
                        }}
                      ></CustomButton>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Speciality*</Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", width: "100%" }}
                  onPress={() => {
                    setSplModalVisible(true);
                  }}
                >
                  <Text style={[styles.label, { width: "90%" }]}>{spl}</Text>
                  <FAIcon
                    name="chevron-down"
                    color="black"
                    size={13}
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {splModalVisible ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={splModalVisible}
                onRequestClose={() => {
                  setSplModalVisible(!splModalVisible);
                }}
              >
                <View
                  style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.8)" }}
                >
                  <View
                    style={[
                      styles.modalView,
                      {
                        flexDirection: "column",
                        bottom: 0,
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                      },
                    ]}
                  >
                    <View
                      style={{
                        borderBottomColor: "#2b8ada",
                        borderBottomWidth: 4,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#2b8ada",
                          fontWeight: "bold",
                          alignSelf: "center",
                          marginBottom: 10,
                        }}
                      >
                        Select Specialization
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="#2b8ada"
                        size={26}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => setSplModalVisible(false)}
                      />
                    </View>
                    <ScrollView style={{ height: 300 }} bounces={false}>
                      <CheckBox
                        title="Allergy And Immunology"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl0}
                        onPress={() => setCheckSpl0(!checkSpl0)}
                      />
                      <CheckBox
                        title="Anesthesiology"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl1}
                        onPress={() => setCheckSpl1(!checkSpl1)}
                      />
                      <CheckBox
                        title="Cardiology"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl2}
                        onPress={() => setCheckSpl2(!checkSpl2)}
                      />
                      <CheckBox
                        title="Dentsit"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl3}
                        onPress={() => setCheckSpl3(!checkSpl3)}
                      />
                      <CheckBox
                        title="Dermatology"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl4}
                        onPress={() => setCheckSpl4(!checkSpl4)}
                      />
                      <CheckBox
                        title="Diabetologist"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl5}
                        onPress={() => setCheckSpl5(!checkSpl5)}
                      />
                      <CheckBox
                        title="Dieticians"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl6}
                        onPress={() => setCheckSpl6(!checkSpl6)}
                      />
                      <CheckBox
                        title="Disability"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl7}
                        onPress={() => setCheckSpl7(!checkSpl7)}
                      />
                      <CheckBox
                        title="Emergency Medicine"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl8}
                        onPress={() => setCheckSpl8(!checkSpl8)}
                      />
                      <CheckBox
                        title="Endocrinology"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl9}
                        onPress={() => setCheckSpl9(!checkSpl9)}
                      />
                      <CheckBox
                        title="Epidermilogy"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl10}
                        onPress={() => setCheckSpl10(!checkSpl10)}
                      />
                      <CheckBox
                        title="Fitness"
                        containerStyle={styles.containerStyle}
                        textStyle={{ width: "80%", fontSize: 14 }}
                        checkedColor={"#2b8ada"}
                        checked={checkSpl11}
                        onPress={() => setCheckSpl11(!checkSpl11)}
                      />
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                      <CustomButton
                        text="Save"
                        style={{ backgroundColor: "#2b8ada", flex: 0.4 }}
                        textstyle={{ color: "white" }}
                        onPress={() => {
                          setSplModalVisible(false);
                          splSubmit();
                        }}
                      ></CustomButton>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>City*</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setCity(text)}
                value={city}
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
    color: "#2b8ada",
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
