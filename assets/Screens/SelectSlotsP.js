import React, {useState, useEffect} from 'react';
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';

import doctor_m from '../Resources/doctor_m.png';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomButton from '../Components/CustomButton';
import DayDateMaker from '../API/DayDateMaker';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';

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
      clinicAddress:
        'Rajpur Road cjsabckasbc ashchjsabc bashv ahsbvchasbch jabschbashc jkbkhscbkas hbahs',
      specialInstruction: 'wear mask',
    },
  ],
};

const dataClinic = [
  {key: '1', value: 'ABCD | Rajpur Road cjsabckasbc ashchjsabc bashv '},
  {key: '2', value: 'XYZ'},
  {key: '3', value: 'QWERTY'},
];

const date = {
  availableDates: ['2023-01-30', '2023-01-31'],
};
const slotsresponse = [
  {
    slotId: 38,
    startTime: '09:00:00',
    endTime: '09:30:00',
    slotDate: '2023-01-30',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 39,
    startTime: '09:50:00',
    endTime: '10:20:00',
    slotDate: '2023-01-30',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 40,
    startTime: '10:40:00',
    endTime: '11:10:00',
    slotDate: '2023-01-30',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 41,
    startTime: '11:30:00',
    endTime: '12:00:00',
    slotDate: '2023-01-30',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 42,
    startTime: '09:00:00',
    endTime: '09:30:00',
    slotDate: '2023-01-31',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 43,
    startTime: '09:50:00',
    endTime: '10:20:00',
    slotDate: '2023-01-31',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 44,
    startTime: '10:40:00',
    endTime: '11:10:00',
    slotDate: '2023-01-31',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 45,
    startTime: '11:30:00',
    endTime: '12:00:00',
    slotDate: '2023-01-31',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
  {
    slotId: 46,
    startTime: '11:50:00',
    endTime: '12:20:00',
    slotDate: '2023-01-31',
    typeOfEConsultation: 'PHONE_CALL',
    slotStatus: 'CREATED',
  },
];

const DATA = [
  {
    date: '19/09/2022',
    day: 'Monday',
    slots: [
      '06:45 AM',
      '07:15 AM',
      '08:45 AM',
      '09:30 AM',
      '09:50 AM',
      '10:30 AM',
      '11:00 AM',
      '11:45 AM',
      '12:45 AM',
    ],
  },
  {
    date: '20/09/2022',
    day: 'Tuesday',
    slots: [
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
    ],
  },
  {
    date: '21/09/2022',
    day: 'Wednesday',
    slots: [
      '06:45 PM',
      '07:15 PM',
      '08:45 PM',
      '09:30 PM',
      '09:50 PM',
      '10:30 PM',
      '11:00 PM',
      '11:45 PM',
    ],
  },
  {
    date: '22/09/2022',
    day: 'Thursday',
    slots: ['08:00 AM', '08:30 AM'],
  },
  {
    date: '23/09/2022',
    day: 'Friday',
    slots: [
      '12:00 PM',
      '12:30 PM',
      '01:00 PM',
      '01:30 PM',
      '02:00 PM',
      '02:30 PM',
    ],
  },
];

function SelectSlotsP({navigation}) {
  const [selectedPDate, setSelectedPDate] = useState(null);
  const [selectedPSlotTime, setSelectedPSlotTime] = useState(null);
  const [selectedPSlotId, setselectedPSlotId] = useState(null);
  const [PDays, setPDays] = useState([]);
  const [PSlots, setPSlots] = useState([]);

  useEffect(() => {
    setPDays(DayDateMaker(date));
    // console.log(layout.width);
  }, []);
  useEffect(() => {
    let p = [];
    for (var i = 0; i < slotsresponse.length; ++i) {
      if (selectedPDate == slotsresponse[i].slotDate) p.push(slotsresponse[i]);
    }
    setPSlots(p);
  }, [selectedPDate]);

  const renderPDays = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: selectedPDate == item.date ? '#2b8ada' : '#e8f0fe',
          padding: 10,
          margin: 3,
          borderRadius: 5,
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onPress={() => {
          setSelectedPDate(item.date);
          setselectedPSlotId(null);
        }}>
        <Text
          style={{
            fontSize: 12,
            color: selectedPDate == item.date ? 'white' : 'black',
          }}>
          {dayjs(item.date).format('DD-MMM-YY')}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: selectedPDate == item.date ? 'white' : 'black',
          }}>
          {dayjs(item.date).format('dddd')}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPSlots = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedPSlotId == item.slotId ? '#2b8ada' : '#e8f0fe',
          padding: 10,
          margin: 5,
          borderRadius: 5,
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onPress={() => {
          setselectedPSlotId(item.slotId);
          //setslots(item.slots);
          setSelectedPSlotTime(timeformatter(item.startTime));
        }}>
        <Text
          style={{
            fontSize: 10,
            color: selectedPSlotId == item.slotId ? 'white' : 'black',
          }}>
          {timeformatter(item.startTime)}
          {' - '} {timeformatter(item.endTime)}
        </Text>
        {/* <Text
          style={{
            fontSize: 12,
            color: selectedPDate == item.date ? 'white' : 'black',
          }}>
          {item.endTime}
        </Text> */}
      </TouchableOpacity>
    );
  };

  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');
  const [slots, setslots] = useState([]);

  const setAddress = () => {
    data.doctorClinicDetailsDTOs.forEach(item => {
      if (clinicName === item.clinicName) {
        setclinicAddress(item.clinicAddress);
      }
    });
  };

  const layout = useWindowDimensions();

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
          <HeaderPatient showMenu={false} title="Select Slots" />
          {/* Top */}
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <Image
              source={data.img}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'black',
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'gray',
                alignSelf: 'center',
                marginVertical: 3,
              }}>
              {data.spl}
            </Text>
            <Text
              style={{
                backgroundColor: '#2B8ADA',
                color: 'white',
                borderRadius: 10,
                alignSelf: 'center',
                padding: 3,
                paddingHorizontal: 15,
              }}>
              {data.exp}
            </Text>
          </View>

          {/* Clinic Selection */}
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  color: '#2b8ada',
                  fontWeight: 'bold',
                  borderBottomColor: '#2b8ada',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}>
                Select Clinic
              </Text>
              <SelectList
                defaultOption={dataClinic[0].key}
                placeholder={' '}
                setSelected={val => setclinicName(val)}
                // onSelect={setAddress}
                data={dataClinic}
                save={'value'}
                boxStyles={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#e8f0fe',
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                dropdownItemStyles={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 2,
                }}
                dropdownStyles={{
                  backgroundColor: 'white',
                  width: '90%',
                  alignSelf: 'center',
                }}
                dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                badgeStyles={{backgroundColor: '#2b8ada'}}
              />
            </View>
            {/* <View style={{flexDirection: 'column', marginTop: 10}}>
              <Text
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  color: '#2b8ada',
                  fontWeight: 'bold',
                  borderBottomColor: '#2b8ada',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}>
                Clinic Address
              </Text>
              <Text
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: '#e8f0fe',
                  borderRadius: 5,
                  fontSize: 14,
                  color: 'gray',
                  flexWrap: 'wrap',
                }}>
                {clinicAddress}
              </Text>
            </View> */}
          </View>

          {/* Date Label*/}
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#2b8ada',
                borderBottomColor: '#2b8ada',
                borderBottomWidth: 1,
              }}>
              Select Date
            </Text>

            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'column',
                marginTop: 10,
                backgroundColor: 'white',
              }}>
              <FlatList
                data={PDays}
                renderItem={renderPDays}
                keyExtractor={item => item.date}
                horizontal={true}
              />
            </View>
          </View>

          {/* Slots Label*/}
          {PSlots != '' ? (
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#2b8ada',
                  borderBottomColor: '#2b8ada',
                  borderBottomWidth: 1,
                }}>
                Select Slot
              </Text>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  width: '90%',
                  flexDirection: 'row',
                  marginTop: 10,
                  backgroundColor: 'white',
                }}>
                <FlatList
                  data={PSlots}
                  renderItem={renderPSlots}
                  keyExtractor={item => item.slotId}
                  numColumns={Math.floor(layout.width / 100)}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
        {clinicName != '' &&
        selectedPSlotId != null &&
        selectedPDate != null ? (
          <View
            style={{
              backgroundColor: '#2B8ADA',
              height: 45,
              flexDirection: 'row',
            }}>
            <CustomButton
              text={'PROCEED'}
              textstyle={{color: '#2B8ADA', fontSize: 12, fontWeight: 'bold'}}
              style={{
                position: 'absolute',
                right: 20,
                alignSelf: 'center',
                backgroundColor: 'white',
                width: 100,
                padding: 3,
              }}
              onPress={() => {
                Alert.alert(
                  'Confirm Booking',
                  `Are you sure you want to book appointment on ${dayjs(
                    selectedPDate,
                  ).format(
                    'DD-MMM-YY',
                  )} at ${selectedPSlotTime} for ${clinicName}, at ${clinicAddress}.`,
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('ConfirmBooking'),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ],
                );
              }}
            />
          </View>
        ) : null}
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

export default SelectSlotsP;
