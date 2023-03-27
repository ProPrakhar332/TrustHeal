import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
  Linking,
  TextInput,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import {useCallback} from 'react';

import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../Components/CustomButton';
//images
import pfp1 from '../Resources/patient.png';
// import pfp2 from "../Resources/pfp2.jpg";
// import pfp3 from "../Resources/pfp3.jpg";
// import pfp4 from "../Resources/pfp4.jpg";
import chatting from '../Resources/chattingMedium.png';
import payonclinic from '../Icons/payonclinic1.png';
import prepaid from '../Icons/paid.png';
import waiting from '../Animations/waiting1.gif';
import downloading from '../Animations/downloading.gif';

import Header from '../Components/Header';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import dateformatter from '../API/dateformatter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import dayjs from 'dayjs';
import Pdf from 'react-native-pdf';

const dataStatus = [
  {key: 'Yes', value: 'Yes'},
  {key: 'No', value: 'No'},
];

const DoctorHome = ({navigation}) => {
  // console.log("Doctor Home", route.params);
  const [doctorObj, setDoctorObj] = useState(null);
  const [doctorId, setdoctorId] = useState(null);
  //upcoming tab
  const [Upcoming, setUpcoming] = useState(false);
  const [UpcomingData, setUpcomingData] = useState([]);
  const [UpcomingId, setUpcomingId] = useState(0);
  const [PreconsultaionQuestionData, setPreconsultaionQuestionData] = useState(
    [],
  );
  const [PreConsultaion, setPreConsultaion] = useState([]);
  const [upcomingEConsultations, setupcomingEConsultations] = useState(false);
  const [upcomingPConsultations, setupcomingPConsultations] = useState(false);
  const [PrescriptionModal, setPrescriptionModal] = useState(false);
  const [prescriptionId, setprescriptionId] = useState(null);
  const [ChattingModal, setChattingModal] = useState(false);
  const [HistoryModal, setHistoryModal] = useState(false);
  const [historyData, sethistoryData] = useState([]);
  const [patientId, setpatientId] = useState(0);
  const [historyId, sethistoryId] = useState(0);
  const [todayId, settodayId] = useState(0);
  const [upcomingConsultationId, setupcomingConsultationId] = useState(0);
  const [TodaysModal, setTodaysModal] = useState(false);
  const [TodaysDocs, setTodaysDocs] = useState([]);
  const [ConsultationQuestionnaire, setConsultationQuestionnaire] =
    useState(false);
  //complete tab
  const [Complete, setComplete] = useState(false);
  const [CompleteData, setCompleteData] = useState([]);
  //status tab
  const [Status, setStatus] = useState(false);
  const [StatusData, setStatusData] = useState([]);
  const [ManageStatusModal, setManageStatusModal] = useState(false);
  const [ManageStatus, setManageStatus] = useState('');
  const [PrescriptionMade, setPrescriptionMade] = useState('');
  const [isFetching, setisFetching] = useState(false);
  //Pending Prescription Modal

  const [pending, setpending] = useState(false);
  const [PendingData, setPendingData] = useState([]);

  const [strtCC, setstrtCC] = useState(0);
  const [endCC, setendCC] = useState(4);
  const [endOfList, setendOfList] = useState(false);
  const [zoom, setZoom] = useState(1);

  const onZoomIn = () => {
    if (zoom < 2.5) setZoom(zoom + 0.25);
  };
  const onZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.25);
  };

  const layout = useWindowDimensions();

  const dayextractor = date => {
    var ch = new Date(date);
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //console.log(days[ch.getDay()]);
    return days[ch.getDay()];
  };

  const nav = useNavigation();
  const onJoinPress = (
    consultationType,
    callID,
    userID,
    userName,
    userType,
  ) => {
    nav.navigate('CallAgora', {
      consultationType: consultationType,
      callID: callID,
      userID: userID,
      userName: userName,
      userType: userType,
    });
  };

  const onPressPrescription = async item => {
    let obj = {
      age:
        item.familyUserDob != null
          ? dayjs().diff(dayjs(item.familyUserDob), 'y')
          : dayjs().diff(dayjs(item.patientDob), 'y'),

      patientName:
        item.familyUserName != null ? item.familyUserName : item.patientName,
      profilePhoto:
        item.familyUserPhoto != null ? item.familyUserPhoto : item.patientPhoto,
    };
    if (item.familyUsercity != null) obj.city = item.familyUsercity;
    else if (item.patientCity != null) obj.city = item.patientCity;
    else obj.city = null;

    let p = {
      patientDet: obj,
      patientId: item.patientId,
      //patientNo: item.patientNumber,
      consultationId: item.consultationId,
      clinicName: item.clinicName != null ? item.clinicName : '',
      clinicAddress: item.clinicAddress != null ? item.clinicAddress : '',
      referredByDoctor: item.referredByDoctor,
    };
    console.log(p);
    await AsyncStorage.setItem('PrescriptionFor', JSON.stringify(p));
    // navigation.navigate('CheifComplaints');
  };

  const downloadCache = async (fileToken, userId, fileName) => {
    // let op = {};
    // if (Platform.OS == 'ios') op = {NSURLIsExcludedFromBackupKey: true};
    // await RNFS.mkdir(`file://${RNFS.DownloadDirectoryPath}/Arogya`, op);

    console.log('Downloading with user id ', userId);

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
          setPrescriptionModal(true);
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

  const openURL = useCallback(async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Don't know how to open this URL: ${url}`);
    }
  }, []);

  const timeformatter = time => {
    let text = time;
    const myArray = text.split(':');
    var HH = Number(myArray[0]);
    var m = Number(myArray[1]);
    var MM = m;
    if (m < 9) MM = '0' + m;
    var PM = 'AM';
    if (HH > 12) {
      HH -= 12;
      PM = 'PM';
    }
    return HH + ':' + MM + PM;
  };
  const shouldShow = item => {
    if (dayjs(item.slotDate).diff(dayjs(), 'd') > 0) return true;
    else if (dayjs(item.slotDate).diff(dayjs(), 'd') == 0) {
      if (item.slotDate != dayjs().format('YYYY-MM-DD')) return true;
      else {
        let slotEndArray = item.slotEndTime.split(':');
        if (Number(dayjs().format('HH')) < slotEndArray[0]) return true;
        else if (Number(dayjs().format('HH')) == slotEndArray[0]) {
          if (Number(dayjs().format('mm')) <= slotEndArray[1]) return true;
          else return false;
        }
      }
    }
  };

  const renderCard = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 5,
        }}
        // onPress={() => console.log(item)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <View
            styles={{
              flex: 0.45,
            }}>
            <Image
              source={
                item.paymentStatus != 'PRE_PAID' &&
                item.paymentStatus != 'SPECIAL_USER'
                  ? payonclinic
                  : prepaid
              }
              style={{
                width: 30,
                height: 30,
                tintColor:
                  item.paymentStatus != 'PRE_PAID' &&
                  item.paymentStatus != 'SPECIAL_USER'
                    ? '#2b8ada'
                    : '#51e80c',
                marginLeft: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 0.45,
              justifyContent: 'flex-end',
            }}>
            <FAIcon
              name="prescription"
              size={25}
              style={{alignSelf: 'center'}}
              onPress={() => {
                Alert.alert(
                  'Create Prescription',
                  `Do you want to create prescription for ` +
                    (item.familyUserName == null
                      ? item.patientName
                      : item.familyUserName) +
                    ` right now?`,
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        onPressPrescription(item);
                        navigation.navigate('CheifComplaints');
                      },
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                );
                //onPressPrescription(item);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderBottomColor: "gray",
            // borderBottomWidth: 1,
            // justifyContent: 'space-around',
          }}>
          {item.patientPhoto == 0 || item.patientPhoto == null ? (
            <Image
              source={pfp1}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.patientPhoto}&userId=${item.patientId}`,
              }}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                flexDirection: 'row',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.familyUserName == null
                ? item.patientName
                : item.familyUserName}
            </Text>
            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  {/* <Text style={styles.cardText}>Clinic</Text> */}
                  <FAIcon
                    name="hospital"
                    size={15}
                    color={'#2b8ada'}
                    style={{}}
                  />
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text
                    style={[
                      styles.cardText,
                      {color: '#2b8ada', fontWeight: 'bold'},
                    ]}>
                    {item.clinicName}
                    {' | '} {item.clinicAddress}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientDob != null || item.familyUserDob ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Age</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUserDob == null
                      ? dayjs().diff(dayjs(item.patientDob), 'y')
                      : dayjs().diff(dayjs(item.familyUserDob), 'y')}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientCity != null || item.familyUsercity ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Location</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUsercity == null
                      ? item.patientCity
                      : item.familyUsercity}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.symptoms != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.2,
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Symtoms</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.6,
                  }}>
                  <Text style={styles.cardText}>{item.symptoms}</Text>
                </View>
              </View>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Date</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {dayjs(item.slotDate).format('DD MMM, YYYY')}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Slot</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {timeformatter(item.slotStartTime)} {' - '}
                  {timeformatter(item.slotEndTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '95%',
            alignSelf: 'center',
          }}>
          {item.consultationType !== 'PHYSICAL' ? (
            <TouchableOpacity
              style={{
                flex: 0.45,
                justifyContent: 'center',
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 5,
                alignSelf: 'center',
                backgroundColor: '#2B8ADA',
                borderWidth: 1,
                borderColor: '#2B8ADA',
                borderRadius: 5,
              }}
              onPress={async () => {
                if (hasStarted(item)) {
                  await onPressPrescription(item);
                  console.log(item);
                  onJoinPress(
                    item.consultationType,
                    item.consultationId + '',
                    doctorObj.doctorId + '',
                    doctorObj.doctorName,
                    'Doctor',
                  );
                } else
                  Alert.alert(
                    'Hold on',
                    `Your consultaion starts at ${timeformatter(
                      item.slotStartTime,
                    )} on ${dayjs(item.slotDate).format(
                      'DD MMM, YYYY',
                    )}.\nPlease join at the scheduled time.`,
                  );
              }}>
              <FAIcon
                name={
                  item.consultationType == 'VIDEO_CALL' ? 'video' : 'phone-alt'
                }
                color={'white'}
                size={15}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: 'white'}}>Consult Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 0.45,
                justifyContent: 'center',
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 5,
                alignSelf: 'center',
                backgroundColor: '#2B8ADA',
                borderWidth: 1,
                borderColor: '#2B8ADA',
                borderRadius: 5,
              }}
              onPress={async () => {
                await onPressPrescription(item);
                navigation.navigate('CheifComplaints');
              }}>
              <FAIcon
                name="hospital"
                size={15}
                color={'white'}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: 'white'}}>P-Consultation</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#000080',
              borderRadius: 5,
            }}
            onPress={() => {
              sethistoryId(
                item.familyId != null ? item.familyId : item.patientId,
              );
              setHistoryModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'#000080'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 12, color: '#000080'}}>History</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setTodaysModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'gray'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 12}}>Files</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 0.1,
                justifyContent: 'center',
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 5,
                borderWidth: 1,
                borderColor: '#2b8ada',
                borderRadius: 5,
              },
            ]}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setConsultationQuestionnaire(true);
            }}>
            <MCIcons
              name="clipboard-list"
              color={'#2b8ada'}
              size={15}
              style={{alignSelf: 'center'}}
            />
            {/* <Text style={{fontSize: 12, color: '#2b8ada'}}>Questionnaire</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderCardPending = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 5,
        }}
        // onPress={() => console.log(item)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          {/* <View
            styles={{
              flex: 0.45,
            }}>
            <Image
              source={
                item.paymentStatus != 'PRE_PAID' &&
                item.paymentStatus != 'SPECIAL_USER'
                  ? payonclinic
                  : prepaid
              }
              style={{
                width: 30,
                height: 30,
                tintColor:
                  item.paymentStatus != 'PRE_PAID' &&
                  item.paymentStatus != 'SPECIAL_USER'
                    ? '#2b8ada'
                    : '#51e80c',
                marginLeft: 10,
              }}
            />
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              flex: 0.45,
              justifyContent: 'flex-end',
            }}>
            <FAIcon
              name="prescription"
              size={25}
              style={{alignSelf: 'center'}}
              onPress={() => {
                Alert.alert(
                  'Create Prescription',
                  `Do you want to create prescription for ` +
                    (item.familyUserName == null
                      ? item.patientName
                      : item.familyUserName) +
                    ` right now?`,
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        onPressPrescription(item);
                        navigation.navigate('CheifComplaints');
                      },
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                );
                //onPressPrescription(item);
              }}
            />

          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {item.patientPhoto == 0 || item.patientPhoto == null ? (
            <Image
              source={pfp1}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.patientPhoto}&userId=${item.patientId}`,
              }}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                flexDirection: 'row',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.familyUserName == null
                ? item.patientName
                : item.familyUserName}
            </Text>
            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  {/* <Text style={styles.cardText}>Clinic</Text> */}
                  <FAIcon
                    name="hospital"
                    size={15}
                    color={'#2b8ada'}
                    style={{}}
                  />
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text
                    style={[
                      styles.cardText,
                      {color: '#2b8ada', fontWeight: 'bold'},
                    ]}>
                    {item.clinicName}
                    {' | '} {item.clinicAddress}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientDob != null || item.familyUserDob ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Age</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUserDob == null
                      ? dayjs().diff(dayjs(item.patientDob), 'y')
                      : dayjs().diff(dayjs(item.familyUserDob), 'y')}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientCity != null || item.familyUsercity ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Location</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUsercity == null
                      ? item.patientCity
                      : item.familyUsercity}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.symptoms != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.2,
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Symtoms</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.6,
                  }}>
                  <Text style={styles.cardText}>{item.symptoms}</Text>
                </View>
              </View>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Date</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {dayjs(item.slotDate).format('DD MMM, YYYY')}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Slot</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {timeformatter(item.slotStartTime)} {' - '}
                  {timeformatter(item.slotEndTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '95%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.45,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              backgroundColor: '#2B8ADA',
              borderWidth: 1,
              borderColor: '#2B8ADA',
              borderRadius: 5,
            }}
            onPress={async () => {
              Alert.alert(
                'Create Prescription',
                `Do you want to create prescription for ` +
                  (item.familyUserName == null
                    ? item.patientName
                    : item.familyUserName) +
                  ` right now?`,
                [
                  {
                    text: 'Yes',
                    onPress: async () => {
                      await onPressPrescription(item);
                      navigation.navigate('CheifComplaints');
                    },
                  },
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ],
              );
            }}>
            <FAIcon
              name="prescription"
              size={15}
              color={'white'}
              style={{alignSelf: 'center', marginRight: 5}}
              onPress={() => {
                //onPressPrescription(item);
              }}
            />
            <Text style={{fontSize: 12, color: 'white'}}>
              Create Prescription
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#000080',
              borderRadius: 5,
            }}
            onPress={() => {
              sethistoryId(
                item.familyId != null ? item.familyId : item.patientId,
              );
              setHistoryModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'#000080'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 12, color: '#000080'}}>History</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 5,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setTodaysModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'gray'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 12}}>Files</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 0.1,
                justifyContent: 'center',
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 5,
                borderWidth: 1,
                borderColor: '#2b8ada',
                borderRadius: 5,
              },
            ]}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setConsultationQuestionnaire(true);
            }}>
            <MCIcons
              name="clipboard-list"
              color={'#2b8ada'}
              size={15}
              style={{alignSelf: 'center'}}
            />
            {/* <Text style={{fontSize: 12, color: '#2b8ada'}}>Questionnaire</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCardRecent = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 5,
          padding: 10,
        }}
        //onPress={() => console.log(item.consultationId)}
        key={item.consultationId}>
        <View
          style={{
            flexDirection: 'row',
            // borderBottomColor: "gray",
            // borderBottomWidth: 1,
          }}>
          <Text
            style={[
              styles.tag,
              {
                backgroundColor: '#2B8ADA',
              },
            ]}>
            Completed
          </Text>
          {item.patientPhoto == 0 || item.patientPhoto == null ? (
            <Image
              source={pfp1}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.patientPhoto}&userId=${item.patientId}`,
              }}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          )}
          <View
            style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <Text
              style={{
                flexDirection: 'row',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.familyUserName == null
                ? item.patientName
                : item.familyUserName}
            </Text>
            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  {/* <Text style={styles.cardText}>Clinic</Text> */}
                  <FAIcon
                    name="hospital"
                    size={15}
                    color={'#2b8ada'}
                    style={{}}
                  />
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text
                    style={[
                      styles.cardText,
                      {color: '#2b8ada', fontWeight: 'bold'},
                    ]}>
                    {item.clinicName}
                    {' | '} {item.clinicAddress}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientDob != null || item.familyUserDob != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Age</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUserDob == null
                      ? dayjs().diff(dayjs(item.patientDob), 'y')
                      : dayjs().diff(dayjs(item.familyUserDob), 'y')}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.familyUsercity != null || item.patientCity != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Location</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUsercity == null
                      ? item.patientCity
                      : item.familyUsercity}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.symptoms != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Symtoms</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>{item.symptoms}</Text>
                </View>
              </View>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Date</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {dayjs(item.slotDate).format('DD MMM, YYYY')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Slot</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {timeformatter(item.slotStartTime)} {' - '}
                  {timeformatter(item.slotEndTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {item.consultationType !== 'PHYSICAL' ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 15,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: '#2b8ada',
                backgroundColor: '#2B8ADA',
                borderRadius: 5,
              }}>
              <FAIcon
                name={
                  item.consultationType == 'VIDEO_CALL' ? 'video' : 'phone-alt'
                }
                color={'white'}
                size={15}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 13, color: 'white'}}>E-Consultation</Text>
            </TouchableOpacity>
          ) : (
            <CustomButton
              text="P-Consultation"
              textstyle={{fontSize: 13, color: 'white'}}
              style={{
                borderWidth: 1,
                borderColor: '#2b8ada',
                backgroundColor: '#2B8ADA',
                padding: 3,
                alignSelf: 'center',
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
            />
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 15,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setTodaysModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'gray'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 13}}>Files</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 15,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={async () => {
              // openURL(
              //   `${apiConfig.baseUrl}/file/download?fileToken=${item.prescriptionPath}&userId=${doctorId}`,
              // );
              // download(item.prescriptionPath,doctorId,item.consultationId + '_Prescription_' + item.slotDate + '.pdf');
              downloadCache(
                item.prescriptionPath,
                doctorId,
                item.consultationId + '_Prescription_' + item.slotDate + '.pdf',
              );
            }}>
            <FAIcon
              name="prescription"
              size={15}
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderCardCompleted = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 5,
          padding: 10,
        }}
        // onPress={() => console.log(item.consultationId)}
        key={item.consultationId}>
        <View
          style={{
            flexDirection: 'row',
            // borderBottomColor: "gray",
            // borderBottomWidth: 1,
          }}>
          <Text
            style={[
              styles.tag,
              {
                backgroundColor: '#4DB707',
              },
            ]}>
            Completed
          </Text>
          {item.patientPhoto == 0 || item.patientPhoto == null ? (
            <Image
              source={pfp1}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.patientPhoto}&userId=${item.patientId}`,
              }}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                borderRadius: 5,
                margin: 5,
                marginHorizontal: 10,
              }}
            />
          )}
          <View
            style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <Text
              style={{
                flexDirection: 'row',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.familyUserName == null
                ? item.patientName
                : item.familyUserName}
            </Text>
            {item.consultationType == 'PHYSICAL' ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  {/* <Text style={styles.cardText}>Clinic</Text> */}
                  <FAIcon
                    name="hospital"
                    size={15}
                    color={'#2b8ada'}
                    style={{}}
                  />
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text
                    style={[
                      styles.cardText,
                      {color: '#2b8ada', fontWeight: 'bold'},
                    ]}>
                    {item.clinicName}
                    {' | '} {item.clinicAddress}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.patientDob != null || item.familyUserDob != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Age</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUserDob == null
                      ? dayjs().diff(dayjs(item.patientDob), 'y')
                      : dayjs().diff(dayjs(item.familyUserDob), 'y')}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.familyUsercity != null || item.patientCity != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Location</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>
                    {item.familyUsercity == null
                      ? item.patientCity
                      : item.familyUsercity}
                  </Text>
                </View>
              </View>
            ) : null}
            {item.symptoms != null ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '20%',
                    marginRight: '5%',
                  }}>
                  <Text style={styles.cardText}>Symtoms</Text>
                </View>
                <View style={{flexDirection: 'column', width: '60%'}}>
                  <Text style={styles.cardText}>{item.symptoms}</Text>
                </View>
              </View>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Date</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {dayjs(item.slotDate).format('DD MMM, YYYY')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '20%',
                  marginRight: '5%',
                }}>
                <Text style={styles.cardText}>Slot</Text>
              </View>
              <View style={{flexDirection: 'column', width: '60%'}}>
                <Text style={styles.cardText}>
                  {timeformatter(item.slotStartTime)} {' - '}
                  {timeformatter(item.slotEndTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {item.consultationType !== 'PHYSICAL' ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 3,
                paddingHorizontal: 15,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: '#2b8ada',
                backgroundColor: '#2B8ADA',
                borderRadius: 5,
              }}>
              <FAIcon
                name={
                  item.consultationType == 'VIDEO_CALL' ? 'video' : 'phone-alt'
                }
                color={'white'}
                size={15}
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 13, color: 'white'}}>E-Consultation</Text>
            </TouchableOpacity>
          ) : (
            <CustomButton
              text="P-Consultation"
              textstyle={{fontSize: 13, color: 'white'}}
              style={{
                borderWidth: 1,
                borderColor: '#2b8ada',
                backgroundColor: '#2B8ADA',
                padding: 3,
                alignSelf: 'center',
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
            />
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 15,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={async () => {
              settodayId(item.consultationId);
              setpatientId(item.patientId);
              await getTodaysDocs(item.consultationId);
              setTodaysModal(true);
            }}>
            <FAIcon
              name="file-pdf"
              color={'gray'}
              size={15}
              style={{marginRight: 5}}
            />
            <Text style={{fontSize: 13}}>Files</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 3,
              paddingHorizontal: 15,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
            onPress={() => {
              // setprescriptionId(item.prescriptionPath);
              // console.log(
              //   `${apiConfig.baseUrl}/file/download?fileToken=${item.prescriptionPath}&userId=${doctorId}`,
              // );
              // setPrescriptionModal(true);
              // openURL(
              //   `${apiConfig.baseUrl}/file/download?fileToken=${item.prescriptionPath}&userId=${doctorId}`,
              // );

              downloadCache(
                item.prescriptionPath,
                doctorId,
                item.consultationId + '_Prescription_' + item.slotDate + '.pdf',
              );
              // setPrescriptionModal(true);
              //console.log(apiConfig.baseUrl + item.prescriptionPath);
              // openURL(apiConfig.baseUrl + item.prescriptionPath);
            }}>
            <FAIcon
              name="prescription"
              size={15}
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderQuestionAnswers = ({item}) => {
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
  const renderHistory = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#E8F0FE',
          padding: 10,
          width: '100%',
          alignSelf: 'center',
          borderRadius: 7,
          marginVertical: 10,
        }}>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.HistoryModalText}>Uploaded Date</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.HistoryModalText}>
                {dateformatter(item.uploadedDate)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={[styles.HistoryModalText]}>Document</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FAIcon
                name="file-pdf"
                size={20}
                color={'black'}
                style={{
                  marginHorizontal: 5,
                }}
                onPress={() => {
                  //console.log(apiConfig.baseUrl + item.documentPath);
                  // openURL(apiConfig.baseUrl + item.documentPath);
                }}
              />
              <Text style={styles.HistoryModalText}>{item.documentName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderToday = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          borderRadius: 15,
          padding: 10,
          backgroundColor: '#E8F0FE',
        }}
        onPress={async () => {
          //console.log(apiConfig.baseUrl + item.documentPath);
          // openURL(apiConfig.baseUrl + item.documentPath);

          console.log(item.documentPath);

          await downloadCache(
            item.documentPath,
            patientId,
            item.documentName + '.pdf',
          );
          //setPrescriptionModal(true);
        }}>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <Text style={styles.HistoryModalText}>{item.documentName}</Text>
        </View>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <Text style={styles.HistoryModalText}>
            {dayjs(item.uploadedDate).format('DD MMM, YYYY')}
          </Text>
          <Text style={styles.HistoryModalText}>
            {dayjs(item.uploadedDate).format('HH:mm A')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <FAIcon
            name="file-pdf"
            size={20}
            color={'black'}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const onLoadScreen = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));

      setdoctorId(x.doctorId);
    };
    onLoadScreen();
  }, []);
  const hasStarted = item => {
    if (item.slotDate == dayjs().format('YYYY-MM-DD')) {
      let slotStrtArray = item.slotStartTime.split(':');
      let slotEndArray = item.slotEndTime.split(':');
      let start =
        Number(slotStrtArray[0]) <= Number(dayjs().format('HH')) &&
        Number(slotEndArray[0]) >= Number(dayjs().format('HH'));
      let end =
        Number(slotStrtArray[1]) <= Number(dayjs().format('mm')) &&
        Number(slotEndArray[1]) >= Number(dayjs().format('mm'));
      // console.log('Start Array\t', Number(dayjs().format('HH')));
      // console.log('End Array\t', Number(dayjs().format('mm')));
      // console.log('Current Time is : \t', dayjs().format('HH:mm'));

      return start && end;
    } else return false;
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Exit App', 'Exiting the application', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    if (Upcoming == true) getUpcomingData();
  }, [Upcoming]);
  const getUpcomingData = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    setDoctorObj(x);
    let doctorId = x.doctorId;
    //console.log(doctorId);
    setisFetching(true);
    axios
      .get(
        apiConfig.baseUrl +
          '/doctor/upcoming/consultation?doctorId=' +
          doctorId,
      )
      .then(function (response) {
        setisFetching(false);
        if (response.status == 200) {
          setUpcomingData(response.data);
        }
        console.log(UpcomingData);
      })
      .catch(function (error) {
        setisFetching(false);
        Alert.alert(
          'Error',
          'An error occured while fetching upcoming details. Please try again later.',
        );
        console.log(
          '=====Error in fetching upcoming consultation details=====',
        );
        console.log(error);
      });
  };

  useEffect(() => {
    if (pending == true) getPendingData();
  }, [pending]);
  const getPendingData = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    setDoctorObj(x);
    let doctorId = x.doctorId;
    //console.log(doctorId);
    setisFetching(true);
    axios
      .get(
        apiConfig.baseUrl +
          '/doctor/consultation/presription/pending?doctorId=' +
          doctorId,
      )
      .then(function (response) {
        setisFetching(false);
        if (response.status == 200) {
          setPendingData(response.data);
        }
        console.log(PendingData);
      })
      .catch(function (error) {
        setisFetching(false);
        Alert.alert(
          'Error',
          'An error occured while fetching pending details. Please try again later.',
        );
        console.log('=====Error in fetching pending consultation details=====');
        console.log(error);
      });
  };

  useEffect(() => {
    if (Complete == true) getCompletedData();
  }, [Complete]);
  const getCompletedData = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = x.doctorId;
    //console.log("Completed");
    setisFetching(true);
    axios
      .get(
        apiConfig.baseUrl +
          '/doctor/complete/consultation?doctorId=' +
          doctorId +
          '&start=' +
          0 +
          '&max=' +
          10,
      )
      .then(function (response) {
        setisFetching(false);
        if (response.status == 200) setCompleteData(response.data);
        //console.log(CompleteData);
      })
      .catch(function (error) {
        setisFetching(false);
        Alert.alert(
          'Error',
          'An error occured while fetching completed consultation details. Please try again later.',
        );
        console.log(
          '=====Error in fetching completed consultation details=====',
        );
        console.log(error);
      });
  };

  useEffect(() => {
    if (Status == true) getRecentData();
  }, [Status]);

  const getRecentData = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = x.doctorId;
    //console.log("Recent");
    setisFetching(true);
    axios
      .get(
        apiConfig.baseUrl + '/doctor/recent/consultation?doctorId=' + doctorId,
      )
      .then(function (response) {
        setisFetching(false);
        if (response.status == 200) setStatusData(response.data);
        //console.log(StatusData);
      })
      .catch(function (error) {
        setisFetching(false);
        Alert.alert(
          'Error',
          'An error occured while fetching recent consultation details. Please try again later.',
        );
        console.log('=====Error in fetching recent consultation details=====');
        console.log(error);
      });
  };

  useEffect(() => {
    const getHistoryDocs = async () => {
      console.log(historyId);
      axios
        .get(
          apiConfig.baseUrl + '/docs/upcoming/history?patientId=' + historyId,
        )
        .then(function (response) {
          if (response.status == 200) sethistoryData(response.data);
          //console.log(historyData);
        })
        .catch(function (error) {
          Alert.alert(
            'Error',
            'An error occured while fetching documents. Please try again later.',
          );
          console.log('=====Error in fetching documents=====');
          console.log(error);
        });
    };
    if (HistoryModal == true) getHistoryDocs();
  }, [HistoryModal]);

  const getTodaysDocs = async todayId => {
    console.log(todayId);
    axios
      .get(
        apiConfig.baseUrl + '/docs/current/uploaded?consultationId=' + todayId,
      )
      .then(function (response) {
        if (response.status == 200) {
          setTodaysDocs(response.data.documents);

          setPreconsultaionQuestionData(response.data.quesAns);
        }
        //console.log(TodaysDocs);
      })
      .catch(function (error) {
        Alert.alert(
          'Error',
          'An error occured while fetching previous documents of patient. Please try again later.',
        );
        console.log(
          '=====Error in fetching previous documents of patient=====',
        );
        console.log(error);
      });
  };

  const onPrev = () => {
    setendCC(strtCC - 1);
    setstrtCC(strtCC - 5);
    console.log('       START       :         ', strtCC);
    console.log('       END         :         ', endCC);
    getMoreConsultationQues();
  };

  const onNext = () => {
    setstrtCC(endCC + 1);
    setendCC(endCC + 5);
    console.log('       START       :         ', strtCC);
    console.log('       END         :         ', endCC);
    getMoreConsultationQues();
  };
  const getMoreConsultationQues = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = x.doctorId;
    //console.log("Completed");
    setisFetching(true);
    axios
      .get(
        apiConfig.baseUrl +
          '/doctor/complete/consultation?doctorId=' +
          doctorId +
          '&start=' +
          strtCC +
          '&max=' +
          endCC,
      )
      .then(function (response) {
        setisFetching(false);
        if (response.status == 200) {
          if (response.data != '') {
            setendOfList(true);
            setCompleteData(response.data);
          } else setendOfList(false);
        }
        //console.log(CompleteData);
      })
      .catch(function (error) {
        setisFetching(false);
        Alert.alert(
          'Error',
          'An error occured while fetching completed consultation details. Please try again later.',
        );
        console.log(
          '=====Error in fetching completed consultation details=====',
        );
        console.log(error);
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
        <StatusBar animated={true} backgroundColor="#2B8ADA" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{
            width: '100%',
            backgroundColor: '#E8F0FE',
            height: layout.height - 120,
            alignSelf: 'center',
            // marginTop: 30,
          }}>
          <Header showMenu={true} />
          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* Search Bar */}
            {/* <View style={styles.searchBar}>
              <TextInput placeholder="Search" style={styles.searchBarText} />
              <FAIcon
                name="search"
                size={15}
                color="gray"
                style={styles.searchIcon}
              />
            </View> */}
            {/* Filter */}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '30%',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#2B8ADA',
                padding: 5,
                margin: 10,
              }}>
              <Text style={{color: '#2B8ADA'}}>By Date</Text>
              <FAIcon name="caret-down" color={'#2B8ADA'} size={15} />
            </View> */}

            {/* Upcoming Consultations White Label */}
            <TouchableOpacity
              style={[styles.WhiteLabel, {marginTop: 20}]}
              onPress={() => setUpcoming(!Upcoming)}>
              <FAIcon
                name="comment-medical"
                size={15}
                color={Upcoming ? '#2b8ada' : 'gray'}
                style={{marginLeft: 3, alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  Upcoming ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Upcoming Consultations
              </Text>
              <FAIcon
                name={Upcoming ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[Upcoming ? {color: '#2B8ADA'} : {color: 'black'}]}
              />
            </TouchableOpacity>
            {/* Upcoming Consultaions Data */}
            {Upcoming ? (
              <View style={{flexDirection: 'column'}}>
                <View style={{backgroundColor: '#E8F0FE'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      paddingHorizontal: 10,
                      marginLeft: 10,
                    }}
                    onPress={getUpcomingData}>
                    <FAIcon
                      name="redo-alt"
                      size={12}
                      style={{alignSelf: 'center', marginRight: 5}}
                      color={'#2b8ada'}
                    />
                    <Text style={{color: '#2b8ada', fontSize: 12}}>
                      Refresh
                    </Text>
                  </TouchableOpacity>
                  {/* <View>
                    <Text
                      style={{
                        color: "#2B8ADA",
                        textDecorationLine: "underline",
                        alignSelf: "flex-end",
                        margin: 5,
                        marginHorizontal: 10,
                        fontSize: 12,
                      }}
                    >
                      View More
                    </Text>
                  </View> */}
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignSelf: "center",
                      marginVertical: 5,
                    }}
                  >
                    <CheckBox
                      title="E-Consultation"
                      containerStyle={styles.checkBoxContainerStyle}
                      textStyle={{ width: "80%", fontSize: 14 }}
                      checkedColor={"#2b8ada"}
                      checked={upcomingEConsultations}
                      onPress={() => {
                        setupcomingEConsultations(!upcomingEConsultations);
                      }}
                    />
                    <CheckBox
                      title="P-Consultation"
                      containerStyle={styles.checkBoxContainerStyle}
                      textStyle={{ width: "80%", fontSize: 14 }}
                      checkedColor={"#2b8ada"}
                      checked={upcomingPConsultations}
                      onPress={() => {
                        setupcomingPConsultations(!upcomingPConsultations);
                      }}
                    />
                  </View> */}
                  <View>
                    {/*Card Design */}
                    {UpcomingData != '' ? (
                      <FlatList
                        data={UpcomingData}
                        keyExtractor={item => item.consultationId}
                        renderItem={renderCard}
                      />
                    ) : (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        No Data Available for Upcoming Consultations
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : null}

            {/* Prescription Pending White Label */}
            <TouchableOpacity
              style={[styles.WhiteLabel]}
              onPress={() => setpending(!pending)}>
              <FAIcon
                name="prescription"
                size={15}
                color={pending ? '#2b8ada' : 'gray'}
                style={{marginLeft: 3, alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  pending ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Prescription Pending
              </Text>
              <FAIcon
                name={pending ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[pending ? {color: '#2B8ADA'} : {color: 'black'}]}
              />
            </TouchableOpacity>
            {/* Prescription Pending Data */}
            {pending ? (
              <View style={{flexDirection: 'column'}}>
                <View style={{backgroundColor: '#E8F0FE'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      paddingHorizontal: 10,
                      marginLeft: 10,
                    }}
                    onPress={getPendingData}>
                    <FAIcon
                      name="redo-alt"
                      size={12}
                      style={{alignSelf: 'center', marginRight: 5}}
                      color={'#2b8ada'}
                    />
                    <Text style={{color: '#2b8ada', fontSize: 12}}>
                      Refresh
                    </Text>
                  </TouchableOpacity>

                  <View>
                    {PendingData != '' ? (
                      <FlatList
                        data={PendingData}
                        keyExtractor={item => item.consultationId}
                        renderItem={renderCardPending}
                      />
                    ) : (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        No Data Available for Pending Prescriptions
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : null}

            {/* Recent Consultaions White Label */}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setStatus(!Status)}>
              <Entypo
                name="back-in-time"
                size={17}
                color={Status ? '#2b8ada' : 'gray'}
                style={{
                  marginLeft: 3,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  Status ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Recent Consultations
              </Text>
              <FAIcon
                name={Status ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[Status ? {color: '#2B8ADA'} : {color: 'black'}]}
              />
            </TouchableOpacity>
            {/* Recent Consultaions Body Data */}
            {Status ? (
              <View style={{flexDirection: 'column'}}>
                <View style={{backgroundColor: '#E8F0FE'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      paddingHorizontal: 10,
                      marginLeft: 10,
                    }}
                    onPress={getRecentData}>
                    <FAIcon
                      name="redo-alt"
                      size={12}
                      style={{alignSelf: 'center', marginRight: 5}}
                      color={'#2b8ada'}
                    />
                    <Text style={{color: '#2b8ada', fontSize: 12}}>
                      Refresh
                    </Text>
                  </TouchableOpacity>
                  {/* {StatusData != '' ? (
                    <View>
                      <Text
                        style={{
                          color: '#2B8ADA',
                          textDecorationLine: 'underline',
                          alignSelf: 'flex-end',
                          margin: 5,
                          marginHorizontal: 10,
                          fontSize: 12,
                        }}>
                        View More
                      </Text>
                    </View>
                  ) : null} */}

                  <View>
                    {/*Card Design Completed Consultaions */}
                    {StatusData != '' ? (
                      <FlatList
                        data={StatusData}
                        keyExtractor={item => item.consultationId}
                        renderItem={renderCardRecent}
                      />
                    ) : (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        No Recent Consultations Data Found
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : null}

            {/* Completed Consultaions White Label */}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setComplete(!Complete)}>
              <FAIcon
                name="calendar-check"
                size={15}
                color={Complete ? '#2b8ada' : 'gray'}
                style={{marginLeft: 3, alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  Complete ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Completed Consultations
              </Text>
              <FAIcon
                name={Complete ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[Complete ? {color: '#2B8ADA'} : {color: 'black'}]}
              />
            </TouchableOpacity>
            {/* Completed Consultaions Body Data */}
            {Complete ? (
              <View style={{flexDirection: 'column'}}>
                <View style={{backgroundColor: '#E8F0FE'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      paddingHorizontal: 10,
                      marginLeft: 10,
                    }}
                    onPress={getCompletedData}>
                    <FAIcon
                      name="redo-alt"
                      size={12}
                      style={{alignSelf: 'center', marginRight: 5}}
                      color={'#2b8ada'}
                    />
                    <Text style={{color: '#2b8ada', fontSize: 12}}>
                      Refresh
                    </Text>
                  </TouchableOpacity>
                  {/* {CompleteData != '' ? (
                    <View>
                      <Text
                        style={{
                          color: '#2B8ADA',
                          textDecorationLine: 'underline',
                          alignSelf: 'flex-end',
                          margin: 5,
                          marginHorizontal: 10,
                          fontSize: 12,
                        }}>
                        View More
                      </Text>
                    </View>
                  ) : null} */}

                  <View>
                    {/*Card Design Completed Consultaions */}
                    {CompleteData != '' ? (
                      <View>
                        <FlatList
                          data={CompleteData}
                          keyExtractor={item => item.consultationId}
                          renderItem={renderCardCompleted}
                        />
                      </View>
                    ) : (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        No Completed Consultations Data Found
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginVertical: 10,
                      }}>
                      {strtCC != 0 ? (
                        <Pressable
                          style={{flexDirection: 'row', marginRight: 10}}
                          onPress={() => onPrev()}>
                          <FAIcon
                            size={15}
                            name="chevron-left"
                            style={{
                              fontWeight: 'bold',
                              alignSelf: 'center',
                            }}
                            color={strtCC == 0 ? '#E8F0FE' : 'black'}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              alignSelf: 'center',
                              color: strtCC == 0 ? '#E8F0FE' : 'black',
                              marginLeft: 3,
                            }}>
                            Previous
                          </Text>
                        </Pressable>
                      ) : null}
                      {endOfList ? (
                        <Pressable
                          style={{flexDirection: 'row'}}
                          onPress={() => onNext()}>
                          <Text
                            style={{
                              fontSize: 12,
                              alignSelf: 'center',
                              marginRight: 3,
                              color: 'black',
                            }}>
                            Next
                          </Text>
                          <FAIcon
                            size={15}
                            name="chevron-right"
                            style={{
                              fontWeight: 'bold',
                              alignSelf: 'center',
                            }}
                          />
                        </Pressable>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {/* History Modal */}
            {HistoryModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={HistoryModal}
                onRequestClose={() => {
                  setHistoryModal(!HistoryModal);
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
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          padding: 5,
                        }}>
                        History
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setHistoryModal(false)}
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
                        }}>
                        {historyData != '' ? (
                          <View style={{minHeight: 270, width: '100%'}}>
                            <FlatList
                              data={historyData}
                              keyExtractor={item => item.uploadedDate}
                              renderItem={renderHistory}
                            />
                          </View>
                        ) : (
                          <View>
                            <Text style={{textAlign: 'center'}}>
                              No previous record has been found
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Todays Doc Modal */}
            {TodaysModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={TodaysModal}
                onRequestClose={() => {
                  setTodaysModal(!TodaysModal);
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
                        marginBottom: 5,
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
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setTodaysModal(false)}
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
                        }}>
                        {TodaysDocs != '' && TodaysDocs != null ? (
                          <View style={{width: '100%', alignSelf: 'center'}}>
                            <FlatList
                              data={TodaysDocs}
                              keyExtractor={item => item.documentName}
                              renderItem={renderToday}
                              scrollEnabled={true}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{}}>
                              No document has been uploaded by the patient
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {ManageStatusModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={ManageStatusModal}
                onRequestClose={() => {
                  setManageStatusModal(!ManageStatusModal);
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
                        }}>
                        Manage Status
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setManageStatusModal(false)}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 7,
                        marginVertical: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        Consultation Completed?
                      </Text>
                      <SelectList
                        defaultOption={'Yes'}
                        placeholder={' '}
                        setSelected={val => setManageStatus(val)}
                        data={dataStatus}
                        save="value"
                        boxStyles={{
                          backgroundColor: '#F3F7FE',
                          borderWidth: 0,
                          marginVertical: 5,
                        }}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        badgeStyles={{backgroundColor: '#2b8ada'}}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 7,
                        marginVertical: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        Have you made the prescription?
                      </Text>
                      <SelectList
                        defaultOption={'Yes'}
                        placeholder={' '}
                        setSelected={val => setPrescriptionMade(val)}
                        data={dataStatus}
                        save="value"
                        boxStyles={{
                          backgroundColor: '#F3F7FE',
                          borderWidth: 0,
                          marginVertical: 5,
                        }}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        badgeStyles={{backgroundColor: '#2b8ada'}}
                      />
                    </View>
                    <CustomButton
                      text="Save"
                      textstyle={{color: 'white'}}
                      style={{
                        backgroundColor: '#2B8ADA',
                        width: '95%',
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        setManageStatusModal(false);
                        if (PrescriptionMade == 'No') {
                          Alert.alert(
                            'Prescription Missing',
                            'Please make Prescription for the patient',
                          );
                          //onPressPrescription();
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {ConsultationQuestionnaire ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={ConsultationQuestionnaire}
                onRequestClose={() => {
                  setConsultationQuestionnaire(!ConsultationQuestionnaire);
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
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          padding: 5,
                        }}>
                        Consultation Questionnaire
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setConsultationQuestionnaire(false)}
                      />
                    </View>
                    <View
                      style={{width: '100%', minHeight: 100, maxHeight: 300}}>
                      {PreconsultaionQuestionData != '' ||
                      PreconsultaionQuestionData != null ? (
                        <FlatList
                          data={PreconsultaionQuestionData}
                          keyExtractor={item => item.question}
                          renderItem={renderQuestionAnswers}
                          scrollEnabled={true}
                        />
                      ) : (
                        <Text style={{justifyContent: 'center'}}>
                          Not answered by patient
                        </Text>
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
                        Document
                      </Text>
                      <FAIcon
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
                      <View
                        style={{alignSelf: 'center', flexDirection: 'column'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-evenly',
                            width: '95%',
                          }}>
                          <TouchableOpacity>
                            <FAIcon
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
                            <FAIcon
                              name="plus-circle"
                              size={20}
                              color={'gray'}
                              onPress={onZoomIn}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}></View>
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
                              `file://${RNFS.DownloadDirectoryPath}/` +
                                fileName,
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
          </View>
        </ScrollView>
        {isFetching == true && (
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
                source={downloading}
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
                {'Please wait '}
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
                {'We are fetching details'}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  searchBar: {
    height: 50,
    width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2B8ADA',
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBarText: {
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    right: 0,
    margin: 15,
  },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 5,
    flexDirection: 'column',
    borderColor: 'gray',
  },
  name: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    padding: 3,
  },
  cardText: {fontSize: 12},
  checkBoxContainerStyle: {
    backgroundColor: '#E8F0FE',
    flex: 0.45,
    borderWidth: 0,
    padding: 0,
  },
  WhiteLabel: {
    flexDirection: 'row',
    width: '95%',
    marginVertical: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  tag: {
    color: 'white',
    padding: 5,
    paddingVertical: 10,
    fontSize: 5,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    zIndex: 1,
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
  HistoryModalText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bubbleHeading: {
    color: 'black',
    padding: 5,
    width: '90%',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  bubbleHeadingActive: {
    color: 'white',
    padding: 5,
    width: '90%',
  },
  bubbleActive: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2B8ADA',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default DoctorHome;
