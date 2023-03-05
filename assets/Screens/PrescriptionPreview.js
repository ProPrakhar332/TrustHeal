import React, {useState, useEffect} from 'react';
import {Dimensions, PermissionsAndroid, ScrollView} from 'react-native';
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
import {moveFile, readFile, stat} from 'react-native-fs';

//icons
import waiting from '../Animations/waiting1.gif';
import logo from '../PrescriptionTemplate/logo.png';
import bg from '../PrescriptionTemplate/bg.png';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import upload from '../Animations/upload.gif';

import dayjs from 'dayjs';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

function PrescriptionPreview({navigation}) {
  const [Bp, setBp] = useState('');
  const [showPdf, setshowPdf] = useState(false);
  const [filePdf, setfilePdf] = useState();
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
  const [patientNumber, setpatientNumber] = useState('');
  const [prescriptionPath, setprescriptionPath] = useState(null);
  const [patientObj, setpatientObj] = useState([]);
  const [patientAge, setpatientAge] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const [doctorFlag, setDoctorFlag] = useState(false);

  const imageURL = 'https://jsplquality.jindalsteel.com/arogyaImage/';

  useEffect(() => {
    const loadData = async () => {
      let a = JSON.parse(await AsyncStorage.getItem('CheifComplaint'));
      let b = JSON.parse(await AsyncStorage.getItem('Examination'));
      let c = JSON.parse(await AsyncStorage.getItem('Prescription'));
      let d = JSON.parse(await AsyncStorage.getItem('Investigation'));
      let e = JSON.parse(await AsyncStorage.getItem('Advice'));
      let f = JSON.parse(await AsyncStorage.getItem('FollowUpDate'));
      let g = await AsyncStorage.getItem('Diagnosis');
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      let h = JSON.parse(await AsyncStorage.getItem('PrescriptionFor'));
      // console.log('=============Patient obj===============');

      //console.log(h);
      if (h != null) {
        setpatientObj(h);
        setclinicName(h.clinicName);
        setclinicAddress(h.clinicAddress);
        setpatientID(h.patientId);
        setpatientNumber(h.patientNo);
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
          b.BPSystolic +
          `/` +
          b.BPDiastolic +
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
            ` day(s)</p></td>
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
      setDoctorFlag(true);
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
    (patientAge != undefined && patientAge != 0
      ? `<p class="p-ag"><b>Age:</b>${patientAge}</p>`
      : ``) +
    `
                        
                    </div>
                    <div style="display:block; flex:50%">
                        <p class="p-nme mb-0"><b>Date :</b>` +
    dayjs(new Date()).format('DD-MM-YYYY') +
    `</p>
                        <p class="p-nme mb-0"><b>Mobile Number:</b> ${patientNumber}</p>
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
    dayjs(FollowUpDate).format('DD-MMM-YYYY') +
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
      doctorFlag == true
    )
      stackOverflowPDF();
  }, [
    cheifComplaints,
    Diagnosis,
    Prescription,
    Advice,
    FollowUpDate,
    doctorName,
    doctorFlag,
  ]);

  // const fRequestAndroidPermission = async () => {
  //   // Refer to https://reactnative.dev/docs/permissionsandroid for further details on permsissions
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'App1 Permission Request',
  //         message:
  //           'App1 needs access to your storage so you can save files to your device.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('permission is granted');
  //       return true;
  //     } else {
  //       console.log('permission denied');
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error('fRequestAndroidPermission error:', err);
  //     return false;
  //   }
  // };

  // const createPDF = async () => {
  //   setisLoading(true);
  //   setshowPdf(false);
  //   let options = {
  //     html: html,
  //     fileName: patientID + '_prescription_' + dayjs().format('YYYYMMDDHmmss'),
  //     directory: 'Download', // replace 'Documents' with 'Download' - I am not sure if it works on iOS!
  //   };

  //   if (Platform.OS === 'android') {
  //     const permissionGranted = await fRequestAndroidPermission();
  //     if (!permissionGranted) {
  //       console.log('access was refused');
  //       return;
  //     }
  //   }

  //   let file = await RNHTMLtoPDF.convert(options);
  //   console.log(file);
  //   setfilePdf(file);
  //   //await uploadPres(file);
  //   setshowPdf(true);
  //   setisLoading(false);
  // };

  // const uploadPres = async file => {
  //   try {
  //     let statResult = await stat(file.uri);

  //     console.log('==================statResult=================');

  //     console.log(statResult);

  //     file.uri = statResult.path;
  //     file.size = statResult.size;
  //     file.type = 'application/pdf';

  //     console.log(
  //       '\n\n==============File PDF inside upload====================\n\n',
  //     );

  //     // filePdf.uri =
  //     //   'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2F' +
  //     //   filePdf.name;
  //     // filePdf.uri = `${RNFS.DownloadDirectoryPath}/Arogya/${fileP}`;

  //     console.log(file);

  //     // let x = {
  //     //   name: 'testing.pdf',
  //     //   size: 111384,
  //     //   type: 'application/pdf',
  //     //   uri: 'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2F7_prescription_20230118173248.pdf',
  //     // };

  //     let formData = new FormData();
  //     formData.append('directoryNames', 'PATIENT_PRESCRIPTION');
  //     formData.append('file', file);
  //     const {error, response} = await fileUpload(formData);

  //     if (error != null) {
  //       console.log('======error======');
  //       console.log(error);
  //       Alert.alert(
  //         'Error',
  //         'There was a problem in selecting document. Please try again.',
  //       );
  //     } else {
  //       console.log('======response of prescription preview======');
  //       console.log(response);
  //       if (response != undefined) {
  //         setprescriptionPath(response.path);
  //         setisLoading(false);

  //       }
  //     }
  //   } catch (e) {
  //     setisUploading(false);
  //     console.log('Uploading error', e);
  //     Alert.alert('Error', `${e}`);
  //   }
  // };

  //pdf  generator
  let stackOverflowPDF = async () => {
    setisLoading(true);
    let options = {
      html: html,
      fileName:
        patientNumber + '_prescription_' + dayjs().format('YYYYMMDDHHmmss'),
      directory: 'docs',
    };

    let file = await RNHTMLtoPDF.convert(options);
    const destinationPath = RNFS.CachesDirectoryPath;
    console.log('\n\n++++++   DEstination Path   ++++\n', destinationPath);
    const FileName = file.filePath.split('/').pop();
    file.name = FileName;
    const destinationFile = destinationPath + '/' + FileName;
    //file.uri = destinationFile;
    file.uri = 'file://' + destinationFile;

    await RNFS.copyFile(file.filePath, destinationFile)
      .then(result => {
        // Delete a file on the project path using RNFS.unlink
        return (
          RNFS.unlink(file.filePath)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch(err => {
              console.log(err.message);
            })
        );
      })
      .catch(err => {
        console.log('err', err);
      });
    console.log(
      '\n\n=============== FILE CREATED ======================\n\n',
      file,
    );
    setfilePdf(file);
    setshowPdf(true);
    setisLoading(false);
    Alert.alert('Done', 'Prescription file has been created!');
  };
  const uploadPres = async () => {
    try {
      setisUploading(true);
      let statResult = await stat(filePdf.uri);

      console.log('==================statResult=================');

      console.log(statResult);

      filePdf.uri = statResult.path;
      filePdf.size = statResult.size;
      filePdf.type = 'application/pdf';

      console.log(
        '\n\n==============File PDF inside upload====================\n\n',
      );
      console.log(filePdf);

      // let x = {
      //   name: 'testing.pdf',
      //   size: 111384,
      //   type: 'application/pdf',
      //   uri: 'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2F7_prescription_20230118173248.pdf',
      // };

      let formData = new FormData();
      formData.append('directoryNames', 'PATIENT_PRESCRIPTION');
      formData.append('file', filePdf);
      formData.append('userId', doctorId);
      const {error, response} = await fileUpload(formData);

      if (error != null) {
        console.log('======error======');
        console.log(error);
        Alert.alert(
          'Error',
          'There was a problem in selecting document. Please try again.',
        );
      } else {
        console.log('======response of prescription preview======');
        console.log(response);
        if (response != undefined) {
          setprescriptionPath(response.fileToken);
          completeConsultationStatusUpdate(response.fileToken);
          // Alert.alert(
          //   'Success',
          //   'Prescription has been uploaded successfully!',
          // );
        }
      }
    } catch (e) {
      setisUploading(false);
      console.log('Uploading error', e);
      Alert.alert('Error', `File Uploading Error.\n ${e}`);
    }
  };

  const completeConsultationStatusUpdate = async path => {
    //console.log(FollowUpDate);

    let p = {
      consultationId: consultationId,
      doctorName: doctorName,
      followUpDate: dayjs(FollowUpDate).format('YYYY-MM-DD'),
      patientId: patientID,
      patientName: patientName,
      prescription: path,
    };

    console.log();
    axios
      .post(apiConfig.baseUrl + '/doctor/consultation/status/complete', p)
      .then(async function (response) {
        setisUploading(false);
        if (response.status == 200) {
          Alert.alert(
            'Success',
            `Your Consultation with ${patientName} has been completed.`,
          );
          navigation.navigate('DoctorHome', {
            doctorObj: JSON.stringify(
              await AsyncStorage.getItem('UserDoctorProfile'),
            ),
          });
        }
      })
      .catch(error => {
        setisUploading(false);
        Alert.alert(
          'Status Update Error',
          `Error occured in updating status of completion.${error}`,
        );
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
            <View>
              <Pdf
                source={{uri: filePdf.uri}}
                style={{
                  backgroundColor: '#e8f0fe',
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height - 300,
                  marginVertical: 20,
                }}
              />
              {/* <Text
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                File Name:- {filePdf.name}
              </Text> */}
            </View>
          ) : null}

          <View
            style={{
              marginTop: 10,
              alignSelf: 'center',
              flexDirection: 'column',
              flex: 1,
              width: '90%',
            }}>
            {/* <CustomButton
              text="Re-Generate PDF"
              textstyle={{color: 'white', fontSize: 12}}
              style={{
                borderRadius: 10,
                backgroundColor: '#2B8ADA',
                flex: 1,
              }}
              onPress={() => {
                // generatePdf();
                //createPDF();
                stackOverflowPDF();
              }}
            /> */}

            <CustomButton
              text="Upload Prescription"
              textstyle={{color: 'white', fontSize: 12, fontWeight: 'bold'}}
              style={{
                borderRadius: 10,
                backgroundColor: '#17CC9C',
                flex: 1,
                marginVertical: 10,
              }}
              onPress={async () => {
                // console.log(
                //   await stat(filePdf.filePath).then(function (response) {
                //     console.log(response);
                //   }),
                // );
                //await onPressUpload();

                await uploadPres();
                // console.log(FollowUpDate);
                // console.log(dayjs(FollowUpDate).format('YYYY-MM-DD'));
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
