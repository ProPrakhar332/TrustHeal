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

function BasicDesign({navigation}) {
  const [PrevPageData, setPrevPageData] = useState(null);
  const [patientDet, setpatientDet] = useState(null);
  const [DocDet, setDocDet] = useState(null);
  const [QuestionList, setQuestionList] = useState([]);
  const [documentPath, setdocumentPath] = useState(null);

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
      setDocDet(x.doctorDet);
      let y = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      console.log(
        '================ Patient Data =========================\n',
        y,
      );
      setpatientDet(y);
    };
    LoadData();
  }, []);

  useEffect(() => {
    const getPreconsultationQuestions = async () => {
      console.log(
        '==================FETCHING PRECONSULT QUESTIONS==========================',
      );

      setQuestionList(sampleQuesList);

      //   await axios
      //     .get(apiConfig.baseUrl + '/patient/preconsultation/questions')
      //     .then(response => {
      //       if (response.status == 200) {
      //         // setQuestionList(response.data);
      //       }
      //     })
      //     .catch(error => {
      //       Alert.alert('Error', `Error in fetching preconsult ques.\n${error}`);
      //     });
      // };
    };
    if (DocDet != null) getPreconsultationQuestions();
  }, [DocDet]);

  const chooseProfileImage = async () => {
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
      // pickerResult.size = pickerResult.fileSize;
      // delete pickerResult.fileSize;

      // pickerResult.name = doctorId + '_ProfilePhoto' + ext;
      console.log(pickerResult.name);
      console.log(pickerResult);

      let formData = new FormData();
      formData.append('directoryNames', 'PATIENT_DOCUMENT');
      formData.append('file', pickerResult);
      formData.append('userId', patientDet.patientId);
      if (profilePhotoPath != null)
        formData.append('fileToken', profilePhotoPath);
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
        setdocumentPath(response.fileToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadDocs = async () => {
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
            setdocumentPath(response.fileToken);
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

  const renderQues = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          flex: 1,
          margin: 5,
          borderRadius: 10,
        }}
        key={item.questionId}>
        <Text style={{fontSize: 12, color: 'gray', paddingHorizontal: 10}}>
          {item.question}
        </Text>
      </View>
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
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <HeaderPatient showMenu={false} title={'PreConsult'} />
          {/* Top */}
          <DoctorBasicDetails DocDet={DocDet} />
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
            }}>
            <View style={{marginTop: 20}}>
              <FlatList
                data={sampleQuesList}
                renderItem={renderQues}
                keyExtractor={item => item.questionId}
              />
            </View>

            <View
              style={{
                marginTop: 10,
                borderStyle: 'dotted',
                borderWidth: 2,
                borderColor: '#2b8ada',
                padding: 20,
                borderRadius: 20,
              }}>
              <TouchableOpacity
                style={{justifyContent: 'center', flexDirection: 'row'}}
                onPress={chooseProfileImage}>
                <FAIcons
                  name="file-upload"
                  size={20}
                  style={{alignSelf: 'center', marginRight: 5}}
                />
                <Text style={{fontSize: 15, alignSelf: 'center'}}>
                  Upload Documents
                </Text>
              </TouchableOpacity>
            </View>
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

export default BasicDesign;
