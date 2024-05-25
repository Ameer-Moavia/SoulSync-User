import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';

const videos = [
  { id: '1', title: 'Video 1', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '2', title: 'Video 2', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '3', title: 'Video 3', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '4', title: 'Video 4', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '5', title: 'Video 5', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '6', title: 'Video 6', uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  // Add more videos as needed
];

const VideoList = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={videos}
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

export default VideoList;
