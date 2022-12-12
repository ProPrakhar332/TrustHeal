import React, { useState, useRef } from "react";
import {
  Text,
  Alert,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

//icons
import doctor from "../Resources/doctor.png";
import upload from "../Resources/upload.png";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import dayjs from "dayjs";
import axios from "axios";

const dataTitle = [
  { key: "Dr.", value: "Dr." },
  { key: "Mr.", value: "Mr." },
  { key: "Mrs.", value: "Mrs." },
  { key: "Ms.", value: "Ms." },
];
const dataGender = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
  { key: "Other", value: "Other" },
];
const clearKeys = async () => {
  await AsyncStorage.removeItem("dob");
  await AsyncStorage.removeItem("age");
};

const DoctorRegistration2 = ({ navigation }) => {
  //Calendar View
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateFromModal, setselectedDateFromModal] =
    useState("YYYY-MM-DD");

  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    await AsyncStorage.setItem("dob", JSON.stringify(date).substring(1, 11));
    setdob(JSON.stringify(date).substring(1, 11));
    calculateAge();
    hideDatePicker();
  };
  const calculateAge = async () => {
    let tmep = await AsyncStorage.getItem("dob");
    var year = Number(tmep.substring(0, 4));
    var month = Number(tmep.substring(5, 7)) - 1;
    var day = Number(tmep.substring(8));
    var today = new Date();
    let x = today.getFullYear() - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      x = x - 1;
    }
    await AsyncStorage.setItem("age", x + "");
    setAge(x);
  };

  useEffect(() => {
    const setDate = async () => {
      setdob(await AsyncStorage.getItem("dob"));
    };

    setDate();
  }, [dob]);
  useEffect(() => {
    const settingAge = async () => {
      setAge(await AsyncStorage.getItem("age"));
    };
    settingAge();
  }, [age]);

  //General Information Field
  const [showGenInfo, setShowGenInfo] = useState(false);
  const [GenInfoEdit, setGenInfoEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setdob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  //Medical Registration Feild
  const [showMedReg, setShowMedReg] = useState(false);
  const [medReg, setmedReg] = useState([]);
  const [RegNo, setRegNo] = useState("");
  const [RegCouncil, setRegCouncil] = useState("");
  const [RegCert, setRegCert] = useState("");
  const [RegYear, setRegYear] = useState("");
  //Educational Details Field
  const [showEduDet, setShowEduDet] = useState(false);
  const [Education, setEducation] = useState([]);
  const [Degree, setDegree] = useState("");
  const [DegreePassingYear, setDegreePassingYear] = useState("");
  const [Specialization, setSpecialization] = useState("");
  const [University, setUniversity] = useState("");
  const [TotalYear, setTotalYear] = useState("");
  const [TotalMonths, setTotalMonths] = useState("");
  //Identification
  const [showIdenDet, setShowIdenDet] = useState(false);
  const [Aadhar, setAadhar] = useState("");
  const [IdentificationDocs, setIdentificationDocs] = useState([]);
  const [identificationNumber, setidentificationNumber] = useState("");
  const [identificationType, setidentificationType] = useState("");
  //Additional Information
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [ClinicDet, setClinicDet] = useState([]);
  const [ClinicName, setClinicName] = useState("");
  const [ClinicAddress, setClinicAddress] = useState("");
  const [consultView, setconsultView] = useState(false);
  const [pmodal, setpmodal] = useState(false);
  const [emodal, setemodal] = useState(false);
  //General Configuration
  const [showGenConfig, setShowGenConfig] = useState(false);
  const [showMobNo, setshowMobNo] = useState("");
  const [EconsultMode, setEconsultMode] = useState([]);
  const [showFollowUp, setshowFollowUp] = useState("");
  const [questionare, setQuestionare] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [consultationQuestion, setConsultationQuestion] = useState("");
  const [questionareList, updateQuestionareList] = useState([]);
  //PreConsultation Questionnaire
  const [showPreConsultationQuestionaire, setShowPreConsultationQuestionaire] =
    useState(false);
  const [showPreConsulQues, setShowPreConsulQues] = useState(false);
  //consultation fees
  const [showConsultFees, setShowConsultFees] = useState(false);
  const [physicalConsulationFees, setphysicalConsulationFees] = useState(0);
  const [eConsulationFees, seteConsulationFees] = useState(0);
  const [followUpFees, setfollowUpFees] = useState(0);
  const [DigitalSign, setDigitalSign] = useState("");

  const dataFollowUp = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
    { key: "7", value: "7" },
  ];
  const dataShowMobNo = [
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];
  const dataShowQues = [
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];
  const dataMode = [
    { key: "videocall", value: "Video" },
    { key: "phonecall", value: "Phone" },
  ];

  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem("UserDoctorProfile"));

      setTitle(x.title);
      setName(x.doctorName);
      setEmail(x.email);
      setGender(x.gender);
      setCity(x.city);
      setdob(x.dob);
      setAge(x.age + "");
    };
    onLoadSetData();
  }, []);

  const ViewIdentifications = () => {
    return IdentificationDocs.map((IdentificationDocs, index) => {
      return (
        <View
          style={{
            flexDirection: "column",
            width: "95%",
            alignSelf: "center",
          }}
          key={index}
        >
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                {IdentificationDocs.identificationType}
              </Text>
              <Text style={[styles.textInput, { backgroundColor: "#d0e0fc" }]}>
                {IdentificationDocs.identificationNumber}
                {".pdf"}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
          >
            <CustomButton
              text="Delete"
              textstyle={{ color: "white", fontSize: 12 }}
              style={{
                backgroundColor: "red",
                borderRadius: 5,
                padding: 6,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                removeIdenHandler(IdentificationDocs.identificationType);
              }}
            />
          </View>
        </View>
      );
    });
  };

  const removeIdenHandler = (e) => {
    setIdentificationDocs(
      IdentificationDocs.filter((obj) => obj.identificationType !== e)
    );
  };

  const ViewEducation = () => {
    return Education.map((Education, index) => {
      return (
        <View
          style={{ width: "95%", alignSelf: "center", marginVertical: 10 }}
          key={index}
        >
          <View
            style={{
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.45, marginRight: "5%" }}>
                <Text style={styles.inputLabel}>Degree</Text>
                <Text
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                >
                  {Education.degree}
                </Text>
              </View>
              <View style={{ flex: 0.45 }}>
                <Text style={styles.inputLabel}>Degree Passing Year</Text>
                <Text
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                >
                  {Education.passingYear}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.45, marginRight: "5%" }}>
                <Text style={styles.inputLabel}>Specialization</Text>
                <Text
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                >
                  {Education.specialization}
                </Text>
              </View>
              <View style={{ flex: 0.45 }}>
                <Text style={styles.inputLabel}>University</Text>
                <Text
                  style={[styles.textInput, { backgroundColor: "#E8F0FE" }]}
                >
                  {Education.university}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.45, flexDirection: "column" }}>
              <Text style={styles.inputLabel}>Total Experience(Year)</Text>
              <Text style={styles.textInput}>
                {Math.floor(parseInt(Education.totalExperiencedInMonths) / 12)}
              </Text>
            </View>
            <View style={{ flex: 0.45, flexDirection: "column" }}>
              <Text style={styles.inputLabel}>Total Experience(Month)</Text>
              <Text style={styles.textInput}>
                {parseInt(Education.totalExperiencedInMonths) % 12}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <CustomButton
              text="Delete"
              textstyle={{ color: "white", fontSize: 12 }}
              style={{
                backgroundColor: "red",
                borderRadius: 5,
                padding: 6,
                paddingHorizontal: 10,
                position: "absolute",
                right: 0,
              }}
              onPress={() => {
                removeEduHandler(Education.degree);
              }}
            />
          </View>
        </View>
      );
    });
  };

  const removeEduHandler = (e) => {
    setEducation(Education.filter((obj) => obj.degree !== e));
  };

  const RenderQuestion = () => {
    return questionareList.map((questionareList, index) => {
      return (
        <View style={styles.bubble} key={index}>
          <Text style={[styles.bubbleHeading, { fontWeight: "bold" }]}>
            {questionareList.questions}
          </Text>
          <FAIcon
            name="trash"
            color={"#2B8ADA"}
            size={20}
            style={{ alignSelf: "center" }}
            onPress={() => {
              // console.log(questionareList.ques);
              removeHandler(questionareList.questions);
            }}
          />
        </View>
      );
    });
  };
  const removeHandler = (e) => {
    updateQuestionareList(questionareList.filter((obj) => obj.questions !== e));
  };

  const ViewClinics = () => {
    return ClinicDet.map((ClinicDet, index) => {
      return (
        <View style={{ width: "95%", alignSelf: "center" }} key={index}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.inputLabel}>Clinic Name</Text>
            <Text style={styles.textInput}>{ClinicDet.clinicName}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.inputLabel}>Clinic Address</Text>
            <Text
              style={styles.textInput}
              onChangeText={(text) => setClinicAddress(text)}
            >
              {ClinicDet.clinicAddress}
            </Text>
          </View>
          <CustomButton
            text="Delete"
            textstyle={{ color: "white", fontSize: 12 }}
            style={{
              backgroundColor: "red",
              alignSelf: "flex-end",
              borderRadius: 5,
              padding: 6,
              paddingHorizontal: 10,
              margin: 5,
            }}
            onPress={() => {
              removeClinicHandler(ClinicDet.clinicName);
            }}
          />
        </View>
      );
    });
  };

  const removeClinicHandler = (e) => {
    setClinicDet(ClinicDet.filter((obj) => obj.clinicName !== e));
  };

  const PostData = async () => {
    let p = JSON.parse(await AsyncStorage.getItem("UserDoctorProfile"));
    // console.log("From Cache");
    // console.log(p);
    let pt = {
      identificationNumber: Aadhar,
      identificationType: "Aadhar",
      identificationPath: "aws/s3/Docs/" + Aadhar + ".pdf",
    };

    IdentificationDocs.push(pt);
    let lang = [];
    let cacheLang = JSON.parse(
      await AsyncStorage.getItem(p.doctorId + "language")
    );
    cacheLang.forEach((index) => {
      let t = {
        language: index,
      };
      lang.push(t);
    });
    //console.log(lang);

    let medtemp = {
      certificatePath: RegCert,
      registrationCouncil: RegCouncil,
      registrationNo: RegNo,
      registrationYear: Number(RegYear),
    };

    medReg.push(medtemp);
    //console.log(medReg);

    let x = {
      age: Number(age),
      city: city,
      countryCode: await AsyncStorage.getItem("countryCode"),
      countryName: p.countryName,
      createdOn:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      digialSignature: "aws/s3/digitalSign" + name,
      dob: dob,
      // doctorClinicDetailsDTOs: [
      //   {
      //     clinicAddress: "string",
      //     clinicId: 0,
      //     clinicName: "string",
      //     consultationDate: "2022-11-13",
      //     consultationEndTime: "10:00",
      //     consultationStartTime: "10:00",
      //     slotDuration: 0,
      //     specialInstruction: "string",
      //   },
      // ],
      doctorConfigurationDTO: {
        contactVisibility: showMobNo,
        // doctorConfigurationPkId: 0,
        followUpDuration: showFollowUp,
      },
      // doctorEConsultationDTOs: [
      //   {
      //     consultationDate: "2022-11-13",
      //     consultationEndTime: "23:00",
      //     consultationStartTime: "24:00",
      //     gap: 0,
      //     slotDuration: 0,
      //     typeOfEConsultation: "phonecall",
      //   },
      // ],
      doctorEducationsDTOs: Education,
      doctorFeesDTO: {
        // doctorConsulationFeesPkId: 0,
        eConsulationFees: Number(eConsulationFees),
        followUpFees: Number(followUpFees),
        physicalConsulationFees: Number(physicalConsulationFees),
      },
      doctorId: p.doctorId,
      doctorIdentificationDTOs: IdentificationDocs,
      doctorLanguageDTOs: lang,
      doctorMedicalRegistrationDTOs: medReg,
      doctorName: name,
      email: email,
      gender: gender,
      locationPermissions: "whileusing",
      mobileNumber: p.mobileNumber,
      phoneIp: "string",
      pinCode: p.pincode,
      preConsultationQuestionDTOs: [
        {
          questions: "string",
          speciality: "string",
        },
      ],
      profilePhotoPath: "aws/s3/profilepic",
      termsAndConditions: Boolean(p.termsAndCondition),
      title: title,
      whatsAppNumber: p.mobileNumber,
    };
    console.log(x);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#e8f0fe",
          width: "100%",
          marginTop: 30,
        }}
      >
        <ScrollView
          style={{
            width: "90%",
            marginTop: 10,
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Completion Bar */}
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
                  width: "66%",
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "#2b8ada",
                }}
              ></View>
            </View>
            {/* Doctor Image */}
            <View
              style={{
                backgroundColor: "white",
                width: 100,
                height: 100,
                borderRadius: 150,
                alignSelf: "center",
                marginVertical: 20,
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

          <View style={{}}>
            {/* General Info Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
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
                        Alert.alert(
                          "You can now edit General Information Field"
                        );
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
            {/* General Info Body*/}
            {showGenInfo ? (
              <View>
                <View style={styles.whiteBodyView}>
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
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <Image
                            source={upload}
                            style={{ marginRight: "5%" }}
                          ></Image>
                          <Text style={{ fontSize: 12 }}>Upload Image</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flex: 0.45, marginRight: "5%" }}>
                        <Text style={styles.inputLabel}>Title</Text>
                        {GenInfoEdit ? (
                          <SelectList
                            defaultOption={"Mr."}
                            placeholder={title}
                            setSelected={(val) => setTitle(val)}
                            data={dataTitle}
                            save="value"
                            boxStyles={{
                              backgroundColor: "#E8F0FE",
                              borderWidth: 0,
                            }}
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
                          keyboardType={"email-address"}
                          onChangeText={(text) => setEmail(text)}
                          value={email}
                          editable={GenInfoEdit}
                        ></TextInput>
                      </View>
                      <View style={{ flex: 0.45 }}>
                        <Text style={styles.inputLabel}>Gender</Text>
                        {GenInfoEdit ? (
                          <SelectList
                            labelStyles={{ height: 0 }}
                            placeholder={gender}
                            setSelected={(val) => setGender(val)}
                            data={dataGender}
                            save="value"
                            boxStyles={{
                              backgroundColor: "#E8F0FE",
                              borderWidth: 0,
                            }}
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
                              GenInfoEdit
                                ? { backgroundColor: "#E8F0FE" }
                                : null,
                            ]}
                            placeholderTextColor={"black"}
                            value={gender}
                            editable={false}
                          />
                        )}
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flex: 0.45, marginRight: "5%" }}>
                        <Text style={styles.inputLabel}>Speciality</Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#d0e0fc" },
                            GenInfoEdit ? { backgroundColor: "#E8F0FE" } : null,
                          ]}
                          placeholderTextColor={"black"}
                          placeholder={"Heart"}
                          editable={GenInfoEdit}
                        ></TextInput>
                      </View>
                      <View style={{ flex: 0.45 }}>
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
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flex: 0.45, marginRight: "5%" }}>
                        <Text style={styles.inputLabel}>Date Of Birth</Text>
                        <View>
                          <Text
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE", padding: 10 },
                            ]}
                          >
                            {dob}
                          </Text>
                          <FAIcon
                            name="calendar-alt"
                            color={"gray"}
                            size={16}
                            style={{
                              position: "absolute",
                              right: 0,
                              bottom: 0,
                              margin: "5%",
                              alignSelf: "center",
                            }}
                            onPress={GenInfoEdit ? showDatePicker : null}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 0.45 }}>
                        <Text style={styles.inputLabel}>Age</Text>
                        <Text
                          style={[
                            styles.textInput,
                            { backgroundColor: "#E8F0FE", padding: 10 },
                          ]}
                        >
                          {age}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "95%",
                        alignSelf: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          marginVertical: 5,
                          width: "95%",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={[styles.textInput, { flex: 0.95 }]}>
                          <Text style={[styles.label]}>
                            Upload Digital Signature
                          </Text>
                        </View>
                        <CustomButton
                          text="Browse"
                          textstyle={{ color: "white" }}
                          style={{
                            alignSelf: "center",
                            backgroundColor: "#2B8ADA",
                            borderRadius: 5,
                            padding: 10,
                          }}
                          onPress={() => {}}
                        />
                      </View>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          width: "95%",
                          height: 60,
                          backgroundColor: "#E8F0FE",
                          marginVertical: 5,
                          borderRadius: 5,
                        }}
                      ></View>
                    </View>
                    {GenInfoEdit ? (
                      <CustomButton
                        text="Update"
                        textstyle={{ color: "white", alignSelf: "center" }}
                        onPress={() => {
                          Alert.alert(
                            "All changes made in Genreal Information have been updated"
                          );
                          clearKeys();
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
            {/* Medical Registration Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
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
                    Medical Registration
                  </Text>
                  <FAIcon
                    name={showMedReg ? "chevron-down" : "chevron-right"}
                    color={showMedReg ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Medical Registration Body*/}
            {showMedReg ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View style={{ flexDirection: "column", marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flex: 0.45, marginRight: "5%" }}>
                        <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                          Registration Number
                        </Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#E8F0FE" },
                          ]}
                          placeholderTextColor={"black"}
                          onChangeText={(text) => setRegNo(text)}
                          value={RegNo}
                        ></TextInput>
                      </View>
                      <View style={{ flex: 0.45 }}>
                        <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                          Registration Council
                        </Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#E8F0FE" },
                          ]}
                          placeholderTextColor={"black"}
                          onChangeText={(text) => setRegCouncil(text)}
                          value={RegCouncil}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flex: 0.45, marginRight: "5%" }}>
                        <Text style={styles.inputLabel}>Reg. Certificate</Text>
                        <View>
                          <TextInput
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE" },
                            ]}
                            placeholderTextColor={"black"}
                            value={RegCert}
                            editable={false}
                          ></TextInput>
                          <FAIcon
                            name="upload"
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
                              setRegCert("Rohan_cert.pdf");
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ flex: 0.45 }}>
                        <Text style={styles.inputLabel}>Reg. Year</Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            { backgroundColor: "#E8F0FE" },
                          ]}
                          placeholderTextColor={"black"}
                          keyboardType={"number-pad"}
                          maxLength={4}
                          onChangeText={(text) => setRegYear(text)}
                          value={RegYear}
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {/* Education Qualifications & Certificates Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,

                  showEduDet
                    ? {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        marginBottom: 0,
                      }
                    : null,
                ]}
              >
                <TouchableOpacity
                  style={[
                    { flexDirection: "row", width: "100%" },
                    showEduDet
                      ? { borderBottomWidth: 0.5, borderBottomColor: "#707070" }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showEduDet) {
                      setShowEduDet(!showEduDet);
                    } else {
                      setShowEduDet(!showEduDet);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showEduDet ? { color: "#2B8ADA" } : null,
                    ]}
                  >
                    Educational Qualifications & Certificates
                  </Text>
                  <FAIcon
                    name={showEduDet ? "chevron-down" : "chevron-right"}
                    color={showEduDet ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Education Qualifications & Certificates Body*/}
            {showEduDet ? (
              <View>
                <View style={styles.whiteBodyView}>
                  {Education !== "" ? <ViewEducation /> : null}
                  <View
                    style={{
                      width: "95%",
                      alignSelf: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 0.45, marginRight: "5%" }}>
                          <Text style={styles.inputLabel}>Degree</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE" },
                            ]}
                            onChangeText={(text) => setDegree(text)}
                            value={Degree}
                          ></TextInput>
                        </View>
                        <View style={{ flex: 0.45 }}>
                          <Text style={styles.inputLabel}>
                            Degree Passing Year
                          </Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE" },
                            ]}
                            onChangeText={(text) => setDegreePassingYear(text)}
                            value={DegreePassingYear}
                            keyboardType={"numeric"}
                          ></TextInput>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 0.45, marginRight: "5%" }}>
                          <Text style={styles.inputLabel}>Specialization</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE" },
                            ]}
                            onChangeText={(text) => setSpecialization(text)}
                            value={Specialization}
                          ></TextInput>
                        </View>
                        <View style={{ flex: 0.45 }}>
                          <Text style={styles.inputLabel}>University</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              { backgroundColor: "#E8F0FE" },
                            ]}
                            onChangeText={(text) => setUniversity(text)}
                            value={University}
                          ></TextInput>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 0.45, flexDirection: "column" }}>
                        <Text style={styles.inputLabel}>
                          Total Experience(Year)
                        </Text>
                        <TextInput
                          keyboardType={"number-pad"}
                          maxLength={2}
                          placeholder={"00"}
                          style={styles.textInput}
                          onChangeText={(text) => setTotalYear(text)}
                          value={TotalYear}
                        />
                      </View>
                      <View style={{ flex: 0.45, flexDirection: "column" }}>
                        <Text style={styles.inputLabel}>
                          Total Experience(Month)
                        </Text>
                        <TextInput
                          keyboardType={"number-pad"}
                          maxLength={2}
                          placeholder={"00"}
                          style={styles.textInput}
                          onChangeText={(text) => setTotalMonths(text)}
                          value={TotalMonths}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                      <CustomButton
                        text="Upload Document"
                        textstyle={{ color: "#2b8ada", fontSize: 12 }}
                        style={{
                          backgroundColor: "white",
                          borderRadius: 12,
                          padding: 6,
                          paddingHorizontal: 10,
                          borderWidth: 2,
                          borderColor: "#2b8ada",
                        }}
                      />
                      <CustomButton
                        text="+ Add More"
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          backgroundColor: "#2b8ada",
                          borderRadius: 5,
                          padding: 6,
                          paddingHorizontal: 10,
                          position: "absolute",
                          right: 0,
                        }}
                        onPress={() => {
                          if (
                            Degree == "" ||
                            DegreePassingYear == "" ||
                            University == "" ||
                            TotalYear == "" ||
                            TotalMonths == "" ||
                            Specialization == ""
                          )
                            Alert.alert(
                              "Please fill all details before adding more in Educational Qualification"
                            );
                          else {
                            let totalexp =
                              parseInt(TotalYear) * 12 + parseInt(TotalMonths);
                            let p = {
                              degree: Degree,
                              degreePath: Degree + ".pdf",
                              passingYear: Number(DegreePassingYear),
                              specialization: Specialization,
                              totalExperiencedInMonths: Number(totalexp),
                              university: University,
                            };
                            Education.push(p);
                            console.log(Education);
                            setDegree("");
                            setDegreePassingYear("");
                            setSpecialization("");
                            setTotalMonths("");
                            setTotalYear("");
                            setUniversity("");
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {/* Identification Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
                  showIdenDet
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
                    showIdenDet
                      ? { borderBottomWidth: 0.5, borderBottomColor: "#707070" }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showIdenDet) {
                      setShowIdenDet(!showIdenDet);
                    } else {
                      setShowIdenDet(!showIdenDet);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showIdenDet ? { color: "#2B8ADA" } : null,
                    ]}
                  >
                    Identification
                  </Text>
                  <FAIcon
                    name={showIdenDet ? "chevron-down" : "chevron-right"}
                    color={showIdenDet ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Identification Body*/}
            {showIdenDet ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View style={{ flexDirection: "column", flex: 1 }}>
                        <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                          Aadhar Number
                        </Text>
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            keyboardType={"number-pad"}
                            maxLength={12}
                            onChangeText={(text) => setAadhar(text)}
                            value={Aadhar}
                          />
                          <FAIcon
                            name="file-pdf"
                            color={"black"}
                            size={20}
                            style={{
                              position: "absolute",
                              right: 0,
                              bottom: 0,
                              marginRight: "3%",
                              marginBottom: "2%",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  {IdentificationDocs != "" ? <ViewIdentifications /> : null}

                  <View
                    style={{
                      flexDirection: "column",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "column", flex: 0.45 }}>
                        <Text style={styles.inputLabel}>
                          Any Other Document
                        </Text>
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            onChangeText={(text) => setidentificationType(text)}
                            value={identificationType}
                          />
                        </View>
                      </View>
                      <View style={{ flexDirection: "column", flex: 0.45 }}>
                        <Text style={styles.inputLabel}>Identification No</Text>
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            onChangeText={(text) =>
                              setidentificationNumber(text)
                            }
                            value={identificationNumber}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <CustomButton
                      text="Upload Document"
                      textstyle={{ color: "#2b8ada", fontSize: 12 }}
                      style={{
                        backgroundColor: "white",
                        borderRadius: 12,
                        padding: 6,
                        paddingHorizontal: 10,
                        borderWidth: 2,
                        borderColor: "#2b8ada",
                      }}
                    />
                    <CustomButton
                      text="+Add More"
                      textstyle={{ color: "white", fontSize: 12 }}
                      style={{
                        backgroundColor: "#2b8ada",
                        borderRadius: 5,
                        padding: 6,
                        paddingHorizontal: 10,
                        position: "absolute",
                        right: 0,
                      }}
                      onPress={() => {
                        if (identificationNumber != "") {
                          let p = {
                            identificationNumber: identificationNumber,

                            identificationType: identificationType,
                            identificationPath:
                              "aws/s3/Docs/" + identificationNumber + ".pdf",
                          };
                          IdentificationDocs.push(p);
                          setidentificationNumber("");
                          setidentificationType("");
                          console.log(IdentificationDocs);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            {/* Additional Information Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
                  showAddInfo
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
                    showAddInfo
                      ? { borderBottomWidth: 0.5, borderBottomColor: "#707070" }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showAddInfo) {
                      setShowAddInfo(!showAddInfo);
                    } else {
                      setShowAddInfo(!showAddInfo);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showAddInfo ? { color: "#2B8ADA" } : null,
                    ]}
                  >
                    Additional Information
                  </Text>
                  <FAIcon
                    name={showAddInfo ? "chevron-down" : "chevron-right"}
                    color={showAddInfo ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Additional Information Body*/}
            {showAddInfo ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View style={{ flexDirection: "column", marginBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <CustomButton
                        text="My Clinic Details"
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          backgroundColor: "#2b8ada",
                          borderRadius: 5,
                          padding: 10,
                          marginRight: "5%",
                          flex: 0.45,
                          paddingHorizontal: 10,
                        }}
                      />
                      <CustomButton
                        text="Consultation Duration"
                        textstyle={{ color: "#2b8ada", fontSize: 12 }}
                        style={{
                          backgroundColor: "white",
                          borderRadius: 5,
                          padding: 10,
                          flex: 0.45,
                          paddingHorizontal: 10,
                          borderWidth: 2,
                          borderColor: "#2b8ada",
                        }}
                        onPress={() => setconsultView(true)}
                      />
                    </View>
                    {ClinicDet != "" ? <ViewClinics /> : null}
                    {/* Add Clinic */}
                    <View style={{ width: "95%", alignSelf: "center" }}>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.inputLabel}>Clinic Name</Text>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => setClinicName(text)}
                        />
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.inputLabel}>Clinic Address</Text>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => setClinicAddress(text)}
                        />
                      </View>
                    </View>
                    <CustomButton
                      text="+Add More"
                      textstyle={{ color: "white", fontSize: 12 }}
                      style={{
                        backgroundColor: "#2b8ada",
                        alignSelf: "flex-end",
                        borderRadius: 5,
                        padding: 6,
                        paddingHorizontal: 10,
                        margin: 5,
                      }}
                      onPress={() => {
                        if (ClinicAddress == "" || ClinicName == "")
                          Alert.alert(
                            "Please fill Clinic Name and Address before adding other."
                          );
                        else {
                          let p = {
                            clinicName: ClinicName,
                            clinicAddress: ClinicAddress,
                          };
                          ClinicDet.push(p);
                          console.log(ClinicDet);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            {consultView ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={consultView}
                onRequestClose={() => {
                  setconsultView(!consultView);
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
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Consultation Duration
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => {
                          setconsultView(false);
                        }}
                      />
                    </View>
                    <CustomButton
                      text="P-Consultation"
                      textstyle={{ color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        width: "95%",
                        marginBottom: 10,
                      }}
                      onPress={() => {
                        setconsultView(false);
                        setpmodal(true);
                      }}
                    />
                    <Text>or</Text>
                    <CustomButton
                      text="E-Consultation"
                      textstyle={{ color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        width: "95%",
                        marginTop: 10,
                      }}
                      onPress={() => {
                        setconsultView(false);
                        setemodal(true);
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {pmodal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={pmodal}
                onRequestClose={() => {
                  setpmodal(!pmodal);
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
                        height: 460,
                        flexDirection: "column",
                        borderTopRightRadius: 34,
                        borderTopLeftRadius: 34,
                        bottom: 0,
                        width: "100%",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        P-Consultation
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => {
                          setpmodal(false);
                        }}
                      />
                    </View>
                    <Text
                      style={{ fontSize: 16, fontWeight: "bold", padding: 5 }}
                    >
                      {ClinicName}
                    </Text>
                    <Text style={{ padding: 5 }}>{ClinicAddress}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <ScrollView horizontal={true}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginBottom: 10,
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Mon</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Tues</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Wed</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Thur</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Fri</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Sat</Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>

                      <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <View
                          style={{
                            flexDirection: "column",
                            flex: 0.5,
                            marginRight: "5%",
                          }}
                        >
                          <Text
                            style={[styles.label, { alignSelf: "flex-start" }]}
                          >
                            In Time
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              placeholder="HH"
                              maxLength={2}
                              keyboardType={"number-pad"}
                              style={[
                                styles.textInput,
                                { marginRight: "5%", textAlign: "center" },
                              ]}
                            />
                            <TextInput
                              placeholder="MM"
                              maxLength={2}
                              keyboardType={"number-pad"}
                              style={[
                                styles.textInput,
                                { textAlign: "center" },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={{ flexDirection: "column", flex: 0.5 }}>
                          <Text
                            style={[styles.label, { alignSelf: "flex-start" }]}
                          >
                            Out Time
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              placeholder="HH"
                              maxLength={2}
                              keyboardType={"number-pad"}
                              style={[
                                styles.textInput,
                                { marginRight: "5%", textAlign: "center" },
                              ]}
                            />
                            <TextInput
                              placeholder="MM"
                              maxLength={2}
                              keyboardType={"number-pad"}
                              style={[
                                styles.textInput,
                                { textAlign: "center" },
                              ]}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "column", width: "100%" }}>
                        <Text
                          style={[styles.label, { alignSelf: "flex-start" }]}
                        >
                          Duration
                        </Text>
                        <TextInput style={styles.textInput} />
                      </View>
                      <CustomButton
                        text="Save"
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          backgroundColor: "#2B8ADA",
                          borderRadius: 10,
                          marginTop: 20,
                        }}
                        onPress={() => {
                          setpmodal(false);
                          // navigation.navigate("P-Consultation", {
                          //   ClinicName: ClinicName,
                          //   ClinicAddress: ClinicAddress,
                          // });
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            ) : null}
            {emodal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={emodal}
                onRequestClose={() => {
                  setemodal(!emodal);
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
                        height: 475,
                        flexDirection: "column",
                        borderTopRightRadius: 34,
                        borderTopLeftRadius: 34,
                        bottom: 0,
                        width: "100%",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        E-Consultation
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => {
                          setemodal(false);
                        }}
                      />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                      <ScrollView horizontal={true}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Mon</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Tues</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Wed</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Thur</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Fri</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.bubble,
                              {
                                width: 60,
                                justifyContent: "center",
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.bubbleHeading}>Sat</Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                      <View
                        style={{
                          width: "100%",
                          alignSelf: "center",
                          marginTop: 5,
                        }}
                      >
                        <Text style={[styles.inputLabel]}>
                          Consultation Mode
                        </Text>
                        <SelectList
                          labelStyles={{ height: 0 }}
                          setSelected={(val) => setEconsultMode(val)}
                          data={dataMode}
                          save="value"
                          boxStyles={{
                            backgroundColor: "#E8F0FE",
                            borderWidth: 0,
                          }}
                          dropdownStyles={{ backgroundColor: "white" }}
                          dropdownTextStyles={{
                            color: "#2b8ada",
                            fontWeight: "bold",
                          }}
                          badgeStyles={{ backgroundColor: "#2b8ada" }}
                        />
                      </View>
                      <View style={{ flexDirection: "column", width: "100%" }}>
                        <Text
                          style={[
                            styles.inputLabel,
                            { alignSelf: "flex-start" },
                          ]}
                        >
                          Date
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextInput
                            style={[
                              styles.textInput,
                              { flex: 0.25, textAlign: "center" },
                            ]}
                            placeholder="DD"
                            maxLength={2}
                            keyboardType={"number-pad"}
                          />
                          <TextInput
                            style={[
                              styles.textInput,
                              { flex: 0.25, textAlign: "center" },
                            ]}
                            placeholder="MM"
                            maxLength={2}
                            keyboardType={"number-pad"}
                          />
                          <TextInput
                            style={[
                              styles.textInput,
                              { flex: 0.25, textAlign: "center" },
                            ]}
                            placeholder="YYYY"
                            maxLength={4}
                            keyboardType={"number-pad"}
                          />
                        </View>
                      </View>

                      <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              flexDirection: "column",
                              flex: 0.5,
                              marginRight: "5%",
                            }}
                          >
                            <Text
                              style={[
                                styles.inputLabel,
                                { alignSelf: "flex-start" },
                              ]}
                            >
                              Start Time
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={"number-pad"}
                                style={[
                                  styles.textInput,
                                  { textAlign: "center" },
                                ]}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={"number-pad"}
                                style={[
                                  styles.textInput,
                                  { textAlign: "center" },
                                ]}
                              />
                            </View>
                          </View>
                          <View style={{ flexDirection: "column", flex: 0.5 }}>
                            <Text
                              style={[
                                styles.inputLabel,
                                { alignSelf: "flex-start" },
                              ]}
                            >
                              End Time
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={"number-pad"}
                                style={[
                                  styles.textInput,
                                  { textAlign: "center" },
                                ]}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={"number-pad"}
                                style={[
                                  styles.textInput,
                                  { textAlign: "center" },
                                ]}
                              />
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 0.45,
                            }}
                          >
                            <View style={{ flexDirection: "column", flex: 1 }}>
                              <Text style={[styles.inputLabel]}>Duration</Text>
                              <TextInput
                                placeholder="MM"
                                style={styles.textInput}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 0.45,
                            }}
                          >
                            <View style={{ flexDirection: "column", flex: 1 }}>
                              <Text style={[styles.inputLabel]}>Gap</Text>
                              <TextInput
                                placeholder="MM"
                                style={styles.textInput}
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      <CustomButton
                        text="Save"
                        textstyle={{ color: "white", fontSize: 12 }}
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          backgroundColor: "#2B8ADA",
                          borderRadius: 10,
                          marginVertical: 10,
                        }}
                        onPress={() => {
                          setemodal(false);
                          // navigation.navigate("E-Consultation", {
                          //   ClinicName: ClinicName,
                          //   ClinicAddress: ClinicAddress,
                          // });
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* General Configuration Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
                  showGenConfig
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
                    showGenConfig
                      ? {
                          borderBottomWidth: 0.5,
                          borderBottomColor: "#707070",
                        }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showGenConfig) {
                      setShowGenConfig(!showGenConfig);
                    } else {
                      setShowGenConfig(!showGenConfig);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showGenConfig ? { color: "#2B8ADA" } : null,
                    ]}
                  >
                    General Configuration
                  </Text>
                  <FAIcon
                    name={showGenConfig ? "chevron-down" : "chevron-right"}
                    color={showGenConfig ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* General Configuration Body*/}
            {showGenConfig ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      flexDirection: "column",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        justifyContent: "space-between",
                        width: "95%",
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flex: 0.45,
                          marginRight: "5%",
                        }}
                      >
                        <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                          Show Mobile Number
                        </Text>
                        <SelectList
                          boxStyles={{
                            backgroundColor: "#e8f0fe",
                            borderWidth: 0,
                          }}
                          dropdownItemStyles={{ backgroundColor: "#e8f0fe" }}
                          setSelected={setshowMobNo}
                          data={dataShowMobNo}
                        />
                      </View>
                      <View style={{ flexDirection: "column", flex: 0.45 }}>
                        <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                          Duration-Follow-Up
                        </Text>

                        <SelectList
                          boxStyles={{
                            backgroundColor: "#e8f0fe",
                            borderWidth: 0,
                          }}
                          dropdownItemStyles={{ backgroundColor: "#e8f0fe" }}
                          setSelected={setshowFollowUp}
                          data={dataFollowUp}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {/* Preconsultation Questionnaire Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
                  showPreConsultationQuestionaire
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
                    showPreConsultationQuestionaire
                      ? {
                          borderBottomWidth: 0.5,
                          borderBottomColor: "#707070",
                        }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showPreConsultationQuestionaire) {
                      setShowPreConsultationQuestionaire(
                        !showPreConsultationQuestionaire
                      );
                    } else {
                      setShowPreConsultationQuestionaire(
                        !showPreConsultationQuestionaire
                      );
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showPreConsultationQuestionaire
                        ? { color: "#2B8ADA" }
                        : null,
                    ]}
                  >
                    Pre Consultation Questionnaire
                  </Text>
                  <FAIcon
                    name={
                      showPreConsultationQuestionaire
                        ? "chevron-down"
                        : "chevron-right"
                    }
                    color={showPreConsultationQuestionaire ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Preconsultation Questionnaire Body*/}
            {showPreConsultationQuestionaire ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      flexDirection: "column",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "95%",
                        alignSelf: "center",
                      }}
                    >
                      <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                        Set PreConsultation Questionnaire
                      </Text>
                      <SelectList
                        boxStyles={{
                          backgroundColor: "#e8f0fe",
                          borderWidth: 0,
                        }}
                        dropdownItemStyles={{ backgroundColor: "#e8f0fe" }}
                        setSelected={(val) =>
                          setShowQuestions(val === "Yes" ? true : false)
                        }
                        data={dataShowQues}
                      />
                    </View>
                    {questionareList !== "" && showQuestions
                      ? questionareList.map((questionareList, index) => {
                          return (
                            <View key={index} style={styles.bubble}>
                              <Text style={styles.bubbleHeading}>
                                {questionareList.questions}
                              </Text>
                            </View>
                          );
                        })
                      : null}

                    {showQuestions ? (
                      <View
                        style={{ flexDirection: "column", marginVertical: 10 }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.textInput,
                            {
                              alignSelf: "center",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "95%",
                            },
                          ]}
                          onPress={() => setQuestionare(true)}
                        >
                          <Text style={[styles.label, { fontWeight: "400" }]}>
                            Add Pre Consultation Questionnaire
                          </Text>
                          <FAIcon
                            name="plus"
                            color={"black"}
                            size={20}
                            style={{ alignSelf: "center", marginRight: 5 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            ) : null}
            {questionare ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={questionare}
                onRequestClose={() => {
                  setQuestionare(!questionare);
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
                          fontSize: 14,
                          padding: 5,
                        }}
                      >
                        Add Pre Consultation Questionnaire
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
                        onPress={() => setQuestionare(false)}
                      />
                    </View>
                    {/* <View
                      style={{
                        width:"95%",
                        alignSelf:"center",
                      }}
                    >
                      <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                        Select Speciality
                      </Text>
                      <SelectList
                        boxStyles={{
                          backgroundColor: "#e8f0fe",
                          borderWidth: 0,
                        }}
                        dropdownItemStyles={{ backgroundColor: "#e8f0fe" }}
                        setSelected={setshowMobNo}
                        data={dataShowMobNo}
                      />
                    </View> */}
                    <TextInput
                      placeholder="Write your Question Here"
                      style={{
                        height: 100,
                        textAlign: "left",
                        textAlignVertical: "top",
                        width: "95%",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                      }}
                      value={consultationQuestion}
                      onChangeText={(text) => setConsultationQuestion(text)}
                    />
                    <CustomButton
                      text="+ Add More"
                      textstyle={{ color: "white" }}
                      style={{
                        backgroundColor: "#2B8ADA",
                        alignSelf: "flex-end",
                        marginVertical: 10,
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        if (consultationQuestion !== "") {
                          questionareList.push({
                            questions: consultationQuestion,
                          });
                        }
                        setConsultationQuestion("");
                      }}
                    />
                    <ScrollView style={{ width: "90%", height: 100 }}>
                      <RenderQuestion />
                    </ScrollView>
                    <CustomButton
                      text="Save"
                      textstyle={{ color: "white" }}
                      style={{
                        width: "95%",
                        backgroundColor: "#2B8ADA",
                        marginVertical: 5,
                      }}
                      onPress={() => setQuestionare(false)}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Consultation Fees Label*/}
            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={[
                  styles.whiteLabelView,
                  showConsultFees
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
                    showConsultFees
                      ? {
                          borderBottomWidth: 0.5,
                          borderBottomColor: "#707070",
                        }
                      : null,
                  ]}
                  onPress={() => {
                    if (!showConsultFees) {
                      setShowConsultFees(!showConsultFees);
                    } else {
                      setShowConsultFees(!showConsultFees);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      { width: "90%" },
                      showConsultFees ? { color: "#2B8ADA" } : null,
                    ]}
                  >
                    Consultation Fees
                  </Text>
                  <FAIcon
                    name={showConsultFees ? "chevron-down" : "chevron-right"}
                    color={showConsultFees ? "#2B8ADA" : "gray"}
                    style={[styles.label, { width: "10%", fontSize: 20 }]}
                  ></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Consultation Fees Body*/}
            {showConsultFees ? (
              <View style={styles.whiteBodyView}>
                <View
                  style={{
                    flexDirection: "column",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 0.65,
                        marginRight: "5%",
                      }}
                    >
                      <Text style={[styles.textInput, { fontWeight: "bold" }]}>
                        Physical Consultation Fees
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.25 }}>
                      <TextInput
                        style={[styles.textInput]}
                        maxLength={5}
                        keyboardType={"number-pad"}
                        onChangeText={(text) =>
                          setphysicalConsulationFees(text)
                        }
                        value={physicalConsulationFees}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 0.65,
                        marginRight: "5%",
                      }}
                    >
                      <Text style={[styles.textInput, { fontWeight: "bold" }]}>
                        E-Consultation Fees
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.25 }}>
                      <TextInput
                        style={[styles.textInput]}
                        maxLength={5}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => seteConsulationFees(text)}
                        value={eConsulationFees}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 0.65,
                        marginRight: "5%",
                      }}
                    >
                      <Text style={[styles.textInput, { fontWeight: "bold" }]}>
                        Follow-Up Fees
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.25 }}>
                      <TextInput
                        style={[styles.textInput]}
                        keyboardType={"number-pad"}
                        maxLength={5}
                        onChangeText={(text) => setfollowUpFees(text)}
                        value={followUpFees}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {/* Buttons */}
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
                  PostData();
                }}
              ></CustomButton>
              <CustomButton
                text="Do it Later"
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
                  navigation.navigate("DoctorHome");
                }}
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
    flex: 0.45,
    padding: 5,
    color: "black",
    backgroundColor: "#E8F0FE",
    borderRadius: 10,
    fontSize: 14,
    marginVertical: 5,
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
  picker: {
    width: "90%",
    fontSize: 12,
    backgroundColor: "#E8F0FE",
  },
  heading: {
    color: "#2b8ada",
    fontWeight: "bold",
  },
  modalView: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    padding: 35,
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

  bubbleHeading: {
    color: "black",
    padding: 5,
    width: "90%",
  },
  whiteLabelView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
  },
  whiteBodyView: {
    backgroundColor: "white",
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
  },
});

export default DoctorRegistration2;
