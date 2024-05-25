import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, RefreshControl, FlatList } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import MyStatusBar from '../components/myStatusBar';
import { Colors, Fonts, Sizes, screenWidth } from '../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { database, ref, onValue } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const Home = () => {

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(); // Refresh data
    setRefreshing(false);
  }, []);
  const servicesData = [
    { id: '1', title: 'Personality Test', image: require('../assets/personalityTest.png'), onpress: "PersonalityTestScreen" },
    { id: '6', title: 'Psychlogical Test', image: require('../assets/test.png'), onpress: "PsychologicalTest" },
    { id: '2', title: 'Book Session', image: require('../assets/booksession.png'), onpress: "DoctorListsScreen" },
    { id: '3', title: 'Test Reports', image: require('../assets/reports.png'), onpress: "TestReports" },
    { id: '4', title: 'Watch Videos', image: require('../assets/videos.png'), onpress: "WatchVideos" },
    { id: '5', title: 'ChatBot', image: require('../assets/chat.png'), onpress: "ChatBot" },
  ];

  const [doctorsData, setDoctorsData] = useState([]);
  const [tips, setTipsData] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const user = await AsyncStorage.getItem('emailS');
        const storedUserName = await AsyncStorage.getItem(
          `userName_${user}`,
        );
        if (storedUserName) {
          setUserName(storedUserName.replace(/[\[\]"]+/g, ''));
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchName();
    fetchDoctorsData();
    fetchData();
  }, []);

  const fetchDoctorsData = () => {
    setLoading(true)
    const doctorsRef = ref(database, 'doctorsData'); // Reference to 'doctors' node in database

    // Listen for changes to the data at the doctorsRef
    onValue(doctorsRef, (snapshot) => {

      const data = snapshot.val(); // Extract data from snapshot
      if (data) {
        // Convert object to array of doctors and set state
        const doctorsArray = Object.values(data);
        setDoctorsData(doctorsArray);
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://soulsyncadmin-production.up.railway.app/soulsync/gettips');
      const data = await response.json();
      console.log('Notifications Data:', data);
      setTipsData(data.tips)

    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const navigation = useNavigation('BottomTab');
  
  const renderItemWithShimmer = () => (
    <ShimmerPlaceholder style={styles.tipsItemContainer} shimmerColors={['black','white','black']}>
    <ShimmerPlaceholder style={styles.tipsItemTitle} shimmerColors={['black','white','black']}></ShimmerPlaceholder>
    <ShimmerPlaceholder style={styles.tipsItemDetail}shimmerColors={['black','white','black']}></ShimmerPlaceholder>
  </ShimmerPlaceholder>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
           <ShimmerPlaceholder style={{width:180,height:100,borderRadius:10}}>
  </ShimmerPlaceholder>
        {header()}
        {searchField()}
        {banner()}
        {renderServices()}
        {renderTips()}
        {renderProfessionals()}
      </ScrollView>
    </View>
  );

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <View style={styles.bannerDetailWrapStyle}>
          <Text numberOfLines={2} style={{ ...Fonts.whiteColor18SemiBold }}>
            Your mental health matters.{'\n'}Take care of yourself.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("DoctorListsScreen")}>
            <View style={styles.readMoreButtonStyle}>
              <Text style={{ fontWeight: 'bold' }}>Book Session</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/user2.png')}
          style={styles.bannerImageStyle}
        />
      </View>
    );
  }

  function searchField() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('DoctorListsScreen');
        }}
        style={styles.searchFieldWrapeStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <Text
          style={{
            ...Fonts.grayColor16Regular,
            marginHorizontal: Sizes.fixPadding,
            flex: 1,
          }}>
          Search here
        </Text>
        <MaterialCommunityIcons
          name="filter-variant"
          color={Colors.grayColor}
          size={20}
        />
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image
            source={require('../assets/user1.jpeg')}
            style={styles.userCircleImage}
          />
          <View
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              marginRight: Sizes.fixPadding,
              flex: 1,
            }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor20Bold }}>
              Hello, {userName} !
            </Text>
            <Text
              style={{
                ...Fonts.grayColor16Regular,
                marginTop: Sizes.fixPadding - 5.0,
              }}>
              Good Morning
            </Text>
          </View>
        </View>
        <View>
          <Feather
            name="bell"
            size={24}
            color={Colors.blackColor}
            onPress={() => {
              navigation.push('Notifications');
            }}
          />
          <View style={styles.notificationBedgeStyle}></View>
        </View>
      </View>
    );
  }

  function renderServices() {
    return (
      <View style={styles.list}>
        <View style={styles.header}>
          <Text style={styles.headerTextLeft}>Services</Text>
          <Text style={styles.headerTextRight} onPress={() => { navigation.navigate('Services') }}>See All</Text>
        </View>
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => { navigation.navigate(item.onpress) }}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  function renderProfessionals() {
    return (
      <View style={styles.professionalsList}>
        <View style={styles.header}>
          <Text style={styles.headerTextLeft}>Mental Health Professionals</Text>
          <Text style={styles.headerTextRight} onPress={() => { navigation.navigate('DoctorListsScreen') }}>See All</Text>
        </View>
        <FlatList
          data={doctorsData}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.professionalsItemContainer, { height: 180 }]} onPress={() => { navigation.navigate('DoctorDetailsScreen', { doctor: item }) }}>
              <View style={styles.professionalsImageContainer}>
                <Image
                  source={{ uri: item.photo }}
                  style={styles.professionalsItemImage}
                  containerStyle={styles.professionalsImageBorder}
                />
              </View>
              <Text style={styles.professionalsItemName}>{item.name}</Text>
              <Text style={styles.professionalsItemSpecialization}>{item.categories.join(", ")}</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: Math.floor(item.rating) }, (v, i) => (
                  <Icon key={i} name="star" size={20} color={Colors.starYellow} />
                ))}
                {item.rating % 1 !== 0 && (
                  <Icon name="star-half" size={20} color={Colors.starYellow} />
                )}
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function renderTips() {
    return (
      <View style={styles.tipsList}>
        <View style={styles.header}>
          <Text style={styles.headerTextLeft}>Mental Health Tips</Text>
        </View>
        <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.tipsItemContainer}>
              <Text style={styles.tipsItemTitle}>{item.title}</Text>
              <Text style={styles.tipsItemDetail}>{item.detail}</Text>
            </View>
          )}
          ListFooterComponent={loading ? renderItemWithShimmer : null}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  userCircleImage: {
    width: 56.0,
    height: 56.0,
    borderRadius: 28.0,
    resizeMode: 'cover',
  },
  searchFieldWrapeStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrayColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  notificationBedgeStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    position: 'absolute',
    backgroundColor: Colors.redColor,
    right: 3,
    top: 2,
  },
  readMoreButtonStyle: {
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding * 5.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  bannerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 3.0,
    elevation: 3.0,
    shadowColor: Colors.pinkColor,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  bannerDetailWrapStyle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Sizes.fixPadding * 2.5,
    paddingRight: Sizes.fixPadding,
  },
  bannerImageStyle: {
    height: '100%',
    width: screenWidth / 3.0,
    resizeMode: 'cover',
    marginRight: Sizes.fixPadding,
    overflow: 'hidden',
  },
  jobRecommendationTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  jobTypeWrapStyle: {
    paddingHorizontal: Sizes.fixPadding + 8.0,
    paddingVertical: Sizes.fixPadding - 2.0,
    borderRadius: Sizes.fixPadding * 5.0,
    margin: Sizes.fixPadding - 5.0,
  },
  snackBarStyle: {
    backgroundColor: Colors.grayColor,
    position: 'absolute',
    left: -10.0,
    right: -10.0,
    bottom: -10.0,
  },
  jobWrapStyle: {
    backgroundColor: 'rgba(105, 105, 105, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  sourceLogoStyle: {
    width: screenWidth / 6.0,
    height: 65.0,
    resizeMode: 'contain',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTextLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  headerTextRight: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: Colors.primaryColor,
  },
  itemContainer: {
    backgroundColor: Colors.lightGrayColor, // Light gray background
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    width: 120, // Adjust the width as needed
  },
  itemImage: {
    width: 85, // Increase the width by 2/3
    height: 85, // Increase the height by 2/3
    alignSelf: 'center',
  },
  itemTitle: {
    color: 'black', // Black text color
    fontSize: 14, // Decrease the font size
    fontWeight: 'bold',
    textAlign: 'center',// Center the text
    color: Colors.primaryColor,
  },
  tipsList: {
    marginVertical: 10,
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tipsItemContainer: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 180,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  tipsItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipsItemDetail: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },

  professionalsList: {
    marginTop: 0,
    marginLeft: 20,
    marginBottom:10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  professionalsItemContainer: {
    backgroundColor: Colors.lightGrayColor, // Light gray background
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  professionalsImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    borderColor:Colors.primaryColor,
    borderWidth: 2,
  },
  professionalsItemImage: {
    width: 80,
    height: 80,
  },
  professionalsImageBorder: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  professionalsItemName: {
    color: Colors.primaryColor, // Primary color text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  professionalsItemSpecialization: {
    color: Colors.primaryColor, // Primary color text
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    color: Colors.starYellow, // Yellow color for rating text
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Home;
