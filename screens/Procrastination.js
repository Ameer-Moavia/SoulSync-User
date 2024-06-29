import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';
import ProcrastinationSteps from './ProcrastinationSteps';

const procrastination = [
  { id: '1', title: 'Why you procrastinate', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229812/Procrastination/hytmjxdrgmlrhrujijlz.mp4' },
  { id: '2', title: 'How to Stop Wasting Time', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229824/Procrastination/bdkx6cwbdnojg8awbx64.mp4' },
  { id: '3', title: 'Guided meditation to stop procrastinating', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229797/Procrastination/ayoybxznkmdm0hgzulom.mp4' },
  { id: '4', title: 'Break free from procrastination', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229793/Procrastination/gsmqm09pbtcejytdeluy.mp4' },
  { id: '5', title: '7 things to cure from procrastination', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229812/Procrastination/hytmjxdrgmlrhrujijlz.mp4' },
];


const Procrastination = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={procrastination}
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

export default Procrastination;
