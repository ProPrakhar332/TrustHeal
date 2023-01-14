import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView} from 'react-native';
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
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';

// import { printToFileAsync } from "expo-print";
// import { shareAsync } from "expo-sharing";
import {WebView} from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

//icons
import waiting from '../Animations/waiting1.gif';
import logo from '../PrescriptionTemplate/logo.png';
import bg from '../PrescriptionTemplate/bg.png';
import apiConfig from '../API/apiConfig';
import dayjs from 'dayjs';

function PrescriptionPreview({navigation}) {
  const [Bp, setBp] = useState('');
  const [showPdf, setshowPdf] = useState(false);
  const [filePdf, setfilePdf] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [cheifComplaints, setcheifComplaints] = useState(null);
  const [cheifComplaintsDisplay, setcheifComplaintsDisplay] = useState(null);
  const [Examination, setExamination] = useState(null);
  const [Diagnosis, setDiagnosis] = useState(null);
  const [Prescription, setPrescription] = useState(null);
  const [Investigation, setInvestigation] = useState(null);
  const [Advice, setAdvice] = useState(null);
  const [FollowUpDate, setFollowUpDate] = useState(null);
  const [doctorId, setdoctorId] = useState(null);
  const [doctorName, setdoctorName] = useState(null);
  const [doctorEducationRaw, setdoctorEducationRaw] = useState([]);
  const [doctorEducationDisp, setdoctorEducationDisp] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      let a = JSON.parse(await AsyncStorage.getItem('CheifComplaint'));
      let b = JSON.parse(await AsyncStorage.getItem('Examination'));
      let c = JSON.parse(await AsyncStorage.getItem('Prescription'));
      let d = JSON.parse(await AsyncStorage.getItem('Investigation'));
      let e = JSON.parse(await AsyncStorage.getItem('Advice'));
      let f = await AsyncStorage.getItem('FollowUpDate');
      let g = await AsyncStorage.getItem('Diagnosis');
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));

      //setting cheifcomplaint
      if (a != null) {
        setcheifComplaints(a);
        var y = '';
        for (var i = 0; i < a.length; ++i) y += a[i].comp + ',';
        y = y.substring(0, y.length - 1);
        setcheifComplaintsDisplay(y);
      }

      //setting examination details
      if (b != null) {
        let tempb =
          ` <div class="row align-items-center temp-bp mx-2">
                    <div class="col-md-6 col-sm-6">
                        <p class="mb-0">Body Temperature - ` +
          b.temperature +
          ` F</p>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <p class="mb-0">BP - ` +
          b.BPDiastolic +
          `/` +
          b.BPSystolic +
          ` mmHg</p>
                    </div>
                </div>
                <p class="examin mb-0" style="padding: 0 1.2rem;">Examination notes - ` +
          b.examinationNotes +
          `</p>`;
        setExamination(tempb);
      }

      //setting prescription
      if (c != null) {
        let z = ``;
        for (var i = 0; i < c.length; ++i) {
          z +=
            ` <tr>
                                    <td>` +
            (i + 1) +
            `</td>
                                    <td><p class="mb-0">` +
            c[i].medicineName +
            `</p>
                                        <span>` +
            c[i].medicineType +
            `</span>
                                    </td>
                                    <td><p class="mb-0">` +
            c[i].instruction +
            ` for ` +
            c[i].days +
            ` days</p></td>
                                </tr>`;
        }
        setPrescription(z);
      }

      //setting investigation
      if (d != null) {
        let tempd = '';
        for (var i = 0; i < d.length; ++i) tempd += d[i].inv + ',';
        tempd = tempd.substring(0, tempd.length - 1);
        setInvestigation(tempd);
      }

      //setting Advice

      setAdvice(e != null ? e : null);
      setFollowUpDate(f != null ? f : null);

      setDiagnosis(g != null ? g : null);
      setdoctorId(x.doctorId);
      setdoctorName(x.doctorName != null ? x.doctorName : x.fullName);
      console.log(doctorName);
    };
    loadData();
  }, []);

  useEffect(() => {
    const getEdu = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/educations?doctorId=' + doctorId)
        .then(function (response) {
          if (response.status == 200) {
            console.log(response.data);
            setdoctorEducationRaw(response.data);
          } else {
            console.log(response.status);
          }
        })
        .catch(function (error) {
          console.log(
            '===============Error in fetching doctor education=================================',
          );
          console.log(error);
        });
    };

    if (doctorId != null) {
      getEdu();
    }
  }, [doctorId]);

  useEffect(() => {
    if (doctorEducationRaw != null) {
      var x = ``;
      for (var i = 0; i < doctorEducationRaw.length; ++i) {
        x =
          x +
          `<p class="dr-designation">` +
          doctorEducationRaw[i].degree +
          ` ` +
          doctorEducationRaw[i].specialization +
          `</p>`;
      }
      //console.log('==========Doctor education display===============');
      setdoctorEducationDisp(x);
      //console.log(x);
    }
  }, [doctorEducationRaw]);

  const show = async () => {
    const value = await AsyncStorage.getAllKeys();
    console.log(value);
  };

  const html =
    `<!DOCTYPE html>
<html lang="en">

<head>
    <title>Prescription Modify</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
</head>
<style>
img{
    object-fit: cover;
}
.px-logo{
    width: auto;
    height: 70px;
}
.prescription{
    background: ` +
    bg +
    `;
    background-attachment: scroll;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    padding: 0.5rem;
    width: 410px;
    background-color: #fff;
    padding-bottom: 3.5rem;
}
.dr-nme{
    line-height: 28px;
    font-family: Scandia;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: rgba(0,0,0,1);
}
.dr-designation{
    line-height: 12px;
    margin-top: -2px;
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 9px;
    color: rgba(0,0,0,0.5);
}
.dr-address, .dr-mobile, .p-id, .date{
    line-height: 14px;
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 9px;
    color: rgba(0,0,0,0.75);
    text-align: right;
    margin-bottom: 0;
}
.p-nme, .p-ag{
    line-height: 14px;
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 9px;
    color: rgba(0,0,0,0.75);
    margin-bottom: 0;
}
.complaints{
    line-height: 15px;
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    color: rgba(0,0,0,0.75);
    padding: 0.75rem 1.2rem 0;
}
.temp-bp, .examin{
    line-height: 18px;
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    justify-content: space-evenly;
    color: rgba(0,0,0,0.5);
}
.rx{
    width: 18px;
    height: 13px;
    position: relative;
    left: 200px;
}
table, th, td {
    border: 1px solid rgba(182,182,182,1);
    border-collapse: collapse;
    line-height: 18px;
    font-size: 10px;
    background: #fff;
    padding: 0 10px 0;
}
th{
    background: rgba(43,144,220,1);
    color: #fff;
    font-weight: 400;
    text-align: center;
}
@media only screen and (min-width: 320px) and (max-width: 480px){
    .col-sm-6{
        width: 50%;
    }
    .rx {
        left: 140px;
    }
}
</style>

<body>

    <div class="container my-5">
        <div class="row mx-auto justify-content-center">
            <div class="col-md-3">

            </div>
            <div class="col-md-6 prescription">
                <div>
                    <img src="` +
    logo +
    `" alt="logo" class="px-logo mx-2">
                </div>
                <div class="row align-items-baseline mx-2">
                    <div class="col-md-6 col-sm-6">
                        <h2 class="dr-nme mb-0">` +
    doctorName +
    `</h2>
                        ` +
    doctorEducationDisp +
    `
                    </div>
                    
                </div>
                <hr class="my-0 mx-2" style="height: 2px; border: none; background: black;">
                <img src="/PrescriptionTemplate/rx.png" alt="rx" class="rx">
                <div class="row align-items-baseline mx-2 py-2" style="background-color: rgba(240,250,255,1);">
                    <div class="col-md-6 col-sm-6">
                        <p class="p-nme mb-0">Name: Rohan Kumar</p>
                        <p class="p-ag">Age/Gender: M/40</p>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <p class="date">` +
    dayjs(JSON.stringify(new Date().getDate()).substring(0, 11)).format(
      'DD-MM-YYYY',
    ) +
    `</p>
                        <p class="p-id">Patient ID: R21DY768F2</p>
                    </div>
                </div>
                <p class="mb-0 complaints">Chief Complaints - ` +
    cheifComplaintsDisplay +
    `</p>
               ` +
    Examination +
    `
                <p class="mb-1 complaints">Diagnosis -` +
    Diagnosis +
    `</p>
                <div class="row align-items-center mx-2">
                    <div class="col-md-12">
                        <table style="width: 100%;">
                            <thead>
                                <tr>
                                    <th width="10%">S.No</th>
                                    <th width="50%">Medicine Name</th>
                                    <th width="40%">Special Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` +
    Prescription +
    `
                            </tbody>                            
                        </table>
                    </div>
                </div>
                <p class="examin my-2" style="padding: 0 1.2rem;">Investigation -` +
    Investigation +
    `</p>
             
<p class="mb-1 complaints pt-0" align='right'>- ` +
    doctorName +
    `</p>   
                
            </div>
            <div class="col-md-3">

            </div>
        </div>
    </div>


    <!-- <script src="js/bootstrap.min.js"></script> -->
</body>

</html>`;

  let generatePdf = async () => {
    let options = {
      html: html,
      fileName: 'prescription',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    console.log(file);
    setfilePdf(file);
    setshowPdf(true);
    //alert(file.filePath);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled={true}>
      <SafeAreaView
        style={{
          backgroundColor: '#2B8ADA',
          width: '100%',
        }}>
        <ScrollView
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              marginVertical: 10,
              color: '#2B8ADA',
            }}>
            PRESCRIPTION PREVIEW
          </Text>

          <CustomButton text="Show Cache Keys" onPress={show} />

          {showPdf ? (
            <Pdf
              source={{uri: filePdf.filePath}}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
            />
          ) : null}
          <Button title="Generate PDF" onPress={generatePdf} />
          <Button
            title="cheif complain array"
            onPress={() => {
              //setcheifComplaintsDisplay(cheifComplaintsDisplay.substring(0,cheifComplaintsDisplay.length));
            }}
          />
          <CustomButton
            text={'Submit'}
            textstyle={{color: 'white'}}
            style={{
              backgroundColor: '#2b8ada',
              borderRadius: 10,
              flex: 1,
              marginTop: 10,
            }}
          />
        </ScrollView>
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 50,
                width: 250,
                height: 250,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={waiting}
                style={{
                  alignSelf: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#2B8ADA',
                  fontSize: 20,
                  fontWeight: 'bold',
                  width: '100%',
                  padding: 10,
                }}>
                Creating Prescription...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
});

export default PrescriptionPreview;
