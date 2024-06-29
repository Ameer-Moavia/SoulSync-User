import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';


const DepressionCure = [
  { id: '1', title: 'Overcoming Crippling Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229607/Depression/rxbhgqzaib6e31qmifqn.mp4' },
  { id: '2', title: 'How To Use Mindfulness For Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229625/Depression/py3ym47gjs5jgpjkhiqd.mp4' },
  { id: '3', title: 'Guided Meditation for Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229621/Depression/bjumwt18qop5kkhgmjtk.mp4' },
  { id: '4', title: 'Fight Depression and Burnout in 2m a Day', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229587/Depression/cuu2mwmccr4dttcguixj.mp4' },
  { id: '5', title: '10 Minute Meditation For Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229583/Depression/ureohonmsxjlwvn5ktlj.mp4' },
];

const Depression = ({ route }) => {
  const { title } = route.params;

  const renderItem = ({ item }) => (
    <VideoCard uri={item.uri} title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={DepressionCure}
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

export default Depression;