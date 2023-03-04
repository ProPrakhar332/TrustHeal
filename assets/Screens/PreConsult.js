import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  Linking,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import DoctorBasicDetails from '../Components/DoctorBasicDetails';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import CustomButton from '../Components/CustomButton';
import dayjs from 'dayjs';

const sampleQuesList = [
  {
    question: 'Are you a sugar patient?',
    questionId: 1,
  },
  {
    question: 'Do you take BP medicines?',
    questionId: 2,
  },
  {
    question: 'Were you infected with covid?',
    questionId: 3,
  },
  {
    question: 'What is your BMI?',
    questionId: 4,
  },
  {
    question: 'Does it hurt when she dont reply?',
    questionId: 5,
  },
];

function PreConsult({navigation}) {
  const [PrevPageData, setPrevPageData] = useState(null);
  const [patientDet, setpatientDet] = useState(null);
  const [DocDet, setDocDet] = useState(null);
  const [QuestionList, setQuestionList] = useState([]);
  const [documentPath, setdocumentPath] = useState(null);
  const [DocList, setDocList] = useState([]);
  const [answerUploadedButton, setanswerUploadedButton] = useState(false);
  const [answersUploaded, setanswersUploaded] = useState(false);
  const [DocsUploaded, setDocsUploaded] = useState(false);
  const [showUploadDocsButton, setshowUploadDocsButton] = useState(false);
  const [consultationId, setconsultationId] = useState(null);

  const openURL = useCallback(async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  const viewTermsConditions = () => {
    openURL('https://www.google.com');
  };
  const viewPrivacyPolicy = () => {
    openURL('https://www.google.com');
  };

  useEffect(() => {
    const LoadData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('ConfirmBookingDoctor'));
      console.log(
        '================ PREVIOUS PAGE DATA =========================\n',
        x,
      );
      setPrevPageData(x);
      setconsultationId(x.booked.consultationId);
      let temp = x.booked.preConsultationQues;
      temp.forEach(element => {
        element.answers = '';
        element.consultationId = x.booked.consultationId;
      });

      console.log('========Queslist==========\n', temp);

      setQuestionList(temp);
      setDocDet(x.doctorDet);
      let y = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      console.log(
        '================ Patient Data =========================\n',
        y,
      );
      setpatientDet(y);
      setanswerUploadedButton(false);
      console.log(
        '===============DOCS LIST========================\n',
        DocList,
      );
    };
    LoadData();
  }, []);

  useState(() => {
    if (DocList.length > 0) setshowUploadDocsButton(true);
    else setshowUploadDocsButton(false);
  }, [DocList]);

  // useState(() => {
  //   const checkanswers = () => {
  //     console.log('======== checking answers typed============');
  //     let flag = false;
  //     QuestionList.forEach(element => {
  //       console.log(element);
  //       if (element.answers == '') flag = flag || false;
  //       else flag = flag || true;
  //     });
  //     setanswerUploadedButton(flag);
  //   };

  //   checkanswers();
  // }, [QuestionList]);

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
              if (response.assets[0].fileSize <= 2097152) {
                await postpfp(response.assets[0]);
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
          if (response.assets[0].fileSize <= 2097152) {
          } else
            Alert.alert(
              'Max Size',
              'The file exceeds the maximum limit of 2MB.',
            );
        }
      },
    );
  };
  const postpfp = async pickerResult => {
    try {
      console.log('==============Inside post pfp==========');

      let ext = '.' + pickerResult.fileName.split('.').pop();

      //delete pickerResult.fileName;
      pickerResult.size = pickerResult.fileSize;
      delete pickerResult.fileSize;

      // pickerResult.name = doctorId + '_ProfilePhoto' + ext;
      //console.log(pickerResult.fileName);

      pickerResult.name = pickerResult.fileName;
      delete pickerResult.fileName;

      console.log('===========  FILE ==============\n', pickerResult);
      console.log('===========  USERID ==============\n', patientDet.patientId);

      let formData = new FormData();
      formData.append('directoryNames', 'PATIENT_DOCUMENT');
      formData.append('file', pickerResult);
      formData.append('userId', patientDet.patientId);
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

        let temp = {
          consultationId: consultationId,
          documentName: pickerResult.name,
          documentPath: response.fileToken,
          uploadedDate: dayjs().format('YYYY-MM-DD'),
        };
        let arr = [...DocList, temp];
        setDocList(arr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const selectDocs = async () => {
    try {
      console.log('==============Inside select Docs==========');

      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.pdf,
      });

      if (pickerResult.size > 2097152)
        Alert.alert(
          'Size Error',
          'The size of the file should be less than 2MB.',
        );
      else {
        console.log(pickerResult.name);

        let formData = new FormData();
        formData.append('directoryNames', 'PATIENT_DOCUMENT');
        formData.append('file', pickerResult);
        formData.append('userId', patientDet.patientId);
        const {error, response} = await fileUpload(formData);

        if (error != null) {
          console.log('======error======');
          console.log(error);
          Alert.alert(
            'Error',
            'There was a problem in selecting document. Please try again.',
          );
        } else {
          console.log('======response======');
          console.log(response.fileToken);
          if (response.fileToken != null) {
            console.log(response.fileToken);

            let temp = {
              consultationId: consultationId,
              documentName: pickerResult.name,
              documentPath: response.fileToken,
              uploadedDate: dayjs().format('YYYY-MM-DD'),
            };
            let arr = [...DocList, temp];
            setDocList(arr);
          } else Alert.alert('Error', 'Please try again.');
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const renderQues = ({item, index}) => {
    return (
      <View
        style={{
          padding: 3,
          flex: 1,
          margin: 5,
          borderRadius: 10,
        }}
        key={item.questionId}>
        <Text
          style={{
            fontSize: 13,
            color: 'gray',
            paddingHorizontal: 10,
            color: '#2b8ada',
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          {item.question}
        </Text>
        <TextInput
          style={{
            backgroundColor: '#e8f0fe',
            padding: 0,
            fontSize: 12,
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
          onChangeText={text => handleInput(text, index)}
          editable={!answersUploaded}
        />
      </View>
    );
  };

  const renderDocs = ({item, index}) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',

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
          {!DocsUploaded ? (
            <Text
              style={{
                fontSize: 12,
                marginBottom: 3,
                color: '#2b8ada',
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              File Name:-
            </Text>
          ) : null}
          <TextInput
            style={{
              backgroundColor: '#e8f0fe',
              padding: 0,
              fontSize: 12,
              borderRadius: 10,
              paddingHorizontal: 15,
            }}
            onChangeText={text => handleRename(text, index)}
            value={item.documentName}
            editable={!DocsUploaded}
            placeholderTextColor={'black'}
          />
        </View>
        {!DocsUploaded ? (
          <TouchableOpacity
            style={{marginLeft: 5, flex: 0.1, justifyContent: 'center'}}
            onPress={() => {
              removeDocsHandler(item.documentPath);
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

  const handleRename = (text, index) => {
    let temp = [...DocList];
    temp[index].documentName = text;
    setDocList(temp);
  };

  const handleInput = (text, index) => {
    let temp = [...QuestionList];
    temp[index].answers = text;
    setQuestionList(temp);
  };

  const uploadAnswers = async () => {
    const clone = JSON.parse(JSON.stringify(QuestionList));

    clone.forEach(element => {
      delete element.question;
    });
    console.log(
      '=============  Ques answer save  =====================\n',
      clone,
    );

    await axios
      .post(
        apiConfig.baseUrl + '/patient/consultation/question/answer/save',
        clone,
      )
      .then(response => {
        if (response.status == 200)
          Alert.alert(
            'Done',
            'Pre-Consultation Questionnaire submitted successfully!',
          );
        setanswersUploaded(true);
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };

  const uploadDocs = async () => {
    console.log(
      '=============  Uploading Docs  =====================\n',
      DocList,
    );

    await axios
      .post(apiConfig.baseUrl + '/patient/consultation/document/save', DocList)
      .then(response => {
        if (response.status == 200)
          Alert.alert('Done', 'Documents submitted successfully');
        setDocsUploaded(true);
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };

  const removeDocsHandler = i => {
    setDocList(DocList.filter(e => i != e.documentPath));
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
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <HeaderPatient showMenu={false} title={'PreConsult'} />
          {/* Top */}

          <DoctorBasicDetails DocDet={DocDet} />

          {/* Mid Body */}

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            {/* Step 1 */}

            <View
              style={{
                marginVertical: 20,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  backgroundColor: '#2b8ada',
                  padding: 10,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                Step 1 (Please Fill Questionnaire)
              </Text>
              <View style={{padding: 10}}>
                <FlatList
                  data={QuestionList}
                  renderItem={renderQues}
                  keyExtractor={item => item.questionId}
                />
              </View>

              {!answersUploaded ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }}>
                  <CustomButton
                    text={'Submit'}
                    textstyle={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                      alignSelf: 'center',
                    }}
                    style={{
                      flex: 0.45,
                      padding: 5,
                      paddingHorizontal: 10,
                      backgroundColor: '#2b8ada',
                      borderRadius: 10,
                      //width: '50%',
                      alignSelf: 'center',
                    }}
                    onPress={async () => {
                      await uploadAnswers();
                    }}
                  />
                </View>
              ) : null}
            </View>

            {/* Step 2 */}

            <View
              style={{
                marginVertical: 20,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  backgroundColor: '#2b8ada',
                  padding: 10,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                Step 2 (Please Upload Documents)
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  padding: 3,
                  fontSize: 12,
                  color: '#2b8ada',
                  alignSelf: 'center',
                }}>
                Note:- Documents may include lab reports, prescriptions,etc.
              </Text>
              <View style={{padding: 10}}>
                <FlatList
                  data={DocList}
                  renderItem={renderDocs}
                  keyExtractor={item => item.documentPath}
                />
              </View>

              {!DocsUploaded ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.45,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#2b8ada',
                      alignSelf: 'center',
                      borderRadius: 10,
                      padding: 3,
                      paddingHorizontal: 10,
                    }}
                    onPress={async () => {
                      if (DocList.length < 3) {
                        // await chooseProfileImage();

                        await selectDocs();
                        // setshowUploadDocsButton(true);
                      } else
                        Alert.alert(
                          'Warning',
                          'You can only upload maximum of 3 documents.',
                        );
                    }}>
                    <FAIcons
                      name="file-pdf"
                      size={15}
                      color={'#2b8ada'}
                      style={{alignSelf: 'center', marginRight: 5}}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        alignSelf: 'center',
                        color: '#2b8ada',
                      }}>
                      Add File
                    </Text>
                  </TouchableOpacity>

                  <CustomButton
                    text={'Submit'}
                    textstyle={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}
                    style={{
                      flex: 0.45,
                      padding: 5,
                      paddingHorizontal: 10,
                      backgroundColor: '#2b8ada',
                      borderRadius: 10,
                      marginVertical: 10,
                      //width: '50%',
                      alignSelf: 'center',
                    }}
                    onPress={async () => {
                      await uploadDocs();
                    }}
                  />
                </View>
              ) : null}
            </View>

            {/* Done Button */}

            <CustomButton
              text={'Done'}
              textstyle={{fontSize: 15, color: 'white', fontWeight: 'bold'}}
              style={{backgroundColor: '#17CC9C', marginVertical: 20}}
              onPress={async () => {
                if (answersUploaded == false)
                  Alert.alert(
                    'Warning',
                    'Please answer preconsultation questionnaire',
                  );
                else {
                  Alert.alert(
                    'Success',
                    `Your response has been successfully shared with doctor.`,
                  );
                  await AsyncStorage.multiRemove([
                    'ConfirmBookingDoctor',
                    'bookSlot',
                    'viewProfile',
                  ]);
                  let x = JSON.parse(
                    await AsyncStorage.getItem('UserPatientProfile'),
                  );
                  navigation.navigate('PatientHome', {patientObj: x});
                }
              }}
            />
          </View>
        </ScrollView>
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
});

export default PreConsult;
