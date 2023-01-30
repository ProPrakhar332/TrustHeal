import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {FlatList} from 'react-native';
import CustomButton from './CustomButton';
import {ScrollView} from 'react-native';

//icons

import sharing from '../Icons/sharing.png';
import bell from '../Icons/bell.png';
import location from '../Icons/location.png';
import heart from '../Icons/heart.png';
import profileicon from '../Icons/profileicon.png';

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

const Header = ({title, showMenu}) => {
  const [name, setName] = useState('');
  const [mob, setMob] = useState('');
  const [mode, setMode] = useState('');
  const [date, setdate] = useState('');
  const [slot, setSlot] = useState('');
  const [msg, setMsg] = useState('');
  const [shareModal, setShareModal] = useState(false);
  const [LocationModal, setLocationModal] = useState(false);
  const [NotificationModal, setNotificationModal] = useState(false);
  const [NotificationList, setNotificationList] = useState(NotiSample);
  const [whileUsing, setwhileUsing] = useState(false);
  const [onlyUsing, setonlyUsing] = useState(false);
  const [donAllow, setdonAllow] = useState(false);
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

  const Message = () => {
    let p =
      'Hello! ' +
      name +
      ', Your Appointment has been set at ' +
      slot +
      ' on ' +
      date +
      ' in ' +
      mode +
      ' Mode.\n Please Download the app and join the meet 10 mins before.\n Use ' +
      mob +
      ' number to login.\n Thank You and Take care';
    if (name !== '' && mob !== '' && mode !== '') {
      setMsg(p);
      console.log(msg);
    }
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

      <View style={[{flexDirection: 'column', alignSelf: 'center'}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PatientProfile');
            }}>
            <Image style={styles.icon} source={profileicon} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PatientFav')}>
            <Image style={styles.icon} source={heart} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setLocationModal(true);
            }}>
            <Image style={styles.icon} source={location} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Share');
              setShareModal(true);
            }}>
            <Image style={styles.icon} source={sharing} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Notifications');
              setNotificationModal(true);
            }}>
            <Image style={styles.icon} source={bell} color="white" />
          </TouchableOpacity>
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
                  bottom: 0,
                  height: 300,
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
                    setName('');
                    setMsg('');
                    setShareModal(false);
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 30,
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: '100%',
                  }}>
                  <View style={{flex: 0.45}}>
                    <Text style={{fontSize: 12}}>Patient Name</Text>
                    <TextInput
                      style={{
                        backgroundColor: '#E8F0FE',
                        padding: 5,
                        borderRadius: 5,
                        color: 'black',
                      }}
                      onChangeText={text => setName(text)}
                      value={name}
                    />
                  </View>
                  <View style={{flex: 0.45}}>
                    <Text style={{fontSize: 12}}>Patient Mobile No.</Text>
                    <TextInput
                      style={{
                        backgroundColor: '#E8F0FE',
                        padding: 5,
                        borderRadius: 5,
                        color: 'black',
                      }}
                      onChangeText={text => setMob(text)}
                      value={mob}
                    />
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
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
                      onPress={() => {
                        console.log(name);
                        console.log(mob);
                        setShareModal(false);
                      }}
                    />
                  </View>
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
    alignSelf: 'center',
    marginHorizontal: 4,
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
    color: 'black',
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
    color: '#2B8ADA',
    padding: 5,
    width: '90%',
  },
});

export default Header;
