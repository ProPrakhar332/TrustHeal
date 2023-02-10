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
    clinicAddress: 'Rajpur Road',
    clinicName: 'Max Hospital',
    consultationId: 1,
    consultationStatus: 'BOOKED',
    consultationType: 'PHONE_CALL',
    doctorId: 1,
    doctorName: 'Dr. Imran Khan',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: '',
    feesAmout: 400,
    followUpDate: '2023-02-07',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 0,
    slotDate: '2023-02-07',
    slotEndTime: '11:30',
    slotStartTime: '11:00',
    specialization: ['ENT', 'Dermatology', 'Physician'],
  },
  {
    clinicAddress: 'Lal Pul Road',
    clinicName: 'Mahant Indresh',
    consultationId: 2,
    consultationStatus: 'BOOKED',
    consultationType: 'PHYSICAL',
    doctorId: 2,
    doctorName: 'Dr. Wolfeschlegelsteinhausenbergerdorff Sr.',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: '',
    feesAmout: 900,
    followUpDate: '2023-02-07',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 0,
    slotDate: '2023-02-07',
    slotEndTime: '20:30',
    slotStartTime: '20:27',
    specialization: ['Physician'],
  },
];

const CompletedServiceResponse = [
  {
    clinicAddress: 'string',
    clinicName: 'string',
    consultationId: 0,
    consultationStatus: 'BOOKED',
    consultationType: 'PHONE_CALL',
    doctorId: 0,
    doctorName: 'string',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: 'string',
    feesAmout: 0,
    followUpEligible: '2023-02-10',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 0,
    reVisitDate: '2023-02-10',
    slotDate: '2023-02-10',
    slotEndTime: '11:00',
    slotStartTime: '11:00',
    specialization: ['string'],
  },
  {
    clinicAddress: 'string',
    clinicName: 'string',
    consultationId: 0,
    consultationStatus: 'BOOKED',
    consultationType: 'PHONE_CALL',
    doctorId: 0,
    doctorName: 'string',
    doctorPhoto: 0,
    familyId: 0,
    familyMemberName: 'string',
    feesAmout: 0,
    followUpEligible: '2023-02-10',
    paymentStatus: 'PAY_ON_CLINIC',
    prescriptionPath: 0,
    reVisitDate: '2023-02-10',
    slotDate: '2023-02-10',
    slotEndTime: '11:00',
    slotStartTime: '11:00',
    specialization: ['string'],
  },
];

const ItemCompleted = ({
  name,
  img,
  spl,
  date,
  mode,
  type,
  slotttime,
  fees,
  pres,
  history,
}) => (
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
          source={img}
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
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{name}</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>{spl}</Text>
        <Text style={{fontSize: 12, color: '#2B8ADA'}}>{type}</Text>
        <Text style={{fontSize: 12}}>Paid: {fees}</Text>

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
              {date}
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
              {slotttime}
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
function MyAppointment({navigation}) {
  const [upcomingActive, setupcomingActive] = useState(true);
  const [completedActive, setcompletedActive] = useState(false);
  const [UpcomingDetails, setUpcomingDetails] = useState([]);

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
            <Text style={{fontSize: 12, color: '#033158'}}>
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

  const renderCompleted = ({item}) => (
    <ItemCompleted
      name={item.name}
      img={item.img}
      spl={item.spl}
      date={item.date}
      mode={item.mode}
      type={item.type}
      slotttime={item.slottime}
      fees={item.fees}
      pres={item.pres}
      history={item.history}
    />
  );

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
              <FlatList
                data={UpcomingServiceResponse}
                keyExtractor={item => item.consultationId}
                renderItem={renderUpcomingConsultations}
              />
            </View>
          ) : (
            <View style={{alignSelf: 'center', width: '90%'}}>
              <FlatList
                data={dataCompleted}
                keyExtractor={item => item.name}
                renderItem={renderCompleted}
              />
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
