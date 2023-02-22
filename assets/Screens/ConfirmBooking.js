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

const data = {
  name: 'Dr. Imran Singh',
  spl: 'Psychiatry',
  exp: '10 Years of experience',
  deg: 'MBBS, MD, FID, CCLHA',
  city: 'New Delhi',
  email: 'Imran@gmail.com',
  pres: '',
  age: 36,
  dob: '03/02/1973',
  img: doctor_m,
  doctorConsultationFeesDTO: {
    eConsulationFees: 500,
    followUpFees: 0,
    physicalConsulationFees: 800,
  },
  doctorEducationsDTOs: [
    {
      degree: 'MBBS',
      degreePath: 'string',
      doctorEducationPkId: 0,
      passingYear: '1986',
      specialization: ['Psychiatry', 'Diabetologist', 'General Physician'],
      totalExperiencedInMonths: 0,
      university: 'IGNOU',
    },
  ],
  doctorClinicDetailsDTOs: [
    {
      doctorclinicpkid: 1,
      clinicName: 'ABCD',
      clinicAddress: 'Ashok Road',
      specialInstruction: 'wear mask',
    },
    {
      doctorclinicpkid: 2,
      clinicName: 'XYZ',
      clinicAddress: 'rohtak road',
      specialInstruction: 'wear mask',
    },
    {
      doctorclinicpkid: 3,
      clinicName: 'QWERTY',
      clinicAddress: 'Rajpur Road',
      specialInstruction: 'wear mask',
    },
  ],
};
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
  const [selfp, setselfp] = useState(true);
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
  const [AppointmentFor, setAppointmentFor] = useState([]);
  const [THOrderId, setTHOrderId] = useState(0);
  const [PayonClinic, setPayonClinic] = useState(false);

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
      setSpecialUser(y.isSpecialPatient);
    };
    LoadData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            let x = JSON.parse(
              await AsyncStorage.getItem('ConfirmBookingDoctor'),
            );
            let mode =
              x.consultationType == 'PHYSICAL'
                ? 'P_CONSULTATION'
                : 'E_CONSULTATION';
            await axios
              .delete(
                apiConfig.baseUrl +
                  '/patient/slot/prebook/delete?consultation=' +
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
          },
          AppointmentFor.familyId == item.familyId
            ? {backgroundColor: '#2b8ada'}
            : null,
        ]}
        onPress={() => {
          setAppointmentFor(item);
          setselfp(false);
          setfamily(false);
        }}>
        <Text
          style={[
            {color: 'black', fontSize: 12},
            AppointmentFor.familyId == item.familyId ? {color: 'white'} : null,
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
    let createOrder = {
      amount:
        PrevPageData.mode != 'E_CONSULTATION'
          ? PrevPageData.doctorDet.pconsultationFees
          : PrevPageData.doctorDet.econsultationFees,
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
              //image: '',
              currency: 'INR',
              key: response.data.razorpayKey,
              amount: response.data.amount,
              name: 'Arogya',
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
                Alert.alert(`Error: ${error.code} | ${error.description}`);
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
      status: item == null ? 'Unsuccessful' : 'Successful',
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

  const bookConsultation = async () => {
    let p = {
      // clinicId: 0,
      consultationType: PrevPageData.consultationType,
      doctorId: DocDet.doctorId,
      // familyId: 0,
      //feesAmount: 0,
      doctorName: DocDet.doctorName,
      isSpecialUser: SpecialUser,
      patientId: patientDet.patientId,
      patientName: patientDet.patientName,
      patientSymtoms: symptoms,
      paymentStatus: SpecialUser
        ? 'SPECIAL_USER'
        : PayonClinic
        ? 'PAY_ON_CLINIC'
        : 'PRE_PAID',
      slotDate: PrevPageData.slotDate,
      slotEndTime: PrevPageData.slotEndTime.substring(0, 5),
      slotId: PrevPageData.slotId,
      slotStartTime: PrevPageData.slotStartTime.substring(0, 5),
      trustHealOrderid: THOrderId,
    };

    if (PrevPageData.consultationType == 'PHYSICAL') {
      p.feesAmount = DocDet.pconsultationFees;
      p.clinicId = PrevPageData.clinicId;
    } else {
      p.feesAmount = DocDet.econsultationFees;
    }

    if (AppointmentFor != '') {
      p.familyId = AppointmentFor.familyId;
      p.patientName = AppointmentFor.name;
    }

    console.log('========== Book Appointment ================\n', p);

    axios
      .post(apiConfig.baseUrl + '/patient/consultation/book', p)
      .then(response => {
        if (response.status == 200) {
          Alert.alert(
            'Success',
            `Your consultation with ${PrevPageData.doctorDet.doctorName} is booked. Now fill preconsultation questionnaire and upload documents to help doctor consult you better.`,
          );
          navigation.navigate('PreConsult');
        }
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
          <HeaderPatient showMenu={false} title="Confirm Booking" />
          {/* Top */}
          <DoctorBasicDetails DocDet={DocDet} />
          {/* Middle Text */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}>
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
          </View>

          {/* Appointment For */}
          {paymentDone ? (
            <View>
              {/* Appointment For */}
              <View
                style={{
                  marginBottom: 10,
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Appointment For
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
                        setAppointmentFor(patientDet);
                      }}
                    />
                  </View>
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
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

                    <CustomButton
                      text={'+ Add Family Member'}
                      textstyle={[
                        {fontSize: 12},
                        family ? {color: 'white'} : {color: 'black'},
                      ]}
                      style={[
                        {
                          backgroundColor: 'white',
                          padding: 5,
                          paddingHorizontal: 20,
                          margin: 5,
                        },
                        family ? {backgroundColor: '#2B8ADA'} : null,
                      ]}
                      onPress={() => {
                        setfamily(true);
                        setselfp(false);
                        setAppointmentFor([]);
                      }}
                    />
                  </View>
                </View>
              </View>
              {family ? (
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginBottom: 10,
                      color: 'black',
                    }}>
                    Provide general information about patient:
                  </Text>

                  {/* Form */}
                  {/* Full Name */}
                  <View style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.fomrHeading}>Full Name</Text>
                      <Text style={{color: 'red'}}>*</Text>
                    </View>
                    <TextInput style={styles.formInput} />
                  </View>
                  {/* Relation */}
                  <View style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.fomrHeading}>Relation</Text>
                      <Text style={{color: 'red'}}>*</Text>
                    </View>
                    <SelectList
                      defaultOption={formRelation}
                      placeholder={' '}
                      setSelected={val => setformRelation(val)}
                      data={dataRelation}
                      save="value"
                      boxStyles={[
                        {
                          backgroundColor: 'white',
                          borderWidth: 0,
                          borderRadius: 5,
                        },
                      ]}
                      dropdownStyles={{
                        backgroundColor: 'white',
                        zIndex: 1,
                      }}
                      dropdownTextStyles={{
                        color: '#2b8ada',
                        fontWeight: 'bold',
                      }}
                      badgeStyles={{backgroundColor: '#2b8ada'}}
                    />
                  </View>
                  {/* Date of Birth */}
                  <View style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.fomrHeading}>Date of Birth</Text>
                      <Text style={{color: 'red'}}>*</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        style={styles.formInput}
                        value={formDob}
                        editable={false}
                      />
                      <FAIcons
                        name="calendar-alt"
                        size={15}
                        color={'gray'}
                        style={{
                          position: 'absolute',
                          right: 0,
                          margin: 10,
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </View>
                  {/* Gender */}
                  <View style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.fomrHeading}>Gender</Text>
                      <Text style={{color: 'red'}}>*</Text>
                    </View>
                    <SelectList
                      defaultOption={formGender}
                      placeholder={' '}
                      setSelected={val => setformGender(val)}
                      data={dataGender}
                      save="value"
                      boxStyles={[
                        {
                          backgroundColor: 'white',
                          borderWidth: 0,
                          borderRadius: 5,
                        },
                      ]}
                      dropdownStyles={{
                        backgroundColor: 'white',
                        zIndex: 1,
                      }}
                      dropdownTextStyles={{
                        color: '#2b8ada',
                        fontWeight: 'bold',
                      }}
                      badgeStyles={{backgroundColor: '#2b8ada'}}
                    />
                  </View>
                  {/* Mobile Number */}
                  <View style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.fomrHeading}>Mobile Number</Text>
                      <Text style={{color: 'red'}}>*</Text>
                    </View>
                    <TextInput
                      onChangeText={text => setformMob(text)}
                      value={formMob}
                      keyboardType={'number-pad'}
                      maxLength={10}
                      style={styles.formInput}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginBottom: 5,
                      color: 'black',
                    }}>
                    Other Details:
                  </Text>
                  <View style={{marginBottom: 10, flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginBottom: 5,
                      }}>
                      {/* Blood Group */}
                      <View style={{flexDirection: 'column', flex: 0.45}}>
                        <Text style={styles.fomrHeading}>Blood Group</Text>
                        <SelectList
                          defaultOption={formBloodGroup}
                          placeholder={' '}
                          setSelected={val => setformBloodGroup(val)}
                          data={dataBloodGroup}
                          save="value"
                          boxStyles={[
                            {
                              backgroundColor: 'white',
                              borderWidth: 0,
                              borderRadius: 5,
                            },
                          ]}
                          dropdownStyles={{
                            backgroundColor: 'white',
                            zIndex: 1,
                          }}
                          dropdownTextStyles={{
                            color: '#2b8ada',
                            fontWeight: 'bold',
                          }}
                          badgeStyles={{backgroundColor: '#2b8ada'}}
                        />
                      </View>
                      {/* Occupation */}
                      <View style={{flexDirection: 'column', flex: 0.45}}>
                        <Text style={styles.fomrHeading}>Occupation</Text>
                        <TextInput style={styles.formInput} />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginBottom: 5,
                      }}>
                      {/* Height */}
                      <View style={{flexDirection: 'column', flex: 0.45}}>
                        <Text style={styles.fomrHeading}>Height</Text>
                        <TextInput style={styles.formInput} />
                      </View>
                      {/* Weight */}
                      <View style={{flexDirection: 'column', flex: 0.45}}>
                        <Text style={styles.fomrHeading}>Weight</Text>
                        <TextInput style={styles.formInput} />
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}
              {/* Symptoms */}
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text style={styles.fomrHeading}>
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
                    maxLength={50}
                    onChangeText={text => setsymptoms(text)}
                    value={symptoms}
                  />
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Characters {symptoms.length}/50
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* CheckBox */}
          <View style={{width: '95%', alignSelf: 'center'}}>
            <CheckBox
              title={
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                  I agree to Aarogya{' '}
                  <Text
                    style={[styles.textLink]}
                    onPress={() => {
                      viewTermsConditions();
                    }}>
                    Terms and Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={[styles.textLink]}
                    onPress={() => {
                      viewPrivacyPolicy();
                    }}>
                    Privacy Policy
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
          {!paymentDone ? (
            <CustomButton
              text={'Proceed to Payment'}
              textstyle={{color: 'white', fontSize: 13}}
              style={{
                backgroundColor: '#2b8ada',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}
              onPress={async () => {
                await paymentOrderCreate();
                //await bookConsultation();
              }}
            />
          ) : (
            <CustomButton
              text={'Book Appointment'}
              textstyle={{color: 'white', fontSize: 13}}
              style={{
                backgroundColor: 'limegreen',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}
              onPress={async () => {
                // await paymentOrderCreate();
                await bookConsultation();
              }}
            />
          )}
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
                    '/patient/slot/prebook/delete?consultation=' +
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
                  Alert.alert('Error', `Error in Delete PreBook:-\n ${error}`);
                });
            }}
          />

          <CustomButton
            text={'Cache Keys'}
            textstyle={{color: 'white', fontSize: 13}}
            style={{
              backgroundColor: 'limegreen',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={async () => {
              console.log(await AsyncStorage.getAllKeys());
            }}
          />
        </ScrollView>
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
});

export default ConfirmBoking;
