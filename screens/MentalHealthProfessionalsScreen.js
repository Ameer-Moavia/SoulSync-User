import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, Sizes, screenWidth } from '../constants/styles';
import { Icon} from 'react-native-elements';

const mentalHealthProfessionals = [
  { id: '1', name: 'Dr. John Doe', specialization: 'Psychologist', rating: 4.5, image: require('../assets/1.jpeg') },
  { id: '2', name: 'Dr. Jane Smith', specialization: 'Therapist', rating: 5.0, image: require('../assets/2.jpeg') },
  { id: '3', name: 'Dr. Alex Johnson', specialization: 'Psychiatrist', rating: 4.0, image: require('../assets/3.jpeg') },
  { id: '4', name: 'Dr. Emily Brown', specialization: 'Therapist', rating: 4.8, image: require('../assets/4.jpeg') },
  { id: '5', name: 'Dr. Michael Williams', specialization: 'Psychologist', rating: 4.2, image: require('../assets/1.jpeg') },
  { id: '6', name: 'Dr. Sarah Anderson', specialization: 'Counselor', rating: 4.7, image: require('../assets/2.jpeg') },
  { id: '7', name: 'Dr. William Johnson', specialization: 'Psychiatrist', rating: 4.3, image: require('../assets/3.jpeg') },
  { id: '8', name: 'Dr. Olivia White', specialization: 'Therapist', rating: 4.9, image: require('../assets/4.jpeg') },
  { id: '9', name: 'Dr. Benjamin Lee', specialization: 'Psychologist', rating: 4.6, image: require('../assets/1.jpeg') },
  { id: '10', name: 'Dr. Emma Davis', specialization: 'Counselor', rating: 4.1, image: require('../assets/2.jpeg') },
  { id: '11', name: 'Dr. Matthew Brown', specialization: 'Psychiatrist', rating: 4.8, image: require('../assets/3.jpeg') },
  { id: '12', name: 'Dr. Sophia Williams', specialization: 'Therapist', rating: 4.2, image: require('../assets/4.jpeg') },
  { id: '13', name: 'Dr. Ethan Taylor', specialization: 'Psychologist', rating: 4.5, image: require('../assets/1.jpeg') },
  { id: '14', name: 'Dr. Ava Miller', specialization: 'Counselor', rating: 4.7, image: require('../assets/2.jpeg') },
  { id: '15', name: 'Dr. Daniel Anderson', specialization: 'Psychiatrist', rating: 4.0, image: require('../assets/3.jpeg') },
];
const itemWidth = screenWidth - Sizes.fixPadding * 2; // Each list item takes the full screen width with padding
const itemHeight = (120 / 3) * 2; // One-third of the original height

const MentalHealthProfessionalsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.professionalsItemContainer}>
      <Image source={item.image} style={[styles.professionalsItemImage, { height: itemHeight }]} />
      <View style={styles.professionalsItemDetails}>
        <Text style={styles.professionalsItemName}>{item.name}</Text>
        <Text style={styles.professionalsItemSpecialization}>{item.specialization}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: Math.floor(item.rating) }, (v, i) => (
            <Icon key={i} name="star" size={20} color={Colors.starYellow} />
          ))}
          {item.rating % 1 !== 0 && (
            <Icon name="star-half" size={20} color={Colors.starYellow} />
          )}
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Mental Health Professionals</Text>
      <FlatList
        data={mentalHealthProfessionals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: Sizes.fixPadding + 2,
    },
    headerText: {
        
      ...Fonts.primaryColor20Bold,
        textAlign: 'center',
        marginBottom: Sizes.fixPadding+10,
      },
    professionalsItemContainer: {
      flexDirection: 'row',
      backgroundColor: Colors.lightGrayColor, // Light gray background
      padding: Sizes.fixPadding,
      borderRadius: 10,
      marginBottom: Sizes.fixPadding / 2,
      justifyContent: 'center',
      alignItems: 'center',
      elevation:3,
    },
    professionalsItemImage: {
      width: 120,
      height: itemHeight, // Adjusted height
      borderRadius: 10, // Add borderRadius to maintain rounded corners
      marginRight: Sizes.fixPadding + 1,
      borderColor: Colors.primaryColor,
      borderWidth: 2,
    },
    professionalsItemDetails: {
      flex: 1,
    },
    professionalsItemName: {
      ...Fonts.primaryColor16Bold,
      textAlign: 'left',
    },
    professionalsItemSpecialization: {
      ...Fonts.primaryColor16Medium,
      textAlign: 'left',
      marginBottom: 5,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    ratingStar: {
      color: Colors.starYellow, // Yellow color for rating star
      fontSize: 18,
    },
    ratingText: {
      ...Fonts.starYellow,
      marginLeft: 5,
    },
  });

export default MentalHealthProfessionalsScreen;