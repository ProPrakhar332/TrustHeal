import React, {useState, useRef} from 'react';
import {
  Text,
  Alert,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

//icons
import doctor from '../Resources/doctor.png';
import upload from '../Resources/upload.png';
import waiting from '../Animations/waiting1.gif';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import Header from '../Components/Header';

const dataTitle = [
  {key: 'Dr.', value: 'Dr.'},
  {key: 'Mr.', value: 'Mr.'},
  {key: 'Mrs.', value: 'Mrs.'},
  {key: 'Ms.', value: 'Ms.'},
];
const dataGender = [
  {key: 'Male', value: 'Male'},
  {key: 'Female', value: 'Female'},
  {key: 'Other', value: 'Other'},
];
const data = [
  {key: 'Dermatologist', value: 'Dermatologist'},
  {key: 'Dietician & Nutition', value: 'Dietician & Nutition'},
  {key: 'ENT', value: 'ENT'},
  {key: 'Endocrinologist', value: 'Endocrinologist'},
  {key: 'Gastoentrologist', value: 'Gastoentrologist'},
  {key: 'Gynecologist', value: 'Gynecologist'},
  {key: 'Lifestyle Diseases', value: 'Lifestyle Diseases'},
  {key: 'Ophthalmologist', value: 'Ophthalmologist'},
  {key: 'Pediatrician', value: 'Pediatrician'},
  {key: 'Physician', value: 'Physician'},
  {key: 'Psychiatrist', value: 'Psychiatrist'},
  {key: 'Psychological Counselling', value: 'Psychological Counselling'},
];
const dataFollowUp = [
  {key: '1', value: '1'},
  {key: '2', value: '2'},
  {key: '3', value: '3'},
  {key: '4', value: '4'},
  {key: '5', value: '5'},
  {key: '6', value: '6'},
  {key: '7', value: '7'},
];
const dataShowMobNo = [
  {key: 'Yes', value: 'Yes'},
  {key: 'No', value: 'No'},
];
const dataShowQues = [
  {key: 'Yes', value: 'Yes'},
  {key: 'No', value: 'No'},
];
const dataMode = [
  {key: 'VIDEO_CALL', value: 'Video'},
  {key: 'PHONE_CALL', value: 'Phone'},
];

const EditProfile = ({navigation}) => {
  //General Information Field
  const [doctorObj, setdoctorObj] = useState(null);
  const [doctorId, setdoctorId] = useState(0);
  const [showGenInfo, setShowGenInfo] = useState(false);
  const [GenInfoEdit, setGenInfoEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setdob] = useState('');
  //Calendar View
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateFromModal, setselectedDateFromModal] =
    useState('YYYY-MM-DD');
  const [isStartExpDatePickerVisible, setStartExpDatePickerVisible] =
    useState(false);
  const [isEndExpDatePickerVisible, setEndExpDatePickerVisible] =
    useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  //Medical Registration Feild
  const [showMedReg, setShowMedReg] = useState(false);
  const [MedInfoEdit, setMedInfoEdit] = useState(false);
  const [doctorMedicalRegistration, setDoctorMedicalRegistration] =
    useState(null);
  const [RegNo, setRegNo] = useState('');
  const [RegCouncil, setRegCouncil] = useState('');
  const [RegCert, setRegCert] = useState('');
  const [RegYear, setRegYear] = useState('');
  //Educational Details Field
  const [showEduDet, setShowEduDet] = useState(false);
  const [EduDetEdit, setEduDetEdit] = useState(false);
  const [dataSpecialization, setdataSpecialization] = useState([]);
  const [Education, setEducation] = useState([]);
  const [EducationUpdate, setEducationUpdate] = useState([]);
  const [Degree, setDegree] = useState('');
  const [DegreePassingYear, setDegreePassingYear] = useState('');
  const [Specialization, setSpecialization] = useState('');
  const [University, setUniversity] = useState('');

  //Experience
  const [showExpDet, setShowExpDet] = useState(false);
  const [Experience, setExperience] = useState([]);
  const [ExperienceUpdate, setExperienceUpdate] = useState([]);
  const [practiceAt, setPracticeAt] = useState('');
  const [startExpDate, setStartExpDate] = useState('');
  const [endExpDate, setEndExpDate] = useState('');
  const [experienceInMonths, setExperienceInMonths] = useState('');
  const [TotalYear, setTotalYear] = useState('');
  const [TotalMonths, setTotalMonths] = useState('');
  //Identification
  const [showIdenDet, setShowIdenDet] = useState(false);
  const [IdenDetEdit, setIdenDetEdit] = useState(false);
  const [Aadhar, setAadhar] = useState('');
  const [IdentificationDocs, setIdentificationDocs] = useState([]);
  const [IdentificationDocsUpdate, setIdentificationDocsUpdate] = useState([]);
  const [identificationNumber, setidentificationNumber] = useState('');
  const [identificationType, setidentificationType] = useState('');

  //General Configuration
  const [showGenConfig, setShowGenConfig] = useState(false);
  const [GenConfigEdit, setGenConfigEdit] = useState(false);
  const [DoctorConfiguration, setDoctorConfiguration] = useState(null);
  const [showMobNo, setshowMobNo] = useState('');
  const [showFollowUp, setshowFollowUp] = useState('');

  //consultation fees
  const [showConsultFees, setShowConsultFees] = useState(false);
  const [ConsultFeesEdit, setConsultFeesEdit] = useState(false);
  const [DoctorFees, setDoctorFees] = useState(null);
  const [physicalConsulationFees, setphysicalConsulationFees] = useState(0);
  const [eConsulationFees, seteConsulationFees] = useState(0);
  const [followUpFees, setfollowUpFees] = useState(0);
  const [doctorConsulationFeesPkId, setdoctorConsulationFeesPkId] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      console.log('profile: ', x);
      setdoctorObj(x);
      setdoctorId(Number(x.doctorId));
      //console.log(doctorId);
      setTitle(x.title);
      setName(x.fullName == null ? x.doctorName : x.fullName);
      setEmail(x.email);
      setGender(x.gender);
      setCity(x.city);
      //console.log(x.age);
      setdob(x.dob);
      setAge(x.age + '');
      setPinCode(x.pincode == null ? x.pinCode : x.pincode);
      setDoctorConfiguration(
        x.doctorConfigurationDTO != null ? x.doctorConfigurationDTO : '',
      );
    };

    onLoadSetData();
  }, []);

  //date picker functions
  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };
  //date picker functions
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  //date picker functions
  const handleConfirm = async date => {
    await AsyncStorage.setItem('dob', JSON.stringify(date).substring(1, 11));
    setdob(JSON.stringify(date).substring(1, 11));
    calculateAge();
    hideDatePicker();
  };

  //calculating Age
  const calculateAge = async () => {
    let tmep = await AsyncStorage.getItem('dob');
    var year = Number(tmep.substring(0, 4));
    var month = Number(tmep.substring(5, 7)) - 1;
    var day = Number(tmep.substring(8));
    var today = new Date();
    let x = today.getFullYear() - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      x = x - 1;
    }
    await AsyncStorage.setItem('age', x + '');
    setAge(x);
  };

  // useEffect(() => {
  //   const setDate = async () => {
  //     setdob(await AsyncStorage.getItem('dob'));
  //   };

  //   setDate();
  // }, [dob]);
  // useEffect(() => {
  //   const settingAge = async () => {
  //     setAge(await AsyncStorage.getItem('age'));
  //   };
  //   settingAge();
  // }, [age]);

  const clearKeys = async () => {
    await AsyncStorage.removeItem('dob');
    await AsyncStorage.removeItem('age');
  };

  //check total month not greater than 11
  useEffect(() => {
    const monthCheck = () => {
      if (Number(TotalMonths) > 11) {
        Alert.alert(
          'Months should be greater than equal to 0 and less than 11!',
        );
        setTotalMonths('');
      }
    };
    if (TotalMonths.length == 2) monthCheck();
  }, [TotalMonths]);

  //Api calls onpress labels

  //get Medical Registration
  useEffect(() => {
    const getMedReg = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/doctor/medicalregistrations?doctorId=' +
            doctorId,
        )
        .then(function (response) {
          if (response.status == 200) {
            let doctorMedicalRegistrations = response.data;
            if (
              doctorMedicalRegistrations != null &&
              doctorMedicalRegistrations.length > 0
            ) {
              setDoctorMedicalRegistration(doctorMedicalRegistrations[0]);
              setRegNo(doctorMedicalRegistrations[0].registrationNo);
              setRegCouncil(doctorMedicalRegistrations[0].registrationCouncil);
              setRegYear(doctorMedicalRegistrations[0].registrationYear);
              setRegCert(doctorMedicalRegistrations[0].certificatePath);
            }
          } else Alert.alert('Could not get Details. Please try again later.');
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (showMedReg == true) getMedReg();
  }, [showMedReg]);

  //get Educational Qualifications
  useEffect(() => {
    const getEduDet = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/educations?doctorId=' + doctorId)
        .then(function (response) {
          if (response.status == 200) {
            if (response.data != null) {
              setEducation(response.data);
            }
          } else Alert.alert('Could not get Details. Please try again later.');
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (showEduDet == true) getEduDet();
  }, [showEduDet]);

  //get Experience
  useEffect(() => {
    const getExpDet = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/experience?doctorId=' + doctorId)
        .then(function (response) {
          if (response.status == 200) {
            if (response.data != null) {
              setExperience(response.data);
            }
          } else Alert.alert('Could not get Details. Please try again later.');
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (showExpDet == true) getExpDet();
  }, [showExpDet]);

  //get Identification
  useEffect(() => {
    const getIdenDocs = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/identifications?doctorId=' + doctorId)
        .then(function (response) {
          if (response.data != '') {
            setIdentificationDocs(response.data);
            //console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (showIdenDet == true) getIdenDocs();
  }, [showIdenDet]);

  //get General Configuration
  useEffect(() => {
    const getGenConfig = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      //console.log(x.doctorConfigurationDTO);
      setDoctorConfiguration(
        x.doctorConfigurationDTO != null ? x.doctorConfigurationDTO : '',
      );
      setshowMobNo(
        DoctorConfiguration.contactVisibility != null
          ? DoctorConfiguration.contactVisibility
            ? 'Yes'
            : 'No'
          : '',
      );
      setshowFollowUp(
        DoctorConfiguration.followUpDuration != null
          ? DoctorConfiguration.followUpDuration
          : '',
      );
    };
    if (showGenConfig == true) getGenConfig();
  }, [showGenConfig]);

  //get Consultation Fees
  useEffect(() => {
    const getFeesDet = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/fees?doctorId=' + doctorId)
        .then(function (response) {
          if (response.data != '') {
            setDoctorFees(response.data);
            setphysicalConsulationFees(response.data.physicalConsulationFees);
            seteConsulationFees(response.data.econsulationFees);
            setfollowUpFees(response.data.followUpFees);
            setdoctorConsulationFeesPkId(
              response.data.doctorConsulationFeesPkId,
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (showConsultFees == true) getFeesDet();
  }, [showConsultFees]);

  //api calls on press update button

  const updateGenInfo = async () => {
    let mainOnj = new Object();
    mainOnj.dob = dob;
    mainOnj.age = Number(age);
    mainOnj.city = city;
    mainOnj.doctorId = doctorId;
    mainOnj.mobileNumber = doctorObj.mobileNumber;
    mainOnj.email = email;
    mainOnj.fullName = name;
    mainOnj.gender = gender;
    mainOnj.pincode = pinCode;
    mainOnj.title = title;
    console.log(
      'General Info Update---------\n' + JSON.stringify(mainOnj, null, 1),
    );
    axios
      .post(apiConfig.baseUrl + '/doctor/generalinfo/save', mainOnj)
      .then(function (response) {
        if (response.status == 200) {
          Alert.alert(
            'All changes made in Genreal Information have been updated.',
          );
          setGenInfoEdit(false);
        } else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateMedReg = async () => {
    let mainOnj = new Object();
    mainOnj.medicalRegistrationId =
      doctorMedicalRegistration.doctorMedicalRegistrationPkId;
    mainOnj.doctorId = doctorId;
    mainOnj.registrationCouncil = RegCouncil;
    mainOnj.registrationNo = RegNo;
    mainOnj.registrationYear = Number(RegYear);
    mainOnj.certificatePath = 'aws/s3/' + doctorId + '/cerificates';
    console.log(
      'Medical Regd Update---------\n' + JSON.stringify(mainOnj, null, 1),
    );
    axios
      .post(apiConfig.baseUrl + '/doctor/medicalregi/update', mainOnj)
      .then(function (response) {
        if (response.status == 200) {
          Alert.alert(
            'All changes made in Medical Registration Updated successfully!',
          );
          setMedInfoEdit(false);
        } else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateEduDet = async () => {
    axios
      .post(apiConfig.baseUrl + '/doctor/education/update', EducationUpdate)
      .then(function (response) {
        if (response.status == 200)
          Alert.alert(
            'Educational Qualifications Details Updated Successfully!',
          );
        else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateExperience = async () => {
    axios
      .post(apiConfig.baseUrl + '/doctor/experience/save', ExperienceUpdate)
      .then(function (response) {
        if (response.status == 200)
          Alert.alert('Experience Details Updated Successfully!');
        else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateIden = async () => {
    axios
      .post(
        apiConfig.baseUrl + '/doctor/identity/update',
        IdentificationDocsUpdate,
      )
      .then(function (response) {
        if (response.status == 200)
          Alert.alert('Identification Details Updated Successfully!');
        else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateGenConfig = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));

    console.log('General Config Update---------\n');
    var flag = 1;
    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/contact/visibility/update?contactVisibility=' +
          '&doctorId=' +
          doctorId,
      )
      .then(function (response) {
        if (response.status == 200) {
          // x.doctorConfigurationDTO.followUpDuration = showFollowUp;
          // x.doctorConfigurationDTO.contactVisibility =
          //   showMobNo == 'Yes' ? true : false;
          // AsyncStorage.setItem('UserDoctorProfile', JSON.stringify(x));
          flag = 1;
          //setGenConfigEdit(false);
        } else flag = 0;
      });
    let doctorFees = new Object();
    doctorFees.doctorId = doctorId;
    doctorFees.followUpDuration = followUpDuration;
    axios
      .post(apiConfig.baseUrl + '/doctor/fees/update', doctorFees)
      .then(function (response) {
        if (response.status == 200) {
          flag = 1;
        } else flag = 0;
      });
    if (flag == 1)
      Alert.alert('All changes made in General Config have been updated');
    else Alert.alert('Could not Update Details. Please try again later.');
  };

  const updatefees = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorFees = new Object();
    doctorFees.feesId = DoctorFees.doctorConsulationFeesPkId;
    doctorFees.doctorId = doctorId;
    doctorFees.physicalConsulationFees = physicalConsulationFees;
    doctorFees.eConsulationFees = eConsulationFees;
    doctorFees.followUpFees = followUpFees;

    console.log('Fees Update---------\n' + JSON.stringify(doctorFees, null, 1));
    axios
      .post(apiConfig.baseUrl + '/doctor/fees/update', doctorFees)
      .then(function (response) {
        if (response.status == 200) {
          x.doctorFeesDTO.physicalConsulationFees = physicalConsulationFees;
          x.doctorFeesDTO.eConsulationFees = eConsulationFees;
          x.doctorFeesDTO.followUpFees = followUpFees;
          AsyncStorage.setItem('UserDoctorProfile', JSON.stringify(x));
          Alert.alert('All changes made in Fees Config have been updated');
          setConsultFeesEdit(false);
        } else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const handleStartExpDate = async date => {
    setStartExpDatePickerVisible(false);
    await setStartExpDate(dayjs(date).format('YYYY-MM-DD'));
    calculateExp();
  };

  const handleEndExpDate = async date => {
    setEndExpDatePickerVisible(false);
    await setEndExpDate(dayjs(date).format('YYYY-MM-DD'));
    calculateExp();
  };

  calculateExp = async () => {
    if (dayjs(startExpDate).isValid() && dayjs(endExpDate).isValid()) {
      let startDt = dayjs(startExpDate);
      let endDt = dayjs(endExpDate);
      if (endDt.isBefore(startDt)) {
        Alert.alert('Please enter valid date range');
        setStartExpDate('');
        setEndExpDate('');
      } else {
        let diffMonth = endDt.diff(startDt, 'month');
        setExperienceInMonths(diffMonth);
        setTotalYear(Math.floor(diffMonth / 12));
        setTotalMonths(parseInt(diffMonth % 12));
      }
    }
  };

  //rendering dynamic components
  const ViewIdentifications = () => {
    return IdentificationDocs.map((IdentificationDocs, index) => {
      return (
        <View
          style={{
            flexDirection: 'column',
            width: '95%',
            alignSelf: 'center',
          }}
          key={index}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={[styles.inputLabel, {marginTop: 0}]}>
                {IdentificationDocs.identificationType}
              </Text>
              <Text style={[styles.textInput, {backgroundColor: '#d0e0fc'}]}>
                {IdentificationDocs.identificationNumber}
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <CustomButton
              text="Delete"
              textstyle={{color: 'white', fontSize: 12}}
              style={{
                backgroundColor: 'red',
                borderRadius: 5,
                padding: 6,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                removeIdenHandler(IdentificationDocs.identificationType);
              }}
            />
          </View> */}
        </View>
      );
    });
  };
  const ViewIdentificationsTabular = () => {
    return IdentificationDocs.map((IdentificationDocs, index) => {
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
                {IdentificationDocs.identificationType}
              </Text>
            </View>
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {IdentificationDocs.identificationNumber}
              </Text>
            </View>
            {/* End Date */}
            <View style={styles.cellStyle}>
              <FAIcon name="file-pdf" size={15} color={'#2b8ada'} />
            </View>
          </View>
        </View>
      );
    });
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
            <View style={styles.cellStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: 'blue',
                  marginVertical: 5,
                }}>
                Edit
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: 'red',
                  marginBottom: 5,
                }}>
                Delete
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  const ViewExperienceTabular = () => {
    return Experience.map((Exp, index) => {
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
                {Exp.practiceAt}
              </Text>
            </View>
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Exp.startDate).isValid()
                  ? dayjs(Exp.startDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            {/* End Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Exp.endDate).isValid()
                  ? dayjs(Exp.endDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            {/* Total Experience */}
            <View style={styles.cellStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                {Math.floor(Exp.experienceInMonths / 12)} {'years'}{' '}
              </Text>

              {parseInt(Exp.experienceInMonths % 12) != 0 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  {parseInt(Exp.experienceInMonths % 12) + ' months'}
                </Text>
              ) : null}
            </View>
            <View style={styles.cellStyle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: 'blue',
                  marginVertical: 5,
                }}>
                Edit
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: 'red',
                  marginBottom: 5,
                }}>
                Delete
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  const ViewExperience = () => {
    return Experience.map((Exp, index) => {
      return (
        <View style={{flex: 1}} key={index}>
          <View style={styles.whiteBodyView}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginBottom: 10,
                padding: 5,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={styles.inputLabel}>Practice At</Text>
                    <Text
                      style={[styles.textInput, {backgroundColor: '#d0e0fc'}]}>
                      {Exp.practiceAt}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 0.475}}>
                    <Text style={styles.inputLabel}>Start Date</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: '#d0e0fc',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={[
                          styles.textInput,
                          {flex: 1, backgroundColor: '#d0e0fc'},
                        ]}>
                        {dayjs(Exp.startDate).isValid()
                          ? dayjs(Exp.startDate).format('DD-MM-YYYY')
                          : 'DD-MM-YYYY'}
                      </Text>
                      <FAIcon
                        name="calendar-alt"
                        color={'gray'}
                        size={20}
                        style={{
                          marginHorizontal: 5,
                          position: 'absolute',
                          right: 0,
                        }}
                        // onPress={() => {setStartExpDatePickerVisible(true)}}
                      />
                    </View>
                    {/* <DateTimePickerModal
                      isVisible={isStartExpDatePickerVisible}
                      mode="date"
                      date={dayjs(startExpDate).isValid() ? dayjs(startExpDate).toDate() : dayjs().toDate()}
                      maximumDate={dayjs().toDate()}
                      onConfirm={handleStartExpDate}
                      onCancel={() => {setStartExpDatePickerVisible(false)}}
                    /> */}
                  </View>
                  <View style={{flex: 0.475}}>
                    <Text style={styles.inputLabel}>End Date</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: '#d0e0fc',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={[
                          styles.textInput,
                          {flex: 1, backgroundColor: '#d0e0fc'},
                        ]}>
                        {dayjs(Exp.endDate).isValid()
                          ? dayjs(Exp.endDate).format('DD-MM-YYYY')
                          : 'DD-MM-YYYY'}
                      </Text>
                      <FAIcon
                        name="calendar-alt"
                        color={'gray'}
                        size={20}
                        style={{
                          marginHorizontal: 5,
                          position: 'absolute',
                          right: 0,
                        }}
                        // onPress={() => {setEndExpDatePickerVisible(true)}}
                      />
                    </View>
                    {/* <DateTimePickerModal
                      isVisible={isEndExpDatePickerVisible}
                      mode="date"
                      date={dayjs(endExpDate).isValid() ? dayjs(endExpDate).toDate() : dayjs().toDate()}
                      maximumDate={dayjs().toDate()}
                      onConfirm={handleEndExpDate}
                      onCancel={() => {setEndExpDatePickerVisible(false)}}
                    /> */}
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 0.475, flexDirection: 'column'}}>
                  <Text style={styles.inputLabel}>Total Experience(Year)</Text>
                  <Text
                    style={[styles.textInput, {backgroundColor: '#d0e0fc'}]}>
                    {Math.floor(Exp.experienceInMonths / 12)}
                  </Text>
                </View>
                <View style={{flex: 0.475, flexDirection: 'column'}}>
                  <Text style={styles.inputLabel}>Total Experience(Month)</Text>
                  <Text
                    style={[styles.textInput, {backgroundColor: '#d0e0fc'}]}>
                    {parseInt(Exp.experienceInMonths % 12)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  //handling remove element in dynamic components
  const removeIdenHandler = e => {
    setIdentificationDocs(
      IdentificationDocs.filter(obj => obj.identificationType !== e),
    );
  };
  const removeEduHandler = e => {
    setEducation(Education.filter(obj => obj.degree !== e));
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
          // marginTop: 30,
        }}>
        <StatusBar animated={true} backgroundColor="#2B8ADA" />
        <ScrollView
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <Header showMenu={false} title="Edit Profile" />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <View>
              {/* Doctor Image */}
              <View
                style={{
                  backgroundColor: 'white',
                  width: 100,
                  height: 100,
                  borderRadius: 150,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 75,
                    height: 75,
                    marginVertical: 5,
                  }}
                  source={doctor}></Image>
              </View>
            </View>

            <View style={{}}>
              {/* General Info Label*/}
              <View
                style={{
                  width: '100%',
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
                      if (GenInfoEdit) {
                        setGenInfoEdit(false);
                      }
                      setShowGenInfo(!showGenInfo);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showGenInfo ? {color: '#2B8ADA'} : null,
                      ]}>
                      General Information
                    </Text>
                    {
                      GenInfoEdit ? (
                        <Text
                          style={[
                            {
                              alignSelf: 'center',
                              color: '#2B8ADA',
                              padding: 5,
                              textDecorationLine: 'underline',
                            },
                            showGenInfo ? null : {color: 'white'},
                          ]}
                          onPress={() => {
                            setGenInfoEdit(false);
                          }}>
                          Cancel
                        </Text>
                      ) : null
                      // <Text
                      //   style={[
                      //     {
                      //       alignSelf: 'center',
                      //       color: '#2B8ADA',
                      //       padding: 5,
                      //       textDecorationLine: 'underline',
                      //     },
                      //     showGenInfo ? null : {color: 'white'},
                      //   ]}
                      //   onPress={() => {
                      //     if (showGenInfo == true) {
                      //       Alert.alert(
                      //         'You can now edit General Information Field',
                      //       );
                      //       setGenInfoEdit(true);
                      //     }
                      //   }}>
                      //   Edit
                      // </Text>
                    }
                    {GenInfoEdit ? null : (
                      <FAIcon
                        name={showGenInfo ? 'chevron-down' : 'chevron-right'}
                        style={[styles.label, {width: '10%', fontSize: 20}]}
                        color={showGenInfo ? '#2B8ADA' : 'gray'}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* General Info Body*/}
              {showGenInfo ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    <View style={{flexDirection: 'column', marginVertical: 10}}>
                      {/* <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        backgroundColor: "#E8F0FE",
                        width: "90%",
                        height: 52,
                        borderRadius: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <Image
                            source={upload}
                            style={{ marginRight: "5%" }}
                          ></Image>
                          <Text style={{ fontSize: 12 }}>Upload Image</Text>
                        </View>
                      </View>
                    </View> */}
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={styles.inputLabel}>Title</Text>
                          {GenInfoEdit ? (
                            <SelectList
                              defaultOption={'Mr.'}
                              placeholder={title}
                              setSelected={val => setTitle(val)}
                              data={dataTitle}
                              save="value"
                              boxStyles={{
                                backgroundColor: '#E8F0FE',
                                borderWidth: 0,
                              }}
                              dropdownStyles={{backgroundColor: 'white'}}
                              dropdownTextStyles={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                              }}
                              badgeStyles={{backgroundColor: '#2b8ada'}}
                            />
                          ) : (
                            <Text
                              style={[
                                styles.textInput,
                                {backgroundColor: '#d0e0fc', padding: 10},
                              ]}>
                              {title}
                            </Text>
                          )}
                        </View>
                        <View style={{flex: 0.45}}>
                          <Text style={styles.inputLabel}>Full Name</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            placeholderTextColor={'black'}
                            onChangeText={text => setName(text)}
                            value={name}
                            editable={GenInfoEdit}></TextInput>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={styles.inputLabel}>Email</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            placeholderTextColor={'black'}
                            keyboardType={'email-address'}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            editable={GenInfoEdit}></TextInput>
                        </View>
                        <View style={{flex: 0.45}}>
                          <Text style={styles.inputLabel}>Gender</Text>
                          {GenInfoEdit ? (
                            <SelectList
                              labelStyles={{height: 0}}
                              placeholder={gender}
                              setSelected={val => setGender(val)}
                              data={dataGender}
                              save="value"
                              boxStyles={{
                                backgroundColor: '#E8F0FE',
                                borderWidth: 0,
                              }}
                              dropdownStyles={{backgroundColor: 'white'}}
                              dropdownTextStyles={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                              }}
                              badgeStyles={{backgroundColor: '#2b8ada'}}
                            />
                          ) : (
                            <Text
                              style={[
                                styles.textInput,
                                {backgroundColor: '#d0e0fc', padding: 10},
                                GenInfoEdit
                                  ? {backgroundColor: '#E8F0FE'}
                                  : null,
                              ]}>
                              {gender}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={styles.inputLabel}>Pin Code</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            maxLength={6}
                            onChangeText={text => setPinCode(text)}
                            value={pinCode}
                            editable={GenInfoEdit}></TextInput>
                        </View>
                        <View style={{flex: 0.45}}>
                          <Text style={styles.inputLabel}>City</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            placeholderTextColor={'black'}
                            onChangeText={text => setCity(text)}
                            value={city}
                            editable={GenInfoEdit}></TextInput>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={styles.inputLabel}>Date Of Birth</Text>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text
                              style={[
                                styles.textInput,
                                {backgroundColor: '#d0e0fc', flex: 1},
                                GenInfoEdit
                                  ? {backgroundColor: '#E8F0FE'}
                                  : null,
                              ]}>
                              {dayjs(dob).format('DD-MM-YYYY')}
                            </Text>
                            <FAIcon
                              name="calendar-alt"
                              color={'gray'}
                              size={16}
                              style={{
                                position: 'absolute',
                                right: 0,
                                marginRight: '5%',
                                alignSelf: 'center',
                              }}
                              onPress={GenInfoEdit ? showDatePicker : null}
                            />
                          </View>
                        </View>

                        <View style={{flex: 0.45}}>
                          <Text style={styles.inputLabel}>Age</Text>
                          <Text
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}>
                            {age}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '95%',
                          alignSelf: 'center',
                        }}>
                        {/* <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          marginVertical: 5,
                          width: '95%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={[styles.textInput, {flex: 0.95}]}>
                          <Text style={[styles.label]}>
                            Upload Digital Signature
                          </Text>
                        </View>
                        <CustomButton
                          text="Browse"
                          textstyle={{color: 'white'}}
                          style={{
                            alignSelf: 'center',
                            backgroundColor: '#2B8ADA',
                            borderRadius: 5,
                            padding: 10,
                          }}
                          onPress={() => {}}
                        />
                      </View> */}
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        />
                        {/* <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          width: '95%',
                          height: 60,
                          backgroundColor: '#E8F0FE',
                          marginVertical: 5,
                          borderRadius: 5,
                        }}></View> */}
                      </View>
                      {GenInfoEdit ? (
                        <CustomButton
                          text="Update"
                          textstyle={{color: 'white', alignSelf: 'center'}}
                          onPress={() => {
                            updateGenInfo();
                            //clearKeys();
                          }}
                          style={{
                            backgroundColor: '#2b8ada',
                            borderRadius: 5,
                            padding: 6,
                            paddingHorizontal: 10,
                            flex: 1,
                            alignSelf: 'center',
                            width: '95%',
                            marginVertical: 10,
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}
              {/* Medical Registration Label*/}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.whiteLabelView,
                    showMedReg
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
                      showMedReg
                        ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                        : null,
                    ]}
                    onPress={() => {
                      if (MedInfoEdit) {
                        setMedInfoEdit(false);
                      }
                      setShowMedReg(!showMedReg);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showMedReg ? {color: '#2B8ADA', width: '90%'} : null,
                      ]}>
                      Medical Registration
                    </Text>
                    {
                      MedInfoEdit ? (
                        <Text
                          style={[
                            {
                              alignSelf: 'center',
                              color: '#2B8ADA',
                              padding: 5,
                              textDecorationLine: 'underline',
                            },
                            showMedReg ? null : {color: 'white'},
                          ]}
                          onPress={() => {
                            setMedInfoEdit(false);
                          }}>
                          Cancel
                        </Text>
                      ) : null
                      // <Text
                      //   style={[
                      //     {
                      //       alignSelf: 'center',
                      //       color: '#2B8ADA',
                      //       padding: 5,
                      //       textDecorationLine: 'underline',
                      //     },
                      //     showMedReg ? null : {color: 'white'},
                      //   ]}
                      //   onPress={() => {
                      //     if (showMedReg == true) {
                      //       Alert.alert(
                      //         'You can now edit Medical Registration Details',
                      //       );
                      //       setMedInfoEdit(true);
                      //     }
                      //   }}>
                      //   Edit
                      // </Text>
                    }
                    {MedInfoEdit ? null : (
                      <FAIcon
                        name={showMedReg ? 'chevron-down' : 'chevron-right'}
                        color={showMedReg ? '#2B8ADA' : 'gray'}
                        style={[
                          styles.label,
                          {width: '10%', fontSize: 20},
                        ]}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Medical Registration Body*/}
              {showMedReg ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    <View style={{flexDirection: 'column', marginBottom: 10}}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={[styles.inputLabel, {marginTop: 0}]}>
                            Registration Number
                          </Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              MedInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            editable={MedInfoEdit}
                            placeholderTextColor={'black'}
                            onChangeText={text => setRegNo(text)}
                            value={RegNo}></TextInput>
                        </View>
                        <View style={{flex: 0.45}}>
                          <Text style={[styles.inputLabel, {marginTop: 0}]}>
                            Registration Council
                          </Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              MedInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            editable={MedInfoEdit}
                            placeholderTextColor={'black'}
                            onChangeText={text => setRegCouncil(text)}
                            value={RegCouncil}></TextInput>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 0.45, marginRight: '5%'}}>
                          <Text style={styles.inputLabel}>
                            Reg. Certificate
                          </Text>
                          <View>
                            <TextInput
                              style={[
                                styles.textInput,
                                {backgroundColor: '#d0e0fc'},
                                MedInfoEdit
                                  ? {backgroundColor: '#E8F0FE'}
                                  : null,
                              ]}
                              placeholderTextColor={'black'}
                              value={RegCert}
                              editable={false}></TextInput>
                            <FAIcon
                              name="upload"
                              color={'gray'}
                              size={16}
                              style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                marginRight: '5%',
                                marginBottom: '5%',
                                backgroundColor: '#d0e0fc',
                              }}
                              onPress={() => {}}
                            />
                          </View>
                        </View>
                        <View style={{flex: 0.45}}>
                          <Text style={styles.inputLabel}>Reg. Year</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                              MedInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
                            ]}
                            editable={MedInfoEdit}
                            placeholderTextColor={'black'}
                            keyboardType={'number-pad'}
                            maxLength={4}
                            onChangeText={text => setRegYear(text)}
                            value={RegYear + ''}></TextInput>
                        </View>
                      </View>
                      {MedInfoEdit ? (
                        <CustomButton
                          text="Update"
                          textstyle={{color: 'white', alignSelf: 'center'}}
                          onPress={() => {
                            updateMedReg();
                          }}
                          style={{
                            backgroundColor: '#2b8ada',
                            borderRadius: 5,
                            padding: 6,
                            paddingHorizontal: 10,
                            flex: 1,
                            alignSelf: 'center',
                            width: '95%',
                            marginVertical: 10,
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}
              {/* Education Qualifications & Certificates Label*/}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.whiteLabelView,
                    showEduDet
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
                      showEduDet
                        ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                        : null,
                    ]}
                    onPress={() => {
                      if (EduDetEdit) {
                        setEduDetEdit(false);
                      }
                      setShowEduDet(!showEduDet);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showEduDet ? {color: '#2B8ADA', width: '90%'} : null,
                      ]}>
                      Educational Qualifications & Certificates
                    </Text>
                    {
                      EduDetEdit ? (
                        <Text
                          style={[
                            {
                              alignSelf: 'center',
                              color: '#2B8ADA',
                              padding: 5,
                              textDecorationLine: 'underline',
                            },
                            showEduDet ? null : {color: 'white'},
                          ]}
                          onPress={() => {
                            setEduDetEdit(false);
                          }}>
                          Cancel
                        </Text>
                      ) : null
                      // <Text
                      //   style={[
                      //     {
                      //       alignSelf: 'center',
                      //       color: '#2B8ADA',
                      //       padding: 5,
                      //       textDecorationLine: 'underline',
                      //     },
                      //     showEduDet ? null : {color: 'white'} ,
                      //   ]}
                      //   onPress={() => {
                      //     if (showEduDet == true) {
                      //       Alert.alert('You can now edit Educational Details');
                      //       setEduDetEdit(true);
                      //     }
                      //   }}>
                      //   Edit
                      // </Text>
                    }
                    {EduDetEdit ? null : (
                      <FAIcon
                        name={showEduDet ? 'chevron-down' : 'chevron-right'}
                        color={showEduDet ? '#2B8ADA' : 'gray'}
                        style={[
                          styles.label,
                          {width: '10%', fontSize: 20},
                        ]}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Education Qualifications & Certificates Body*/}
              {showEduDet ? (
                <View style={{flex: 1}}>
                  <View style={styles.whiteBodyView}>
                    {/* View Education */}
                    {Education !== '' ? (
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
                              <Text style={styles.cellHeadingText}>
                                Degree Year
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Speciality
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                University
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 1,
                                paddingVertical: 1,
                              }}>
                              <Text style={styles.cellHeadingText}>
                                Actions
                              </Text>
                            </View>
                          </View>
                        </View>
                        <ViewEducation />
                      </View>
                    ) : null}
                    {/* Add Education */}
                    {/* <View style={{flexDirection: 'row', flex: 1}}>
                      <View>Degree</View>
                      <View>Specialization</View>
                      <View>University</View>
                      <View>Degree Year</View>
                    </View> */}

                    {EduDetEdit ? (
                      <View
                        style={{
                          width: '95%',
                          alignSelf: 'center',
                          marginBottom: 10,
                          padding: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{flex: 0.475}}>
                              <Text style={[styles.inputLabel, {marginTop: 0}]}>
                                Degree
                              </Text>
                              <TextInput
                                style={[
                                  styles.textInput,
                                  {backgroundColor: '#E8F0FE'},
                                ]}
                                onChangeText={text => setDegree(text)}
                                value={Degree}></TextInput>
                            </View>
                            <View style={{flex: 0.475}}>
                              <Text style={[styles.inputLabel, {marginTop: 0}]}>
                                Degree Passing Year
                              </Text>
                              <TextInput
                                style={[
                                  styles.textInput,
                                  {backgroundColor: '#E8F0FE'},
                                ]}
                                onChangeText={text =>
                                  setDegreePassingYear(text)
                                }
                                value={DegreePassingYear}
                                keyboardType={'numeric'}></TextInput>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{flex: 1}}>
                              <Text style={styles.inputLabel}>
                                Specialization
                              </Text>
                              <SelectList
                                labelStyles={{height: 0}}
                                placeholder={' '}
                                setSelected={val => setSpecialization(val)}
                                data={
                                  Education == '' ? data : dataSpecialization
                                }
                                save="value"
                                boxStyles={{
                                  backgroundColor: '#E8F0FE',
                                  borderWidth: 0,
                                }}
                                dropdownStyles={{backgroundColor: 'white'}}
                                dropdownTextStyles={{
                                  color: '#2b8ada',
                                  fontWeight: 'bold',
                                }}
                                badgeStyles={{backgroundColor: '#2b8ada'}}
                              />
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={styles.inputLabel}>University</Text>
                              <TextInput
                                style={[
                                  styles.textInput,
                                  {backgroundColor: '#E8F0FE'},
                                ]}
                                onChangeText={text => setUniversity(text)}
                                value={University}></TextInput>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'column',
                            marginVertical: 5,
                            flex: 1,
                            marginVertical: 10,
                          }}>
                          <CustomButton
                            text="Save/Add More"
                            textstyle={{color: '#2b8ada', fontSize: 12}}
                            style={{
                              borderColor: '#2b8ada',
                              borderWidth: 1,
                              borderRadius: 5,
                              padding: 6,
                              paddingHorizontal: 10,
                              width: 120,
                              right: 0,
                              alignSelf: 'flex-end',
                              marginBottom: 10,
                            }}
                            onPress={() => {
                              if (
                                Degree == '' ||
                                DegreePassingYear == '' ||
                                University == '' ||
                                TotalYear == '' ||
                                TotalMonths == '' ||
                                Specialization == ''
                              )
                                Alert.alert(
                                  'Please fill all details before adding more in Educational Qualification',
                                );
                              else {
                                let totalexp =
                                  parseInt(TotalYear) * 12 +
                                  parseInt(TotalMonths);
                                splArray.push({
                                  key: Specialization,
                                  value: Specialization,
                                });
                                let p = {
                                  degree: Degree,
                                  degreePath: Degree + '.pdf',
                                  passingYear: Number(DegreePassingYear),
                                  specialization: Specialization,
                                  totalExperiencedInMonths: Number(totalexp),
                                  university: University,
                                };
                                Education.push(p);
                                //console.log(Education);
                                setDegree('');
                                setDegreePassingYear('');
                                setSpecialization('');
                                setTotalMonths('');
                                setTotalYear('');
                                setUniversity('');
                              }
                            }}
                          />
                          <CustomButton
                            text={'Update'}
                            textstyle={{color: 'white', fontSize: 12}}
                            style={{
                              backgroundColor: '#2b8ada',
                              borderRadius: 5,
                              padding: 6,
                              paddingHorizontal: 10,
                              flex: 1,
                            }}
                            onPress={() => {
                              //updateEduDet();
                              Alert.alert(
                                'Educational Qualifications Details Updated Successfully!',
                              );
                              setEduDetEdit(false);
                            }}
                          />
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {/* Experience Label*/}
              <View
                style={{
                  width: '100%',
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
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showExpDet ? {color: '#2B8ADA'} : null,
                      ]}>
                      Experience
                    </Text>
                    <FAIcon
                      name={showExpDet ? 'chevron-down' : 'chevron-right'}
                      color={showExpDet ? '#2B8ADA' : 'gray'}
                      style={[
                        styles.label,
                        {width: '10%', fontSize: 20},
                      ]}></FAIcon>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Experience Body*/}
              {showExpDet ? (
                <View style={{flex: 1}}>
                  <View style={styles.whiteBodyView}>
                    {/* {Experience.length > 0 ? (
                      <View>
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
                            <View
                              style={styles.cellHeading}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 10,
                                }}>
                                Practice At
                              </Text>
                            </View>
                            <View
                              style={styles.cellHeading}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 10,
                                }}>
                                Start Date
                              </Text>
                            </View>
                            <View
                              style={styles.cellHeading}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 10,
                                }}>
                                End Date
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 1,
                                paddingVertical: 1,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 10,
                                }}>
                                Experience
                              </Text>
                            </View>
                          </View>
                        </View>
                        <ViewExperienceTabular />
                      </View>
                    ) : null} */}

                    {Experience.length > 0 ? (
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
                              <Text style={styles.cellHeadingText}>
                                Practice At
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Start Date
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                End Date
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Experience
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 1,
                                paddingVertical: 1,
                              }}>
                              <Text style={styles.cellHeadingText}>
                                Actions
                              </Text>
                            </View>
                          </View>
                        </View>
                        <ViewExperienceTabular />
                      </View>
                    ) : null}

                    {/* <View
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      marginBottom: 10,
                      padding: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginBottom: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flex: 1}}>
                          <Text style={styles.inputLabel}>Practice At</Text>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#E8F0FE'},
                            ]}
                            onChangeText={text => setPracticeAt(text)}
                            value={practiceAt}></TextInput>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flex: 0.475}}>
                          <Text style={styles.inputLabel}>Start Date</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              backgroundColor: '#E8F0FE',
                              borderRadius: 10,
                            }}>
                            <Text
                              style={[
                                styles.textInput,
                                {flex: 1},
                              ]}>
                              {dayjs(startExpDate).isValid() ? dayjs(startExpDate).format("YYYY-MM-DD") : "YYYY-MM-DD"}
                            </Text>
                            <FAIcon
                              name="calendar-alt"
                              color={'gray'}
                              size={20}
                              style={{
                                marginHorizontal: 5,
                                position: 'absolute',
                                right: 0,
                              }}
                              onPress={() => {setStartExpDatePickerVisible(true)}}
                            />
                          </View>
                          <DateTimePickerModal
                            isVisible={isStartExpDatePickerVisible}
                            mode="date"
                            date={dayjs(startExpDate).isValid() ? dayjs(startExpDate).toDate() : dayjs().toDate()}
                            maximumDate={dayjs().toDate()}
                            onConfirm={handleStartExpDate}
                            onCancel={() => {setStartExpDatePickerVisible(false)}}
                          />
                        </View>
                        <View style={{flex: 0.475}}>
                          <Text style={styles.inputLabel}>End Date</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              backgroundColor: '#E8F0FE',
                              borderRadius: 10,
                            }}>
                            <Text
                              style={[
                                styles.textInput,
                                {flex: 1},
                              ]}>
                              {dayjs(endExpDate).isValid() ? dayjs(endExpDate).format("YYYY-MM-DD") : "YYYY-MM-DD"}
                            </Text>
                            <FAIcon
                              name="calendar-alt"
                              color={'gray'}
                              size={20}
                              style={{
                                marginHorizontal: 5,
                                position: 'absolute',
                                right: 0,
                              }}
                              onPress={() => {setEndExpDatePickerVisible(true)}}
                            />
                          </View>
                          <DateTimePickerModal
                            isVisible={isEndExpDatePickerVisible}
                            mode="date"
                            date={dayjs(endExpDate).isValid() ? dayjs(endExpDate).toDate() : dayjs().toDate()}
                            maximumDate={dayjs().toDate()}
                            onConfirm={handleEndExpDate}
                            onCancel={() => {setEndExpDatePickerVisible(false)}}
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flex: 0.475, flexDirection: 'column'}}>
                        <Text style={styles.inputLabel}>
                          Total Experience(Year)
                        </Text>
                        <Text style={styles.textInput}>
                          {TotalYear}
                        </Text>
                      </View>
                      <View style={{flex: 0.475, flexDirection: 'column'}}>
                        <Text style={styles.inputLabel}>
                          Total Experience(Month)
                        </Text>
                        <Text style={styles.textInput}>
                          {TotalMonths}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        flex: 1,
                        marginBottom: 10,
                      }}>
                      
                      <CustomButton
                        text="Save"
                        textstyle={{color: 'white', fontSize: 12}}
                        style={{
                          backgroundColor: '#2b8ada',
                          borderRadius: 5,
                          padding: 6,
                          paddingHorizontal: 10,
                          position: 'absolute',
                          right: 0,
                        }}
                        onPress={() => {
                          if (
                            practiceAt == '' ||
                            startExpDate == '' ||
                            endExpDate == ''
                          )
                            Alert.alert(
                              'Please fill all details before adding more in Experience.',
                            );
                          else {
                            // let p = {
                            //   practiceAt: practiceAt,
                            //   startExpDate: startExpDate,
                            //   endExpDate: endExpDate,
                            //   totalExperiencedInMonths: experienceInMonths
                            // };
                            let p = {
                              practiceAt: practiceAt,
                              startDate: startExpDate,
                              endDate: endExpDate,
                              experienceInMonths: experienceInMonths
                            };
                            // Experience.push(p);
                            //console.log(Experience);
                            let arr = [...Experience];
                            arr.push(p);
                            console.log(arr);
                            setExperience(arr);
                            setPracticeAt('');
                            setStartExpDate('');
                            setEndExpDate('');
                            setExperienceInMonths('');
                            setTotalYear('');
                            setTotalMonths('');
                          }
                        }}
                      />
                    </View>
                  </View> */}
                  </View>
                </View>
              ) : null}
              {/* Identification Label*/}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.whiteLabelView,
                    showIdenDet
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
                      showIdenDet
                        ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                        : null,
                    ]}
                    onPress={() => {
                      if (IdenDetEdit) {
                        setIdenDetEdit(false);
                      }
                      setShowIdenDet(!showIdenDet);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showIdenDet ? {color: '#2B8ADA', width: '90%'} : null,
                      ]}>
                      Identification
                    </Text>
                    {
                      IdenDetEdit ? (
                        <Text
                          style={[
                            {
                              alignSelf: 'center',
                              color: '#2B8ADA',
                              padding: 5,
                              textDecorationLine: 'underline',
                            },
                            showIdenDet ? null : {color: 'white'},
                          ]}
                          onPress={() => {
                            setIdenDetEdit(false);
                          }}>
                          Cancel
                        </Text>
                      ) : null
                      // <Text
                      //   style={[
                      //     {
                      //       alignSelf: 'center',
                      //       color: '#2B8ADA',
                      //       padding: 5,
                      //       textDecorationLine: 'underline',
                      //     },
                      //     showIdenDet ? null : {color: 'white'},
                      //   ]}
                      //   onPress={() => {
                      //     if (showIdenDet == true) {
                      //       Alert.alert(
                      //         'You can now edit Identification Details',
                      //       );
                      //       setIdenDetEdit(true);
                      //     }
                      //   }}>
                      //   Edit
                      // </Text>
                    }
                    {IdenDetEdit ? null : (
                      <FAIcon
                        name={showIdenDet ? 'chevron-down' : 'chevron-right'}
                        color={showIdenDet ? '#2B8ADA' : 'gray'}
                        style={[
                          styles.label,
                          {width: '10%', fontSize: 20},
                        ]}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Identification Body*/}
              {showIdenDet ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    {IdentificationDocs != '' ? <ViewIdentifications /> : null}

                    {IdenDetEdit ? (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '95%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'column', flex: 0.45}}>
                            <Text style={[styles.inputLabel, {marginTop: 0}]}>
                              Document Name
                            </Text>
                            <View>
                              <TextInput
                                style={[styles.textInput]}
                                onChangeText={text =>
                                  setidentificationType(text)
                                }
                                value={identificationType}
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'column', flex: 0.45}}>
                            <Text style={[styles.inputLabel, {marginTop: 0}]}>
                              Identification No
                            </Text>
                            <View>
                              <TextInput
                                style={[styles.textInput]}
                                onChangeText={text =>
                                  setidentificationNumber(text)
                                }
                                value={identificationNumber}
                              />
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginVertical: 10,
                            width: '95%',
                            alignSelf: 'center',
                          }}>
                          <CustomButton
                            text={'Save/Add More'}
                            textstyle={{color: '#2b8ada', fontSize: 12}}
                            style={{
                              borderColor: '#2b8ada',
                              borderWidth: 1,
                              borderRadius: 5,
                              padding: 6,
                              paddingHorizontal: 10,
                              width: 120,
                              right: 0,
                              alignSelf: 'flex-end',
                              marginBottom: 10,
                            }}
                            onPress={() => {
                              if (
                                identificationNumber != '' &&
                                identificationType != ''
                              ) {
                                let p = {
                                  identificationNumber: identificationNumber,

                                  identificationType: identificationType,
                                  identificationPath:
                                    'aws/s3/Docs/' +
                                    identificationNumber +
                                    '.pdf',
                                };
                                IdentificationDocs.push(p);
                                setidentificationNumber('');
                                setidentificationType('');
                                //console.log(IdentificationDocs);
                              }
                            }}
                          />
                          {IdenDetEdit ? (
                            <CustomButton
                              text={'Update'}
                              textstyle={{color: 'white', fontSize: 12}}
                              style={{
                                backgroundColor: '#2b8ada',
                                borderRadius: 5,
                                padding: 6,
                                paddingHorizontal: 10,
                                flex: 1,
                              }}
                              onPress={() => {
                                //updateIden();
                                setIdenDetEdit(false);
                                Alert.alert(
                                  'Identification Details Saved Successfully',
                                );
                              }}
                            />
                          ) : null}
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}

              {/* General Configuration Label*/}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.whiteLabelView,
                    showGenConfig
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
                      showGenConfig
                        ? {
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#707070',
                          }
                        : null,
                    ]}
                    onPress={() => {
                      if (GenConfigEdit) {
                        setGenConfigEdit(false);
                      }
                      setShowGenConfig(!showGenConfig);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '80%'},
                        showGenConfig ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      General Configuration
                    </Text>
                    {GenConfigEdit ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          showGenConfig ? null : {color: 'white'},
                        ]}
                        onPress={() => {
                          setGenConfigEdit(false);
                        }}>
                        Cancel
                      </Text>
                    ) : (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          showGenConfig ? null : {color: 'white'},
                        ]}
                        onPress={() => {
                          if (showGenConfig == true) {
                            Alert.alert(
                              'You can now edit General Configuration',
                            );
                            setGenConfigEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    )}
                    {GenConfigEdit ? null : (
                      <FAIcon
                        name={showGenConfig ? 'chevron-down' : 'chevron-right'}
                        color={showGenConfig ? '#2B8ADA' : 'gray'}
                        style={[
                          styles.label,
                          {width: '10%', fontSize: 20},
                        ]}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* General Configuration Body*/}
              {showGenConfig ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginBottom: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                          width: '95%',
                          marginBottom: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            flex: 0.45,
                            marginRight: '5%',
                          }}>
                          <Text style={[styles.inputLabel, {marginTop: 0}]}>
                            Show Mobile Number
                          </Text>
                          {GenConfigEdit ? (
                            <SelectList
                              boxStyles={{
                                backgroundColor: '#e8f0fe',
                                borderWidth: 0,
                              }}
                              dropdownItemStyles={{backgroundColor: '#e8f0fe'}}
                              setSelected={setshowMobNo}
                              data={dataShowMobNo}
                              placeholder={showMobNo}
                            />
                          ) : (
                            <Text
                              style={[
                                styles.inputLabel,
                                {
                                  marginTop: 0,
                                  backgroundColor: '#d0e0fc',
                                  padding: 10,
                                  borderRadius: 10,
                                },
                              ]}>
                              {showMobNo}
                            </Text>
                          )}
                        </View>
                        <View style={{flexDirection: 'column', flex: 0.45}}>
                          <Text style={[styles.inputLabel, {marginTop: 0}]}>
                            Follow-Up (in Days)
                          </Text>

                          {GenConfigEdit ? (
                            <SelectList
                              boxStyles={{
                                backgroundColor: '#e8f0fe',
                                borderWidth: 0,
                              }}
                              dropdownItemStyles={{backgroundColor: '#e8f0fe'}}
                              setSelected={setshowFollowUp}
                              data={dataFollowUp}
                              placeholder={
                                DoctorConfiguration.followUpDuration != ''
                                  ? DoctorConfiguration.followUpDuration
                                  : ''
                              }
                            />
                          ) : (
                            <Text
                              style={[
                                styles.inputLabel,
                                {
                                  marginTop: 0,
                                  backgroundColor: '#d0e0fc',
                                  padding: 10,
                                  borderRadius: 10,
                                },
                              ]}>
                              {showFollowUp}
                            </Text>
                          )}
                        </View>
                      </View>
                      {GenConfigEdit ? (
                        <CustomButton
                          text="Update"
                          textstyle={{color: 'white', alignSelf: 'center'}}
                          onPress={() => {
                            updateGenConfig();
                          }}
                          style={{
                            backgroundColor: '#2b8ada',
                            borderRadius: 5,
                            padding: 6,
                            paddingHorizontal: 10,
                            flex: 1,
                            alignSelf: 'center',
                            width: '95%',
                            marginVertical: 10,
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}

              {/* Consultation Fees Label*/}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.whiteLabelView,
                    showConsultFees
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
                      showConsultFees
                        ? {
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#707070',
                          }
                        : null,
                    ]}
                    onPress={() => {
                      if (ConsultFeesEdit) {
                        setConsultFeesEdit(false);
                      }
                      setShowConsultFees(!showConsultFees);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '80%'},
                        showConsultFees
                          ? {color: '#2B8ADA', width: '80%'}
                          : null,
                      ]}>
                      Consultation Fees
                    </Text>
                    {ConsultFeesEdit ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          showConsultFees ? null : {color: 'white'},
                        ]}
                        onPress={() => {
                          setConsultFeesEdit(false);
                        }}>
                        Cancel
                      </Text>
                    ) : (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          showConsultFees ? null : {color: 'white'},
                        ]}
                        onPress={() => {
                          if (showConsultFees == true) {
                            Alert.alert('You can now edit Fees Configuration');
                            setConsultFeesEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    )}
                    {ConsultFeesEdit ? null : (
                      <FAIcon
                        name={
                          showConsultFees ? 'chevron-down' : 'chevron-right'
                        }
                        color={showConsultFees ? '#2B8ADA' : 'gray'}
                        style={[
                          styles.label,
                          {width: '10%', fontSize: 20},
                        ]}></FAIcon>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Consultation Fees Body*/}
              {showConsultFees ? (
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          flex: 0.65,
                          marginRight: '5%',
                        }}>
                        <Text
                          style={[
                            styles.textInput,
                            {fontWeight: 'bold', backgroundColor: '#d0e0fc'},
                          ]}>
                          Physical Consultation Fees
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column', flex: 0.25}}>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#d0e0fc'},
                          ]}
                          maxLength={5}
                          keyboardType={'number-pad'}
                          onChangeText={text =>
                            setphysicalConsulationFees(text)
                          }
                          value={physicalConsulationFees + ''}
                          editable={ConsultFeesEdit}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          flex: 0.65,
                          marginRight: '5%',
                        }}>
                        <Text
                          style={[
                            styles.textInput,
                            {fontWeight: 'bold', backgroundColor: '#d0e0fc'},
                          ]}>
                          E-Consultation Fees
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column', flex: 0.25}}>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#d0e0fc'},
                          ]}
                          maxLength={5}
                          keyboardType={'number-pad'}
                          onChangeText={text => seteConsulationFees(text)}
                          value={eConsulationFees + ''}
                          editable={ConsultFeesEdit}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          flex: 0.65,
                          marginRight: '5%',
                        }}>
                        <Text
                          style={[
                            styles.textInput,
                            {fontWeight: 'bold', backgroundColor: '#d0e0fc'},
                          ]}>
                          Follow-Up Fees
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column', flex: 0.25}}>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#d0e0fc'},
                          ]}
                          keyboardType={'number-pad'}
                          maxLength={5}
                          onChangeText={text => setfollowUpFees(text)}
                          value={followUpFees + ''}
                          editable={ConsultFeesEdit}
                        />
                      </View>
                    </View>
                    {ConsultFeesEdit ? (
                      <CustomButton
                        text="Update"
                        textstyle={{color: 'white', alignSelf: 'center'}}
                        onPress={() => {
                          updatefees();
                        }}
                        style={{
                          backgroundColor: '#2b8ada',
                          borderRadius: 5,
                          padding: 6,
                          paddingHorizontal: 10,
                          flex: 1,
                          alignSelf: 'center',
                          width: '95%',
                          marginVertical: 10,
                        }}
                      />
                    ) : null}
                  </View>
                </View>
              ) : null}
              {/* Buttons */}
              <CustomButton
                text={'Done'}
                textstyle={{color: 'white', fontSize: 20}}
                style={{
                  flex: 1,
                  backgroundColor: '#2b8ada',
                  padding: 6,
                  marginVertical: 10,
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>

        {isLoading && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 50,
                width: 250,
                height: 250,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={waiting}
                style={{
                  alignSelf: 'center',
                  width: 150,
                  height: 150,
                  borderRadius: 150,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#2B8ADA',
                  fontSize: 20,
                  fontWeight: 'bold',
                  width: '100%',
                  padding: 10,
                }}>
                Please Wait...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B8ADA',
  },
  textInput: {
    flex: 0.45,
    padding: 5,
    color: 'black',
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
    fontSize: 14,
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
  picker: {
    width: '90%',
    fontSize: 12,
    backgroundColor: '#E8F0FE',
  },
  heading: {
    color: '#2b8ada',
    fontWeight: 'bold',
  },
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    padding: 5,
    borderRadius: 15,
    marginVertical: 5,
    width: '100%',
  },

  bubbleHeading: {
    color: 'black',
    padding: 5,
    width: '90%',
    fontSize: 12,
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
  bubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    padding: 5,
    borderRadius: 15,
    marginVertical: 5,
    width: '100%',
  },
  bubbleTitle: {
    color: 'black',
    padding: 5,
    width: '90%',
    textAlign: 'center',
  },
  bubbleActive: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2b8ada',
    padding: 5,
    borderRadius: 15,
    marginVertical: 5,
    width: '100%',
  },
  bubbleTitleActive: {
    color: '#fff',
    padding: 5,
    width: '90%',
    textAlign: 'center',
  },
  slotBackground: {
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    borderWidth: 1,
    borderColor: '#2b8ada',
    padding: 2,
    borderRadius: 10,
    margin: 2,
    width: 100,
  },
  slotTitle: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    width: 100,
  },
  slotBackgroundActive: {
    alignSelf: 'center',
    backgroundColor: '#2b8ada',
    borderWidth: 1,
    borderColor: '#2b8ada',
    padding: 2,
    borderRadius: 10,
    margin: 2,
    width: 100,
  },
  slotTitleActive: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    width: 100,
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
    fontSize: 10,
  },
});

export default EditProfile;
