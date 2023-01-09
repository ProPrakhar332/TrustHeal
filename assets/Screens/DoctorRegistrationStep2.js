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

import dateformatter from '../API/dateformatter';
import DaysCreator from '../API/slotscreate';
import apiConfig from '../API/apiConfig';

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
const dataYear = [];

const dataIdenDocs = [
  {key: 'Aadhar', value: 'Aadhar'},
  {key: 'Driving License', value: 'Driving License'},
  {key: 'PAN', value: 'PAN'},
  {key: 'Passport No.', value: 'Passport No.'},
];

const clearKeys = async () => {
  await AsyncStorage.removeItem('dob');
  await AsyncStorage.removeItem('age');
};

const DoctorRegistration2 = ({navigation}) => {
  //Calendar View
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartExpDatePickerVisible, setStartExpDatePickerVisible] =
    useState(false);
  const [isEndExpDatePickerVisible, setEndExpDatePickerVisible] =
    useState(false);
  const [selectedDateFromModal, setselectedDateFromModal] =
    useState('YYYY-MM-DD');
  const [completePercentage, setCompletePercentage] = useState('13%');

  //General Information Field
  const [showGenInfo, setShowGenInfo] = useState(false);
  const [dataSavedGenInfo, setdataSavedGenInfo] = useState(true);
  const [GenInfoEdit, setGenInfoEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setdob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [PinCode, setPinCode] = useState('');
  //Medical Registration Feild
  const [showMedReg, setShowMedReg] = useState(true);
  const [dataSavedMedReg, setdataSavedMedReg] = useState(false);
  const [medReg, setmedReg] = useState([]);
  const [RegNo, setRegNo] = useState('');
  const [RegCouncil, setRegCouncil] = useState('');
  const [RegCert, setRegCert] = useState('');
  const [RegYear, setRegYear] = useState('');
  //Educational Details Field
  const [showEduDet, setShowEduDet] = useState(false);
  const [addMoreEduDet, setaddMoreEduDet] = useState(false);
  const [dataSavedEduDet, setdataSavedEduDet] = useState(false);

  const [dataSpecialization, setdataSpecialization] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Degree, setDegree] = useState('');
  const [DegreePassingYear, setDegreePassingYear] = useState('');
  const [Specialization, setSpecialization] = useState('');
  const [University, setUniversity] = useState('');
  //Experience Details Field
  const [showExpDet, setShowExpDet] = useState(false);
  const [addMoreExpDet, setaddMoreExpDet] = useState(false);
  const [dataSavedExpDet, setdataSavedExpDet] = useState(false);
  const [Experience, setExperience] = useState([]);
  const [practiceAt, setPracticeAt] = useState('');
  const [startExpDate, setStartExpDate] = useState('');
  const [endExpDate, setEndExpDate] = useState('');
  const [experienceInMonths, setExperienceInMonths] = useState('');
  const [TotalYear, setTotalYear] = useState('');
  const [TotalMonths, setTotalMonths] = useState('');
  const [FinalTotalMonths, setFinalTotalMonths] = useState(0);
  //Identification
  const [showIdenDet, setShowIdenDet] = useState(false);
  const [addMoreIdenDet, setaddMoreIdenDet] = useState(false);
  const [dataSavedIdenDet, setdataSavedIdenDet] = useState(false);
  const [Aadhar, setAadhar] = useState('');
  const [IdentificationDocs, setIdentificationDocs] = useState([]);
  const [identificationNumber, setidentificationNumber] = useState('');
  const [identificationType, setidentificationType] = useState('');
  //Additional Information
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [addMoreAddInfo, setaddMoreAddInfo] = useState(false);
  const [dataSavedAddInfo, setdataSavedAddInfo] = useState(false);
  const [ClinicDet, setClinicDet] = useState([]);
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [DaysSlot, setDaysSlot] = useState([]);
  const [DaysSlotRefresh, setDaysSlotRefresh] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
  const [Days, setDays] = useState(null);
  //p-create
  const [consultView, setconsultView] = useState(false);
  const [pmodal, setpmodal] = useState(false);
  const [PCCreateClinicName, setPCCreateClinicName] = useState('');
  const [PCCreateClinicAddress, setPCCreateClinicAddress] = useState('');

  const [PCoutDate, setPCoutDate] = useState('');
  const [PCinTimeHH, setPCinTimeHH] = useState('');
  const [PCinTimeMM, setPCinTimeMM] = useState('');
  const [PCoutTimeHH, setPCoutTimeHH] = useState('');
  const [PCoutTimeMM, setPCoutTimeMM] = useState('');
  const [PCduration, setPCduration] = useState(0);
  const [PCclinicName, setPCclinicName] = useState('');
  const [PCclinicAddress, setPCclinicAddress] = useState('');
  const [PCspecialInstruction, setPCspecialInstruction] = useState('');
  const [PCData, setPCData] = useState([]);
  //E-create
  const [EconsultMode, setEconsultMode] = useState('');
  const [ECinTimeHH, setECinTimeHH] = useState('');
  const [ECinTimeMM, setECinTimeMM] = useState('');
  const [ECoutTimeHH, setECoutTimeHH] = useState('');
  const [ECoutTimeMM, setECoutTimeMM] = useState('');
  const [ECduration, setECduration] = useState('');
  const [ECGap, setECGap] = useState('');
  const [ECData, setECData] = useState([]);

  const [emodal, setemodal] = useState(false);
  //General Configuration
  const [showGenConfig, setShowGenConfig] = useState(false);
  const [showMobNo, setshowMobNo] = useState('');
  const [showFollowUp, setshowFollowUp] = useState('');

  //PreConsultation Questionnaire
  const [showPreConsultationQuestionaire, setShowPreConsultationQuestionaire] =
    useState(false);
  const [
    addMorePreConsultationQuestionaire,
    setaddMorePreConsultationQuestionaire,
  ] = useState(false);
  const [
    dataSavedPreConsultationQuestionaire,
    setdataSavedPreConsultationQuestionaire,
  ] = useState(false);
  const [questionare, setQuestionare] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [consultationQuestion, setConsultationQuestion] = useState('');
  const [questionareList, setQuestionareList] = useState([]);
  const [showPreConsulQues, setShowPreConsulQues] = useState(false);
  const [questionSpl, setquestionSpl] = useState('');
  const [splArray, setsplArray] = useState([]);
  //consultation fees
  const [showConsultFees, setShowConsultFees] = useState(false);
  const [addMoreConsultFees, setaddMoreConsultFees] = useState(false);
  const [dataSavedConsultFees, setdataSavedConsultFees] = useState(false);
  const [physicalConsulationFees, setphysicalConsulationFees] = useState(0);
  const [eConsulationFees, seteConsulationFees] = useState(0);
  const [followUpFees, setfollowUpFees] = useState(0);
  const [DigitalSign, setDigitalSign] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const dataFollowUp = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
    {key: '4', value: '4'},
    {key: '5', value: '5'},
    {key: '6', value: '6'},
    {key: '7', value: '7'},
  ];

  const dataShowQues = [
    {key: 'Yes', value: 'Yes'},
    {key: 'No', value: 'No'},
  ];
  const dataMode = [
    {key: 'VIDEO_CALL', value: 'Video'},
    {key: 'PHONE_CALL', value: 'Phone'},
  ];

  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async date => {
    await AsyncStorage.setItem('dob', JSON.stringify(date).substring(1, 11));
    setdob(JSON.stringify(date).substring(1, 11));
    calculateAge();
    hideDatePicker();
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
  useEffect(() => {
    const Display = () => {
      let p = 0;
      for (var i = 0; i < Experience.length; ++i) {
        p += Experience[i].experienceInMonths;
      }
      setFinalTotalMonths(p);
      //console.log(p);
    };
    Display();
  }, [Experience]);

  //Validations
  // useEffect(() => {
  //   const Check = () => {
  //     if (
  //       new Date().getFullYear() < Number(RegYear) ||
  //       Number(RegYear) < 1900
  //     ) {
  //       Alert.alert('Enter Valid Registration Year');
  //       setRegYear('');
  //     }
  //   };
  //   if (RegYear.length == 4) Check();
  // }, [RegYear]);

  // useEffect(() => {
  //   const Check = () => {
  //     if (
  //       new Date().getFullYear() < Number(DegreePassingYear) ||
  //       Number(DegreePassingYear) < 1900
  //     ) {
  //       Alert.alert('Enter Valid Degree Passing Year');
  //       setDegreePassingYear('');
  //     }
  //   };
  //   if (DegreePassingYear.length == 4) Check();
  // }, [DegreePassingYear]);

  useEffect(() => {
    const setDate = async () => {
      setdob(await AsyncStorage.getItem('dob'));
    };

    setDate();
  }, [dob]);
  useEffect(() => {
    const settingAge = async () => {
      setAge(await AsyncStorage.getItem('age'));
    };
    settingAge();
  }, [age]);

  // useEffect(() => {
  //   const progressBar = () => {
  //     var c = 0;
  //     if (RegNo != '' && RegCouncil != '' && RegYear != '') ++c;
  //     if (Education != null && Education.length > 0) ++c;
  //     if (Experience != null && Experience.length > 0) ++c;
  //     if (IdentificationDocs != null && IdentificationDocs.length > 0) ++c;
  //     if (ClinicDet != null && ClinicDet.length > 0) ++c;
  //     if (showQuestions == false) ++c;
  //     else if (
  //       showQuestions == true &&
  //       questionareList != null &&
  //       questionareList.length > 0
  //     )
  //       ++c;
  //     if (
  //       physicalConsulationFees != '' &&
  //       eConsulationFees != '' &&
  //       followUpFees != '' &&
  //       showFollowUp != ''
  //     )
  //       ++c;
  //     setCompletePercentage((50 + parseInt((c / 7) * 50)).toString() + '%');
  //   };
  //   progressBar();

  //   //console.log('Use Effect ClinicDet-----------');
  //   // console.log(ClinicDet);
  // }, [
  //   RegNo,
  //   RegCouncil,
  //   RegYear,
  //   Education,
  //   IdentificationDocs,
  //   ClinicDet,
  //   showMobNo,
  //   showFollowUp,
  //   questionareList,
  //   physicalConsulationFees,
  //   eConsulationFees,
  //   followUpFees,
  // ]);

  useEffect(() => {
    const progressBar = () => {
      var c = 0;
      if (dataSavedMedReg) ++c;
      if (dataSavedEduDet) ++c;
      if (dataSavedExpDet) ++c;
      if (dataSavedIdenDet) ++c;
      if (dataSavedAddInfo) ++c;
      if (dataSavedPreConsultationQuestionaire) ++c;
      if (dataSavedConsultFees) ++c;

      setCompletePercentage((50 + parseInt((c / 7) * 50)).toString() + '%');
    };
    progressBar();

    //console.log('Use Effect ClinicDet-----------');
    // console.log(ClinicDet);
  }, [
    RegNo,
    RegCouncil,
    RegYear,
    Education,
    IdentificationDocs,
    ClinicDet,
    showMobNo,
    showFollowUp,
    questionareList,
    physicalConsulationFees,
    eConsulationFees,
    followUpFees,
  ]);

  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      //console.log(DoctorID);
      let Fn = x.fullName;
      //console.log(x);
      setDaysSlot(DaysCreator);
      setTitle(Fn.substring(0, Fn.indexOf(' ')));
      setName(Fn.substring(Fn.indexOf(' ') + 1));
      setEmail(x.email);
      setGender(x.gender);
      setCity(x.city);
      setdob(x.dob);
      setAge(x.age + '');
      setPinCode(x.pincode);
      var temp = JSON.parse(
        await AsyncStorage.getItem(x.doctorId + 'speciality'),
      );
      // console.log('speciality.....');
      // console.log(temp);
      if (temp != null && temp.length > 0) {
        for (var i = 0; i < temp.length; ++i) {
          if (temp[i] != 'Other')
            dataSpecialization.push({key: temp[i], value: temp[i]});
        }
        //console.log(dataSpecialization);

        var d = new Date().getFullYear();
        //console.log(dob.substring(0, 4));
        var i = Number(dob.substring(0, 4));
        if (i == 0) i = 1940;
        else i += 17;
        for (; i <= d; ++i) {
          dataYear.push({key: i + '', value: i + ''});
        }
      } else {
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
          {
            key: 'Psychological Counselling',
            value: 'Psychological Counselling',
          },
        ];
        setdataSpecialization(data);
      }
    };
    const onLoadSetDay = async () => {
      setDaysSlot(DaysCreator);
      //console.log(DaysSlot);
      setselectedDate('');
    };
    onLoadSetData();
    onLoadSetDay();
  }, []);
  const pushSlot = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    //let doctorId = Number(x.doctorId);

    let p = {
      clinicAddress: PCCreateClinicAddress,
      clinicName: PCCreateClinicName,
      consultationDate: selectedDate,
      //doctoId: doctorId,
      slotDuration: Number(PCduration),
      consultationEndTime:
        (PCoutTimeHH.length == 1 ? '0' + PCoutTimeHH : PCoutTimeHH) +
        ':' +
        (PCoutTimeMM.length == 1 ? '0' + PCoutTimeMM : PCoutTimeMM),
      consultationStartTime:
        (PCinTimeHH.length == 1 ? '0' + PCinTimeHH : PCinTimeHH) +
        ':' +
        (PCinTimeMM.length == 1 ? '0' + PCinTimeMM : PCinTimeMM),
      specialInstruction: PCspecialInstruction,
    };
    // console.log(p);
    if (PCData.length == 0) {
      PCData.push(p);

      Alert.alert('Slot details submitted successfully');
    } else {
      let flag = 0;
      for (var i = 0; i < PCData.length; ++i) {
        if (
          PCData[i].clinicName == PCCreateClinicName &&
          PCData[i].clinicAddress == PCCreateClinicAddress &&
          PCData[i].date == selectedDate
        ) {
          flag = 1;
          break;
        }
      }
      if (flag == 1) {
        Alert.alert('Sorry you cannot insert duplicate records');
        reset();
      } else {
        PCData.push(p);
        Alert.alert('Slot details submitted successfully');
      }
      //console.log(PCData);
    }
  };
  const pushESlot = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    //let doctorId = Number(x.doctorId);

    let p = {
      consultationDate: selectedDate,
      consultationEndTime:
        (ECoutTimeHH.length == 1 ? '0' + ECoutTimeHH : ECoutTimeHH) +
        ':' +
        (ECoutTimeMM.length == 1 ? '0' + ECoutTimeMM : ECoutTimeMM),
      consultationStartTime:
        (ECinTimeHH.length == 1 ? '0' + ECinTimeHH : ECinTimeHH) +
        ':' +
        (ECoutTimeHH.length == 1 ? '0' + ECoutTimeHH : ECoutTimeHH),

      gap: Number(ECGap),
      slotDuration: Number(ECduration),
      typeOfEConsultation: EconsultMode,
    };
    if (ECData.length == 0) {
      //console.log(p);
      ECData.push(p);
      Alert.alert('Slot details submitted successfully');
    } else {
      let flag = 0;
      for (var i = 0; i < ECData.length; ++i) {
        let endTime = ECData[i].consultationEndTime;
        let startTime = p.consultationStartTime;

        let time1 = endTime.split(':');
        let time2 = startTime.split(':');

        if (Number(time1[0]) > Number(time2[0])) {
          flag = 1;
          break;
        } else if (Number(time1[0]) == Number(time2[0])) {
          if (Number(time1[1]) > Number(time2[1])) {
            flag = 1;
            break;
          } else continue;
        } else continue;
      }
      if (flag == 1) {
        Alert.alert('Sorry you cannot insert overlapping timings');
        reset();
      } else {
        ECData.push(p);
        Alert.alert('Slot details submitted successfully');
      }
    }
    //console.log(ECData);
  };
  const reset = () => {
    setPCCreateClinicAddress('');
    setPCCreateClinicName('');
    setselectedDate('');
    setPCinTimeHH('');
    setPCinTimeMM('');
    setPCoutTimeHH('');
    setPCoutTimeMM('');
    setPCduration(0);
    setPCspecialInstruction('');

    setECinTimeHH('');
    setECinTimeMM('');
    setECoutTimeHH('');
    setECoutTimeMM('');
    setECduration('');
    setECGap('');
  };

  //view list of details

  const ViewIdentifications = () => {
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
            {/*Document Type */}
            <View style={styles.cellStyle}>
              <FAIcon
                name="file-pdf"
                size={15}
                color={'#2b8ada'}
                style={{marginTop: 3}}
              />
              <Text
                style={{textAlign: 'center', fontSize: 10, marginVertical: 3}}>
                {IdentificationDocs.identificationType}
              </Text>
            </View>
            {/* Identification Number */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {IdentificationDocs.identificationNumber}
              </Text>
            </View>
            {/*Actions */}
            <TouchableOpacity
              style={styles.cellStyle}
              onPress={() => {
                removeIdenHandler(index);
              }}>
              <FAIcon name="trash" color={'red'} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const removeIdenHandler = i => {
    setIdentificationDocs(IdentificationDocs.filter((obj, e) => i !== e));
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
              <FAIcon
                name="file-pdf"
                size={15}
                color={'#2b8ada'}
                style={{marginTop: 3}}
              />
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
            <TouchableOpacity
              style={styles.cellStyle}
              onPress={() => {
                removeEduHandler(index);
              }}>
              <FAIcon name="trash" color={'red'} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const removeEduHandler = i => {
    setEducation(Education.filter((obj, e) => i !== e));
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
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Experience.startDate).isValid()
                  ? dayjs(Experience.startDate).format('DD-MM-YYYY')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
            {/* End Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {dayjs(Experience.endDate).isValid()
                  ? dayjs(Experience.endDate).format('DD-MM-YYYY')
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
                {Math.floor(Experience.experienceInMonths / 12)} {'years'}{' '}
              </Text>

              {parseInt(Experience.experienceInMonths % 12) != 0 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  {parseInt(Experience.experienceInMonths % 12) + ' months'}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.cellStyle}
              onPress={() => {
                removeExpHandler(index);
              }}>
              <FAIcon name="trash" color={'red'} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const removeExpHandler = i => {
    setExperience(Experience.filter((obj, e) => i !== e));
  };

  const RenderQuestion = () => {
    return questionareList.map((questionareList, index) => {
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
            <View style={[styles.cellStyle, {flex: 0.3}]}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {index + 1}
              </Text>
            </View>
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {questionareList.speciality}
              </Text>
            </View>
            {/* End Date */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {questionareList.questions}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.cellStyle, {flex: 0.4}]}
              onPress={() => removeQuestHandler(index)}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: 'red',
                  marginVertical: 5,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };
  const removeQuestHandler = i => {
    setQuestionareList(questionareList.filter((obj, e) => i !== e));
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
            {/* Special Instructions */}
            <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10}}>
                {ClinicDet.specialInstruction}
              </Text>
            </View>
            {/* Actions */}
            <TouchableOpacity
              style={styles.cellStyle}
              onPress={() => {
                removeClinicHandler(index);
              }}>
              <FAIcon name="trash" color={'red'} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const removeClinicHandler = e => {
    setClinicDet(ClinicDet.filter((obj, i) => i !== e));
  };

  const PostData = async () => {
    //console.log('hiii');
    setisLoading(true);
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    //post pre consultation questionnaire
    if (showQuestions) {
    }

    // let medtemp = {
    //   certificatePath: RegCert,
    //   registrationCouncil: RegCouncil,
    //   registrationNo: RegNo,
    //   registrationYear: Number(RegYear),
    // };
    // let medArry = [...medReg];
    // medArry.push(medtemp);
    // setmedReg(medArry);
    //console.log(medReg);
  };

  //post medical registration

  const postMedReg = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    let medArry = [
      {
        certificatePath: RegCert,
        registrationCouncil: RegCouncil,
        registrationNo: RegNo,
        registrationYear: Number(RegYear),
        doctorId: doctorId,
      },
    ];

    axios
      .post(apiConfig.baseUrl + '/doctor/medicalregi/save/or/update', medArry)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Medical Record Saved Successfully');
          setShowMedReg(false);
          setdataSavedMedReg(true);
          setShowEduDet(true);
        }
      })
      .catch(function (error) {
        console.log('=================Medical Error Occured=================');
        console.log(error);
      });
  };

  //post educational qualification

  const postEduDet = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    Education.forEach(item => {
      item.doctorId = doctorId;
    });

    console.log(Education);

    axios
      .post(apiConfig.baseUrl + '/doctor/education/save/or/update', Education)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Educational Record Inserted Successfully');
          setShowEduDet(false);
          setdataSavedEduDet(true);
          setShowExpDet(true);
        }
      })
      .catch(function (error) {
        console.log(
          '=================Educational Error Occured=================',
        );
        console.log(error);
      });
  };

  //post experience

  const postExpDet = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    Experience.forEach(item => {
      item.doctorId = doctorId;
    });

    console.log(Experience);

    axios
      .post(apiConfig.baseUrl + '/doctor/experience/save/or/update', Experience)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Experience Record Inserted Successfully');
          setShowExpDet(false);
          setdataSavedExpDet(true);
          setShowIdenDet(true);
        }
      })
      .catch(function (error) {
        console.log(
          '=================Experience Error Occured=================',
        );
        console.log(error);
      });
  };

  //post Identification

  const postIdenDet = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    IdentificationDocs.forEach(item => {
      item.doctorId = doctorId;
    });

    console.log(IdentificationDocs);

    axios
      .post(
        apiConfig.baseUrl + '/doctor/identity/save/or/update',
        IdentificationDocs,
      )
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Identification Record Inserted Successfully');
          setShowIdenDet(false);
          setdataSavedIdenDet(true);
          setShowAddInfo(true);
        }
      })
      .catch(function (error) {
        console.log(
          '=================Identification Error Occured=================',
        );
        console.log(error);
      });
  };

  //post Clinic Information

  const postClinicDet = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    ClinicDet.forEach(item => {
      item.doctorId = doctorId;
    });

    console.log(ClinicDet);

    axios
      .post(apiConfig.baseUrl + '/doctor/clinic/save/or/update', ClinicDet)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Clinic Record Inserted Successfully');
          setShowAddInfo(false);
          setdataSavedAddInfo(true);
          setShowPreConsultationQuestionaire(true);
        }
      })
      .catch(function (error) {
        console.log('=================Clinic Error Occured=================');
        console.log(error);
      });
  };

  //post Clinic Information

  const postPreConsultQues = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);

    questionareList.forEach(item => {
      item.doctorId = doctorId;
    });

    console.log(questionareList);

    axios
      .post(
        apiConfig.baseUrl + '/doctor/preconsultation/questions/save/or/update',
        questionareList,
      )
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          console.log(
            'Pre Consultation Questionnaire Record Inserted Successfully',
          );
        }
      })
      .catch(function (error) {
        console.log(
          '=================Pre Consultation Questionnaire Error Occured=================',
        );
        console.log(error);
      });
  };

  //post consultation Fees

  const postConsultFees = async () => {
    let p = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(p.doctorId);
    axios
      .post(apiConfig.baseUrl + '/doctor/generalinfo/fees/save', {
        doctorFeesDTO: {
          econsulationFees: eConsulationFees,
          followUpDuration: showFollowUp,
          followUpFees: followUpFees,
          physicalConsulationFees: physicalConsulationFees,
        },
        doctorId: doctorId,
      })
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          Alert.alert('Fees Record Inserted Successfully');
          setShowConsultFees(false);
          setdataSavedConsultFees(true);
        }
      })
      .catch(function (error) {
        console.log('=================Fees Error Occured=================');
        console.log(error);
      });
  };

  const renderDaysSlot = ({item}) => {
    return item.isActive ? (
      <TouchableOpacity
        style={[
          styles.bubbleActive,
          {
            width: 60,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          //console.log(item.date);
          setselectedDate(item.date);
          //getSlots();
        }}>
        <Text style={styles.bubbleTitleActive}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[
          styles.bubble,
          {
            width: 60,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          setDaysSlotRefresh(!DaysSlotRefresh);
          setDays(item);
          DaysSlot.forEach(x => (x.isActive = false));
          item.isActive = true;
          // console.log(item.date);
          setselectedDate(item.date);
          //console.log(JSON.stringify(DaysSlot));
        }}>
        <Text style={styles.bubbleTitle}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
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
          // marginTop: 30,
        }}>
        <StatusBar animated={true} backgroundColor="#2B8ADA" />
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            padding: 10,
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <View>
            {/* Completion Bar */}
            <View
              style={{
                // elevation: 20,
                backgroundColor: 'white',
                width: '90%',
                height: 15,
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  width: completePercentage,
                  height: 15,
                  borderRadius: 10,
                  backgroundColor: '#2b8ada',
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  {completePercentage}
                </Text>
              </View>
            </View>
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

          <View style={{width: '95%', alignSelf: 'center'}}>
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      !showGenInfo ? {color: '#2B8ADA'} : null,
                    ]}>
                    General Information
                  </Text>
                  <FAIcon
                    name={showGenInfo ? 'chevron-down' : 'check-circle'}
                    style={[styles.label, {width: '10%', fontSize: 20}]}
                    color={!showGenInfo ? '#2B8ADA' : 'gray'}></FAIcon>
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
                              GenInfoEdit ? {backgroundColor: '#E8F0FE'} : null,
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
                          value={PinCode}
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
                        <View>
                          <Text
                            style={[
                              styles.textInput,
                              {backgroundColor: '#d0e0fc', padding: 10},
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
                              bottom: 0,
                              margin: '5%',
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
                            {backgroundColor: '#d0e0fc', padding: 10},
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
                      <CustomButton
                        text="Update"
                        textstyle={{color: 'white', alignSelf: 'center'}}
                        onPress={() => {
                          Alert.alert(
                            'All changes made in Genreal Information have been updated',
                          );
                          clearKeys();
                          setGenInfoEdit(false);
                        }}
                        style={{
                          width: '50%',
                          marginTop: 15,
                          flexDirection: 'column',
                          alignSelf: 'center',
                          backgroundColor: '#2B8ADA',
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedMedReg ? {color: '#2B8ADA'} : null,
                    ]}>
                    Medical Registration
                  </Text>
                  <FAIcon
                    name={
                      showMedReg
                        ? 'chevron-down'
                        : dataSavedMedReg
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedMedReg ? '#2B8ADA' : 'gray'}
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
                  <View
                    style={{
                      flexDirection: 'column',
                      marginBottom: 10,
                      width: '95%',
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View style={{flex: 1}}>
                        <Text style={[styles.inputLabel, {marginTop: 0}]}>
                          Registration Number
                        </Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
                          placeholderTextColor={'black'}
                          onChangeText={text => setRegNo(text)}
                          value={RegNo}></TextInput>
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={[styles.inputLabel]}>
                        Registration Council
                      </Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        onChangeText={text => setRegCouncil(text)}
                        value={RegCouncil}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View style={{flex: 1, marginRight: '5%'}}>
                        <Text style={styles.inputLabel}>Reg. Certificate</Text>
                        <View>
                          <TextInput
                            style={[
                              styles.textInput,
                              {backgroundColor: '#E8F0FE'},
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
                              backgroundColor: '#E8F0FE',
                            }}
                            onPress={() => {
                              setRegCert(name + '.pdf');
                            }}
                          />
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.inputLabel}>Reg. Year</Text>
                        <SelectList
                          placeholder={RegYear}
                          boxStyles={{
                            backgroundColor: '#e8f0fe',
                            borderWidth: 0,
                          }}
                          dropdownTextStyles={{
                            color: '#2b8ada',
                            fontWeight: 'bold',
                          }}
                          setSelected={setRegYear}
                          data={dataYear}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <CustomButton
                        text={'Skip For Now'}
                        textstyle={{fontSize: 12, color: '#2b8ada'}}
                        style={{
                          marginRight: '5%',
                          flex: 0.45,
                          borderColor: '#2b8ada',
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setShowMedReg(false);
                          setdataSavedMedReg(false);
                          setShowEduDet(true);
                        }}
                      />
                      <CustomButton
                        text={'Upload'}
                        textstyle={{fontSize: 12, color: 'white'}}
                        style={{
                          flex: 0.45,
                          backgroundColor: '#2b8ada',
                          padding: 5,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          if (RegNo == '')
                            Alert.alert('Please Fill Registration Number');
                          else if (RegCouncil == '')
                            Alert.alert('Please Fill Registration Council');
                          else if (RegYear == '')
                            Alert.alert('Please Select Registration');
                          else postMedReg();
                        }}
                      />
                    </View>
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedEduDet ? {color: '#2B8ADA'} : null,
                    ]}>
                    Educational Qualifications & Certificates
                  </Text>
                  <FAIcon
                    name={
                      showEduDet
                        ? 'chevron-down'
                        : dataSavedEduDet
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedEduDet ? '#2B8ADA' : 'gray'}
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
                  {Education.length > 0 ? (
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
                            <Text style={styles.cellHeadingText}>Actions</Text>
                          </View>
                        </View>
                      </View>
                      <ViewEducation />
                    </View>
                  ) : null}
                  {Education.length == 0 || addMoreEduDet ? (
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
                              placeholder={' '}
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
                                parseInt(TotalYear) * 12 +
                                parseInt(TotalMonths);
                              let newArry = [];
                              newArry.push({
                                key: Specialization,
                                value: Specialization,
                              });
                              setsplArray([...splArray, ...newArry]);

                              let p = {
                                degree: Degree,
                                degreePath: Degree + '.pdf',
                                passingYear: Number(DegreePassingYear),
                                specialization: Specialization,
                                // totalExperiencedInMonths: Number(totalexp),
                                university: University,
                              };
                              // Education.push(p);
                              // console.log(Education);
                              let arr = [...Education];
                              arr.push(p);
                              // console.log(arr);
                              setEducation(arr);
                              setDegree('');
                              setDegreePassingYear('');
                              setSpecialization('');
                              setUniversity('');
                              setaddMoreEduDet(false);
                            }
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <CustomButton
                        text={'+ Add More'}
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
                        onPress={() => setaddMoreEduDet(true)}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignSelf: 'center',
                      width: '95%',
                    }}>
                    <CustomButton
                      text={'Skip For Now'}
                      textstyle={{fontSize: 12, color: '#2b8ada'}}
                      style={[
                        {
                          marginRight: '5%',
                          flex: 0.45,
                          borderColor: '#2b8ada',
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                        },
                        Education.length == 0
                          ? {flex: 1, alignSelf: 'center', marginRight: ' 0%'}
                          : null,
                      ]}
                      onPress={() => {
                        setShowEduDet(false);
                        setShowExpDet(true);
                        setdataSavedEduDet(false);
                      }}
                    />
                    {Education.length > 0 ? (
                      <CustomButton
                        text={'Upload'}
                        textstyle={{color: 'white', fontSize: 12}}
                        style={{
                          flex: 0.45,
                          backgroundColor: '#2b8ada',
                          padding: 5,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          if (Education.length == 0)
                            Alert.alert('Please Fill Education Details ');
                          else postEduDet();
                        }}
                      />
                    ) : null}
                  </View>
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedExpDet ? {color: '#2B8ADA'} : null,
                    ]}>
                    Experience
                  </Text>
                  <FAIcon
                    name={
                      showExpDet
                        ? 'chevron-down'
                        : dataSavedExpDet
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedExpDet ? '#2B8ADA' : 'gray'}
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
                            <Text style={styles.cellHeadingText}>End Date</Text>
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
                            <Text style={styles.cellHeadingText}>Actions</Text>
                          </View>
                        </View>
                      </View>
                      <ViewExperience />
                    </View>
                  ) : null}
                  {Experience.length == 0 || addMoreExpDet ? (
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
                      {/* Display Total Experience */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flex: 0.475, flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>
                            Experience (in Years)
                          </Text>
                          <Text style={styles.textInput}>{TotalYear}</Text>
                        </View>
                        <View style={{flex: 0.475, flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>
                            Experience (in Months)
                          </Text>
                          <Text style={styles.textInput}>{TotalMonths}</Text>
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
                                practiceAt: practiceAt,
                                startDate: startExpDate,
                                endDate: endExpDate,
                                experienceInMonths: experienceInMonths,
                              };

                              let arr = [...Experience];
                              arr.push(p);
                              setExperience(arr);
                              setPracticeAt('');
                              setStartExpDate('');
                              setEndExpDate('');
                              setExperienceInMonths('');
                              setTotalYear('');
                              setTotalMonths('');
                              setaddMoreExpDet(false);
                            }
                          }}
                        />
                      </View>
                      {Experience.length > 0 ? (
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 0.45, flexDirection: 'column'}}>
                            <Text style={styles.inputLabel}>
                              Experience (in Years)
                            </Text>
                            <Text style={styles.textInput}>
                              {Math.floor(FinalTotalMonths / 12)}
                            </Text>
                          </View>
                          <View style={{flex: 0.45, flexDirection: 'column'}}>
                            <Text style={styles.inputLabel}>
                              Experience (in Months)
                            </Text>
                            <Text style={styles.textInput}>
                              {FinalTotalMonths % 12}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <CustomButton
                        text={'+ Add More'}
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
                        onPress={() => setaddMoreExpDet(true)}
                      />
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignSelf: 'center',
                      width: '95%',
                    }}>
                    <CustomButton
                      text={'Skip For Now'}
                      textstyle={{fontSize: 12, color: '#2b8ada'}}
                      style={[
                        {
                          marginRight: '5%',
                          flex: 0.45,
                          borderColor: '#2b8ada',
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                        },
                        Experience.length == 0
                          ? {flex: 1, alignSelf: 'center', marginRight: ' 0%'}
                          : null,
                      ]}
                      onPress={() => {
                        setShowExpDet(false);
                        setShowIdenDet(true);
                        setdataSavedExpDet(false);
                      }}
                    />
                    {Experience.length > 0 ? (
                      <CustomButton
                        text={'Upload'}
                        textstyle={{fontSize: 12, color: 'white'}}
                        style={{
                          backgroundColor: '#2b8ada',
                          padding: 5,
                          borderRadius: 10,
                          flex: 0.45,
                        }}
                        onPress={() => {
                          if (Experience.length == 0)
                            Alert.alert('Please Fill Education Details ');
                          else postExpDet();
                        }}
                      />
                    ) : null}
                  </View>
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedIdenDet ? {color: '#2B8ADA'} : null,
                    ]}>
                    Identification
                  </Text>
                  <FAIcon
                    name={
                      showIdenDet
                        ? 'chevron-down'
                        : dataSavedIdenDet
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedIdenDet ? '#2B8ADA' : 'gray'}
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
                  {IdentificationDocs.length > 0 ? (
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
                            <Text style={styles.cellHeadingText}>ID No.</Text>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingHorizontal: 1,
                              paddingVertical: 1,
                            }}>
                            <Text style={styles.cellHeadingText}>Actions</Text>
                          </View>
                        </View>
                      </View>
                      <ViewIdentifications />
                    </View>
                  ) : null}

                  {IdentificationDocs.length == 0 || addMoreIdenDet ? (
                    <View style={{marginBottom: 10}}>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: 5,
                          width: '95%',
                          alignSelf: 'center',
                          marginBottom: 15,
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
                              identificationNumber != '' &&
                              identificationType != ''
                            ) {
                              var flag = 1;
                              if (IdentificationDocs.length > 0) {
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
                                  identificationNumber: identificationNumber,

                                  identificationType: identificationType,
                                  identificationPath:
                                    'aws/s3/Docs/' +
                                    identificationNumber +
                                    '.pdf',
                                };
                                // IdentificationDocs.push(p);
                                let arr = [...IdentificationDocs];
                                arr.push(p);
                                //console.log(arr);
                                setIdentificationDocs(arr);
                                setidentificationNumber('');
                                setidentificationType('');
                                //console.log(IdentificationDocs);
                                setaddMoreIdenDet(false);
                              }
                            } else if (identificationNumber == '')
                              Alert.alert('Please fill Identification Number');
                            else if (identificationType == '')
                              Alert.alert('Please Select Document Name');
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <CustomButton
                        text={'+ Add More'}
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
                        onPress={() => setaddMoreIdenDet(true)}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignSelf: 'center',
                      width: '95%',
                    }}>
                    <CustomButton
                      text={'Skip For Now'}
                      textstyle={{fontSize: 12, color: '#2b8ada'}}
                      style={[
                        {
                          marginRight: '5%',
                          flex: 0.45,
                          borderColor: '#2b8ada',
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                        },
                        IdentificationDocs.length == 0
                          ? {flex: 1, alignSelf: 'center', marginRight: ' 0%'}
                          : null,
                      ]}
                      onPress={() => {
                        setShowIdenDet(false);
                        setShowAddInfo(true);
                        setdataSavedIdenDet(false);
                      }}
                    />
                    {IdentificationDocs.length > 0 ? (
                      <CustomButton
                        text={'Upload'}
                        textstyle={{color: 'white', fontSize: 12}}
                        style={{
                          backgroundColor: '#2b8ada',
                          padding: 5,
                          borderRadius: 10,
                          flex: 0.45,
                        }}
                        onPress={() => {
                          if (IdentificationDocs.length == 0)
                            Alert.alert('Please Fill Identification Details ');
                          else postIdenDet();
                        }}
                      />
                    ) : null}
                  </View>
                </View>
              </View>
            ) : null}
            {/* Clinic Information Label*/}
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={[
                  styles.whiteLabelView,
                  showAddInfo
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
                    showAddInfo
                      ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                      : null,
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedAddInfo ? {color: '#2B8ADA'} : null,
                    ]}>
                    Clinic Information
                  </Text>
                  <FAIcon
                    name={
                      showAddInfo
                        ? 'chevron-down'
                        : dataSavedAddInfo
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedAddInfo ? '#2B8ADA' : 'gray'}
                    style={[
                      styles.label,
                      {width: '10%', fontSize: 20},
                    ]}></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Clinic Information Body*/}
            {showAddInfo ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View style={{flexDirection: 'column', marginBottom: 10}}>
                    {ClinicDet.length > 0 ? (
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
                              <Text style={styles.cellHeadingText}>
                                Address
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Instructions
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
                        <ViewClinics />
                      </View>
                    ) : null}
                    {/* Add Clinic */}
                    {ClinicDet.length == 0 || addMoreAddInfo ? (
                      <View style={{width: '95%', alignSelf: 'center'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>Clinic Name</Text>
                          <TextInput
                            style={styles.textInput}
                            value={clinicName}
                            onChangeText={text => setClinicName(text)}
                          />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>Clinic Address</Text>
                          <TextInput
                            style={styles.textInput}
                            value={clinicAddress}
                            onChangeText={text => setClinicAddress(text)}
                          />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>
                            Special Instruction
                          </Text>
                          <TextInput
                            style={styles.textInput}
                            multiline={true}
                            value={specialInstruction}
                            onChangeText={text => setSpecialInstruction(text)}
                          />
                        </View>
                        <CustomButton
                          text="Save"
                          textstyle={{color: 'white', fontSize: 12}}
                          style={{
                            backgroundColor: '#2b8ada',
                            alignSelf: 'flex-end',
                            borderRadius: 5,
                            padding: 6,
                            paddingHorizontal: 10,
                            margin: 5,
                          }}
                          onPress={() => {
                            if (clinicAddress == '')
                              Alert.alert('Please fill Clinic Name ');
                            else if (clinicName == '')
                              Alert.alert('Please fill Clinic Address');
                            else {
                              let p = [
                                {
                                  clinicName: clinicName,
                                  clinicAddress: clinicAddress,
                                  specialInstruction: specialInstruction,
                                },
                              ];
                              if (
                                ClinicDet.findIndex(
                                  v =>
                                    v.clinicName == p[0].clinicName &&
                                    v.clinicAddress == p[0].clinicAddress,
                                ) == -1
                              ) {
                                let newArr = [...ClinicDet, ...p];
                                newArr = newArr.map((v, i) => {
                                  return {
                                    clinicSl: i + 1,
                                    clinicName: v.clinicName,
                                    clinicAddress: v.clinicAddress,
                                    specialInstruction: v.specialInstruction,
                                  };
                                });
                                // console.log("newArr--------");
                                // console.log(newArr);
                                setClinicDet(newArr);
                                setClinicAddress('');
                                setClinicName('');
                                setSpecialInstruction('');
                                setaddMoreAddInfo(false);
                                // console.log("ClinicDet--------");
                                // console.log(ClinicDet);
                              } else {
                                Alert.alert('Duplicate clinic details found.');
                              }
                            }
                          }}
                        />
                      </View>
                    ) : (
                      <View style={{flex: 1}}>
                        <CustomButton
                          text={'+ Add More'}
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
                          onPress={() => setaddMoreAddInfo(true)}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignSelf: 'center',
                        width: '95%',
                      }}>
                      <CustomButton
                        text={'Skip For Now'}
                        textstyle={{fontSize: 12, color: '#2b8ada'}}
                        style={[
                          {
                            marginRight: '5%',
                            flex: 0.45,
                            borderColor: '#2b8ada',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 10,
                          },
                          ClinicDet.length == 0
                            ? {flex: 1, alignSelf: 'center', marginRight: ' 0%'}
                            : null,
                        ]}
                        onPress={() => {
                          setShowAddInfo(false);
                          setShowPreConsultationQuestionaire(true);
                          setdataSavedAddInfo(false);
                        }}
                      />
                      {ClinicDet.length > 0 ? (
                        <CustomButton
                          text={'Upload'}
                          textstyle={{color: 'white', fontSize: 12}}
                          style={{
                            backgroundColor: '#2b8ada',
                            padding: 5,
                            borderRadius: 10,
                            flex: 0.45,
                          }}
                          onPress={() => {
                            if (ClinicDet.length == 0)
                              Alert.alert('Please Fill ClinicDet Details ');
                            else postClinicDet();
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {/* Preconsultation Questionnaire Label*/}
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={[
                  styles.whiteLabelView,
                  showPreConsultationQuestionaire
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
                    showPreConsultationQuestionaire
                      ? {
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#707070',
                        }
                      : null,
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedPreConsultationQuestionaire
                        ? {color: '#2B8ADA'}
                        : null,
                    ]}>
                    Pre Consultation Questionnaire
                  </Text>
                  <FAIcon
                    name={
                      showPreConsultationQuestionaire
                        ? 'chevron-down'
                        : dataSavedPreConsultationQuestionaire
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={
                      dataSavedPreConsultationQuestionaire ? '#2B8ADA' : 'gray'
                    }
                    style={[
                      styles.label,
                      {width: '10%', fontSize: 20},
                    ]}></FAIcon>
                </TouchableOpacity>
              </View>
            </View>
            {/* Preconsultation Questionnaire Body*/}
            {showPreConsultationQuestionaire ? (
              <View>
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        marginBottom: 10,
                      }}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Set PreConsultation Questionnaire
                      </Text>
                      <SelectList
                        placeholder={showQuestions ? 'Yes' : 'No'}
                        boxStyles={{
                          backgroundColor: '#e8f0fe',
                          borderWidth: 0,
                        }}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        setSelected={val =>
                          setShowQuestions(val === 'Yes' ? true : false)
                        }
                        onSelect={() => {
                          if (showQuestions == 'No') setQuestionareList('');
                        }}
                        data={dataShowQues}
                      />
                    </View>
                    {questionareList.length > 0 ? (
                      <View
                        style={{
                          marginBottom: 5,
                          width: '95%',
                          alignSelf: 'center',
                        }}>
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
                            <View style={[styles.cellHeading, {flex: 0.3}]}>
                              <Text style={styles.cellHeadingText}>S.No.</Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Speciality
                              </Text>
                            </View>
                            <View style={styles.cellHeading}>
                              <Text style={styles.cellHeadingText}>
                                Question
                              </Text>
                            </View>

                            <View
                              style={{
                                flex: 0.4,
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
                        <RenderQuestion />
                      </View>
                    ) : null}

                    {showQuestions ? (
                      <View
                        style={{flexDirection: 'column', marginVertical: 10}}>
                        <TouchableOpacity
                          style={[
                            styles.textInput,
                            {
                              alignSelf: 'center',
                              justifyContent: 'space-evenly',
                              flexDirection: 'row',
                              width: '95%',
                              backgroundColor: '#2b8ada',
                            },
                          ]}
                          onPress={() => setQuestionare(true)}>
                          <FAIcon
                            name="plus"
                            color={'white'}
                            size={20}
                            style={{alignSelf: 'center'}}
                          />
                          <Text style={[styles.label, {color: 'white'}]}>
                            Add Pre Consultation Questionnaire
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignSelf: 'center',
                        width: '95%',
                      }}>
                      <CustomButton
                        text={'Skip For Now'}
                        textstyle={{fontSize: 12, color: '#2b8ada'}}
                        style={[
                          {
                            marginRight: '5%',
                            flex: 0.45,
                            borderColor: '#2b8ada',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 10,
                          },
                        ]}
                        onPress={() => {
                          setShowPreConsultationQuestionaire(false);
                          setShowConsultFees(true);
                          setdataSavedAddInfo(false);
                        }}
                      />
                      <CustomButton
                        text={'Upload'}
                        textstyle={{color: 'white', fontSize: 12}}
                        style={{
                          flex: 0.45,
                          backgroundColor: '#2b8ada',
                          padding: 5,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          if (questionareList.length == 0 && showQuestions)
                            Alert.alert('Please Add Questions ');
                          else if (showQuestions == false) {
                            setShowPreConsultationQuestionaire(false);
                            setShowConsultFees(true);
                            setdataSavedPreConsultationQuestionaire(true);
                          } else {
                            postPreConsultQues();
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {questionare ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={questionare}
                onRequestClose={() => {
                  setQuestionare(!questionare);
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
                        Add Pre Consultation Questionnaire
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
                        onPress={() => setQuestionare(false)}
                      />
                    </View>
                    <View
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        marginBottom: 10,
                      }}>
                      {questionareList.length > 0 ? (
                        <View style={{marginBottom: 5}}>
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
                              <View style={[styles.cellHeading, {flex: 0.3}]}>
                                <Text style={styles.cellHeadingText}>
                                  S.No.
                                </Text>
                              </View>
                              <View style={styles.cellHeading}>
                                <Text style={styles.cellHeadingText}>
                                  Speciality
                                </Text>
                              </View>
                              <View style={styles.cellHeading}>
                                <Text style={styles.cellHeadingText}>
                                  Question
                                </Text>
                              </View>

                              <View
                                style={{
                                  flex: 0.4,
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
                          <RenderQuestion />
                        </View>
                      ) : null}

                      {questionareList.length == 0 ||
                      addMorePreConsultationQuestionaire ? (
                        <View>
                          <View>
                            <Text style={[styles.inputLabel, {marginTop: 0}]}>
                              Select Speciality
                            </Text>
                            <SelectList
                              boxStyles={{
                                backgroundColor: '#e8f0fe',
                                borderWidth: 0,
                              }}
                              dropdownTextStyles={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                              }}
                              setSelected={setquestionSpl}
                              data={splArray}
                            />
                          </View>
                          <View
                            style={{
                              width: '100%',
                              alignSelf: 'center',
                              marginBottom: 5,
                            }}>
                            <Text
                              style={[styles.inputLabel, {marginBottom: 5}]}>
                              Write Question
                            </Text>

                            <View
                              style={{
                                height: 80,
                                textAlignVertical: 'top',
                                width: '100%',
                                borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 5,
                                alignSelf: 'center',
                              }}>
                              <TextInput
                                placeholder="Write your Question Here"
                                style={{
                                  textAlign: 'left',
                                  alignSelf: 'center',
                                  width: '80%',
                                  fontSize: 13,
                                }}
                                maxLength={50}
                                value={consultationQuestion}
                                onChangeText={text =>
                                  setConsultationQuestion(text)
                                }
                              />
                            </View>
                          </View>
                          <Text>
                            {50 - consultationQuestion.length} words left
                          </Text>
                          <CustomButton
                            text="Save"
                            textstyle={{color: '#2B8ADA', fontSize: 10}}
                            style={{
                              borderColor: '#2B8ADA',
                              borderWidth: 1,
                              alignSelf: 'flex-end',
                              marginVertical: 5,
                              padding: 5,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              if (consultationQuestion !== '') {
                                // questionareList.push({
                                //   questions: consultationQuestion,
                                //   speciality: questionSpl,
                                // });
                                let p = {
                                  questions: consultationQuestion,
                                  speciality: questionSpl,
                                };
                                let arr = [...questionareList];
                                arr.push(p);
                                setQuestionareList(arr);
                              }
                              setConsultationQuestion('');
                            }}
                          />
                        </View>
                      ) : (
                        <View style={{flex: 1}}>
                          <CustomButton
                            text={'+ Add More'}
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
                            onPress={() =>
                              setaddMorePreConsultationQuestionaire(true)
                            }
                          />
                        </View>
                      )}
                    </View>

                    <CustomButton
                      text="Done"
                      textstyle={{color: 'white'}}
                      style={{
                        width: '95%',
                        backgroundColor: '#2B8ADA',
                        marginVertical: 5,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                      onPress={() => setQuestionare(false)}
                    />
                  </View>
                </View>
              </Modal>
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
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {width: '90%'},
                      dataSavedConsultFees ? {color: '#2B8ADA'} : null,
                    ]}>
                    Consultation Fees
                  </Text>
                  <FAIcon
                    name={
                      showConsultFees
                        ? 'chevron-down'
                        : dataSavedConsultFees
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    color={dataSavedConsultFees ? '#2B8ADA' : 'gray'}
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
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}>
                      <Text style={styles.inputLabel}>
                        Physical Consultation Fees
                      </Text>
                      <TextInput
                        style={[styles.textInput]}
                        maxLength={5}
                        keyboardType={'number-pad'}
                        onChangeText={text => setphysicalConsulationFees(text)}
                        value={physicalConsulationFees}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}>
                      <Text style={styles.inputLabel}>E-Consultation Fees</Text>
                      <TextInput
                        style={[styles.textInput]}
                        maxLength={5}
                        keyboardType={'number-pad'}
                        onChangeText={text => seteConsulationFees(text)}
                        value={eConsulationFees}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}>
                      <Text style={styles.inputLabel}>Follow-Up Fees</Text>
                      <TextInput
                        style={[styles.textInput]}
                        keyboardType={'number-pad'}
                        maxLength={5}
                        onChangeText={text => setfollowUpFees(text)}
                        value={followUpFees}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                      }}>
                      <Text style={styles.inputLabel}>
                        Duration of Follow-Up
                      </Text>
                      <SelectList
                        defaultOption={'4'}
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
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignSelf: 'center',
                      width: '95%',
                    }}>
                    <CustomButton
                      text={'Skip For Now'}
                      textstyle={{fontSize: 12, color: '#2b8ada'}}
                      style={[
                        {
                          marginRight: '5%',
                          flex: 0.45,
                          borderColor: '#2b8ada',
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                        },
                      ]}
                      onPress={() => {
                        setShowConsultFees(false);
                        setdataSavedConsultFees(false);
                      }}
                    />
                    <CustomButton
                      text={'Upload'}
                      textstyle={{color: 'white', fontSize: 12}}
                      style={{
                        flex: 0.45,
                        backgroundColor: '#2b8ada',
                        padding: 5,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        if (showFollowUp == '')
                          Alert.alert('Please Add Follow-Up Duration');
                        else {
                          postConsultFees();
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            {/* Buttons */}
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginVertical: 15,
              }}>
              <CustomButton
                text="Do it Later"
                textstyle={{
                  color: '#2b8ada',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                style={{
                  marginRight: '5%',
                  borderColor: '#2b8ada',
                  borderWidth: 2,
                  flex: 0.475,
                  marginBottom: 50,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate('DoctorHome');
                }}></CustomButton>
              <CustomButton
                text="Submit"
                textstyle={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                style={{
                  flex: 0.475,
                  marginBottom: 50,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#2b8ada',
                }}
                onPress={() => {
                  Alert.alert(completePercentage + ' Profile Details Filled');
                  navigation.navigate('DoctorHome');
                }}></CustomButton>
            </View>
          </View>
        </ScrollView>

        {isLoading && (
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
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#2B8ADA',
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
    fontSize: 11,
    marginVertical: 5,
  },
});

export default DoctorRegistration2;
