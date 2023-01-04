import React, { useState, useEffect } from "react";
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import HeaderPatient from "../Components/HeaderPatient";
import CustomButton from "../Components/CustomButton";
import FAIcon from "react-native-vector-icons/FontAwesome5";

import doctor_m from "../Resources/doctor_m.png";

const data = {
  name: "Dr. Imran Singh",
  spl: "Psychiatry",
  exp: "10 Years of experience",
  deg: "MBBS, MD, FID, CCLHA",
  city: "New Delhi",
  email: "Imran@gmail.com",
  pres: "",
  age: 36,
  dob: "03/02/1973",
  img: doctor_m,
  doctorConsultationFeesDTO: {
    eConsulationFees: 500,
    followUpFees: 0,
    physicalConsulationFees: 800,
  },
  doctorEducationsDTOs: [
    {
      degree: "MBBS",
      degreePath: "string",
      doctorEducationPkId: 0,
      passingYear: "1986",
      specialization: ["Psychiatry", "Diabetologist", "General Physician"],
      totalExperiencedInMonths: 0,
      university: "IGNOU",
    },
  ],
  doctorMedicalRegistrationDTOs: [
    {
      certificatePath: "xyz",
      registrationCouncil: "abc",
      registrationNo: "23643",
      registrationYear: "1986",
    },
  ],
};

function DoctorDetails({ navigation }) {
  const [showGenInfo, setShowGenInfo] = useState(true);
  const [showEduInfo, setShowEduInfo] = useState(true);
  const [showMedInfo, setShowMedInfo] = useState(true);
  const [consultationModeModal, setconsultationModeModal] = useState(false);
  const layout = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#2B8ADA",
          width: "100%",
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
            marginTop: 30,
            backgroundColor: "#e8f0fe",
          }}
          showsVerticalScrollIndicator={false}
        >
          <HeaderPatient showMenu={false} title={"About"} />
          {/* Top */}
          <View style={{ marginVertical: 10, alignSelf: "center" }}>
            <Image
              source={data.img}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "gray",
                alignSelf: "center",
                marginVertical: 3,
              }}
            >
              {data.spl}
            </Text>
            <Text
              style={{
                backgroundColor: "#2B8ADA",
                color: "white",
                borderRadius: 10,
                alignSelf: "center",
                padding: 3,
                paddingHorizontal: 15,
              }}
            >
              {data.exp}
            </Text>
          </View>
          {/* Genreal Information */}
          <View
            style={{
              width: "90%",
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
                showGenInfo
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
                  showGenInfo
                    ? { borderBottomWidth: 1, borderBottomColor: "#707070" }
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
                    showGenInfo ? { color: "#2B8ADA" } : null,
                  ]}
                >
                  Genreal Information
                </Text>
                <FAIcon
                  name={showGenInfo ? "chevron-down" : "chevron-right"}
                  color={showGenInfo ? "#2B8ADA" : "gray"}
                  style={[styles.label, { width: "10%", fontSize: 20 }]}
                ></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {showGenInfo ? (
            <View style={{ width: "90%", alignSelf: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "column", flex: 0.6 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Email :
                      </Text>
                      <Text style={{ fontSize: 12 }}> {data.email}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Date of Birth :
                      </Text>
                      <Text style={{ fontSize: 12 }}> {data.dob}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column", flex: 0.3 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        City :
                      </Text>
                      <Text style={{ fontSize: 12 }}> {data.city}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Age :
                      </Text>
                      <Text style={{ fontSize: 12 }}> {data.age}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {/* Education Qualification */}
          <View
            style={{
              width: "90%",
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
                showEduInfo
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
                  showEduInfo
                    ? { borderBottomWidth: 1, borderBottomColor: "#707070" }
                    : null,
                ]}
                onPress={() => {
                  if (!showEduInfo) {
                    setShowEduInfo(!showEduInfo);
                  } else {
                    setShowEduInfo(!showEduInfo);
                  }
                }}
              >
                <Text
                  style={[
                    styles.label,
                    { width: "90%" },
                    showEduInfo ? { color: "#2B8ADA" } : null,
                  ]}
                >
                  Education Qualification
                </Text>
                <FAIcon
                  name={showEduInfo ? "chevron-down" : "chevron-right"}
                  color={showEduInfo ? "#2B8ADA" : "gray"}
                  style={[styles.label, { width: "10%", fontSize: 20 }]}
                ></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {showEduInfo ? (
            <View style={{ width: "90%", alignSelf: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        marginBottom: 5,
                        textDecorationLine: "underline",
                        marginRight: 5,
                        flex: 0.3,
                      }}
                    >
                      University:
                    </Text>
                    <Text style={{ flex: 0.7 }}>
                      {data.doctorEducationsDTOs[0].university}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        marginBottom: 5,
                        textDecorationLine: "underline",
                        marginRight: 5,
                        flex: 0.3,
                      }}
                    >
                      Degree:
                    </Text>
                    <Text style={{ flex: 0.7 }}>
                      {data.doctorEducationsDTOs[0].degree}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        marginBottom: 5,
                        textDecorationLine: "underline",
                        marginRight: 5,
                        flex: 1,
                      }}
                    >
                      Specialization:
                    </Text>
                    <View style={{ flex: 1 }}>
                      {data.doctorEducationsDTOs[0].specialization.map(
                        (index) => {
                          return <Text key={index}> - {index}</Text>;
                        }
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {/* Medical Registration */}
          <View
            style={{
              width: "90%",
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
                showMedInfo
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
                  showMedInfo
                    ? { borderBottomWidth: 1, borderBottomColor: "#707070" }
                    : null,
                ]}
                onPress={() => {
                  if (!showMedInfo) {
                    setShowMedInfo(!showMedInfo);
                  } else {
                    setShowMedInfo(!showMedInfo);
                  }
                }}
              >
                <Text
                  style={[
                    styles.label,
                    { width: "90%" },
                    showMedInfo ? { color: "#2B8ADA" } : null,
                  ]}
                >
                  Medical Registration
                </Text>
                <FAIcon
                  name={showMedInfo ? "chevron-down" : "chevron-right"}
                  color={showMedInfo ? "#2B8ADA" : "gray"}
                  style={[styles.label, { width: "10%", fontSize: 20 }]}
                ></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {showMedInfo ? (
            <View style={{ width: "90%", alignSelf: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "column", flex: 0.6 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Registration No :
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {" "}
                        {data.doctorMedicalRegistrationDTOs[0].registrationNo}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Registration Certificate :
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {" "}
                        {data.doctorMedicalRegistrationDTOs[0].certificatePath}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column", flex: 0.3 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Reg. Council:
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {" "}
                        {
                          data.doctorMedicalRegistrationDTOs[0]
                            .registrationCouncil
                        }
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        Reg. Year :
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {" "}
                        {data.doctorMedicalRegistrationDTOs[0].registrationYear}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {consultationModeModal ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={consultationModeModal}
              onRequestClose={() => {
                setconsultationModeModal(!consultationModeModal);
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
                      borderRadius: 10,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        padding: 5,
                        alignSelf: "center",
                      }}
                    >
                      Consultation Mode
                    </Text>
                    <FAIcon
                      name="window-close"
                      color="black"
                      size={20}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        setconsultationModeModal(false);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: "90%",
                      alignSelf: "center",
                      flex: 1,
                      backgroundColor: "#2B8ADA",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      padding: 10,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("SelectSlotsE");
                      setconsultationModeModal(false);
                    }}
                  >
                    <FAIcon name={"video"} color={"white"} size={16} />
                    <Text style={{ color: "white", fontSize: 14 }}>
                      E-Consultation
                    </Text>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      Rs. {data.doctorConsultationFeesDTO.eConsulationFees}/-
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "90%",
                      alignSelf: "center",
                      flex: 1,
                      backgroundColor: "#17CC9C",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      padding: 10,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("SelectSlotsP");
                      setconsultationModeModal(false);
                    }}
                  >
                    <FAIcon name={"users"} color={"white"} size={16} />
                    <Text style={{ color: "white", fontSize: 14 }}>
                      P-Consultation
                    </Text>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      Rs.{" "}
                      {data.doctorConsultationFeesDTO.physicalConsulationFees}/-
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
        </ScrollView>
        <View
          style={{
            backgroundColor: "#2B8ADA",
            height: 45,
            flexDirection: "row",
          }}
        >
          <CustomButton
            text={"BOOK NOW"}
            textstyle={{ color: "#2B8ADA", fontSize: 12, fontWeight: "bold" }}
            style={{
              position: "absolute",
              right: 20,
              alignSelf: "center",
              backgroundColor: "white",
              width: 100,
              padding: 3,
            }}
            onPress={() => setconsultationModeModal(true)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe",
  },
  label: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
  },
  modalView: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default DoctorDetails;
