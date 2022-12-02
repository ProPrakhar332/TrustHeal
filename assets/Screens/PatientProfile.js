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
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
//icons
import patient from "../Resources/patient.png";
import invoice from "../Icons/invoice.png";
import notification from "../Icons/notification.png";
import appointment from "../Icons/appointment.png";
import help from "../Icons/help.png";
import about from "../Icons/about.png";
import family from "../Icons/family.png";
import history from "../Icons/history.png";
import editicon from "../Icons/edit.png";
import trash from "../Icons/delete.png";
import right from "../Icons/right.png";
import down from "../Icons/down.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
const dataInvoice = [
  { no: "0123", date: "11-11-2022", doc: "" },
  { no: "0124", date: "12-11-2022", doc: "" },
  { no: "0125", date: "13-11-2022", doc: "" },
  { no: "0126", date: "14-11-2022", doc: "" },
  { no: "0127", date: "15-11-2022", doc: "" },
];
const datahelp = [
  {
    question: "1. I Am Infected With Viral Fever. What To Do?",
    answer:
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived.",
  },
  {
    question: "2. I Am Infected With Viral Fever. What To Do?",
    answer:
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived.",
  },
  {
    question: "3. I Am Infected With Viral Fever. What To Do?",
    answer:
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived.",
  },
  {
    question: "4. I Am Infected With Viral Fever. What To Do?",
    answer:
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived.",
  },
];
const dataFamily = [
  {
    name: "Ramesh",
    relation: "Son",
    dob: "12-09-2001",
    gender: "Male",
    edit: "false",
    active: "false",
    mob: "+919456335783",
    otherdet: {
      BloodGroup: "AB+",
      Occupation: "Student",
      Height: "174",
      Weight: "75",
    },
  },
  {
    name: "Rami",
    relation: "Daughter",
    dob: "23-02-2003",
    gender: "Female",
    edit: "false",
    active: "false",
    mob: "+919456335783",
    otherdet: {
      BloodGroup: "AB+",
      Occupation: "Student",
      Height: "154",
      Weight: "55",
    },
  },
  {
    name: "Suresh",
    relation: "Father",
    dob: "12-09-1942",
    gender: "Male",
    edit: "false",
    active: "false",
    mob: "+919415024512",
    otherdet: {
      BloodGroup: "AB+",
      Occupation: "Retired",
      Height: "165",
      Weight: "75",
    },
  },
  {
    name: "Kamla",
    relation: "Mother",
    dob: "02-09-1945",
    gender: "Female",
    edit: "false",
    active: "false",
    mob: "+919745125875",
    otherdet: {
      BloodGroup: "O+",
      Occupation: "Homemaker",
      Height: "160",
      Weight: "80",
    },
  },
];
const ItemHelp = ({ question, answer }) => (
  <View>
    <TouchableOpacity
      style={[
        styles.WhiteLabel,
        {
          borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 0,
        },
      ]}
    >
      <Text
        style={[
          {
            fontWeight: "bold",
            fontSize: 14,
            color: "black",
          },
        ]}
      >
        {question}
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
        {answer}
      </Text>
    </View>
  </View>
);
const ItemInvoice = ({ no, date, doc }) => (
  <View
    style={{ backgroundColor: "#F3F7FE", borderRadius: 5, marginBottom: 15 }}
  >
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 10,
        justifyContent: "space-evenly",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Text>Invoice No. : </Text>
        <Text>Invoice Date :</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{no}</Text>
        <Text style={{ fontWeight: "bold" }}>{date}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <CustomButton
          text="Download"
          textstyle={{ fontSize: 12, color: "white" }}
          style={{
            backgroundColor: "#2B8ADA",
            borderRadius: 5,
            padding: 7,
            paddingHorizontal: 20,
            flex: 1,
            marginVertical: 5,
          }}
        />
        <CustomButton
          text="View"
          textstyle={{ fontSize: 12, color: "#2B8ADA" }}
          style={{
            borderColor: "#2B8ADA",
            borderRadius: 5,
            padding: 7,
            paddingHorizontal: 20,
            flex: 1,
            borderWidth: 1,
          }}
        />
      </View>
    </View>
  </View>
);
const ItemFamily = ({
  name,
  relation,
  dob,
  gender,
  edit,
  active,
  mob,
  otherdet,
}) => (
  <View>
    <View
      style={[
        {
          backgroundColor: "#F3F7FE",
          borderRadius: 5,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          marginTop: 10,
        },
        { borderWidth: 1.5, borderColor: "#2B8ADA" },
      ]}
    >
      <Text style={[{ flex: 0.6, fontWeight: "bold" }, { color: "#2B8ADA" }]}>
        {name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flex: 0.3,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Image style={{ height: 15, width: 15 }} source={editicon} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {}}>
          <Image style={{ height: 15, width: 15 }} source={trash} />
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Image
            style={{ height: 15, width: 15 }}
            source={active !== "true" ? right : down}
          />
        </TouchableOpacity>
      </View>
    </View>
    {/* Details */}
    {active === "true" ? (
      <View
        style={{
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: "#2B8ADA",
          flexDirection: "column",
          width: "100%",
          marginBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          top: -3,
        }}
      >
        {/* Relation */}
        <View
          style={{
            backgroundColor: "#D0E0FC",
            width: "95%",
            alignSelf: "center",
            marginVertical: 10,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#D0E0FC",
              borderRadius: 5,
              alignSelf: "center",
              width: "90%",
            }}
            placeholder="Relation"
            value={relation}
          />
        </View>
        {/* Date of Birth */}
        <View
          style={{
            backgroundColor: "#D0E0FC",
            width: "95%",
            alignSelf: "center",
            marginVertical: 10,
            padding: 5,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#D0E0FC",
              borderRadius: 5,
              alignSelf: "center",
              width: "80%",
            }}
            placeholder="Date Of Birth"
            value={dob}
          />
          <FAIcon
            name="calendar-alt"
            size={20}
            color={"gray"}
            style={{ alignSelf: "center" }}
          />
        </View>
        {/* Gender */}
        <View
          style={{
            backgroundColor: "#D0E0FC",
            width: "95%",
            alignSelf: "center",
            marginVertical: 10,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#D0E0FC",
              borderRadius: 5,
              alignSelf: "center",
              width: "90%",
            }}
            placeholder="Gender"
            value={gender}
          />
          {/* <SelectList
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
                        /> */}
        </View>
        {/* Mobile Number */}
        <View
          style={{
            backgroundColor: "#D0E0FC",
            width: "95%",
            alignSelf: "center",
            marginVertical: 10,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#D0E0FC",
              borderRadius: 5,
              alignSelf: "center",
              width: "90%",
            }}
            placeholder="Mobile No"
            value={mob}
          />
        </View>

        {/* Other Details */}
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              paddingHorizontal: 10,
            }}
          >
            Other Details:
          </Text>
          <View
            style={{
              flexDirection: "column",
              marginVertical: 10,
            }}
          >
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
                <TextInput
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                  placeholderTextColor={"black"}
                  value={otherdet.Gender}
                  keyboardType={"number-pad"}
                ></TextInput>
              </View>
              <View style={{ flex: 0.45 }}>
                <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                  Occupation
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                  placeholderTextColor={"black"}
                  value={otherdet.Occupation}
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
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                  placeholderTextColor={"black"}
                  value={otherdet.Height}
                  keyboardType={"number-pad"}
                ></TextInput>
              </View>
              <View style={{ flex: 0.45 }}>
                <Text style={styles.inputLabel}>Weight</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                  placeholderTextColor={"black"}
                  value={otherdet.Weight}
                  keyboardType={"number-pad"}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    ) : null}
  </View>
);
function PatientProfile({ navigation }) {
  const [HelpModal, setHelpModal] = useState(false);
  //other details
  const [OtherDetailsModal, setOtherDetailsModal] = useState(false);
  const [editOtherDetails, seteditOtherDetails] = useState(false);
  const [BloodGroup, setBloodGroup] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  //invoice modal
  const [invoiceModal, setinvoiceModal] = useState(false);
  //family modal
  const [familyModal, setfamilyModal] = useState(false);
  const [familyMembers, setfamilyMembers] = useState(dataFamily);
  const logout = () => {
    console.log("Logging out");
    navigation.navigate("Login/SignUp");
  };
  const renderInvoice = ({ item }) => (
    <ItemInvoice no={item.no} date={item.date} doc={item.doc} />
  );
  const renderHelp = ({ item }) => (
    <ItemHelp question={item.question} answer={item.answer} />
  );
  const renderFamily = ({ item }) => (
    <ItemFamily
      name={item.name}
      relation={item.relation}
      dob={item.dob}
      gender={item.gender}
      mob={item.mob}
      otherdet={item.otherdet}
      edit={item.edit}
      active={item.active}
    />
  );
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
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  setfamilyModal(true);
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Image source={family} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>Family</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  setOtherDetailsModal(true);
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Image source={history} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.whiteBoxRowText}>Other Details</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  setinvoiceModal(true);
                }}
              >
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
            {/*  Buttons */}
            <TouchableOpacity
              style={{
                borderColor: "#2B8ADA",
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 5,
                width: "90%",
                alignSelf: "center",
                flexDirection: "row",
                padding: 10,
                justifyContent: "center",
              }}
              onPress={() => {}}
            >
              <FAIcon name="user-edit" color={"#2B8ADA"} size={20} />
              <Text style={{ color: "#2B8ADA", marginLeft: 10 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
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
                        padding: 15,
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
                    <View
                      style={{
                        height: 300,
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <FlatList
                        data={datahelp}
                        renderItem={renderHelp}
                        keyExtractor={(item) => item.question}
                        scrollEnable={true}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Other Details Modal */}
            {OtherDetailsModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={OtherDetailsModal}
                onRequestClose={() => {
                  setOtherDetailsModal(!OtherDetailsModal);
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
                        height: 300,
                        padding: 10,
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
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          padding: 5,
                          color: "#2B8ADA",
                        }}
                      >
                        Other Details
                      </Text>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          position: "absolute",
                          right: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#2B8ADA",
                            fontSize: 14,
                            alignSelf: "center",
                            marginRight: 5,
                          }}
                          onPress={() => seteditOtherDetails(!editOtherDetails)}
                        >
                          Edit
                        </Text>
                        <FAIcon
                          name="window-close"
                          color="black"
                          size={26}
                          style={{ marginHorizontal: 5, alignSelf: "center" }}
                          onPress={() => setOtherDetailsModal(false)}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        alignSelf: "center",
                        backgroundColor: "white",
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignSelf: "center",
                          }}
                        >
                          <View style={{ flex: 0.45, marginRight: "5%" }}>
                            <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                              Blood Group
                            </Text>
                            {editOtherDetails ? (
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
                                    borderRadius: 5,
                                  },
                                ]}
                                dropdownStyles={{
                                  backgroundColor: "white",
                                  zIndex: 1,
                                }}
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
                                  editOtherDetails
                                    ? { backgroundColor: "#E8F0FE" }
                                    : null,
                                ]}
                                value={BloodGroup}
                                editable={editOtherDetails}
                              ></TextInput>
                            )}
                          </View>
                          <View style={{ flex: 0.45 }}>
                            <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                              Occupation
                            </Text>
                            <TextInput
                              style={[
                                styles.textInput,
                                editOtherDetails
                                  ? { backgroundColor: "#E8F0FE" }
                                  : { backgroundColor: "#d0e0fc" },
                              ]}
                              placeholderTextColor={"black"}
                              value={Occupation}
                              onChangeText={(text) => setOccupation(text)}
                              editable={editOtherDetails}
                            ></TextInput>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignSelf: "center",
                          }}
                        >
                          <View style={{ flex: 0.45, marginRight: "5%" }}>
                            <Text style={styles.inputLabel}>Height</Text>
                            <TextInput
                              editable={editOtherDetails}
                              style={[
                                styles.textInput,
                                editOtherDetails
                                  ? { backgroundColor: "#E8F0FE" }
                                  : { backgroundColor: "#d0e0fc" },
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
                              editable={editOtherDetails}
                              style={[
                                styles.textInput,
                                editOtherDetails
                                  ? { backgroundColor: "#E8F0FE" }
                                  : { backgroundColor: "#d0e0fc" },
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
                    {/* Buttons */}
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                      }}
                    >
                      <CustomButton
                        text={editOtherDetails ? "Update" : "Add"}
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          flex: 0.45,
                          backgroundColor: "#2B8ADA",
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          if (editOtherDetails) seteditOtherDetails(false);
                        }}
                      />

                      <CustomButton
                        text="Skip"
                        textstyle={{ color: "#2B8ADA", fontSize: 12 }}
                        style={{
                          flex: 0.45,
                          backgroundColor: "white",
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "#2B8ADA",
                        }}
                        onPress={() => setOtherDetailsModal(false)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {invoiceModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={invoiceModal}
                onRequestClose={() => {
                  setinvoiceModal(!invoiceModal);
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
                        padding: 20,
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
                        My Invoices
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
                        onPress={() => setinvoiceModal(false)}
                      />
                    </View>
                    <View
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <FlatList
                        data={dataInvoice}
                        keyExtractor={(item) => item.no}
                        renderItem={renderInvoice}
                        scrollEnabled={true}
                        style={{ height: 300 }}
                        bounces={false}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {familyModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={familyModal}
                onRequestClose={() => {
                  setfamilyModal(!familyModal);
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
                        padding: 15,
                        height: 400,
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
                        Family Members
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
                        onPress={() => setfamilyModal(false)}
                      />
                    </View>
                    <View style={{ height: 270 }}>
                      <FlatList
                        data={familyMembers}
                        keyExtractor={(item) => item.relation}
                        renderItem={renderFamily}
                        scrollEnabled={true}
                      />
                    </View>

                    {/* Buttons */}
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignSelf: "center",
                        width: "100%",
                        marginVertical: 10,
                      }}
                    >
                      <CustomButton
                        text={"+Add More"}
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          backgroundColor: "#2B8ADA",
                          flex: 0.45,
                          borderRadius: 5,
                          padding: 10,
                        }}
                      />
                      <CustomButton
                        text={"Skip"}
                        textstyle={{
                          color: "#2B8ADA",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        style={{
                          borderWidth: 2,
                          borderColor: "#2B8ADA",
                          flex: 0.45,
                          borderRadius: 5,
                          padding: 10,
                        }}
                        onPress={() => setfamilyModal(false)}
                      />
                    </View>
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

  textInput: {
    padding: 5,
    backgroundColor: "#E8F0FE",
    borderRadius: 5,
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
});
export default PatientProfile;
