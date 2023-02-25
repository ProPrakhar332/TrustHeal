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
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomButton from '../Components/CustomButton';
import DayDateMaker from '../API/DayDateMaker';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';
import apiConfig from '../API/apiConfig';
import clinicMaker from '../API/ClincMaker';
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
  const [selectedPSlotEndTime, setSelectedPSlotEndTime] = useState(null);
  const [selectedPSlotId, setselectedPSlotId] = useState(null);
  const [PDays, setPDays] = useState(null);
  const [PSlots, setPSlots] = useState(null);

  const [ClinicDet, setClinicDet] = useState([]);
  const [clinicId, setclinicId] = useState(null);
  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');

  const [DocDet, setDocDet] = useState(null); //Previous page data
  const [DocObj, setDocObj] = useState(null); //Service response data
  const [patientDet, setpatientDet] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('bookSlot'));
      let y = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      //console.log(x);

      setDocDet(x);
      setpatientDet(y);

      axios
        .get(apiConfig.baseUrl + '/slot/clinic/details?doctorId=' + x.doctorId)
        .then(response => {
          //console.log(response.data);
          if (response.status == 200) setClinicDet(clinicMaker(response.data));
        })
        .catch(error => {
          Alert.alert('Error in geting clinic', `${error}`);
        });
    };

    getData();

    // console.log(layout.width);
  }, []);

  useEffect(() => {
    const getClinicDays = async () => {
      axios;
      axios
        .get(
          apiConfig.baseUrl +
            '/slot/pslot/dates?doctorId=' +
            DocDet.doctorId +
            '&clinicId=' +
            clinicId,
        )
        .then(response => {
          if (response.status == 200) {
            setPDays(DayDateMaker(response.data));
          }
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };

    if (clinicName != '') getClinicDays();
  }, [clinicName]);

  useEffect(() => {
    const getPslots = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/slot/pslots/available?date=' +
            selectedPDate +
            '&doctorId=' +
            DocDet.doctorId +
            '&clinicId=' +
            clinicId,
        )
        .then(response => {
          if (response.status == 200) setPSlots(response.data);
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };
    if (selectedPDate != null) getPslots();
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
          alignSelf: 'center',
        }}
        onPress={() => {
          setselectedPSlotId(item.slotId);
          //setslots(item.slots);
          setSelectedPSlotEndTime(item.endTime);
          setSelectedPSlotTime(item.startTime);
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
          <DoctorBasicDetails DocDet={DocDet} />

          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* Clinic Selection */}
            <View
              style={{
                backgroundColor: 'white',
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.subLabel, {width: '100%'}]}>
                  Select Clinic
                </Text>
                <SelectList
                  placeholder={' '}
                  setSelected={val => {
                    setclinicName(val);
                    for (let i = 0; i < ClinicDet.length; ++i) {
                      if (val == ClinicDet[i].value) {
                        //console.log(ClinicDet[i].key);
                        setclinicId(ClinicDet[i].key);
                        break;
                      }
                    }
                  }}
                  // onSelect={setAddress}
                  data={ClinicDet}
                  save={'value'}
                  boxStyles={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: '#e8f0fe',
                    borderWidth: 0,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}
                  dropdownItemStyles={{}}
                  dropdownStyles={{
                    backgroundColor: 'white',
                    width: '90%',
                    alignSelf: 'center',
                  }}
                  dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                  badgeStyles={{backgroundColor: '#2b8ada'}}
                />
              </View>
            </View>

            {/* Date Label*/}
            {clinicName != '' ? (
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  alignSelf: 'center',
                  marginVertical: 15,
                  borderRadius: 10,
                }}>
                <Text style={[styles.subLabel, {width: '100%'}]}>
                  Select Date
                </Text>

                {PDays != '' ? (
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      flexDirection: 'column',
                      marginVertical: 10,
                      backgroundColor: 'white',
                      alignItems: 'center',
                    }}>
                    <FlatList
                      data={PDays}
                      renderItem={renderPDays}
                      keyExtractor={item => item.date}
                      numColumns={Math.floor(layout.width / 100)}
                      style={{
                        alignSelf: 'center',
                      }}
                      scrollEnabled={false}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      marginVertical: 20,
                      alignSelf: 'center',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    No Dates Available
                  </Text>
                )}
              </View>
            ) : null}

            {/* Slots Label*/}
            {PSlots != null ? (
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  alignSelf: 'center',
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <Text style={[styles.subLabel, {width: '100%'}]}>
                  Select Slot
                </Text>
                {PSlots != '' ? (
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '75%',
                      flexDirection: 'row',
                      marginVertical: 10,
                      backgroundColor: 'white',
                    }}>
                    <FlatList
                      data={PSlots}
                      renderItem={renderPSlots}
                      keyExtractor={item => item.slotId}
                      numColumns={Math.floor(layout.width / 150)}
                      style={{
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      marginVertical: 20,
                      alignSelf: 'center',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    No Slots Available
                  </Text>
                )}
              </View>
            ) : null}
          </View>
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
              onPress={async () => {
                let slotId = selectedPSlotId;
                let flag = 0;
                await axios
                  .post(
                    apiConfig.baseUrl +
                      '/patient/slot/prebook?consultation=P_CONSULTATION' +
                      '&slotId=' +
                      slotId +
                      '&userId=' +
                      patientDet.patientId,
                  )
                  .then(response => {
                    if (response.status == 200) {
                      flag = 1;
                    } else {
                      Alert.alert(
                        'Sorry',
                        'This Slot is under transaction.\nPlease select another time slot.',
                      );
                    }
                  })
                  .catch(error => {
                    Alert.alert(
                      'Sorry',
                      'This Slot is under transaction.\nPlease select another time slot.',
                    );
                  });

                if (flag == 1) {
                  Alert.alert(
                    'Confirm Booking',
                    `Are you sure you want to book an appointment?\n` +
                      `\nClinic:- ${clinicName}` +
                      `\nOn Date:- ${dayjs(selectedPDate).format(
                        'DD MMM, YYYY',
                      )}\nFrom:- ${timeformatter(
                        selectedPSlotTime,
                      )}\nTo:-${timeformatter(
                        selectedPSlotEndTime,
                      )}\nMode:- P_CONSULTATION`,
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          let x = {
                            clinicId: clinicId,
                            consultationType: 'PHYSICAL',
                            doctorObj: DocObj,
                            doctorDet: DocDet,
                            mode: 'PHYSICAL',
                            slotDate: selectedPDate,
                            slotEndTime: selectedPSlotId,
                            slotId: selectedPSlotId,
                            slotStartTime: selectedPSlotTime,
                            slotEndTime: selectedPSlotEndTime,
                          };
                          await AsyncStorage.setItem(
                            'ConfirmBookingDoctor',
                            JSON.stringify(x),
                          );
                          navigation.navigate('ConfirmBooking');
                        },
                      },
                      {
                        text: 'No',
                        onPress: async () => {
                          let slotId = selectedPSlotId;
                          axios
                            .delete(
                              apiConfig.baseUrl +
                                '/patient/slot/prebooked/delete?consultation=P_CONSULTATION' +
                                '&slotId=' +
                                slotId +
                                '&userId=' +
                                patientDet.patientId,
                            )
                            .then(response => {
                              if (response.status == 200) {
                              }
                            })
                            .catch(error => {
                              Alert.alert(
                                'Error',
                                `Error in Delete PreBook:-\n ${error}`,
                              );
                            });
                        },
                        style: 'cancel',
                      },
                    ],
                  );
                }
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
  subLabel: {
    width: '95%',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#2b8ada',
    color: 'white',
    borderBottomColor: '#2b8ada',
    borderBottomWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SelectSlotsP;
