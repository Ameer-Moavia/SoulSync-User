import React, { useEffect, useRef, useState} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "../components/commonText";
import { Fonts, Colors, Sizes } from "../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyStatusBar from "../components/myStatusBar";
import { Icon} from 'react-native-elements';

 const chatsList = [ { id: '1', name: 'Dr. John Doe', specialization: 'Psychologist', rating: 4.5, image: require('../assets/1.jpeg') },
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

const ChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatsList.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Each list item takes the full screen width with padding
  const itemHeight = (120 / 3) * 2; // One-third of the original height
  
  function chatsInfo() {
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
        <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapper}>
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <TextInput
          placeholder="Search Here"
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          cursorColor={Colors.primaryColor}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {searchField()}
        {chatsInfo()}
      </View>
    </View>
  );
};
 const styles = StyleSheet.create({
    searchFieldWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.extraLightGrayColor,
      padding: Sizes.fixPadding + 2.0,
      borderRadius: Sizes.fixPadding,
      marginHorizontal: Sizes.fixPadding-5,
      marginTop: Sizes.fixPadding - 5.0,
      marginBottom: Sizes.fixPadding,
    },
    
    headerText: {
        ...Fonts.primaryColor20Bold,
          textAlign: 'center',
          marginVertical: Sizes.fixPadding+10,
        },
    searchFieldStyle: {
      ...Fonts.grayColor16Regular,
      flex: 1,   
      includeFontPadding: false,
      padding:0
    },
    unreadMsgCountWrapper: {
      width: 24.0,
      height: 24.0,
      borderRadius: 12.0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primaryColor,
      overflow: "hidden",
      marginTop: Sizes.fixPadding - 5.0,
    },
    sourceImageStyle: {
      width: 50.0,
      height: 50.0,
      borderRadius: 25.0,
      resizeMode: "contain",
    },
    chatInfoWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginBottom: Sizes.fixPadding * 2.4,
    },
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
        marginHorizontal:5,
        alignItems: 'center',
        elevation:3,
      },
      professionalsItemImage: {
        width: 120,
        height: (120 / 3) * 2, // Adjusted height
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

export default ChatScreen;