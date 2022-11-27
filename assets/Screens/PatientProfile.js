import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
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
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import { StyleSheet } from "react-native";
import HeaderPatient from "../Components/HeaderPatient";
import FAIcon from "react-native-vector-icons/FontAwesome5";

//icons
import patient from "../Resources/patient.png";

import invoice from "../Icons/invoice.png";
import notification from "../Icons/notification.png";
import appointment from "../Icons/appointment.png";
import help from "../Icons/help.png";
import about from "../Icons/about.png";

function PatientProfile({ navigation }) {
  const [HelpModal, setHelpModal] = useState(false);

  const logout = () => {
    console.log("Logging out");
    navigation.navigate("Login/SignUp");
  };
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
          <HeaderPatient title="My Profile" showMenu={false} />
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            {/* Image and Top Text */}
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  borderRadius: 85,
                  width: 85,
                  height: 85,
                  borderWidth: 2,
                  borderColor: "#2B8ADA",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={patient}
                  style={{
                    backgroundColor: "#2B8ADA",
                    borderRadius: 70,
                    width: 70,
                    height: 70,
                    alignSelf: "center",
                  }}
                />
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text style={[styles.blueUnderText, { textAlign: "center" }]}>
                  Mr. Rohit Kumar
                </Text>
                <Text
                  style={[
                    styles.grayHeading,
                    {
                      color: "black",
                      fontSize: 17,
                      textAlign: "center",
                      marginBottom: 0,
                    },
                  ]}
                >
                  Delhi
                </Text>
                <Text
                  style={[
                    styles.grayHeading,
                    { textAlign: "center", marginBottom: 0 },
                  ]}
                >
                  rohit@gmail.com
                </Text>
              </View>
            </View>

            {/* Middle White Box */}
            <View style={styles.whiteBox}>
              <View
                style={[
                  styles.whiteOuterBox,
                  { borderBottomWidth: 1, borderColor: "gray" },
                ]}
              >
                <View
                  style={[
                    styles.whiteInnerBox,
                    { borderRightWidth: 1, borderColor: "gray" },
                  ]}
                >
                  <Text style={styles.grayHeading}>Age</Text>
                  <Text style={styles.blueUnderText}>35 Years</Text>
                </View>
                <View style={[styles.whiteInnerBox]}>
                  <Text style={styles.grayHeading}>Phone No.</Text>
                  <Text style={styles.blueUnderText}>+91 123654789</Text>
                </View>
              </View>
              <View style={styles.whiteOuterBox}>
                <View style={[styles.whiteInnerBox]}>
                  <Text style={styles.grayHeading}>Date of Birth</Text>
                  <Text style={styles.blueUnderText}>01-01-1997</Text>
                </View>
                <View
                  style={[
                    styles.whiteInnerBox,
                    { borderLeftWidth: 1, borderColor: "gray" },
                  ]}
                >
                  <Text style={styles.grayHeading}>Gender</Text>
                  <Text style={styles.blueUnderText}>Male</Text>
                </View>
              </View>
            </View>
            {/* Bottom White Box */}
            <View style={styles.whiteBox}>
              <TouchableOpacity style={styles.whiteBoxRow} onPress={() => {}}>
                <View style={{ flex: 0.3 }}>
                  <Image source={invoice} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>Family</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.whiteBoxRow} onPress={() => {}}>
                <View style={{ flex: 0.3 }}>
                  <Image source={invoice} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>Other Details</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.whiteBoxRow} onPress={() => {}}>
                <View style={{ flex: 0.3 }}>
                  <Image source={invoice} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>My Invoices</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.whiteBoxRow} onPress={() => {}}>
                <View style={{ flex: 0.3 }}>
                  <Image source={notification} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>My Notifications</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  navigation.navigate("MyAppointment");
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Image source={appointment} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>My Appointment</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  setHelpModal(true);
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Image source={help} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>Help & Support</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.whiteBoxRow, { borderBottomWidth: 0 }]}
                onPress={() => navigation.navigate("About")}
              >
                <View style={{ flex: 0.3 }}>
                  <Image source={about} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>About Aarogya</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Log Out Button */}
            <CustomButton
              text="Logout"
              textstyle={{ color: "white" }}
              style={{
                backgroundColor: "#2B8ADA",
                borderRadius: 10,
                marginVertical: 5,
                width: "90%",
                alignSelf: "center",
              }}
              onPress={logout}
            />

            {/* Notification Modal */}
            {/* Help & Support */}
            {HelpModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={HelpModal}
                onRequestClose={() => {
                  setHelpModal(!HelpModal);
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
                        width: "95%",
                        justifyContent: "center",
                        alignSelf: "center",
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
                          fontSize: 16,
                          padding: 5,
                        }}
                      >
                        Help & Support
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setHelpModal(false)}
                      />
                    </View>

                    <View style={styles.searchBar}>
                      <TextInput placeholder="Search Question" />
                      <FAIcon
                        name="search"
                        size={15}
                        color="gray"
                        style={styles.searchIcon}
                      />
                    </View>
                    <ScrollView
                      style={{
                        height: 300,
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.WhiteLabel,
                            {
                              borderWidth: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              backgroundColor: "#2B8ADA",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "white",
                              },
                            ]}
                          >
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            marginTop: -6,
                            padding: 5,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            width: "95%",
                            alignSelf: "center",
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: "justify",
                            }}
                          >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.WhiteLabel,
                            {
                              borderWidth: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              backgroundColor: "#2B8ADA",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "white",
                              },
                            ]}
                          >
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            marginTop: -6,
                            padding: 5,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            width: "95%",
                            alignSelf: "center",
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: "justify",
                            }}
                          >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.WhiteLabel,
                            {
                              borderWidth: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              backgroundColor: "#2B8ADA",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "white",
                              },
                            ]}
                          >
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            marginTop: -6,
                            padding: 5,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            width: "95%",
                            alignSelf: "center",
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: "justify",
                            }}
                          >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.WhiteLabel,
                            {
                              borderWidth: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              backgroundColor: "#2B8ADA",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "white",
                              },
                            ]}
                          >
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            marginTop: -6,
                            padding: 5,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            width: "95%",
                            alignSelf: "center",
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: "justify",
                            }}
                          >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            ) : null}
          </View>
        </ScrollView>
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
  grayHeading: { color: "gray", fontSize: 15, marginBottom: 10 },
  blueUnderText: {
    color: "#2B8ADA",
    fontSize: 16,
  },
  whiteInnerBox: {
    flex: 0.45,
    flexDirection: "column",
    padding: 15,
  },
  whiteOuterBox: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  whiteBox: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "90%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  whiteBoxRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 5,
    alignSelf: "center",
  },
  whiteBoxRowIcon: { width: 30, height: 30 },
  whiteBoxRowText: { fontWeight: "bold", fontSize: 16 },
  modalView: {
    borderRadius: 10,
    flex: 1,
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderTopRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#E8F0FE",
    padding: 5,
    borderRadius: 15,
    marginVertical: 5,
    width: "100%",
  },
  WhiteLabel: {
    flexDirection: "row",
    width: "95%",
    marginVertical: 5,
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: 5,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
  },
  searchBar: {
    flex: 1,
    width: "95%",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#2B8ADA",
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBarText: {
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: 10,
  },
});

export default PatientProfile;
