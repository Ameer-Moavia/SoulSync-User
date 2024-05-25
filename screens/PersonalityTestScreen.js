import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons

const PersonalityTestScreen = () => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim().split(' ').length >= 50) {
      submitData(inputText);
    } else {
      // Minimum 40 words condition not satisfied
      Alert.alert('Error', 'Please input at least 50 words.');
    }
  };

  const submitData = async (data) => {
    try {
      const response = await fetch('http://192.168.187.204:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data }), // Assuming your API expects JSON data
      });

      if (response.ok) {
        // POST request successful
        const responseData = await response.json();
        console.log('Response from server:', responseData); // Print the response array in the console
        // Navigate to PredictionScreen with parameters
        navigation.navigate('PredictionScreen', {
          personalityType: responseData[0],
          maxProbability: responseData[responseData.length - 1]
        });
      } else {
        // Server returned an error status code
        Alert.alert('Error', 'Failed to submit input. Please try again later.');
      }
    } catch (error) {
      // Error occurred during the fetch operation
      console.error('Error submitting input:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.headerText}>Personality Test</Text>
        <View style={styles.contentContainer}>
          <Image source={require('../assets/personality.png')} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Describe yourself here..."
            multiline={true}
            onChangeText={setInputText}
          />
          {inputText.trim().split(' ').length < 50 && (
            <View style={styles.noteContainer}>
              <FontAwesome5 name="exclamation-circle" size={20} color={Colors.primaryColor} style={styles.icon} />
              <Text style={styles.noteText}>Minimum 50 words required.</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding * 2,
    backgroundColor: 'white',
  },
  headerText: {
    ...Fonts.primaryColor20Bold,
    textAlign: 'center',
    marginBottom: Sizes.fixPadding + 10,
    fontSize: 25,
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: Sizes.fixPadding / 2,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    padding: Sizes.fixPadding,
    marginTop: Sizes.fixPadding / 2, // Adjusted margin top
    minHeight: 120,
    borderStyle: 'dashed',
    borderWidth: 2.5,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.lightGrayColor,
    borderRadius: 10,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  noteText: {
    ...Fonts.primaryColor16Regular,
    color: Colors.primaryColor,
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
  },
});

export default PersonalityTestScreen;
