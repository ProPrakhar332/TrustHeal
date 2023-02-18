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
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';

import doctor_m from '../Resources/doctor_m.png';
import defaultDoctor from '../Resources/doctor3x.png';
import CustomButton from '../Components/CustomButton';
import DayDateMaker from '../API/DayDateMaker';
import dayjs from 'dayjs';
import timeformatter from '../API/timeformatter';
import apiConfig from '../API/apiConfig';
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

function SelectSlotsE({navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [selectedSlotEndTime, setSelectedSlotEndTime] = useState(null);
  const [consultationType, setconsultationType] = useState(null);
  const [selectedSlotId, setselectedSlotId] = useState(null);
  const [EDays, setEDays] = useState([]);
  const [ESlots, setESlots] = useState(null);
  const [DocDet, setDocDet] = useState(null); //Previous page data
  const [DocObj, setDocObj] = useState(null); //Service response data

  useEffect(() => {
    const getData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('bookSlot'));
      //console.log(x);

      setDocDet(x);

      axios
        .get(apiConfig.baseUrl + '/slot/eslot/dates?doctorId=' + x.doctorId)
        .then(response => {
          if (response.status == 200) {
            setEDays(DayDateMaker(response.data));
          }
        })
        .catch(error => {
          Alert.alert('Error EDays', `${error}`);
        });
    };

    getData();

    // console.log(layout.width);
  }, []);
  useEffect(() => {
    const getESlots = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/slot/eslot/available?date=' +
            selectedDate +
            '&doctorId=' +
            DocDet.doctorId,
        )
        .then(response => {
          if (response.status == 200) {
            setESlots(response.data);
          }
        })
        .catch(error => {
          Alert.alert('Error Eslots', `${error}`);
        });
    };
    if (selectedDate != null) getESlots();
  }, [selectedDate]);

  const renderDays = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.SlotDate,
          {
            backgroundColor: selectedDate == item.date ? '#17CC9C' : '#e8f0fe',
          },
        ]}
        onPress={() => {
          setSelectedDate(item.date);
          setselectedSlotId(null);
        }}>
        <Text
          style={[
            {
              fontSize: 12,
              color: selectedDate == item.date ? 'white' : 'black',
            },
            selectedDate == item.date
              ? {fontSize: 14, fontWeight: 'bold'}
              : null,
          ]}>
          {dayjs(item.date).format('DD MMM, YYYY')}
        </Text>
        <Text
          style={[
            {
              fontSize: 12,
              color: selectedDate == item.date ? 'white' : 'black',
            },
            selectedDate == item.date
              ? {fontSize: 14, fontWeight: 'bold'}
              : null,
          ]}>
          {dayjs(item.date).format('dddd')}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSlots = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.SlotTime,
          {
            backgroundColor:
              selectedSlotId == item.slotId ? '#17CC9C' : '#e8f0fe',
            flexDirection: 'row',
          },
        ]}
        onPress={() => {
          setselectedSlotId(item.slotId);
          //setslots(item.slots);
          setSelectedSlotTime(item.startTime);
          setSelectedSlotEndTime(item.endTime);
          setconsultationType(item.typeOfEConsultation);
        }}>
        <FAIcons
          name={
            item.typeOfEConsultation == 'PHONE_CALL' ? 'phone-alt' : 'video'
          }
          size={15}
          color={selectedSlotId == item.slotId ? 'white' : '#2b8ada'}
          style={{marginRight: 5}}
        />
        <Text
          style={[
            {
              fontSize: 10,
              color: selectedSlotId == item.slotId ? 'white' : 'black',
            },
            selectedSlotId == item.slotId
              ? {fontSize: 12, fontWeight: 'bold'}
              : null,
          ]}>
          {timeformatter(item.startTime)}
          {' - '} {timeformatter(item.endTime)}
        </Text>
        {/* <Text
          style={{
            fontSize: 12,
            color: selectedDate == item.date ? 'white' : 'black',
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
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <View
              style={{
                alignSelf: 'center',
                padding: 3,
                borderColor: '#2b8ada',
                borderWidth: 5,
                borderRadius: 100,
              }}>
              {DocDet == null ? (
                <Image
                  source={defaultDoctor}
                  //source={doctor_m}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: `${apiConfig.baseUrl}/file/download?fileToken=${DocDet.photoPath}&userId=${DocDet.doctorId}`,
                  }}
                  //source={doctor_m}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'black',
                marginTop: 2,
              }}>
              {DocDet != null ? DocDet.doctorName : null}
            </Text>
            <Text
              style={{
                fontSize: 15,
                backgroundColor: '#2b8ada',
                color: 'white',
                alignSelf: 'center',
                marginVertical: 5,
                fontWeight: 'bold',
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}>
              {DocDet != null
                ? DocDet.specialization.map(index => {
                    return DocDet.specialization.indexOf(index) !=
                      DocDet.specialization.length - 1
                      ? index + ', '
                      : index;
                  })
                : null}
            </Text>
            <Text
              style={{
                // backgroundColor: '#2B8ADA',
                color: 'gray',
                borderRadius: 10,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              {DocDet != null
                ? Math.floor(DocDet.totalExprienceInMonths / 12)
                : null}
              {' years of experience'}
            </Text>
          </View>
          {/* Body */}
          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* Date Label*/}
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

              {EDays != '' ? (
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
                    data={EDays}
                    renderItem={renderDays}
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

            {/* Slots Label*/}
            {ESlots != null ? (
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
                {ESlots != '' ? (
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '85%',
                      flexDirection: 'row',
                      marginVertical: 10,
                      backgroundColor: 'white',
                    }}>
                    <FlatList
                      data={ESlots}
                      renderItem={renderSlots}
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
        {selectedSlotId != null && selectedDate != null ? (
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
                //slot prebook
                let mode = 'E_CONSULTATION';
                let slotId = selectedSlotId;
                let flag = 0;
                await axios
                  .post(
                    apiConfig.baseUrl +
                      '/patient/slot/prebook?consultation=' +
                      mode +
                      '&slotId=' +
                      slotId +
                      '&userId=1',
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
                  let date = selectedDate;
                  let time = selectedSlotTime;
                  let endtime = selectedSlotEndTime;
                  let slotId = selectedSlotId;

                  Alert.alert(
                    'Confirm Booking',
                    `Are you sure you want to book an appointment?\n` +
                      (mode == 'P_CONSULTATION'
                        ? `\nClinic:- ${clinicName}`
                        : ``) +
                      `\nOn Date:- ${dayjs(date).format(
                        'DD MMM, YYYY',
                      )}\nFrom:- ${timeformatter(time)}\nTo:-${timeformatter(
                        endtime,
                      )}\nMode:- ${mode}`,
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          let x = {
                            consultationType: consultationType,
                            doctorObj: DocDet,
                            slotDate: selectedDate,
                            slotEndTime: selectedSlotId,
                            slotId: selectedSlotId,
                            slotStartTime: selectedSlotTime,
                            slotEndTime: selectedSlotEndTime,
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
                          let slotId = selectedSlotId;
                          axios
                            .delete(
                              apiConfig.baseUrl +
                                '/patient/slot/prebook/delete?consultation=E_CONSULTATION' +
                                '&slotId=' +
                                slotId +
                                '&userId=1',
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
  SlotDate: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  SlotTime: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SelectSlotsE;
