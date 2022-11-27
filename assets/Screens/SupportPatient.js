import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  Alert,
  useWindowDimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import Header from "../Components/Header";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { WebView } from "react-native-webview";

function Support({ navigation }) {
  const [mob, setmob] = useState("");
  const [showPdf, setshowPdf] = useState(false);

  const show = async () => {
    const value = await AsyncStorage.getAllKeys();
    console.log(value);
  };

  const html = `<html >

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet">
</head>

<body>
    <img src="https://www.w3schools.com/images/lamp.jpg" alt="">
    <div class="flex-container">
        <div class="doct-deets">
            <br>
            <h1>Dr. Arunima Singh</h1>
            <h4>MBBS Bachelor of Medicine and Bachelor of Surgery</h4>
        </div>
        <div class="doct-addr">
            <h3 class="addr">Rajpur Road</h3>
            <h3 class="addr">Dehradun-248001, Uttarakhand</h3>
            <h1 class="number">M:123456789</h1>
        </div>
    </div>
    <hr>
    <br><br>
    <div class="patient">
        <div>
            <h3 class="pat-name">Name: <b>Rohan Kumar</b></h3>
            <h3 class="pat-name">Age/Gender: <b>Rohan Kumar</b></h3>
        </div>
        <div class="date">
            <h3 style="margin-top: 10px; margin-bottom: 10px;">23 November 2022</h3>
            <h3 class="pat-name">Patient ID: <b>R21DY768F2</b></h3>
        </div>
    </div>
    <br>
    <div class="diagnosis">
        <h3 class="pat-name">Chief Complaints: <b>Fever, Cold</b></h3>
        <h4>Body Temperature: <b>100.4 F</b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; BP: <b>135/90 mmHg</b></h4>
        <h4>Examination Notes: Undocumented fever since 3 days and general weakness</h4>
        <h3 class="pat-name">Diagnosis: <b>Viral Fever</b></h3>
        <br>
        <table class="table">
            <thread>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col" style="width: 70% ;">Medicine Name</th>
                    <th scope="col">Regime & Instructions</th>
                </tr>
            </thread>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>DOLO 650MG TAB <br> Prescription....</td>
                    <td>1-1-1 after food for 3 days</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>PAN D CAP <br> Prescription......</td>
                    <td>1-0-0 before food for 3 days</td>
                </tr>
            </tbody>
        </table>
        <h4>Investigation - Complete blood count, dengue virus antigen assay</h4>
        <img src="https://www.signwell.com/assets/vip-signatures/muhammad-ali-signature-6a40cd5a6c27559411db066f62d64886c42bbeb03b347237ffae98b0b15e0005.svg" style="width:100" alt="">
        <h3>-Dr. Arunima Singh</h3>
    </div>

</body>

</html>`;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: true,
    });
    console.log(file.uri);
    setshowPdf(true);
    //await shareAsync(file.uri);
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
          <Text>Support Page</Text>
          <CustomButton text="Show Cache Keys" onPress={show} />
          <Button title="Generate PDF" onPress={generatePdf} />

          {showPdf ? (
            <WebView
              style={{
                borderWidth: 2,
                height: 500,
                width: 300,
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
              }}
              originWhitelist={["*"]}
              source={{
                html: html,
              }}
            />
          ) : null}

          {/* <CustomButton
            text="Submit"
            style={{ backgroundColor: "pink" }}
            onPress={() => {
              axios
                .post(`http://10.0.2.2:8080/doctor/savedoctor`, {
                  age: 0,
                  allowWhatsAppNotification: true,
                  city: "string",
                  countryCode: "string",
                  countryName: "string",
                  createdOn: "2022-11-13",
                  digialSignature: "string",
                  dob: "2022-11-13",
                  doctorClinicDetailsDTOs: [
                    {
                      clinicAddress: "string",
                      clinicName: "string",
                      consultationDate: "2022-11-13",
                      consultationEndTime: "10:00",
                      consultationStartTime: "10:00",
                      slotDuration: 0,
                      specialInstruction: "string",
                    },
                  ],
                  doctorConfigurationDTO: {
                    contactVisibility: true,
                    followUpDuration: 0,
                  },
                  doctorConsultationFeesDTO: {
                    eConsulationFees: 0,
                    followUpFees: 0,
                    physicalConsulationFees: 0,
                  },
                  doctorEConsultationDTOs: [
                    {
                      consultationDate: "2022-11-13",
                      consultationEndTime: "11:00",
                      consultationStartTime: "02:00",
                      gap: 5,
                      slotDuration: 20,
                      typeOfEConsultation: "phonecall",
                    },
                  ],
                  doctorEducationsDTOs: [
                    {
                      degree: "string",
                      degreePath: "string",
                      doctorEducationPkId: 0,
                      passingYear: "2022-10-25",
                      specialization: "string",
                      totalExperiencedInMonths: 0,
                      university: "string",
                    },
                  ],
                  doctorIdentificationDTOs: [
                    {
                      identificationNumber: "string",
                      identificationPath: "string",
                      identificationType: "string",
                    },
                  ],
                  doctorLanguageDTOs: [
                    {
                      language: "string",
                    },
                  ],
                  doctorMedicalRegistrationDTOs: [
                    {
                      certificatePath: "string",
                      registrationCouncil: "string",
                      registrationNo: "string",
                      registrationYear: "2022-11-13",
                    },
                  ],
                  email: "string",
                  fullName: "John",
                  gender: "Male",
                  mobileNumber: "string",
                  phoneIp: "string",
                  photoPath: "string",
                  pinCode: "string",
                  preConsultationQuestionDTOs: [
                    {
                      questions: "string",
                      speciality: "string",
                    },
                  ],
                  roles: "ROLE_DOCTOR",
                  title: "string",
                  whatsAppNumber: "string",
                })
                .then((response) => {
                  console.log("Dr. created successfully");
                  //return response.data.token;
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          /> */}
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
});

export default Support;
