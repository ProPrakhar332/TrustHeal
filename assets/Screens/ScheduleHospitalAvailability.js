import React from 'react';
import {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {FlatList} from 'react-native';

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
//images
import pfp1 from '../Resources/pfp1.jpg';
import chatting from '../Resources/chattingMedium.png';

import DaysCreator from '../API/slotscreate';
import {useIsFocused} from '@react-navigation/native';

const ScheduleHospitalAvailability = props => {
  const [ViewSchedulesModal, setViewSchedulesModal] = useState(false);
  const [ViewEConsultations, setViewEConsultations] = useState(true);
  const [ViewPConsultations, setViewPConsultations] = useState(false);
  const [upcomingEConsultations, setupcomingEConsultations] = useState(false);
  const [upcomingPConsultations, setupcomingPConsultations] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);
  const [HistoryModal, setHistoryModal] = useState(false);
  const [TodaysModal, setTodaysModal] = useState(false);
  const [ConsultationQuestionnaire, setConsultationQuestionnaire] =
    useState(false);
  const [PCclinicName, setPCclinicName] = useState('');
  const [PCclinicAddress, setPCclinicAddress] = useState('');
  const [ClinicDet, setClinicDet] = useState([]);
  const [DaysSlot, setDaysSlot] = useState([]);
  const [Days, setDays] = useState(null);
  const [Slots, setSlots] = useState([]);
  const [DaysSlotRefresh, setDaysSlotRefresh] = useState(false);

  const navigation = useNavigation();
  const onJoinPress = (userID, userName) => {
    navigation.navigate('CallPage', {
      userID: userID,
      userName: userName,
    });
  };

  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      setDaysSlot(DaysCreator);
      let slots =
        '[{"endTime":"10:20","isBooked":false,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"10:00"},{"endTime":"10:50","isBooked":true,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"10:30"},{"endTime":"11:20","isBooked":false,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"11:00"},{"endTime":"11:50","isBooked":true,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"11:30"},{"endTime":"12:20","isBooked":false,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"12:00"},{"endTime":"12:50","isBooked":true,"isDeleted":true,"slotDate":"2022-11-13","slotId":0,"startTime":"12:30"}]';
      setSlots(JSON.parse(slots));
      // setTitle(x.title);
      // setName(x.doctorName);
      // setEmail(x.email);
      // setGender(x.gender);
      // setCity(x.city);
      // setdob(x.dob);
      // setAge(x.age + "");
    };
    onLoadSetData();
  }, []);

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
        onPress={() => console.log(item.date)}>
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
          console.log(JSON.stringify(DaysSlot));
        }}>
        <Text style={styles.bubbleTitle}>
          {item.day + '\n' + new Date(item.date).getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSlot = ({item}) => {
    return item.isBooked ? (
      <TouchableOpacity
        style={[
          styles.slotBackgroundActive,
          {
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => console.log(item.slotId)}>
        <Text style={styles.slotTitleActive}>
          {item.startTime} to {item.endTime}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[
          styles.slotBackground,
          {
            justifyContent: 'center',
            marginRight: 5,
          },
        ]}
        onPress={() => console.log(item.slotId)}>
        <Text style={styles.slotTitle}>
          {item.startTime} to {item.endTime}
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
        }}>
        <ScrollView
          style={{
            backgroundColor: '#e8f0fe',
            marginTop: 30,
            width: '100%',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <Header showMenu={true} />
          <View style={{flexDirection: 'column'}}>
            <View style={{backgroundColor: '#E8F0FE'}}>
              <View>
                <Text
                  style={{
                    color: '#2B8ADA',
                    textDecorationLine: 'underline',
                    alignSelf: 'flex-end',
                    margin: 5,
                    marginHorizontal: 10,
                    fontSize: 12,
                  }}
                  onPress={() => {
                    setViewSchedulesModal(true);
                  }}>
                  View More
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                  marginVertical: 5,
                }}>
                <CheckBox
                  title="E-Consultation"
                  containerStyle={styles.checkBoxContainerStyle}
                  textStyle={{width: '80%', fontSize: 14}}
                  checkedColor={'#2b8ada'}
                  checked={upcomingEConsultations}
                  onPress={() => {
                    setupcomingEConsultations(!upcomingEConsultations);
                  }}
                />
                <CheckBox
                  title="P-Consultation"
                  containerStyle={styles.checkBoxContainerStyle}
                  textStyle={{width: '80%', fontSize: 14}}
                  checkedColor={'#2b8ada'}
                  checked={upcomingPConsultations}
                  onPress={() => {
                    setupcomingPConsultations(!upcomingPConsultations);
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button
                  title="Join As Oliver"
                  onPress={() => {
                    onJoinPress('oliver', 'Oliver');
                  }}
                />
                <Button
                  title="Join As Jack"
                  onPress={() => {
                    onJoinPress('jack', 'Jack');
                  }}
                />
              </View>
              <View>
                {/*Card Design */}
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginTop: 10,
                    }}>
                    <FAIcon
                      name="prescription"
                      size={20}
                      style={{marginHorizontal: 5}}
                      onPress={() => navigation.push('CheifComplaints')}
                    />
                    <CustomButton
                      text="Pre Consultation"
                      textstyle={{color: 'white', fontSize: 10}}
                      style={{
                        backgroundColor: '#2B8ADA',
                        padding: 3,
                        marginHorizontal: 5,
                        paddingHorizontal: 7,
                        padding: 4,
                      }}
                      onPress={() => setConsultationQuestionnaire(true)}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}>
                    <Image
                      source={pfp1}
                      style={{
                        width: 90,
                        height: 90,
                        alignSelf: 'center',
                        borderRadius: 5,
                        margin: 5,
                        marginHorizontal: 10,
                      }}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          flexDirection: 'row',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Mr Rohan Kumar
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '20%',
                            marginRight: '5%',
                          }}>
                          <Text style={styles.cardText}>Age</Text>
                        </View>
                        <View style={{flexDirection: 'column', width: '60%'}}>
                          <Text style={styles.cardText}>40</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '20%',
                            marginRight: '5%',
                          }}>
                          <Text style={styles.cardText}>Location</Text>
                        </View>
                        <View style={{flexDirection: 'column', width: '60%'}}>
                          <Text style={styles.cardText}>Agra</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '20%',
                            marginRight: '5%',
                          }}>
                          <Text style={styles.cardText}>Symptoms</Text>
                        </View>
                        <View style={{flexDirection: 'column', width: '60%'}}>
                          <Text style={styles.cardText}>
                            Fever, Cough, Headache
                          </Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '20%',
                            marginRight: '5%',
                          }}>
                          <Text style={styles.cardText}>Slot</Text>
                        </View>
                        <View style={{flexDirection: 'column', width: '60%'}}>
                          <Text style={styles.cardText}>9:00 AM | Monday</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      text="E-Consultation"
                      textstyle={{fontSize: 10, color: '#2B8ADA'}}
                      style={{
                        borderWidth: 1,
                        borderColor: '#2B8ADA',
                        padding: 3,
                        alignSelf: 'center',
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}
                    />
                    <CustomButton
                      text="P-Consultation"
                      textstyle={{fontSize: 10, color: 'white'}}
                      style={{
                        backgroundColor: '#2B8ADA',
                        padding: 3,
                        alignSelf: 'center',
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        padding: 3,
                        paddingHorizontal: 5,
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                      }}
                      onPress={() => setHistoryModal(true)}>
                      <FAIcon
                        name="file-pdf"
                        color={'black'}
                        size={12}
                        style={{marginRight: 5}}
                      />
                      <Text style={{fontSize: 10}}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        padding: 3,
                        paddingHorizontal: 5,
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                      }}
                      onPress={() => setTodaysModal(true)}>
                      <FAIcon
                        name="file-pdf"
                        color={'black'}
                        size={12}
                        style={{marginRight: 5}}
                      />
                      <Text style={{fontSize: 10}}>Today's Doc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#2B8ADA',
                        padding: 5,
                        borderRadius: 10,
                        alignSelf: 'center',
                      }}
                      onPress={() => setChattingModal(true)}>
                      <Image
                        source={chatting}
                        style={{
                          width: 15,
                          height: 15,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {ViewSchedulesModal ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={ViewSchedulesModal}
              onRequestClose={() => {
                setViewSchedulesModal(false);
              }}>
              <View
                style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={[styles.modalView, {flexDirection: 'column'}]}>
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginTop: 15,
                      }}>
                      View Schedules
                    </Text>
                    <FAIcon
                      name="window-close"
                      color="black"
                      size={26}
                      style={{position: 'absolute', top: 10, right: 10}}
                      onPress={() => {
                        setViewSchedulesModal(false);
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {ViewEConsultations ? (
                      <Button
                        disabled
                        title="E-Consultation"
                        onPress={() => {}}></Button>
                    ) : (
                      <Button
                        color={'#2b8ada'}
                        title="E-Consultation"
                        style={{backgroundColor: '#fff', borderColor: 'blue'}}
                        onPress={() => {
                          setViewEConsultations(!ViewEConsultations);
                          setViewPConsultations(!ViewPConsultations);
                        }}></Button>
                    )}
                    {ViewPConsultations ? (
                      <Button
                        disabled
                        title="P-Consultation"
                        onPress={() => {}}></Button>
                    ) : (
                      <Button
                        color={'#2b8ada'}
                        title="P-Consultation"
                        style={{backgroundColor: '#fff', borderColor: 'blue'}}
                        onPress={() => {
                          setViewEConsultations(!ViewEConsultations);
                          setViewPConsultations(!ViewPConsultations);
                        }}></Button>
                    )}
                  </View>
                  {ViewPConsultations ? (
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Text style={{fontWeight: 'bold'}}>Clinic Name </Text>
                      <SelectList
                        //defaultOption={ClinicDet[0].key}
                        placeholder={' '}
                        setSelected={val => setPCclinicName(val)}
                        onSelect={setPCclinicAddress}
                        data={ClinicDet}
                        save={'key'}
                        boxStyles={{
                          backgroundColor: '#E8F0FE',
                          borderWidth: 0,
                          flex: 1,
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
                  ) : null}
                  <View style={{flexDirection: 'row'}}>
                    {DaysSlot.length > 0 ? (
                      <View>
                        <FlatList
                          horizontal={true}
                          data={DaysSlot}
                          extraData={DaysSlotRefresh}
                          keyExtractor={item => item.date}
                          renderItem={renderDaysSlot}
                          style={{marginVertical: 10}}
                        />
                      </View>
                    ) : (
                      <Text>No dates available.</Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    {Days != null ? (
                      Slots.length > 0 ? (
                        <View>
                          <FlatList
                            horizontal={false}
                            data={Slots}
                            keyExtractor={(item, index) => index}
                            renderItem={renderSlot}
                            style={{marginVertical: 10}}
                            numColumns={3}
                          />
                        </View>
                      ) : (
                        <Text>No slots available.</Text>
                      )
                    ) : (
                      <Text>Choose date to view slots.</Text>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}
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
    height: 550,
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    padding: 10,
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
});

export default ScheduleHospitalAvailability;
