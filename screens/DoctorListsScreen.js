import React, { useState,useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import DoctorCard from "../components/DoctorCard";
import { Colors } from '../constants/styles';
import {database,ref,onValue} from './firebase';

const DoctorListsScreen = () => {
  const [searchText, setSearchText] = useState(""); // State for the search input
  const [doctorsData, setDoctorsData] = useState([]); // State for storing doctors data

  // Function to fetch doctors data from Firebase Realtime Database
  const fetchDoctorsData = () => {
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

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  // Filtered doctors based on search text
  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>All Psychologists</Text>
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={20}
            color="#00b894"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search "
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: Colors.primaryColor
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchInput: {
    flex: 1,
  },
});

export default DoctorListsScreen;
