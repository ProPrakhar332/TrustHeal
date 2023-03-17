import React, {useEffect} from 'react';
import {useId} from 'react';

import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import apiConfig from '../API/apiConfig';
import axios from 'axios';

export default function CallPage(props) {
  const {route} = props;
  const {params} = route;
  const {consultationType, callID, userID, userName, userType} = params;

  useEffect(() => {
    const statusUpdateDoctor = async () => {
      axios
        .post(
          apiConfig.baseUrl +
            '/doctor/consultation/join?consultationId=' +
            callID,
        )
        .then(response => {
          if (response.status == 200)
            console.log('Meeting going on status updated doctor');
        })
        .catch(response => {
          console.log(response);
        });
    };
    const statusUpdatePatient = async () => {
      axios
        .post(
          apiConfig.baseUrl +
            '/patient/consultation/join?consultationId=' +
            callID,
        )
        .then(response => {
          if (response.status == 200)
            console.log('Meeting going on status updated patient');
        })
        .catch(response => {
          console.log(response);
        });
    };
    if (userType == 'Doctor') statusUpdateDoctor();
    else statusUpdatePatient();
  }, []);

  const statusUpdatePatientDisconnect = async () => {
    axios
      .post(
        apiConfig.baseUrl +
          '/patient/consultation/disconnect?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('Meeting going on status updated patient disconnected');
      })
      .catch(response => {
        console.log(response);
      });
  };

  const statusUpdateDoctorDisconnect = async () => {
    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/consultation/disconnect?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('Meeting going on status updated doctor disconnected');
      })
      .catch(response => {
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      {consultationType == 'PHONE_CALL' ? (
        <ZegoUIKitPrebuiltCall
          appID={apiConfig.zegoCloudAppId}
          appSign={apiConfig.zegoCloudAppSign}
          userID={userID}
          userName={userName}
          callID={callID}
          config={{
            ...ONE_ON_ONE_VOICE_CALL_CONFIG,
            // ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onHangUp: async () => {
              if (userType == 'Doctor') {
                await statusUpdateDoctorDisconnect();
                Alert.alert(
                  'Consultation Ended',
                  'Please make sure to make prescription for the patient.',
                );
                props.navigation.goBack();
              } else {
                await statusUpdatePatientDisconnect();
                props.navigation.navigate('Consult');
              }
            },
          }}
        />
      ) : (
        <ZegoUIKitPrebuiltCall
          appID={apiConfig.zegoCloudAppId}
          appSign={apiConfig.zegoCloudAppSign}
          userID={userID}
          userName={userName}
          callID={callID}
          config={{
            // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onHangUp: async () => {
              if (userType == 'Doctor') {
                await statusUpdateDoctorDisconnect();
                Alert.alert(
                  'Consultation Ended',
                  'Please make sure to make prescription for the patient.',
                );
                props.navigation.goBack();
              } else {
                await statusUpdatePatientDisconnect();
                props.navigation.navigate('Consult');
              }
            },
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});
