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
//images
import pfp1 from "../Resources/pfp1.jpg";
import pfp2 from "../Resources/pfp2.jpg";
import pfp3 from "../Resources/pfp3.jpg";
import pfp4 from "../Resources/pfp4.jpg";
import chatting from "../Resources/chattingMedium.png";
import Header from "../Components/Header";

const DoctorHome = ({ navigation }) => {
  //upcoming tab
  const [Upcoming, setUpcoming] = useState(false);
  const [upcomingEConsultations, setupcomingEConsultations] = useState(false);
  const [upcomingPConsultations, setupcomingPConsultations] = useState(false);
  const [PrescriptionModal, setPrescriptionModal] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);
  const [HistoryModal, setHistoryModal] = useState(false);
  const [TodaysModal, setTodaysModal] = useState(false);
  const [ConsultationQuestionnaire, setConsultationQuestionnaire] =
    useState(false);
  //complete tab
  const [Complete, setComplete] = useState(false);
  //status tab
  const [Status, setStatus] = useState(false);
  const [ManageStatusModal, setManageStatusModal] = useState(false);
  const [ManageStatusCancelled, setManageStatusCancelled] = useState(true);
  const [ManageStatusReschedule, setManageStatusReschedule] = useState(false);

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
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            backgroundColor: "#E8F0FE",
            height: layout.height - 120,
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Header showMenu={true} />
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View style={styles.searchBar}>
              <TextInput placeholder="Search" style={styles.searchBarText} />
              <FAIcon
                name="search"
                size={15}
                color="gray"
                style={styles.searchIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "30%",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#2B8ADA",
                padding: 5,
                margin: 10,
              }}
            >
              <Text style={{ color: "#2B8ADA" }}>By Date</Text>
              <FAIcon name="caret-down" color={"#2B8ADA"} size={15} />
            </View>
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setUpcoming(!Upcoming)}
            >
              <Text
                style={[
                  styles.label,
                  { width: "80%" },
                  Upcoming ? { color: "#2B8ADA" } : { color: "black" },
                ]}
              >
                Upcoming Consultations
              </Text>
              <FAIcon
                name={Upcoming ? "chevron-down" : "chevron-right"}
                size={20}
                style={[Upcoming ? { color: "#2B8ADA" } : { color: "black" }]}
              />
            </TouchableOpacity>
            {Upcoming ? (
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
                              <Text style={styles.cardText}>
                                9:00 AM | Monday
                              </Text>
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
            ) : null}
            {HistoryModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={HistoryModal}
                onRequestClose={() => {
                  setHistoryModal(!HistoryModal);
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
                          fontSize: 16,
                          padding: 5,
                        }}
                      >
                        History
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
                        onPress={() => setHistoryModal(false)}
                      />
                    </View>
                    <ScrollView style={{ height: 270, width: "100%" }}>
                      <View
                        style={{
                          backgroundColor: "#E8F0FE",
                          padding: 10,
                          width: "100%",
                          alignSelf: "center",
                          borderRadius: 7,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ width: "80%", alignSelf: "center" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Last Visited
                              </Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                10 Sept 2022
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Prescription
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="prescription"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#E8F0FE",
                          padding: 10,
                          width: "100%",
                          alignSelf: "center",
                          borderRadius: 7,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ width: "80%", alignSelf: "center" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Last Visited
                              </Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                10 Sept 2022
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Prescription
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="prescription"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#E8F0FE",
                          padding: 10,
                          width: "100%",
                          alignSelf: "center",
                          borderRadius: 7,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ width: "80%", alignSelf: "center" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Last Visited
                              </Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                10 Sept 2022
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{ marginHorizontal: 5 }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Prescription
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="prescription"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            ) : null}
            {TodaysModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={TodaysModal}
                onRequestClose={() => {
                  setTodaysModal(!TodaysModal);
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
                          fontSize: 16,
                          padding: 5,
                        }}
                      >
                        Today's Document
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
                        onPress={() => setTodaysModal(false)}
                      />
                    </View>
                    <ScrollView style={{ height: 150, width: "100%" }}>
                      <View
                        style={{
                          padding: 10,
                          width: "100%",
                          alignSelf: "center",
                          borderRadius: 7,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ width: "80%", alignSelf: "center" }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document 11 October 2022
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document 11 October 2022
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document 11 October 2022
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: 5,
                            }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.HistoryModalText}>
                                Document 11 October 2022
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <FAIcon
                                name="file-pdf"
                                size={20}
                                color={"black"}
                                style={{
                                  marginHorizontal: 5,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ScrollView>
                    <CustomButton
                      text="Download All"
                      textstyle={{ color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        width: "95%",
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {ManageStatusModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={ManageStatusModal}
                onRequestClose={() => {
                  setManageStatusModal(!ManageStatusModal);
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
                          fontSize: 16,
                          padding: 5,
                        }}
                      >
                        Manage Status
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
                        onPress={() => setManageStatusModal(false)}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        alignSelf: "center",
                        borderRadius: 7,
                        marginVertical: 5,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          backgroundColor: "#F3F7FE",
                          borderRadius: 7,
                          padding: 10,
                        }}
                        onPress={() => {
                          setManageStatusCancelled(!ManageStatusCancelled);
                          setManageStatusReschedule(!ManageStatusReschedule);
                        }}
                      >
                        <Text>
                          {ManageStatusCancelled ? "Cancelled" : "Reschedule"}
                        </Text>
                        <FAIcon name="chevron-down" size={20} color={"black"} />
                      </TouchableOpacity>
                      {ManageStatusCancelled ? (
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              backgroundColor: "#F3F7FE",
                              height: 100,
                              marginVertical: 10,
                              borderRadius: 7,
                            }}
                          >
                            <TextInput
                              placeholder="Reason of Cancellation"
                              placeholderTextColor={"gray"}
                              style={{
                                backgroundColor: "#F3F7FE",
                                alignSelf: "flex-start",
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              backgroundColor: "#F3F7FE",
                              borderRadius: 7,
                              padding: 10,
                              marginBottom: 10,
                            }}
                          >
                            <Text style={{ color: "gray" }}>Cancelled By</Text>
                            <FAIcon
                              name="chevron-down"
                              size={20}
                              color={"black"}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {ManageStatusReschedule ? (
                        <View>
                          <ScrollView
                            style={{ flexDirection: "row", height: 50 }}
                            horizontal={true}
                          >
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Monday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Tuesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Wednesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Thursday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Friday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bubble}>
                              <Text>Saturday</Text>
                            </TouchableOpacity>
                          </ScrollView>
                          <View
                            style={{
                              flexDirection: "column",
                              marginVertical: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <TouchableOpacity style={styles.bubble}>
                                <Text>08:00 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>08:30 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>09:00 AM</Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <TouchableOpacity style={styles.bubble}>
                                <Text>09:30 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>10:00 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>10:30 AM</Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <TouchableOpacity style={styles.bubble}>
                                <Text>11:00 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>11:30 AM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>12:00 PM</Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <TouchableOpacity style={styles.bubble}>
                                <Text>12:30 PM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>01:00 PM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.bubble}>
                                <Text>01:30 PM</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                    <CustomButton
                      text="Save"
                      textstyle={{ color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        width: "95%",
                        alignSelf: "center",
                      }}
                      onPress={() => setManageStatusModal(false)}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {ConsultationQuestionnaire ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={ConsultationQuestionnaire}
                onRequestClose={() => {
                  setConsultationQuestionnaire(!ConsultationQuestionnaire);
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
                          fontSize: 16,
                          padding: 5,
                        }}
                      >
                        Consultation Questionnaire
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
                        onPress={() => setConsultationQuestionnaire(false)}
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

            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setComplete(!Complete)}
            >
              <Text
                style={[
                  styles.label,
                  { width: "80%" },
                  Complete ? { color: "#2B8ADA" } : { color: "black" },
                ]}
              >
                Completed Consultations
              </Text>
              <FAIcon
                name={Complete ? "chevron-down" : "chevron-right"}
                size={20}
                style={[Complete ? { color: "#2B8ADA" } : { color: "black" }]}
              />
            </TouchableOpacity>
            {Complete ? (
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

                  <View>
                    {/*Card Design Completed Consultaions */}
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
                        <View>
                          <Text
                            style={[
                              styles.tag,
                              {
                                backgroundColor: "#4DB707",
                              },
                            ]}
                          >
                            Completed
                          </Text>
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
                        </View>
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
                              <Text style={styles.cardText}>
                                9:00 AM | Monday
                              </Text>
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
            ) : null}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setStatus(!Status)}
            >
              <Text
                style={[
                  styles.label,
                  { width: "80%" },
                  Status ? { color: "#2B8ADA" } : { color: "black" },
                ]}
              >
                Status
              </Text>
              <FAIcon
                name={Status ? "chevron-down" : "chevron-right"}
                size={20}
                style={[Status ? { color: "#2B8ADA" } : { color: "black" }]}
              />
            </TouchableOpacity>
            {Status ? (
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

                  <View>
                    {/*Card Design Completed Consultaions */}
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
                        <CustomButton
                          text="Manage Status"
                          textstyle={{ color: "#2B8ADA", fontSize: 10 }}
                          style={{
                            borderColor: "#2B8ADA",
                            borderWidth: 1,
                            backgroundColor: "white",
                            padding: 3,
                            marginHorizontal: 5,
                            paddingHorizontal: 7,
                            padding: 4,
                          }}
                          onPress={() => setManageStatusModal(true)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottomColor: "gray",
                          borderBottomWidth: 1,
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              styles.tag,
                              {
                                backgroundColor: "#2B8ADA",
                              },
                            ]}
                          >
                            Status
                          </Text>
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
                        </View>
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
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
                            <View
                              style={{ flexDirection: "column", width: "60%" }}
                            >
                              <Text style={styles.cardText}>
                                9:00 AM | Monday
                              </Text>
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
            ) : null}
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
    backgroundColor: "#e8f0fe",
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
    paddingTop: 10,
    paddingHorizontal: 5,
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
  tag: {
    color: "white",
    padding: 5,
    paddingVertical: 10,
    fontSize: 5,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  modalView: {
    position: "absolute",
    width: "90%",
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
  HistoryModalText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  bubbleHeading: {
    color: "black",
    padding: 5,
    width: "90%",
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#E8F0FE",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  bubbleHeadingActive: {
    color: "white",
    padding: 5,
    width: "90%",
  },
  bubbleActive: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#2B8ADA",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default DoctorHome;
