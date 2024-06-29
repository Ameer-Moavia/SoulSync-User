import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import VideoCard from '../components/VideoCard'; // Import the VideoCard component
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import { getVideoDuration } from 'react-native-video-duration';

const Anxiety = [
  { id: '1', title: 'Mindful Breathing for Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229645/Anxiety/yl4hvgjdpnt249zdko06.mp4' },
  { id: '2', title: 'Mediation To Calm Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229653/Anxiety/doawhv2iclsuvigskr8m.mp4' },
  { id: '3', title: 'Managing anxiety by practicing mindfulness', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229640/Anxiety/jxr8ythbxdrki4migjgd.mp4' },
  { id: '4', title: 'Deal with Anxiety or Panic Attack', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229635/Anxiety/hclqqriyibw2gu0a20pu.mp4' },
  { id: '5', title: 'Guided Meditation for Anxiety', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229633/Anxiety/hndzdnr0zzis37vj66my.mp4' },
];
const AngerControl = [
  { id: '1', title: '5 Ways to Diffuse Your anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227589/Anger%20Control/zzut0tkhzyo3ovikiugy.mp4' },
  { id: '2', title: '8 Strategies For Controlling Your Anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227596/Anger%20Control/vx6mejhbq8nvcevtghnv.mp4' },
  { id: '3', title: 'Anger Management Techniques', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227603/Anger%20Control/onz3e8ob1f1d703cm0ow.mp4' },
  { id: '4', title: 'How to Process Anger and Rage', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227591/Anger%20Control/bspqexi0g55umee31hr9.mp4' },
  { id: '5', title: 'Mufti Menk How to Control Your Anger', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719227583/Anger%20Control/l8llmdnxfgzujn9dsb5k.mp4' },
];
const Depression = [
  { id: '1', title: 'Overcoming Crippling Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229607/Depression/rxbhgqzaib6e31qmifqn.mp4' },
  { id: '2', title: 'How To Use Mindfulness For Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229625/Depression/py3ym47gjs5jgpjkhiqd.mp4' },
  { id: '3', title: 'Guided Meditation for Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229621/Depression/bjumwt18qop5kkhgmjtk.mp4' },
  { id: '4', title: 'Fight Depression and Burnout in 2m a Day', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229587/Depression/cuu2mwmccr4dttcguixj.mp4' },
  { id: '5', title: '10 Minute Meditation For Depression', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229583/Depression/ureohonmsxjlwvn5ktlj.mp4' },
];
const PanicAttack = [
  { id: '1', title: 'The AntiStruggle Technique', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229732/Panic%20Attack/dfbr6zzhdmcudd6puziz.mp4' },
  { id: '2', title: 'Real Life Example', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229744/Panic%20Attack/jn8iawtnfw33ekr3oxv9.mp4' },
  { id: '3', title: 'How to Prevent a Panic Attack', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229732/Panic%20Attack/tpyk98ieprbul2isevgh.mp4' },
  { id: '4', title: 'How to Cope With Panic Attacks', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229740/Panic%20Attack/xiudnqxvvgb8nya3hsbf.mp4' },
  { id: '5', title: 'How to Break a Panic Attack in 2m', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229731/Panic%20Attack/tetan6oc840npjsmk8yb.mp4' },
];
const procrastination = [
  { id: '1', title: 'Why you procrastinate', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229812/Procrastination/hytmjxdrgmlrhrujijlz.mp4' },
  { id: '2', title: 'How to Stop Wasting Time', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229824/Procrastination/bdkx6cwbdnojg8awbx64.mp4' },
  { id: '3', title: 'Guided meditation to stop procrastinating', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229797/Procrastination/ayoybxznkmdm0hgzulom.mp4' },
  { id: '4', title: 'Break free from procrastination', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229793/Procrastination/gsmqm09pbtcejytdeluy.mp4' },
  { id: '5', title: '7 things to cure from procrastination', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229812/Procrastination/hytmjxdrgmlrhrujijlz.mp4' },
];

const Stress = [
  { id: '1', title: 'Top Tip for Overcoming Stress', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229928/Stress/ty36kpcjuour8osxgeoz.mp4' },
  { id: '2', title: 'Manage Stress Nuffield Health', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229949/Stress/cmzdxh8fpku7ar1zgvis.mp4' },
  { id: '3', title: 'How to Control Stress in RealTime', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229933/Stress/vlguls0o8xirxc6qwkjz.mp4' },
  { id: '4', title: 'Guided Meditation', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229943/Stress/rilxyqlydwhfrabakvzn.mp4' },
  { id: '5', title: 'Techniques for Front Line Workers', uri: 'https://res.cloudinary.com/dgtic5v9b/video/upload/v1719229943/Stress/nzqpjzy0guuvrcpoorhv.mp4' },
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
