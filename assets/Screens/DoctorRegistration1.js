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

const DoctorRegistrationStep1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setmobile] = useState("");
  const [PIN, setPIN] = useState("");
  const [speciality, setspeciality] = useState([]);
  const [Language, setLanguage] = useState([]);

  const [splJson, setsplJson] = useState([]);

  const data = [
    { key: "Allergy and immunology", value: "Allergy and immunology" },
    { key: "Anesthesiology", value: "Anesthesiology" },
    { key: "Dermatology", value: "Dermatology" },
    { key: "Diagnostic radiology", value: "Diagnostic radiology" },
    { key: "Emergency medicine", value: "Emergency medicine" },
    { key: "Family medicine", value: "Family medicine" },
    { key: "Internal medicine", value: "Internal medicine" },
    { key: "Medical genetics", value: "Medical genetics" },
    { key: "Neurology", value: "Neurology" },
    { key: "Nuclear medicine", value: "Nuclear medicine" },
    { key: "Obstetrics and gynecology", value: "Obstetrics and gynecology" },
    { key: "Ophthalmology", value: "Ophthalmology" },
    { key: "Pathology", value: "Pathology" },
    { key: "Pediatrics", value: "Pediatrics" },
    {
      key: "Physical medicine and rehabilitation",
      value: "Physical medicine and rehabilitation",
    },
    { key: "Preventive medicine", value: "Preventive medicine" },
    { key: "Psychiatry", value: "Psychiatry" },
    { key: "Radiation oncology", value: "Radiation oncology" },
    { key: "Surgery", value: "Surgery" },
    { key: "Urology", value: "Urology" },
    { key: "Dermatopathology", value: "Dermatopathology" },
    { key: "Pediatric dermatology", value: "Pediatric dermatology" },
    { key: "Procedural dermatology", value: "Procedural dermatology" },
    { key: "Critical care medicine", value: "Critical care medicine" },
    {
      key: "Hospice and palliative care",
      value: "Hospice and palliative care",
    },
    { key: "Pain medicine", value: "Pain medicine" },
    { key: "Pediatric anesthesiology", value: "Pediatric anesthesiology" },
    { key: "Sleep medicine", value: "Sleep medicine" },
    { key: "Abdominal radiology", value: "Abdominal radiology" },
    { key: "Breast imaging", value: "Breast imaging" },
    { key: "Cardiothoracic radiology", value: "Cardiothoracic radiology" },
    { key: "Cardiovascular radiology", value: "Cardiovascular radiology" },
    { key: "Chest radiology", value: "Chest radiology" },
    { key: "Emergency radiology", value: "Emergency radiology" },
    {
      key: "Endovascular surgical neuroradiology",
      value: "Endovascular surgical neuroradiology",
    },
    { key: "Gastrointestinal radiology", value: "Gastrointestinal radiology" },
    { key: "Genitourinary radiology", value: "Genitourinary radiology" },
    { key: "Head and neck radiology", value: "Head and neck radiology" },
    { key: "Interventional radiology", value: "Interventional radiology" },
    { key: "Musculoskeletal radiology", value: "Musculoskeletal radiology" },
    { key: "Neuroradiology", value: "Neuroradiology" },
    { key: "Nuclear radiology", value: "Nuclear radiology" },
    { key: "Pediatric radiology", value: "Pediatric radiology" },
    {
      key: "Vascular and interventional radiology",
      value: "Vascular and interventional radiology",
    },
    {
      key: "Anesthesiology critical care medicine",
      value: "Anesthesiology critical care medicine",
    },
    { key: "Emergency medical services", value: "Emergency medical services" },
    {
      key: "Hospice and palliative medicine",
      value: "Hospice and palliative medicine",
    },
    { key: "Internal medicine ", value: "Internal medicine " },
    { key: "Critical care medicine", value: "Critical care medicine" },
    { key: "Medical toxicology", value: "Medical toxicology" },
    {
      key: "Pediatric emergency medicine",
      value: "Pediatric emergency medicine",
    },
    { key: "Sports medicine", value: "Sports medicine" },
    {
      key: "Undersea and hyperbaric medicine",
      value: "Undersea and hyperbaric medicine",
    },
    { key: "Adolescent medicine", value: "Adolescent medicine" },
    { key: "Geriatric medicine", value: "Geriatric medicine" },
    {
      key: "Advanced heart failure and transplant cardiology",
      value: "Advanced heart failure and transplant cardiology",
    },
    { key: "Cardiovascular disease", value: "Cardiovascular disease" },
    {
      key: "Clinical cardiac electrophysiology",
      value: "Clinical cardiac electrophysiology",
    },
    {
      key: "Endocrinology, diabetes, and metabolism",
      value: "Endocrinology, diabetes, and metabolism",
    },
    { key: "Gastroenterology", value: "Gastroenterology" },
    { key: "Hematology", value: "Hematology" },
    { key: "Hematology and oncology", value: "Hematology and oncology" },
    { key: "Infectious disease", value: "Infectious disease" },
    { key: "Interventional cardiology", value: "Interventional cardiology" },
    { key: "Nephrology", value: "Nephrology" },
    { key: "Oncology", value: "Oncology" },
    {
      key: "Pediatric internal medicine",
      value: "Pediatric internal medicine",
    },
    { key: "Pulmonary disease", value: "Pulmonary disease" },
    {
      key: "Pulmonary disease and critical care medicine",
      value: "Pulmonary disease and critical care medicine",
    },
    { key: "Rheumatology", value: "Rheumatology" },
    { key: "Transplant hepatology", value: "Transplant hepatology" },
    { key: "Biochemical genetics", value: "Biochemical genetics" },
    { key: "Clinical cytogenetics", value: "Clinical cytogenetics" },
    { key: "Clinical genetics", value: "Clinical genetics" },
    {
      key: "Molecular genetic pathology",
      value: "Molecular genetic pathology",
    },
    { key: "Brain injury medicine", value: "Brain injury medicine" },
    { key: "Child neurology", value: "Child neurology" },
    { key: "Clinical neurophysiology", value: "Clinical neurophysiology" },
    {
      key: "Neurodevelopmental disabilities",
      value: "Neurodevelopmental disabilities",
    },
    { key: "Neuromuscular medicine", value: "Neuromuscular medicine" },
    { key: "Vascular neurology", value: "Vascular neurology" },
    {
      key: "Female pelvic medicine and reconstructive surgery",
      value: "Female pelvic medicine and reconstructive surgery",
    },
    { key: "Gynecologic oncology", value: "Gynecologic oncology" },
    { key: "Maternal-fetal medicine", value: "Maternal-fetal medicine" },
    {
      key: "Reproductive endocrinologists and infertility",
      value: "Reproductive endocrinologists and infertility",
    },
    {
      key: "Anterior segment/cornea ophthalmology",
      value: "Anterior segment/cornea ophthalmology",
    },
    { key: "Glaucoma ophthalmology", value: "Glaucoma ophthalmology" },
    { key: "Neuro-ophthalmology", value: "Neuro-ophthalmology" },
    { key: "Ocular oncology", value: "Ocular oncology" },
    { key: "Oculoplastics", value: "Oculoplastics" },
    { key: "Orbit", value: "Orbit" },
    {
      key: "Ophthalmic Plastic & Reconstructive Surgery",
      value: "Ophthalmic Plastic & Reconstructive Surgery",
    },
    { key: "Retina ", value: "Retina " },
    { key: "Uveitis", value: "Uveitis" },
    { key: "Strabismus", value: "Strabismus" },
    { key: "Pediatric ophthalmology", value: "Pediatric ophthalmology" },
    { key: "Anatomical pathology", value: "Anatomical pathology" },
    {
      key: "Blood banking and transfusion medicine",
      value: "Blood banking and transfusion medicine",
    },
    { key: "Chemical pathology", value: "Chemical pathology" },
    { key: "Clinical pathology", value: "Clinical pathology" },
    { key: "Cytopathology", value: "Cytopathology" },
    { key: "Forensic pathology", value: "Forensic pathology" },
    { key: "Genetic pathology", value: "Genetic pathology" },
    { key: "Immunopathology", value: "Immunopathology" },
    { key: "Medical microbiology", value: "Medical microbiology" },
    { key: "Molecular pathology", value: "Molecular pathology" },
    { key: "Neuropathology", value: "Neuropathology" },
    { key: "Pediatric pathology", value: "Pediatric pathology" },
    { key: "Child abuse pediatrics", value: "Child abuse pediatrics" },
    {
      key: "Developmental-behavioral pediatrics",
      value: "Developmental-behavioral pediatrics",
    },
    {
      key: "Neonatal-perinatal medicine",
      value: "Neonatal-perinatal medicine",
    },
    { key: "Pediatric cardiology", value: "Pediatric cardiology" },
    {
      key: "Pediatric critical care medicine",
      value: "Pediatric critical care medicine",
    },
    { key: "Pediatric endocrinology", value: "Pediatric endocrinology" },
    { key: "Pediatric gastroenterology", value: "Pediatric gastroenterology" },
    {
      key: "Pediatric hematology-oncology",
      value: "Pediatric hematology-oncology",
    },
    {
      key: "Pediatric infectious diseases",
      value: "Pediatric infectious diseases",
    },
    { key: "Pediatric nephrology", value: "Pediatric nephrology" },
    { key: "Pediatric pulmonology", value: "Pediatric pulmonology" },
    { key: "Pediatric rheumatology", value: "Pediatric rheumatology" },
    { key: "Pediatric sports medicine", value: "Pediatric sports medicine" },
    {
      key: "Pediatric transplant hepatology",
      value: "Pediatric transplant hepatology",
    },
    {
      key: "Pediatric rehabilitation medicine",
      value: "Pediatric rehabilitation medicine",
    },
    {
      key: "Spinal cord injury medicine",
      value: "Spinal cord injury medicine",
    },
    { key: "Aerospace medicine", value: "Aerospace medicine" },
    { key: "Occupational medicine", value: "Occupational medicine" },
    { key: "Public health medicine", value: "Public health medicine" },
    { key: "Addiction psychiatry", value: "Addiction psychiatry" },
    { key: "Administrative psychiatry", value: "Administrative psychiatry" },
    {
      key: "Child and adolescent psychiatry",
      value: "Child and adolescent psychiatry",
    },
    { key: "Community psychiatry", value: "Community psychiatry" },
    { key: "Consultation", value: "Consultation" },
    { key: "Liaison psychiatry", value: "Liaison psychiatry" },
    { key: "Emergency psychiatry", value: "Emergency psychiatry" },
    { key: "Forensic psychiatry", value: "Forensic psychiatry" },
    { key: "Geriatric psychiatry", value: "Geriatric psychiatry" },
    {
      key: "Mental retardation psychiatry",
      value: "Mental retardation psychiatry",
    },
    { key: "Military psychiatry", value: "Military psychiatry" },
    { key: "Psychiatric research", value: "Psychiatric research" },
    { key: "Psychosomatic medicine", value: "Psychosomatic medicine" },
    { key: "Colon and rectal surgery", value: "Colon and rectal surgery" },
    { key: "General surgery", value: "General surgery" },
    { key: "Surgical critical care", value: "Surgical critical care" },
    { key: "Plastic surgery", value: "Plastic surgery" },
    { key: "Craniofacial surgery", value: "Craniofacial surgery" },
    { key: "Hand surgery", value: "Hand surgery" },
    { key: "Neurological surgery", value: "Neurological surgery" },
    { key: "Ophthalmic surgery", value: "Ophthalmic surgery" },
    {
      key: "Oral and maxillofacial surgery",
      value: "Oral and maxillofacial surgery",
    },
    { key: "Orthopaedic surgery", value: "Orthopaedic surgery" },
    {
      key: "Adult reconstructive orthopaedics",
      value: "Adult reconstructive orthopaedics",
    },
    {
      key: "Foot and ankle orthopaedics",
      value: "Foot and ankle orthopaedics",
    },
    { key: "Musculoskeletal oncology", value: "Musculoskeletal oncology" },
    {
      key: "Orthopaedic sports medicine",
      value: "Orthopaedic sports medicine",
    },
    {
      key: "Orthopaedic surgery of the spine",
      value: "Orthopaedic surgery of the spine",
    },
    { key: "Orthopaedic trauma", value: "Orthopaedic trauma" },
    { key: "Pediatric orthopaedics", value: "Pediatric orthopaedics" },
    { key: "Otolaryngology", value: "Otolaryngology" },
    { key: "Pediatric otolaryngology", value: "Pediatric otolaryngology" },
    { key: "Otology neurotology", value: "Otology neurotology" },
    { key: "Pediatric surgery", value: "Pediatric surgery" },
    { key: "Neonatal", value: "Neonatal" },
    { key: "Prenatal", value: "Prenatal" },
    { key: "Trauma", value: "Trauma" },
    { key: "Pediatric oncology", value: "Pediatric oncology" },
    {
      key: "Surgical Intensivists, specializing in critical care patients",
      value: "Surgical Intensivists, specializing in critical care patients",
    },
    { key: "Thoracic Surgery", value: "Thoracic Surgery" },
    { key: "Congenital cardiac surgery", value: "Congenital cardiac surgery" },
    {
      key: "Thoracic surgery-integrated",
      value: "Thoracic surgery-integrated",
    },
    { key: "Vascular surgery", value: "Vascular surgery" },
    { key: "Pediatric urology", value: "Pediatric urology" },
    { key: "Urologic oncology", value: "Urologic oncology" },
    { key: "Renal transplant", value: "Renal transplant" },
    { key: "Male infertility", value: "Male infertility" },
    { key: "Calculi", value: "Calculi" },
    { key: "Female urology", value: "Female urology" },
    { key: "Neurourology", value: "Neurourology" },
    { key: "Anatomical Pathology", value: "Anatomical Pathology" },
    { key: "Cardiology", value: "Cardiology" },
    { key: "Cardiovascular", value: "Cardiovascular" },
    { key: "Thoracic Surgery", value: "Thoracic Surgery" },
    { key: "Clinical Immunology", value: "Clinical Immunology" },
    { key: "Allergy", value: "Allergy" },
    { key: "Critical Care Medicine", value: "Critical Care Medicine" },
    { key: "Diagnostic Radiology", value: "Diagnostic Radiology" },
    { key: "Emergency Medicine", value: "Emergency Medicine" },
    {
      key: "Endocrinology and Metabolism",
      value: "Endocrinology and Metabolism",
    },
    { key: "Family Medicine", value: "Family Medicine" },
    { key: "General Internal Medicine", value: "General Internal Medicine" },
    { key: "General Surgery", value: "General Surgery" },
    { key: "General", value: "General" },
    { key: "Clinical Pathology", value: "Clinical Pathology" },
    { key: "Geriatric Medicine", value: "Geriatric Medicine" },
    { key: "Medical Biochemistry", value: "Medical Biochemistry" },
    { key: "Medical Genetics", value: "Medical Genetics" },
    {
      key: "Medical Microbiology and Infectious Diseases",
      value: "Medical Microbiology and Infectious Diseases",
    },
    { key: "Medical Oncology", value: "Medical Oncology" },
    { key: "Neurosurgery", value: "Neurosurgery" },
    { key: "Nuclear Medicine", value: "Nuclear Medicine" },
    { key: "Obstetrics", value: "Obstetrics" },
    { key: "Gynecology", value: "Gynecology" },
    { key: "Occupational Medicine", value: "Occupational Medicine" },
    { key: "Orthopedic Surgery", value: "Orthopedic Surgery" },
    {
      key: "Physical Medicine and Rehabilitation",
      value: "Physical Medicine and Rehabilitation",
    },
    { key: "Plastic Surgery", value: "Plastic Surgery" },
    {
      key: "Public Health and Preventive Medicine",
      value: "Public Health and Preventive Medicine",
    },
    { key: "Radiation Oncology", value: "Radiation Oncology" },
    { key: "Respirology", value: "Respirology" },
    { key: "General Medicine", value: "General Medicine" },
    { key: "Otorhinolaryngology", value: "Otorhinolaryngology" },
    { key: "Internal Medicine", value: "Internal Medicine" },
    { key: "Immunology", value: "Immunology" },
    { key: "Infectious Diseases", value: "Infectious Diseases" },
    { key: "Clinical Pharmocology", value: "Clinical Pharmocology" },
    { key: "Anaesthesiology", value: "Anaesthesiology" },
    { key: "Radiology", value: "Radiology" },
    { key: "Sonology", value: "Sonology" },
    { key: "Biochemistry", value: "Biochemistry" },
    { key: "Teratology", value: "Teratology" },
    { key: "Epidemiology", value: "Epidemiology" },
    { key: "Communicative Diseases", value: "Communicative Diseases" },
    { key: "Trichology", value: "Trichology" },
    { key: "Otolaryngology (ENT)", value: "Otolaryngology (ENT)" },
    { key: "Otology", value: "Otology" },
    { key: "Rhinology", value: "Rhinology" },
    { key: "Pulmonology", value: "Pulmonology" },
    { key: "Angiology", value: "Angiology" },
    { key: "Haematology", value: "Haematology" },
    { key: "Endocrinology", value: "Endocrinology" },
    { key: "Hepatology", value: "Hepatology" },
    { key: "Diabetology", value: "Diabetology" },
    { key: "Obstetrics", value: "Obstetrics" },
    { key: "Sexology", value: "Sexology" },
    { key: "Venereology", value: "Venereology" },
    { key: "Gynecology", value: "Gynecology" },
    { key: "Andrology", value: "Andrology" },
    { key: "Osteopathy", value: "Osteopathy" },
    { key: "Orthopedy", value: "Orthopedy" },
    { key: "Arthrology", value: "Arthrology" },
    { key: "Syndesmology", value: "Syndesmology" },
    { key: "Myology", value: "Myology" },
    { key: "Sarcology", value: "Sarcology" },
    { key: "Sports Medicine", value: "Sports Medicine" },
    { key: "Dentistry", value: "Dentistry" },
    { key: "Odontology", value: "Odontology" },
    { key: "Veterinary science", value: "Veterinary science" },
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

  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [splModalVisible, setSplModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);

  const genderSubmit = () => {
    console.log(gender);
  };

  const sp = async () => {
    //console.log(JSON.stringify(splJson));
    await AsyncStorage.setItem("speciality", JSON.stringify(splJson));
    console.log("From Cache");
    console.log(await AsyncStorage.getItem("speciality"));
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
              <SelectList
                labelStyles={{ height: 0 }}
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
                setSelected={(val) => setspeciality(val)}
                data={data}
                save="value"
                boxStyles={{ backgroundColor: "white", borderWidth: 0 }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>
            <CustomButton
              text="Check Speciality"
              onPress={() => {
                var temp = [];
                speciality.forEach(function (item) {
                  temp.push({
                    key: item,
                    value: item,
                  });
                });
                console.log("Before splJson");
                console.log(splJson);
                console.log("temp");
                console.log(temp);
                console.log("After splJson");
                setsplJson(temp);
                console.log(splJson);
              }}
            />

            <View
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={[styles.inputLabel]}>Language*</Text>
              <MultipleSelectList
                labelStyles={{ height: 0 }}
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
                  setCity("Dehradun");
                }}
                value={PIN}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
                editable={false}
                value={city}
              ></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: "#D0E0FC" }]}
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
                onPress={() => {
                  sp();
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
