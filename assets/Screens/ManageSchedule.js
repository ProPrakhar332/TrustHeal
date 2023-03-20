import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements';
import waiting from '../Animations/waiting1.gif';
import searching from '../Animations/heartLoading1.gif';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import timeformatter from '../API/timeformatter';
import axios from 'axios';
//images
import pfp1 from '../Resources/pfp1.jpg';
import chatting from '../Resources/chattingMedium.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DaysCreator from '../API/slotscreate';
import {useIsFocused} from '@react-navigation/native';
import clinicMaker from '../API/ClincMaker';
import DayDateMaker from '../API/DayDateMaker';
import dayjs from 'dayjs';

const dataMode = [
  {key: 'VIDEO_CALL', value: 'Video'},
  {key: 'PHONE_CALL', value: 'Phone'},
];

const ManageSchedule = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isChecking, setisChecking] = useState(false);
  const [MsgHeading, setMsgHeading] = useState('');
  const [MsgUnderText, setMsgUnderText] = useState('');

  const [manageSlotsLabel, setmanageSlotsLabel] = useState(false);
  const [manageClinicsLabel, setmanageClinicsLabel] = useState(false);
  const [managePreConsultQues, setmanagePreConsultQues] = useState(false);
  const [editQues, seteditQues] = useState(false);
  const [QuestionsModal, setQuestionsModal] = useState(false);
  const [questionareList, setQuestionareList] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [questions, setquestions] = useState('');
  const [ClinicDetEdit, setClinicDetEdit] = useState(false);
  const [ManageClinic, setManageClinic] = useState([]);
  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');
  const [clinicId, setclinicId] = useState('');
  const [clinicPhoto, setclinicPhoto] = useState(0);
  const [specialInstruction, setspecialInstruction] = useState('');
  const [ClinicModal, setClinicModal] = useState(false);
  const [editClinic, seteditClinic] = useState(false);

  const [SlotView, setSlotView] = useState(false);
  const [ViewSchedulesModal, setViewSchedulesModal] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
  const [selectedDateArray, setselectedDateArray] = useState([]);
  //View E-consultation
  const [ViewEConsultations, setViewEConsultations] = useState(true);
  const [viewEDates, setviewEDates] = useState([]);
  const [viewESlots, setviewESlots] = useState([]);
  //View P-consultation
  const [ViewPConsultations, setViewPConsultations] = useState(false);
  const [viewPDates, setviewPDates] = useState(null);
  const [viewPSlots, setviewPSlots] = useState(null);
  const [PCclinicId, setPCclinicId] = useState('');
  const [PCclinicName, setPCclinicName] = useState('');
  const [PCclinicAddress, setPCclinicAddress] = useState('');

  const [CreateSchedulesModal, setCreateSchedulesModal] = useState(false);
  const [DeleteSchedulesModal, setDeleteSchedulesModal] = useState(false);
  const [DeleteSlotsList, setDeleteSlotsList] = useState([]);

  //CREATE P-CONSULTATION TAB
  const [CreatePConsultations, setCreatePConsultations] = useState(true);
  const [PCDate, setPCDate] = useState('');
  const [PCinTime, setPCinTime] = useState('');
  const [PCinTimeHH, setPCinTimeHH] = useState('');
  const [PCinTimeMM, setPCinTimeMM] = useState('');
  const [PCoutTime, setPCoutTime] = useState('');
  const [PCoutTimeHH, setPCoutTimeHH] = useState('');
  const [PCoutTimeMM, setPCoutTimeMM] = useState('');
  const [PCduration, setPCduration] = useState(0);
  const [PCspecialInstruction, setPCspecialInstruction] = useState('');
  const [PCCreateClinicID, setPCCreateClinicID] = useState('');
  const [PCCreateClinicName, setPCCreateClinicName] = useState('');
  const [PCCreateClinicAddress, setPCCreateClinicAddress] = useState('');
  //const [PCData, setPCData] = useState([]);
  //CREATE E-CONSULTATION TAB
  const [CreateEConsultations, setCreateEConsultations] = useState(false);
  const [ECDate, setECDate] = useState('');
  const [EconsultMode, setEconsultMode] = useState('');
  const [ECinTime, setECinTime] = useState('');
  const [ECinTimeHH, setECinTimeHH] = useState('');
  const [ECinTimeMM, setECinTimeMM] = useState('');
  const [ECoutTime, setECoutTime] = useState('');
  const [ECoutTimeHH, setECoutTimeHH] = useState('');
  const [ECoutTimeMM, setECoutTimeMM] = useState('');
  const [ECduration, setECduration] = useState('');
  const [ECGap, setECGap] = useState('');
  //const [ECData, setECData] = useState([]);

  const [ClinicDet, setClinicDet] = useState([]);
  const [DaysSlot, setDaysSlot] = useState([]);
  const [DaysSlotRefresh, setDaysSlotRefresh] = useState(false);
  const [Days, setDays] = useState(null);
  const [doctorId, setdoctorId] = useState(0);
  const [consultationType, setconsultationType] = useState(null);
  const [selectAll, setselectAll] = useState(false);

  //view images
  const [DisplayPhotoToken, setDisplayPhotoToken] = useState(0);
  const [ImageViewer, setImageViewer] = useState(false);
  const [ClinicViewer, setClinicViewer] = useState(null);
  const [ECStartViewer, setECStartViewer] = useState(false);
  const [ECEndViewer, setECEndViewer] = useState(false);
  const [PCStartViewer, setPCStartViewer] = useState(false);
  const [PCEndViewer, setPCEndViewer] = useState(false);

  const showDatePicker = async () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmECIn = async time => {
    console.log(dayjs(time).format('HH:mm'));
    setECinTime(dayjs(time).format('hh:mm A'));
    let time1 = dayjs(time).format('HH:mm').split(':');
    console.log(time1);
    setECinTimeHH(time1[0]);
    setECinTimeMM(time1[1]);
    setECStartViewer(false);
  };
  const handleConfirmECOut = async time => {
    console.log(dayjs(time).format('HH:mm'));
    setECoutTime(dayjs(time).format('hh:mm A'));
    let time1 = dayjs(time).format('HH:mm').split(':');
    console.log(time1);
    setECoutTimeHH(time1[0]);
    setECoutTimeMM(time1[1]);
    setECEndViewer(false);
  };
  const handleConfirmPCIn = async time => {
    console.log(dayjs(time).format('HH:mm'));
    setPCinTime(dayjs(time).format('hh:mm A'));
    let time1 = dayjs(time).format('HH:mm').split(':');
    console.log(time1);
    setPCinTimeHH(time1[0]);
    setPCinTimeMM(time1[1]);
    setPCStartViewer(false);
  };
  const handleConfirmPCOut = async time => {
    console.log(dayjs(time).format('HH:mm'));
    setPCoutTime(dayjs(time).format('hh:mm A'));
    let time1 = dayjs(time).format('HH:mm').split(':');
    console.log(time1);
    setPCoutTimeHH(time1[0]);
    setPCoutTimeMM(time1[1]);
    setPCEndViewer(false);
  };
  useEffect(() => {
    const onLoadSetData = async () => {
      setDaysSlot(DaysCreator);
      //console.log(DaysSlot);
      setselectedDate('');
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      setdoctorId(Number(x.doctorId));
      console.log(doctorId);
    };
    onLoadSetData();
  }, []);
  useEffect(() => {
    if (manageSlotsLabel == true) {
      setViewEConsultations(true);
      setViewPConsultations(false);
    }
  }, [manageSlotsLabel]);

  useEffect(() => {
    const getQuestions = async () => {
      axios
        .get(
          apiConfig.baseUrl +
            '/doctor/pre/consultation/questions?doctorId=' +
            doctorId,
        )
        .then(response => {
          if (response.status == 200) setQuestionareList(response.data);
          else Alert.alert('Error', 'Error in fetching questions');
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };

    if (
      (managePreConsultQues == true && doctorId != 0) ||
      QuestionsModal == false
    ) {
      getQuestions();
    }
  }, [managePreConsultQues, QuestionsModal]);

  //dynamic loading
  useEffect(() => {
    // const getEDates = async () => {
    //   let x = JSON.parse(await AsyncStorage.getItem("UserDoctorProfile"));
    //   setviewESlots("");
    //   setviewPDates("");
    //   let doctorId = Number(x.doctorId);
    //   axios
    //     .get(apiConfig.baseUrl + "/slot/dates/eslot?doctorId=" + doctorId)
    //     .then(function (response) {
    //       setviewEDates(DayDateMaker(response.data));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };
    if (ViewEConsultations == true) getEDates();
  }, [ViewEConsultations]);

  useEffect(() => {
    const getClinicDet = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      let doctorId = Number(x.doctorId);

      setviewPSlots('');
      setPCclinicAddress('');

      axios
        .get(apiConfig.baseUrl + '/doctor/clinic/details?doctorId=' + doctorId)
        .then(function (response) {
          console.log(response.data);
          setManageClinic(response.data);
          setClinicDet(clinicMaker(response.data));
        })
        .catch(function (error) {
          console.log('=====Get Clinic Detail=====');
          console.log(error);
        });
    };
    if (
      ViewPConsultations == true ||
      CreatePConsultations == true ||
      manageClinicsLabel == true
    )
      getClinicDet();
  }, [ViewPConsultations, CreatePConsultations, manageClinicsLabel]);

  const getEDates = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    setviewESlots('');
    setviewPDates('');
    let doctorId = Number(x.doctorId);
    axios
      .get(apiConfig.baseUrl + '/slot/eslot/dates?doctorId=' + doctorId)
      .then(function (response) {
        setviewEDates(DayDateMaker(response.data));
      })
      .catch(function (error) {
        console.log('=====Get Eslot Dates Detail=====');

        console.log(error);
      });
  };

  const getPDates = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);

    setviewPSlots('');
    setPCclinicAddress('');

    axios
      .get(apiConfig.baseUrl + '/slot/clinic/details?doctorId=' + doctorId)
      .then(function (response) {
        setClinicDet(clinicMaker(response.data));
      })
      .catch(function (error) {
        console.log('=====Get PSlot Dates Detail=====');

        console.log(error);
      });
  };

  useEffect(() => {
    const getDate = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      let doctorId = Number(x.doctorId);
      setviewPDates('');
      setviewPSlots('');

      axios
        .get(
          apiConfig.baseUrl +
            '/slot/pslot/dates?doctorId=' +
            doctorId +
            '&clinicId=' +
            PCclinicId,
        )
        .then(function (response) {
          setviewPDates(DayDateMaker(response.data));
        })
        .catch(function (error) {
          console.log('=====View PSlot Dates by Clinic Detail=====');
          console.log(error);
        });
    };
    if (PCclinicId != '') getDate();
  }, [PCclinicId]);

  //get data of slots and dates
  const getEViewSlots = async date => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    var doctorId = Number(x.doctorId);
    axios
      .get(
        apiConfig.baseUrl +
          '/slot/eslot/all?date=' +
          date +
          '&doctorId=' +
          doctorId,
      )
      .then(function (response) {
        console.log(response.data);
        let x = response.data;
        x.forEach(item => {
          item.toDelete = false;
        });
        setviewESlots(x);
        //console.log(viewESlots === "");
      })
      .catch(function (error) {
        console.log('=====Get Eslot date Detail=====');

        console.log(error);
      });
  };
  const getPViewSlots = async date => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);

    console.log(
      apiConfig.baseUrl +
        '/slot/pslots/all?doctorId=' +
        doctorId +
        '&clinicId=' +
        PCclinicId +
        '&date=' +
        date,
    );
    axios
      .get(
        apiConfig.baseUrl +
          '/slot/pslots/all?doctorId=' +
          doctorId +
          '&clinicId=' +
          PCclinicId +
          '&date=' +
          date,
      )
      .then(function (response) {
        //console.log(response.data);
        let x = response.data;
        x.forEach(item => {
          item.toDelete = false;
        });
        setviewPSlots(x);
      })
      .catch(function (error) {
        console.log('=====Get pslots for clinic Detail=====');

        console.log(error);
      });
  };

  const pushSlot = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);
    let PCData = [];
    let availablePslots = [];
    setisChecking(true);
    console.log(selectedDateArray);

    DateArray = [...new Set(selectedDateArray)];

    console.log(DateArray[0]);

    for (let it = 0; it < DateArray.length; ++it) {
      setMsgUnderText('Processing');

      let availableEslots = [];

      //get available slots by date
      console.log(
        apiConfig.baseUrl +
          '/doctor/total/slots?date=' +
          DateArray[it] +
          '&doctorId=' +
          doctorId,
      );

      await axios
        .get(
          apiConfig.baseUrl +
            '/doctor/total/slots?date=' +
            DateArray[it] +
            '&doctorId=' +
            doctorId,
        )
        .then(response => {
          if (response.status == 200) {
            availableEslots = response.data;
          }
        })
        .catch(error => {
          Alert.alert('Error in push get', `${error}`);
        });

      console.log(`Available slots of ${DateArray[it]}\n`, availableEslots);

      //setMsgHeading('Processing...');
      setMsgUnderText('Checking for duplicate slots');

      let p = {
        clinicId: PCCreateClinicID,
        date: selectedDate,
        doctorId: doctorId,
        duration: Number(PCduration),
        endTime:
          (PCoutTimeHH.length == 1 ? '0' + PCoutTimeHH : PCoutTimeHH) +
          ':' +
          (PCoutTimeMM.length == 1 ? '0' + PCoutTimeMM : PCoutTimeMM),
        startTime:
          (PCinTimeHH.length == 1 ? '0' + PCinTimeHH : PCinTimeHH) +
          ':' +
          (PCinTimeMM.length == 1 ? '0' + PCinTimeMM : PCinTimeMM),
      };

      if (availableEslots.length == 0) {
        //console.log(p);
        PCData.push(p);
      } else {
        let flag = 0;
        for (var i = 0; i < availableEslots.length; ++i) {
          let endTime = availableEslots[i].endTime;
          let startTime = availableEslots[i].startTime;
          let time1 = startTime.split(':');
          let time2 = endTime.split(':');
          if (
            (Number(PCinTimeHH) <= Number(time1[0]) &&
              Number(time1[0]) <= Number(PCinTimeHH)) ||
            (Number(PCoutTimeHH) <= Number(time2[0]) &&
              Number(time2[0]) <= Number(PCoutTimeHH))
          ) {
            if (availableEslots[i].slotStatus != 'DELETED_BY_DOCTOR') {
              flag = 1;
              break;
            }
          }
        }
        if (flag != 1) {
          PCData.push(p);
        }
      }
      setMsgUnderText('');
    }

    console.log('===============Final Push is===========\n', PCData);

    if (PCData != '') {
      await axios
        .post(apiConfig.baseUrl + '/doctor/slots/e/create', PCData)
        .then(function (response) {
          console.log(response.status);
          if (response.status == 200) {
            Alert.alert('Done', 'Slot has been added successfully');
            //setECData([]);
            getPDates();
            setisChecking(false);
            resetDays();
          } else Alert.alert('Error', 'There was some problem please try again');
        })
        .catch(function (error) {
          console.log('=====Create eslots=====');
          resetDays();
          setisChecking(false);
          console.log(error);
        });
    } else {
      setisChecking(false);
    }

    let p = {
      clinicId: PCCreateClinicID,
      date: selectedDate,
      doctorId: doctorId,
      duration: Number(PCduration),
      endTime:
        (PCoutTimeHH.length == 1 ? '0' + PCoutTimeHH : PCoutTimeHH) +
        ':' +
        (PCoutTimeMM.length == 1 ? '0' + PCoutTimeMM : PCoutTimeMM),
      startTime:
        (PCinTimeHH.length == 1 ? '0' + PCinTimeHH : PCinTimeHH) +
        ':' +
        (PCinTimeMM.length == 1 ? '0' + PCinTimeMM : PCinTimeMM),
    };
    console.log(p);

    if (availablePslots.length == 0) {
      PCData.push(p);
      axios
        .post(apiConfig.baseUrl + '/doctor/slots/p/create', PCData)
        .then(function (response) {
          console.log(response.status);
          if (response.status == 201 || response.status == 200) {
            //Alert.alert('Done', 'Slot has been added successfully');

            getPDates();
          } else Alert.alert('Error', 'There was some problem please try again');
        })
        .catch(function (error) {
          console.log('=====Get Create PSlots=====');
          Alert.alert(
            'Error',
            `There was some problem please try again.\n ${error}`,
          );

          console.log(error);
        });
    } else {
      let flag = 0;
      for (var i = 0; i < availablePslots.length; ++i) {
        let endTime = availablePslots[i].endTime;
        let startTime = availablePslots[i].startTime;
        let time1 = startTime.split(':');
        let time2 = endTime.split(':');
        if (
          (Number(PCinTimeHH) <= Number(time1[0]) &&
            Number(time1[0]) <= Number(PCinTimeHH)) ||
          (Number(PCoutTimeHH) <= Number(time2[0]) &&
            Number(time2[0]) <= Number(PCoutTimeHH))
        ) {
          flag = 1;
          break;
        }
      }

      if (flag == 1) {
        Alert.alert(
          'Overlapping Slot',
          'This time slot overlaps with the existing ones.\nPlease enter new time slot.',
        );
        setPCData([]);
        await reset();
      } else {
        PCData.push(p);
        axios
          .post(apiConfig.baseUrl + '/doctor/slots/p/create', PCData)
          .then(function (response) {
            console.log(response.status);
            if (response.status == 201 || response.status == 200) {
              Alert.alert('Done', 'Slot has been added successfully');
              setPCData([]);
              getPDates();
            } else Alert.alert('Error', 'There was some problem please try again');
          })
          .catch(function (error) {
            Alert.alert(
              'Error',
              `There was some problem please try again.\n ${error}`,
            );
            console.log('=====Create p slots=====');

            console.log(error);
            //setPCData([]);
          });
      }
      console.log(PCData);
    }
  };

  const pushESlot = async () => {
    setCreateSchedulesModal(false);
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);
    let ECData = [];
    setisChecking(true);
    console.log(selectedDateArray);

    DateArray = [...new Set(selectedDateArray)];

    console.log(DateArray[0]);

    for (let it = 0; it < DateArray.length; ++it) {
      setMsgUnderText('Processing');

      let availableEslots = [];

      //get available slots by date
      console.log(
        apiConfig.baseUrl +
          '/doctor/total/slots?date=' +
          DateArray[it] +
          '&doctorId=' +
          doctorId,
      );

      await axios
        .get(
          apiConfig.baseUrl +
            '/doctor/total/slots?date=' +
            DateArray[it] +
            '&doctorId=' +
            doctorId,
        )
        .then(response => {
          if (response.status == 200) {
            availableEslots = response.data;
          }
        })
        .catch(error => {
          Alert.alert('Error in push get', `${error}`);
        });

      console.log(`Available slots of ${DateArray[it]}\n`, availableEslots);

      //setMsgHeading('Processing...');
      setMsgUnderText('Checking for duplicate slots');

      let p = {
        consultationDate: DateArray[it],
        consultationEndTime:
          (ECoutTimeHH.length == 1 ? '0' + ECoutTimeHH : ECoutTimeHH) +
          ':' +
          (ECoutTimeMM.length == 1 ? '0' + ECoutTimeMM : ECoutTimeMM),
        consultationStartTime:
          (ECinTimeHH.length == 1 ? '0' + ECinTimeHH : ECinTimeHH) +
          ':' +
          (ECinTimeMM.length == 1 ? '0' + ECinTimeMM : ECinTimeMM),

        doctorId: doctorId,
        gap: Number(ECGap),
        slotDuration: Number(ECduration),
        typeOfEConsultation: EconsultMode,
      };

      if (availableEslots.length == 0) {
        //console.log(p);
        ECData.push(p);
      } else {
        let flag = 0;
        for (var i = 0; i < availableEslots.length; ++i) {
          let endTime = availableEslots[i].endTime;
          let startTime = availableEslots[i].startTime;
          let time1 = startTime.split(':');
          let time2 = endTime.split(':');
          if (
            (Number(ECinTimeHH) <= Number(time1[0]) &&
              Number(time1[0]) <= Number(ECinTimeHH)) ||
            (Number(ECoutTimeHH) <= Number(time2[0]) &&
              Number(time2[0]) <= Number(ECoutTimeHH))
          ) {
            if (availableEslots[i].slotStatus != 'DELETED_BY_DOCTOR') {
              flag = 1;
              break;
            }
          }
        }
        if (flag != 1) {
          ECData.push(p);
        }
      }
      setMsgUnderText('');
    }

    console.log('===============Final Push is===========\n', ECData);

    if (ECData != '') {
      await axios
        .post(apiConfig.baseUrl + '/doctor/slots/e/create', ECData)
        .then(function (response) {
          console.log(response.status);
          if (response.status == 200) {
            Alert.alert('Done', 'Slot has been added successfully');
            //setECData([]);
            getEDates();
            setisChecking(false);
            resetDays();
          } else Alert.alert('Error', 'There was some problem please try again');
        })
        .catch(function (error) {
          console.log('=====Create eslots=====');
          resetDays();
          setisChecking(false);
          console.log(error);
        });
    } else {
      setisChecking(false);
    }
    //Alert.alert('Done', 'Slot has been added successfully');
  };

  const reset = async () => {
    setPCCreateClinicAddress('');
    setPCCreateClinicName('');
    setPCclinicId('');
    setselectedDate('');
    setPCinTimeHH('');
    setPCinTimeMM('');
    setPCoutTimeHH('');
    setPCoutTimeMM('');
    setPCduration('');
    setECinTime('');
    setECoutTime('');
    setPCinTime('');
    setPCoutTime('');

    setECinTimeHH('');
    setECinTimeMM('');
    setECoutTimeHH('');
    setECoutTimeMM('');
    setECduration('');
    setECGap('');
    setselectedDate('');
  };

  const updateClinic = async item => {
    let amp = [];
    amp.push(item);

    axios
      .post(apiConfig.baseUrl + '/doctor/clinic/save', amp)
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          Alert.alert(
            'Updated',
            'Clinic Details has been updated successfully!',
          );
          setClinicModal(false);
        }
      })
      .catch(function (error) {
        console.log('Error in Clinic Update', `${error}`);
        Alert.alert('Error in Clinic Update', `${error}`);
      });
  };
  const deleteClinic = async id => {
    axios
      .delete(apiConfig.baseUrl + '/doctor/clinic/disable?clinicId=' + id)
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          Alert.alert('Deleted', 'Clinic has been deleted successfully!');
          setmanageClinicsLabel(false);
        }
      })
      .catch(function (error) {
        console.log('Error in Clinic Deletion', error);
        Alert.alert('Error in Clinic Deletion', `${error}`);
      });
  };
  //post photo exp/clinic
  const choosePhoto = async forField => {
    Alert.alert(
      'Upload Profile Picture',
      'Select option for uploading profile picture',
      [
        {
          text: 'Open Library',
          onPress: () => {
            launchImageLibrary({mediaType: 'photo'}, async response => {
              console.log(response);
              if (response.didCancel) console.log('Cancel');
              else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
              } else {
                if (response.assets[0].fileSize <= 2097152) {
                  await postPhoto(response.assets[0], forField);
                } else
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
            requestCamera(forField);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const requestCamera = async forField => {
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
        await launchcameraPhoto(forField);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchcameraPhoto = async forField => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', saveToPhotos: true},
      async response => {
        console.log(response);
        if (response.didCancel) console.log('Cancel');
        else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets[0].fileSize <= 2097152) {
            await postPhoto(response.assets[0], forField);
          } else
            Alert.alert(
              'Max Size',
              'The file exceeds the maximum limit of 2MB.',
            );
        }
      },
    );
  };
  const postPhoto = async (pickerResult, forField) => {
    try {
      console.log(`==============Inside post photo for ${forField}==========`);

      let ext = '.' + pickerResult.fileName.split('.').pop();

      delete pickerResult.fileName;
      pickerResult.size = pickerResult.fileSize;
      delete pickerResult.fileSize;
      if (forField == 'Clinic')
        pickerResult.name = doctorId + '_ClinicPhoto' + ext;

      if (forField == 'Experience')
        pickerResult.name = doctorId + '_ExpPhoto' + ext;

      console.log(pickerResult.name);
      console.log(pickerResult);

      let formData = new FormData();
      formData.append(
        'directoryNames',
        forField == 'Clinic' ? ' DOCTOR_CLINIC' : ' DOCTOR_EXPERIENCE',
      );
      formData.append('file', pickerResult);
      formData.append('userId', doctorId);

      if (forField == 'Experience' && expPhotoPath != 0)
        formData.append('fileToken', expPhotoPath);

      if (forField == 'Clinic' && clinicPhoto != null)
        formData.append('fileToken', clinicPhoto);

      const {error, response} = await fileUpload(formData);

      if (error != null) {
        console.log('======error======');
        console.log(error);
        Alert.alert(
          'Error',
          'There was a problem in uploading profile picture. Please try again.',
        );
      } else {
        console.log('======response======');
        console.log(response.fileToken);
        if (forField == 'Clinic') setclinicPhoto(response.fileToken);
        if (forField == 'Experience') setexpPhotoPath(response.fileToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //render slots and dates
  const renderDaysSlot = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.date}
        style={[
          item.active ? styles.bubbleActive : styles.bubble,
          {
            width: 50,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          console.log(item.date);

          if (item.active) deleteSelectedDate(index);
          else insertSelectedDate(index);

          // setDaysSlotRefresh(!DaysSlotRefresh);
          // setDays(item);
          // setselectedDate(item.date);
        }}>
        <Text
          style={item.active ? styles.bubbleTitleActive : styles.bubbleTitle}>
          {dayjs(item.date).format('ddd') +
            '\n' +
            dayjs(item.date).format('DD')}
        </Text>
      </TouchableOpacity>
    );
  };

  const insertSelectedDate = index => {
    let temp = [...DaysSlot];
    temp[index].active = true;
    selectedDateArray.push(temp[index].date);
    setDaysSlot(temp);
  };
  const deleteSelectedDate = index => {
    let temp = [...DaysSlot];
    temp[index].active = false;

    let x = selectedDateArray.indexOf(temp[index].date);
    if (x != -1) {
      let m = [...selectedDateArray];
      m.splice(x, 1);
      setselectedDateArray(m);
    }
    setDaysSlot(temp);
  };

  const resetDays = () => {
    let temp = [...DaysSlot];
    temp.forEach(element => {
      element.active = false;
    });
    setDaysSlot(temp);
    setselectedDateArray([]);
  };

  const renderEViewDaysSlot = ({item}) => {
    return item.isActive ? (
      <TouchableOpacity
        style={[
          styles.bubbleActive,
          {
            width: 50,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          //console.log(item.date)
          setselectedDate(item.date);
          getEViewSlots(item.date);
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
            width: 50,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          setDaysSlotRefresh(!DaysSlotRefresh);
          setDays(item);
          viewEDates.forEach(x => (x.isActive = false));
          item.isActive = true;
          setselectedDate(item.date);
          getEViewSlots(item.date);
          //console.log(JSON.stringify(DaysSlot));
        }}>
        <Text style={styles.bubbleTitle}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPViewDaysSlot = ({item}) => {
    return item.isActive ? (
      <TouchableOpacity
        style={[
          styles.bubbleActive,
          {
            width: 50,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => {
          //console.log(item.date);
          setselectedDate(item.date);
          getPViewSlots(item.date);
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
            width: 50,
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={async () => {
          setselectedDate(item.date);
          setDays(item);
          viewPDates.forEach(x => (x.isActive = false));
          item.isActive = true;
          setDaysSlotRefresh(!DaysSlotRefresh);
          getPViewSlots(item.date);
        }}>
        <Text style={styles.bubbleTitle}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSlot = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.slotBackground,
          {
            justifyContent: 'center',
          },
          item.slotStatus == 'BOOKED'
            ? {backgroundColor: '#2b8ada'}
            : item.slotStatus == 'DELETED_BY_DOCTOR'
            ? {backgroundColor: '#eb4034', borderWidth: 0}
            : null,
        ]}
        onPress={() => {
          console.log(item.slotId);
        }}>
        {item.typeOfEConsultation != null ? (
          <FAIcon
            name={
              item.typeOfEConsultation == 'PHONE_CALL' ? 'phone-alt' : 'video'
            }
            size={12}
            color={
              item.slotStatus == 'BOOKED'
                ? 'white'
                : item.slotStatus == 'DELETED_BY_DOCTOR'
                ? 'white'
                : '#2b8ada'
            }
            style={{alignSelf: 'center', marginRight: 3}}
          />
        ) : null}
        <Text
          style={[
            item.slotStatus != 'CREATED'
              ? styles.slotTitleActive
              : styles.slotTitle,
          ]}>
          {timeformatter(item.startTime)} - {timeformatter(item.endTime)}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderESlotDelete = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.slotBackground,
          {
            justifyContent: 'center',
          },
          item.slotStatus == 'BOOKED'
            ? {backgroundColor: '#2b8ada'}
            : item.slotStatus == 'DELETED_BY_DOCTOR'
            ? {backgroundColor: '#eb4034', borderWidth: 0}
            : null,
          item.toDelete == true ? {backgroundColor: '#eb4034'} : null,
        ]}
        onPress={() => {
          console.log(item.slotId, item.slotStatus);
          if (item.slotStatus == 'CREATED') {
            if (item.toDelete == false) {
              //DeleteSlotsList.push(item.slotId);
              insertToDeleteE(item.slotId, index);
            } else {
              removeToDeleteE(item.slotId, index);
            }
          } else Alert.alert('Warning', 'This slot can not be deleted');
        }}>
        {item.typeOfEConsultation != null ? (
          <FAIcon
            name={
              item.typeOfEConsultation == 'PHONE_CALL' ? 'phone-alt' : 'video'
            }
            size={12}
            color={
              item.slotStatus == 'BOOKED'
                ? 'white'
                : item.slotStatus == 'DELETED_BY_DOCTOR'
                ? 'white'
                : item.toDelete == true
                ? 'white'
                : '#2b8ada'
            }
            style={{alignSelf: 'center', marginRight: 3}}
          />
        ) : null}
        <Text
          style={[
            item.slotStatus != 'CREATED'
              ? styles.slotTitleActive
              : styles.slotTitle,
            item.toDelete == true ? {color: 'white'} : null,
          ]}>
          {timeformatter(item.startTime)} - {timeformatter(item.endTime)}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectAllESlots = () => {
    let temp = [...viewESlots];
    temp.forEach(e => {
      if (e.slotStatus != 'BOOKED' && e.slotStatus != 'DELETED_BY_DOCTOR') {
        e.toDelete = true;
        DeleteSlotsList.push(e.slotId);
      }
    });
    setviewESlots(temp);
    setselectAll(true);
  };
  const deselectAllESlots = () => {
    let temp = [...viewESlots];
    temp.forEach(e => {
      e.toDelete = false;
    });
    setviewESlots(temp);
    setDeleteSlotsList([]);
    setselectAll(false);
  };

  const insertToDeleteE = (slotId, index) => {
    let temp = [...viewESlots];
    temp[index].toDelete = true;
    setviewESlots(temp);
    DeleteSlotsList.push(slotId);
    //setselectAll(true);
  };
  const removeToDeleteE = (slotId, index) => {
    let temp = [...viewESlots];
    temp[index].toDelete = false;
    setviewESlots(temp);

    let temp2 = [...DeleteSlotsList];
    let x = temp2.indexOf(slotId);

    if (x != -1) temp2.splice(x, 1);
    setDeleteSlotsList(temp2);
    //setselectAll(false);
  };

  const renderPSlotDelete = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.slotBackground,
          {
            justifyContent: 'center',
          },
          item.slotStatus == 'BOOKED'
            ? {backgroundColor: '#2b8ada'}
            : item.slotStatus == 'DELETED_BY_DOCTOR'
            ? {backgroundColor: '#eb4034', borderWidth: 0}
            : null,
          item.toDelete == true ? {backgroundColor: '#eb4034'} : null,
        ]}
        onPress={() => {
          console.log(item.slotId, item.slotStatus);
          if (item.slotStatus == 'CREATED') {
            if (item.toDelete == false) {
              //DeleteSlotsList.push(item.slotId);
              insertToDeleteP(item.slotId, index);
            } else {
              removeToDeleteP(item.slotId, index);
            }
          } else Alert.alert('Warning', 'This slot can not be deleted');
        }}>
        {item.typeOfEConsultation != null ? (
          <FAIcon
            name={
              item.typeOfEConsultation == 'PHONE_CALL' ? 'phone-alt' : 'video'
            }
            size={12}
            color={
              item.slotStatus == 'BOOKED'
                ? 'white'
                : item.slotStatus == 'DELETED_BY_DOCTOR'
                ? 'white'
                : item.toDelete == true
                ? 'white'
                : '#2b8ada'
            }
            style={{alignSelf: 'center', marginRight: 3}}
          />
        ) : null}
        <Text
          style={[
            item.slotStatus != 'CREATED'
              ? styles.slotTitleActive
              : styles.slotTitle,
            item.toDelete == true ? {color: 'white'} : null,
          ]}>
          {timeformatter(item.startTime)} - {timeformatter(item.endTime)}
        </Text>
      </TouchableOpacity>
    );
  };
  const selectAllPSlots = () => {
    let temp = [...viewPSlots];
    temp.forEach(e => {
      if (e.slotStatus != 'BOOKED' && e.slotStatus != 'DELETED_BY_DOCTOR') {
        e.toDelete = true;
        DeleteSlotsList.push(e.slotId);
      }
    });
    setviewPSlots(temp);
    setselectAll(true);
  };
  const deselectAllPSlots = () => {
    let temp = [...viewPSlots];
    temp.forEach(e => {
      e.toDelete = false;
    });
    setviewPSlots(temp);
    setDeleteSlotsList([]);
    setselectAll(false);
  };

  const insertToDeleteP = (slotId, index) => {
    let temp = [...viewPSlots];
    temp[index].toDelete = true;
    setviewESlots(temp);
    DeleteSlotsList.push(slotId);
  };

  const removeToDeleteP = (slotId, index) => {
    let temp = [...viewPSlots];
    temp[index].toDelete = false;
    setviewESlots(temp);

    let temp2 = [...DeleteSlotsList];
    let x = temp2.indexOf(slotId);

    if (x != -1) temp2.splice(x, 1);
    setDeleteSlotsList(temp2);
  };

  const deleteSlots = async () => {
    let temp = [...new Set(DeleteSlotsList)];

    let x = {
      consultationType: ViewEConsultations
        ? 'E_CONSULTATION'
        : 'P_CONSULTATION',
      doctorId: Number(doctorId),
      slotIds: temp,
    };

    // console.log('Delete JSON\n\n', x);
    // console.log(typeof temp);
    // console.log(typeof temp[0]);
    axios
      .delete(apiConfig.baseUrl + '/doctor/slots/delete', {
        data: x,
      })
      .then(response => {
        if (response.status == 200) {
          Alert.alert('Deleted', 'Selected slots are deleted successfully');
          setDeleteSchedulesModal(false);
        }
      })
      .catch(error => {
        console.log('Error');
        Alert.alert('Error', `${error}`);
      });
  };

  useEffect(() => {
    if (DeleteSchedulesModal == false) {
      setselectAll(false);
      setDeleteSlotsList([]);
      setconsultationType(null);
    } else {
      setselectedDate(null);
    }
  }, [DeleteSchedulesModal]);

  const ViewClinics = () => {
    return ManageClinic.map((ManageClinic, index) => {
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
              <Text style={styles.cellText}>{ManageClinic.clinicName}</Text>
            </View>
            {/* Start Date */}
            <View style={styles.cellStyle}>
              <Text style={styles.cellText}>{ManageClinic.clinicAddress}</Text>
            </View>

            <View
              style={[
                styles.cellStyle,
                {flexDirection: 'row', alignContent: 'space-around'},
              ]}>
              <TouchableOpacity
                style={{flexDirection: 'column', flex: 0.3}}
                onPress={async () => {
                  setDisplayPhotoToken(ManageClinic.clinicPhoto);
                  console.log(ManageClinic);
                  setClinicViewer(ManageClinic);
                  setImageViewer(true);
                }}>
                <FAIcon
                  name="file-image"
                  size={13}
                  color={'#2b8ada'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'column', flex: 0.3}}
                onPress={() => {
                  setclinicName(ManageClinic.clinicName);
                  setclinicAddress(ManageClinic.clinicAddress);
                  setclinicId(ManageClinic.clinicId);
                  setspecialInstruction(ManageClinic.specialInstruction);
                  setclinicPhoto(ManageClinic.clinicPhoto);
                  seteditClinic(true);
                  setClinicModal(true);
                }}>
                <FAIcon
                  name="edit"
                  size={13}
                  color={'#2b8ada'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'column', flex: 0.3}}
                onPress={() => {
                  Alert.alert(
                    'Delete Clinic',
                    'Are you sure you want to delete this clinic?',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                          deleteClinic(Number(ManageClinic.clinicId));
                          setmanageClinicsLabel(false);
                        },
                        style: {color: 'pink'},
                      },
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'Cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                }}>
                <FAIcon
                  name="trash"
                  size={13}
                  color={'red'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
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
            {/* S No. */}
            <View style={[styles.cellStyle, {flex: 0.15}]}>
              <Text style={{textAlign: 'center', fontSize: 10, padding: 5}}>
                {index + 1}
              </Text>
            </View>
            {/* Speciality */}
            {/* <View style={styles.cellStyle}>
              <Text style={{textAlign: 'center', fontSize: 10,padding: 5,}}>
                {questionareList.specialization}
              </Text>
            </View> */}
            {/* Question */}
            <View style={[styles.cellStyle, {flex: 0.6}]}>
              <Text style={{textAlign: 'center', fontSize: 10, padding: 5}}>
                {questionareList.questions}
              </Text>
            </View>

            {/* Actions */}
            <View
              style={[
                styles.cellStyle,
                {
                  flexDirection: 'row',

                  flex: 0.3,
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                },
              ]}>
              <TouchableOpacity
                style={{flexDirection: 'column', flex: 0.45, padding: 5}}
                onPress={() => {
                  console.log(questionareList);
                  setquestionId(questionareList.questionId);
                  setquestions(questionareList.questions);
                  seteditQues(true);
                  setQuestionsModal(true);
                }}>
                <FAIcon
                  name="edit"
                  size={13}
                  color={'#2b8ada'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{flexDirection: 'column', flex: 0.45, padding: 5}}
                onPress={async () =>
                  await removeQues(questionareList.questionId)
                }>
                <FAIcon name="trash" color={'red'} size={13} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };
  const removeQuestHandler = i => {
    setQuestionareList(questionareList.filter(obj => i !== obj.questionId));
  };

  const removeQues = async id => {
    axios
      .delete(apiConfig.baseUrl + '/doctor/question/delete?questionId=' + id)
      .then(response => {
        if (response.status == 200) {
          removeQuestHandler(id);
          Alert.alert(
            'Deleted',
            'The question has been deleted from questionnaire',
          );
        }
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };

  const updatePreConsultQues = async item => {
    axios
      .post(apiConfig.baseUrl + '/doctor/preconsultation/questions/save', item)
      .then(response => {
        if (response.status == 200)
          Alert.alert(
            'Done',
            'Question ' + (editQues ? 'updated' : 'added') + ' successfully!',
          );
        setquestions('');
        setQuestionsModal(false);
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
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
        <StatusBar animated={true} backgroundColor="#2B8ADA" />
        <ScrollView
          style={{
            backgroundColor: '#e8f0fe',
            // marginTop: 30,
            width: '100%',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <Header showMenu={false} title={'Manage Schedule'} />
          <View style={{width: '95%', alignSelf: 'center', marginVertical: 10}}>
            {/* Manage Clinics Label */}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setmanageClinicsLabel(!manageClinicsLabel)}>
              <FAIcon
                name="clinic-medical"
                size={15}
                color={manageClinicsLabel ? '#2b8ada' : 'gray'}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  manageClinicsLabel ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Manage Clinics
              </Text>
              <FAIcon
                name={manageClinicsLabel ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[
                  manageClinicsLabel ? {color: '#2B8ADA'} : {color: 'black'},
                ]}
              />
            </TouchableOpacity>
            {/* Manage Clinic Body */}
            {manageClinicsLabel ? (
              <View
                style={[
                  styles.whiteBodyView,
                  {width: '95%', alignSelf: 'center'},
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
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
                        <Text style={styles.cellHeadingText}>Address</Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 1,
                          paddingVertical: 1,
                          backgroundColor: '#2b8ada',
                        }}>
                        <Text style={styles.cellHeadingText}>Actions</Text>
                      </View>
                    </View>
                  </View>
                  <ViewClinics />
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
                        seteditClinic(false);
                        setClinicModal(true);
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
            {/* Manage Slots Label */}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setmanageSlotsLabel(!manageSlotsLabel)}>
              <FAIcon
                name="calendar-week"
                size={15}
                color={manageSlotsLabel ? '#2b8ada' : 'gray'}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  manageSlotsLabel ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Manage Slots
              </Text>
              <FAIcon
                name={manageSlotsLabel ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[
                  manageSlotsLabel ? {color: '#2B8ADA'} : {color: 'black'},
                ]}
              />
            </TouchableOpacity>
            {/* Manage Slots Body */}
            {manageSlotsLabel ? (
              <View
                style={[
                  styles.whiteBodyView,
                  {width: '95%', alignSelf: 'center'},
                ]}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  {/* Buttons */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 10,
                      borderWidth: 1,
                      borderRadius: 15,
                      borderColor: '#2b8ada',
                      width: '95%',
                      alignSelf: 'center',
                    }}>
                    <CustomButton
                      text={'E-CONSULTATIONS'}
                      textstyle={[
                        {fontSize: 10},
                        ViewEConsultations
                          ? {color: 'white'}
                          : {color: '#2b8ada'},
                      ]}
                      style={[
                        {flex: 0.5},
                        ViewEConsultations
                          ? {backgroundColor: '#2b8ada'}
                          : null,
                      ]}
                      onPress={() => {
                        setViewEConsultations(true);
                        setViewPConsultations(false);
                        setCreateEConsultations(true);
                        setCreatePConsultations(false);
                      }}
                    />
                    <CustomButton
                      text={'P-CONSULTATIONS'}
                      textstyle={[
                        {fontSize: 10},
                        ViewPConsultations
                          ? {color: 'white'}
                          : {color: '#2b8ada'},
                      ]}
                      style={[
                        {flex: 0.5},
                        ViewPConsultations
                          ? {backgroundColor: '#2b8ada'}
                          : null,
                      ]}
                      onPress={() => {
                        setViewPConsultations(true);
                        setViewEConsultations(false);
                        setCreateEConsultations(false);
                        setCreatePConsultations(true);
                      }}
                    />
                  </View>
                  {/* P-consultation clinic names */}
                  {ViewPConsultations ? (
                    <ScrollView
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 15,
                      }}>
                      <View style={{width: '95%', alignSelf: 'center'}}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View style={{flex: 1}}>
                            <Text style={styles.inputLabel}>
                              Select Clinic Name
                            </Text>
                            <SelectList
                              //defaultOption={ClinicDet[0].key}
                              placeholder={' '}
                              setSelected={item => {
                                setPCclinicId(item);
                              }}
                              data={ClinicDet}
                              save={'key'}
                              boxStyles={{
                                backgroundColor: '#E8F0FE',
                                borderWidth: 0,
                                borderRadius: 5,
                              }}
                              dropdownStyles={{backgroundColor: 'white'}}
                              dropdownTextStyles={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                              }}
                              badgeStyles={{backgroundColor: '#2b8ada'}}
                            />
                          </View>
                        </View>
                        {/* Slot Days */}
                        <Text
                          style={[
                            styles.inputLabel,
                            {
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                            },
                          ]}>
                          Slot Dates
                        </Text>
                        <View
                          style={{
                            flexDirection: 'column',
                          }}>
                          {viewPDates.length > 0 ? (
                            <View>
                              <FlatList
                                horizontal={true}
                                data={viewPDates}
                                extraData={DaysSlotRefresh}
                                keyExtractor={item => item.date}
                                renderItem={renderPViewDaysSlot}
                                style={{marginVertical: 10}}
                              />
                            </View>
                          ) : (
                            <View>
                              {PCclinicId == '' ? (
                                <Text
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                  }}>
                                  Please Select a Clinic
                                </Text>
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
                          )}
                        </View>
                        {/* Slot Timings */}
                        <Text
                          style={[
                            styles.inputLabel,
                            {
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                            },
                          ]}>
                          Slots
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                          }}>
                          {viewPSlots.length > 0 ? (
                            <View
                              style={{width: '100%', justifyContent: 'center'}}>
                              <FlatList
                                horizontal={false}
                                data={viewPSlots}
                                keyExtractor={(item, index) => index}
                                renderItem={renderSlot}
                                style={{
                                  marginVertical: 10,
                                  alignSelf: 'center',
                                }}
                                numColumns={2}
                                scrollEnabled={true}
                              />
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  justifyContent: 'space-evenly',
                                }}>
                                <CustomButton
                                  text="Add More Slots"
                                  style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                    backgroundColor: '#2b8ada',
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                  }}
                                  textstyle={{color: 'white', fontSize: 12}}
                                  onPress={() =>
                                    setCreateSchedulesModal(
                                      !CreateSchedulesModal,
                                    )
                                  }
                                />
                                <CustomButton
                                  text="Delete Slots"
                                  style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                    backgroundColor: 'red',
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                  }}
                                  textstyle={{color: 'white', fontSize: 12}}
                                  onPress={() =>
                                    setDeleteSchedulesModal(
                                      !DeleteSchedulesModal,
                                    )
                                  }
                                />
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{width: '100%', justifyContent: 'center'}}>
                              <Text
                                style={{
                                  marginVertical: 10,
                                  alignSelf: 'center',
                                  fontSize: 12,
                                }}>
                                {viewPSlots == null
                                  ? ' No Slots Available'
                                  : 'Please Select Date'}
                              </Text>

                              <CustomButton
                                text="Create Slots"
                                style={{
                                  flex: 1,
                                  alignSelf: 'center',
                                  width: '90%',
                                  backgroundColor: '#2b8ada',
                                  padding: 5,
                                  marginVertical: 10,
                                  borderRadius: 5,
                                }}
                                textstyle={{color: 'white', fontSize: 12}}
                                onPress={() =>
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  ) : (
                    <ScrollView
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 15,
                      }}>
                      <View style={{width: '95%', alignSelf: 'center'}}>
                        {/* Slot Days */}
                        <Text
                          style={[
                            styles.inputLabel,
                            {
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                            },
                          ]}>
                          Slot Dates
                        </Text>
                        <View
                          style={{
                            flexDirection: 'column',
                          }}>
                          {viewEDates.length > 0 ? (
                            <View
                              style={{width: '100%', justifyContent: 'center'}}>
                              <FlatList
                                horizontal={true}
                                data={viewEDates}
                                extraData={DaysSlotRefresh}
                                keyExtractor={item => item.date}
                                renderItem={renderEViewDaysSlot}
                                style={{marginVertical: 10}}
                              />
                            </View>
                          ) : (
                            <View>
                              <Text
                                style={{
                                  marginVertical: 10,
                                  alignSelf: 'center',
                                  fontSize: 12,
                                }}>
                                No Dates Available
                              </Text>
                            </View>
                          )}
                        </View>
                        {/* Slot Timings */}
                        <Text
                          style={[
                            styles.inputLabel,
                            {
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                            },
                          ]}>
                          Slots
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                          }}>
                          {viewESlots.length > 0 ? (
                            <View
                              style={{width: '100%', justifyContent: 'center'}}>
                              <FlatList
                                horizontal={false}
                                data={viewESlots}
                                keyExtractor={(item, index) => index}
                                renderItem={renderSlot}
                                style={{
                                  marginVertical: 10,
                                  alignSelf: 'center',
                                }}
                                numColumns={2}
                              />
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  justifyContent: 'space-evenly',
                                }}>
                                <CustomButton
                                  text="Add More Slots"
                                  style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                    backgroundColor: '#2b8ada',
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                  }}
                                  textstyle={{color: 'white', fontSize: 12}}
                                  onPress={() =>
                                    setCreateSchedulesModal(
                                      !CreateSchedulesModal,
                                    )
                                  }
                                />
                                <CustomButton
                                  text="Delete Slots"
                                  style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    width: '90%',
                                    backgroundColor: 'red',
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                  }}
                                  textstyle={{color: 'white', fontSize: 12}}
                                  onPress={() =>
                                    setDeleteSchedulesModal(
                                      !DeleteSchedulesModal,
                                    )
                                  }
                                />
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{width: '100%', justifyContent: 'center'}}>
                              <Text
                                style={{
                                  marginVertical: 10,
                                  alignSelf: 'center',
                                  fontSize: 12,
                                }}>
                                No Slots Available
                              </Text>
                              <CustomButton
                                text="Create Slots"
                                style={{
                                  alignSelf: 'center',
                                  flex: 1,
                                  width: '90%',
                                  backgroundColor: '#2b8ada',
                                  padding: 5,
                                  marginVertical: 10,
                                  borderRadius: 5,
                                }}
                                textstyle={{color: 'white', fontSize: 12}}
                                onPress={() =>
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  )}
                </View>
              </View>
            ) : null}
            {/* Manage PreConsult Label */}
            <TouchableOpacity
              style={styles.WhiteLabel}
              onPress={() => setmanagePreConsultQues(!managePreConsultQues)}>
              <FAIcon
                name="clipboard-list"
                size={15}
                color={managePreConsultQues ? '#2b8ada' : 'gray'}
              />
              <Text
                style={[
                  styles.label,
                  {width: '80%'},
                  managePreConsultQues ? {color: '#2B8ADA'} : {color: 'black'},
                ]}>
                Pre-Consultation Questions
              </Text>
              <FAIcon
                name={managePreConsultQues ? 'chevron-down' : 'chevron-right'}
                size={20}
                style={[
                  managePreConsultQues ? {color: '#2B8ADA'} : {color: 'black'},
                ]}
              />
            </TouchableOpacity>
            {/* Manage PreConsult Body */}
            {managePreConsultQues ? (
              <View
                style={[
                  styles.whiteBodyView,
                  {width: '95%', alignSelf: 'center'},
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
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
                        <View style={[styles.cellHeading, {flex: 0.15}]}>
                          <Text style={styles.cellHeadingText}>S.No.</Text>
                        </View>

                        <View style={[styles.cellHeading, {flex: 0.6}]}>
                          <Text style={styles.cellHeadingText}>Question</Text>
                        </View>

                        <View
                          style={{
                            flex: 0.3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 1,
                            paddingVertical: 1,
                            backgroundColor: '#2b8ada',
                          }}>
                          <Text style={styles.cellHeadingText}>Actions</Text>
                        </View>
                      </View>
                    </View>
                    {questionareList != null ? (
                      <RenderQuestion />
                    ) : questionareList == '' ? (
                      <Text style={{fontSize: 12, alignSelf: 'center'}}>
                        No Questions Added
                      </Text>
                    ) : null}
                  </View>
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
                        seteditQues(false);
                        setQuestionsModal(true);
                        setquestionId(null);
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
        {isChecking && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 6,
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
                source={searching}
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
                {MsgHeading}
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
                {MsgUnderText}
              </Text>
            </View>
          </View>
        )}
        {ImageViewer ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={ImageViewer}
            onRequestClose={() => {
              setImageViewer(!ImageViewer);
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
                  {
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
                    borderRadius: 10,
                    padding: 15,
                    height: 300,
                  },
                ]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Clinic Photo
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
                    onPress={() => {
                      setImageViewer(false);
                      setDisplayPhotoToken(0);
                    }}
                  />
                </View>
                <View style={{minHeight: 150, width: '100%'}}>
                  <ScrollView
                    style={{
                      padding: 10,
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 7,
                      marginVertical: 10,
                      borderWidth: 2,
                      borderColor: 'gray',
                      minHeight: 200,
                    }}
                    scrollEnabled={true}>
                    {DisplayPhotoToken == 0 ? (
                      <Image
                        source={waiting}
                        style={{
                          alignSelf: 'center',
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: `${apiConfig.baseUrl}/file/download?fileToken=${DisplayPhotoToken}&userId=${doctorId}`,
                        }}
                        style={{
                          resizeMode: 'cover',
                          width: '100%',
                          height: 180,
                        }}
                      />
                    )}
                    <Text style={styles.inputLabel}>
                      {ClinicViewer.clinicName} {' , '}{' '}
                      {ClinicViewer.clinicAddress}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        {CreateSchedulesModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={CreateSchedulesModal}
            onRequestClose={() => {
              setCreateSchedulesModal(false);
            }}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={[styles.modalView, {flexDirection: 'column'}]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Create Slots
                  </Text>
                  <FAIcon
                    name="window-close"
                    color="black"
                    size={26}
                    style={{position: 'absolute', top: 0, right: 0}}
                    onPress={() => {
                      setCreateSchedulesModal(false);
                      reset();
                    }}
                  />
                </View>
                {/* Buttons */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#2b8ada',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CustomButton
                    text={'E-CONSULTATIONS'}
                    textstyle={[
                      {fontSize: 13},
                      CreateEConsultations
                        ? {color: 'white'}
                        : {color: '#2b8ada'},
                    ]}
                    style={[
                      {flex: 0.5},
                      CreateEConsultations
                        ? {backgroundColor: '#2b8ada'}
                        : {backgroundColor: 'white'},
                    ]}
                    onPress={() => {
                      //setselectedDate('');
                      resetDays();
                      setCreateEConsultations(true);
                      setCreatePConsultations(false);
                    }}
                  />
                  <CustomButton
                    text={'P-CONSULTATIONS'}
                    textstyle={[
                      {fontSize: 13},
                      CreatePConsultations
                        ? {color: 'white'}
                        : {color: '#2b8ada'},
                    ]}
                    style={[
                      {flex: 0.5},
                      CreatePConsultations
                        ? {backgroundColor: '#2b8ada'}
                        : {backgroundColor: 'white'},
                    ]}
                    onPress={() => {
                      //setselectedDate('');
                      resetDays();
                      setCreatePConsultations(true);
                      setCreateEConsultations(false);
                    }}
                  />
                </View>

                {CreatePConsultations ? (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{width: '95%', alignSelf: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        marginBottom: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={styles.inputLabel}>Select Clinic</Text>
                        <SelectList
                          //defaultOption={ClinicDet[0].key}
                          placeholder={' '}
                          setSelected={item => {
                            setPCCreateClinicID(item);
                          }}
                          // onSelect={() => {
                          //   var i = 0;
                          //   while (i < ClinicDet.length) {
                          //     if (ClinicDet[i].key == PCCreateClinicAddress)
                          //       setPCCreateClinicName(ClinicDet[i].value);
                          //     i++;
                          //   }
                          //   //setviewPSlots("");
                          // }}
                          data={ClinicDet}
                          save={'key'}
                          boxStyles={{
                            backgroundColor: '#E8F0FE',
                            borderWidth: 0,
                            borderRadius: 5,
                          }}
                          dropdownStyles={{backgroundColor: 'white'}}
                          dropdownTextStyles={{
                            color: '#2b8ada',
                            fontWeight: 'bold',
                          }}
                          badgeStyles={{backgroundColor: '#2b8ada'}}
                        />
                      </View>
                    </View>
                    <Text style={styles.inputLabel}>Dates</Text>
                    <FlatList
                      horizontal={true}
                      data={DaysSlot}
                      extraData={DaysSlotRefresh}
                      keyExtractor={item => item.date}
                      renderItem={renderDaysSlot}
                      style={{marginBottom: 10}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        flex: 1,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          flex: 0.5,
                          marginRight: '5%',
                        }}>
                        <Text
                          style={[
                            styles.inputLabel,
                            {alignSelf: 'flex-start'},
                          ]}>
                          Start Time
                        </Text>
                        {/* Input Start Time */}
                        {PCinTimeHH != '' && PCinTimeMM != '' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[
                                {
                                  width: '100%',
                                  textAlign: 'center',
                                  color: 'black',
                                  borderColor: '#2b8ada',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  marginVertical: 3,
                                  paddingVertical: 5,
                                },
                              ]}>
                              {PCinTime != '' ? PCinTime : null}
                            </Text>
                          </View>
                        ) : null}
                        {/* Button */}
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: 5,
                            backgroundColor: '#e8f0fe',
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onPress={async () => {
                            console.log('Opening time spinenr');
                            setPCStartViewer(true);
                          }}>
                          <FAIcon
                            name="clock"
                            color={'black'}
                            size={16}
                            style={{
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                          <Text
                            style={[
                              {
                                color: 'black',
                                alignSelf: 'center',
                                fontSize: 12,
                              },
                            ]}>
                            {PCinTime == '' ? 'Start Time' : 'Change'}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={PCStartViewer}
                          mode="time"
                          display="spinner"
                          onConfirm={handleConfirmPCIn}
                          onCancel={() => setPCStartViewer(false)}
                        />
                      </View>
                      <View style={{flexDirection: 'column', flex: 0.5}}>
                        <Text
                          style={[
                            styles.inputLabel,
                            {alignSelf: 'flex-start'},
                          ]}>
                          End Time
                        </Text>
                        {/* Input End Time */}
                        {PCoutTimeHH != '' && PCoutTimeMM != '' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            {/* <TextInput
                              placeholder="HH"
                              maxLength={2}
                              keyboardType={'number-pad'}
                              style={[styles.textInput, {textAlign: 'center'}]}
                              onChangeText={text => {
                                setPCoutTimeHH(text);
                              }}
                              value={PCoutTimeHH}
                            />
                            <TextInput
                              placeholder="MM"
                              maxLength={2}
                              keyboardType={'number-pad'}
                              style={[styles.textInput, {textAlign: 'center'}]}
                              onChangeText={text => {
                                setPCoutTimeMM(text);
                              }}
                              value={PCoutTimeMM}
                            /> */}
                            <Text
                              style={[
                                {
                                  width: '100%',
                                  textAlign: 'center',
                                  color: 'black',
                                  borderColor: '#2b8ada',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  marginVertical: 3,
                                  paddingVertical: 5,
                                },
                              ]}>
                              {PCoutTime != '' ? PCoutTime : null}
                            </Text>
                          </View>
                        ) : null}
                        {/* Button */}
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: 5,
                            backgroundColor: '#e8f0fe',
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onPress={async () => {
                            console.log('Opening time spinenr');
                            setPCEndViewer(true);
                          }}>
                          <FAIcon
                            name="clock"
                            color={'black'}
                            size={16}
                            style={{
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                          <Text
                            style={[
                              {
                                color: 'black',
                                alignSelf: 'center',
                                fontSize: 12,
                              },
                            ]}>
                            {PCoutTime == '' ? 'End Time' : 'Change'}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={PCEndViewer}
                          mode="time"
                          display="spinner"
                          onConfirm={handleConfirmPCOut}
                          onCancel={() => setPCEndViewer(false)}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%'}}>
                      <Text
                        style={[styles.inputLabel, {alignSelf: 'flex-start'}]}>
                        Duration (in min)
                      </Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        maxLength={2}
                        onChangeText={text => setPCduration(text)}
                        value={PCduration}
                        style={styles.textInput}
                      />
                    </View>

                    <CustomButton
                      text="Save"
                      textstyle={{color: 'white', fontSize: 12}}
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: '#2B8ADA',
                        borderRadius: 10,
                        marginTop: 20,
                      }}
                      onPress={async () => {
                        let p = {
                          clinicAddress: PCCreateClinicAddress,
                          clinicName: PCCreateClinicName,
                          date: selectedDate,
                          //doctoId: doctorId,
                          duration: Number(PCduration),
                          endTime:
                            (PCoutTimeHH.length == 1
                              ? '0' + PCoutTimeHH
                              : PCoutTimeHH) +
                            ':' +
                            (PCoutTimeMM.length == 1
                              ? '0' + PCoutTimeMM
                              : PCoutTimeMM),
                          startTime:
                            (PCinTimeHH.length == 1
                              ? '0' + PCinTimeHH
                              : PCinTimeHH) +
                            ':' +
                            (PCinTimeMM.length == 1
                              ? '0' + PCinTimeMM
                              : PCinTimeMM),
                        };
                        console.log(p);

                        if (PCCreateClinicID == '')
                          Alert.alert(
                            'Invalid Input',
                            'Please select a hospital from the list',
                          );
                        else if (selectedDateArray == '')
                          Alert.alert(
                            'Invalid Input',
                            'Please select at least date',
                          );
                        else if (
                          PCinTimeHH == '' ||
                          Number(PCinTimeHH) > 23 ||
                          Number(PCinTimeHH) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot start time HH',
                          );
                        else if (
                          PCinTimeMM == '' ||
                          Number(PCinTimeMM) >= 60 ||
                          Number(PCinTimeMM) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot start time MM',
                          );
                        else if (
                          PCoutTimeHH == '' ||
                          Number(PCoutTimeHH) > 23 ||
                          Number(PCoutTimeHH) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot end time HH',
                          );
                        else if (
                          PCoutTimeMM == '' ||
                          Number(PCoutTimeMM) >= 60 ||
                          Number(PCoutTimeMM) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot end time MM',
                          );
                        else if (PCduration == '' || Number(PCduration) == 0)
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot duration in minutes',
                          );
                        else {
                          if (PCinTimeHH.length == 1)
                            setPCinTimeHH('0' + PCinTimeHH);
                          if (PCinTimeMM.length == 1)
                            setPCinTimeMM('0' + PCinTimeMM);
                          if (PCoutTimeHH.length == 1)
                            setPCoutTimeHH('0' + PCoutTimeHH);
                          if (PCoutTimeMM.length == 1)
                            setPCoutTimeMM('0' + PCoutTimeMM);

                          if (
                            (Number(PCinTimeHH) == Number(PCoutTimeHH) &&
                              Number(PCinTimeMM) > Number(PCoutTimeMM)) ||
                            Number(PCinTimeHH) > Number(PCoutTimeHH)
                          )
                            Alert.alert(
                              'Invalid Time',
                              'Please enter valid time slot range',
                            );
                          else {
                            console.log(PCData);
                            pushSlot();
                            await reset();
                          }
                        }
                      }}
                    />
                  </ScrollView>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{width: '95%', alignSelf: 'center'}}>
                    <Text style={styles.inputLabel}>Dates</Text>
                    <FlatList
                      horizontal={true}
                      data={DaysSlot}
                      extraData={DaysSlotRefresh}
                      keyExtractor={item => item.date}
                      renderItem={renderDaysSlot}
                      style={{marginBottom: 10}}
                    />
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}>
                      <Text style={[styles.inputLabel]}>Consultation Mode</Text>
                      <SelectList
                        labelStyles={{height: 0}}
                        setSelected={val => setEconsultMode(val)}
                        data={dataMode}
                        save="key"
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

                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            flex: 0.5,
                            marginRight: '5%',
                          }}>
                          <Text
                            style={[
                              styles.inputLabel,
                              {alignSelf: 'flex-start'},
                            ]}>
                            Start Time
                          </Text>
                          {/* Input Start Time */}
                          {ECinTimeHH != '' && ECinTimeMM != '' ? (
                            <View
                              style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}>
                              {/* <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => {
                                  setECinTimeHH(text);
                                }}
                                value={ECinTimeHH}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => {
                                  setECinTimeMM(text);
                                }}
                                value={ECinTimeMM}
                              /> */}
                              <Text
                                style={[
                                  {
                                    width: '100%',
                                    textAlign: 'center',
                                    color: 'black',
                                    borderColor: '#2b8ada',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginVertical: 3,
                                    paddingVertical: 5,
                                  },
                                ]}>
                                {ECinTime != '' ? ECinTime : null}
                              </Text>
                            </View>
                          ) : null}
                          {/* Button */}
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-evenly',
                              marginTop: 5,
                              backgroundColor: '#e8f0fe',
                              padding: 10,
                              borderRadius: 10,
                            }}
                            onPress={async () => {
                              console.log('Opening time spinenr');
                              setECStartViewer(true);
                            }}>
                            <FAIcon
                              name="clock"
                              color={'black'}
                              size={16}
                              style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}
                            />
                            <Text
                              style={[
                                {
                                  color: 'black',
                                  alignSelf: 'center',
                                  fontSize: 12,
                                },
                              ]}>
                              {ECinTime == '' ? 'Start Time' : 'Change'}
                            </Text>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={ECStartViewer}
                            mode="time"
                            display="spinner"
                            onConfirm={handleConfirmECIn}
                            onCancel={() => setECStartViewer(false)}
                          />
                        </View>
                        <View style={{flexDirection: 'column', flex: 0.5}}>
                          <Text
                            style={[
                              styles.inputLabel,
                              {alignSelf: 'flex-start'},
                            ]}>
                            End Time
                          </Text>

                          {/* Input End Time */}

                          {ECoutTimeHH != '' && ECoutTimeMM != '' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              {/* <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => {
                                  setECoutTimeHH(text);
                                }}
                                value={ECoutTimeHH}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => {
                                  setECoutTimeMM(text);
                                }}
                                value={ECoutTimeMM}
                              /> */}
                              <Text
                                style={[
                                  {
                                    width: '100%',
                                    textAlign: 'center',
                                    color: 'black',
                                    borderColor: '#2b8ada',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginVertical: 3,
                                    paddingVertical: 5,
                                  },
                                ]}>
                                {ECoutTime != '' ? ECoutTime : null}
                              </Text>
                            </View>
                          ) : null}

                          {/* Button */}

                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-evenly',
                              marginTop: 5,
                              backgroundColor: '#e8f0fe',
                              padding: 10,
                              borderRadius: 10,
                            }}
                            onPress={async () => {
                              console.log('Opening time spinenr');
                              setECEndViewer(true);
                            }}>
                            <FAIcon
                              name="clock"
                              color={'black'}
                              size={16}
                              style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}
                            />
                            <Text
                              style={[
                                {
                                  color: 'black',
                                  alignSelf: 'center',
                                  fontSize: 12,
                                },
                              ]}>
                              {ECoutTime == '' ? 'End Time' : 'Change'}
                            </Text>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={ECEndViewer}
                            mode="time"
                            display="spinner"
                            onConfirm={handleConfirmECOut}
                            onCancel={() => setECEndViewer(false)}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 0.45,
                          }}>
                          <View style={{flexDirection: 'column', flex: 1}}>
                            <Text style={[styles.inputLabel]}>
                              Duration (in min)
                            </Text>
                            <TextInput
                              placeholder="MM"
                              style={styles.textInput}
                              keyboardType={'number-pad'}
                              maxLength={2}
                              onChangeText={text => setECduration(text)}
                              value={ECduration}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 0.45,
                          }}>
                          <View style={{flexDirection: 'column', flex: 1}}>
                            <Text style={[styles.inputLabel]}>
                              Gap (in min)
                            </Text>
                            <TextInput
                              placeholder="MM"
                              maxLength={2}
                              style={styles.textInput}
                              keyboardType={'number-pad'}
                              onChangeText={text => setECGap(text)}
                              value={ECGap}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <CustomButton
                      text="Save"
                      textstyle={{color: 'white', fontSize: 12}}
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: '#2B8ADA',
                        borderRadius: 10,
                        marginVertical: 10,
                      }}
                      onPress={async () => {
                        //setemodal(false);
                        if (selectedDateArray == '')
                          Alert.alert(
                            'Invalid Input',
                            'Please select slot date.',
                          );
                        else if (EconsultMode == '')
                          Alert.alert(
                            'Invalid Input',
                            'Please select consultation mode from the dropdown',
                          );
                        else if (
                          ECinTimeHH == '' ||
                          Number(ECinTimeHH) > 23 ||
                          Number(ECinTimeHH) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot start time HH',
                          );
                        else if (
                          ECinTimeMM == '' ||
                          Number(ECinTimeMM) >= 60 ||
                          Number(ECinTimeMM) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot start time MM',
                          );
                        else if (
                          ECoutTimeHH == '' ||
                          Number(ECoutTimeHH) > 23 ||
                          Number(ECoutTimeHH) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot end time HH',
                          );
                        else if (
                          ECoutTimeMM == '' ||
                          Number(ECoutTimeMM) >= 60 ||
                          Number(ECoutTimeMM) < 0
                        )
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot end time MM',
                          );
                        else if (ECduration == '' || Number(ECduration) == 0)
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid slot duration time in minutes',
                          );
                        else if (ECGap == '' || Number(ECGap) == 0)
                          Alert.alert(
                            'Invalid Input',
                            'Please enter valid gap time in minutes',
                          );
                        else {
                          if (
                            (Number(ECinTimeHH) == Number(ECoutTimeHH) &&
                              Number(ECinTimeMM) > Number(ECoutTimeMM)) ||
                            Number(ECinTimeHH) > Number(ECoutTimeHH)
                          )
                            Alert.alert(
                              'Invalid Time',
                              'Please enter valid slot time range',
                            );
                          else {
                            pushESlot();
                            reset();
                          }
                        }
                      }}
                    />
                  </ScrollView>
                )}
              </View>
            </View>
          </Modal>
        ) : null}

        {DeleteSchedulesModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={DeleteSchedulesModal}
            onRequestClose={() => {
              setDeleteSchedulesModal(false);
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
                    flexDirection: 'column',
                    padding: 10,
                  },
                ]}>
                {/* Header */}
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    marginBottom: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 5,
                      color: 'black',
                    }}>
                    Delete Slots
                  </Text>
                  <FAIcon
                    name="window-close"
                    color="black"
                    size={26}
                    style={{position: 'absolute', top: 0, right: 0}}
                    onPress={() => {
                      setDeleteSchedulesModal(false);
                    }}
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Body */}
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    {/* Buttons */}
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#2b8ada',
                        width: '95%',
                        alignSelf: 'center',
                      }}>
                      <CustomButton
                        text={'E-CONSULTATIONS'}
                        textstyle={[
                          {fontSize: 10},
                          ViewEConsultations
                            ? {color: 'white'}
                            : {color: '#2b8ada'},
                        ]}
                        style={[
                          {flex: 0.5},
                          ViewEConsultations
                            ? {backgroundColor: '#2b8ada'}
                            : null,
                        ]}
                        onPress={() => {
                          if (DeleteSlotsList != '') {
                            setDeleteSlotsList([]);

                            setselectAll(false);
                          }
                          setconsultationType(
                            ViewEConsultations
                              ? 'E_CONSULTATION'
                              : 'P_CONSULTATION',
                          );
                          setViewEConsultations(true);
                          setViewPConsultations(false);
                          setCreateEConsultations(true);
                          setCreatePConsultations(false);
                        }}
                      />
                      <CustomButton
                        text={'P-CONSULTATIONS'}
                        textstyle={[
                          {fontSize: 10},
                          ViewPConsultations
                            ? {color: 'white'}
                            : {color: '#2b8ada'},
                        ]}
                        style={[
                          {flex: 0.5},
                          ViewPConsultations
                            ? {backgroundColor: '#2b8ada'}
                            : null,
                        ]}
                        onPress={() => {
                          if (DeleteSlotsList != '') {
                            setDeleteSlotsList([]);
                            setselectAll(false);
                          }
                          setconsultationType(
                            ViewEConsultations
                              ? 'E_CONSULTATION'
                              : 'P_CONSULTATION',
                          );
                          setViewPConsultations(true);
                          setViewEConsultations(false);
                          setCreateEConsultations(false);
                          setCreatePConsultations(true);
                        }}
                      />
                    </View>
                    {/* P-consultation clinic names */}
                    {ViewPConsultations ? (
                      <ScrollView
                        style={{
                          width: '95%',
                          alignSelf: 'center',
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 15,
                        }}>
                        <View style={{width: '95%', alignSelf: 'center'}}>
                          <View
                            style={{
                              width: '100%',
                              justifyContent: 'space-between',
                              flexDirection: 'column',
                              marginBottom: 10,
                              alignSelf: 'center',
                            }}>
                            <View style={{flex: 1}}>
                              <Text style={styles.inputLabel}>
                                Select Clinic Name
                              </Text>
                              <SelectList
                                //defaultOption={ClinicDet[0].key}
                                placeholder={' '}
                                setSelected={item => {
                                  setPCclinicId(item);
                                }}
                                data={ClinicDet}
                                save={'key'}
                                boxStyles={{
                                  backgroundColor: '#E8F0FE',
                                  borderWidth: 0,
                                  borderRadius: 5,
                                }}
                                dropdownStyles={{backgroundColor: 'white'}}
                                dropdownTextStyles={{
                                  color: '#2b8ada',
                                  fontWeight: 'bold',
                                }}
                                badgeStyles={{backgroundColor: '#2b8ada'}}
                              />
                            </View>
                          </View>
                          {/* Slot Days */}
                          <Text
                            style={[
                              styles.inputLabel,
                              {
                                paddingBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#2b8ada',
                              },
                            ]}>
                            Slot Dates
                          </Text>
                          <View
                            style={{
                              flexDirection: 'column',
                            }}>
                            {viewPDates.length > 0 ? (
                              <View>
                                <FlatList
                                  horizontal={true}
                                  data={viewPDates}
                                  extraData={DaysSlotRefresh}
                                  keyExtractor={item => item.date}
                                  renderItem={renderPViewDaysSlot}
                                  style={{marginVertical: 10}}
                                />
                              </View>
                            ) : (
                              <View>
                                {PCclinicId == '' ? (
                                  <Text
                                    style={{
                                      marginVertical: 10,
                                      alignSelf: 'center',
                                      fontSize: 12,
                                    }}>
                                    Please Select a Clinic
                                  </Text>
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
                            )}
                          </View>
                          {/* Slot Timings */}
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={[styles.inputLabel]}>Slots</Text>
                            <CheckBox
                              title={
                                <Text style={[styles.inputLabel]}>
                                  {!selectAll ? ' Select All' : 'Deselect All'}
                                </Text>
                              }
                              containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 0,
                                marginTop: 10,
                                marginBottom: 2,
                                alignSelf: 'center',
                                justifyContent: 'center',
                              }}
                              size={15}
                              checkedColor={'#2b8ada'}
                              checked={selectAll}
                              onPress={() => {
                                if (selectedDate != '') {
                                  if (!selectAll) selectAllPSlots();
                                  else deselectAllPSlots();
                                } else
                                  Alert.alert(
                                    'Warning',
                                    'Please select the date for which slots are to be deleted',
                                  );
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              width: '100%',
                            }}>
                            {viewPSlots.length > 0 ? (
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <FlatList
                                  horizontal={false}
                                  data={viewPSlots}
                                  keyExtractor={(item, index) => index}
                                  renderItem={renderPSlotDelete}
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                  }}
                                  numColumns={2}
                                  scrollEnabled={true}
                                />
                                {/* <CustomButton
                                text="Add More Slots"
                                style={{
                                  alignSelf: 'center',
                                  width: '90%',
                                  backgroundColor: '#2b8ada',
                                  padding: 5,
                                  marginVertical: 10,
                                  borderRadius: 5,
                                }}
                                textstyle={{color: 'white', fontSize: 12}}
                                onPress={() =>
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              /> */}
                              </View>
                            ) : (
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                  }}>
                                  {viewPSlots == null
                                    ? ' No Slots Available'
                                    : 'Please Select Date'}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </ScrollView>
                    ) : (
                      <ScrollView
                        style={{
                          width: '95%',
                          alignSelf: 'center',
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 15,
                        }}>
                        <View style={{width: '95%', alignSelf: 'center'}}>
                          {/* Slot Days */}
                          <Text
                            style={[
                              styles.inputLabel,
                              {
                                paddingBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#2b8ada',
                              },
                            ]}>
                            Slot Dates
                          </Text>
                          <View
                            style={{
                              flexDirection: 'column',
                            }}>
                            {viewEDates.length > 0 ? (
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <FlatList
                                  horizontal={true}
                                  data={viewEDates}
                                  extraData={DaysSlotRefresh}
                                  keyExtractor={item => item.date}
                                  renderItem={renderEViewDaysSlot}
                                  style={{marginVertical: 10}}
                                />
                              </View>
                            ) : (
                              <View>
                                <Text
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                  }}>
                                  No Dates Available
                                </Text>
                              </View>
                            )}
                          </View>
                          {/* Slot Timings */}
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingBottom: 5,
                              borderBottomWidth: 1,
                              borderBottomColor: '#2b8ada',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={[styles.inputLabel]}>Slots</Text>
                            <CheckBox
                              title={
                                <Text style={[styles.inputLabel]}>
                                  {!selectAll ? ' Select All' : 'Deselect All'}
                                </Text>
                              }
                              containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 0,
                                marginTop: 10,
                                marginBottom: 2,
                                alignSelf: 'center',
                                justifyContent: 'center',
                              }}
                              size={15}
                              checkedColor={'#2b8ada'}
                              checked={selectAll}
                              onPress={() => {
                                if (selectedDate != '') {
                                  if (!selectAll) selectAllESlots();
                                  else deselectAllESlots();
                                } else
                                  Alert.alert(
                                    'Warning',
                                    'Please select the date for which slots are to be deleted',
                                  );
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              width: '100%',
                            }}>
                            {viewESlots.length > 0 ? (
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <FlatList
                                  horizontal={false}
                                  data={viewESlots}
                                  keyExtractor={(item, index) => index}
                                  renderItem={renderESlotDelete}
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                  }}
                                  numColumns={2}
                                />
                                {/* <CustomButton
                                text="Add More Slots"
                                style={{
                                  alignSelf: 'center',
                                  width: '90%',
                                  backgroundColor: '#2b8ada',
                                  padding: 5,
                                  marginVertical: 10,
                                  borderRadius: 5,
                                }}
                                textstyle={{color: 'white', fontSize: 12}}
                                onPress={() =>
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              /> */}
                              </View>
                            ) : (
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginVertical: 10,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                  }}>
                                  No Slots Available
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </ScrollView>
                    )}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 5,
                        justifyContent: 'center',
                      }}>
                      <CustomButton
                        text="Delete"
                        style={{
                          flex: 1,
                          alignSelf: 'center',
                          width: '90%',
                          backgroundColor: 'red',
                          padding: 5,
                          marginVertical: 10,
                          borderRadius: 5,
                          paddingVertical: 10,
                        }}
                        textstyle={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}
                        onPress={async () => {
                          //setCreateSchedulesModal(!CreateSchedulesModal)

                          if (DeleteSlotsList != '') {
                            console.log(DeleteSlotsList);
                            await deleteSlots();
                          } else
                            Alert.alert(
                              'Alert',
                              'No slot selected to delete. Please select slot',
                            );
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        ) : null}

        {ClinicModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={ClinicModal}
            onRequestClose={() => {
              setClinicModal(!ClinicModal);
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
                    height: 400,
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
                      color: 'black',
                    }}>
                    {editClinic ? ' Edit' : 'Add More'} Clinic Details
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
                    onPress={() => {
                      setclinicAddress('');
                      setclinicName('');
                      setclinicPhoto(0);
                      setspecialInstruction('');
                      setClinicModal(false);
                    }}
                  />
                </View>
                <ScrollView
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    flex: 1,
                    minHeight: 200,
                    maxHeight: 400,
                  }}>
                  {/* Clinic Photo */}
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Clinic Photo
                      </Text>
                      {clinicPhoto != 0 && clinicPhoto != null ? (
                        <Image
                          source={{
                            uri: `${apiConfig.baseUrl}/file/download?fileToken=${clinicPhoto}&userId=${doctorId}`,
                          }}
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: 180,
                          }}
                        />
                      ) : null}
                      <TouchableOpacity
                        style={[
                          {
                            backgroundColor: '#e8f0fe',
                            padding: 10,
                            justifyContent: 'center',
                            borderRadius: 10,
                            flexDirection: 'row',
                            marginVertical: 10,
                          },
                          clinicPhoto != 0
                            ? {
                                backgroundColor: 'white',
                                borderColor: '#21c47f',
                                borderWidth: 1,
                              }
                            : null,
                        ]}
                        onPress={async () => {
                          if (clinicName != '') await choosePhoto('Clinic');
                          else
                            Alert.alert(
                              'Incomplete Details!',
                              'Please enter clinic name before uploading picture',
                            );
                        }}>
                        {clinicPhoto == 0 ? (
                          <FAIcon
                            name="camera"
                            color={'gray'}
                            size={15}
                            style={{marginRight: 5, alignSelf: 'center'}}
                          />
                        ) : null}
                        <Text
                          style={[
                            {alignSelf: 'center', fontSize: 12},
                            clinicPhoto != 0 ? {color: '#21c47f'} : null,
                          ]}>
                          {clinicPhoto == 0
                            ? 'Upload Clinic Photo'
                            : '✓ File Selected'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* Clinic Name */}
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Clinic Name
                      </Text>
                      <TextInput
                        style={[styles.textInput]}
                        value={clinicName}
                        onChangeText={text => setclinicName(text)}
                      />
                    </View>
                  </View>
                  {/* Clinic Address */}
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Clinic Address
                      </Text>
                      <TextInput
                        style={[styles.textInput]}
                        value={clinicAddress}
                        onChangeText={text => setclinicAddress(text)}
                      />
                    </View>
                  </View>
                  {/* Special Instruction */}
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Special Instruction
                      </Text>
                      <TextInput
                        style={[styles.textInput]}
                        multiline={true}
                        value={specialInstruction}
                        onChangeText={text => setspecialInstruction(text)}
                      />
                    </View>
                  </View>
                </ScrollView>

                <CustomButton
                  text={editClinic ? 'Update' : 'Save'}
                  textstyle={{color: 'white', fontSize: 12}}
                  style={{
                    width: '95%',
                    backgroundColor: '#2B8ADA',
                    marginVertical: 5,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (clinicName == '')
                      Alert.alert('Invalid Input', 'Please fill Clinic Name ');
                    else if (clinicAddress == '')
                      Alert.alert(
                        'Invalid Input',
                        'Please fill Clinic Address',
                      );
                    else {
                      let p = {
                        clinicAddress: clinicAddress,
                        clinicName: clinicName,
                        clinicPhoto: clinicPhoto,
                        doctorId: doctorId,
                        specialInstruction: specialInstruction,
                      };
                      if (
                        editClinic ||
                        ManageClinic.findIndex(
                          v =>
                            v.clinicName == p.clinicName &&
                            v.clinicAddress == p.clinicAddress,
                        ) == -1
                      ) {
                        if (editClinic) p.clinicId = clinicId;

                        updateClinic(p);
                        setclinicAddress('');
                        setclinicName('');
                        setclinicPhoto(0);
                        setspecialInstruction('');
                        setmanageClinicsLabel(false);
                      } else {
                        Alert.alert(
                          'Duplicate Data',
                          'Duplicate clinic details found.',
                        );
                      }
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        ) : null}

        {QuestionsModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={QuestionsModal}
            onRequestClose={() => {
              setQuestionsModal(!QuestionsModal);
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
                    height: 400,
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
                    {editQues ? ' Edit' : 'Add More'} Questions
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
                    onPress={() => setQuestionsModal(false)}
                  />
                </View>
                <View style={{width: '95%', alignSelf: 'center', flex: 1}}>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={[styles.inputLabel, {marginTop: 0}]}>
                      Question
                    </Text>
                    <TextInput
                      style={{
                        padding: 5,
                        color: 'black',
                        backgroundColor: '#E8F0FE',
                        borderRadius: 10,
                        fontSize: 14,
                        marginVertical: 5,
                      }}
                      onChangeText={text => setquestions(text)}
                      value={questions}
                    />
                  </View>
                </View>

                <CustomButton
                  text={editQues ? 'Update' : 'Save'}
                  textstyle={{color: 'white', fontSize: 12}}
                  style={{
                    width: '95%',
                    backgroundColor: '#2B8ADA',
                    marginVertical: 5,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                  onPress={async () => {
                    if (questions == '')
                      Alert.alert('Invalid Input', 'Please fill Clinic Name ');
                    else {
                      let p = {
                        doctorId: doctorId,
                        questions: questions,
                      };
                      if (
                        questionareList.findIndex(
                          v => v.questions == p.questions,
                        ) == -1
                      ) {
                        if (editQues) p.questionId = questionId;

                        let arr = [];
                        arr = [...arr, p];
                        await updatePreConsultQues(arr);
                        setquestions('');
                        setquestionId(null);
                      } else {
                        Alert.alert(
                          'Duplicate Data',
                          'Duplicate clinic details found.',
                        );
                      }
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        ) : null}
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
  card: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 5,
    flexDirection: 'column',
    borderColor: 'gray',
  },
  name: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    padding: 3,
  },
  cardText: {fontSize: 12},
  checkBoxContainerStyle: {
    backgroundColor: '#E8F0FE',
    flex: 0.45,
    borderWidth: 0,
    padding: 0,
  },
  HistoryModalText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    maxHeight: 450,
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15,
    alignItems: 'center',
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
  bubbleTitle: {
    color: 'black',
    padding: 5,
    fontSize: 11,
    width: '90%',
    textAlign: 'center',
  },
  bubbleActive: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2b8ada',
    padding: 5,
    fontSize: 11,
    borderRadius: 15,
    marginVertical: 5,
    width: '100%',
  },
  bubbleTitleActive: {
    color: '#fff',
    padding: 5,
    fontSize: 12,
    width: '90%',
    textAlign: 'center',
  },
  slotBackground: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    borderWidth: 1,
    borderColor: '#2b8ada',
    padding: 8,
    borderRadius: 5,
    margin: 2,
  },
  slotTitle: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
  },
  slotBackgroundActive: {
    backgroundColor: '#2b8ada',
    borderColor: '#2b8ada',
  },
  slotTitleActive: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
  WhiteLabel: {
    flexDirection: 'row',
    width: '95%',
    marginVertical: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  whiteBodyView: {
    marginTop: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
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
    color: '#2b8ada',
  },
  cellText: {textAlign: 'center', fontSize: 10, marginVertical: 10},
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
    backgroundColor: '#2b8ada',
  },
  cellHeadingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 11,
    marginVertical: 5,
    color: 'white',
  },
});

export default ManageSchedule;
