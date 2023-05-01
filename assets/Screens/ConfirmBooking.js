import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  Linking,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import apiConfig from '../API/apiConfig';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

//icons
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';
import doctor_m from '../Resources/doctor_m.png';
import CustomButton from '../Components/CustomButton';
import {SelectList} from 'react-native-dropdown-select-list';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';
import RazorpayCheckout from 'react-native-razorpay';
import DoctorBasicDetails from '../Components/DoctorBasicDetails';
import waiting from '../Animations/waiting1.gif';

const dataBloodGroup = [
  {key: 'A+', value: 'A+'},
  {key: 'A-', value: 'A-'},
  {key: 'B+', value: 'B+'},
  {key: 'B-', value: 'B-'},
  {key: 'O+', value: 'O+'},
  {key: 'O-', value: 'O-'},
  {key: 'AB+', value: 'AB+'},
  {key: 'AB-', value: 'AB-'},
];
const dataRelation = [
  {key: 'Father', value: 'Father'},
  {key: 'Mother', value: 'Mother'},
  {key: 'Grand Father', value: 'Grand Father'},
  {key: 'Grand Mother', value: 'Grand Mother'},
  {key: 'Spouse', value: 'Spouse'},
  {key: 'Son', value: 'Son'},
  {key: 'Daughter', value: 'Daughter'},
];
const dataGender = [
  {key: 'Male', value: 'Male'},
  {key: 'Female', value: 'Female'},
  {key: 'Other', value: 'Other'},
];

function ConfirmBoking({navigation}) {
  const [family, setfamily] = useState(false);
  const [familyMembers, setfamilyMembers] = useState(null);
  const [selfp, setselfp] = useState(false);
  const [privatePolicy, setprivatePolicy] = useState(false);
  const [symptoms, setsymptoms] = useState('');
  //form data
  const [formname, setformname] = useState('');
  const [formRelation, setformRelation] = useState('');
  const [formDob, setformDob] = useState('');
  const [formGender, setformGender] = useState('');
  const [formMob, setformMob] = useState('');
  const [formBloodGroup, setformBloodGroup] = useState('');
  const [formOccupation, setformOccupation] = useState('');
  const [formHeight, setformHeight] = useState('');
  const [formWeight, setformWeight] = useState('');
  const [PrevPageData, setPrevPageData] = useState(null);
  const [DocDet, setDocDet] = useState(null);
  const [patientDet, setpatientDet] = useState(null);
  const [Order, setOrder] = useState(null);
  const [paymentDone, setpaymentDone] = useState(false);
  const [SpecialUser, setSpecialUser] = useState(false);
  const [FamilyList, setFamilyList] = useState([]);
  const [AppointmentFor, setAppointmentFor] = useState(null);
  const [THOrderId, setTHOrderId] = useState(0);
  const [PayonClinic, setPayonClinic] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isFollowUp, setisFollowUp] = useState(false);
  const [fees, setfees] = useState(0);

  const [termsView, setTermsView] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [File, setFile] = useState(null);

  const onZoomIn = () => {
    if (zoom < 2.5) setZoom(zoom + 0.25);
  };
  const onZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.25);
  };
  const downloadTerms = async () => {
    // let op = {};
    // if (Platform.OS == 'ios') op = {NSURLIsExcludedFromBackupKey: true};
    // await RNFS.mkdir(`file://${RNFS.DownloadDirectoryPath}/Arogya`, op);
    let filePath = `file://${RNFS.CachesDirectoryPath}/`;
    let options = {
      fromUrl: `http://trustheal.in/TrustHeal_Refund_and_Cancellation_Policy.pdf`,
      toFile: filePath + 'TermsRefund.pdf',
    };

    await RNFS.downloadFile(options)
      .promise.then(response => {
        console.log(response);
        if (response.statusCode == 200) {
          //  Alert.alert(
          //   'File Downloaded',
          //   `The file is downloaded. File name is ${fileName}.`,
          // );
          setFile(filePath + 'TermsRefund.pdf');
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

  useEffect(() => {
    const LoadData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('ConfirmBookingDoctor'));
      console.log(
        '================ PREVIOUS PAGE DATA =========================\n',
        x,
      );
      setPrevPageData(x);
      setDocDet(x.doctorDet);
      let y = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      console.log(
        '================ Patient Data =========================\n',
        y,
      );
      setpatientDet(y);
      setpaymentDone(y.isSpecialPatient);

      setfees(
        x.mode == 'E_CONSULTATION'
          ? x.doctorDet.econsultationFees
          : x.doctorDet.pconsultationFees,
      );
      if (y.isSpecialPatient != null) setSpecialUser(y.isSpecialPatient);
    };
    LoadData();
  }, []);

  useEffect(() => {
    if (AppointmentFor != null) updateFees();
  }, [AppointmentFor]);

  const updateFees = () => {
    console.log('Checking Effective Fees');
    let temp = [];
    if (
      PrevPageData.doctorObj != null &&
      PrevPageData.doctorObj.followUpEligibles != null
    ) {
      for (
        var i = 0;
        i < PrevPageData.doctorObj.followUpEligibles.length;
        ++i
      ) {
        if (AppointmentFor.patientName != null) {
          if (
            PrevPageData.doctorObj.followUpEligibles[i].familyMemberName == null
          )
            temp.push(
              PrevPageData.doctorObj.followUpEligibles[i].followUpEligibleDate,
            );
        } else if (AppointmentFor.name != null) {
          if (
            PrevPageData.doctorObj.followUpEligibles[i].familyMemberName ==
            AppointmentFor.name
          )
            temp.push(
              PrevPageData.doctorObj.followUpEligibles[i].followUpEligibleDate,
            );
        }
      }
    }
    console.log(
      'Previous Consultation for ',
      AppointmentFor.name != null
        ? AppointmentFor.name
        : AppointmentFor.patientName,
    );
    console.log('Booking Dates', temp);
    if (temp.length == 0) {
      setisFollowUp(false);
      setfees(
        PrevPageData.mode == 'E_CONSULTATION'
          ? PrevPageData.doctorDet.econsultationFees
          : PrevPageData.doctorDet.pconsultationFees,
      );
    } else {
      setisFollowUp(true);
      temp = temp.sort(function (a, b) {
        return new Date(b) - new Date(a);
      });
      if (checkFollowUp(temp.pop())) {
        setfees(
          PrevPageData.mode == 'E_CONSULTATION'
            ? PrevPageData.doctorDet.efollowUpFees
            : PrevPageData.doctorDet.physicalFollowUpFees,
        );
      } else {
        setfees(
          PrevPageData.mode == 'E_CONSULTATION'
            ? PrevPageData.doctorDet.econsultationFees
            : PrevPageData.doctorDet.pconsultationFees,
        );
      }
    }
  };

  // const updateFees = () => {
  //   //setisLoading(true);
  //   console.log('Entering update fees');
  //   console.log('AppointmentFor : ', AppointmentFor);
  //   console.log('PrevPageData : ', PrevPageData);
  //   console.log(
  //     'PrevPageData.previousConsultationOf : ',
  //     PrevPageData.previousConsultationOf,
  //   );
  //   if (
  //     AppointmentFor != null &&
  //     PrevPageData != null &&
  //     PrevPageData.previousConsultationOf != null
  //   ) {
  //     let x =
  //       PrevPageData.mode == 'E_CONSULTATION'
  //         ? PrevPageData.doctorDet.econsultationFees
  //         : PrevPageData.doctorDet.pconsultationFees;
  //     if (
  //       AppointmentFor.patientName != null &&
  //       PrevPageData.previousConsultationOf == 'Self' &&
  //       checkFollowUp(PrevPageData.previousConsultationOn)
  //     ) {
  //       x =
  //         PrevPageData.mode == 'E_CONSULTATION'
  //           ? PrevPageData.doctorDet.efollowUpFees
  //           : PrevPageData.doctorDet.physicalFollowUpFees;
  //     } else if (
  //       AppointmentFor.name != null &&
  //       PrevPageData.previousConsultationOf == AppointmentFor.name &&
  //       checkFollowUp(PrevPageData.previousConsultationOn)
  //     ) {
  //       x =
  //         PrevPageData.mode == 'E_CONSULTATION'
  //           ? PrevPageData.doctorDet.efollowUpFees
  //           : PrevPageData.doctorDet.physicalFollowUpFees;
  //     }
  //     console.log('Effedctive Fees is ', x);
  //     setfees(x);
  //   }
  //   console.log('Exiting update fees');
  //   //setisLoading(false);
  // };

  const checkFollowUp = date => {
    console.log(
      'Checking if ',
      date,
      ' is eligible for follow-up ',
      dayjs(date).diff(dayjs(), 'd') >= 0,
    );

    return dayjs(date).diff(dayjs(), 'd') >= 0;
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'YES',
          onPress: async () => {
            let x = JSON.parse(
              await AsyncStorage.getItem('ConfirmBookingDoctor'),
            );
            let patientDet = JSON.parse(
              await AsyncStorage.getItem('UserPatientProfile'),
            );
            let mode =
              x.consultationType == 'PHYSICAL'
                ? 'P_CONSULTATION'
                : 'E_CONSULTATION';
            await axios
              .delete(
                apiConfig.baseUrl +
                  '/patient/slot/prebooked/delete?consultation=' +
                  mode +
                  '&slotId=' +
                  x.slotId +
                  '&userId=' +
                  patientDet.patientId,
              )
              .then(response => {
                if (response.status == 200) {
                  navigation.goBack();
                }
              })
              .catch(error => {
                Alert.alert('Error', `Error in Delete PreBook:-\n ${error}`);
              });
          },
        },
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getFamily = async () => {
      // let x = JSON.parse(await AsyncStorage.getItem('ConfirmBookingDoctor'));
      axios
        .get(
          apiConfig.baseUrl +
            '/patient/family?patientId=' +
            patientDet.patientId,
        )
        .then(response => {
          if (response.status == 200) {
            console.log(
              '============ Family members  ===================',
              response.data,
            );
            setFamilyList(response.data);
          }
        })
        .catch(error => {
          Alert.alert('Error', `Error in fetching Family members.\n${error}`);
        });
    };
    if (patientDet != null) getFamily();
  }, [patientDet]);

  const RenderFamily = ({item}) => {
    return (
      <TouchableOpacity
        key={item.familyId}
        style={[
          {
            backgroundColor: 'white',
            padding: 5,
            margin: 5,
            borderRadius: 10,
            justifyContent: 'center',
          },
          AppointmentFor != null && AppointmentFor.familyId == item.familyId
            ? {backgroundColor: '#2b8ada'}
            : null,
        ]}
        onPress={() => {
          //updateFees();
          setAppointmentFor(item);
          setselfp(false);
          setfamily(false);
        }}>
        <Text
          style={[
            {color: 'black', fontSize: 12, alignSelf: 'center'},
            AppointmentFor != null && AppointmentFor.familyId == item.familyId
              ? {color: 'white'}
              : null,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const openURL = useCallback(async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  const viewTermsConditions = () => {
    openURL('https://www.google.com');
  };
  const viewPrivacyPolicy = () => {
    openURL('https://www.google.com');
  };

  const paymentOrderCreate = async () => {
    // let amount =
    //   PrevPageData.mode != 'E_CONSULTATION'
    //     ? PrevPageData.doctorDet.pconsultationFees
    //     : PrevPageData.doctorDet.econsultationFees;

    // if (PrevPageData.isFollowUp) {
    //   amount =
    //     PrevPageData.mode != 'E_CONSULTATION'
    //       ? PrevPageData.doctorDet.physicalFollowUpFees
    //       : PrevPageData.doctorDet.efollowUpFees;
    // }

    let createOrder = {
      amount: fees,
      currency: 'INR',
      patientId: patientDet.patientId,
    };

    console.log('============= CREATE ORDER=================\n', createOrder);

    await axios
      .post(apiConfig.baseUrl + '/payment/order/create', createOrder)
      .then(async response => {
        if (response.status == 200) {
          await AsyncStorage.setItem('Order', JSON.stringify(response.data));
          setOrder(response.data);
          console.log(
            '============= Proceeding for Payment ======================\n',
            response.data,
          );
          setTHOrderId(response.data.trustHealOrderId);
          if (response.data != null) {
            var options = {
              description: 'Credits towards consultation',
              image: 'http://trustheal.in/TH_trans.png',
              currency: 'INR',
              key: response.data.razorpayKey,
              amount: response.data.amount,
              name: 'TrustHeal',
              order_id: response.data.gatewayOrderId, //Replace this with an order_id created using Orders API.
              prefill: {
                email: patientDet.email,
                contact: patientDet.mobileNumber,
                name: patientDet.patientName,
              },
              theme: {color: '#2b8ada'},
            };
            RazorpayCheckout.open(options)
              .then(async data => {
                // handle success
                console.log(
                  '===================== PAYMENT SUCCESS ===============================',
                );
                console.log(data);
                setpaymentDone(true);
                await paymentStatusUpdate(data);
                // Alert.alert(
                //   `Transaction Complete!`,
                //   'Please fill the Preconsultation Questionnaire and upload documents',
                // );
                // navigation.navigate('PreConsult');
              })
              .catch(async error => {
                // handle failure
                console.log(
                  '===================== PAYMENT FAILED ===============================',
                );
                await paymentStatusUpdate(null);
                Alert.alert(`Payment Failed`, 'Please try again later', [
                  {
                    text: 'ok',
                    onPress: () => navigation.goBack(),
                  },
                ]);
                console.log(`Error: ${error}`);
              });
          }
        }
      })
      .catch(error => {
        console.log('Erron in create order');
        Alert.alert('Error', `${error}`);
      });
  };

  const paymentStatusUpdate = async item => {
    let Order = JSON.parse(await AsyncStorage.getItem('Order'));

    let p = {
      amount: Order.amount,
      gatewayOrderId: Order.gatewayOrderId,
      paidAmount: Order.amount,
      razorpayKey: Order.razorpayKey,
      razorpaySecert: Order.razorpaySecert,
      status: item == null ? 'Failed' : 'Paid',
      trustHealOrderId: Order.trustHealOrderId,
    };

    console.log(
      '=====================  PAYMENT STATUS UPDATE =========================',
      p,
    );
    await axios
      .put(apiConfig.baseUrl + '/payment/status/update', p)
      .then(async response => {})
      .catch(error => {
        Alert.alert('Error in Update', `${error}`);
      });
    await AsyncStorage.removeItem('Order');
  };

  const window = useWindowDimensions();
  const bookConsultation = async () => {
    setisLoading(true);
    //let fcm = await AsyncStorage.getItem('fcmToken');
    let p = {
      // clinicId: 0,
      //consultationType: PrevPageData.consultationType,
      doctorId: DocDet.doctorId,
      // familyId: 0,
      feesAmount: fees,
      followUpFeesEligible: dayjs()
        .add(DocDet.followUpDuration, 'day')
        .format('YYYY-MM-DD'),
      isSpecialUser: SpecialUser,
      patientId: patientDet.patientId,
      patientName: patientDet.patientName,
      patientSymtoms: symptoms,
      paymentStatus: SpecialUser
        ? 'SPECIAL_USER'
        : PayonClinic
        ? 'PAY_ON_CLINIC'
        : 'PRE_PAID',
      slotId: PrevPageData.slotId,
      trustHealOrderid: THOrderId,
    };

    if (PrevPageData.consultationType == 'PHYSICAL') {
      p.feesAmount = DocDet.pconsultationFees;
      p.clinicId = PrevPageData.clinicId;
    } else {
      p.feesAmount = DocDet.econsultationFees;
    }

    if (AppointmentFor != null && AppointmentFor.name != null) {
      p.familyId = AppointmentFor.familyId;
      p.patientName = AppointmentFor.name;
    } else if (AppointmentFor != null && AppointmentFor.patientName != null) {
      p.patientName = AppointmentFor.patientName;
    }

    console.log('========== Book Appointment ================\n', p);

    if (isFollowUp == false) {
      console.log(apiConfig.baseUrl + '/patient/consultation/book', p);
      axios
        .post(apiConfig.baseUrl + '/patient/consultation/book', p)
        .then(async response => {
          if (response.status == 200) {
            console.log(
              '================== CONSULTATION BOOKED ==================\n',
              response.data,
            );
            setisLoading(false);

            PrevPageData.booked = response.data;

            await AsyncStorage.setItem(
              'ConfirmBookingDoctor',
              JSON.stringify(PrevPageData),
            );
            Alert.alert(
              'Success !',
              `Your consultation with ${PrevPageData.doctorDet.doctorName} is booked.\nPlease fill the following details, for a better consultation experience!`,
            );

            navigation.navigate('PreConsult');
          }
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
          setisLoading(false);
        });
    } else {
      console.log(apiConfig.baseUrl + '/patient/followup/book', p);
      axios
        .post(apiConfig.baseUrl + '/patient/followup/book', p)
        .then(async response => {
          if (response.status == 200) {
            console.log(
              '================== CONSULTATION BOOKED ==================\n',
              response.data,
            );
            setisLoading(false);

            PrevPageData.booked = response.data;

            await AsyncStorage.setItem(
              'ConfirmBookingDoctor',
              JSON.stringify(PrevPageData),
            );
            Alert.alert(
              'Success !',
              `Your consultation with ${PrevPageData.doctorDet.doctorName} is booked.\nPlease fill the following details, for a better consultation experience!`,
            );

            navigation.navigate('PreConsult');
          }
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
          setisLoading(false);
        });
    }
    //setisLoading(false);
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
          <HeaderPatient showMenu={false} title="Confirm Booking" />
          {/* Top */}
          <DoctorBasicDetails DocDet={DocDet} />
          {/* Middle Text */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: 'gray',
            }}>
            {/* Mode of Consultation Heading */}
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Mode of Consultation
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FAIcons
                  name={
                    PrevPageData != null
                      ? PrevPageData.consultationType == 'VIDEO_CALL'
                        ? 'video'
                        : PrevPageData.consultationType == 'PHONE_CALL'
                        ? 'phone-alt'
                        : 'users'
                      : 'users'
                  }
                  size={15}
                  color={'gray'}
                  style={{alignSelf: 'center', marginRight: 5}}
                />
                <Text style={{fontSize: 15, color: 'gray', fontWeight: 'bold'}}>
                  {PrevPageData != null
                    ? PrevPageData.consultationType == 'VIDEO_CALL'
                      ? 'Video Call'
                      : PrevPageData.consultationType == 'PHONE_CALL'
                      ? 'Phone Call'
                      : 'Physical'
                    : null}
                </Text>
              </View>
            </View>
            {/* Date & Time Heading */}
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Date & Time
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {PrevPageData != null
                  ? dayjs(PrevPageData.slotDate).format('DD MMM, YYYY')
                  : null}
                {' at '}
                {PrevPageData != null
                  ? timeformatter(PrevPageData.slotStartTime)
                  : null}
              </Text>
            </View>
            {/* Fees */}
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Fees
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {'₹ '}
                {fees}
              </Text>
            </View>
          </View>

          {/* Appointment For */}
          {!paymentDone ? (
            <View
              style={{
                marginBottom: 10,
                width: '90%',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Appointment for
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <CustomButton
                    text={'Self'}
                    textstyle={[
                      {fontSize: 12},
                      selfp ? {color: 'white'} : {color: 'black'},
                    ]}
                    style={[
                      {
                        backgroundColor: 'white',
                        padding: 5,
                        paddingHorizontal: 20,
                        margin: 5,
                      },
                      selfp ? {backgroundColor: '#2B8ADA'} : null,
                    ]}
                    onPress={() => {
                      setselfp(true);
                      setfamily(false);
                      //updateFees();
                      setAppointmentFor(patientDet);
                    }}
                  />
                </View>
                {!SpecialUser ? (
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Family Member
                    </Text>
                    <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                      <FlatList
                        data={FamilyList}
                        renderItem={RenderFamily}
                        key={item => item.familyId}
                        horizontal={true}
                        style={{flexDirection: 'row'}}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}
          {paymentDone ? (
            <View>
              {/* Symptoms */}
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Give a brief description of your symptoms
                </Text>
                <View
                  style={{
                    marginTop: 2,
                    borderRadius: 5,
                  }}>
                  <TextInput
                    placeholder="Write symptoms here"
                    multiline={true}
                    style={{
                      fontSize: 12,
                      padding: 10,
                      height: 90,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      marginBottom: 10,
                      paddingHorizontal: 15,
                    }}
                    maxLength={250}
                    keyboardType="default"
                    onChangeText={text => setsymptoms(text)}
                    value={symptoms}
                  />
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Characters {symptoms.length}/250
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* CheckBox */}
          {paymentDone ? (
            <View style={{width: '95%', alignSelf: 'center'}}>
              <CheckBox
                title={
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    I agree to TrustHeal{' '}
                    <Text
                      style={[styles.textLink]}
                      onPress={async () => {
                        //await downloadTerms();
                        setTermsView(true);
                      }}>
                      Terms and Conditions
                    </Text>
                  </Text>
                }
                containerStyle={styles.containerStyle}
                textStyle={{width: '90%', fontSize: 11, alignSelf: 'center'}}
                checkedColor={'#2b8ada'}
                checked={privatePolicy}
                iconType={''}
                onPress={() => setprivatePolicy(!privatePolicy)}
              />
            </View>
          ) : null}
          {!paymentDone ? (
            <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
              <CustomButton
                text={'Proceed to Payment'}
                textstyle={{color: 'white', fontSize: 13}}
                style={{
                  backgroundColor: '#2b8ada',

                  borderRadius: 10,
                }}
                onPress={async () => {
                  if (AppointmentFor != null) await paymentOrderCreate();
                  else
                    Alert.alert(
                      'Incomplete Details',
                      'Please select for whom are you booking appointment for.',
                    );
                }}
              />
              {/* <CustomButton
                text={'Pay at Clinic'}
                textstyle={{color: 'white', fontSize: 13}}
                style={{
                  backgroundColor: '#2b8ada',
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginVertical:10,
                }}
                onPress={async () => {
                  await paymentOrderCreate();
                }}
              /> */}
            </View>
          ) : (
            <CustomButton
              text={'Book Appointment'}
              textstyle={{color: 'white', fontSize: 13}}
              style={[
                {
                  backgroundColor: 'limegreen',
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                },
                paymentDone ? {marginBottom: 20} : null,
              ]}
              onPress={async () => {
                // await paymentOrderCreate();
                if (symptoms == '')
                  Alert.alert(
                    'Incomplete Details',
                    'Please fill in symptoms before booking',
                  );
                else if (privatePolicy == false)
                  Alert.alert(
                    'Terms and Condition',
                    'Please agree to T&C and Privacy Policy',
                  );
                else await bookConsultation();
              }}
            />
          )}
          {!paymentDone ? (
            <CustomButton
              text={'Cancel'}
              textstyle={{color: '#2b8ada', fontSize: 13, formWeight: 'bold'}}
              style={{
                borderColor: '#2b8ada',
                borderWidth: 2,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 15,
              }}
              onPress={async () => {
                let mode =
                  PrevPageData.consultationType == 'PHYSICAL'
                    ? 'P_CONSULTATION'
                    : 'E_CONSULTATION';

                await axios
                  .delete(
                    apiConfig.baseUrl +
                      '/patient/slot/prebooked/delete?consultation=' +
                      mode +
                      '&slotId=' +
                      PrevPageData.slotId +
                      '&userId=' +
                      patientDet.patientId,
                  )
                  .then(response => {
                    if (response.status == 200) {
                      navigation.goBack();
                    }
                  })
                  .catch(error => {
                    Alert.alert(
                      'Error',
                      `Error in Delete PreBook:-\n ${error}`,
                    );
                  });
              }}
            />
          ) : null}
        </ScrollView>
        {termsView ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={termsView}
            onRequestClose={() => {
              setTermsView(!termsView);
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
                    padding: 25,
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
                    Terms and Condition
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
                      setTermsView(false);

                      setZoom(1);
                    }}
                  />
                </View>
                <ScrollView
                  style={{
                    minHeight: 150,
                    width: '100%',
                    maxHeight: window.height - 200,
                  }}>
                  <View style={{alignSelf: 'center', width: '90%'}}>
                    {/* 1.	Refunds Policy:   */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'black',
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        1. Refunds Policy:
                      </Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.parStyles}>
                          • In the event that technical difficulties at our end
                          prevent the teleconsultation appointment from taking
                          place, the full amount paid by the patient will be
                          refunded.
                        </Text>
                        <Text style={styles.parStyles}>
                          • If the teleconsultation appointment is
                          unsatisfactory, the patient may send in a reasoned
                          written request for a partial or full refund, which
                          will be reviewed and may be granted on a case-by-case
                          basis at our sole discretion.
                        </Text>
                      </View>
                    </View>
                    {/* 2.	Cancellation Policy:  */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'black',
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        2. Cancellation Policy:
                      </Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.parStyles}>
                          • If the patient cancels the teleconsultation
                          appointment with at least 24 hours' advance written
                          notice, the full amount paid by him / her will be
                          refunded.
                        </Text>
                        <Text style={styles.parStyles}>
                          • If the patient cancels the appointment with less
                          than 24 hours' notice, no refund will be provided.
                        </Text>
                        <Text style={styles.parStyles}>
                          • If the teleconsultation appointment is missed
                          without any prior timely cancellation, no refund will
                          be provided.
                        </Text>
                      </View>
                    </View>

                    {/* 3.	User Agreement:  */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'black',
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        3. User Agreement:
                      </Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.parStyles}>
                          • By proceeding, I agree that I have read and
                          understood the terms & conditions of usage of this
                          platform and consent to / accept the same. I am
                          voluntarily availing the services provided on this
                          platform. I am fully aware that on this platform I
                          will not be undergoing any physical examination by a
                          physician who may recommend medical tests and/or
                          treatment and/or the prescribe OTC drugs.
                        </Text>
                        <Text style={styles.parStyles}>
                          • I am also aware that the consultation on this
                          platform does not remove the need for me to visit a
                          physician and opt for physical examination at any
                          point in time and I am free to request for the same.
                          Such a physical examination may even be advised by the
                          consulting physician.
                        </Text>
                      </View>
                    </View>
                    {/* 4.	Changes to Policy:   */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'black',
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        4. Changes to Policy:
                      </Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.parStyles}>
                          • We reserve the right to modify this policy at any
                          time, and any changes will be updated / posted on this
                          page. By using the teleconsultation service after any
                          changes have been made, you agree to the updated
                          policy.
                        </Text>
                      </View>
                    </View>
                    {/* 5.	Contact Us:  */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'black',
                          fontWeight: 'bold',
                          marginVertical: 5,
                        }}>
                        5. Contact Us:
                      </Text>
                      <View style={{flex: 1}}>
                        <Text style={styles.parStyles}>
                          • If you have any questions or concerns about this
                          policy, please contact us at{' '}
                          <Text
                            style={{
                              color: 'blue',
                              textDecorationLine: 'underline',
                              textDecorationColor: 'blue',
                            }}>
                            contact@trustheal.in
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
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
                Please Wait...
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
  containerStyle: {
    backgroundColor: '#e8f0fe',
    marginVertical: 0,
    borderWidth: 0,
  },
  fomrHeading: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2b8ada',
    fontWeight: 'bold',
  },
  formInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  modalView: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
  },
  modalText: {
    marginVertical: 15,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  parStyles: {
    textAlign: 'justify',
    fontSize: 13,
    marginVertical: 5,
    lineHeight: 15,
    color: 'black',
  },
});

export default ConfirmBoking;
