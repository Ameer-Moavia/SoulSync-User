import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons
import CircularProgress from 'react-native-circular-progress-indicator';
import { firestore } from './firebase';
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc } from 'firebase/firestore';

const BAI = () => {
  const navigation = useNavigation();
  const questions = [
    {
      description: "Numbness or tingling",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Feeling hot",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Wobbliness in legs",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Unable to relax",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Fear of worst happening",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Dizzy or lightheaded",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Heart pounding / racing",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Unsteady",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Terrified or afraid",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Nervous",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Feeling of choking",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Hands trembling",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Shaky / unsteady",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Fear of losing control",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Difficulty in breathing",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Fear of dying",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Scared",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Indigestion",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Faint / lightheaded",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Face flushed",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    },
    {
      description: "Hot / cold sweats",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Mildly, but it didn’t bother me much", score: 1 },
        { text: "Moderately – it wasn’t pleasant at times", score: 2 },
        { text: "Severely – it bothered me a lot", score: 3 }
      ]
    }
  ];


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve user's email from AsyncStorage when component mounts
    const getUserEmail = async () => {
      try {
        const user = await AsyncStorage.getItem('emailS');
        const storedUserEmail = await AsyncStorage.getItem(`userEmail_${user}`).then({})

        console.log('Stored user email:', storedUserEmail);

        // Parse the string to JSON

        setUserEmail(storedUserEmail);
        console.log(userEmail)

      } catch (error) {
        console.error('Error retrieving user email from AsyncStorage:', error);
      }
    };

    getUserEmail();
  }, []);
  // Log userEmail after it has been set
  useEffect(() => {
    console.log('User email:', userEmail);
  }, [userEmail]);


  useEffect(() => {
    // Check if all questions are answered
    if (currentQuestionIndex === questions.length) {
      // Upload the score to Firestore
      uploadScoreToFirestore(userEmail);
    }
  }, [currentQuestionIndex, questions, userEmail]);
  
  const handleResponseSelection = (optionScore) => {
    setTotalScore(totalScore + optionScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const uploadScoreToFirestore = async (userEmail) => {
    const userDataCollection = collection(firestore, 'userdata');

    userEmail = userEmail.replace(/[\[\]"]+/g, '');
    console.log(userEmail)

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('emailId', '==', userEmail)),
      );

      const docId = querySnapshot.docs[0].id;
      console.log(docId)
      const userDocRef = doc(userDataCollection, docId);

      // Get the current document data
      const docData = querySnapshot.docs[0].data();

      // Get the current BAI array or initialize it if it doesn't exist
      const currentBAI = docData.BAI || [];

      // Add the new score to the BAI array
      const newBAI = [...currentBAI, { score: totalScore, date: new Date() }];

      // Update Firestore document with the new BAI array
      await updateDoc(userDocRef, {
        BAI: newBAI
      });

      console.log('Total score uploaded to Firestore successfully.');
    } catch (error) {
      console.error('Error uploading total score to Firestore:', error);
    }
  };


  const interpretScore = () => {
    let advice = '';
    if (totalScore >= 0 && totalScore <= 21) {
      advice = 'That is usually a good thing. However, it is possible that you might be unrealistic in either your assessment which would be denial or that you have learned to “mask” the symptoms commonly associated with anxiety. Too little “anxiety” could indicate that you are detached from yourself, others, or your environment.';
    } else if (totalScore >= 22 && totalScore <= 35) {
      advice = 'Your body is trying to tell you something. Look for patterns as to when and why you experience the symptoms described above. For example, if it occurs prior to public speaking and your job requires a lot of presentations you may want to find ways to calm yourself before speaking or let others do some of the presentations. You may have some conflict issues that need to be resolved. Clearly, it is not “panic” time but you want to find ways to manage the stress you feel.';
    } else if (totalScore >= 36) {
      advice = 'Look for patterns or times when you tend to feel the symptoms you have circled. Persistent and high anxiety is not a sign of personal weakness or failure. It is, however, something that needs to be proactively treated or there could be significant impacts to you mentally and physically. You may want to consult a counselor if the feelings persist.';
    } else {
      advice = 'Invalid score';
    }

    // Suggestions based on advice
    switch (advice) {
      case 'Look for patterns or times when you tend to feel the symptoms you have circled. Persistent and high anxiety is not a sign of personal weakness or failure. It is, however, something that needs to be proactively treated or there could be significant impacts to you mentally and physically. You may want to consult a counselor if the feelings persist.':
        return (
          <View>
            <Text style={styles.advice}>
              {advice}
            </Text>
            <View style={styles.services}>
              <TouchableOpacity style={[styles.cardContainer]} onPress={() => { navigation.navigate('DoctorListsScreen') }}>
                <Image source={require('../assets/booksession.png')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Book Session</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardContainer]} onPress={() => { navigation.navigate('WatchVideos') }}>
                <Image source={require('../assets/videos.png')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Watch Videos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Your body is trying to tell you something. Look for patterns as to when and why you experience the symptoms described above. For example, if it occurs prior to public speaking and your job requires a lot of presentations you may want to find ways to calm yourself before speaking or let others do some of the presentations. You may have some conflict issues that need to be resolved. Clearly, it is not “panic” time but you want to find ways to manage the stress you feel.':
        return (
          <View>
            <Text style={styles.advice}>
              {advice}
            </Text>
            <View style={styles.services}>
              <TouchableOpacity style={[styles.cardContainer]} onPress={() => { navigation.navigate('WatchVideos') }}>
                <Image source={require('../assets/videos.png')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Watch Videos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <Text style={styles.advice}>
            {advice}
          </Text>
        );
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Beck's Anxiety Inventory</Text>
      {currentQuestionIndex < questions.length ? (
        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionHeaderText}>{questions[currentQuestionIndex].description}</Text>
          </View>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleResponseSelection(option.score)}>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.noteContainer}>
            <FontAwesome5 name="exclamation-circle" size={20} color={Colors.primaryColor} style={styles.icon} />
            <Text style={styles.noteText}>Click the Option you feel for yourself.</Text>
          </View>
          <Image source={require('../assets/depressionTest.png')} style={styles.image} />
        </View>
      ) : (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>Questionnaire Completed</Text>
          <View style={styles.circularProgressContainer}>
            <CircularProgress
              value={totalScore}
              radius={105}
              maxValue={63} // Assuming the max score is 63
              strokeWidth={8}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              inActiveStrokeOpacity={0.5}
              activeStrokeColor={Colors.primaryColor}
              activeStrokeSecondaryColor={Colors.primaryColor}
              titleFontSize={15}
              backgroundStrokeColor="transparent"
              inActiveStrokeColor={Colors.lightGray}
              duration={2000}
              title='Anxiety Level'
              dashedStrokeConfig={{
                count: 50,
                width: 4,
              }}
            />
          </View>
          {interpretScore()}
          <View>
            <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate('Home') }}>
              <Text style={styles.submitButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primaryColor,
    alignSelf: 'center'
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionHeader: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    elevation: 3,
  },
  questionHeaderText: {
    ...Fonts.whiteColor20Bold

  },
  option: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 3,
    backgroundColor: Colors.primaryColor,
  },
  completedContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  completedText: {
    ...Fonts.blackColor17SemiBold,
    textAlign: 'center',
    marginBottom: 10,
  },
  totalScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  interpretation: {
    fontSize: 16,
  },
  optionText: {
    ...Fonts.whiteColor18SemiBold
  },
  submitButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 150
  },
  submitButtonText: {
    ...Fonts.whiteColor16Medium,
    textAlign: 'center',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Sizes.fixPadding,
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
  image: {
    width: 300,
    height: 250,
    marginBottom: Sizes.fixPadding / 2,
    alignSelf: 'center',
    marginTop: 10
  },
  circularProgressContainer: {
    marginVertical: 10,
  },
  advice: {
    ...Fonts.blackColor16Medium,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },

  cardContainer: {
    backgroundColor: Colors.lightGrayColor, // Light gray background
    padding: Sizes.fixPadding,
    borderRadius: 10,
    margin: Sizes.fixPadding / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%'
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
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BAI;
