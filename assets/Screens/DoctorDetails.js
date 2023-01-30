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

import doctor_m from '../Resources/doctor_m.png';
import downloading from '../Animations/downloading.gif';
import apiConfig from '../API/apiConfig';

const data = {
  name: 'Dr. Imran Singh',
  spl: 'Psychiatry',
  exp: '10 Years of experience',
  deg: 'MBBS, MD, FID, CCLHA',
  city: 'New Delhi',
  email: 'Imran@gmail.com',
  mobileNumber: '+945652154',
  contactVisibility: true,
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
  doctorMedicalRegistrationDTOs: [
    {
      certificatePath: 'xyz',
      registrationCouncil: 'Mumbai Medical College',
      registrationNo: 'MH0234sb',
      registrationYear: '1986',
    },
  ],
};

function DoctorDetails({navigation}) {
  const [showGenInfo, setShowGenInfo] = useState(false);
  const [GenInfo, setGenInfo] = useState(true);
  const [showLangDet, setshowLangDet] = useState(false);
  const [showEduInfo, setShowEduInfo] = useState(false);
  const [EduInfo, setEduInfo] = useState(true);
  const [Education, setEducation] = useState([]);
  const [showMedInfo, setShowMedInfo] = useState(false);
  const [MedInfo, setMedInfo] = useState(true);
  const [MedRegDet, setMedRegDet] = useState(null);
  const [showExpDet, setShowExpDet] = useState(false);
  const [ExpInfo, setExpInfo] = useState(true);
  const [Experience, setExperience] = useState([]);
  const [showClinicDet, setShowClinicDet] = useState(false);
  const [ClinicInfo, setClinicInfo] = useState(true);
  const [ClinicDet, setClinicDet] = useState([]);
  const [isFetching, setisFetching] = useState(false);
  const [consultationModeModal, setconsultationModeModal] = useState(false);
  const layout = useWindowDimensions();

  //   useEffect(() => {
  // const getGenInfo = async()=>{
  //   axios.get(apiConfig.baseUrl+"")
  // }

  //   }, [showGenInfo]);

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
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {Education.degree}
              </Text>
            </View>
            {/* Passing Year */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {Education.passingYear}
              </Text>
            </View>
            {/* Specialization */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {Education.specialization}
              </Text>
            </View>
            {/* University */}
            <View style={styles.cellStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                {Education.university}
              </Text>
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
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {Experience.practiceAt}
              </Text>
            </View>
            {/*             
           
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Experience.startDate).isValid()
                  ? dayjs(Experience.startDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
           
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Experience.endDate).isValid()
                  ? dayjs(Experience.endDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            
             */}
            {/* Total Experience */}
            <View style={styles.cellStyle}>
              {Math.floor(Experience.experienceInMonths / 12) > 0 ? (
                <Text style={{textAlign: 'center', fontSize: 10}}>
                  {Math.floor(Experience.experienceInMonths / 12) + ' year(s)'}
                </Text>
              ) : null}
              {parseInt(Experience.experienceInMonths % 12) != 0 ? (
                <Text style={{textAlign: 'center', fontSize: 10}}>
                  {parseInt(Experience.experienceInMonths % 12) + ' month(s)'}
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
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {ClinicDet.clinicName}
              </Text>
            </View>
            {/* Clinic Address */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {ClinicDet.clinicAddress}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };
  const ViewLang = () => {
    return languages.map((lang, index) => {
      return (
        <View style={styles.bubble} key={index}>
          <Text style={{color: 'white', fontSize: 12}}>{lang.language}</Text>
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
          {/* Genreal Information Label*/}
          <View
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
          </View>
          {/* Genreal Information Body*/}
          {showGenInfo ? (
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
          {/* Clinic Information Body*/}
          {showLangDet ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={styles.whiteBodyView}>
                <View style={{flexDirection: 'row'}}>
                  <ViewLang />
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
                        {data.doctorMedicalRegistrationDTOs[0].registrationNo}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Reg. Council:</Text>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {
                          data.doctorMedicalRegistrationDTOs[0]
                            .registrationCouncil
                        }
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', flex: 0.3}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.subHeading}>Reg. Year :</Text>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {data.doctorMedicalRegistrationDTOs[0].registrationYear}
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
                      <View style={styles.cellHeading}>
                        <Text style={styles.cellHeadingText}>Degree</Text>
                      </View>
                      <View style={styles.cellHeading}>
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
                        <Text style={styles.cellHeadingText}>Practice At</Text>
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

          {consultationModeModal ? <RenderModal /> : null}
        </ScrollView>
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
            onPress={() => setconsultationModeModal(true)}
          />
        </View>
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
    paddingVertical: 1,
  },
  cellHeading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  cellHeadingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 11,
    marginVertical: 5,
  },
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
});

export default DoctorDetails;
