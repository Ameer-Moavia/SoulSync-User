import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons
import CircularProgress from 'react-native-circular-progress-indicator';
import { getDatabase, ref, set, push } from 'firebase/database';
import MyStatusBar from '../components/myStatusBar';

const PanicDisorderTest = () => {
  
  const navigation = useNavigation();
  const questions = [
    {
      description: "Felt moments of sudden terror, fear or fright, sometimes out of the blue (i.e., a panic attack)",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Felt anxious, worried, or nervous about having more panic attacks",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Had thoughts of losing control, dying, going crazy, or other bad things happening because of panic attacks",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Felt a racing heart, sweaty, trouble breathing, faint, or shaky",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Felt tense muscles, felt on edge or restless, or had trouble relaxing or trouble sleeping",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Avoided, or did not approach or enter, situations in which panic attacks might occur",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Left situations early, or participated only minimally, because of panic attacks",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Spent a lot of time preparing for, or procrastinating about (putting off), situations in which panic attacks might occur",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Distracted myself to avoid thinking about panic attacks",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    },
    {
      description: "Needed help to cope with panic attacks (e.g., alcohol or medication, superstitious objects, other people)",
      options: [
        { text: "Never", score: 0 },
        { text: "Occasionally", score: 1 },
        { text: "Half of the time", score: 2 },
        { text: "Most of the time", score: 3 },
        { text: "All of the time", score: 4 }
      ]
    }
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
    const userRef = ref(db, `tests/${sanitizedEmail}/PanicDisorder`);
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
    if (totalScore < 11) {
        return 'green';
    } else if (totalScore >= 11 && totalScore < 26) {
        return 'orange';
    } else {
        return 'red';
    }
};

const getSeverity = () => {
    if (totalScore < 10) {
        return 'Good';
    } else if (totalScore >= 11 && totalScore < 26) {
        return 'Average';
    } else if (totalScore >= 26 && totalScore < 40) {
        return 'Poor';
    } else {
        return 'Very Poor';
    }
};

  const interpretScore = () => {
    let advice = '';
    if (totalScore >= 0 && totalScore <= 10) {
      advice = 'Low level of panic disorder symptoms.';
    } else if (totalScore >= 11 && totalScore <= 25) {
      advice = 'Moderate level of panic disorder symptoms. Consider watching panic control videos.';
    } else if (totalScore >= 26) {
      advice = 'High level of panic disorder symptoms. It is advisable to consult with a healthcare provider for proper diagnosis and treatment.';
    } else {
      advice = 'Invalid score';
    }

    switch (advice) {
      case 'High level of panic disorder symptoms. It is advisable to consult with a healthcare provider for proper diagnosis and treatment.':
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
      case 'Moderate level of panic disorder symptoms. Consider watching panic control videos.':
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
         <Text style={styles.title}>Panic Disorder Test</Text>
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
              maxValue={40} // Assuming the max score is 63
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
              title='Anxiety Level'
              dashedStrokeConfig={{
                count: 50,
                width: 4,
              }}
            />
          <Text style={{...Fonts.blackColor16Medium,color: getProgressColor(),marginTop: Sizes.fixPadding,alignSelf:"center"}}>{getSeverity()}</Text>
          </View>
          {interpretScore()}
          <View>
            <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate('Home') }}>
              <Text style={styles.submitButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
      questionHeader: {
        backgroundColor: '#000000',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 3,
      },
      questionHeaderText: {
        ...Fonts.whiteColor20Bold
    
      },
    optionsContainer: {
      marginTop: Sizes.fixPadding,
    },
    optionText: {
        ...Fonts.whiteColor18SemiBold
      },option: {
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
  

export default PanicDisorderTest;
