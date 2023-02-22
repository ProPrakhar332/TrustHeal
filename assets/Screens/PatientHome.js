import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  Alert,
  useWindowDimensions,
  Dimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import {StyleSheet} from 'react-native';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Components/CustomButton';
import timeformatter from '../API/timeformatter';
import dayjs from 'dayjs';
import doctor_m from '../Resources/doctor_m.png';
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';
import doctor_f from '../Resources/doctor_f.jpg';
import waiting from '../Animations/waiting1.gif';

import generalmedicine from '../SpecialityIcons/generalmedicine.jpg';
import psychiatry from '../SpecialityIcons/psychiatry.jpg';
import neurology from '../SpecialityIcons/neurology.jpg';
import pediatrics from '../SpecialityIcons/pediatrics.jpg';
import dermatology from '../SpecialityIcons/dermatology.jpg';
import urology from '../SpecialityIcons/urology.jpg';
import orthopedics from '../SpecialityIcons/orthopedics.jpg';
import gastroentology from '../SpecialityIcons/gastroentology.jpg';

import anxiety from '../SymptomIcons/anxiety.png';
import cough from '../SymptomIcons/cough.png';
import covid from '../SymptomIcons/covid.png';
import fever from '../SymptomIcons/fever.png';
import hairfall from '../SymptomIcons/hairfall.png';
import headache from '../SymptomIcons/headache.png';
import loosemotion from '../SymptomIcons/loosemotion.png';
import stomachpain from '../SymptomIcons/stomachpain.png';

const slideshow = [
  'https://wallpaperaccess.com/full/3988527.jpg',
  'https://wallpaperaccess.com/full/619974.jpg',
  'https://images.benefitspro.com/benefitspro/article/2016/06/06/doctor-3-getty.jpg',
  'https://s3.amazonaws.com/freestock-prod/450/freestock_45335776.jpg',
];

const dataListOfDoctors = [
  {
    name: 'Dr. Imarti Rawat',
    spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    img: doctor_f,
  },
  {
    name: 'Dr. Luv Kumar',
    spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    img: doctor_m,
  },
  {
    name: 'Dr. Shreya Day',
    spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    img: doctor_f,
  },
  {
    name: 'Dr. Jay Sharma',
    spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    img: doctor_m,
  },
];
// const dataRecentConsultation = [
//   {
//     name: 'Dr. Imran Ahmed',
//     spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
//     exp: '20 Years Exp.',
//     deg: 'MBBS, MD, FID, CCLHA',
//     date: '03-11-2022',
//     mode: 'E-Consultation',
//     time: '9:30 am',
//     loc: 'JSPL, Angul',
//     pres: '',
//     img: doctor_m,
//   },
//   {
//     name: 'Dr. Imran Rawat',
//     spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
//     exp: '20 Years Exp.',
//     deg: 'MBBS, MD, FID, CCLHA',
//     date: '03-11-2022',
//     mode: 'P-Consultation',
//     time: '9:30 am',
//     loc: 'JSPL, Angul',
//     pres: '',
//     img: doctor_m,
//   },
//   {
//     name: 'Dr. Imran Singh',
//     spl: 'MD, DM - Cardiology Senior Consultant- Cardiology',
//     exp: '20 Years Exp.',
//     deg: 'MBBS, MD, FID, CCLHA',
//     date: '03-11-2022',
//     mode: 'E-Consultation',
//     time: '9:30 am',
//     loc: 'JSPL, Angul',
//     pres: '',
//     img: doctor_m,
//   },
// ];
const dataUpcoming = [
  {
    name: 'Dr. Ishita Singh',
    spl: 'Cardiology',
    exp: '20 Years Exp.',
    deg: 'MBBS, MD, FID, CCLHA',
    date: '03-11-2022',
    mode: 'P-Consultation',
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
    mode: 'P-Consultation',
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
    mode: 'P-Consultation',
    time: '9:30 am',
    loc: 'JSPL, Angul',
    pres: '',
    img: doctor_f,
  },
];
const dataListOfDoctorsResponse = [
  {
    city: 'string',
    degrees: ['string'],
    dob: '2023-02-16',
    doctorId: 0,
    doctorName: 'string',
    photoPath: 0,
    specialization: ['string'],
    totalExprienceInMonths: 0,
  },
];

const {width} = Dimensions.get('window');
const height = width * 0.5;

function PatientHome({navigation}) {
  const [BannerData, setBannerData] = useState([]);
  const [UpcomingData, setUpcomingData] = useState([]);
  const [SplData, setSplData] = useState([]);
  const [SymptomsData, setSymptomsData] = useState([]);
  const [DoctorsData, setDoctorsData] = useState([]);
  const [states, setStates] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  // const renderRecentConsultations = ({item}) => (
  //   <TouchableOpacity
  //     style={{
  //       backgroundColor: '#E8F0FE',
  //       borderRadius: 10,
  //       padding: 5,
  //       margin: 5,
  //       flexDirection: 'column',
  //       width: 350,
  //       height: 210,
  //     }}>
  //     {/* UpperHalf */}
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         borderBottomColor: 'gray',
  //         borderBottomWidth: 1,
  //       }}>
  //       {/* Image */}
  //       <TouchableOpacity
  //         style={{
  //           width: 80,
  //           flexDirection: 'column',
  //           alignSelf: 'center',
  //           margin: 5,
  //         }}>
  //         <Image
  //           source={item.img}
  //           style={{
  //             width: 80,
  //             height: 150,
  //             borderRadius: 10,
  //             alignSelf: 'center',
  //           }}
  //         />
  //       </TouchableOpacity>
  //       {/* Details */}
  //       <View style={{width: 250, justifyContent: 'space-evenly'}}>
  //         <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
  //         <Text style={{fontSize: 12, color: 'gray'}}>{item.spl}</Text>

  //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.exp}</Text>
  //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.deg}</Text>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'space-evenly',
  //           }}>
  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: 'column',
  //               justifyContent: 'space-between',
  //             }}>
  //             <Text style={{fontSize: 10, fontWeight: 'bold'}}>Date</Text>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //               }}>
  //               <FAIcons name="calendar-alt" style={{marginRight: 5}} />
  //               <Text style={{fontSize: 10}}> {item.date}</Text>
  //             </View>
  //           </View>

  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: 'column',
  //               justifyContent: 'space-between',
  //               marginRight: 5,
  //             }}>
  //             <Text style={{fontSize: 10, fontWeight: 'bold'}}>Mode</Text>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //               }}>
  //               <FAIcons
  //                 name={item.mode === 'P-Consultation' ? 'user-alt' : 'video'}
  //                 style={{marginRight: 5}}
  //               />
  //               <Text style={{fontSize: 10}}> {item.mode}</Text>
  //             </View>
  //           </View>

  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: 'column',
  //               justifyContent: 'space-between',
  //               marginLeft: 5,
  //             }}>
  //             <Text style={{fontSize: 10, fontWeight: 'bold'}}>Time</Text>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //               }}>
  //               <FAIcons name="clock" style={{marginRight: 5}} />
  //               <Text style={{fontSize: 10}}> {item.time}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //     {/* LowerHalf */}
  //     <View style={{flexDirection: 'row', alignSelf: 'center'}}>
  //       {/* Location */}
  //       <View style={{flexDirection: 'row', padding: 10}}>
  //         <IonIcons name="location" style={{alignSelf: 'center'}} />
  //         <Text style={{alignSelf: 'center', fontSize: 12}}>{item.loc}</Text>
  //       </View>
  //       {/* Button Re-consultation */}
  //       <View style={{flexDirection: 'row'}}>
  //         <CustomButton
  //           text="Re-Consult"
  //           textstyle={{
  //             color: 'white',
  //             fontSize: 12,
  //             fontWeight: 'bold',
  //           }}
  //           style={{
  //             backgroundColor: '#2B8ADA',
  //             borderRadius: 5,
  //             padding: 20,
  //             paddingVertical: 5,
  //             alignSelf: 'center',
  //           }}
  //         />
  //       </View>
  //       {/* Button Prescription */}
  //       <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
  //         <FAIcons
  //           name="prescription"
  //           size={12}
  //           style={{
  //             alignSelf: 'center',
  //             color: '#2B8ADA',
  //             borderColor: '#2B8ADA',
  //             borderWidth: 1,
  //             padding: 5,
  //             borderRadius: 5,
  //           }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   </TouchableOpacity>
  // );
  const renderUpcomingConsultations = ({item}) => (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        width: 290,
        height: 80,
      }}
      key={item.consultationId}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {/* Image */}
        <View
          style={{
            width: 80,
            flexDirection: 'column',
            alignSelf: 'center',
            margin: 5,
          }}>
          <Image
            source={
              item.photoPath == 0
                ? defaultDoctor
                : {
                    uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.photoPath}&userId=${item.doctorId}`,
                  }
            }
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              alignSelf: 'center',
            }}
          />
        </View>
        {/* Details */}
        <View style={{width: 160, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            {item.doctorName}
          </Text>
          <Text style={{fontSize: 10, color: 'gray'}}>
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
            <Text style={{fontSize: 10, color: '#2B8ADA'}}>
              {item.consultationType == 'PHYSICAL'
                ? 'P-Consultation'
                : 'E-Consultation'}
            </Text>
          </View>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            {timeformatter(item.slotStartTime)}
            {'  |  '}
            {dayjs(item.date).format('DD-MMM-YY')}
          </Text>
        </View>
        {/* Chat Button */}
        {/* <TouchableOpacity style={{alignSelf: 'flex-start'}}>
          <Entypo
            name="chat"
            color={'white'}
            size={15}
            style={{
              backgroundColor: '#2B8ADA',
              padding: 5,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const RenderSpeciality = () => {
    return SplData.map((data, index) => {
      return (
        <TouchableOpacity
          key={data.specializationImage}
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            height: 70,
            width: 80,
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
            borderRadius: 15,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate('AllSpeciality');
          }}>
          {/* <Image/> */}
          <Image
            source={{
              uri: `${apiConfig.baseUrl}/file/admin/download?fileToken=${data.specializationImage}`,
            }}
            style={{height: 45, width: 45, alignSelf: 'center'}}
          />
          <Text style={{fontSize: 9, alignSelf: 'center'}}>
            {data.specialization}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const RenderSymptoms = () => {
    return SymptomsData.map((data, index) => {
      return (
        <TouchableOpacity
          key={data.symptomImage}
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            height: 70,
            width: 80,
            backgroundColor: '#2B8ADA',
            justifyContent: 'space-evenly',
            borderRadius: 15,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate('AllSymptoms');
          }}>
          {/* <Image/> */}
          <Image
            source={{
              uri: `${apiConfig.baseUrl}/file/admin/download?fileToken=${data.symptomImage}`,
            }}
            style={{height: 45, width: 45, alignSelf: 'center'}}
          />
          <Text style={{fontSize: 10, alignSelf: 'center', color: 'white'}}>
            {data.symptom}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderListOfDoctors = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 15,
          width: 150,
          marginHorizontal: 5,
        }}>
        {/* Image */}
        <Image
          source={
            item.photoPath == 0
              ? defaultDoctor
              : {
                  uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.photoPath}&userId=${item.doctorId}`,
                }
          }
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginVertical: 5,
            borderRadius: 10,
          }}
        />
        {/* Details */}
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-around',
            marginBottom: 5,
          }}>
          {/* Name */}
          <Text
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 14,
              color: 'black',
            }}>
            {item.doctorName}
          </Text>
          {/* Degree */}
          <Text
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 12,
              color: 'gray',
            }}>
            {item.degrees.map(index => {
              return item.degrees.indexOf(index) != item.degrees.length - 1
                ? index + ', '
                : index;
            })}
          </Text>
          {/* Speciality */}
          <Text
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 12,
              color: '#2b8ada',
            }}>
            {item.specialization.map(index => {
              return item.specialization.indexOf(index) !=
                item.specialization.length - 1
                ? index + ', '
                : index;
            })}
          </Text>
          {/* Experience */}
          <Text
            style={{
              textAlign: 'left',
              color: 'black',
              fontSize: 12,
            }}>
            {Math.floor(item.totalExprienceInMonths / 12)}
            {' years of experience'}
          </Text>
        </View>
        {/* View Profile Button */}
        <CustomButton
          text="View Profile"
          textstyle={{color: 'white', fontSize: 12, fontWeight: 'bold'}}
          style={{
            backgroundColor: '#2B8ADA',
            paddingVertical: 3,
          }}
          onPress={async () => {
            console.log(item.doctorName);
            await AsyncStorage.setItem('viewProfile', JSON.stringify(item));
            console.log(
              '======================== DOCTOR HOME ====================================',
              item,
            );
            navigation.navigate('DoctorDetails');
          }}
        />
      </View>
    );
  };
  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== states) {
      setStates(slide);
    }
  };

  //Load Data
  useEffect(() => {
    const getBanner = async () => {
      axios
        .get(apiConfig.baseUrl + '/suggest/patient/banner')
        .then(function (response) {
          console.log(
            '\n=========================== BANNER DATA ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) setBannerData(response.data.bannerPath);
        });
    };

    const getUpcoming = async () => {
      axios
        .get(apiConfig.baseUrl + '/patient/upcoming/consultations?patientId=1')
        .then(function (response) {
          console.log(
            '\n=========================== UPCOMING CONSULTATIONS ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) setUpcomingData(response.data);
        });
    };

    const getSpeciality = async () => {
      axios
        .get(apiConfig.baseUrl + '/suggest/specialization/dropdown?max=5&min=0')
        .then(function (response) {
          console.log(
            '\n=========================== SPECIALITY DATA ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) setSplData(response.data);
        });
    };

    const getSymptoms = async () => {
      axios
        .get(apiConfig.baseUrl + '/suggest/symptom/dropdown?max=5&min=0')
        .then(function (response) {
          console.log(
            '\n=========================== SYMPTOMS DATA ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) setSymptomsData(response.data);
        });
    };

    const getDoctors = async () => {
      axios
        .get(apiConfig.baseUrl + '/patient/doctors?max=5&min=0')
        .then(function (response) {
          console.log(
            '\n=========================== LIST OF DOCTORS DATA ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) setDoctorsData(response.data);
        });
    };

    getBanner();
    getUpcoming();
    getSpeciality();
    getSymptoms();
    getDoctors();
  }, []);

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
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <HeaderPatient showMenu={true} />
          {/* slideshow */}
          <View style={{marginVertical: 10, width, height}}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={change}
              showsHorizontalScrollIndicator={false}
              style={{
                width: width - 40,
                height,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              {BannerData.map((item, index) => (
                <Image
                  key={index}
                  source={{
                    uri: `${apiConfig.baseUrl}/file/admin/download?fileToken=${BannerData[index]}`,
                  }}
                  style={{
                    width: width - 40,
                    height,
                    resizeMode: 'cover',
                  }}></Image>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              {BannerData.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == states
                      ? {color: 'white', margin: 3}
                      : {color: 'gray', margin: 3}
                  }>
                  ⬤
                </Text>
              ))}
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'column',
              width: '80%',
              alignSelf: 'center',
              borderRadius: 30,
              marginVertical: 10,
            }}>
            <CustomButton
              text="E-Consultation"
              textstyle={{color: 'white'}}
              style={{
                backgroundColor: '#2B8ADA',
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
            <CustomButton
              text="P-Consultation"
              textstyle={{color: 'white'}}
              style={{
                backgroundColor: '#17CC9C',
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
          </View>

          {/* Recent Consultation */}
          {/* <View style={styles.whiteBox}>
            {/* Heading */}
          {/* <View style={styles.headingBox}>
              <Text style={{color: '#2B8ADA'}}>Recent Consultations</Text>
              <Text
                style={{color: '#2B8ADA', textDecorationLine: 'underline'}}
                onPress={() => {}}>
                View All
              </Text>
            </View>
            {/* Blue Box */}
          {/* <View style={{flex: 1}}>
              <FlatList
                data={dataRecentConsultation}
                horizontal={true}
                keyExtractor={item => item.name}
                renderItem={renderRecentConsultations}
              /> 
            </View> 
          </View> */}

          {/* Upcoming Consultation */}
          {UpcomingData != '' ? (
            <View style={styles.transparentBox}>
              {/* Heading */}
              <View style={styles.headingBox}>
                <Text
                  style={{color: '#2B8ADA', fontWeight: 'bold', fontSize: 15}}>
                  Upcoming Consultations
                </Text>
                <Text
                  style={{
                    color: '#2B8ADA',
                    textDecorationLine: 'underline',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Appointments');
                  }}>
                  View All
                </Text>
              </View>
              {/* Transparent Box */}

              <FlatList
                data={UpcomingData}
                keyExtractor={item => item.consultationId}
                renderItem={renderUpcomingConsultations}
                horizontal={true}
              />
            </View>
          ) : null}

          {/* Select Via Speciality */}
          <View style={styles.transparentBox}>
            {/* Heading */}
            <View style={[styles.headingBox, {justifyContent: 'flex-start'}]}>
              <MIcons
                name="medical-bag"
                size={20}
                color={'#2b8ada'}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text
                style={{color: '#2B8ADA', fontWeight: 'bold', fontSize: 16}}>
                Select Via Speciality
              </Text>
            </View>
            {/* Transparent Box */}
            <ScrollView
              style={{alignSelf: 'center', flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <RenderSpeciality />
            </ScrollView>
            <Text
              style={{
                color: '#2B8ADA',
                fontSize: 12,
                alignSelf: 'flex-end',
                margin: 10,
              }}
              onPress={() => {
                console.log(Math.floor(width / 90));
                navigation.navigate('AllSpeciality');
              }}>
              View All
            </Text>
          </View>

          {/* Consult Doctor Via Symptom */}
          <View style={[styles.whiteBox, {marginVertical: 10}]}>
            {/* Heading */}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '90%',
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <MIcons
                  name="emoticon-sick-outline"
                  size={20}
                  color={'#2b8ada'}
                  style={{alignSelf: 'center', marginRight: 5}}
                />
                <Text
                  style={{color: '#2B8ADA', fontSize: 16, fontWeight: 'bold'}}>
                  Consult Doctor Via Symptom
                </Text>
              </View>
              <Text style={{color: 'gray', fontSize: 12}}>
                Select a symptom to book in 1 step
              </Text>
            </View>
            {/* Transparent Box */}
            <ScrollView
              style={{alignSelf: 'center', flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <RenderSymptoms />
            </ScrollView>
            <Text
              style={{
                color: '#2B8ADA',
                fontSize: 12,
                alignSelf: 'flex-end',
                margin: 10,
              }}
              onPress={() => {
                navigation.navigate('AllSymptoms');
              }}>
              View All
            </Text>
          </View>

          {/* List Of Doctors */}
          <View style={styles.transparentBox}>
            {/* Heading */}
            <View style={[styles.headingBox, {justifyContent: 'flex-start'}]}>
              <MIcons
                name="doctor"
                size={20}
                color={'#2b8ada'}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text
                style={{color: '#2B8ADA', fontWeight: 'bold', fontSize: 16}}>
                List Of Doctors
              </Text>
            </View>
            {/* Transparent Box */}
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <FlatList
                data={DoctorsData}
                horizontal={true}
                keyExtractor={item => item.doctorId}
                renderItem={renderListOfDoctors}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  backgroundColor: '#2b8ada',
                  padding: 5,
                  borderRadius: 10,
                  color: 'white',
                  fontSize: 12,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Consult');
                }}>
                More
              </Text>
            </View>
          </View>
        </ScrollView>
        {isLoading ? (
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
                Loading...
              </Text>
            </View>
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
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  transparentBox: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    padding: 10,
  },
  whiteBox: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
});
export default PatientHome;
