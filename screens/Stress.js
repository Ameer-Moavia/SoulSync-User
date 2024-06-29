import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';



const stress = [
  { id: '1', title: 'Top Tip for Overcoming Stress', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229928/Stress/ty36kpcjuour8osxgeoz.mp4' },
  { id: '2', title: 'Manage Stress Nuffield Health', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229949/Stress/cmzdxh8fpku7ar1zgvis.mp4' },
  { id: '3', title: 'How to Control Stress in RealTime', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229933/Stress/vlguls0o8xirxc6qwkjz.mp4' },
  { id: '4', title: 'Guided Meditation', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229943/Stress/rilxyqlydwhfrabakvzn.mp4' },
  { id: '5', title: 'Techniques for Front Line Workers', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229943/Stress/nzqpjzy0guuvrcpoorhv.mp4' },
];

const Stress = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={stress}
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

export default Stress;
