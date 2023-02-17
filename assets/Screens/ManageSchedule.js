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
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import apiConfig from '../API/apiConfig';
import timeformatter from '../API/timeformatter';
import axios from 'axios';
//images
import pfp1 from '../Resources/pfp1.jpg';
import chatting from '../Resources/chattingMedium.png';

import DaysCreator from '../API/slotscreate';
import {useIsFocused} from '@react-navigation/native';
import clinicMaker from '../API/ClincMaker';
import DayDateMaker from '../API/DayDateMaker';

const dataMode = [
  {key: 'VIDEO_CALL', value: 'Video'},
  {key: 'PHONE_CALL', value: 'Phone'},
];

const ManageSchedule = () => {
  const [manageSlotsLabel, setmanageSlotsLabel] = useState(false);
  const [manageClinicsLabel, setmanageClinicsLabel] = useState(false);
  const [ClinicDetEdit, setClinicDetEdit] = useState(false);
  const [ManageClinic, setManageClinic] = useState([]);
  const [clinicName, setclinicName] = useState('');
  const [clinicAddress, setclinicAddress] = useState('');
  const [clinicId, setclinicId] = useState('');
  const [specialInstruction, setspecialInstruction] = useState('');
  const [ClinicModal, setClinicModal] = useState(false);
  const [editClinic, seteditClinic] = useState(false);

  const [SlotView, setSlotView] = useState(false);
  const [ViewSchedulesModal, setViewSchedulesModal] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
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

  //CREATE P-CONSULTATION TAB
  const [CreatePConsultations, setCreatePConsultations] = useState(true);
  const [PCDate, setPCDate] = useState('');
  const [PCinTimeHH, setPCinTimeHH] = useState('');
  const [PCinTimeMM, setPCinTimeMM] = useState('');
  const [PCoutTimeHH, setPCoutTimeHH] = useState('');
  const [PCoutTimeMM, setPCoutTimeMM] = useState('');
  const [PCduration, setPCduration] = useState(0);
  const [PCspecialInstruction, setPCspecialInstruction] = useState('');
  const [PCCreateClinicID, setPCCreateClinicID] = useState('');
  const [PCCreateClinicName, setPCCreateClinicName] = useState('');
  const [PCCreateClinicAddress, setPCCreateClinicAddress] = useState('');
  const [PCData, setPCData] = useState([]);
  //CREATE E-CONSULTATION TAB
  const [CreateEConsultations, setCreateEConsultations] = useState(false);
  const [ECDate, setECDate] = useState('');
  const [EconsultMode, setEconsultMode] = useState('');
  const [ECinTimeHH, setECinTimeHH] = useState('');
  const [ECinTimeMM, setECinTimeMM] = useState('');
  const [ECoutTimeHH, setECoutTimeHH] = useState('');
  const [ECoutTimeMM, setECoutTimeMM] = useState('');
  const [ECduration, setECduration] = useState('');
  const [ECGap, setECGap] = useState('');
  const [ECData, setECData] = useState([]);

  const [ClinicDet, setClinicDet] = useState([]);
  const [DaysSlot, setDaysSlot] = useState([]);
  const [DaysSlotRefresh, setDaysSlotRefresh] = useState(false);
  const [Days, setDays] = useState(null);
  const [doctorId, setdoctorId] = useState(0);

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

  // useEffect(() => {
  //   const getClinics = async () => {
  //     let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
  //     let doctorId = Number(x.doctorId);

  //     setviewPSlots('');
  //     setPCclinicAddress('');

  //     axios
  //       .get(apiConfig.baseUrl + '/doctor/clinic/details?doctorId=' + doctorId)
  //       .then(function (response) {
  //         setManageClinic(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   if (manageClinicsLabel == true) getClinics();
  // }, [manageClinicsLabel]);

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
        setviewESlots(response.data);
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
        setviewPSlots(response.data);
      })
      .catch(function (error) {
        console.log('=====Get pslots for clinic Detail=====');

        console.log(error);
      });
  };

  const pushSlot = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);

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
    if (PCData.length == 0) {
      PCData.push(p);
      axios
        .post(apiConfig.baseUrl + '/doctor/slots/p/create', PCData)
        .then(function (response) {
          console.log(response.status);
          if (response.status == 201 || response.status == 200) {
            Alert.alert('Slot Added', 'Slot details submitted successfully');
            setPCData([]);
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
          setPCData([]);
        });
    } else {
      let flag = 0;
      for (var i = 0; i < PCData.length; ++i) {
        if (
          PCData[i].clinicName == PCCreateClinicName &&
          PCData[i].clinicAddress == PCCreateClinicAddress &&
          PCData[i].date == selectedDate
        ) {
          let endTime = PCData[i].endTime;
          let startTime = p.startTime;

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
      }
      if (flag == 1) {
        Alert.alert(
          'Duplicate Data',
          'Sorry you cannot insert duplicate records',
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
              Alert.alert('Slot Added', 'Slot details submitted successfully');
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
        //Alert.alert("Slot details submitted successfully");
      }
      console.log(PCData);
    }
  };
  const pushESlot = async () => {
    let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
    let doctorId = Number(x.doctorId);

    let p = {
      consultationDate: selectedDate,
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
    if (ECData.length == 0) {
      //console.log(p);
      ECData.push(p);
      axios
        .post(apiConfig.baseUrl + '/doctor/slots/e/create', ECData)
        .then(function (response) {
          console.log(response.status);
          if (response.status == 201 || response.status == 200) {
            Alert.alert('Slot Added', 'Slot details submitted successfully');
            setECData([]);
            getEDates();
          } else Alert.alert('Error', 'There was some problem please try again');
        })
        .catch(function (error) {
          console.log('=====Create Eslots Detail=====');

          console.log(error);
        });
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
        Alert.alert(
          'Overlapping Slot',
          'Sorry you cannot insert overlapping timings',
        );
        await reset();
      } else {
        ECData.push(p);
        axios
          .post(apiConfig.baseUrl + '/doctor/slots/e/create', ECData)
          .then(function (response) {
            console.log(response.status);
            if (response.status == 201) {
              Alert.alert('Slot Added', 'Slot details submitted successfully');
              setECData([]);
              getEDates();
            } else Alert.alert('Error', 'There was some problem please try again');
          })
          .catch(function (error) {
            console.log('=====Create eslots=====');

            console.log(error);
          });
        Alert.alert('Slot Added', 'Slot details submitted successfully');
      }
    }
    console.log(ECData);
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
    setPCduration(0);

    setECinTimeHH('');
    setECinTimeMM('');
    setECoutTimeHH('');
    setECoutTimeMM('');
    setECduration('');
    setECGap('');
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

  //render slots and dates
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
          console.log(item.date);
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
          console.log(item.date);
          setselectedDate(item.date);
          //console.log(JSON.stringify(DaysSlot));
        }}>
        <Text style={styles.bubbleTitle}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEViewDaysSlot = ({item}) => {
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
            width: 60,
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
            width: 60,
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
            width: 60,
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
                style={{flexDirection: 'column', flex: 0.45}}
                onPress={() => {
                  setclinicName(ManageClinic.clinicName);
                  setclinicAddress(ManageClinic.clinicAddress);
                  setclinicId(ManageClinic.clinicId);
                  setspecialInstruction(ManageClinic.specialInstruction);
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
                style={{flexDirection: 'column', flex: 0.45}}
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
            {/* Create Modal */}
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
                              In Time (in 24Hrs)
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {marginRight: '5%', textAlign: 'center'},
                                ]}
                                onChangeText={text => setPCinTimeHH(text)}
                                value={PCinTimeHH}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => setPCinTimeMM(text)}
                                value={PCinTimeMM}
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'column', flex: 0.5}}>
                            <Text
                              style={[
                                styles.inputLabel,
                                {alignSelf: 'flex-start'},
                              ]}>
                              Out Time (in 24Hrs)
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <TextInput
                                placeholder="HH"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {marginRight: '5%', textAlign: 'center'},
                                ]}
                                onChangeText={text => setPCoutTimeHH(text)}
                                value={PCoutTimeHH}
                              />
                              <TextInput
                                placeholder="MM"
                                maxLength={2}
                                keyboardType={'number-pad'}
                                style={[
                                  styles.textInput,
                                  {textAlign: 'center'},
                                ]}
                                onChangeText={text => setPCoutTimeMM(text)}
                                value={PCoutTimeMM}
                              />
                            </View>
                          </View>
                        </View>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                          <Text
                            style={[
                              styles.inputLabel,
                              {alignSelf: 'flex-start'},
                            ]}>
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
                                'Incomplete Details',
                                'Please select a hospital from the list',
                              );
                            else if (selectedDate == '')
                              Alert.alert(
                                'Incomplete Details',
                                'Please select date',
                              );
                            else if (
                              PCinTimeHH == '' ||
                              PCinTimeMM == '' ||
                              PCoutTimeHH == '' ||
                              PCoutTimeMM == '' ||
                              PCduration == ''
                            )
                              Alert.alert(
                                'Incomplete Details',
                                'Please fill all time details before submiting',
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
                                Number(PCinTimeMM) >= 60 ||
                                Number(PCinTimeMM) < 0 ||
                                Number(PCoutTimeMM) >= 60 ||
                                Number(PCoutTimeMM) < 0 ||
                                Number(PCinTimeHH) > 23 ||
                                Number(PCinTimeHH) < 0 ||
                                Number(PCoutTimeHH) > 23 ||
                                Number(PCoutTimeHH) < 0 ||
                                (Number(PCinTimeHH) == Number(PCoutTimeHH) &&
                                  Number(PCinTimeMM) > Number(PCoutTimeMM)) ||
                                Number(PCinTimeHH) > Number(PCoutTimeHH)
                              )
                                Alert.alert(
                                  'Invalid Time',
                                  'Please enter valid time',
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
                          <Text style={[styles.inputLabel]}>
                            Consultation Mode
                          </Text>
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
                                Start Time (in 24Hrs)
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <TextInput
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
                                />
                              </View>
                            </View>
                            <View style={{flexDirection: 'column', flex: 0.5}}>
                              <Text
                                style={[
                                  styles.inputLabel,
                                  {alignSelf: 'flex-start'},
                                ]}>
                                End Time (in 24Hrs)
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <TextInput
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
                                />
                              </View>
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
                            if (
                              selectedDate == '' ||
                              ECinTimeHH == '' ||
                              ECinTimeMM == '' ||
                              ECoutTimeHH == '' ||
                              ECoutTimeMM == '' ||
                              ECduration == ''
                            )
                              Alert.alert(
                                'Incomplete Details',
                                'Please fill all details before submiting',
                              );
                            else {
                              if (
                                Number(ECinTimeMM) >= 60 ||
                                Number(ECinTimeMM) < 0 ||
                                Number(ECoutTimeMM) >= 60 ||
                                Number(ECoutTimeMM) < 0 ||
                                Number(ECinTimeHH) > 23 ||
                                Number(ECinTimeHH) < 0 ||
                                Number(ECoutTimeHH) > 23 ||
                                Number(ECoutTimeHH) < 0 ||
                                (Number(ECinTimeHH) == Number(ECoutTimeHH) &&
                                  Number(ECinTimeMM) > Number(ECoutTimeMM)) ||
                                Number(ECinTimeHH) > Number(ECoutTimeHH)
                              )
                                Alert.alert(
                                  'Invalid Time',
                                  'Please enter valid time',
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
                        onPress={() => setClinicModal(false)}
                      />
                    </View>
                    <View style={{width: '95%', alignSelf: 'center', flex: 1}}>
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
                          Alert.alert(
                            'Incomplete Details',
                            'Please fill Clinic Name ',
                          );
                        else if (clinicAddress == '')
                          Alert.alert(
                            'Incomplete Details',
                            'Please fill Clinic Address',
                          );
                        else {
                          let p = {
                            clinicAddress: clinicAddress,
                            clinicName: clinicName,
                            doctorId: doctorId,
                            specialInstruction: specialInstruction,
                          };
                          if (
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
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              />
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
                                  setCreateSchedulesModal(!CreateSchedulesModal)
                                }
                              />
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
          </View>
        </ScrollView>
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
    height: 450,
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
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
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    borderWidth: 1,
    borderColor: '#2b8ada',
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  slotTitle: {
    fontSize: 11,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
  },
  slotBackgroundActive: {
    backgroundColor: '#2b8ada',
    borderColor: '#2b8ada',
  },
  slotTitleActive: {
    fontSize: 11,
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
  cellStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  cellText: {textAlign: 'center', fontSize: 10, marginVertical: 10},
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
});

export default ManageSchedule;
