import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const VideoCall  = ({ route, navigation })=> {
  const { receiver, currentUser } = route.params;
  
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={1772811254}
        appSign={"02fec49fa5c0b71bf6aea9cd042de44b41a785121c9257ff544cfefa25e6ced0"}
        userID={currentUser.id} // userID can be something like a phone number or the user id on your own user system. 
        userName={currentUser.name}
        callID={receiver.id} // callID can be any unique string. 
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => { navigation.navigate('BottomTabBarScreen') },
          onHangUp: () => { navigation.navigate('BottomTabBarScreen') },
        }}
      />
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
export default VideoCall