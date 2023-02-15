import React, {useEffect} from 'react';
import {useId} from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import apiConfig from '../API/apiConfig';

export default function CallPage(props) {
  const {route} = props;
  const {params} = route;
  const {consultationType, callID, userID, userName} = params;

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
              props.navigation.navigate('DoctorHome');
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
              props.navigation.navigate('DoctorHome');
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
