import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons
import CircularProgress from 'react-native-circular-progress-indicator';
import { getDatabase, ref, set, push } from 'firebase/database';
import MyStatusBar from '../components/myStatusBar';

const EpworthSleepinessScale = () => {

  const navigation = useNavigation();
  const questions = [
    { description: "Sitting and reading", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "Watching TV", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "Sitting, inactive in a public place (e.g., a theatre or a meeting)", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "As a passenger in a car for an hour without a break", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "Lying down to rest in the afternoon when circumstances permit", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "Sitting and talking to someone", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "Sitting quietly after a lunch without alcohol", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] },
    { description: "In a car, while stopped for a few minutes in the traffic", options: [ { text: "Would never doze", score: 0 }, { text: "Slight chance of dozing", score: 1 }, { text: "Moderate chance of dozing", score: 2 }, { text: "High chance of dozing", score: 3 } ] }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userEmail, setUserEmail] = useState("");

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

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      uploadScoreToDatabase(userEmail);
    }
  }, [currentQuestionIndex, questions.length, userEmail]);

  const handleResponseSelection = (optionScore) => {
    setTotalScore(totalScore + optionScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const sanitizeEmail = (email) => {
    return email.replace(/\./g, '_');
  };

  const uploadScoreToDatabase = async (userEmail) => {
    const db = getDatabase();
    const sanitizedEmail = sanitizeEmail(userEmail);
    const userRef = ref(db, `tests/${sanitizedEmail}/ESS`);
    try {
      const newTestRef = push(userRef);
      await set(newTestRef, {
        score: totalScore,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error uploading total score to Realtime Database:', error);
    }
  };

  const getProgressColor = () => {
    if (totalScore <= 10) {
        return 'green';
    } else if (totalScore >= 11 && totalScore <= 12) {
        return 'orange';
    } else {
        return 'red';
    }
};

const getSeverity = () => {
    if (totalScore <= 10) {
        return 'Normal range';
    } else if (totalScore >= 11 && totalScore <= 12) {
        return 'Borderline';
    } else {
        return 'Abnormal';
    }
};

  const interpretScore = () => {
    let advice = '';
    if (totalScore <= 10) {
      advice = 'Normal level of daytime sleepiness.';
    } else if (totalScore >= 11 && totalScore <= 12) {
      advice = 'Borderline level of daytime sleepiness.';
    } else {
      advice = 'Abnormal level of daytime sleepiness. It is advisable to consult with a healthcare provider for proper diagnosis and treatment.';
    }

    switch (advice) {
      case 'Abnormal level of daytime sleepiness. It is advisable to consult with a healthcare provider for proper diagnosis and treatment.':
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
      case 'Borderline level of daytime sleepiness.':
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
          <View>
            <Text style={styles.advice}>
              {advice}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
        <MyStatusBar/>
         <Text style={styles.title}>Epworth Sleepiness Scale</Text>
      {currentQuestionIndex < questions.length ? (
        <ScrollView style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionHeaderText}>{questions[currentQuestionIndex].description}</Text>
          </View>
          <View style={styles.optionsContainer}>
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
        </ScrollView>
      ) : (
        
        <View style={styles.completedContainer}>
        <Text style={styles.completedText}>Questionnaire Completed</Text>
        <View style={styles.circularProgressContainer}>
          <CircularProgress
            value={totalScore}
            radius={105}
            maxValue={24} // Assuming the max score is 63
            strokeWidth={8}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            inActiveStrokeOpacity={0.5}
            activeStrokeColor={getProgressColor()}
            activeStrokeSecondaryColor={getProgressColor()}
            titleFontSize={15}
            backgroundStrokeColor="transparent"
            inActiveStrokeColor={Colors.lightGray}
            duration={2000}
            title='Sleepiness Level'
            dashedStrokeConfig={{
              count: 50,
              width: 4,
            }}
          />
        <Text style={{...Fonts.blackColor16Medium,color: getProgressColor(),marginTop: Sizes.fixPadding,alignSelf:"center"}}>{getSeverity()}</Text>
        </View>
        {interpretScore()}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.homeButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
      
  optionText: {
    ...Fonts.whiteColor18SemiBold
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
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  advice: {
    ...Fonts.blackColor16Medium,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Sizes.fixPadding * 2.0,
  },services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
  homeButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 150
  },
  homeButtonText: {
    ...Fonts.whiteColor16Medium,
    textAlign: 'center',
  
  },
});

export default EpworthSleepinessScale;
