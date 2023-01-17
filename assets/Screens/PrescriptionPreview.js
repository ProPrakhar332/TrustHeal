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
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

//icons
import waiting from '../Animations/waiting1.gif';
import logo from '../PrescriptionTemplate/logo.png';
import bg from '../PrescriptionTemplate/bg.png';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import upload from '../Animations/upload.gif';

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
  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');
  const [patientName, setpatientName] = useState('');
  const [consultationId, setconsultationId] = useState(null);
  const [patientID, setpatientID] = useState('');
  const [prescriptionPath, setprescriptionPath] = useState('');
  const [patientObj, setpatientObj] = useState([]);
  const [patientAge, setpatientAge] = useState('');
  const [isUploading, setisUploading] = useState(false);

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
      let h = JSON.parse(await AsyncStorage.getItem('PrescriptionFor'));
      // console.log('=============Patient obj===============');

      //console.log(h);
      if (h != null) {
        setpatientObj(h);
        setclinicName(h.clinicName);
        setclinicAddress(h.clinicAddress);
        setpatientID(h.patientDet.patientId);
        setconsultationId(h.consultationId);
        setpatientName(h.patientDet.patientName);
        setpatientAge(h.patientDet.age);
      }
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
          ` <div style="display: flex;margin-left:5%;width:90%;margin-top:5px;margin-bottom:5px" >
                    <div  style="flex:50%">
                        <p class="p-nme mb-0"><b>Body Temperature - </b>` +
          b.temperature +
          ` F</p>
                    </div>
                    <div  style="flex:50%">
                        <p class="p-nme mb-0"  ><b>Blood Pressure - </b>` +
          b.BPDiastolic +
          `/` +
          b.BPSystolic +
          ` mmHg</p>
                    </div>
                </div>
                <p class="p-nme mb-0" style="padding: 0 1.2rem;"><b>Examination notes - </b>` +
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
      if (e != null) {
        let tempAd = '';
        for (var i = 0; i < e.length; ++i) {
          tempAd += e[i].advice.substring(0, e[i].advice.length) + ',';
        }

        setAdvice(tempAd.substring(0, tempAd.length - 1));
      }
      //setting follow up date
      setFollowUpDate(f != null ? f : null);
      //setting diagnosis
      setDiagnosis(g != null ? g.substring(1, g.length - 1) : null);
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
          `<h6 class="dr-designation">` +
          doctorEducationRaw[i].degree +
          ` ` +
          doctorEducationRaw[i].specialization +
          `</h6>`;
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<style>
.entire-webpage{
        zoom: 1.5;
       // transform: scale(2); /* Standard Property */
        //transform-origin: 0 0;  /* Standard Property */
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
    background:url( "` +
    imageURL +
    'bg.png' +
    `");
    background-attachment: scroll;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    padding: 0.5rem;
    background-color: #fff;
    padding-bottom: 3.5rem;
}
.dr-nme{
    line-height: 20px;
    font-family: Scandia;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: rgba(0,0,0,1);
}
.dr-designation{
    font-family: Scandia;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
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
    font-size: 13px;
    color: rgba(0,0,0,0.75);
}
.complaints{
    line-height: 15px;
    font-family: Scandia;
    font-style: normal;
    font-size: 15px;
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

}
.rx{
    width: 18px;
    height: 13px;
   
    
}
table, th, td {
    border: 1px solid rgba(182,182,182,1);
    border-collapse: collapse;
    line-height: 20px;
    font-size: 12px;
    background: #fff;
    padding: 0 15px 0;
}
th{
    background: rgba(43,144,220,1);
    color: #fff;
    font-weight: 400;
    text-align: center;
}
// @media only screen and (min-width: 320px) and (max-width: 480px){
//     .col-sm-6{
        
//         justify-content:center;
//     }
    
// }
</style>

<body class="entire-webpage"  >

    <div class="container" >
        <div class="row mx-auto justify-content-center" >
            <div class="col-md-12 prescription" >
                <div>
                    <img src="` +
    imageURL +
    'logo@2x.png' +
    `" alt="logo" class="px-logo mx-2">
                </div>
                <div style="display: flex;margin-left:5%;width:95%">
                    <div  style="flex:50%;">
                        <h2 class="dr-nme mb-0"><b>` +
    doctorName +
    `</b></h2>
                   <div style="flex-direction:column">     ` +
    doctorEducationDisp +
    `</div>
                    </div>
                    <div   style="flex:50%;">
                        <p class="p-ag"> ${clinicName} <br> ${clinicAddress}</p>
                        
                    </div>
                </div>
                
                <div style="display: flex;background-color: rgba(240,250,255,1);margin-left:5%;width:92.5%">
                    <div style="display:block; flex:50%">
                        <p class="p-nme mb-0"><b>Name:</b>${patientName}</p>` +
    (patientAge != undefined
      ? `<p class="p-ag"><b>Age:</b>${patientAge}</p>`
      : ``) +
    `
                        
                    </div>
                    <div style="display:block; flex:50%">
                        <p class="p-nme mb-0"><b>Date :</b>` +
    dayjs(new Date()).format('DD-MM-YYYY') +
    `</p>
                        <p class="p-nme mb-0"><b>Patient ID:</b> ${patientID}</p>
                    </div>
                </div>
                <p class="mb-0 complaints"><b><u>Chief Complaints</u> :-  </b>` +
    cheifComplaintsDisplay +
    `</p>
               ` +
    Examination +
    `
                <p class="mb-1 complaints"><b><u>Diagnosis</u> :-  </b>` +
    Diagnosis +
    `</p>
    <div class="center">
                <img src="` +
    imageURL +
    'rx.png' +
    `" alt="rx" class="rx">
    </div>
                <div class="row align-items-center mx-2">
                    <div class="col-md-12">
                        <table style="width: 100%;">
                            <thead>
                                <tr>
                                    <th width="10%">S.No</th>
                                    <th width="40%">Medicine Name</th>
                                    <th width="50%">Instructions</th>
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
                <h2 class="mb-1 complaints" ><b><u>Investigation</u> :-  </b>` +
    Investigation +
    `</h2>
     <h2 class="mb-1 complaints" ><b><u>Advice</u> :-  </b>` +
    Advice +
    `</h2>
              <p class="mb-1 complaints" ><b><u>Follow-Up Date</u> :-   </b>` +
    FollowUpDate +
    `
 
                
            </div>
        </div>
    </div>
    
</body>

</html>`;

  useEffect(() => {
    if (
      cheifComplaints != null &&
      Diagnosis != null &&
      Prescription != null &&
      Advice != null &&
      FollowUpDate != null &&
      doctorName != null &&
      doctorEducationDisp != null
    )
      generatePdf();
  }, [
    cheifComplaints,
    Diagnosis,
    Prescription,
    Advice,
    FollowUpDate,
    doctorName,
    doctorEducationDisp,
  ]);

  let generatePdf = async () => {
    setisLoading(true);
    setshowPdf(false);
    let options = {
      html: html,
      fileName:
        patientName +
        '_prescription_' +
        JSON.stringify(dayjs(new Date()).format('DD-MM-YYYY')),
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    console.log(file);
    setfilePdf(file);
    setshowPdf(true);
    setisLoading(false);
    //alert(file.filePath);
  };

  const uploadPres = async () => {
    try {
      console.log('==============Inside select Docs==========');

      filePdf.name =
        patientID +
        '_' +
        patientName +
        '_PATIENT_PRESCRIPTION' +
        JSON.stringify(dayjs(new Date()).format('DD-MM-YYYY')) +
        '.pdf';
      console.log(filePdf.name);
      //setMedRegDoc([pickerResult]);

      let formData = new FormData();
      formData.append('directoryNames', 'PATIENT_PRESCRIPTION');
      formData.append('file', filePdf);
      const {error, response} = await fileUpload(formData);

      if (error != null) {
        console.log('======error======');
        console.log(error);
        Alert.alert(
          'Error',
          'There was a problem in selecting document. Please try again.',
        );
      } else {
        console.log('======response======');
        console.log(response.path);
        setprescriptionPath(response.path);
      }
    } catch (e) {
      setisUploading(false);
      console.log('Uploading error');
      Alert.alert('Error', `${e}`);
    }
  };

  const onPressUpload = async () => {
    setisUploading(true);

    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/consultation/complete/status/update?consultationid=' +
          consultationId +
          '&prescription=' +
          prescriptionPath,
      )
      .then(async function (response) {
        setisUploading(false);
        if (response.status == 200) {
          await AsyncStorage.multiRemove(
            'CheifComplaint',
            'Examination',
            'Prescription',
            'Investigation',
            'Advice',
            'Diagnosis',
            'FollowUpDate',
            'PrescriptionFor',
          );
          Alert.alert(
            'Successful',
            `Prescription Uploaded successfully for ${patientName}`,
          );
          navigation.navigate('DoctorHome');
        }
      })
      .catch(function (error) {
        setisUploading(false);
        Alert.alert('Error', `${error}`);
      });
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

          {/* <CustomButton text="Show Cache Keys" onPress={show} /> */}

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
                marginVertical: 20,
              }}
            />
          ) : null}

          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'column',
              flex: 1,
              width: '95%',
            }}>
            <CustomButton
              text="Re-Generate PDF"
              textstyle={{color: 'white', fontSize: 12}}
              style={{
                borderRadius: 10,
                backgroundColor: '#2B8ADA',
                flex: 1,
              }}
              onPress={() => {
                generatePdf();
              }}
            />
            <CustomButton
              text="Upload Prescription"
              textstyle={{color: 'white', fontSize: 12}}
              style={{
                borderRadius: 10,
                backgroundColor: 'limegreen',
                flex: 1,
                marginVertical: 10,
              }}
              onPress={async () => {
                await uploadPres();
                await onPressUpload();
              }}
            />
            <CustomButton
              text="Go Back"
              textstyle={{color: '#2B8ADA', fontSize: 12}}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#2B8ADA',
                flex: 0.45,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
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
        {isUploading == true && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 20,
                width: 200,
                height: 200,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={upload}
                style={{
                  alignSelf: 'center',
                  width: 80,
                  height: 80,
                  // borderRadius: 150,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#2B8ADA',
                  fontSize: 18,
                  fontWeight: 'bold',
                  width: '100%',
                  marginVertical: 5,
                  // padding: 10,
                }}>
                {'Uploading '}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 12,
                  width: '100%',
                  paddingHorizontal: 15,
                }}>
                {'We are upating your details'}
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
