import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from '../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from './firebase';
import { ref as databaseRef, onValue, off } from 'firebase/database';

const UpcomingSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const user = await AsyncStorage.getItem('emailS');
        const storedUserEmail = await AsyncStorage.getItem(`userEmail_${user}`);
        if (storedUserEmail) {
          setUserEmail(storedUserEmail.replace(/[\[\]"]+/g, ''));
        }
      } catch (error) {
        console.error('Error retrieving user email from AsyncStorage:', error);
      }
    };

    getUserEmail();
  }, []);

  const fetchAppointmentsData = () => {
    try {
      const appointmentsRef = databaseRef(database, 'Appointments');
      onValue(appointmentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const appointmentsArray = Object.values(data);
          const filteredAppointments = appointmentsArray.filter(appointment => appointment.user === userEmail);
          setAppointments(filteredAppointments);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchAppointmentsData();
    }
  }, [userEmail]);

  const Message = (data) => {
    const receiver = {
      id: data.docid,
      name: data.doctorName,
      photo: data.doctorPhoto,
    };

    const currentUser = {
      name: data.patientName,
      photo: data.patientPhoto,
      id: data.patientID,
    };

    navigation.navigate('Message', { receiver, currentUser });
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Schedule</Text>
      {appointments.map((appointment, index) => (
        <View key={index} style={styles.appoint}>
          <Image
            source={{ uri: appointment.doctorPhoto }}
            style={styles.profileImageAppoint}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.nameAppoint}>{appointment.doctorName}</Text>
            <View style={styles.row}>
              <MaterialIcons name="phone" size={16} color={Colors.primaryColor} />
              <Text style={styles.phone}>{appointment.doctorPhone}  .</Text>
              <Text style={styles.status}>{appointment.status}</Text>
              {appointment.status === 'Approved' && (
                <TouchableOpacity style={styles.messageButton} onPress={() => Message(appointment)}>
                  <MaterialIcons name="message" size={26} color={Colors.primaryColor} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.divider} />
            <Text style={styles.date}>{appointment.date} at {appointment.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
  },
  title: {
    ...Fonts.primaryColor20Bold,
    marginBottom: Sizes.fixPadding,
    textAlign: 'center',
  },
  appoint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profileImageAppoint: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameAppoint: {
    ...Fonts.blackColor16Medium,
    color: Colors.primaryColor, // dark teal
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  phone: {
    marginLeft: 5,
    ...Fonts.blackColor14Regular,
  },
  status: {
    marginLeft: 10,
    ...Fonts.blackColor14Regular,
    color: Colors.primaryColor,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  date: {
    ...Fonts.blackColor14Regular,
  },
  messageButton: {
    position: "absolute",
    right: 10,
  },
});

export default UpcomingSchedule;
