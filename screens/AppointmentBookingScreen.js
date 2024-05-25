import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import { firestore } from './firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { database } from './firebase';
import { ref as databaseRef, get, push } from 'firebase/database';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

const AppointmentBookingScreen = ({ route }) => {
  const [timeSlots, setTimeSlots] = useState({});
  const navigation = useNavigation();
  const { doctor } = route.params ?? {};
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const user = await AsyncStorage.getItem('emailS');
        const storedUserEmail = await AsyncStorage.getItem(`userEmail_${user}`);
        setUserEmail(storedUserEmail.replace(/[\[\]"]+/g, ''));
      } catch (error) {
        console.error('Error retrieving user email from AsyncStorage:', error);
      }
    };

    const getSlots = async () => {
      try {
        const doctorsRef = databaseRef(database, 'slots');
        const doctorSnapshot = await get(doctorsRef);
        doctorSnapshot.forEach((doc) => {
          const doctorData = doc.val();
          if (doctorData.email === doctor.email) {
            console.log('Doctor time slots:', doctorData.timeSlots);
            setTimeSlots(doctorData.timeSlots);
          }
        });
      } catch (err) {
        console.log('Error fetching slots:', err);
      }
    };
    getUserEmail();
    getSlots();
  }, []);

  const uploadAppointmentToFirestore = async (userEmail) => {
    const userDataCollection = collection(firestore, 'userdata');

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('emailId', '==', userEmail)),
      );

      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(userDataCollection, docId);
      const docData = querySnapshot.docs[0].data();
      const uniqueId = uuid.v4();
      const Appointment = {
        id: uniqueId,
        docid: doctor.id,
        doctorEmail: doctor.email,
        doctorName: doctor.name,
        date: selectedDate,
        time: selectedTimeSlot,
        user: userEmail,
        doctorPhone: doctor.phoneNo,
        doctorPhoto: doctor.photo,
        patientName: docData.name,
        patientPhone: docData.phoneNo,
        patientPhoto: docData.profileImage,
        status: 'Pending',
        patientID: docData.id
      };

      await push(databaseRef(database, 'Appointments'), Appointment);
      console.log('Appointment added to Firebase successfully');
      setLoading(false);
      navigation.navigate('BottomTabBarScreen');
      console.log('Appointment uploaded to Firestore successfully.');
    } catch (error) {
      console.error('Error uploading appointment to Firestore:', error);
    }
  };

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    const selectedDateObj = new Date(date.dateString);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDateObj);
    console.log('Selected day:', dayOfWeek); // Log to verify the day of the week
    console.log('Available slots for the day:', timeSlots[dayOfWeek]); // Log to verify the available slots
    setAvailableTimeSlots(timeSlots[dayOfWeek] || []);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot === selectedTimeSlot ? null : timeSlot);
  };

  const isBookingEnabled = () => {
    return selectedDate !== null && selectedTimeSlot !== null;
  };

  const handleBookAppointment = async () => {
    if (selectedDate && selectedTimeSlot) {
      setLoading(true);
      await uploadAppointmentToFirestore(userEmail);
      setLoading(false);
    } else {
      console.log("Please select a date and time slot before booking.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Book Appointment</Text>
      </View>
      <View style={styles.doctorInfo}>
        <Image source={{ uri: doctor.photo }} style={styles.profileImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
          theme={{
            calendarBackground: "#ffffff",
            selectedDayBackgroundColor: Colors.primaryColor,
            selectedDayTextColor: "#ffffff",
            todayTextColor: Colors.primaryColor,
            dayTextColor: "#333333",
            textDisabledColor: "#d9e1e8",
            arrowColor: Colors.primaryColor,
            monthTextColor: "#333333",
            textSectionTitleColor: Colors.primaryColor,
          }}
          minDate={currentDateString}
        />
      </View>
      {selectedDate && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Text style={styles.timeSlotsTitle}>Available Time Slots</Text>
          <ScrollView style={styles.timeSlotsContainer} showsVerticalScrollIndicator={false}>
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((timeSlot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlotItem,
                    selectedTimeSlot === timeSlot && styles.selectedTimeSlot,
                  ]}
                  onPress={() => handleTimeSlotSelect(timeSlot)}
                >
                  <Text style={styles.timeSlotText}>{timeSlot}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noSlotsText}>No available slots for this day</Text>
            )}
          </ScrollView>
        </GestureHandlerRootView>
      )}
      <TouchableOpacity
        style={[
          styles.bookButton,
          (!isBookingEnabled() || loading) && styles.disabledButton,
        ]}
        onPress={handleBookAppointment}
        disabled={!isBookingEnabled() || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.whiteColor} />
        ) : (
          <Text style={styles.bookButtonText}>Book</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerText: {
    ...Fonts.blackColor22Bold,
    color: Colors.primaryColor,
    alignSelf: 'center'
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    ...Fonts.blackColor18SemiBold
  },
  calendarContainer: {
    marginBottom: 20,
  },
  timeSlotsContainer: {
    marginBottom: 20,
  },
  timeSlotsTitle: {
    ...Fonts.blackColor18SemiBold,
    marginBottom: 10,
  },
  timeSlotItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primaryColor,
  },
  timeSlotText: {
    ...Fonts.blackColor16Medium
  },
  noSlotsText: {
    textAlign: 'center',
    color: Colors.primaryColor,
    ...Fonts.blackColor16Medium,
  },
  bookButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledButton: {},
  disabledButton: {
    opacity: 0.5,
  },
  bookButtonText: {
    ...Fonts.whiteColor16Medium
  },
});

export default AppointmentBookingScreen;
