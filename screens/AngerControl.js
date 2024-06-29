import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';

const Anger = [
  { id: '1', title: '5 Ways to Diffuse Your anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227589/Anger%20Control/zzut0tkhzyo3ovikiugy.mp4' },
  { id: '2', title: '8 Strategies For Controlling Your Anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227596/Anger%20Control/vx6mejhbq8nvcevtghnv.mp4' },
  { id: '3', title: 'Anger Management Techniques', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227603/Anger%20Control/onz3e8ob1f1d703cm0ow.mp4' },
  { id: '4', title: 'How to Process Anger and Rage', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227591/Anger%20Control/bspqexi0g55umee31hr9.mp4' },
  { id: '5', title: 'Mufti Menk How to Control Your Anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227583/Anger%20Control/l8llmdnxfgzujn9dsb5k.mp4' },
];



const AngerControl = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={Anger}
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

export default AngerControl;
