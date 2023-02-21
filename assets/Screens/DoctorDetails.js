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
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import CustomButton from '../Components/CustomButton';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import DayDateMaker from '../API/DayDateMaker';
import timeformatter from '../API/timeformatter';
import doctor_m from '../Resources/doctor_m.png';
import defaultDoctor from '../Resources/doctor3x.png';
import downloading from '../Animations/downloading.gif';
import apiConfig from '../API/apiConfig';
import {SelectList} from 'react-native-dropdown-select-list';
import clinicMaker from '../API/ClincMaker';

// const data = {
//   name: 'Dr. Imran Singh',
//   spl: 'Psychiatry',
//   exp: '10 Years of experience',
//   deg: 'MBBS, MD, FID, CCLHA',
//   city: 'New Delhi',
//   email: 'Imran@gmail.com',
//   mobileNumber: '+945652154',
//   contactVisibility: true,
//   age: 36,
//   dob: '03/02/1973',
//   img: doctor_m,
//   doctorConsultationFeesDTO: {
//     eConsulationFees: 500,
//     followUpFees: 0,
//     physicalConsulationFees: 800,
//   },
//   doctorEducationsDTOs: [
//     {
//       degree: 'MBBS',
//       degreePath: 'string',
//       doctorEducationPkId: 0,
//       passingYear: '1986',
//       specialization: ['Psychiatry', 'Diabetologist', 'General Physician'],
//       totalExperiencedInMonths: 0,
//       university: 'IGNOU',
//     },
//   ],
//   doctorMedicalRegistrationDTOs: [
//     {
//       certificatePath: 'xyz',
//       registrationCouncil: 'Mumbai Medical College',
//       registrationNo: 'MH0234sb',
//       registrationYear: '1986',
//     },
//   ],
// };
const details = {
  clinicInfo: [
    {
      clinicAddress: 'Rajpur Road',
      clinicId: 1,
      clinicName: 'Max Hospital',
      specialInstruction: 'string',
    },
    {
      clinicAddress: 'Lal Pul',
      clinicId: 2,
      clinicName: 'Mahant Indresh',
      specialInstruction: 'string',
    },
    {
      clinicAddress: 'Dilaram Bazar',
      clinicId: 3,
      clinicName: 'Vaish Nursing Home',
      specialInstruction: 'string',
    },
  ],
  languages: ['English', 'Hindi', 'Telgu'],
  feesInfo: {
    econsultationFees: 300,
    followUpDuration: 10,
    followUpFees: 100,
    phyiscalConsultationFees: 500,
  },
  educationInfo: [
    {
      degree: 'MBBS',
      passingYear: 1968,
      specialization: 'ENT',
      university: 'AIMS Delhi',
    },
  ],
  exprienceInfo: [
    {
      exprienceInMonths: 39,
      practiceCenter: 'AIMS Delhi',
    },
  ],
  medicalInfo: {
    registrationCouncil: 'AIMS Delhi',
    registrationNo: 'bjs734ba8f',
    registrationYear: 1968,
  },
  eslotDates: [
    '2023-01-30',
    '2023-01-31',
    '2023-02-01',
    '2023-02-02',
    '2023-02-03',
    '2023-02-04',
    '2023-02-05',
  ],
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
    typeOfEConsultation: 'VIDEO_CALL',
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
const dataClinic = [
  {key: '1', value: 'ABCD | Rajpur Road cjsabckasbc ashchjsabc bashv '},
  {key: '2', value: 'XYZ'},
  {key: '3', value: 'QWERTY'},
];

function DoctorDetails({navigation}) {
  const [DocObj, setDocObj] = useState(null); //from service
  const [DocDet, setDocDet] = useState(null); //from previous page

  const [showGenInfo, setShowGenInfo] = useState(false);
  const [GenInfo, setGenInfo] = useState([]);
  const [showLangDet, setshowLangDet] = useState(false);
  const [Languages, setLanguages] = useState([]);
  const [showEduInfo, setShowEduInfo] = useState(false);
  const [EduInfo, setEduInfo] = useState(true);
  const [Education, setEducation] = useState([]);
  const [showMedInfo, setShowMedInfo] = useState(false);
  const [MedInfo, setMedInfo] = useState(true);
  const [MedRegDet, setMedRegDet] = useState([]);
  const [showExpDet, setShowExpDet] = useState(false);
  const [ExpInfo, setExpInfo] = useState(true);
  const [Experience, setExperience] = useState([]);
  const [showFeesDet, setShowFeesDet] = useState(false);
  const [FeesInfo, setFeesInfo] = useState(true);
  const [Fee, setFees] = useState([]);
  const [showClinicDet, setShowClinicDet] = useState(false);
  const [ClinicInfo, setClinicInfo] = useState(true);
  const [ClinicDet, setClinicDet] = useState([]);
  const [isFetching, setisFetching] = useState(false);
  const [consultationModeModal, setconsultationModeModal] = useState(false);
  const [showEConsult, setshowEConsult] = useState(false);
  const [showPConsult, setshowPConsult] = useState(false);
  const layout = useWindowDimensions();
  //for e-consultation
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [selectedSlotEndTime, setSelectedSlotEndTime] = useState(null);
  const [selectedSlotId, setselectedSlotId] = useState(null);
  const [consultationType, setconsultationType] = useState(null);
  const [EDays, setEDays] = useState(null);
  const [ESlots, setESlots] = useState(null);
  //for p-consultation
  const [selectedPDate, setSelectedPDate] = useState(null);
  const [selectedPSlotTime, setSelectedPSlotTime] = useState(null);
  const [selectedPSlotEndTime, setSelectedPSlotEndTime] = useState(null);
  const [selectedPSlotId, setselectedPSlotId] = useState(null);
  const [PDays, setPDays] = useState(null);
  const [PSlots, setPSlots] = useState(null);
  const [ClinicsDropDown, setClinicsDropDown] = useState([]);
  const [clinicId, setclinicId] = useState(null);
  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');

  const [mode, setMode] = useState(null);
  useEffect(() => {
    const getData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('viewProfile'));
      //console.log(x);

      setDocDet(x);

      axios
        .get(
          apiConfig.baseUrl + '/patient/doctor/details?doctorId=' + x.doctorId,
        )
        .then(response => {
          //console.log(response.data);
          if (response.status == 200) setDocObj(response.data);
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };

    getData();

    // console.log(layout.width);
  }, []);

  useEffect(() => {
    if (DocObj != null) {
      let obj = {
        availableDates: DocObj.eslotDates,
      };
      setEDays(DayDateMaker(obj));
      // setPDays(DayDateMaker(DocObj.eslotDates));
      setClinicsDropDown(clinicMaker(DocObj.clinicInfo));
    }
    // console.log(layout.width);
  }, [DocObj]);

  useEffect(() => {
    const getEslots = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/slot/eslot/available?date=' +
            selectedDate +
            '&doctorId=' +
            DocDet.doctorId,
        )
        .then(response => {
          if (response.status == 200) setESlots(response.data);
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };
    if (selectedDate != null) getEslots();
  }, [selectedDate]);

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

  //   useEffect(() => {
  // const getGenInfo = async()=>{
  //   axios.get(apiConfig.baseUrl+"")
  // }

  //   }, [showGenInfo]);

  useEffect(() => {
    if (DocObj != null) {
      setMedRegDet(DocObj.medicalInfo);
      setEducation(DocObj.educationInfo);
      setExperience(DocObj.exprienceInfo);
      setClinicDet(DocObj.clinicInfo);
      setLanguages(DocObj.languages);
      setFees(DocObj.feesInfo);
    }
  }, [DocObj]);

  const languages = [
    {
      languageId: 2,
      language: 'English',
      doctorId: null,
    },
    {
      languageId: 3,
      language: 'Hindi',
      doctorId: null,
    },
  ];

  const addFavourite = async () => {
    setisLoading(true);
    axios
      .delete(
        apiConfig.baseUrl +
          '/patient/favourite/doctor/save?doctorId=' +
          DocDet.doctorId +
          '&patientId=400',
      )
      .then(async response => {
        if (response.status == 200) {
          Alert.alert(
            'Favourite Added',
            `${DocDet.doctorName} has been added to Favourite List.`,
          );

          setisLoading(false);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log('Error Favourite Add', `${error}`);
      });
    setisLoading(false);
  };
  const removeFavourite = async () => {
    setisLoading(true);
    axios
      .delete(
        apiConfig.baseUrl +
          '/patient/favourite/doctor/delete?doctorId=' +
          DocDet.doctorId +
          '&patientId=400',
      )
      .then(async response => {
        if (response.status == 200) {
          Alert.alert(
            'Doctor Removed',
            `${DocDet.doctorName} has been removed from Favourite List.`,
          );

          setisLoading(false);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log('Error Favourite Remove', `${error}`);
      });
    setisLoading(false);
  };

  const ViewEducation = () => {
    return Education.map((Education, index) => {
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
            {/* Degree */}
            <View style={[styles.cellStyle, {flex: 0.4}]}>
              <Text style={styles.cellText}>{Education.degree}</Text>
            </View>
            {/* Passing Year */}
            <View style={[styles.cellStyle, {flex: 0.4}]}>
              <Text style={styles.cellText}>{Education.passingYear}</Text>
            </View>
            {/* Specialization */}
            <View style={[styles.cellStyle, {flex: 1}]}>
              <Text style={styles.cellText}>{Education.specialization}</Text>
            </View>
            {/* University */}
            <View style={[styles.cellStyle, {flex: 1}]}>
              <Text style={styles.cellText}>{Education.university}</Text>
            </View>
          </View>
        </View>
      );
    });
  };
  const ViewExperience = () => {
    return Experience.map((Experience, index) => {
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
            {/* Practice At */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{Experience.practiceCenter}</Text>
            </View>
            {/*             
           
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>
                {dayjs(Experience.startDate).isValid()
                  ? dayjs(Experience.startDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
           
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>
                {dayjs(Experience.endDate).isValid()
                  ? dayjs(Experience.endDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            
             */}
            {/* Total Experience */}
            <View style={styles.cellStyle}>
              {Math.floor(Experience.exprienceInMonths / 12) > 0 ? (
                <Text style={styles.cellText}>
                  {Math.floor(Experience.exprienceInMonths / 12) + ' year(s)'}
                </Text>
              ) : null}
              {parseInt(Experience.exprienceInMonths % 12) != 0 ? (
                <Text style={styles.cellText}>
                  {parseInt(Experience.exprienceInMonths % 12) + ' month(s)'}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      );
    });
  };
  const ViewClinics = () => {
    return ClinicDet.map((ClinicDet, index) => {
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
            {/* Clinic Name */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{ClinicDet.clinicName}</Text>
            </View>
            {/* Clinic Address */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{ClinicDet.clinicAddress}</Text>
            </View>
          </View>
        </View>
      );
    });
  };
  const ViewLang = () => {
    return Languages.map((lang, index) => {
      return (
        <View style={styles.bubble} key={index}>
          <Text style={{color: 'white', fontSize: 12}}>{lang}</Text>
        </View>
      );
    });
  };
  const RenderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={consultationModeModal}
        onRequestClose={() => {
          setconsultationModeModal(!consultationModeModal);
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
                  fontSize: 20,
                  padding: 5,
                  alignSelf: 'center',
                }}>
                Consultation Mode
              </Text>
              <FAIcon
                name="window-close"
                color="black"
                size={20}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setconsultationModeModal(false);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                flex: 1,
                backgroundColor: '#2B8ADA',
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                navigation.navigate('SelectSlotsE');
                setconsultationModeModal(false);
              }}>
              <FAIcon name={'video'} color={'white'} size={16} />
              <Text style={{color: 'white', fontSize: 14}}>E-Consultation</Text>
              <Text style={{color: 'white', fontSize: 14}}>
                Rs. {data.doctorConsultationFeesDTO.eConsulationFees}/-
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                flex: 1,
                backgroundColor: '#17CC9C',
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                navigation.navigate('SelectSlotsP');
                setconsultationModeModal(false);
              }}>
              <FAIcon name={'users'} color={'white'} size={16} />
              <Text style={{color: 'white', fontSize: 14}}>P-Consultation</Text>
              <Text style={{color: 'white', fontSize: 14}}>
                Rs. {data.doctorConsultationFeesDTO.physicalConsulationFees}/-
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const renderDays = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.SlotDate,
          {
            backgroundColor: selectedDate == item.date ? '#2b8ada' : '#e8f0fe',
          },
        ]}
        onPress={() => {
          setSelectedDate(item.date);
          setselectedSlotId(null);
          setSelectedPDate(null);
          setselectedPSlotId(null);
          setSelectedPSlotTime(null);
          setSelectedPSlotEndTime(null);
          setclinicName('');
          setconsultationType(null);
        }}>
        <Text
          style={{
            fontSize: 12,
            color: selectedDate == item.date ? 'white' : 'black',
          }}>
          {dayjs(item.date).format('DD-MMM-YY')}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: selectedDate == item.date ? 'white' : 'black',
          }}>
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
              selectedSlotId == item.slotId ? '#2b8ada' : '#e8f0fe',
            flexDirection: 'row',
          },
        ]}
        onPress={() => {
          setselectedSlotId(item.slotId);
          //setslots(item.slots);
          setSelectedSlotTime(item.startTime);
          setSelectedSlotEndTime(item.endTime);
          setMode('E_CONSULTATION');
          setconsultationType(item.typeOfEConsultation);
        }}>
        <FAIcon
          name={
            item.typeOfEConsultation == 'PHONE_CALL' ? 'phone-alt' : 'video'
          }
          size={15}
          color={selectedSlotId == item.slotId ? 'white' : '#2b8ada'}
          style={{marginRight: 3}}
        />
        <Text
          style={{
            fontSize: 10,
            color: selectedSlotId == item.slotId ? 'white' : 'black',
          }}>
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
  const renderPDays = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.SlotDate,
          {
            backgroundColor: selectedPDate == item.date ? '#2b8ada' : '#e8f0fe',
          },
        ]}
        onPress={() => {
          setSelectedPDate(item.date);
          setselectedPSlotId(null);
          setSelectedDate(null);
          setselectedSlotId(null);
          setSelectedSlotTime(null);
          setSelectedSlotEndTime(null);
          setconsultationType(null);
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
        style={[
          styles.SlotTime,
          {
            backgroundColor:
              selectedPSlotId == item.slotId ? '#2b8ada' : '#e8f0fe',
          },
        ]}
        onPress={() => {
          setselectedPSlotId(item.slotId);
          //setslots(item.slots);
          setSelectedPSlotTime(item.startTime);
          setSelectedPSlotEndTime(item.endTime);
          setMode('P_CONSULTATION');
          setconsultationType('PHYSICAL');
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
          <HeaderPatient showMenu={false} title={'About'} />
          {/* Top */}
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <View
              style={{
                alignSelf: 'center',
                padding: 3,
                // borderColor: '#2b8ada',
                // borderWidth: 5,
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
          {/* Genreal Information Label*/}
          {/* <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,
                showGenInfo
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showGenInfo
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setShowGenInfo(!showGenInfo);
                }}>
                <FAIcon
                  name="info-circle"
                  size={15}
                  color={showGenInfo ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showGenInfo ? {color: '#2B8ADA'} : null,
                  ]}>
                  Genreal Information
                </Text>
                <FAIcon
                  name={showGenInfo ? 'chevron-down' : 'chevron-right'}
                  color={showGenInfo ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* Genreal Information Body*/}
          {/* {showGenInfo ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{flexDirection: 'column', flex: 0.6}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subHeading}>Email :</Text>
                      <Text style={{fontSize: 12}}> {data.email}</Text>
                    </View>
                    {data.contactVisibility ? (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.subHeading}>Mobile No :</Text>
                        <Text style={{fontSize: 12}}> {data.mobileNumber}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{flexDirection: 'column', flex: 0.3}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subHeading}>City :</Text>
                      <Text style={{fontSize: 12}}> {data.city}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subHeading}>Age :</Text>
                      <Text style={{fontSize: 12}}> {data.age}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null} */}
          {/* E-Consult Label */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,

                showEConsult
                  ? {
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showEConsult
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setshowEConsult(!showEConsult);
                }}>
                <FAIcon
                  name="video"
                  size={12}
                  solid={false}
                  color={showEConsult ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showEConsult ? {color: '#2B8ADA'} : null,
                  ]}>
                  E-Consultation
                </Text>
                <FAIcon
                  name={showEConsult ? 'chevron-down' : 'chevron-right'}
                  color={showEConsult ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* E-consult Body */}
          {showEConsult ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                {/* Date and Slots */}
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.subLabel}>Select Date</Text>

                  {EDays != '' ? (
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'center',
                        width: '95%',
                        flexDirection: 'column',
                        marginTop: 10,
                        backgroundColor: 'white',
                      }}>
                      <FlatList
                        data={EDays}
                        renderItem={renderDays}
                        keyExtractor={item => item.date}
                        numColumns={Math.floor(layout.width / 100)}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                  ) : (
                    <Text
                      style={{
                        marginVertical: 10,
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      No Dates Available
                    </Text>
                  )}
                </View>

                {selectedDate != null ? (
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: '95%',
                      alignSelf: 'center',
                      marginVertical: 10,
                    }}>
                    <Text style={styles.subLabel}>Select Slot</Text>
                    {ESlots != '' ? (
                      <View
                        style={{
                          flex: 1,
                          alignSelf: 'center',
                          width: '95%',
                          flexDirection: 'row',
                          marginTop: 10,
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
                          marginVertical: 10,
                          alignSelf: 'center',
                          fontSize: 12,
                        }}>
                        No E-Slots Available
                      </Text>
                    )}
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          {/* P-Consult Label */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,

                showPConsult
                  ? {
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showPConsult
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setshowPConsult(!showPConsult);
                }}>
                <FAIcon
                  name="users"
                  size={12}
                  solid={false}
                  color={showPConsult ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showPConsult ? {color: '#2B8ADA'} : null,
                  ]}>
                  P-Consultation
                </Text>
                <FAIcon
                  name={showPConsult ? 'chevron-down' : 'chevron-right'}
                  color={showPConsult ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* P-consult Body */}
          {showPConsult ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                {/* Clinic Selection */}
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.subLabel}>Select Clinic</Text>
                    <SelectList
                      defaultOption={ClinicsDropDown[0].key}
                      placeholder={' '}
                      setSelected={val => {
                        setclinicName(val);
                        for (let i = 0; i < ClinicsDropDown.length; ++i) {
                          if (val == ClinicsDropDown[i].value) {
                            console.log(ClinicsDropDown[i].key);
                            setclinicId(ClinicsDropDown[i].key);
                            break;
                          }
                        }
                      }}
                      // onSelect={setAddress}
                      data={ClinicsDropDown}
                      save={'value'}
                      boxStyles={{
                        marginTop: 10,
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: '#e8f0fe',
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                      dropdownItemStyles={
                        {
                          // borderBottomColor: '#2b8ada',
                          // borderBottomWidth: 2,
                        }
                      }
                      dropdownStyles={{
                        backgroundColor: 'white',
                        width: '90%',
                        alignSelf: 'center',
                      }}
                      dropdownTextStyles={{
                        color: 'gray',
                        fontWeight: 'bold',
                      }}
                      badgeStyles={{backgroundColor: '#2b8ada'}}
                    />
                  </View>

                  {/* Date Label*/}
                  {clinicName != '' ? (
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: '95%',
                        alignSelf: 'center',
                        marginVertical: 10,
                      }}>
                      <Text style={[styles.subLabel, {width: '100%'}]}>
                        Select Date
                      </Text>

                      {PDays != '' ? (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'center',
                            width: '95%',
                            flexDirection: 'column',
                            marginTop: 10,
                            backgroundColor: 'white',
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
                            marginVertical: 10,
                            alignSelf: 'center',
                            fontSize: 12,
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
                      }}>
                      <Text style={[styles.subLabel, {width: '100%'}]}>
                        Select Slot
                      </Text>
                      {PSlots != '' ? (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'center',
                            width: '95%',
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: 'white',
                          }}>
                          <FlatList
                            data={PSlots}
                            renderItem={renderPSlots}
                            keyExtractor={item => item.slotId}
                            numColumns={Math.floor(layout.width / 150)}
                            style={{alignSelf: 'center'}}
                          />
                        </View>
                      ) : (
                        <Text
                          style={{
                            marginVertical: 10,
                            alignSelf: 'center',
                            fontSize: 12,
                          }}>
                          No Slots Available
                        </Text>
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          {/* Fees Label */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,

                showFeesDet
                  ? {
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showFeesDet
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setShowFeesDet(!showFeesDet);
                }}>
                <FAIcon
                  name="money-bill-wave"
                  size={12}
                  color={showFeesDet ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showFeesDet ? {color: '#2B8ADA'} : null,
                  ]}>
                  Fees
                </Text>
                <FAIcon
                  name={showFeesDet ? 'chevron-down' : 'chevron-right'}
                  color={showFeesDet ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Fees Body */}
          {showFeesDet ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                  }}>
                  <View style={{flexDirection: 'column', flex: 0.5}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Physical Fees</Text>
                      <Text style={{fontSize: 12}}>
                        {'₹ '}
                        {DocObj.feesInfo.phyiscalConsultationFees}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>E-Consultation Fees</Text>
                      <Text style={{fontSize: 12}}>
                        {'₹ '}
                        {DocObj.feesInfo.econsultationFees}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', flex: 0.5}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Follow-Up Fees</Text>
                      <Text style={{fontSize: 12}}>
                        {'₹ '}
                        {DocObj.feesInfo.followUpFees}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Follow Up Duration</Text>
                      <Text style={{fontSize: 12}}>
                        {DocObj.feesInfo.followUpDuration}
                        {' days'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {/* Clinic Information Label*/}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,
                showClinicDet
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showClinicDet
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setShowClinicDet(!showClinicDet);
                }}>
                <FAIcon
                  name="clinic-medical"
                  size={15}
                  color={showClinicDet ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showClinicDet ? {color: '#2B8ADA'} : null,
                  ]}>
                  Clinic Information
                </Text>
                <FAIcon
                  name={showClinicDet ? 'chevron-down' : 'chevron-right'}
                  color={showClinicDet ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Clinic Information Body*/}
          {showClinicDet ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
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
                        <Text style={styles.cellHeadingText}>Name</Text>
                      </View>
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>Address</Text>
                      </View>
                    </View>
                  </View>
                  <ViewClinics />
                </View>
              </View>
            </View>
          ) : null}

          {/* Medical Registration Label*/}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,
                showMedInfo
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showMedInfo
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  if (!showMedInfo) {
                    setShowMedInfo(!showMedInfo);
                  } else {
                    setShowMedInfo(!showMedInfo);
                  }
                }}>
                <FAIcon
                  name="file-medical"
                  size={15}
                  color={showMedInfo ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showMedInfo ? {color: '#2B8ADA'} : null,
                  ]}>
                  Medical Registration
                </Text>
                <FAIcon
                  name={showMedInfo ? 'chevron-down' : 'chevron-right'}
                  color={showMedInfo ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Medical Registration Body*/}
          {showMedInfo ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{flexDirection: 'column', flex: 0.6}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Registration No :</Text>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {MedRegDet.registrationNo}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Reg. Council:</Text>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {MedRegDet.registrationCouncil}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', flex: 0.3}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Reg. Year :</Text>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {MedRegDet.registrationYear}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {/* Education Qualification Label*/}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,
                showEduInfo
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showEduInfo
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  if (!showEduInfo) {
                    setShowEduInfo(!showEduInfo);
                  } else {
                    setShowEduInfo(!showEduInfo);
                  }
                }}>
                <MIcons
                  name="certificate"
                  size={20}
                  color={showEduInfo ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 2, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showEduInfo ? {color: '#2B8ADA'} : null,
                  ]}>
                  Education Qualification
                </Text>
                <FAIcon
                  name={showEduInfo ? 'chevron-down' : 'chevron-right'}
                  color={showEduInfo ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Education Qualification Body */}
          {showEduInfo ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
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
                      <View style={[styles.cellHeading, {flex: 0.4}]}>
                        <Text style={styles.cellHeadingText}>Degree</Text>
                      </View>
                      <View style={[styles.cellHeading, {flex: 0.4}]}>
                        <Text style={styles.cellHeadingText}>Year</Text>
                      </View>
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>Speciality</Text>
                      </View>
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>University</Text>
                      </View>
                    </View>
                  </View>
                  <ViewEducation />
                </View>
              </View>
            </View>
          ) : null}

          {/* Experience Label */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,

                showExpDet
                  ? {
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showExpDet
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setShowExpDet(!showExpDet);
                }}>
                <FAIcon
                  name="calendar-plus"
                  size={15}
                  color={showExpDet ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showExpDet ? {color: '#2B8ADA'} : null,
                  ]}>
                  Experience
                </Text>
                <FAIcon
                  name={showExpDet ? 'chevron-down' : 'chevron-right'}
                  color={showExpDet ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Experience Body */}
          {showExpDet ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
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
                        <Text style={styles.cellHeadingText}>Practice </Text>
                      </View>
                      {/* <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>Start Date</Text>
                      </View>
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>End Date</Text>
                      </View> */}
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>Experience</Text>
                      </View>
                    </View>
                  </View>
                  <ViewExperience />
                </View>
              </View>
            </View>
          ) : null}

          {/* Language Label*/}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                styles.whiteLabelView,
                showLangDet
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showLangDet
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  setshowLangDet(!showLangDet);
                }}>
                <FAIcon
                  name="language"
                  size={15}
                  color={showLangDet ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showLangDet ? {color: '#2B8ADA'} : null,
                  ]}>
                  Language
                </Text>
                <FAIcon
                  name={showLangDet ? 'chevron-down' : 'chevron-right'}
                  color={showLangDet ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Language Body*/}
          {showLangDet ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                <View style={{flexDirection: 'row'}}>
                  <ViewLang />
                </View>
              </View>
            </View>
          ) : null}

          <View style={{height: 50}}></View>

          {consultationModeModal ? <RenderModal /> : null}
        </ScrollView>
        {(selectedDate != null && selectedSlotId != null) ||
        (selectedPDate != null && selectedPSlotId != null && mode != null) ? (
          <View
            style={{
              backgroundColor: '#2B8ADA',
              height: 45,
              flexDirection: 'row',
            }}>
            <CustomButton
              text={'BOOK NOW'}
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
                console.log(mode, selectedPSlotId, selectedSlotId);
                let slotId =
                  mode == 'E_CONSULTATION' ? selectedSlotId : selectedPSlotId;
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
                  let date =
                    mode == 'E_CONSULTATION' ? selectedDate : selectedPDate;
                  let time =
                    mode == 'E_CONSULTATION'
                      ? selectedSlotTime
                      : selectedPSlotTime;
                  let endtime =
                    mode == 'E_CONSULTATION'
                      ? selectedSlotEndTime
                      : selectedPSlotEndTime;
                  let slotId =
                    mode == 'E_CONSULTATION' ? selectedSlotId : selectedPSlotId;

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
                            clinicId: clinicId,
                            consultationType: consultationType,
                            doctorObj: DocObj,
                            doctorDet: DocDet,
                            mode:mode,
                            slotDate:
                              mode == 'E_CONSULTATION'
                                ? selectedDate
                                : selectedPDate,
                            slotEndTime:
                              mode == 'E_CONSULTATION'
                                ? selectedSlotId
                                : selectedPSlotId,
                            slotId:
                              mode == 'E_CONSULTATION'
                                ? selectedSlotId
                                : selectedPSlotId,
                            slotStartTime:
                              mode == 'E_CONSULTATION'
                                ? selectedSlotTime
                                : selectedPSlotTime,
                            slotEndTime:
                              mode == 'E_CONSULTATION'
                                ? selectedSlotEndTime
                                : selectedPSlotEndTime,
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
                          let slotId =
                            mode == 'E_CONSULTATION'
                              ? selectedSlotId
                              : selectedPSlotId;
                          axios
                            .delete(
                              apiConfig.baseUrl +
                                '/patient/slot/prebook/delete?consultation=' +
                                mode +
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  label: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  whiteLabelView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
  },
  whiteBodyView: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
  },
  cellStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 3,
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
    fontSize: 12,
    marginVertical: 5,
    color: 'white',
  },
  cellText: {textAlign: 'center', fontSize: 11},
  bubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2b8ada',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 5,
    color: '#2b8ada',
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

export default DoctorDetails;
