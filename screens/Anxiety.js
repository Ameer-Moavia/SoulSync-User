import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';

const AnxietyAttack = [
  { id: '1', title: 'Mindful Breathing for Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229645/Anxiety/yl4hvgjdpnt249zdko06.mp4' },
  { id: '2', title: 'Mediation To Calm Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229653/Anxiety/doawhv2iclsuvigskr8m.mp4' },
  { id: '3', title: 'Managing anxiety by practicing mindfulness', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229640/Anxiety/jxr8ythbxdrki4migjgd.mp4' },
  { id: '4', title: 'Deal with Anxiety or Panic Attack', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229635/Anxiety/hclqqriyibw2gu0a20pu.mp4' },
  { id: '5', title: 'Guided Meditation for Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229633/Anxiety/hndzdnr0zzis37vj66my.mp4' },
];

const Anxiety = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={AnxietyAttack}
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

export default Anxiety;
