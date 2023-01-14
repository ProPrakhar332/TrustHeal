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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

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
import {Switch} from 'react-native-elements';

const dataIdenDocs = [
  {key: 'Aadhar', value: 'Aadhar'},
  {key: 'Driving License', value: 'Driving License'},
  {key: 'PAN', value: 'PAN'},
  {key: 'Passport No.', value: 'Passport No.'},
];

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
const dataSpecialization = [
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

const dataYear = [];

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
  const [pfp, setpfp] = useState(null);
  const [pfpuri, setpfpuri] = useState(null);
  const [newpfp, setnewpfp] = useState(null);
  const [newpfpuri, setnewpfpuri] = useState(null);
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
  const [EduElementModal, setEduElementModal] = useState(false);
  const [editEduDet, seteditEduDet] = useState(false);

  const [EduDetEdit, setEduDetEdit] = useState(false);
  //const [dataSpecialization, setdataSpecialization] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Degree, setDegree] = useState('');
  const [DegreePassingYear, setDegreePassingYear] = useState('');
  const [Specialization, setSpecialization] = useState('');
  const [University, setUniversity] = useState('');
  const [doctorEducationPkId, setdoctorEducationPkId] = useState(0);

  //Experience
  const [showExpDet, setShowExpDet] = useState(false);
  const [ExpDetEdit, setExpDetEdit] = useState(false);
  const [ExpElementModal, setExpElementModal] = useState(false);
  const [editExp, seteditExp] = useState(false);
  const [Experience, setExperience] = useState([]);
  const [ExperienceUpdate, setExperienceUpdate] = useState([]);
  const [practiceAt, setPracticeAt] = useState('');
  const [startExpDate, setStartExpDate] = useState('');
  const [endExpDate, setEndExpDate] = useState('');
  const [experienceInMonths, setExperienceInMonths] = useState('');
  const [TotalYear, setTotalYear] = useState('');
  const [TotalMonths, setTotalMonths] = useState('');
  const [experienceId, setexperienceId] = useState(0);
  //Identification
  const [showIdenDet, setShowIdenDet] = useState(false);
  const [IdenDetEdit, setIdenDetEdit] = useState(false);
  const [Aadhar, setAadhar] = useState('');
  const [IdentificationDocs, setIdentificationDocs] = useState([]);
  const [IdentificationDocsUpdate, setIdentificationDocsUpdate] = useState([]);
  const [identificationNumber, setidentificationNumber] = useState('');
  const [identificationType, setidentificationType] = useState('');
  const [doctorIdentificationPkId, setdoctorIdentificationPkId] = useState(0);
  const [IdenElementModal, setIdenElementModal] = useState(false);
  const [editIden, seteditIden] = useState(false);

  //General Configuration
  const [showGenConfig, setShowGenConfig] = useState(false);
  const [GenConfigEdit, setGenConfigEdit] = useState(false);
  const [DoctorConfiguration, setDoctorConfiguration] = useState(null);
  const [showMobNo, setshowMobNo] = useState(false);
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
      setTitle(
        x.doctorName == undefined
          ? x.fullName.substring(0, x.fullName.indexOf(' '))
          : x.doctorName.substring(0, x.doctorName.indexOf(' ')),
      );
      setName(
        x.doctorName != undefined
          ? x.doctorName.substring(x.doctorName.indexOf(' ') + 1)
          : x.fullName.substring(x.fullName.indexOf(' ') + 1),
      );
      setEmail(x.email);
      setGender(x.gender);
      setCity(x.city);
      //console.log(x.age);
      setshowMobNo(x.contactVisibility);
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

  const setDateData = () => {
    var d = new Date().getFullYear();
    //console.log(dob.substring(0, 4));
    var i = Number(dob.substring(0, 4));
    if (i == 0) i = 1940;
    else i += 17;
    for (; i <= d; ++i) {
      dataYear.push({key: i + '', value: i + ''});
    }
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
          if (response.status == 200 || response.status == 201) {
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
            setshowFollowUp(response.data.followUpDuration);
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
    mainOnj.age = Number(age);
    mainOnj.city = city;
    mainOnj.contactVisibility = showMobNo;
    mainOnj.dob = dob;
    mainOnj.doctorId = doctorId;
    mainOnj.doctorName = title + ' ' + name;
    mainOnj.email = email;
    mainOnj.mobileNumber = doctorObj.mobileNumber;
    mainOnj.pincode = pinCode;
    console.log(
      'General Info Update---------\n' + JSON.stringify(mainOnj, null, 1),
    );

    axios
      .post(apiConfig.baseUrl + '/doctor/generalinfo/update', mainOnj)
      .then(function (response) {
        if (response.status == 200) {
          Alert.alert(
            'All changes made in Genreal Information have been updated.',
          );
          setGenInfoEdit(false);
        } else Alert.alert('Could not Update Details. Please try again later.');
      });
  };

  const updateContactVisibility = async () => {
    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/contact/visibility/update?contactVisibility=' +
          showMobNo +
          '&doctorId=' +
          doctorId +
          '&email=' +
          email,
      )
      .then(function (response) {
        if (response.status == 200)
          Alert.alert(
            'Contact Visbility',
            'Your Contact Visibility is now turned ' +
              (!showMobNo ? 'ON' : 'OFF'),
          );
      })
      .catch(function (error) {
        console.log('=====Error in updating contact visibility=====');
        console.log(error);
      });
  };

  const updateMedReg = async () => {
    let p = {
      certificatePath: 'aws/s3/' + doctorId + '/cerificates',
      doctorId: doctorId,
      doctorMedicalRegistrationPkId:
        doctorMedicalRegistration.doctorMedicalRegistrationPkId,
      registrationCouncil: RegCouncil,
      registrationNo: RegNo,
      registrationYear: Number(RegYear),
    };
    let mj = [];
    mj.push(p);

    console.log('Medical Regd Update---------\n' + mj);
    axios
      .post(apiConfig.baseUrl + '/doctor/medicalregi/save/or/update', mj)
      .then(function (response) {
        if (response.status == 200) {
          Alert.alert(
            'Medical Registration details have been updated successfully!',
          );
          setMedInfoEdit(false);
        } else Alert.alert('Could not update details. Please try again later.');
      });
  };

  const updateEduDet = async item => {
    let amp = [];
    amp.push(item);
    axios
      .post(apiConfig.baseUrl + '/doctor/education/save/or/update', amp)
      .then(function (response) {
        if (response.status == 200) {
          setisLoading(false);
          Alert.alert(
            'Educational Qualifications Details Updated Successfully!',
          );
          setShowEduDet(false);
        } else {
          setisLoading(false);
          Alert.alert('Could not Update Details. Please try again later.');
        }
      });
  };

  const updateExpDet = async item => {
    let amp = [];
    amp.push(item);
    axios
      .post(apiConfig.baseUrl + '/doctor/experience/save/or/update', amp)
      .then(function (response) {
        if (response.status == 200) {
          setisLoading(false);
          Alert.alert('Experience Details Updated Successfully!');
        } else {
          setisLoading(false);
          Alert.alert('Could not Update Details. Please try again later.');
        }
      });
  };

  const updateIden = async item => {
    let amp = [];
    amp.push(item);
    axios
      .post(apiConfig.baseUrl + '/doctor/identity/save/or/update', amp)
      .then(function (response) {
        if (response.status == 200) {
          setisLoading(false);
          setIdenDetEdit(false);
          Alert.alert('Identification Details Updated Successfully!');
        } else {
          setisLoading(false);
          Alert.alert('Could not Update Details. Please try again later.');
        }
      });
  };

  // const updateGenConfig = async () => {
  //   let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));

  //   console.log('General Config Update---------\n');
  //   var flag = 1;
  //   axios
  //     .post(
  //       apiConfig.baseUrl +
  //         '/doctor/contact/visibility/update?contactVisibility=' +
  //         '&doctorId=' +
  //         doctorId,
  //     )
  //     .then(function (response) {
  //       if (response.status == 200) {
  //         // x.doctorConfigurationDTO.followUpDuration = showFollowUp;
  //         // x.doctorConfigurationDTO.contactVisibility =
  //         //   showMobNo == 'Yes' ? true : false;
  //         // AsyncStorage.setItem('UserDoctorProfile', JSON.stringify(x));
  //         flag = 1;
  //         //setGenConfigEdit(false);
  //       } else flag = 0;
  //     });
  //   let doctorFees = new Object();
  //   doctorFees.doctorId = doctorId;
  //   doctorFees.followUpDuration = followUpDuration;
  //   axios
  //     .post(apiConfig.baseUrl + '/doctor/fees/update', doctorFees)
  //     .then(function (response) {
  //       if (response.status == 200) {
  //         flag = 1;
  //       } else flag = 0;
  //     });
  //   if (flag == 1)
  //     Alert.alert('All changes made in General Config have been updated');
  //   else Alert.alert('Could not Update Details. Please try again later.');
  // };

  //updating Consultation Fees Details(completed)
  const updatefees = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorFees = new Object();
    doctorFees.feesId = DoctorFees.doctorConsulationFeesPkId;
    doctorFees.doctorId = doctorId;
    doctorFees.physicalConsulationFees = Number(physicalConsulationFees);
    doctorFees.econsulationFees = Number(eConsulationFees);
    doctorFees.followUpFees = Number(followUpFees);
    doctorFees.followUpDuration = Number(showFollowUp);

    console.log('Fees Update---------\n' + JSON.stringify(doctorFees, null, 1));
    axios
      .post(apiConfig.baseUrl + '/doctor/fees/update', doctorFees)
      .then(function (response) {
        if (response.status == 200) {
          setisLoading(false);
          Alert.alert('All changes made in Fees Config have been updated');
          setConsultFeesEdit(false);
        } else {
          setisLoading(false);
          Alert.alert('Could not Update Details. Please try again later.');
        }
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
            width: '95%',
            alignSelf: 'center',
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
              <FAIcon
                name="file-pdf"
                size={15}
                color={'#2b8ada'}
                style={{marginVertical: 3}}
              />
            </View>
            {IdenDetEdit ? (
              <View
                style={[
                  styles.cellStyle,
                  {flexDirection: 'row', alignContent: 'space-around'},
                ]}>
                <TouchableOpacity
                  style={{flexDirection: 'column', flex: 0.45}}
                  onPress={() => {
                    setidentificationType(
                      IdentificationDocs.identificationType,
                    );
                    setidentificationNumber(
                      IdentificationDocs.identificationNumber,
                    );
                    setdoctorIdentificationPkId(
                      IdentificationDocs.doctorIdentificationPkId,
                    );
                    seteditIden(true);
                    setIdenElementModal(true);
                  }}>
                  <FAIcon
                    name="edit"
                    size={13}
                    color={'#2b8ada'}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                {/* <View style={{flexDirection: 'column', flex: 0.45}}>
                  <FAIcon
                    name="trash"
                    size={13}
                    color={'red'}
                    style={{alignSelf: 'center'}}
                    onPress={() => removeIdenHandler(index)}
                  />
                </View> */}
              </View>
            ) : null}
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
            width: '95%',
            alignSelf: 'center',
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
              <Text style={styles.cellText}>{Education.degree}</Text>
            </View>
            {/* Passing Year */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{Education.passingYear}</Text>
            </View>
            {/* Specialization */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{Education.specialization}</Text>
            </View>
            {/* University */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{Education.university}</Text>
            </View>
            {EduDetEdit ? (
              <View
                style={[
                  styles.cellStyle,
                  {flexDirection: 'row', alignContent: 'space-around'},
                ]}>
                <TouchableOpacity
                  style={{flexDirection: 'column', flex: 0.45}}
                  onPress={() => {
                    setDateData();
                    setDegree(Education.degree);
                    setDegreePassingYear(Education.passingYear);
                    setSpecialization(Education.specialization);
                    setUniversity(Education.university);
                    setdoctorEducationPkId(Education.doctorEducationPkId);
                    setEduElementModal(true);
                    seteditEduDet(true);
                  }}>
                  <FAIcon
                    name="edit"
                    size={13}
                    color={'#2b8ada'}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                {/* <View style={{flexDirection: 'column', flex: 0.45}}>
                  <FAIcon
                    name="trash"
                    size={13}
                    color={'red'}
                    style={{alignSelf: 'center'}}
                  />
                </View> */}
              </View>
            ) : null}
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
            width: '95%',
            alignSelf: 'center',
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
              <Text style={styles.cellText}>{Exp.practiceAt}</Text>
            </View>
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>
                {dayjs(Exp.startDate).isValid()
                  ? dayjs(Exp.startDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            {/* End Date */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>
                {dayjs(Exp.endDate).isValid()
                  ? dayjs(Exp.endDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            {/* Total Experience */}
            <View style={styles.cellStyle}>
              {Math.floor(Exp.experienceInMonths / 12) > 0 ? (
                <Text style={styles.cellText}>
                  {Math.floor(Exp.experienceInMonths / 12) + ' year(s)'}
                </Text>
              ) : null}

              {parseInt(Exp.experienceInMonths % 12) != 0 ? (
                <Text style={styles.cellText}>
                  {parseInt(Exp.experienceInMonths % 12) + ' month(s)'}
                </Text>
              ) : null}
            </View>
            {ExpDetEdit ? (
              <View
                style={[
                  styles.cellStyle,
                  {flexDirection: 'row', alignContent: 'space-around'},
                ]}>
                <View style={{flexDirection: 'column', flex: 0.45}}>
                  <FAIcon
                    name="edit"
                    size={13}
                    color={'#2b8ada'}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                      setPracticeAt(Exp.practiceAt);
                      setStartExpDate(Exp.startDate);
                      setEndExpDate(Exp.endDate);
                      setexperienceId(Exp.experienceId);
                      seteditExp(true);
                      setExpElementModal(true);
                    }}
                  />
                </View>
                {/* <View style={{flexDirection: 'column', flex: 0.45}}>
                  <FAIcon
                    name="trash"
                    size={13}
                    color={'red'}
                    style={{alignSelf: 'center'}}
                  />
                </View> */}
              </View>
            ) : null}
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
  const chooseProfileImage = async () => {
    Alert.alert(
      'Upload Profile Picture',
      'Select option for uploading profile picture',
      [
        {
          text: 'Open Library',
          onPress: () => {
            launchImageLibrary({mediaType: 'photo'}, response => {
              console.log(response);
              if (response.didCancel) console.log('Cancel');
              else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
              } else {
                if (response.assets[0].fileSize <= 20484)
                  setpfpuri(response.assets[0].uri);
                else
                  Alert.alert(
                    'Max Size',
                    'The file exceeds the maximum limit of 2MB.',
                  );
              }
            });
          },
        },
        {
          text: 'Open Camera',
          onPress: () => {
            requestCameraPermission();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await launchcamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchcamera = async () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', saveToPhotos: true},
      response => {
        console.log(response);
        if (response.didCancel) console.log('Cancel');
        else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets[0].fileSize <= 20484)
            setpfpuri(response.assets[0].uri);
          else
            Alert.alert(
              'Max Size',
              'The file exceeds the maximum limit of 2MB.',
            );
        }
      },
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
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  source={pfpuri == null ? doctor : {uri: pfpuri}}></Image>
                <TouchableOpacity onPress={chooseProfileImage}>
                  <FAIcon
                    name="camera"
                    size={20}
                    color={'white'}
                    style={{
                      top: -25,
                      right: -30,
                      padding: 10,
                      backgroundColor: 'gray',
                      borderRadius: 100,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
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
                      if (!showGenInfo) {
                        setShowGenInfo(!showGenInfo);
                      } else {
                        setShowGenInfo(!showGenInfo);
                      }
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showGenInfo ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      General Information
                    </Text>
                    {showGenInfo ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          GenInfoEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (GenInfoEdit == false) {
                            Alert.alert(
                              'You can now edit General Information Field',
                            );
                            setGenInfoEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}
                    <FAIcon
                      name={showGenInfo ? 'chevron-down' : 'chevron-right'}
                      style={[styles.label, {width: '10%', fontSize: 20}]}
                      color={showGenInfo ? '#2B8ADA' : 'gray'}></FAIcon>
                  </TouchableOpacity>
                </View>
              </View>
              {/* General Info Body*/}
              {showGenInfo ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    <View style={{flexDirection: 'column', marginVertical: 10}}>
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
                          {/* {GenInfoEdit ? (
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
                          )} */}
                          <Text
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc', padding: 10},
                            ]}>
                            {gender}
                          </Text>
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
                          flexDirection: 'row',
                          alignSelf: 'center',
                          width: '90%',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: !GenInfoEdit ? 'column' : 'row',
                            flex: 1,
                            alignSelf: 'center',
                            // borderColor: 'gray',
                            // borderWidth: 1,
                            justifyContent: 'space-between',

                            padding: 5,
                          }}>
                          <Text style={[styles.inputLabel, {marginTop: 0}]}>
                            Contact Visibility
                          </Text>
                          {GenInfoEdit ? (
                            <Switch
                              trackColor={{false: '#767577', true: '#81b0ff'}}
                              thumbColor={showMobNo ? '#81b0ff' : '#f4f3f4'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={() => {
                                setshowMobNo(!showMobNo);
                                updateContactVisibility();
                              }}
                              value={showMobNo}
                            />
                          ) : (
                            <Text
                              style={[
                                styles.textInput,
                                {backgroundColor: '#d0e0fc'},
                                GenInfoEdit
                                  ? {backgroundColor: '#E8F0FE'}
                                  : null,
                              ]}>
                              {showMobNo ? 'Yes' : 'No'}
                            </Text>
                          )}
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
                          display="spinner"
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
                        <View style={styles.ButtonView}>
                          <CustomButton
                            text="Done"
                            textstyle={styles.ButtonText}
                            onPress={() => {
                              //setGenInfoEdit(false);
                              updateGenInfo();
                              //clearKeys();
                            }}
                            style={styles.ButtonUpdate}
                          />
                          <CustomButton
                            text="Cancel"
                            textstyle={styles.ButtonTextCancel}
                            onPress={() => {
                              setGenInfoEdit(false);
                              //clearKeys();
                            }}
                            style={styles.ButtonCancel}
                          />
                        </View>
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
                      if (!showMedReg) {
                        setShowMedReg(!showMedReg);
                      } else {
                        setShowMedReg(!showMedReg);
                      }
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showMedReg ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      Medical Registration
                    </Text>
                    {showMedReg ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          MedInfoEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (MedInfoEdit == false) {
                            Alert.alert(
                              'You can now edit Medical Registration Details',
                            );
                            setMedInfoEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}
                    <FAIcon
                      name={showMedReg ? 'chevron-down' : 'chevron-right'}
                      color={showMedReg ? '#2B8ADA' : 'gray'}
                      style={[
                        styles.label,
                        {width: '10%', fontSize: 20},
                      ]}></FAIcon>
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
                            {MedInfoEdit ? (
                              <FAIcon
                                name="upload"
                                color={'gray'}
                                size={16}
                                style={[
                                  {
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    marginRight: '5%',
                                    marginBottom: '5%',
                                    backgroundColor: '#d0e0fc',
                                  },
                                  {backgroundColor: '#d0e0fc'},
                                  MedInfoEdit
                                    ? {backgroundColor: '#E8F0FE'}
                                    : null,
                                ]}
                                onPress={() => {}}
                              />
                            ) : null}
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
                        <View style={styles.ButtonView}>
                          <CustomButton
                            text="Done"
                            textstyle={styles.ButtonText}
                            onPress={() => {
                              updateMedReg();
                              //setMedInfoEdit(false);
                            }}
                            style={styles.ButtonUpdate}
                          />
                          <CustomButton
                            text="Cancel"
                            textstyle={styles.ButtonTextCancel}
                            onPress={() => {
                              setMedInfoEdit(false);
                            }}
                            style={styles.ButtonCancel}
                          />
                        </View>
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
                      if (!showEduDet) {
                        setShowEduDet(!showEduDet);
                      } else setShowEduDet(!showEduDet);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showEduDet ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      Educational Qualifications & Certificates
                    </Text>
                    {showEduDet ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          EduDetEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (EduDetEdit == false) {
                            Alert.alert('You can now edit Education Details');
                            setEduDetEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}

                    <FAIcon
                      name={showEduDet ? 'chevron-down' : 'chevron-right'}
                      color={showEduDet ? '#2B8ADA' : 'gray'}
                      style={[
                        styles.label,
                        {width: '10%', fontSize: 20},
                      ]}></FAIcon>
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
                            width: '95%',
                            alignSelf: 'center',
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
                            {EduDetEdit ? (
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
                            ) : null}
                          </View>
                        </View>
                        <ViewEducation />
                        {EduDetEdit ? (
                          <View style={{flex: 1}}>
                            <CustomButton
                              text={'+ Add More'}
                              textstyle={{color: 'white', fontSize: 10}}
                              style={{
                                alignSelf: 'flex-end',
                                width: 80,
                                backgroundColor: '#2b8ada',
                                borderRadius: 5,
                                padding: 3,
                                paddingHorizontal: 10,
                                marginTop: 10,
                              }}
                              onPress={() => {
                                setDateData();
                                setEduElementModal(true);
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    ) : null}

                    {EduDetEdit ? (
                      <View style={styles.ButtonView}>
                        <CustomButton
                          text={'Done'}
                          textstyle={styles.ButtonText}
                          style={styles.ButtonUpdate}
                          onPress={() => {
                            updateEduDet();

                            //setEduDetEdit(false);
                          }}
                        />
                        <CustomButton
                          text={'Cancel'}
                          textstyle={styles.ButtonTextCancel}
                          style={styles.ButtonCancel}
                          onPress={() => setEduDetEdit(false)}
                        />
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
                      if (!showExpDet) {
                        setShowExpDet(!showExpDet);
                      } else setShowExpDet(!showExpDet);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showExpDet ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      Experience
                    </Text>
                    {showExpDet ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          ExpDetEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (ExpDetEdit == false) {
                            Alert.alert('You can now edit Experience Details');
                            setExpDetEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}
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
                    {Experience.length > 0 ? (
                      <View>
                        {/* Heading */}
                        <View
                          style={{
                            width: '95%',
                            alignSelf: 'center',
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
                            {ExpDetEdit ? (
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
                            ) : null}
                          </View>
                        </View>
                        <ViewExperienceTabular />
                        {ExpDetEdit ? (
                          <View style={{flex: 1}}>
                            <CustomButton
                              text={'+ Add More'}
                              textstyle={{color: 'white', fontSize: 10}}
                              style={{
                                alignSelf: 'flex-end',
                                width: 80,
                                backgroundColor: '#2b8ada',
                                borderRadius: 5,
                                padding: 3,
                                paddingHorizontal: 10,
                                marginTop: 10,
                              }}
                              onPress={() => {
                                seteditExp(false);
                                setExpElementModal(true);
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                    {ExpDetEdit ? (
                      <View style={styles.ButtonView}>
                        <CustomButton
                          text={'Done'}
                          textstyle={styles.ButtonText}
                          style={styles.ButtonUpdate}
                          onPress={() => {
                            updateExpDet();
                            // Alert.alert(
                            //   'Experience Details Updated Successfully!',
                            // );
                            //setExpDetEdit(false);
                          }}
                        />
                        <CustomButton
                          text={'Cancel'}
                          textstyle={styles.ButtonTextCancel}
                          style={styles.ButtonCancel}
                          onPress={() => setExpDetEdit(false)}
                        />
                      </View>
                    ) : null}
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
                      if (!showIdenDet) {
                        setShowIdenDet(!showIdenDet);
                      } else setShowIdenDet(!showIdenDet);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showIdenDet ? {color: '#2B8ADA', width: '80%'} : null,
                      ]}>
                      Identification
                    </Text>
                    {showIdenDet ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          IdenDetEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (showIdenDet == true) {
                            Alert.alert(
                              'You can now edit Identification Details',
                            );
                            setIdenDetEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}
                    <FAIcon
                      name={showIdenDet ? 'chevron-down' : 'chevron-right'}
                      color={showIdenDet ? '#2B8ADA' : 'gray'}
                      style={[
                        styles.label,
                        {width: '10%', fontSize: 20},
                      ]}></FAIcon>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Identification Body*/}
              {showIdenDet ? (
                <View>
                  <View style={styles.whiteBodyView}>
                    {IdentificationDocs != '' ? (
                      <View>
                        <View
                          style={{
                            width: '95%',
                            alignSelf: 'center',
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
                              <Text style={styles.cellHeadingText}>ID No.</Text>
                            </View>

                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>File</Text>
                            </View>
                            {IdenDetEdit ? (
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
                            ) : null}
                          </View>
                        </View>
                        <ViewIdentificationsTabular />
                        {IdenDetEdit ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignSelf: 'flex-end',
                            }}>
                            <CustomButton
                              text={'+ Add More'}
                              textstyle={{color: 'white', fontSize: 10}}
                              style={{
                                alignSelf: 'flex-end',
                                width: 80,
                                backgroundColor: '#2b8ada',
                                borderColor: '#2b8ada',
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 3,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                marginRight: 5,
                              }}
                              onPress={() => {
                                seteditIden(false);
                                setIdenElementModal(true);
                              }}
                            />
                            <CustomButton
                              text={'Cancel'}
                              textstyle={{color: '#2b8ada', fontSize: 10}}
                              style={{
                                alignSelf: 'flex-end',
                                width: 80,
                                borderColor: '#2b8ada',
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 3,
                                paddingHorizontal: 10,
                                marginTop: 10,
                              }}
                              onPress={() => setIdenDetEdit(false)}
                            />
                          </View>
                        ) : null}
                      </View>
                    ) : null}
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
                      setShowConsultFees(!showConsultFees);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {width: '90%'},
                        showConsultFees
                          ? {color: '#2B8ADA', width: '80%'}
                          : null,
                      ]}>
                      Consultation Fees
                    </Text>
                    {showConsultFees ? (
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: '#2B8ADA',
                            padding: 5,
                            textDecorationLine: 'underline',
                          },
                          ConsultFeesEdit ? {color: 'white'} : null,
                        ]}
                        onPress={() => {
                          if (ConsultFeesEdit == false) {
                            Alert.alert('You can now edit Fees Details');
                            setConsultFeesEdit(true);
                          }
                        }}>
                        Edit
                      </Text>
                    ) : null}
                    <FAIcon
                      name={showConsultFees ? 'chevron-down' : 'chevron-right'}
                      color={showConsultFees ? '#2B8ADA' : 'gray'}
                      style={[
                        styles.label,
                        {width: '10%', fontSize: 20},
                      ]}></FAIcon>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Consultation Fees Body*/}
              {showConsultFees ? (
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      flexDirection: 'column',
                      marginBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                        }}>
                        <Text style={styles.inputLabel}>
                          Physical Consultation Fees
                        </Text>

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
                          width: '100%',
                        }}>
                        <Text style={styles.inputLabel}>
                          E-Consultation Fees
                        </Text>

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
                          width: '100%',
                        }}>
                        <Text style={styles.inputLabel}>Follow-Up Fees</Text>

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
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                        }}>
                        <Text style={styles.inputLabel}>
                          Duration of Follow-Up
                        </Text>

                        {!ConsultFeesEdit ? (
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc'},
                            ]}
                            value={showFollowUp + ''}
                            editable={ConsultFeesEdit}
                          />
                        ) : (
                          <SelectList
                            placeholder={showFollowUp}
                            boxStyles={{
                              backgroundColor: '#e8f0fe',
                              borderWidth: 0,
                            }}
                            dropdownTextStyles={{
                              color: '#2b8ada',
                              fontWeight: 'bold',
                            }}
                            setSelected={setshowFollowUp}
                            data={dataFollowUp}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  {ConsultFeesEdit ? (
                    <View style={styles.ButtonView}>
                      <CustomButton
                        text={'Done'}
                        textstyle={styles.ButtonText}
                        style={styles.ButtonUpdate}
                        onPress={() => {
                          // setisLoading(true);
                          updatefees();
                          //Alert.alert('Fees Details Updated Successfully!');
                          //setConsultFeesEdit(false);
                        }}
                      />
                      <CustomButton
                        text={'Cancel'}
                        textstyle={styles.ButtonTextCancel}
                        style={styles.ButtonCancel}
                        onPress={() => setConsultFeesEdit(false)}
                      />
                    </View>
                  ) : null}
                </View>
              ) : null}
              {/* Buttons */}
              {/* <CustomButton
                text={'Go Back'}
                textstyle={{color: 'white', fontSize: 20}}
                style={{
                  flex: 1,
                  backgroundColor: '#2b8ada',
                  padding: 6,
                  marginVertical: 10,
                  borderRadius: 10,
                }}
                onPress={() => navigation.goBack()}
              /> */}
            </View>
            {EduElementModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={EduElementModal}
                onRequestClose={() => {
                  setEduElementModal(!EduElementModal);
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
                        padding: 15,
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
                          fontSize: 14,
                          padding: 5,
                        }}>
                        {editEduDet ? 'Edit' : 'Add More'} Education
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setEduElementModal(false)}
                      />
                    </View>
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
                            <Text style={styles.inputLabel}>Degree</Text>
                            <TextInput
                              style={[
                                styles.textInput,
                                {backgroundColor: '#E8F0FE'},
                              ]}
                              onChangeText={text => setDegree(text)}
                              value={Degree}></TextInput>
                          </View>
                          <View style={{flex: 0.475}}>
                            <Text style={styles.inputLabel}>
                              Degree Passing Year
                            </Text>
                            <SelectList
                              placeholder={DegreePassingYear}
                              boxStyles={{
                                backgroundColor: '#e8f0fe',
                                borderWidth: 0,
                              }}
                              dropdownTextStyles={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                              }}
                              setSelected={setDegreePassingYear}
                              data={dataYear}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={[styles.inputLabel, {marginBottom: 10}]}>
                              Specialization
                            </Text>
                            <SelectList
                              labelStyles={{height: 0}}
                              placeholder={Specialization}
                              setSelected={val => setSpecialization(val)}
                              data={dataSpecialization}
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
                          flexDirection: 'row',
                          marginVertical: 5,
                          flex: 1,
                          marginBottom: 10,
                        }}>
                        <CustomButton
                          text="Upload Document"
                          textstyle={{color: '#2b8ada', fontSize: 12}}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 12,
                            padding: 6,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: '#2b8ada',
                          }}
                        />
                      </View>
                    </View>

                    <CustomButton
                      text="Update"
                      textstyle={{color: 'white'}}
                      style={{
                        width: '95%',
                        backgroundColor: '#2B8ADA',
                        marginVertical: 5,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        if (Degree == '')
                          Alert.alert('Please fill Degree Name');
                        else if (DegreePassingYear == '')
                          Alert.alert('Please fill Degree Passing Year');
                        else if (Specialization == '')
                          Alert.alert('Please Select Specialization');
                        else if (University == '')
                          Alert.alert('Please fill University Name');
                        else {
                          let totalexp =
                            parseInt(TotalYear) * 12 + parseInt(TotalMonths);
                          let p = {
                            degree: Degree,
                            degreePath: Degree + '.pdf',

                            doctorId: doctorId,
                            passingYear: Number(DegreePassingYear),
                            specialization: Specialization,
                            university: University,
                          };
                          if (editEduDet)
                            p.doctorEducationPkId = doctorEducationPkId;

                          setisLoading(true);
                          updateEduDet(p);
                          setDegree('');
                          setDegreePassingYear('');
                          setdoctorEducationPkId(0);
                          setSpecialization('');
                          setUniversity('');
                          setEduElementModal(false);
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {ExpElementModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={ExpElementModal}
                onRequestClose={() => {
                  setExpElementModal(!ExpElementModal);
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
                        padding: 15,
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
                          fontSize: 14,
                          padding: 5,
                        }}>
                        {editExp ? ' Edit' : 'Add More'} Experience
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setExpElementModal(false)}
                      />
                    </View>
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
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 1}}>
                            <Text style={[styles.inputLabel, {marginTop: 0}]}>
                              Practice At
                            </Text>
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
                              <Text style={[styles.textInput, {flex: 1}]}>
                                {dayjs(startExpDate).isValid()
                                  ? dayjs(startExpDate).format('DD-MM-YYYY')
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
                                onPress={() => {
                                  setStartExpDatePickerVisible(true);
                                }}
                              />
                            </View>
                            <DateTimePickerModal
                              isVisible={isStartExpDatePickerVisible}
                              mode="date"
                              display="spinner"
                              date={
                                dayjs(startExpDate).isValid()
                                  ? dayjs(startExpDate).toDate()
                                  : dayjs().toDate()
                              }
                              maximumDate={dayjs().toDate()}
                              onConfirm={handleStartExpDate}
                              onCancel={() => {
                                setStartExpDatePickerVisible(false);
                              }}
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
                              <Text style={[styles.textInput, {flex: 1}]}>
                                {dayjs(endExpDate).isValid()
                                  ? dayjs(endExpDate).format('DD-MM-YYYY')
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
                                onPress={() => {
                                  setEndExpDatePickerVisible(true);
                                }}
                              />
                            </View>
                            <DateTimePickerModal
                              isVisible={isEndExpDatePickerVisible}
                              mode="date"
                              display="spinner"
                              date={
                                dayjs(endExpDate).isValid()
                                  ? dayjs(endExpDate).toDate()
                                  : dayjs().toDate()
                              }
                              maximumDate={dayjs().toDate()}
                              onConfirm={handleEndExpDate}
                              onCancel={() => {
                                setEndExpDatePickerVisible(false);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <CustomButton
                      text="Update"
                      textstyle={{color: 'white'}}
                      style={{
                        width: '95%',
                        backgroundColor: '#2B8ADA',
                        marginVertical: 5,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        if (practiceAt == '')
                          Alert.alert(
                            'Please add Clinic/Hospital Practise Name',
                          );
                        else if (startExpDate == '')
                          Alert.alert('Please Select Practise Start Date');
                        else if (endExpDate == '')
                          Alert.alert('Please Select Practise End Date');
                        else {
                          let p = {
                            doctorId: Number(doctorId),
                            endDate: endExpDate,

                            experienceInMonths: Number(experienceInMonths),
                            practiceAt: practiceAt,
                            startDate: startExpDate,
                          };

                          if (editExp) p.experienceId = Number(experienceId);

                          setisLoading(true);
                          updateExpDet(p);
                          setPracticeAt('');
                          setStartExpDate('');
                          setEndExpDate('');
                          setExperienceInMonths('');
                          setTotalYear('');
                          setTotalMonths('');
                          setShowExpDet(false);
                          setExpElementModal(false);
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {IdenElementModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={IdenElementModal}
                onRequestClose={() => {
                  setIdenElementModal(!IdenElementModal);
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
                        padding: 15,
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
                          fontSize: 14,
                          padding: 5,
                        }}>
                        {editIden ? ' Edit' : 'Add More '} Identification
                      </Text>
                      <FAIcon
                        name="window-close"
                        color="black"
                        size={26}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => setIdenElementModal(false)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '95%',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'column', flex: 1}}>
                          <Text style={styles.inputLabel}>Document Name</Text>

                          <SelectList
                            placeholder={identificationType}
                            boxStyles={{
                              backgroundColor: '#e8f0fe',
                              borderWidth: 0,
                            }}
                            dropdownTextStyles={{
                              color: '#2b8ada',
                              fontWeight: 'bold',
                            }}
                            setSelected={setidentificationType}
                            data={dataIdenDocs}
                          />
                        </View>
                        <View style={{flexDirection: 'column', flex: 1}}>
                          <Text style={styles.inputLabel}>
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
                    </View>

                    <CustomButton
                      text="Update"
                      textstyle={{color: 'white'}}
                      style={{
                        width: '95%',
                        backgroundColor: '#2B8ADA',
                        marginVertical: 5,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        if (
                          identificationNumber != '' &&
                          identificationType != ''
                        ) {
                          var flag = 1;
                          if (
                            IdentificationDocs.length > 0 &&
                            editIden == false
                          ) {
                            for (
                              var i = 0;
                              i < IdentificationDocs.length;
                              ++i
                            ) {
                              if (
                                IdentificationDocs[i].identificationType ==
                                identificationType
                              ) {
                                flag = 0;
                                break;
                              }
                            }
                            if (flag == 0) {
                              Alert.alert(
                                'You can not add duplicate documents',
                              );
                              setidentificationNumber('');
                              setidentificationType('');
                            }
                          }
                          if (flag == 1) {
                            let p = {
                              doctorId: doctorId,

                              identificationNumber: identificationNumber,
                              identificationPath:
                                'aws/s3/Docs/' + identificationNumber + '.pdf',
                              identificationType: identificationType,
                            };

                            if (editIden)
                              p.doctorIdentificationPkId =
                                doctorIdentificationPkId;

                            setisLoading(true);
                            updateIden(p);
                            setidentificationNumber('');
                            setidentificationType('');
                            setIdenElementModal(false);
                            setShowIdenDet(false);
                          }
                        } else if (identificationNumber == '')
                          Alert.alert('Please fill Identification Number');
                        else if (identificationType == '')
                          Alert.alert('Please Select Document Name');
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
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
                  width: 100,
                  height: 100,
                  borderRadius: 100,
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
                Updating Please Wait...
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
  cellText: {textAlign: 'center', fontSize: 10, marginVertical: 3},
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
    marginVertical: 3,
  },
  ButtonView: {
    alignContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  ButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
  },
  ButtonTextCancel: {
    color: '#2b8ada',
    alignSelf: 'center',
    fontSize: 12,
  },
  ButtonUpdate: {
    backgroundColor: '#2b8ada',
    borderRadius: 5,
    padding: 6,
    paddingHorizontal: 10,
    flex: 0.45,
    marginRight: '5%',
  },
  ButtonCancel: {
    borderWidth: 1,
    borderColor: '#2b8ada',
    borderRadius: 5,
    padding: 6,
    paddingHorizontal: 10,
    flex: 0.45,
  },
});

export default EditProfile;
