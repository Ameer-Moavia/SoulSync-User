import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { Colors, Fonts, Sizes } from '../constants/styles'; // Import your custom styles
import MyStatusBar from "../components/myStatusBar";
const categories = [
  { id: '1', title: 'To overcome Depression' },
  { id: '2', title: 'To overcome Anxiety' },
  { id: '3', title: 'Stress Management' },
  { id: '4', title: 'Personal Growth' },
];

const WatchVideos = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('VideoList', { title: item.title })}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      <AntDesign name="play" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <MyStatusBar />
      <Text style={styles.title}>Watch Videos</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
       <TouchableOpacity style={styles.submitButton} onPress={()=>{navigation.navigate('Home')}}>
          <Text style={styles.submitButtonText}>Close</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding * 2,
  },
  title: {
    ...Fonts.primaryColor20Bold,
    marginBottom: Sizes.fixPadding * 2, // Increase vertical padding
    fontSize: 25,
    alignSelf: 'center',
  },
  flatListContent: {
    paddingBottom: Sizes.fixPadding * 2,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2, // Increase horizontal padding
    paddingVertical: Sizes.fixPadding * 2, // Increase vertical padding
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 7, // Add elevation for Android shadow
    backgroundColor: Colors.primaryColor, // Set background color to primary color
    borderRadius: 30, // Add border radius for rounded corners
    marginBottom: Sizes.fixPadding,
  },
  itemText: {
    ...Fonts.whiteColor19SemiBold,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: Sizes.fixPadding * 3,
    alignItems: 'center',
  },
  submitButtonText: {
    ...Fonts.whiteColor16Medium,
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default WatchVideos;