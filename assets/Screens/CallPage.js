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
    const statusUpdate = async () => {
      axios
        .post(apiConfig.baseUrl + '')
        .then(response => {
          if (response.status == 200)
            console.log('Meeting going on status updated');
        })
        .catch(response => {
          console.log(response);
        });
    };
    if (userType == 'Doctor') statusUpdate();
  }, []);

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
            onHangUp: () => {
              if (userType == 'Doctor')
                props.navigation.navigate('CheifComplaints');
              else props.navigation.navigate('PatientHome');
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
            onHangUp: () => {
              if (userType == 'Doctor')
                props.navigation.navigate('CheifComplaints');
              else props.navigation.navigate('PatientHome');
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
