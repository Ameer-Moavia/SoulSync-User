import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes, screenWidth } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import MyStatusBar from '../components/myStatusBar';
const servicesData = [
    { id: '1', title: 'Personality Test', image: require('../assets/personalityTest.png'),onpress:"PersonalityTestScreen"},
    { id: '6', title: 'Psychlogical Test', image: require('../assets/test.png'),onpress:"PsychologicalTest" },
    { id: '2', title: 'Book Session', image: require('../assets/booksession.png'),onpress:"DoctorListsScreen" },
    { id: '3', title: 'Test Reports', image: require('../assets/reports.png'),onpress:"TestReports" },
    { id: '4', title: 'Watch Videos', image: require('../assets/videos.png'),onpress:"WatchVideos" },
    { id: '5', title: 'ChatBot', image: require('../assets/chat.png'),onpress:"ChatBot"},

  ];
  
const itemWidth = (screenWidth - 40) / 2; // Calculate the width for 2 items in a row


const ServicesScreen = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Services</Text>
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, { width: itemWidth }]} onPress={()=>{navigation.navigate(item.onpress)}}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.fixPadding,
  },
  headerText: {
        
    ...Fonts.primaryColor20Bold,
      textAlign: 'center',
      marginBottom: Sizes.fixPadding+10,
      fontSize:30,
      
    },
  cardContainer: {
    backgroundColor: Colors.lightGrayColor, // Light gray background
    padding: Sizes.fixPadding,
    borderRadius: 10,
    margin: Sizes.fixPadding / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: Sizes.fixPadding / 2,
  },
  cardTitle: {
    ...Fonts.primaryColor16Bold,
    textAlign: 'center',
  },
});

export default ServicesScreen;