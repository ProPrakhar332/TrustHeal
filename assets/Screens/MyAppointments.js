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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-option-menu';
import apiConfig from '../API/apiConfig';

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
  const [consultationId, setconsultationId] = useState(null);
  const [documentPath, setdocumentPath] = useState(null);
  const [documentName, setdocumentName] = useState(null);

  const [PrescriptionModal, setPrescriptionModal] = useState(false);
  const [prescriptionId, setprescriptionId] = useState(false);
  const [zoom, setZoom] = useState(1);

  const onZoomIn = () => {
    if (zoom < 2.5) setZoom(zoom + 0.25);
  };
  const onZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.25);
  };

  useEffect(() => {
    const LoadData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      setpatientDet(x);
    };
    LoadData();
  }, []);

  useEffect(() => {
    if (patientDet != null) {
      getUpcoming();
    }
  }, [patientDet]);
  const getUpcoming = async () => {
    setisLoading(true);
    await axios
      .get(
        apiConfig.baseUrl +
          '/patient/upcoming/consultations?patientId=' +
          patientDet.patientId,
      )
      .then(function (response) {
        // console.log(
        //   '\n=========================== UPCOMING CONSULTATIONS ====================================\n',
        // );
        // console.log(response.data);
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

  useEffect(() => {
    if (patientDet != null) {
      getCompleted();
    }
  }, [patientDet]);
  const getCompleted = async () => {
    setisLoading(true);
    await axios
      .get(
        apiConfig.baseUrl +
          '/patient/complete/consultations?max=5&min=0&patientId=' +
          patientDet.patientId,
      )
      .then(function (response) {
        // console.log(
        //   '\n=========================== COMPLETED CONSULTATIONS ====================================\n',
        // );
        // console.log(response.data);
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
    navigation.navigate('CallPage', {
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
    await axios
      .get(apiConfig.baseUrl + '/docs/current/uploaded?consultationId=' + id)
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          setdocsList(response.data.documents);
          setQuestionnaireList(response.data.quesAns);
        }
      })
      .catch(error => {
        Alert.alert('Error', `Error in fetching docs and ques.\n${error}`);
      });
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
              {dayjs(item.date).format('DD-MMM-YY')}
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
          {item.consultationType != 'PHYSICAL' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 5,
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
                  onJoinPress(
                    item.consultationType,
                    item.consultationId + '',
                    patientDet.patientId + '',
                    patientDet.patientName,
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
                <Text style={{fontSize: 12, color: 'white'}}>Consult Now</Text>
              </TouchableOpacity>

              {/* Reschedule */}
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          ) : null}
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
                await getFiles(item.consultationId);
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
                await getFiles(item.consultationId);
                setquesAnsModal(true);
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
              await getFiles(item.consultationId);
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
              await getFiles(item.consultationId);
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
  const renderQuestionnaireList = ({item}) => {
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
            backgroundColor: '#2b8ada',
            fontSize: 13,
            color: 'white',
            fontWeight: 'bold',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            textTransform: 'capitalize',
          }}>
          {item.question}
        </Text>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 10,
            fontSize: 12,
            color: '#2b8ada',
            fontWeight: 'bold',
          }}>
          {item.answer}
        </Text>
      </View>
    );
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
                    }}
                  />
                </View>

                <View style={{minHeight: 150, width: '100%'}}>
                  {docsList != '' && docsList != null ? (
                    <FlatList
                      data={docsList}
                      keyExtractor={item => item.documentPath}
                      renderItem={renderDocsList}
                      style={{marginTop: 10}}
                    />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                        }}>
                        No Files uploaded by patient
                      </Text>
                    </View>
                  )}
                </View>
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
                    }}
                  />
                </View>
                <View style={{minHeight: 150, width: '100%'}}>
                  {QuestionnaireList != '' && QuestionnaireList != null ? (
                    <FlatList
                      data={QuestionnaireList}
                      keyExtractor={item => item.question}
                      renderItem={renderQuestionnaireList}
                      style={{marginTop: 10}}
                    />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                        }}>
                        Not answered by patient
                      </Text>
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
});

export default MyAppointment;
