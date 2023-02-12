import React, {useState, useEffect} from 'react';
import {
  Alert,
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
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import OptionsMenu from 'react-native-option-menu';
import apiConfig from '../API/apiConfig';

//images
import doctor_m from '../Resources/doctor_m.png';
import doctor_f from '../Resources/doctor_f.jpg';
import CustomButton from '../Components/CustomButton';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';

const dataUpcoming = [
  {
    name: 'Dr. Ishita Singh',
    spl: 'Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: '',
    type: 'P-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    img: doctor_f,
  },
  {
    name: 'Dr. Imran Ahmed',
    spl: 'Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: 'phonecall',
    type: 'E-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    img: doctor_m,
  },
  {
    name: 'Dr. Riya Negi',
    spl: 'Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: 'videocall',
    type: 'E-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    img: doctor_f,
  },
  {
    name: 'Dr. Ishita Ahmed',
    spl: 'Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: '',
    type: 'P-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    img: doctor_f,
  },
];
const dataCompleted = [
  {
    name: 'Dr. Ishita Singh',
    spl: 'Cardiology',
    fees: '500/-',
    slottime: '9:00-10:00am',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: '',
    type: 'P-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    history: '',
    img: doctor_f,
  },
  {
    name: 'Dr. Imran Ahmed',
    spl: 'Cardiology',
    fees: '500/-',
    slottime: '9:00-10:00am',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: 'phonecall',
    type: 'E-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    history: '',
    img: doctor_m,
  },
  {
    name: 'Dr. Riya Negi',
    spl: 'Cardiology',
    fees: '500/-',
    slottime: '9:00-10:00am',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: 'videocall',
    type: 'E-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    history: '',
    img: doctor_f,
  },
  {
    name: 'Dr. Ishita Ahmed',
    spl: 'Cardiology',
    fees: '500/-',
    slottime: '9:00-10:00am',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: '',
    type: 'P-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    history: '',
    img: doctor_f,
  },
];
const UpcomingServiceResponse = [
  {
    city: 'Delhi',
    clinicAddress: 'Rajpur Road',
    clinicName: 'Max Hospital',
    consultationId: 1,
    consultationStatus: 'BOOKED',
    consultationType: 'PHONE_CALL',
    doctorDob: '1947-06-14',
    doctorEmail: 'abc@geu.ac.in',
    doctorId: 1,
    doctorName: 'Dr. Imran Khan',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: '',
    feesAmout: 400,
    paymentStatus: 'PAY_ON_CLINIC',
    slotDate: '2023-02-07',
    slotEndTime: '11:30',
    slotStartTime: '11:00',
    specialization: ['ENT', 'Dermatology', 'Physician'],
  },
  {
    city: 'Delhi',
    clinicAddress: 'Lal Pul Road',
    clinicName: 'Mahant Indresh',
    consultationId: 2,
    consultationStatus: 'BOOKED',
    consultationType: 'PHYSICAL',
    doctorDob: '1947-06-14',
    doctorEmail: 'abc@geu.ac.in',
    doctorId: 2,
    doctorName: 'Dr. Wolfeschlegelsteinhausenbergerdorff Sr.',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: '',
    feesAmout: 900,
    paymentStatus: 'PAY_ON_CLINIC',
    slotDate: '2023-02-07',
    slotEndTime: '20:30',
    slotStartTime: '20:27',
    specialization: ['Physician'],
  },
];

const CompletedServiceResponse = [
  {
    clinicAddress: 'DL Road',
    clinicName: 'Vaish Nursing Home',
    consultationId: 1,
    consultationStatus: 'COMPLETED',
    consultationType: 'PHYSICAL',
    doctorId: 1,
    doctorName: 'Dr. Amit Vaish',
    doctorPhoto: 215448540,
    //familyId: 0,
    //familyMemberName: 'string',
    feesAmout: 400,
    followUpEligible: '2023-02-21',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 2154564614,
    reVisitDate: '2023-04-11',
    slotDate: '2023-02-11',
    slotEndTime: '11:00',
    slotStartTime: '10:00',
    specialization: ['ENT,Dematology'],
  },
  {
    consultationId: 2,
    consultationStatus: 'COMPLETED',
    consultationType: 'VIDEO_CALL',
    doctorId: 2,
    doctorName: 'Dr. Sumit Kumar',
    doctorPhoto: 1545464844,
    //familyId: 0,
    //familyMemberName: 'string',
    feesAmout: 600,
    followUpEligible: '2023-02-16',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 1548468680,
    reVisitDate: '2023-03-11',
    slotDate: '2023-02-09',
    slotEndTime: '23:00',
    slotStartTime: '22:00',
    specialization: ['Orthopedics,Dermatology'],
  },
];

function MyAppointment({navigation}) {
  const [upcomingActive, setupcomingActive] = useState(true);
  const [completedActive, setcompletedActive] = useState(false);
  const [UpcomingData, setUpcomingData] = useState([]);
  const [CompletedData, setCompletedData] = useState([]);

  useEffect(() => {
    const getUpcoming = async () => {
      axios
        .get(apiConfig.baseUrl + '/patient/upcoming/consultations?patientId=1')
        .then(function (response) {
          console.log(
            '\n=========================== UPCOMING CONSULTATIONS ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) {
            //setUpcomingData(response.data);
            setUpcomingData(UpcomingServiceResponse);
          }
        })
        .catch(error => {
          Alert.alert('Error Upcoming', `${error}`);
        });
    };

    if (upcomingActive == true) getUpcoming();
  }, [upcomingActive]);

  useEffect(() => {
    const getCompleted = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/patient/complete/consultations?max=5&min=0&patientId=1',
        )
        .then(function (response) {
          console.log(
            '\n=========================== COMPLETED CONSULTATIONS ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) {
            // setCompletedData(response.data);
            setCompletedData(CompletedServiceResponse);
          }
        })
        .catch(error => {
          Alert.alert('Error Completed', `${error}`);
        });
    };

    if (completedActive == true) getCompleted();
  }, [completedActive]);

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
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              margin: 5,
              flex: 0.3,
            }}>
            <Image
              source={doctor_m}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
          </View>
          {/* Details */}
          <View
            style={{flex: 0.6, justifyContent: 'space-evenly', marginLeft: 5}}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
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
            <View style={{flexDirection: 'row', marginVertical: 3}}>
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
            </View>
          </View>
          {/* Options Button */}
          <TouchableOpacity style={{flex: 0.1, alignSelf: 'flex-start'}}>
            <FAIcons
              name="ellipsis-h"
              color={'black'}
              size={15}
              style={{
                padding: 5,
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
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
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              margin: 5,
              flex: 0.3,
            }}>
            <Image
              source={doctor_m}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
          </View>
          {/* Details */}
          <View style={{flex: 0.6, justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              {item.doctorName}
            </Text>
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

            <Text style={{fontSize: 12, color: '#000080'}}>
              Paid: ₹ {item.feesAmout}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 3,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: '#2B8ADA',
                  alignSelf: 'center',
                  borderRadius: 5,
                  borderWidth: 2,
                  flex: 0.45,
                  borderColor: '#2B8ADA',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {dayjs(item.slotDate).format('DD-MMM-YYYY')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  flex: 0.45,
                  borderColor: '#2B8ADA',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: '#2B8ADA',
                  }}>
                  {timeformatter(item.slotStartTime)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Options Button */}
          <TouchableOpacity style={{flex: 0.1, alignSelf: 'flex-start'}}>
            <FAIcons
              name="ellipsis-h"
              color={'black'}
              size={15}
              style={{
                padding: 5,
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </View>
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

export default MyAppointment;
