import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StatusBar,
} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs([
  "EventEmitter.removeListener('appStateDidChange', ...) ...",
]);
import CountryPicker from 'rn-country-picker';
import CustomButton from '../Components/CustomButton';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import BrandIcons from 'react-native-vector-icons/AntDesign';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import waiting from '../Animations/waiting1.gif';

const countries = [
  {
    code: '+7840',
    name: 'Abkhazia',
  },
  {
    code: '+93',
    name: 'Afghanistan',
  },
  {
    code: '+355',
    name: 'Albania',
  },
  {
    code: '+213',
    name: 'Algeria',
  },
  {
    code: '+1684',
    name: 'American Samoa',
  },
  {
    code: '+376',
    name: 'Andorra',
  },
  {
    code: '+244',
    name: 'Angola',
  },
  {
    code: '+1264',
    name: 'Anguilla',
  },
  {
    code: '+1268',
    name: 'Antigua and Barbuda',
  },
  {
    code: '+54',
    name: 'Argentina',
  },
  {
    code: '+374',
    name: 'Armenia',
  },
  {
    code: '+297',
    name: 'Aruba',
  },
  {
    code: '+247',
    name: 'Ascension',
  },
  {
    code: '+61',
    name: 'Australia',
  },
  {
    code: '+672',
    name: 'Australian External Territories',
  },
  {
    code: '+43',
    name: 'Austria',
  },
  {
    code: '+994',
    name: 'Azerbaijan',
  },
  {
    code: '+1242',
    name: 'Bahamas',
  },
  {
    code: '+973',
    name: 'Bahrain',
  },
  {
    code: '+880',
    name: 'Bangladesh',
  },
  {
    code: '+1246',
    name: 'Barbados',
  },
  {
    code: '+1268',
    name: 'Barbuda',
  },
  {
    code: '+375',
    name: 'Belarus',
  },
  {
    code: '+32',
    name: 'Belgium',
  },
  {
    code: '+501',
    name: 'Belize',
  },
  {
    code: '+229',
    name: 'Benin',
  },
  {
    code: '+1441',
    name: 'Bermuda',
  },
  {
    code: '+975',
    name: 'Bhutan',
  },
  {
    code: '+591',
    name: 'Bolivia',
  },
  {
    code: '+387',
    name: 'Bosnia and Herzegovina',
  },
  {
    code: '+267',
    name: 'Botswana',
  },
  {
    code: '+55',
    name: 'Brazil',
  },
  {
    code: '+246',
    name: 'British Indian Ocean Territory',
  },
  {
    code: '+1284',
    name: 'British Virgin Islands',
  },
  {
    code: '+673',
    name: 'Brunei',
  },
  {
    code: '+359',
    name: 'Bulgaria',
  },
  {
    code: '+226',
    name: 'Burkina Faso',
  },
  {
    code: '+257',
    name: 'Burundi',
  },
  {
    code: '+855',
    name: 'Cambodia',
  },
  {
    code: '+237',
    name: 'Cameroon',
  },
  {
    code: '+1',
    name: 'Canada',
  },
  {
    code: '+238',
    name: 'Cape Verde',
  },
  {
    code: '+ 345',
    name: 'Cayman Islands',
  },
  {
    code: '+236',
    name: 'Central African Republic',
  },
  {
    code: '+235',
    name: 'Chad',
  },
  {
    code: '+56',
    name: 'Chile',
  },
  {
    code: '+86',
    name: 'China',
  },
  {
    code: '+61',
    name: 'Christmas Island',
  },
  {
    code: '+61',
    name: 'Cocos-Keeling Islands',
  },
  {
    code: '+57',
    name: 'Colombia',
  },
  {
    code: '+269',
    name: 'Comoros',
  },
  {
    code: '+242',
    name: 'Congo',
  },
  {
    code: '+243',
    name: 'Congo, Dem. Rep. of (Zaire)',
  },
  {
    code: '+682',
    name: 'Cook Islands',
  },
  {
    code: '+506',
    name: 'Costa Rica',
  },
  {
    code: '+385',
    name: 'Croatia',
  },
  {
    code: '+53',
    name: 'Cuba',
  },
  {
    code: '+599',
    name: 'Curacao',
  },
  {
    code: '+537',
    name: 'Cyprus',
  },
  {
    code: '+420',
    name: 'Czech Republic',
  },
  {
    code: '+45',
    name: 'Denmark',
  },
  {
    code: '+246',
    name: 'Diego Garcia',
  },
  {
    code: '+253',
    name: 'Djibouti',
  },
  {
    code: '+1767',
    name: 'Dominica',
  },
  {
    code: '+1809',
    name: 'Dominican Republic',
  },
  {
    code: '+670',
    name: 'East Timor',
  },
  {
    code: '+56',
    name: 'Easter Island',
  },
  {
    code: '+593',
    name: 'Ecuador',
  },
  {
    code: '+20',
    name: 'Egypt',
  },
  {
    code: '+503',
    name: 'El Salvador',
  },
  {
    code: '+240',
    name: 'Equatorial Guinea',
  },
  {
    code: '+291',
    name: 'Eritrea',
  },
  {
    code: '+372',
    name: 'Estonia',
  },
  {
    code: '+251',
    name: 'Ethiopia',
  },
  {
    code: '+500',
    name: 'Falkland Islands',
  },
  {
    code: '+298',
    name: 'Faroe Islands',
  },
  {
    code: '+679',
    name: 'Fiji',
  },
  {
    code: '+358',
    name: 'Finland',
  },
  {
    code: '+33',
    name: 'France',
  },
  {
    code: '+596',
    name: 'French Antilles',
  },
  {
    code: '+594',
    name: 'French Guiana',
  },
  {
    code: '+689',
    name: 'French Polynesia',
  },
  {
    code: '+241',
    name: 'Gabon',
  },
  {
    code: '+220',
    name: 'Gambia',
  },
  {
    code: '+995',
    name: 'Georgia',
  },
  {
    code: '+49',
    name: 'Germany',
  },
  {
    code: '+233',
    name: 'Ghana',
  },
  {
    code: '+350',
    name: 'Gibraltar',
  },
  {
    code: '+30',
    name: 'Greece',
  },
  {
    code: '+299',
    name: 'Greenland',
  },
  {
    code: '+1473',
    name: 'Grenada',
  },
  {
    code: '+590',
    name: 'Guadeloupe',
  },
  {
    code: '+1671',
    name: 'Guam',
  },
  {
    code: '+502',
    name: 'Guatemala',
  },
  {
    code: '+224',
    name: 'Guinea',
  },
  {
    code: '+245',
    name: 'Guinea-Bissau',
  },
  {
    code: '+595',
    name: 'Guyana',
  },
  {
    code: '+509',
    name: 'Haiti',
  },
  {
    code: '+504',
    name: 'Honduras',
  },
  {
    code: '+852',
    name: 'Hong Kong SAR China',
  },
  {
    code: '+36',
    name: 'Hungary',
  },
  {
    code: '+354',
    name: 'Iceland',
  },
  {
    code: '+91',
    name: 'India',
  },
  {
    code: '+62',
    name: 'Indonesia',
  },
  {
    code: '+98',
    name: 'Iran',
  },
  {
    code: '+964',
    name: 'Iraq',
  },
  {
    code: '+353',
    name: 'Ireland',
  },
  {
    code: '+972',
    name: 'Israel',
  },
  {
    code: '+39',
    name: 'Italy',
  },
  {
    code: '+225',
    name: 'Ivory Coast',
  },
  {
    code: '+1876',
    name: 'Jamaica',
  },
  {
    code: '+81',
    name: 'Japan',
  },
  {
    code: '+962',
    name: 'Jordan',
  },
  {
    code: '+7 7',
    name: 'Kazakhstan',
  },
  {
    code: '+254',
    name: 'Kenya',
  },
  {
    code: '+686',
    name: 'Kiribati',
  },
  {
    code: '+965',
    name: 'Kuwait',
  },
  {
    code: '+996',
    name: 'Kyrgyzstan',
  },
  {
    code: '+856',
    name: 'Laos',
  },
  {
    code: '+371',
    name: 'Latvia',
  },
  {
    code: '+961',
    name: 'Lebanon',
  },
  {
    code: '+266',
    name: 'Lesotho',
  },
  {
    code: '+231',
    name: 'Liberia',
  },
  {
    code: '+218',
    name: 'Libya',
  },
  {
    code: '+423',
    name: 'Liechtenstein',
  },
  {
    code: '+370',
    name: 'Lithuania',
  },
  {
    code: '+352',
    name: 'Luxembourg',
  },
  {
    code: '+853',
    name: 'Macau SAR China',
  },
  {
    code: '+389',
    name: 'Macedonia',
  },
  {
    code: '+261',
    name: 'Madagascar',
  },
  {
    code: '+265',
    name: 'Malawi',
  },
  {
    code: '+60',
    name: 'Malaysia',
  },
  {
    code: '+960',
    name: 'Maldives',
  },
  {
    code: '+223',
    name: 'Mali',
  },
  {
    code: '+356',
    name: 'Malta',
  },
  {
    code: '+692',
    name: 'Marshall Islands',
  },
  {
    code: '+596',
    name: 'Martinique',
  },
  {
    code: '+222',
    name: 'Mauritania',
  },
  {
    code: '+230',
    name: 'Mauritius',
  },
  {
    code: '+262',
    name: 'Mayotte',
  },
  {
    code: '+52',
    name: 'Mexico',
  },
  {
    code: '+691',
    name: 'Micronesia',
  },
  {
    code: '+1808',
    name: 'Midway Island',
  },
  {
    code: '+373',
    name: 'Moldova',
  },
  {
    code: '+377',
    name: 'Monaco',
  },
  {
    code: '+976',
    name: 'Mongolia',
  },
  {
    code: '+382',
    name: 'Montenegro',
  },
  {
    code: '+1664',
    name: 'Montserrat',
  },
  {
    code: '+212',
    name: 'Morocco',
  },
  {
    code: '+95',
    name: 'Myanmar',
  },
  {
    code: '+264',
    name: 'Namibia',
  },
  {
    code: '+674',
    name: 'Nauru',
  },
  {
    code: '+977',
    name: 'Nepal',
  },
  {
    code: '+31',
    name: 'Netherlands',
  },
  {
    code: '+599',
    name: 'Netherlands Antilles',
  },
  {
    code: '+1869',
    name: 'Nevis',
  },
  {
    code: '+687',
    name: 'New Caledonia',
  },
  {
    code: '+64',
    name: 'New Zealand',
  },
  {
    code: '+505',
    name: 'Nicaragua',
  },
  {
    code: '+227',
    name: 'Niger',
  },
  {
    code: '+234',
    name: 'Nigeria',
  },
  {
    code: '+683',
    name: 'Niue',
  },
  {
    code: '+672',
    name: 'Norfolk Island',
  },
  {
    code: '+850',
    name: 'North Korea',
  },
  {
    code: '+1670',
    name: 'Northern Mariana Islands',
  },
  {
    code: '+47',
    name: 'Norway',
  },
  {
    code: '+968',
    name: 'Oman',
  },
  {
    code: '+92',
    name: 'Pakistan',
  },
  {
    code: '+680',
    name: 'Palau',
  },
  {
    code: '+970',
    name: 'Palestinian Territory',
  },
  {
    code: '+507',
    name: 'Panama',
  },
  {
    code: '+675',
    name: 'Papua New Guinea',
  },
  {
    code: '+595',
    name: 'Paraguay',
  },
  {
    code: '+51',
    name: 'Peru',
  },
  {
    code: '+63',
    name: 'Philippines',
  },
  {
    code: '+48',
    name: 'Poland',
  },
  {
    code: '+351',
    name: 'Portugal',
  },
  {
    code: '+1787',
    name: 'Puerto Rico',
  },
  {
    code: '+974',
    name: 'Qatar',
  },
  {
    code: '+262',
    name: 'Reunion',
  },
  {
    code: '+40',
    name: 'Romania',
  },
  {
    code: '+7',
    name: 'Russia',
  },
  {
    code: '+250',
    name: 'Rwanda',
  },
  {
    code: '+685',
    name: 'Samoa',
  },
  {
    code: '+378',
    name: 'San Marino',
  },
  {
    code: '+966',
    name: 'Saudi Arabia',
  },
  {
    code: '+221',
    name: 'Senegal',
  },
  {
    code: '+381',
    name: 'Serbia',
  },
  {
    code: '+248',
    name: 'Seychelles',
  },
  {
    code: '+232',
    name: 'Sierra Leone',
  },
  {
    code: '+65',
    name: 'Singapore',
  },
  {
    code: '+421',
    name: 'Slovakia',
  },
  {
    code: '+386',
    name: 'Slovenia',
  },
  {
    code: '+677',
    name: 'Solomon Islands',
  },
  {
    code: '+27',
    name: 'South Africa',
  },
  {
    code: '+500',
    name: 'South Georgia and the South Sandwich Islands',
  },
  {
    code: '+82',
    name: 'South Korea',
  },
  {
    code: '+34',
    name: 'Spain',
  },
  {
    code: '+94',
    name: 'Sri Lanka',
  },
  {
    code: '+249',
    name: 'Sudan',
  },
  {
    code: '+597',
    name: 'Suriname',
  },
  {
    code: '+268',
    name: 'Swaziland',
  },
  {
    code: '+46',
    name: 'Sweden',
  },
  {
    code: '+41',
    name: 'Switzerland',
  },
  {
    code: '+963',
    name: 'Syria',
  },
  {
    code: '+886',
    name: 'Taiwan',
  },
  {
    code: '+992',
    name: 'Tajikistan',
  },
  {
    code: '+255',
    name: 'Tanzania',
  },
  {
    code: '+66',
    name: 'Thailand',
  },
  {
    code: '+670',
    name: 'Timor Leste',
  },
  {
    code: '+228',
    name: 'Togo',
  },
  {
    code: '+690',
    name: 'Tokelau',
  },
  {
    code: '+676',
    name: 'Tonga',
  },
  {
    code: '+1868',
    name: 'Trinidad and Tobago',
  },
  {
    code: '+216',
    name: 'Tunisia',
  },
  {
    code: '+90',
    name: 'Turkey',
  },
  {
    code: '+993',
    name: 'Turkmenistan',
  },
  {
    code: '+1649',
    name: 'Turks and Caicos Islands',
  },
  {
    code: '+688',
    name: 'Tuvalu',
  },
  {
    code: '+1340',
    name: 'U.S. Virgin Islands',
  },
  {
    code: '+256',
    name: 'Uganda',
  },
  {
    code: '+380',
    name: 'Ukraine',
  },
  {
    code: '+971',
    name: 'United Arab Emirates',
  },
  {
    code: '+44',
    name: 'United Kingdom',
  },
  {
    code: '+1',
    name: 'United States',
  },
  {
    code: '+598',
    name: 'Uruguay',
  },
  {
    code: '+998',
    name: 'Uzbekistan',
  },
  {
    code: '+678',
    name: 'Vanuatu',
  },
  {
    code: '+58',
    name: 'Venezuela',
  },
  {
    code: '+84',
    name: 'Vietnam',
  },
  {
    code: '+1808',
    name: 'Wake Island',
  },
  {
    code: '+681',
    name: 'Wallis and Futuna',
  },
  {
    code: '+967',
    name: 'Yemen',
  },
  {
    code: '+260',
    name: 'Zambia',
  },
  {
    code: '+255',
    name: 'Zanzibar',
  },
  {
    code: '+263',
    name: 'Zimbabwe',
  },
];

const FirstScreen = ({route, navigation}) => {
  const {nextScreen} = route.params;

  const [minLength, setMinLength] = useState(10);
  const [maxLength, setMaxLength] = useState(10);

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(9000);
  const [resend, setResend] = useState(false);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [privatePolicy, setprivatePolicy] = useState(false);
  const [notification, setnotification] = useState(false);
  const [mob, setMob] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [modalVisible, setModalVisible] = useState(false);
  const [wrongOTPMessage, setwrongOTPMessage] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const selectedValue = async value => {
    await AsyncStorage.setItem('countryCode', '+' + value);
    setCountryCode('+' + value);
    if (value == '91') {
      setMaxLength(10);
    } else {
      setMaxLength(15);
    }
  };
  const onFinishCount = () => {
    setShow(false);
    setResend(false);
  };

  const onResend = () => {
    console.log('Resend OTP requested');
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
    setShow(true);
    setResend(true);
    setVal(30);
    sendOTP();
  };

  const reset = () => {
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
  };

  useEffect(() => {
    countries.forEach(async item => {
      if (item.code == countryCode) {
        await AsyncStorage.setItem('countryName', item.name);
      }
    });
  }, [countryCode]);

  const onContinuePressed = async () => {
    if (mob.length < minLength || mob.length > maxLength)
      Alert.alert('Invalid Mobile Number', 'Please enter valid mobile number!');
    else {
      //let countryCodeCache = await AsyncStorage.getItem("countryCode");
      //let no = countryCodeCache + "" + mob;
      //console.log(no);
      setwrongOTPMessage(false);
      if (privatePolicy == false)
        Alert.alert(
          'Terms and Condition',
          'Please accept privacy policy with terms & condition before continuing',
        );
      else {
        try {
          await AsyncStorage.setItem('mobileNumber', mob);
          sendOTP();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const sendOTP = async () => {
    // let no = await AsyncStorage.getItem("mobileNumber");
    // console.log(no);
    setisLoading(true);
    axios
      .post(apiConfig.baseUrl + '/login/otp/generate?mobilenumber=' + mob)
      .then(function (response) {
        setisLoading(false);
        if (response.status == 200) setModalVisible(true);
      })
      .catch(function (error) {
        console.log(error);
        setisLoading(false);
      });
  };

  const onSubmitPressed = async () => {
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '')
      Alert.alert('Invalid OTP', 'Please feed in 4 digit OTP!');
    else {
      setisLoading(true);

      let x = parseInt(pin1 + pin2 + pin3 + pin4);
      // let no = await AsyncStorage.getItem("mobileNumber");
      // console.log(no);
      axios
        .post(apiConfig.baseUrl + '/login/doctor/otp/verify', {
          mobileNumber: mob,
          otp: x,
        })
        .then(async function (response) {
          setisLoading(false);
          console.log(response.status);
          if (response.status == 204) {
            setModalVisible(false);
            reset();
            navigation.navigate(nextScreen);
          } else if (response.status == 200) {
            setModalVisible(false);
            reset();
            //console.log(response.data);
            let x = response.data;
            // if (x.doctorConfigurationDTO != null) {
            //   x.isLastStepComplete = true;
            // }

            await AsyncStorage.setItem('UserDoctorProfile', JSON.stringify(x));

            if (x.profileCompleted == true && x.verified == true)
              navigation.navigate('DoctorHome', {doctorObj: x});
            else navigation.navigate('DoctorRegistrationStep2');
          }
        })
        .catch(function (error) {
          setisLoading(false);
          if (error == 'AxiosError: Request failed with status code 400') {
            //console.log(error);
            setwrongOTPMessage(true);
            reset();
          }
        });
    }
  };
  const loginWithLinkedIn = () => {
    console.log('Login With LinkedIn');
  };
  const loginWithGoogle = () => {
    console.log('Login With Google');
  };
  const loginWithFacebook = () => {
    console.log('Login With Facebook');
  };
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
            backgroundColor: '#e8f0fe',
            // marginTop: 50,
            height: '100%',
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <Image
              source={require('../Resources/Logo.jpg')}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                borderRadius: 50,
                margin: 20,
              }}></Image>

            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
              <CountryPicker
                disable={false}
                animationType={'slide'}
                language="en"
                containerStyle={styles.pickerStyle}
                pickerTitleStyle={styles.pickerTitleStyle}
                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                countryNameTextStyle={styles.countryNameTextStyle}
                pickerTitle={'Country Picker'}
                searchBarPlaceHolder={'Search......'}
                hideCountryFlag={false}
                hideCountryCode={false}
                searchBarStyle={styles.searchBarStyle}
                countryCode={'91'}
                selectedValue={selectedValue}
              />
              <TextInput
                placeholder="Enter Mobile Number"
                style={{
                  borderRadius: 10,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  padding: 10,
                  marginVertical: 10,
                  backgroundColor: 'white',
                  width: '60%',
                  fontSize: 15,
                }}
                onChangeText={text => setMob(text)}
                value={mob}
                keyboardType={'number-pad'}
                minLength={minLength}
                maxLength={maxLength}
                contextMenuHidden={true}></TextInput>
            </View>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <CheckBox
                //title="By signing in, you agree to Aarogya Terms and Conditions and Private Policy"
                title={
                  <Text>
                    By signing in, you agree to Aarogya{' '}
                    <Text
                      style={[styles.textLink]}
                      onPress={() => {
                        viewTermsConditions();
                      }}>
                      Terms and Conditions
                    </Text>{' '}
                    and{' '}
                    <Text
                      style={[styles.textLink]}
                      onPress={() => {
                        viewPrivacyPolicy();
                      }}>
                      Privacy Policy
                    </Text>
                  </Text>
                }
                containerStyle={styles.containerStyle}
                textStyle={{width: '80%', fontSize: 11}}
                checkedColor={'#2b8ada'}
                checked={privatePolicy}
                iconType={''}
                onPress={() => setprivatePolicy(!privatePolicy)}
              />
              {/* <CheckBox
                title={"Allow us to send WhatsApp for notification"}
                containerStyle={styles.containerStyle}
                textStyle={{ width: "80%", fontSize: 11 }}
                checkedColor={"#2b8ada"}
                checked={notification}
                onPress={() => setnotification(!notification)}
              /> */}
            </View>
            <CustomButton
              text="Continue"
              textstyle={{
                color: 'white',
                fontSize: 15,
                // fontFamily: 'sans-serif-medium',
              }}
              style={{
                backgroundColor: '#2b8ada',
                width: '90%',
                alignSelf: 'center',
                marginVertical: 10,
                borderRadius: 5,
              }}
              onPress={onContinuePressed}></CustomButton>

            {/* Login with LinkedIn, Google, Facebook */}
            {/* <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithLinkedIn}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/linkedIn.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with LinkedIn</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithGoogle}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/google.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithFacebook}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/facebook.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with Facebook</Text>
                </View>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "black",
                  fontWeight: "bold",
                  // fontFamily: "sans-serif-medium",
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Text
                onPress={() => navigation.push(nextScreen)}
                style={{ color: "#2b8ada", fontWeight: "bold", fontSize: 13 }}
              >
                Register Now
              </Text>
            </View> */}
          </View>
          {modalVisible ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
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
                      Enter OTP
                    </Text>
                    <FAIcon
                      name="window-close"
                      color="black"
                      size={26}
                      style={{position: 'absolute', top: 10, right: 10}}
                      onPress={() => {
                        setModalVisible(false);
                        reset();
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '75%',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        marginVertical: 16,
                      }}>
                      Enter 4 digit OTP sent to your mobile number and
                      Registered email
                    </Text>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                      <FAIcon name="phone-alt" size={22} color="black" />
                      {'  '}
                      {mob}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin1Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={pin1 => {
                          setPin1(pin1);
                          if (pin1 != '') {
                            pin2Ref.current.focus();
                          }
                        }}
                        value={pin1}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin2Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={pin2 => {
                          setPin2(pin2);
                          if (pin2 != '') {
                            pin3Ref.current.focus();
                          }
                        }}
                        value={pin2}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin3Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={pin3 => {
                          setPin3(pin3);
                          if (pin3 != '') {
                            pin4Ref.current.focus();
                          }
                        }}
                        value={pin3}
                        style={styles.TextInputText}
                      />
                    </View>
                    <View style={styles.TextInputView}>
                      <TextInput
                        ref={pin4Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={pin4 => {
                          setPin4(pin4);
                        }}
                        value={pin4}
                        style={styles.TextInputText}
                      />
                    </View>
                  </View>
                  <CustomButton
                    text="Submit"
                    style={{
                      alignSelf: 'center',
                      width: '90%',
                      backgroundColor: '#2b8ada',
                    }}
                    textstyle={{color: 'white', fontSize: 16}}
                    onPress={onSubmitPressed}></CustomButton>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignSelf: 'center',
                      marginVertical: 10,
                      width: '95%',
                    }}>
                    {wrongOTPMessage == true ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'red',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          marginVertical: 3,
                        }}>
                        This otp is incorrect. Please recheck.
                      </Text>
                    ) : null}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        Didn't recieve the OTP.{' '}
                      </Text>
                      {resend === false ? (
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            color: '#2b8ada',
                          }}
                          onPress={onResend}>
                          Resend OTP
                        </Text>
                      ) : null}
                    </View>

                    {show ? (
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={{color: 'black'}}>
                          Resend OTP after
                          {
                            <CountDown
                              size={16}
                              until={val}
                              digitStyle={{
                                marginHorizontal: 2,
                              }}
                              digitTxtStyle={{
                                color: '#2b8ada',
                                marginTop: 25,
                              }}
                              timeToShow={['S']}
                              timeLabels={{s: null}}
                              showSeparator={true}
                              onFinish={onFinishCount}
                            />
                          }
                          sec
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fe9703',
    margin: 50,
    alignSelf: 'center',
  },

  logo: {
    width: 66,
    height: 58,
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: 'black',
  },
  pickerTitleStyle: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  pickerStyle: {
    height: 50,
    width: '30%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    marginRight: 1,
    fontSize: 15,
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    textAlign: 'right',
  },
  TextInputView: {
    marginVertical: 1,
    borderRadius: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#2b8ada',
    backgroundColor: 'white',
    width: 61,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputText: {
    width: 40,
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'center',
    padding: 0,
    color: 'black',
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#e8f0fe',
    marginVertical: 0,
    borderWidth: 0,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    height: 440,
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
});

export default FirstScreen;
