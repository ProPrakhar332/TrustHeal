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
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Linking,
  LogBox,
} from 'react-native';
import {useCallback} from 'react';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

//icons
import doctor from '../Resources/doctor2x.png';
import earnings from '../Icons/earnings.png';
import notification from '../Icons/notification.png';
import appointment from '../Icons/appointment.png';
import help from '../Icons/help.png';
import about from '../Icons/about.png';
import waiting from '../Animations/waiting1.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import dateformatter from '../API/dateformatter';

function BasicDesign({navigation}) {
  //details

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setdob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [mob, setMob] = useState('');
  const [doctorId, setdoctorId] = useState(0);

  const [EarningModal, setEarningModal] = useState(false);
  const [EarningsData, setEarningsData] = useState([]);
  const [HelpModal, setHelpModal] = useState(false);
  const [profilePhotoPath, setprofilePhotoPath] = useState('');
  const [pfpuri, setpfpuri] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const logout = async () => {
    console.log('Logging out');
    console.log(await AsyncStorage.getAllKeys());
    await AsyncStorage.removeItem('UserDoctorProfile');
    await AsyncStorage.removeItem('mobileNumber');
    await AsyncStorage.removeItem('countryName');
    await AsyncStorage.removeItem('age');
    console.log(await AsyncStorage.getAllKeys());
    navigation.navigate('RoleScreen');
  };

  // const checkpfp = useCallback(async url => {
  //   const supported = await Linking.canOpenURL(url);
  //   if (supported) {
  //     setpfpuri(url);
  //   } else {
  //     console.log('Error in pfp');
  //   }
  // }, []);
  const download = async (fileToken, userId, fileName) => {
    // let op = {};
    // if (Platform.OS == 'ios') op = {NSURLIsExcludedFromBackupKey: true};
    // await RNFS.mkdir(`file://${RNFS.DownloadDirectoryPath}/Arogya`, op);
    let filePath = `file://${RNFS.CachesDirectoryPath}/`;
    let options = {
      fromUrl:
        apiConfig.baseUrl +
        '/file/download?fileToken=' +
        fileToken +
        '&userId=' +
        userId,
      toFile: filePath + fileName,
    };
    await RNFS.downloadFile(options)
      .promise.then(response => {
        //console.log(response);
        if (response.statusCode != 200)
          Alert.alert('Error', `Unable to load pfp. ${response.statusCode}`);
      })
      .catch(e => {
        Alert.alert('Error', `${e}`);
      });
  };

  useEffect(() => {
    const onLoadSetData = async () => {
      setisLoading(true);
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));

      //setTitle(x.fullName.substring(0, x.fullName.indexOf(' ')));
      console.log(x);
      setName(x.doctorName != undefined ? x.doctorName : x.fullName);
      setCity(x.city);
      setEmail(x.email);
      setAge(x.age + '');
      setMob(x.mobileNumber);
      setdob(x.dob);
      setGender(x.gender);
      setdoctorId(x.doctorId);
      setprofilePhotoPath(
        x.profilePhotoPath != null ? x.profilePhotoPath : null,
      );
      //console.log("doctor id" + x.doctorId);
      //checkpfp(apiConfig.baseUrl + x.profilePhotoPath);
      //setprofilePhotoPath(x.profilePhotoPath);
      setisLoading(false);
    };
    onLoadSetData();
  }, []);

  useEffect(() => {
    const loadEarning = async () => {
      axios
        .get(apiConfig.baseUrl + '/doctor/earnings?doctorId=' + doctorId)
        .then(function (response) {
          //console.log(response.data);
          setEarningsData(response.data);
        });
    };
    if (EarningModal == true) loadEarning();
  }, [EarningModal]);

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
            width: '100%',
            alignSelf: 'center',
            // marginTop: 30,
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <Header title="My Profile" showMenu={false} />
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            {/* Image and Top Text */}
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 85,
                  width: 85,
                  height: 85,
                  borderWidth: 2,
                  borderColor: '#2B8ADA',
                  justifyContent: 'center',
                }}>
                {profilePhotoPath == null ? (
                  <Image
                    source={doctor}
                    style={{
                      backgroundColor: '#2B8ADA',
                      borderRadius: 70,
                      width: 70,
                      height: 70,
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: `${apiConfig.baseUrl}/file/download?fileToken=${profilePhotoPath}&userId=${doctorId}`,
                    }}
                    style={{
                      backgroundColor: '#2B8ADA',
                      borderRadius: 70,
                      width: 70,
                      height: 70,
                      alignSelf: 'center',
                    }}
                  />
                )}
              </View>
              <View style={{alignSelf: 'center'}}>
                <Text style={[styles.blueUnderText, {textAlign: 'center'}]}>
                  {name}
                </Text>
                <Text
                  style={[
                    styles.grayHeading,
                    {color: 'black', fontSize: 17, textAlign: 'center'},
                  ]}>
                  {city}
                </Text>
                <Text style={[styles.grayHeading, {textAlign: 'center'}]}>
                  {email}
                </Text>
              </View>
            </View>

            {/* Middle White Box */}
            <View style={styles.whiteBox}>
              <View
                style={[
                  styles.whiteOuterBox,
                  {borderBottomWidth: 1, borderColor: 'gray'},
                ]}>
                <View
                  style={[
                    styles.whiteInnerBox,
                    {borderRightWidth: 1, borderColor: 'gray'},
                  ]}>
                  <Text style={styles.grayHeading}>Age</Text>
                  <Text style={styles.blueUnderText}>{age} Years</Text>
                </View>
                <View style={[styles.whiteInnerBox]}>
                  <Text style={styles.grayHeading}>Mobile Number</Text>
                  <Text style={styles.blueUnderText}>{mob}</Text>
                </View>
              </View>
              <View style={styles.whiteOuterBox}>
                <View style={[styles.whiteInnerBox]}>
                  <Text style={styles.grayHeading}>Date of Birth</Text>
                  <Text style={styles.blueUnderText}>{dateformatter(dob)}</Text>
                </View>
                <View
                  style={[
                    styles.whiteInnerBox,
                    {borderLeftWidth: 1, borderColor: 'gray'},
                  ]}>
                  <Text style={styles.grayHeading}>Gender</Text>
                  <Text style={styles.blueUnderText}>{gender}</Text>
                </View>
              </View>
            </View>
            {/* Bottom White Box */}
            <View style={styles.whiteBox}>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => setEarningModal(true)}>
                <View style={{flex: 0.3}}>
                  <Image source={earnings} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={styles.whiteBoxRowText}>My Earning</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.whiteBoxRow} onPress={() => {}}>
                <View style={{flex: 0.3}}>
                  <Image source={notification} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={styles.whiteBoxRowText}>My Notifications</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  navigation.navigate('MyUpcomingAppointment');
                }}>
                <View style={{flex: 0.3}}>
                  <Image source={appointment} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={styles.whiteBoxRowText}>My Appointment</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whiteBoxRow}
                onPress={() => {
                  // setHelpModal(true);
                  navigation.navigate('Support');
                }}>
                <View style={{flex: 0.3}}>
                  <Image source={help} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={styles.whiteBoxRowText}>Help & Support</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.whiteBoxRow, {borderBottomWidth: 0}]}
                onPress={() => navigation.navigate('About')}>
                <View style={{flex: 0.3}}>
                  <Image source={about} style={styles.whiteBoxRowIcon} />
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={styles.whiteBoxRowText}>About Aarogya</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Log Out Button */}
            <TouchableOpacity
              style={{
                borderColor: '#2B8ADA',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 5,
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('DoctorProfileEdit');
              }}>
              <FAIcon name="user-edit" color={'#2B8ADA'} size={20} />
              <Text style={{color: '#2B8ADA', marginLeft: 10}}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <CustomButton
              text="Logout"
              textstyle={{color: 'white'}}
              style={{
                backgroundColor: '#2B8ADA',
                borderRadius: 10,
                marginVertical: 5,
                width: '90%',
                alignSelf: 'center',
              }}
              onPress={logout}
            />

            {/* Earning Modal */}
            {EarningModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={EarningModal}
                onRequestClose={() => {
                  setEarningModal(!EarningModal);
                }}>
                <View style={styles.ModalBackground}>
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
                        Earning
                      </Text>
                      <FAIcon
                        name="window-close"
                        size={20}
                        onPress={() => {
                          setEarningModal(false);
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                      />
                    </View>
                    <View>
                      {/* Total P-Consultation Earnings */}
                      <View
                        style={[
                          styles.bubble,
                          {
                            flexDirection: 'column',
                            padding: 10,
                            width: '100%',
                          },
                        ]}>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.8,
                              }}>
                              <Text style={{textAlign: 'center'}}>
                                Total P-Consultation Done :
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,
                                flex: 0.2,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'right',
                                }}>
                                {EarningsData.totalPConsultation}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.8,
                              }}>
                              <Text style={{textAlign: 'center'}}>
                                Total P-Consultation Earning :
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.2,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'right',
                                }}>
                                ₹ {EarningsData.pEarning}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* Total E-Consultation Earnings */}
                      <View
                        style={[
                          styles.bubble,
                          {
                            flexDirection: 'column',
                            padding: 10,
                            width: '100%',
                          },
                        ]}>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.8,
                              }}>
                              <Text style={{textAlign: 'center'}}>
                                Total E-Consultation Done :
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.2,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'right',
                                }}>
                                {EarningsData.totalEConsultation}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.8,
                              }}>
                              <Text style={{textAlign: 'center'}}>
                                Total E-Consultation Earning :
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.2,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'right',
                                }}>
                                ₹ {EarningsData.eEarning}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* Overall Earnings */}
                      <View
                        style={[
                          styles.bubble,
                          {
                            flexDirection: 'column',
                            padding: 10,
                            paddingVertical: 5,
                            width: '100%',
                          },
                        ]}>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.8,
                              }}>
                              <Text style={{textAlign: 'center'}}>
                                Overall Earning:
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                padding: 5,

                                flex: 0.2,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'right',
                                }}>
                                ₹ {EarningsData.totalEarning}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Notification Modal */}
            {/* Help & Support */}
            {HelpModal ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={HelpModal}
                onRequestClose={() => {
                  setHelpModal(!HelpModal);
                }}>
                <View style={styles.ModalBackground}>
                  <View
                    style={[
                      styles.modalView,
                      {
                        borderRadius: 10,
                        width: '95%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: 10,
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
                          fontSize: 16,
                          padding: 5,
                        }}>
                        Help & Support
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
                        onPress={() => setHelpModal(false)}
                      />
                    </View>

                    <View style={styles.searchBar}>
                      <TextInput placeholder="Search Question" />
                      <FAIcon
                        name="search"
                        size={15}
                        color="gray"
                        style={styles.searchIcon}
                      />
                    </View>
                    <ScrollView
                      style={{
                        height: 300,
                        width: '100%',
                        flexDirection: 'column',
                      }}>
                      <View>
                        <TouchableOpacity
                          style={[styles.WhiteLabel, styles.BlueLabel]}>
                          <Text
                            style={[
                              {
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: 'white',
                              },
                            ]}>
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.BlueLabelUnderText}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: 'justify',
                            }}>
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[styles.WhiteLabel, styles.BlueLabel]}>
                          <Text
                            style={[
                              {
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: 'white',
                              },
                            ]}>
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.BlueLabelUnderText}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: 'justify',
                            }}>
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[styles.WhiteLabel, styles.BlueLabel]}>
                          <Text
                            style={[
                              {
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: 'white',
                              },
                            ]}>
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.BlueLabelUnderText}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: 'justify',
                            }}>
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[styles.WhiteLabel, styles.BlueLabel]}>
                          <Text
                            style={[
                              {
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: 'white',
                              },
                            ]}>
                            1. I Am Infected With Viral Fever. What To Do?
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.BlueLabelUnderText}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              textAlign: 'justify',
                            }}>
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And
                            Typesetting Industry. Lorem Ipsum Has Been The
                            Industry's Standard Dummy Text Ever Since The 1500S,
                            When An Unknown Printer Took A Galley Of Type And
                            Scrambled It To Make A Type Specimen Book. It Has
                            Survived.
                          </Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Speciality Modal */}
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
                Loading...
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
  grayHeading: {color: 'gray', fontSize: 15},
  blueUnderText: {
    color: '#2B8ADA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whiteInnerBox: {
    flex: 0.45,
    flexDirection: 'column',
    padding: 10,
  },
  whiteOuterBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  whiteBox: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  whiteBoxRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 5,
    alignSelf: 'center',
  },
  whiteBoxRowIcon: {width: 30, height: 30},
  whiteBoxRowText: {fontWeight: 'bold', fontSize: 16},
  modalView: {
    borderRadius: 10,
    flex: 1,
    position: 'absolute',
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
  ModalBackground: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
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
  BlueLabel: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    backgroundColor: '#2B8ADA',
  },
  BlueLabelUnderText: {
    marginTop: -6,
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    width: '95%',
    alignSelf: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchBar: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: '#2B8ADA',
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBarText: {
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 10,
  },
});

export default BasicDesign;
