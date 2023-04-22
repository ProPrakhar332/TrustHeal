import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  Alert,
  useWindowDimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/HeaderPatient';
import {StyleSheet} from 'react-native';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import waiting from '../Animations/waiting1.gif';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';

function SupportPatient({navigation}) {
  const [doctorObj, setdoctorObj] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [message, setmessage] = useState('');
  const [docList, setdocList] = useState([]);
  const [DocsUploaded, setDocsUploaded] = useState(false);
  const [type, setType] = useState(null);
  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      console.log('profile: ', x);
      setdoctorObj(x);
    };
    setisLoading(true);
    onLoadSetData();

    setisLoading(false);
  }, []);

  useEffect(() => {
    console.log('Doc List is\n\n');
    console.log(docList);
  }, [docList]);

  const chooseProfileImage = async () => {
    Alert.alert('Select Files', 'Select option for uploading files', [
      {
        text: 'Open Library',
        onPress: () => {
          launchImageLibrary({mediaType: 'photo'}, async response => {
            console.log(response);
            if (response.didCancel) console.log('Cancel');
            else if (response.errorCode) {
              Alert.alert('Error', response.errorMessage);
            } else {
              if (response.assets[0].fileSize <= 5242880) {
                //await postpfp(response.assets[0]);
                //docList.push(response.assets[0]);
                //let temp = docList;
                setdocList([...docList, response.assets[0]]);
              } else
                Alert.alert(
                  'Max Size',
                  'The file exceeds the maximum limit of 5MB.',
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
    ]);
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
      async response => {
        console.log(response);
        if (response.didCancel) console.log('Cancel');
        else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets[0].fileSize <= 5242880) {
            // docList.push(response.assets[0]);
            setdocList([...docList, response.assets[0]]);
          } else
            Alert.alert(
              'Max Size',
              'The file exceeds the maximum limit of 5MB.',
            );
        }
      },
    );
  };
  //   const postpfp = async pickerResult => {
  //     try {
  //       console.log('==============Inside post pfp==========');

  //       let ext = '.' + pickerResult.fileName.split('.').pop();

  //       //delete pickerResult.fileName;
  //       pickerResult.size = pickerResult.fileSize;
  //       delete pickerResult.fileSize;

  //       // pickerResult.name = doctorId + '_ProfilePhoto' + ext;
  //       //console.log(pickerResult.fileName);

  //       pickerResult.name = pickerResult.fileName;
  //       delete pickerResult.fileName;

  //       console.log('===========  FILE ==============\n', pickerResult);
  //       console.log(
  //         '===========  USERID ==============\n',
  //         patientDet.patientId,
  //       );

  //       let formData = new FormData();
  //       formData.append('directoryNames', 'DOCTOR_HELP_SUPPORT');
  //       formData.append('file', pickerResult);
  //       formData.append('userId', patientDet.patientId);
  //       const {error, response} = await fileUpload(formData);

  //       if (error != null) {
  //         console.log('======error======');
  //         console.log(error);
  //         Alert.alert(
  //           'Error',
  //           'There was a problem in uploading profile picture. Please try again.',
  //         );
  //       } else {
  //         console.log('======response======');
  //         console.log(response.fileToken);

  //         let temp = {
  //           consultationId: consultationId,
  //           documentName: pickerResult.name,
  //           documentPath: response.fileToken,
  //           //uploadedDate: dayjs().format('YYYY-MM-DD'),
  //         };
  //         let arr = [...DocList, temp];
  //         setDocList(arr);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  const dropdownData = [
    {key: 'Technical', value: 'Technical'},
    {key: 'Slot Creation', value: 'Slot Creation'},
    {key: 'Patient Related', value: 'Patient Related'},
    {key: 'Feedback', value: 'Feedback'},
    {key: 'Payment', value: 'Payment'},
    {key: 'Other', value: 'Other'},
  ];
  const renderDocs = ({item, index}) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: '#e8f0fe',
            padding: 5,
            borderRadius: 10,
            margin: 3,
            flex: 1,
            justifyContent: 'center',
          },
          !DocsUploaded ? {borderColor: '#2b8ada', borderWidth: 1} : null,
        ]}
        key={item.documentPath}>
        <View style={{flex: 0.9, flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 3,
              color: 'black',
              paddingHorizontal: 10,
            }}>
            {item.fileName}
          </Text>
        </View>
        {!DocsUploaded ? (
          <TouchableOpacity
            style={{marginLeft: 5, flex: 0.1, justifyContent: 'center'}}
            onPress={() => {
              removeDocsHandler(item.fileName);
            }}>
            <FAIcons
              name="trash"
              size={15}
              style={{
                alignSelf: 'center',

                color: 'red',
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  const removeDocsHandler = i => {
    setdocList(docList.filter(e => i != e.fileName));
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
            width: '100%',
            alignSelf: 'center',
            // marginTop: 30,
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <StatusBar animated={true} backgroundColor="#2B8ADA" />
          <Header title="Help & Support" showMenu={false} />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              width: '95%',
              alignSelf: 'center',
            }}>
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text
                style={{
                  textAlign: 'justify',
                  color: '#2B8ADA',
                  fontSize: 20,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  borderBottomColor: '#2B8ADA',
                  marginVertical: 20,
                }}>
                Help & Support
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: '95%',
                padding: 10,
                paddingVertical: 25,
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              {/* Sub-Heading */}
              <View style={{flex: 1, padding: 10}}>
                <Text style={styles.parStyles}>
                  Drop your queries & feedback here. Your queries will be
                  resolved within 24 hours.
                </Text>
              </View>

              {/* Support Type */}
              <View style={{flex: 1, padding: 10}}>
                <Text style={styles.inputLabel}>Select Query Type</Text>
                <SelectList
                  placeholder=" "
                  setSelected={val => setType(val)}
                  data={dropdownData}
                  save="value"
                  boxStyles={{
                    backgroundColor: '#E8F0FE',
                    borderWidth: 0,
                    padding: 0,
                    borderRadius: 5,
                    color: 'black',
                  }}
                  dropdownStyles={{backgroundColor: 'white'}}
                  dropdownTextStyles={{
                    color: '#2b8ada',
                    fontWeight: 'bold',
                  }}
                  badgeStyles={{backgroundColor: '#2b8ada'}}
                />
              </View>
              {/* Support Message */}
              <View style={{flex: 1, padding: 10}}>
                <Text style={styles.inputLabel}>Type your concern here</Text>
                <TextInput
                  style={{
                    backgroundColor: '#e8f0fe',
                    padding: 0,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    minHeight: 50,
                    maxHeight: 100,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  onChangeText={text => setmessage(text)}
                  value={message}
                  multiline={true}
                />
              </View>
              {/* Attatchments */}
              <View style={{flex: 1, padding: 10}}>
                <Text style={styles.inputLabel}>Attach screenshot if any</Text>

                <View>
                  <FlatList
                    data={docList}
                    renderItem={renderDocs}
                    keyExtractor={item => item.fileName}
                    //style={{}}
                  />
                  <CustomButton
                    text={'+ Add Image'}
                    textstyle={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                    style={{
                      flex: 0.3,
                      backgroundColor: '#2b8ada',
                      alignSelf: 'flex-end',
                      borderRadius: 10,
                      marginTop: 10,
                      padding: 7,
                      paddingHorizontal: 20,
                    }}
                    onPress={() => {
                      if (docList.length < 2) chooseProfileImage();
                      else
                        Alert.alert(
                          'File Limit',
                          'Maximum 2 images can be uploaded.',
                        );
                    }}
                  />
                </View>
              </View>
              {/* Submit Button */}
              <View style={{flex: 1, padding: 10}}>
                <CustomButton
                  text={'Submit'}
                  textstyle={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                  style={{
                    backgroundColor: '#17CC9C',
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              </View>
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
  parStyles: {
    textAlign: 'justify',
    fontSize: 13,
    marginVertical: 5,
    lineHeight: 15,
    color: 'black',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2b8ada',
  },
});

export default SupportPatient;
