import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';

const Panic= [
  { id: '1', title: 'The AntiStruggle Technique', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229732/Panic%20Attack/dfbr6zzhdmcudd6puziz.mp4' },
  { id: '2', title: 'Real Life Example', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229744/Panic%20Attack/jn8iawtnfw33ekr3oxv9.mp4' },
  { id: '3', title: 'How to Prevent a Panic Attack', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229732/Panic%20Attack/tpyk98ieprbul2isevgh.mp4' },
  { id: '4', title: 'How to Cope With Panic Attacks', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229740/Panic%20Attack/xiudnqxvvgb8nya3hsbf.mp4' },
  { id: '5', title: 'How to Break a Panic Attack in 2m', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229731/Panic%20Attack/tetan6oc840npjsmk8yb.mp4' },
];
const PanicAttack = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={Panic}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
    color: Colors.primaryColor
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default PanicAttack;
