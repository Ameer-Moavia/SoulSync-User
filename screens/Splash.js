import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Splash2'); // Replace 'Splash2' with the name of your target screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pic1.jpg')}
        style={styles.image}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.icon} onPress={handlePress}>
          <AntDesign name="rightcircle" size={50} color="#00B7D3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start', // Align items at the top vertically
  },
  image: {
    width: '100%', // Set width to 100% of the parent container
    aspectRatio: 0.8, // Maintain aspect ratio (width:height)
    resizeMode: 'contain', // 'contain' or 'cover' based on your preference
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 170,
    alignItems: 'center',
  },
  icon: {},
});

export default Splash;
