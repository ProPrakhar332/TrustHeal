import React from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { FlatList } from "react-native";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../Components/CustomButton";
import Header from "../Components/Header";
//images
import pfp1 from "../Resources/pfp1.jpg";
import chatting from "../Resources/chattingMedium.png";

const ScheduleHospitalAvailability = () => {
  const [upcomingEConsultations, setupcomingEConsultations] = useState(false);
  const [upcomingPConsultations, setupcomingPConsultations] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);
  const [HistoryModal, setHistoryModal] = useState(false);
  const [TodaysModal, setTodaysModal] = useState(false);
  const [ConsultationQuestionnaire, setConsultationQuestionnaire] =
    useState(false);
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
            backgroundColor: "#e8f0fe",
            marginTop: 30,
            width: "100%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Header showMenu={true} />
          <View style={{ flexDirection: "column" }}>
            <View style={{ backgroundColor: "#E8F0FE" }}>
              <View>
                <Text
                  style={{
                    color: "#2B8ADA",
                    textDecorationLine: "underline",
                    alignSelf: "flex-end",
                    margin: 5,
                    marginHorizontal: 10,
                    fontSize: 12,
                  }}
                >
                  View More
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              >
                <CheckBox
                  title="E-Consultation"
                  containerStyle={styles.checkBoxContainerStyle}
                  textStyle={{ width: "80%", fontSize: 14 }}
                  checkedColor={"#2b8ada"}
                  checked={upcomingEConsultations}
                  onPress={() => {
                    setupcomingEConsultations(!upcomingEConsultations);
                  }}
                />
                <CheckBox
                  title="P-Consultation"
                  containerStyle={styles.checkBoxContainerStyle}
                  textStyle={{ width: "80%", fontSize: 14 }}
                  checkedColor={"#2b8ada"}
                  checked={upcomingPConsultations}
                  onPress={() => {
                    setupcomingPConsultations(!upcomingPConsultations);
                  }}
                />
              </View>
              <View>
                {/*Card Design */}
                <View
                  style={{
                    backgroundColor: "white",
                    width: "95%",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <FAIcon
                      name="prescription"
                      size={20}
                      style={{ marginHorizontal: 5 }}
                      onPress={() => navigation.push("CheifComplaints")}
                    />
                    <CustomButton
                      text="Pre Consultation"
                      textstyle={{ color: "white", fontSize: 10 }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        padding: 3,
                        marginHorizontal: 5,
                        paddingHorizontal: 7,
                        padding: 4,
                      }}
                      onPress={() => setConsultationQuestionnaire(true)}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Image
                      source={pfp1}
                      style={{
                        width: 90,
                        height: 90,
                        alignSelf: "center",
                        borderRadius: 5,
                        margin: 5,
                        marginHorizontal: 10,
                      }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          flexDirection: "row",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Mr Rohan Kumar
                      </Text>

                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "20%",
                            marginRight: "5%",
                          }}
                        >
                          <Text style={styles.cardText}>Age</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "60%" }}>
                          <Text style={styles.cardText}>40</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "20%",
                            marginRight: "5%",
                          }}
                        >
                          <Text style={styles.cardText}>Location</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "60%" }}>
                          <Text style={styles.cardText}>Agra</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "20%",
                            marginRight: "5%",
                          }}
                        >
                          <Text style={styles.cardText}>Symtoms</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "60%" }}>
                          <Text style={styles.cardText}>
                            Fever, Cough, Headache
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "20%",
                            marginRight: "5%",
                          }}
                        >
                          <Text style={styles.cardText}>Slot</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "60%" }}>
                          <Text style={styles.cardText}>9:00 AM | Monday</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <CustomButton
                      text="E-Consultation"
                      textstyle={{ fontSize: 10, color: "#2B8ADA" }}
                      style={{
                        borderWidth: 1,
                        borderColor: "#2B8ADA",
                        padding: 3,
                        alignSelf: "center",
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}
                    />
                    <CustomButton
                      text="P-Consultation"
                      textstyle={{ fontSize: 10, color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        padding: 3,
                        alignSelf: "center",
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        padding: 3,
                        paddingHorizontal: 5,
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                      }}
                      onPress={() => setHistoryModal(true)}
                    >
                      <FAIcon
                        name="file-pdf"
                        color={"black"}
                        size={12}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={{ fontSize: 10 }}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        padding: 3,
                        paddingHorizontal: 5,
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                      }}
                      onPress={() => setTodaysModal(true)}
                    >
                      <FAIcon
                        name="file-pdf"
                        color={"black"}
                        size={12}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={{ fontSize: 10 }}>Today's Doc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2B8ADA",
                        padding: 5,
                        borderRadius: 10,
                        alignSelf: "center",
                      }}
                      onPress={() => setChattingModal(true)}
                    >
                      <Image
                        source={chatting}
                        style={{
                          width: 15,
                          height: 15,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
  card: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 5,
    flexDirection: "column",
    borderColor: "gray",
  },
  name: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    padding: 3,
  },
  cardText: { fontSize: 12 },
  checkBoxContainerStyle: {
    backgroundColor: "#E8F0FE",
    flex: 0.45,
    borderWidth: 0,
    padding: 0,
  },
  HistoryModalText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ScheduleHospitalAvailability;
