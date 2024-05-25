import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';
import colors from '../components/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { Colors, CommonStyles, Fonts, Sizes } from '../constants/styles';

const Report = () => {
  const [text, setText] = React.useState("");
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primaryColor, 
    },
  };

  const navigation = useNavigation();

  const feedback = () => {
    if (text.trim() === '') {
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a description.',
        position: 'top',
      });
    } else {
     
      Toast.show({
        type: 'success',
        text1: 'Thank You',
        text2: 'Your feedback is submitted.',
        position: 'top',
      });

      sendFeedbackToBackend(text);
    }
    setTimeout(() => {
      navigation.navigate('BottomTabBarScreen')
      console.log('Delayed code execution after 1 second');
    }, 500);
  };


  const sendFeedbackToBackend = async (feedbackText) => {
    try {
      const response = await fetch('https://api-production-9f8a.up.railway.app/products/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: feedbackText })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Feedback submitted successfully.',
        position: 'center',
        
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to submit feedback. Please try again later.',
        position: 'top',
      });
    }
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        
          <Text style={styles.title}>Report Problem</Text>
          <View style={styles.content}>
            <TextInput
              label="Describe the Problem"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.input}
              multiline
              theme={theme}
            />
          </View>

        <TouchableOpacity style={styles.continue} onPress={feedback}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginHorizontal: 30
  },
  input: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: Colors.primaryColor,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 0,
    marginHorizontal: 80,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  continue: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: Sizes.fixPadding * 3,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttontext: {
    ...Fonts.whiteColor16Medium,
    textAlign: 'center',
  }
});

export default Report;
