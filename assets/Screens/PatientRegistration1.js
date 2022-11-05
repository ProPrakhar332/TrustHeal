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

//icons
import male from "../Resources/male.png";
import female from "../Resources/female.png";
import other from "../Resources/other.png";
import terms from "../Resources/term.png";

const PatientRegistration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [occ, setOcc] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [Male, setMale] = useState(false);
  const [Female, setFemale] = useState(false);
  const [Other, setOther] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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
          backgroundColor: "#343434",
        }}
      >
        <ScrollView
          style={{
            width: "90%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
              >
                Let's get started!
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                Give us a few details about yourself
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                to create your profile
              </Text>
            </View>
            <View
              style={{
                borderWidth: 5,
                borderColor: "#129A46",
                width: 100,
                height: 100,
                borderRadius: 150,
                alignSelf: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: 80,
                  height: 80,
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
                fontSize: 18,
                color: "white",
              }}
            >
              Add Profile Picture
            </Text>
          </View>
          <View>
            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor={"gray"}
                onChangeText={(text) => setName(text)}
                value={name}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Mobile"
                onChangeText={(text) => setMob(text)}
                value={mob}
                maxLength={10}
                keyboardType={"number-pad"}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                maxLength={10}
                keyboardType={"email-address"}
              ></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Date of Birth"
                onChangeText={(text) => setDate(text)}
                value={date}
                maxLength={10}
                keyboardType={"numberic-pad"}
              ></TextInput>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMale(!Male);
                  setFemale(false);
                  setOther(false);
                  setGender("Male");
                }}
              >
                <View
                  style={
                    Male
                      ? {
                          flexDirection: "row",
                          backgroundColor: "#129A46",
                          padding: 10,
                          borderRadius: 15,
                        }
                      : {
                          flexDirection: "row",
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 15,
                        }
                  }
                >
                  <Image
                    style={{ height: 20, width: 20, marginRight: 5 }}
                    source={male}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Male</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFemale(!Female);
                  setMale(false);
                  setOther(false);
                  setGender("Female");
                }}
              >
                <View
                  style={
                    Female
                      ? {
                          flexDirection: "row",
                          backgroundColor: "#129A46",
                          padding: 10,
                          borderRadius: 15,
                          marginHorizontal: 10,
                        }
                      : {
                          flexDirection: "row",
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 15,
                          marginHorizontal: 10,
                        }
                  }
                >
                  <Image
                    style={{ height: 20, width: 20, marginRight: 5 }}
                    source={female}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Female</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOther(!Other);
                  setFemale(false);
                  setMale(false);
                  setGender("Other");
                }}
              >
                <View
                  style={
                    Other
                      ? {
                          flexDirection: "row",
                          backgroundColor: "#129A46",
                          padding: 10,
                          borderRadius: 15,
                        }
                      : {
                          flexDirection: "row",
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 15,
                        }
                  }
                >
                  <Image
                    style={{ height: 20, width: 20, marginRight: 5 }}
                    source={other}
                  ></Image>
                  <Text style={{ fontSize: 16 }}>Other</Text>
                </View>
              </TouchableOpacity>
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
                  backgroundColor: "#129A46",
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
                    backgroundColor: "#129A46",
                  }}
                  onPress={() => navigation.push("AddDocument")}
                ></CustomButton>
              </View>
            </View>
            {det == true ? (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ marginVertical: 10, flex: 0.5, marginRight: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      Blood Group
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="A+"
                      onChangeText={(text) => setDate(text)}
                      value={date}
                    ></TextInput>
                  </View>
                  <View
                    style={{ marginVertical: 10, flex: 0.5, marginRight: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      Height
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="in cm"
                      onChangeText={(text) => setHeight(text)}
                      value={height}
                      keyboardType={"decimal-pad"}
                    ></TextInput>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ marginVertical: 10, flex: 0.5, marginRight: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      Occupation
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Service"
                      onChangeText={(text) => setOcc(text)}
                      value={occ}
                    ></TextInput>
                  </View>
                  <View style={{ marginVertical: 10, flex: 0.5 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      Weight
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="in kg"
                      onChangeText={(text) => setWeight(text)}
                      value={weight}
                      keyboardType={"decimal-pad"}
                    ></TextInput>
                  </View>
                </View>
              </View>
            ) : null}

            <CustomButton
              text="SUBMIT"
              textstyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
              style={{
                backgroundColor: "#129A46",
                marginVertical: 20,
                padding: 15,
                borderRadius: 10,
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
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                >
                  <Image source={terms} style={{ width: 70, height: 70 }} />
                  <View>
                    <Text style={styles.heading}>Terms Of Service</Text>
                    <Text>Loremipsumdolorsitamet,consectetur</Text>
                  </View>
                </View>
                <ScrollView>
                  <Text style={styles.modalText}>
                    1.Loremipsumdolorsitamet,consecteturadipiscingelit,seddo
                    eiusmodtemporincididuntutlaboreetdoloremagnaaliqua.Ut
                    enimadminimveniam,quisnostrudexercitationullamcolaboris
                    nisiutaliquipexeacommodoconsequat.Duisauteiruredolorin
                  </Text>
                  <Text style={styles.modalText}>
                    2.reprehenderitinvoluptatevelitessecillumdoloreeufugiatnulla
                    pariatur.Excepteursintoccaecatcupidatatnonproident,suntin
                    culpaquiofficiadeseruntmollitanimidestlaborum.
                  </Text>
                  <Text style={styles.modalText}>
                    3.Loremipsumdolorsitamet,consecteturadipiscingelit,seddo
                    eiusmodtemporincididuntutlaboreetdoloremagnaaliqua.Ut
                    enimadminimveniam,quisnostrudexercitationullamcolaboris
                    nisiutaliquipexeacommodoconsequat.Duisauteiruredolorin
                  </Text>
                  <Text style={styles.modalText}>
                    4.reprehenderitinvoluptatevelitessecillumdoloreeufugiatnulla
                    pariatur.Excepteursintoccaecatcupidatatnonproident,suntin
                    culpaquiofficiadeseruntmollitanimidestlaborum.
                  </Text>
                  <Text style={styles.modalText}>
                    5.Loremipsumdolorsitamet,consecteturadipiscingelit,seddo
                    eiusmodtemporincididuntutlaboreetdoloremagnaaliqua.Ut
                    enimadminimveniam,quisnostrudexercitationullamcolaboris
                    nisiutaliquipexeacommodoconsequat.Duisauteiruredolorin
                    quiofficiadeseruntmollitanimidestlaborum.
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
                    style={{
                      backgroundColor: "orange",
                      marginRight: 30,
                      flex: 0.4,
                    }}
                    textstyle={{ color: "white" }}
                    onPress={() => setModalVisible(false)}
                  ></CustomButton>
                  <CustomButton
                    text="Accept"
                    style={{ backgroundColor: "#129A46", flex: 0.4 }}
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
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343434",
  },
  textInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 16,
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
    marginVertical: 15,
    marginHorizontal: 5,
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
});

export default PatientRegistration;
