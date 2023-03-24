import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  useWindowDimensions,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-option-menu';
import apiConfig, {fileUpload} from '../API/apiConfig';

//images
import doctor_m from '../Resources/doctor_m.png';
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';
import doctor_f from '../Resources/doctor_f.jpg';
import CustomButton from '../Components/CustomButton';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';
import waiting from '../Animations/waiting1.gif';
import DocumentViewer from '../Components/DocumentViewer';
import Pdf from 'react-native-pdf';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

function MyAppointment({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [upcomingActive, setupcomingActive] = useState(true);
  const [completedActive, setcompletedActive] = useState(false);
  const [UpcomingData, setUpcomingData] = useState([]);
  const [CompletedData, setCompletedData] = useState([]);
  const [rescheduleModal, setrescheduleModal] = useState(false);
  const [doctorItem, setDoctorItem] = useState(null);
  const [patientDet, setpatientDet] = useState(null);

  const [showDocumentViewer, setshowDocumentViewer] = useState(false);
  const [docsModal, setdocsModal] = useState(false);
  const [docsList, setdocsList] = useState(null);
  const [quesAnsModal, setquesAnsModal] = useState(false);
  const [QuestionnaireList, setQuestionnaireList] = useState(null);
  const [editQuestions, seteditQuestions] = useState(false);
  const [editDocs, seteditDocs] = useState(false);
  const [consultationId, setconsultationId] = useState(null);
  const [doctorId, setdoctorId] = useState(null);
  const [documentPath, setdocumentPath] = useState(null);
  const [documentName, setdocumentName] = useState(null);
  const [fileName, setfileName] = useState('');
  const [fileToken, setfileToken] = useState(null);
  const [uploadDocsList, setuploadDocsList] = useState([]);

  const [PrescriptionModal, setPrescriptionModal] = useState(false);
  const [prescriptionId, setprescriptionId] = useState(false);
  const [zoom, setZoom] = useState(1);

  const onZoomIn = () => {
    if (zoom < 2.5) setZoom(zoom + 0.25);
  };
  const onZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.25);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && patientDet != null) {
      //Update the state you want to be updated
      getUpcoming();
      getCompleted();
    }
  }, [isFocused, patientDet]);

  useEffect(() => {
    const LoadData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      setpatientDet(x);
      console.log(x);
    };
    LoadData();
  }, []);

  // useEffect(() => {
  //   if (patientDet != null) {
  //     getUpcoming();
  //   }
  // }, [patientDet]);
  const getUpcoming = async () => {
    setisLoading(true);
    await axios
      .get(
        apiConfig.baseUrl +
          '/patient/upcoming/consultations?patientId=' +
          patientDet.patientId,
      )
      .then(function (response) {
        console.log(
          '\n=========================== UPCOMING CONSULTATIONS ====================================\n',
        );
        console.log(response.data);
        if (response.status == 200) {
          setisLoading(false);
          setUpcomingData(response.data);
          //setUpcomingData(UpcomingServiceResponse);
        }
      })
      .catch(error => {
        Alert.alert('Error Upcoming', `${error}`);
      });
    setisLoading(false);
  };

  // useEffect(() => {
  //   if (patientDet != null) {
  //     getCompleted();
  //   }
  // }, [patientDet]);
  const getCompleted = async () => {
    setisLoading(true);
    await axios
      .get(
        apiConfig.baseUrl +
          '/patient/complete/consultations?max=5&min=0&patientId=' +
          patientDet.patientId,
      )
      .then(function (response) {
        console.log(
          '\n=========================== COMPLETED CONSULTATIONS ====================================\n',
        );
        console.log(response.data);
        if (response.status == 200) {
          setisLoading(false);
          setCompletedData(response.data);
          //setCompletedData(CompletedServiceResponse);
        }
      })
      .catch(error => {
        Alert.alert('Error Completed', `${error}`);
      });
    setisLoading(false);
  };

  const onJoinPress = (
    consultationType,
    callID,
    userID,
    userName,
    userType,
  ) => {
    navigation.navigate('CallAgora', {
      consultationType: consultationType,
      callID: callID,
      userID: userID,
      userName: userName,
      userType: userType,
    });
  };

  const downloadCache = async (fileToken, userId, fileName) => {
    // let op = {};
    // if (Platform.OS == 'ios') op = {NSURLIsExcludedFromBackupKey: true};
    // await RNFS.mkdir(`file://${RNFS.DownloadDirectoryPath}/Arogya`, op);
    let filePath = `file://${RNFS.CachesDirectoryPath}/`;
    let options = {
      fromUrl:
        apiConfig.baseUrl +
        '/file/download?fileToken=' +
        fileToken +
        '&userId=' +
        userId,
      toFile: filePath + fileName,
    };
    await RNFS.downloadFile(options)
      .promise.then(response => {
        console.log(response);
        if (response.statusCode == 200) {
          //  Alert.alert(
          //   'File Downloaded',
          //   `The file is downloaded. File name is ${fileName}.`,
          // );
          setprescriptionId(filePath + fileName);
          setdocumentName(fileName);
        } else if (response.statusCode == 204)
          Alert.alert('Sorry', 'The file does not exist');
        else
          Alert.alert(
            'Download Fail',
            `Unable to download file. ${response.statusCode}`,
          );
      })
      .catch(e => {
        Alert.alert('Error', `${e}`);
      });
  };
  const getFiles = async id => {
    let Quesflag = 1;
    let Docsflag = 1;
    await axios
      .get(apiConfig.baseUrl + '/docs/current/uploaded?consultationId=' + id)
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          if (
            response.data.documents == undefined ||
            response.data.documents == ''
          )
            Docsflag = 0;
          else setdocsList(response.data.documents);

          if (response.data.quesAns == undefined || response.data.quesAns == '')
            Quesflag = 0;
          else setQuestionnaireList(response.data.quesAns);
        }
      })
      .catch(error => {
        Alert.alert('Error', `Error in fetching docs and ques.\n${error}`);
      });
    let p = [];
    p.push(Docsflag);
    p.push(Quesflag);
    return p;
  };
  const getQuestions = async (id, consultationId) => {
    await axios
      .get(apiConfig.baseUrl + '/patient/doctor/questions?doctorId=' + id)
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          //setdocsList(response.data.documents);
          let temp = response.data;
          temp.forEach(element => {
            element.answers = '';
            element.consultationId = consultationId;
          });
          setQuestionnaireList(temp);
        }
      })
      .catch(error => {
        Alert.alert('Error', `Error in fetching docs and ques.\n${error}`);
      });
  };
  const saveQuestions = async () => {
    const temp = JSON.parse(JSON.stringify(QuestionnaireList));
    let clone = [];
    temp.forEach(element => {
      delete element.question;
      if (element.answers != '') clone.push(element);
    });
    console.log(
      '=============  Ques answer save  =====================\n',
      clone,
    );
    if (clone.length > 0) {
      await axios
        .post(
          apiConfig.baseUrl + '/patient/consultation/question/answer/save',
          clone,
        )
        .then(response => {
          if (response.status == 200) {
            Alert.alert(
              'Done',
              'Pre-Consultation Questionnaire submitted successfully!',
            );
            seteditQuestions(false);
          }
          //setanswersUploaded(true);
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    } else
      Alert.alert(
        'Warning',
        'You have not answered any question. Please answer them or press cancel.',
      );
  };
  const getHistory = async () => {
    await axios
      .get(
        apiConfig.baseUrl +
          '/docs/last/uploaded?patientId=' +
          props.navigation.patientObj.patientId,
      )
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          setdocsList(response.data.documents);
        }
      })
      .catch(error => {
        Alert.alert('Error', `Error in fetching docs and ques.\n${error}`);
      });
  };

  const renderUpcomingConsultations = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 5,
          margin: 5,
          flexDirection: 'column',
          // width: 290,
          // height: 80,
        }}>
        {item.familyMemberName != null ? (
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                backgroundColor: '#17CC9C',
                borderRadius: 10,
                flexDirection: 'row',
                flex: 0.45,
                justifyContent: 'center',
              }}>
              <FAIcons
                name="users"
                size={15}
                color={'white'}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              />
              <Text style={{color: 'white', alignSelf: 'center', fontSize: 13}}>
                {item.familyMemberName}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
          }}>
          {/* Image */}
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              margin: 5,
              flex: 0.3,
            }}
            onPress={async () => {
              console.log(item.doctorName);
              await AsyncStorage.setItem('viewProfile', JSON.stringify(item));
              console.log(
                '======================== All Upcoming ====================================',
                item,
              );
              navigation.navigate('DoctorDetails');
            }}>
            <Image
              source={
                item.photoPath == 0
                  ? defaultDoctor
                  : {
                      uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.photoPath}&userId=${item.doctorId}`,
                    }
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          {/* Details */}
          <View
            style={{flex: 0.6, justifyContent: 'space-evenly', marginLeft: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {item.doctorName}
            </Text>
            {/* <Text style={{fontSize: 12, color: 'gray'}}>
          {item.specialization}
        </Text> */}
            <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>
              {item.specialization.map(index => {
                return item.specialization.indexOf(index) !=
                  item.specialization.length - 1
                  ? index + ', '
                  : index;
              })}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <FAIcons
                name={
                  item.consultationType == 'PHYSICAL'
                    ? 'users'
                    : item.consultationType == 'PHONE_CALL'
                    ? 'phone-alt'
                    : 'video'
                }
                color={'#2b8ada'}
                size={12}
                solid={false}
                style={{
                  alignSelf: 'center',
                  marginRight: 5,
                }}
              />
              <Text style={{fontSize: 12, color: '#2B8ADA'}}>
                {item.consultationType == 'PHYSICAL'
                  ? 'P-Consultation'
                  : 'E-Consultation'}
              </Text>
            </View>

            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12}}>
                  {item.clinicName + ' | ' + item.clinicAddress}
                </Text>
              </View>
            ) : null}

            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              {timeformatter(item.slotStartTime)}
              {'  |  '}
              {dayjs(item.slotDate).format('DD-MMM-YY')}
            </Text>
            {/* <View style={{flexDirection: 'row', marginVertical: 3}}>
              {item.slotStartTime == dayjs().format('HH:mm') ? (
                <TouchableOpacity
                  style={{
                    padding: 5,
                    backgroundColor: '#2B8ADA',
                    borderRadius: 5,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 12, marginLeft: 5, color: 'white'}}>
                    Consult Now
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View> */}
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'column',
            marginVertical: 5,
            width: '95%',
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {/* Files */}
            <TouchableOpacity
              style={[
                {
                  flex: 0.45,
                  flexDirection: 'row',
                  padding: 3,
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#000080',
                  borderRadius: 5,
                },
              ]}
              onPress={async () => {
                setconsultationId(item.consultationId);
                let p = await getFiles(item.consultationId);
                setdocsModal(true);
              }}>
              <FAIcons
                name="file-pdf"
                color={'#000080'}
                size={15}
                style={{marginRight: 5, alignSelf: 'center'}}
              />
              <Text style={{fontSize: 12, color: '#000080'}}>Files</Text>
            </TouchableOpacity>

            {/* Preconsultation QuestionAnswers */}
            <TouchableOpacity
              style={[
                {
                  flex: 0.45,
                  flexDirection: 'row',
                  padding: 3,
                  paddingHorizontal: 5,
                  borderWidth: 1,
                  borderColor: '#2b8ada',
                  borderRadius: 5,
                  justifyContent: 'center',
                },
              ]}
              onPress={async () => {
                setconsultationId(item.consultationId);
                let p = await getFiles(item.consultationId);
                if (p[1] == 0) {
                  //await getQuestions(item.doctorId, item.consultationId);
                  setconsultationId(item.consultationId);
                  setdoctorId(item.doctorId);
                  seteditQuestions(false);
                  setquesAnsModal(true);
                } else {
                  setquesAnsModal(true);
                }
                //setdocsModal(true);
              }}>
              <MIcons
                name="message-reply-text-outline"
                color={'#2b8ada'}
                size={15}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#2b8ada'}}>
                Questionnaire
              </Text>
            </TouchableOpacity>
          </View>

          {item.consultationType != 'PHYSICAL' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 7,
              }}>
              {/* Consult Now */}

              <TouchableOpacity
                style={{
                  flex: 0.45,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: 3,
                  paddingHorizontal: 5,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#2b8ada',
                  backgroundColor: '#2b8ada',
                  borderRadius: 5,
                }}
                onPress={() => {
                  let p =
                    item.familyMemberName != null
                      ? item.familyMemberName
                      : item.patientName;

                  onJoinPress(
                    item.consultationType,
                    item.consultationId + '',
                    patientDet.patientId + '',
                    p,
                    'Patient',
                  );
                }}>
                <FAIcons
                  name={
                    item.consultationType == 'PHYSICAL'
                      ? 'users'
                      : item.consultationType == 'PHONE_CALL'
                      ? 'phone-alt'
                      : 'video'
                  }
                  color={'white'}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={{fontSize: 12, color: 'white'}}>Consult</Text>
              </TouchableOpacity>

              {/* Reschedule */}
              {/* <TouchableOpacity
                style={{
                  flex: 0.45,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: 3,
                  paddingHorizontal: 5,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#17CC9C',
                  backgroundColor: '#17CC9C',
                  borderRadius: 5,
                }}
                onPress={() => {
                  //item.consultationType == 'PHONE_CALL' ? 'phone-alt' : 'video';
                  setDoctorItem(item);
                  Alert.alert(
                    'Reschedule',
                    `Are you sure you want to reschedule your consultation with ${item.doctorName}`,
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          let temp = item;
                          temp.isReschedule = true;
                          console.log(
                            '============GOING FOR RESCHEDULE=============\n',
                            temp,
                          );
                          await AsyncStorage.setItem(
                            'bookSlot',
                            JSON.stringify(temp),
                          );
                          navigation.navigate('SelectSlotsE');
                        },
                      },
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                    ],
                  );
                  //setrescheduleModal(true);
                }}>
                <FAIcons
                  name="calendar-alt"
                  color={'white'}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={{fontSize: 12, color: 'white'}}>Re-Schedule</Text>
              </TouchableOpacity> */}

              {/* Cancel Booking */}
              <TouchableOpacity
                style={[
                  {
                    flex: 0.45,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    padding: 3,
                    paddingHorizontal: 5,
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderRadius: 5,
                    justifyContent: 'center',
                  },
                ]}
                onPress={async () => {
                  Alert.alert(
                    'Cancel Booking',
                    `Are you sure you want to cancel your appointment with ${item.doctorName}`,
                    [
                      {
                        text: 'ok',
                        onPress: async () => {
                          let p = {
                            cancelationReason: 'cancel',
                            //clinicId: 0,
                            consultationId: item.consultationId,
                            consultationType: item.consultationType,
                            doctorId: item.doctorId,
                            doctorName: item.doctorName,
                            //patientEmail: patientDet.email,
                            patientId: patientDet.patientId,
                            patientName: patientDet.patientName,
                            slotDate: item.slotDate,
                            slotEndTime: item.slotEndTime,
                            slotId: item.slotId,
                            slotStartTime: item.slotStartTime,
                          };
                          if (item.clinicId != null) p.clinicId = item.clinicId;
                          if (patientDet.email != null)
                            p.patientEmail = patientDet.email;
                          await axios
                            .post(
                              apiConfig.baseUrl +
                                '/patient/consultation/cancel',
                              p,
                            )
                            .then(response => {
                              if (response.status == 200)
                                Alert.alert(
                                  'Canceled',
                                  `Your booking with ${item.doctorName} has been canceled`,
                                  [
                                    {
                                      text: 'ok',
                                      onPress: async () => {
                                        await getUpcoming();
                                      },
                                    },
                                  ],
                                );
                            })
                            .catch(error => {
                              Alert.alert('Error', `${error}`);
                            });
                        },
                      },
                      {
                        text: 'cancel',
                      },
                    ],
                  );
                }}>
                <MIcons
                  name="close"
                  color={'white'}
                  size={15}
                  style={{alignSelf: 'center', marginRight: 5}}
                />
                <Text style={{fontSize: 12, color: 'white'}}>
                  Cancel Booking
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <TouchableOpacity
            style={[
              {
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 5,
                borderWidth: 1,
                borderColor: 'red',
                // backgroundColor: 'red',
                borderRadius: 5,
                justifyContent: 'center',
                marginTop: 8,
              },
            ]}
            onPress={async () => {
              Alert.alert(
                'Cancel Booking',
                `Are you sure you want to cancel your appointment with ${item.doctorName}`,
                [
                  {
                    text: 'ok',
                  },
                  {
                    text: 'cancel',
                  },
                ],
              );
            }}>
            <MIcons
              name="close"
              color={'red'}
              size={15}
              style={{alignSelf: 'center', marginRight: 5}}
            />
            <Text style={{fontSize: 12, color: 'red'}}>Cancel Booking</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const renderCompleted = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 5,
          margin: 5,
          flexDirection: 'column',
          // width: 290,
          // height: 80,
        }}
        key={item.consultationId}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
          }}>
          {/* Image */}
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              margin: 5,
              marginRight: 10,
              flex: 0.3,
            }}
            onPress={async () => {
              console.log(item.doctorName);
              await AsyncStorage.setItem('viewProfile', JSON.stringify(item));
              console.log(
                '======================== All Upcoming ====================================',
                item,
              );
              navigation.navigate('DoctorDetails');
            }}>
            <Image
              source={
                item.photoPath == 0
                  ? defaultDoctor
                  : {
                      uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.photoPath}&userId=${item.doctorId}`,
                    }
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          {/* Details */}
          <View style={{flex: 0.6, justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {item.doctorName}
            </Text>
            <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>
              {item.specialization.map(index => {
                return item.specialization.indexOf(index) !=
                  item.specialization.length - 1
                  ? index + ' , '
                  : index;
              })}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <FAIcons
                name={
                  item.consultationType == 'PHYSICAL'
                    ? 'users'
                    : item.consultationType == 'PHONE_CALL'
                    ? 'phone-alt'
                    : 'video'
                }
                color={'#2b8ada'}
                size={12}
                solid={false}
                style={{
                  alignSelf: 'center',
                  marginRight: 5,
                }}
              />
              <Text style={{fontSize: 12, color: '#2B8ADA'}}>
                {item.consultationType == 'PHYSICAL'
                  ? 'P-Consultation'
                  : 'E-Consultation'}
              </Text>
            </View>

            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12}}>
                  {item.clinicName + ' | ' + item.clinicAddress}
                </Text>
              </View>
            ) : null}

            <Text style={{fontSize: 12, color: '#000080'}}>
              Paid: ₹ {item.feesAmout}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 3,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                  marginRight: 3,
                }}>
                {dayjs(item.slotDate).format('DD MMM, YYYY')} {' | '}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {timeformatter(item.slotStartTime)}
              </Text>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 5,
            width: '95%',
            alignSelf: 'center',
          }}>
          {/* Prescription */}
          <TouchableOpacity
            style={{
              flex: 0.1,
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#2b8ada',
              backgroundColor: '#2b8ada',
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={async () => {
              //console.log(item);
              await downloadCache(
                item.prescriptionPath,
                item.doctorId,
                item.consultationId + '_Prescription_' + item.slotDate + '.pdf',
              );
              setPrescriptionModal(true);
            }}>
            <FAIcons
              name="prescription"
              color={'white'}
              size={15}
              // style={{marginRight: 5}}
            />
            {/* <Text style={{fontSize: 13, color: 'white'}}>Prescription</Text> */}
          </TouchableOpacity>
          {/* Invoice */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#17CC9C',
              backgroundColor: '#17CC9C',
              borderRadius: 5,
            }}
            onPress={() => {
              // sethistoryId(
              //   item.familyId != null ? item.familyId : item.patientId,
              // );
              // setHistoryModal(true);
            }}>
            <FAIcons
              name="file-invoice"
              color={'white'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 13, color: 'white'}}>Invoices</Text>
          </TouchableOpacity> */}

          {/* History */}
          <TouchableOpacity
            style={{
              flex: 0.3,
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#000080',
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={async () => {
              setconsultationId(item.consultationId);
              let p = await getFiles(item.consultationId);
              setdocsModal(true);
            }}>
            <FAIcons
              name="file-pdf"
              color={'#000080'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 13, color: '#000080'}}>Files</Text>
          </TouchableOpacity>
          {/* Questionnaire */}
          <TouchableOpacity
            style={{
              flex: 0.45,
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#2b8ada',
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={async () => {
              setconsultationId(item.consultationId);
              //await getFiles(item.consultationId);
              let p = await getFiles(item.consultationId);
              seteditQuestions(false);
              setquesAnsModal(true);
              //setdocsModal(true);
            }}>
            <MIcons
              name="message-reply-text-outline"
              color={'#2b8ada'}
              size={15}
              style={{alignSelf: 'center', marginRight: 5}}
            />
            <Text style={{fontSize: 13, color: '#2b8ada'}}>Questionnaire</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDocsList = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#e8f0fe',
          padding: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          borderRadius: 10,
          margin: 5,
        }}
        key={item.documentPath}
        onPress={async () => {
          await downloadCache(
            item.documentPath,
            patientDet.patientId,
            item.documentName,
          );
          setPrescriptionModal(true);
        }}>
        <FAIcons
          name="file-pdf"
          size={15}
          color={'black'}
          style={{alignSelf: 'center'}}
        />
        <Text style={{color: 'black'}}>{item.documentName}</Text>
        <Text style={{color: 'black'}}>
          {dayjs(item.uploadedDate).format('DD MMM, YYYY')}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderQuestionnaireList = ({item, index}) => {
    return (
      <View
        style={{
          margin: 5,
          backgroundColor: '#e8f0fe',
          borderRadius: 10,
        }}
        key={item.question}>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            fontSize: 13,
            color: '#2b8ada',
            fontWeight: 'bold',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            textTransform: 'capitalize',
          }}>
          {item.question}
        </Text>
        <TextInput
          style={{
            backgroundColor: '#e8f0fe',
            padding: 0,
            fontSize: 12,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            color: 'black',
          }}
          onChangeText={text => handleInput(text, index)}
          editable={editQuestions}
          value={item.answer}
        />
      </View>
    );
  };
  const handleInput = (text, index) => {
    let temp = [...QuestionnaireList];
    temp[index].answers = text;
    setQuestionnaireList(temp);
  };

  const selectDocs = async () => {
    try {
      console.log('==============Inside select Docs==========');

      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.pdf,
      });

      if (pickerResult.size > 2097152)
        Alert.alert(
          'Size Error',
          'The size of the file should be less than 2MB.',
        );
      else {
        pickerResult.name = fileName + '.pdf';
        console.log(pickerResult.name);
        uploadDocsList.push(pickerResult);
        setfileName('');
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const initiateUploadDocs = async () => {
    var p = [];

    if (uploadDocsList.length > 0) {
      //generating token for each file
      for (var i = 0; i < uploadDocsList.length; ++i) {
        let formData = new FormData();
        formData.append('directoryNames', 'PATIENT_DOCUMENT');
        formData.append('file', uploadDocsList[i]);
        formData.append('userId', patientDet.patientId);
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
          console.log(response.fileToken);
          if (response.fileToken != null) {
            //console.log(response.fileToken);
            let x = {
              consultationId: consultationId,
              documentName: uploadDocsList[i].name,
              documentPath: response.fileToken,
            };
            p.push(x);
            console.log(p);
          } else Alert.alert('Error', 'Please try again.');
        }
      }

      console.log('File to be uploaded\n\n', p);

      //uploading files
      if (p.length > 0) await uploadDocs(p);
    } else Alert.alert('Warning', 'Please select a file before uploading');
  };
  const uploadDocs = async p => {
    console.log('inside uploading docs with\n\n', p);
    await axios
      .post(apiConfig.baseUrl + '/patient/consultation/document/save', p)
      .then(response => {
        if (response.status == 200) {
          Alert.alert(
            'Done',
            'Selected files have been uploaded successfully',
            [
              {
                text: 'ok',
                onPress: async () => {
                  let gar = await getFiles(consultationId);
                  seteditDocs(false);
                },
              },
            ],
          );
        }
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };

  const ViewUploadList = () => {
    return uploadDocsList.map((uploadDocsList, index) => {
      return (
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: '#d3d3d3',
          }}
          key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 0,
              padding: 0,
            }}>
            {/*Serial Number*/}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {index + 1}
              </Text>
            </View>
            {/* File Name */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {uploadDocsList.name}
              </Text>
            </View>
            {/*Actions */}
            <TouchableOpacity
              style={[
                styles.cellStyle,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                },
              ]}>
              <FAIcons
                name="trash"
                color={'red'}
                size={15}
                onPress={() => {
                  removeDocsHandler(index);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };
  const removeDocsHandler = i => {
    setuploadDocsList(uploadDocsList.filter((obj, e) => i !== e));
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
          <HeaderPatient showMenu={false} title="All Appointment" />

          {/* Tab */}
          <View
            style={{
              marginVertical: 10,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#2B8ADA',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setcompletedActive(!completedActive);
                setupcomingActive(!upcomingActive);
              }}
              style={[
                {
                  flex: 1,
                  borderRadius: 20,
                  padding: 10,
                },
                upcomingActive ? {backgroundColor: '#2B8ADA'} : null,
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                  },
                  upcomingActive
                    ? {color: 'white', fontWeight: 'bold'}
                    : {color: 'black'},
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setcompletedActive(!completedActive);
                setupcomingActive(!upcomingActive);
              }}
              style={[
                {
                  flex: 1,
                  borderRadius: 20,
                  padding: 10,
                },
                completedActive ? {backgroundColor: '#2B8ADA'} : null,
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                  },
                  completedActive
                    ? {color: 'white', fontWeight: 'bold'}
                    : {color: 'black'},
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>
          {upcomingActive ? (
            <View style={{alignSelf: 'center', width: '90%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  paddingHorizontal: 10,
                }}
                onPress={getUpcoming}>
                <FAIcons
                  name="redo-alt"
                  size={12}
                  style={{alignSelf: 'center', marginRight: 5}}
                  color={'#2b8ada'}
                />
                <Text style={{color: '#2b8ada', fontSize: 12}}>Refresh</Text>
              </TouchableOpacity>
              {UpcomingData != '' ? (
                <FlatList
                  data={UpcomingData}
                  keyExtractor={item => item.consultationId}
                  renderItem={renderUpcomingConsultations}
                />
              ) : (
                <Text style={{alignSelf: 'center', color: 'gray'}}>
                  No New Upcoming Consulations
                </Text>
              )}
            </View>
          ) : (
            <View style={{alignSelf: 'center', width: '90%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  paddingHorizontal: 10,
                }}
                onPress={getCompleted}>
                <FAIcons
                  name="redo-alt"
                  size={12}
                  style={{alignSelf: 'center', marginRight: 5}}
                  color={'#2b8ada'}
                />
                <Text style={{color: '#2b8ada', fontSize: 12}}>Refresh</Text>
              </TouchableOpacity>
              {CompletedData != '' ? (
                <FlatList
                  data={CompletedData}
                  keyExtractor={item => item.consultationId}
                  renderItem={renderCompleted}
                />
              ) : (
                <Text style={{alignSelf: 'center', color: 'gray'}}>
                  No Data Found for Completed Consulations
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        {isLoading && (
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
                width: 150,
                height: 150,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={waiting}
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
                  fontSize: 15,
                  fontWeight: 'bold',
                  width: '100%',
                  // padding: 10,
                }}>
                Loading...
              </Text>
            </View>
          </View>
        )}
        {rescheduleModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={rescheduleModal}
            onRequestClose={() => {
              setrescheduleModal(!rescheduleModal);
            }}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  styles.modalView,
                  {
                    borderRadius: 10,
                    padding: 15,
                  },
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      padding: 5,
                      color: 'black',
                    }}>
                    Reschedule
                  </Text>
                  <FAIcons
                    name="window-close"
                    color="black"
                    size={26}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onPress={() => {
                      setrescheduleModal(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        {docsModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={docsModal}
            onRequestClose={() => {
              setdocsModal(!docsModal);
            }}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  styles.modalView,
                  {
                    borderRadius: 10,
                  },
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Files
                  </Text>
                  <FAIcons
                    name="window-close"
                    color="black"
                    size={26}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onPress={() => {
                      setdocsModal(false);
                      setdocsList(null);
                      seteditDocs(false);
                      setuploadDocsList([]);
                    }}
                  />
                </View>

                {editDocs == false ? (
                  <View style={{minHeight: 150, width: '100%'}}>
                    {docsList != '' && docsList != null ? (
                      <View>
                        <View style={{marginVertical: 10}}>
                          <FlatList
                            data={docsList}
                            keyExtractor={item => item.documentPath}
                            renderItem={renderDocsList}
                            scrollEnabled={true}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'column',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <View style={{flex: 0.9, justifyContent: 'center'}}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 15,
                            }}>
                            No file(s) uploaded
                          </Text>
                        </View>
                        {upcomingActive ? (
                          <View style={{flex: 0.1}}>
                            <CustomButton
                              text={'Upload Now'}
                              textstyle={{color: 'white', fontSize: 13}}
                              style={{
                                backgroundColor: '#2b8ada',
                                padding: 5,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                              }}
                              onPress={async () => {
                                // await getQuestions(doctorId, consultationId);
                                seteditDocs(true);
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '95%',
                          alignSelf: 'center',
                          marginVertical: 5,
                        }}>
                        {uploadDocsList.length > 0 ? (
                          <View>
                            {/* Heading */}
                            <View
                              style={{
                                flexDirection: 'column',
                                borderWidth: 1,
                                borderColor: '#d3d3d3',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  margin: 0,
                                  padding: 0,
                                }}>
                                <View style={styles.cellHeading}>
                                  <Text style={styles.cellHeadingText}>
                                    S. No.
                                  </Text>
                                </View>
                                <View style={styles.cellHeading}>
                                  <Text style={styles.cellHeadingText}>
                                    File Name
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: 1,
                                    paddingVertical: 1,
                                    backgroundColor: '#2b8ada',
                                  }}>
                                  <Text style={styles.cellHeadingText}>
                                    Actions
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <ViewUploadList />
                          </View>
                        ) : null}

                        {/* File Name Label*/}
                        <View>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 12,
                              marginBottom: 3,
                              color: '#2b8ada',
                              fontWeight: 'bold',
                              paddingHorizontal: 10,
                            }}>
                            File Name
                          </Text>
                        </View>
                        {/* File Name Input */}
                        <View>
                          <TextInput
                            style={{
                              backgroundColor: '#e8f0fe',
                              borderRadius: 10,
                              padding: 0,
                              paddingHorizontal: 10,
                            }}
                            onChangeText={text => setfileName(text)}
                            value={fileName}
                          />
                        </View>
                        {/* File Select Button */}
                        <TouchableOpacity
                          style={[
                            {
                              flex: 0.45,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              borderWidth: 1,

                              alignSelf: 'flex-end',
                              borderRadius: 10,
                              padding: 3,
                              paddingHorizontal: 10,
                              marginTop: 5,
                            },
                            fileToken == null
                              ? {borderColor: '#2b8ada'}
                              : {borderColor: '#21c47f'},
                          ]}
                          onPress={async () => {
                            if (fileName != '') await selectDocs();
                            else
                              Alert.alert(
                                'Incomplete Details!',
                                'Please enter file name before selecting file',
                              );
                          }}>
                          <FAIcons
                            name="file-pdf"
                            size={15}
                            color={fileToken == null ? '#2b8ada' : '#21c47f'}
                            style={{alignSelf: 'center', marginRight: 5}}
                          />
                          <Text
                            style={[
                              {
                                fontSize: 12,
                                alignSelf: 'center',
                                color: '#2b8ada',
                              },
                              fileToken == null
                                ? {color: '#2b8ada'}
                                : {color: '#21c47f'},
                            ]}>
                            Add File
                          </Text>
                        </TouchableOpacity>

                        {/* Submit Button */}
                        <View
                          style={{
                            flexDirection: 'column',
                            marginVertical: 5,
                            marginTop: 20,
                          }}>
                          <CustomButton
                            text={'Save'}
                            textstyle={{
                              color: 'white',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}
                            style={{
                              flex: 1,
                              backgroundColor: '#2b8ada',
                              padding: 5,
                              borderRadius: 10,
                              paddingHorizontal: 15,
                            }}
                            onPress={async () => {
                              // await saveQuestions();
                              await initiateUploadDocs();
                              seteditDocs(false);
                            }}
                          />
                          <CustomButton
                            text={'Cancel'}
                            textstyle={{
                              color: '#2b8ada',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}
                            style={{
                              flex: 1,
                              borderColor: '#2b8ada',
                              borderWidth: 1,
                              padding: 5,
                              borderRadius: 10,
                              paddingHorizontal: 15,
                              marginTop: 10,
                            }}
                            onPress={async () => {
                              //await saveQuestions();
                              seteditDocs(false);
                              setuploadDocsList([]);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        ) : null}
        {quesAnsModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={quesAnsModal}
            onRequestClose={() => {
              setquesAnsModal(false);
            }}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  styles.modalView,
                  {
                    borderRadius: 10,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Questionnaire
                  </Text>
                  {/* {upcomingActive && editQuestions == false ? (
                    <Text
                      style={{
                        textDecorationColor: '#2b8ada',
                        textDecorationStyle: 'solid',
                        alignSelf: 'center',
                        position: 'absolute',
                        right: 35,
                        textDecorationLine: 'underline',
                        color: '#2b8ada',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}
                      onPress={() => {
                        Alert.alert(
                          'Edit Questionnaire',
                          'You can now edit your response',
                        );
                        seteditQuestions(true);
                      }}>
                      Edit
                    </Text>
                  ) : null} */}
                  <FAIcons
                    name="window-close"
                    color="black"
                    size={26}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onPress={() => {
                      setquesAnsModal(false);
                      setQuestionnaireList([]);
                      seteditQuestions(false);
                      setdoctorId(null);
                      setconsultationId(null);
                    }}
                  />
                </View>
                <View style={{minHeight: 150, width: '100%'}}>
                  {QuestionnaireList != '' && QuestionnaireList != null ? (
                    <View>
                      {/* QuestionList */}
                      <View style={{marginVertical: 10}}>
                        <FlatList
                          data={QuestionnaireList}
                          keyExtractor={item => item.question}
                          renderItem={renderQuestionnaireList}
                        />
                      </View>

                      {/* Submit Button */}
                      {editQuestions ? (
                        <View>
                          <CustomButton
                            text={'Save'}
                            textstyle={{
                              color: 'white',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}
                            style={{
                              backgroundColor: '#2b8ada',
                              padding: 5,
                              borderRadius: 10,
                              paddingHorizontal: 15,
                            }}
                            onPress={async () => {
                              await saveQuestions();
                            }}
                          />
                          <CustomButton
                            text={'Cancel'}
                            textstyle={{
                              color: '#2b8ada',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}
                            style={{
                              borderColor: '#2b8ada',
                              borderWidth: 1,
                              padding: 5,
                              borderRadius: 10,
                              paddingHorizontal: 15,
                              marginTop: 10,
                            }}
                            onPress={async () => {
                              //await saveQuestions();
                              seteditQuestions(false);
                              setQuestionnaireList(null);
                            }}
                          />
                        </View>
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View style={{flex: 0.9, justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                          }}>
                          Not answered
                        </Text>
                      </View>
                      {upcomingActive ? (
                        <View style={{flex: 0.1}}>
                          <CustomButton
                            text={'Answer Now'}
                            textstyle={{color: 'white', fontSize: 13}}
                            style={{
                              backgroundColor: '#2b8ada',
                              padding: 5,
                              borderRadius: 10,
                              paddingHorizontal: 15,
                            }}
                            onPress={async () => {
                              await getQuestions(doctorId, consultationId);
                              seteditQuestions(true);
                            }}
                          />
                        </View>
                      ) : null}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        {PrescriptionModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={PrescriptionModal}
            onRequestClose={() => {
              setPrescriptionModal(!PrescriptionModal);
            }}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  styles.modalView,
                  {
                    borderRadius: 10,
                  },
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Viewer
                  </Text>
                  <FAIcons
                    name="window-close"
                    color="black"
                    size={26}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onPress={() => {
                      setPrescriptionModal(false);
                      setprescriptionId(null);
                      setZoom(1);
                    }}
                  />
                </View>
                <View style={{minHeight: 150, width: '100%'}}>
                  <View
                    style={{
                      padding: 10,
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 7,
                      marginVertical: 10,
                      borderWidth: 2,
                      borderColor: 'gray',
                    }}>
                    <Pdf
                      source={{
                        uri: prescriptionId,
                      }}
                      style={{
                        width: '100%',
                        height: 275,
                        alignSelf: 'center',
                      }}
                      //onLoadComplete={() => console.log('fully loaded')}
                      scale={zoom}
                    />
                  </View>
                  <View style={{alignSelf: 'center', flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-evenly',
                        width: '95%',
                      }}>
                      <TouchableOpacity>
                        <FAIcons
                          name="minus-circle"
                          size={20}
                          color={'gray'}
                          onPress={onZoomOut}
                        />
                      </TouchableOpacity>
                      <Text>
                        {zoom * 100}
                        {' %'}
                      </Text>
                      <TouchableOpacity>
                        <FAIcons
                          name="plus-circle"
                          size={20}
                          color={'gray'}
                          onPress={onZoomIn}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,
                        alignSelf: 'center',
                        marginVertical: 5,
                      }}>
                      File Name:- {documentName}
                    </Text>
                    <CustomButton
                      textstyle={{color: 'white', fontSize: 12}}
                      text={'Download'}
                      style={{
                        backgroundColor: 'limegreen',
                        borderRadius: 10,
                      }}
                      onPress={async () => {
                        let fileName = prescriptionId.split('/').pop();
                        //console.log(fileName);
                        await RNFS.copyFile(
                          prescriptionId,
                          `file://${RNFS.DownloadDirectoryPath}/` + fileName,
                        );
                        Alert.alert(
                          'Downloaded',
                          `Prescription has been downloaded under the name of:- ${fileName}`,
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        {isLoading && (
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
                width: 150,
                height: 150,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={waiting}
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
                  fontSize: 15,
                  fontWeight: 'bold',
                  width: '100%',
                  // padding: 10,
                }}>
                Loading...
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
  modalView: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cellStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  cellHeading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
    backgroundColor: '#2b8ada',
  },
  cellHeadingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 11,
    marginVertical: 5,
    color: 'white',
  },
});

export default MyAppointment;
