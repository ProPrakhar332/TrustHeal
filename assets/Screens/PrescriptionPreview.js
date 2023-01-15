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
  const imageURL = 'https://jsplquality.jindalsteel.com/arogyaImage/';

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
          ` <div class="row align-items-center temp-bp mx-2" style="width:350px">
                    <div class="col-md-6 col-sm-6"  style="width:auto;">
                        <p class="mb-0"><b>Body Temperature - </b>` +
          b.temperature +
          ` F</p>
                    </div>
                    <div class="col-md-6 col-sm-6"  style="width:auto;">
                        <p class="mb-0"  style="width:auto"><b>Blood Pressure - </b>` +
          b.BPDiastolic +
          `/` +
          b.BPSystolic +
          ` mmHg</p>
                    </div>
                </div>
                <p class="examin mb-0 mx-1" style="padding: 0 1.2rem;"><b>Examination notes - </b>` +
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
                                    <td><p class="mb-0"><b>` +
            c[i].medicineName +
            ` (<i>` +
            c[i].medicineType +
            `)</i></b></p>
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
.entire-webpage{
        zoom: 2;
        transform: scale(2); /* Standard Property */
        transform-origin: 0 0;  /* Standard Property */
    }
body {
  justify-content:center;
   // add prefixed versions too.
}

.container{
  margin: 0 auto;
}

img{
    object-fit: cover;
}
.px-logo{
    width: auto;
    height: 70px;
}
.prescription{
    //background:url( "` +
    imageURL +
    'bg.png' +
    `");
    background-attachment: scroll;
    //background-repeat: no-repeat;
    background-position: auto;
    //background-size: auto;
    padding: 0.5rem;
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
    font-size: 11px;
    color: rgba(0,0,0,0.75);
    padding: 0.75rem 1.2rem 0;
}
.temp-bp, .examin{
    line-height: 18px;
    font-family: Scandia;
    font-style: normal;
    font-size: 10px;
    justify-content: space-evenly;
    color: rgba(0,0,0,0.5);
}
 .center {
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width:350px;

}
.rx{
    width: 18px;
    height: 13px;
   
    
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
        
        justify-content:center;
    }
    
}
</style>

<body class="entire-webpage"  >

    <div class="container my-5" >
        <div class="row" >
            <div class="col-md-12 prescription" >
                <div>
                    <img src="` +
    imageURL +
    'logo@2x.png' +
    `" alt="logo" class="px-logo mx-2">
                </div>
                <div class="row align-items-baseline mx-2" style="width:350px">
                    <div class="col-md-6 col-sm-6" style="">
                        <h2 class="dr-nme mb-0"><b>` +
    doctorName +
    `</b></h2>
                        ` +
    doctorEducationDisp +
    `
                    </div>
                    <div class="col-md-6 col-sm-6" style="">
                        <p class="dr-address">Add: D-113 Near Phase 1<br>Metro Gurgaon, Haryana-121001</p>
                        
                    </div>
                </div>
                <div class="center">
                <img src="` +
    imageURL +
    'rx.png' +
    `" alt="rx" class="rx">
    </div>
                <div class="row align-items-baseline mx-2 py-2" style="background-color: rgba(240,250,255,1);width:350px";>
                    <div class="col-md-6 col-sm-6" style="width:350px">
                        <p class="p-nme mb-0"><b>Name:</b> Rohan Kumar</p>
                        <p class="p-ag"><b>Age/Gender:</b> M/40</p>
                    </div>
                    <div class="col-md-6 col-sm-6" style="width:350px">
                        <p class="date"><b>Date :</b>` +
    dayjs(JSON.stringify(new Date().getDate()).substring(0, 11)).format(
      'DD-MM-YYYY',
    ) +
    `</p>
                        <p class="p-id"><b>Patient ID:</b> R21DY768F2</p>
                    </div>
                </div>
                <p class="mb-0 complaints"><b><u>Chief Complaints :  </u></b>` +
    cheifComplaintsDisplay +
    `</p>
               ` +
    Examination +
    `
                <p class="mb-1 complaints"><b><u>Diagnosis : </u></b>` +
    Diagnosis +
    `</p>
                <div class="row align-items-center mx-2">
                    <div class="col-md-12">
                        <table style="">
                            <thead>
                                <tr>
                                    <th width="30px">S.No</th>
                                    <th width="150px">Medicine Name</th>
                                    <th width="140px">Instructions</th>
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
                <p class="complaints " ><b><u>Investigation :</u></b><br>` +
    Investigation +
    `</p>
              <p class="complaints" ><b><u>Follow-Up Date : </u></b>` +
    FollowUpDate +
    `
<p class="mb-1 complaints pt-0" style="margin-left:250px" >- ` +
    doctorName +
    `</p>   
                
            </div>
        </div>
    </div>
    
</body>

</html>`;

  let generatePdf = async () => {
    setshowPdf(false);
    let options = {
      html: html,
      fileName: 'prescription' + JSON.stringify(new Date().getDate()),
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
              textAlign: 'center',
              fontSize: 18,
              color: 'white',
              padding: 10,
              backgroundColor: 'black',
              width: '100%',
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
                backgroundColor: '#e8f0fe',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 300,
              }}
            />
          ) : null}
          <Button title="Generate PDF" onPress={generatePdf} />
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
