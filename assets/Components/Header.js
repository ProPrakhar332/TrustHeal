import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {FlatList} from 'react-native';
import CustomButton from './CustomButton';
import {ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import dateformatter from '../API/dateformatter';
import apiConfig from '../API/apiConfig';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import timeformatter from '../API/timeformatter';
import dayjs from 'dayjs';

const slots = [
  {id: 1, time: '11:00 AM'},
  {id: 2, time: '11:15 AM'},
  {id: 3, time: '11:30 AM'},
  {id: 4, time: '11:45 AM'},
  {id: 5, time: '12:00PM'},
  {id: 6, time: '12:15 PM'},
  {id: 7, time: '12:30 PM'},
  {id: 8, time: '12:45 PM'},
];
const NotiSample = [
  {
    id: 1,
    txt: 'Lorem Ipsum Is Simply 1 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 2,
    txt: 'Lorem Ipsum Is Simply 11 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 3,
    txt: 'Lorem Ipsum Is Simply 111 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 4,
    txt: 'Lorem Ipsum Is Simply 2 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 5,
    txt: 'Lorem Ipsum Is Simply 22 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 6,
    txt: 'Lorem Ipsum Is Simply 23 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 7,
    txt: 'Lorem Ipsum Is Simply 3 Text Of The Printing And Typesetting Industry.',
  },
  {
    id: 8,
    txt: 'Lorem Ipsum Is Simply 4 Text Of The Printing And Typesetting Industry.',
  },
];
const dataMode = [
  {key: 'VIDEO_CALL', value: 'Video'},
  {key: 'PHONE_CALL', value: 'Phone'},
];

const Header = ({title, showMenu}) => {
  const [name, setName] = useState('');
  const [mob, setMob] = useState('');
  const [mode, setMode] = useState('');
  const [date, setdate] = useState('');
  const [selectedDate, setselectedDate] = useState('');
  const [viewESlots, setviewESlots] = useState([]);
  const [fees, setfees] = useState(0);
  const [slotTime, setslotTime] = useState('');
  //const [PaymentStatus, setPaymentStatus] = useState("");
  const [slot, setSlot] = useState('');
  const [msg, setMsg] = useState('');
  const [shareModal, setShareModal] = useState(false);
  const [LocationModal, setLocationModal] = useState(false);
  const [NotificationModal, setNotificationModal] = useState(false);
  const [NotificationList, setNotificationList] = useState(NotiSample);
  const [whileUsing, setwhileUsing] = useState(false);
  const [onlyUsing, setonlyUsing] = useState(false);
  const [donAllow, setdonAllow] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setdate('');
    setDatePickerVisibility(false);
  };

  const handleConfirm = async date => {
    await AsyncStorage.setItem('date', JSON.stringify(date).substring(1, 11));
    setdate(dateformatter(JSON.stringify(date).substring(1, 11)));

    setDatePickerVisibility(false);
  };

  useEffect(() => {
    const getSlots = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      var doctorId = Number(x.doctorId);
      var date = await AsyncStorage.getItem('date');
      setslotTime('');
      console.log(doctorId);
      console.log(date);
      if (date != '') {
        axios
          .get(
            apiConfig.baseUrl +
              '/slot/all/eslot?date=' +
              date +
              '&doctorId=' +
              doctorId,
          )
          .then(function (response) {
            //console.log(response.data);
            setviewESlots(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        Alert.alert('Select a date first');
      }
    };
    if (shareModal == true) getSlots();
  }, [date]);

  useEffect(() => {
    const refresh = () => {
      setdate('');
    };
    refresh();
  }, []);

  const navigation = useNavigation();
  const removeHandler = e => {
    setNotificationList(NotificationList.filter(obj => obj.id !== e));
    // console.log(questionareList);
  };
  const RenderNotifications = () => {
    return NotificationList.map((NotificationList, index) => {
      return (
        <View style={styles.bubble} key={index}>
          <Text style={[styles.bubbleHeading, {fontWeight: 'bold'}]}>
            {NotificationList.txt}
          </Text>
          <FAIcon
            name="trash"
            color={'gray'}
            size={20}
            style={{alignSelf: 'center'}}
            onPress={() => {
              // console.log(NotificationList.ques);
              removeHandler(NotificationList.id);
            }}
          />
        </View>
      );
    });
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
        onPress={() => {
          Alert.alert('This slot is already booked!!');
        }}>
        <Text style={styles.slotTitleActive}>
          {timeformatter(item.startTime)} to {timeformatter(item.endTime)}
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
        onPress={() => {
          console.log(timeformatter(item.startTime).substring(0, 7));
          setslotTime(timeformatter(item.startTime).substring(0, 7));
        }}>
        <Text style={styles.slotTitle}>
          {timeformatter(item.startTime)} to {timeformatter(item.endTime)}
        </Text>
      </TouchableOpacity>
    );
  };

  const usingApp = () => {
    setwhileUsing(true);
    setonlyUsing(false);
    setdonAllow(false);
    setLocationModal(false);
    console.log('While using the app');
  };
  const onlyUsingApp = () => {
    setwhileUsing(false);
    setonlyUsing(true);
    setdonAllow(false);
    setLocationModal(false);
    console.log('Only using the app');
  };
  const dontAllow = () => {
    setwhileUsing(false);
    setonlyUsing(false);
    setdonAllow(true);
    setLocationModal(false);
    console.log("Don't Allow");
  };

  const Message = async () => {
    let p =
      'Hello! ' +
      name +
      ', Your Appointment has been set at ' +
      slotTime +
      ' on ' +
      date +
      ' in ' +
      (mode == 'VIDEO_CALL' ? 'Video' : 'Phone') +
      ' Consultation Mode.\n Amount Received:- ₹' +
      fees +
      '. \n Please Download the app and join the meet 10 mins before.\n Use ' +
      mob +
      ' number to login.\n Thank You and Take care';
    if (
      name !== '' &&
      mob !== '' &&
      mode !== '' &&
      fees !== '' &&
      slotTime !== '' &&
      date !== ''
    ) {
      console.log(p);
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      var doctorId = Number(x.doctorId);
      axios
        .post(apiConfig.baseUrl + '/share/patient', {
          consultationType: mode,
          doctorId: doctorId,
          fees: fees,
          patientMobileNumber: mob,
          patientName: name,
          slotDate: await AsyncStorage.getItem('date'),
          slotTime: slotTime.substring(0, 5),
        })
        .then(function (response) {
          if (response.status == 201)
            Alert.alert(
              'Slot successfully booked for ' +
                name +
                ' on ' +
                date +
                ' at ' +
                slotTime +
                ' for ' +
                (mode == 'VIDEO_CALL' ? 'Video' : 'Phone') +
                ' Consultaion.',
            );
        })
        .catch(function (error) {
          console.log(error);
        });

      reset();
    } else {
      Alert.alert('Fill all details before continuing!!');
    }
  };

  const reset = () => {
    setdate('');
    setMode('');
    setslotTime('');
    setName('');
    setMob('');
    setfees('');
    setviewESlots([]);
    setShareModal(false);
  };

  const Item = ({id, time}) => (
    <View
      style={{
        backgroundColor: '#E8F0FE',
        margin: 5,
        borderRadius: 10,
        padding: 10,
      }}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'center',
          color: 'black',
        }}
        onPress={() => {
          setSlot(time);
        }}>
        {time}
      </Text>
    </View>
  );
  const renderItem = ({item}) => <Item id={item.id} time={item.time} />;

  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      <View style={{flexDirection: 'column', alignSelf: 'center'}}>
        {showMenu ? (
          <FAIcon
            style={styles.icon}
            name="bars"
            size={20}
            color="white"
            onPress={() => {
              console.log('Menu');
              navigation.toggleDrawer();
            }}
          />
        ) : (
          <TouchableOpacity
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <FAIcon
              style={styles.icon}
              name="chevron-left"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                textAlign: 'left',
                fontSize: 15,
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[{flexDirection: 'column'}]}>
        <View style={{flexDirection: 'row'}}>
          <FAIcon
            style={styles.icon}
            name="user-circle"
            size={20}
            color="white"
            onPress={() => {
              console.log('Profile');
              navigation.navigate('Profile');
            }}
          />
          <IonIcons
            style={styles.icon}
            name="ios-location-outline"
            size={20}
            color="white"
            onPress={() => {
              setLocationModal(true);
            }}
          />

          <FAIcon
            style={styles.icon}
            name="share-alt"
            size={20}
            color="white"
            onPress={() => {
              console.log('Share');
              setShareModal(true);
            }}
          />

          <FAIcon
            style={styles.icon}
            name="bell"
            size={20}
            color="white"
            onPress={() => {
              console.log('Notifications');
              setNotificationModal(true);
            }}
          />
        </View>
      </View>
      {shareModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={shareModal}
          onRequestClose={() => {
            setModalVisible(!shareModal);
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
                  backgroundColor: 'white',
                  borderTopRightRadius: 34,
                  borderTopLeftRadius: 34,
                  padding: 20,
                  bottom: 0,
                  minHeight: 370,
                  maxHeight: 600,
                },
              ]}>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  Share with Patient
                </Text>
                <FAIcon
                  name="window-close"
                  color="black"
                  size={20}
                  style={{position: 'absolute', right: 0}}
                  onPress={() => {
                    reset();
                  }}
                />
              </View>
              <ScrollView style={{width: '95%', alignSelf: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View
                    style={[
                      styles.inputField,
                      {
                        flexDirection: 'row',
                        padding: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 12,
                        alignSelf: 'center',
                        flex: 1,
                        marginLeft: 15,
                      }}>
                      {date == '' ? 'Select Date' : date}
                    </Text>
                    <FAIcon
                      name="calendar-alt"
                      size={20}
                      style={{
                        right: 0,
                        marginRight: 20,
                      }}
                      onPress={showDatePicker}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      //minimumDate={(new Date())}
                      // maximumDate={dayjs().add(7, 'day')}
                    />
                  </View>
                  <View style={[styles.inputField, {padding: 0}]}>
                    <SelectList
                      placeholder={'Select Mode'}
                      labelStyles={{height: 0}}
                      setSelected={val => setMode(val)}
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
                </View>
                {/* Slots */}
                <View
                  style={{
                    marginTop: 5,
                    alignSelf: 'center',
                    width: '95%',
                    minHeight: 0,
                    maxHeight: 150,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', fontsize: 12, marginTop: 5}}>
                    Select Slots :- {slotTime}
                  </Text>
                  {viewESlots.length > 0 ? (
                    <View
                      style={{
                        marginBottom: 15,
                      }}>
                      <FlatList
                        horizontal={false}
                        data={viewESlots}
                        keyExtractor={(item, index) => index}
                        renderItem={renderSlot}
                        numColumns={3}
                        scrollEnabled={true}
                      />
                    </View>
                  ) : (
                    <Text
                      style={{
                        marginVertical: 10,
                      }}>
                      No slots available.
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'column',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <View
                      style={[
                        styles.inputField,
                        {paddingVertical: 0},
                        {flex: 0.49},
                      ]}>
                      <TextInput
                        onChangeText={text => setName(text)}
                        value={name}
                        style={{fontSize: 12}}
                        placeholder="Patient Name"></TextInput>
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {paddingVertical: 0},
                        {flex: 0.49},
                      ]}>
                      <TextInput
                        onChangeText={text => setMob(text)}
                        value={mob}
                        maxLength={10}
                        style={{fontSize: 12}}
                        placeholder="Mobile No."
                        keyboardType={'number-pad'}></TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={[
                        styles.inputField,
                        {paddingVertical: 0},
                        {flex: 1},
                      ]}>
                      <TextInput
                        onChangeText={text => setfees(text)}
                        value={fees}
                        style={{fontSize: 12}}
                        placeholder="Amount Received"
                        keyboardType={'number-pad'}
                        maxLength={4}></TextInput>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <CustomButton
                    text="Share"
                    textstyle={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    style={{
                      backgroundColor: '#2B8ADA',
                      alignSelf: 'center',
                      flex: 0.65,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    onPress={() => Message()}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
      {LocationModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={LocationModal}
          onRequestClose={() => {
            setLocationModal(!LocationModal);
          }}>
          <View
            style={{
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'column',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 15,
              }}>
              <FAIcon
                name="window-close"
                size={20}
                style={{position: 'absolute', top: 0, right: 0, padding: 20}}
                onPress={() => setLocationModal(false)}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}>
                Location Permission is Off
              </Text>
              <Text style={{textAlign: 'center', fontsize: 10}}>
                Allow Arogya to automatically detect your location to connect
                you to best hospital doctors nearby
              </Text>
              <Image
                source={require('../Resources/map.png')}
                style={{marginVertical: 20}}
              />
              <Text style={{marginVertical: 10, fontWeight: 'bold'}}>
                Allow Arogya to access this device location?
              </Text>
              <CustomButton
                text="While using the app"
                textstyle={{fontsize: 10}}
                style={{
                  backgroundColor: '#E8F0FE',
                  width: '95%',
                  padding: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  usingApp();
                }}
              />
              <CustomButton
                text="Only using the app"
                textstyle={{fontsize: 10}}
                style={{
                  backgroundColor: '#E8F0FE',
                  width: '95%',
                  padding: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  onlyUsingApp();
                }}
              />
              <CustomButton
                text="Don't Allow"
                textstyle={{fontsize: 10}}
                style={{
                  backgroundColor: '#E8F0FE',
                  width: '95%',
                  padding: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  dontAllow();
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
      {NotificationModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={NotificationModal}
          onRequestClose={() => {
            setNotificationModal(!NotificationModal);
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
                  backgroundColor: 'white',
                  borderRadius: 34,
                  alignSelf: 'center',
                  width: '95%',
                },
              ]}>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  Notification
                </Text>
                <FAIcon
                  name="window-close"
                  size={20}
                  onPress={() => {
                    setNotificationModal(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                />
              </View>
              <ScrollView style={{width: '100%', height: 100}}>
                <RenderNotifications />
              </ScrollView>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  icon: {
    padding: 5,
  },
  modalView: {
    borderRadius: 10,
    flex: 1,
    position: 'absolute',
    height: 350,
    width: '100%',
    backgroundColor: 'white',
    borderTopRadius: 50,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputField: {
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
    flex: 0.45,
    padding: 5,
  },

  bubbleHeading: {
    color: '#2B8ADA',
    padding: 5,
    width: '90%',
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

export default Header;
