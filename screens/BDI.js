import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons
import CircularProgress from 'react-native-circular-progress-indicator';
import { firestore } from './firebase';
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BDI = () => {
  const navigation = useNavigation();
const questions = [
    {
      description: "1. Sadness",
      options: [
        { text: "I do not feel sad.", score: 0 },
        { text: "I feel sad.", score: 1 },
        { text: "I am sad all the time and I can't snap out of it.", score: 2 },
        { text: "I am so sad and unhappy that I can't stand it.", score: 3 }
      ]
    },
    {
      description: "2. Pessimism",
      options: [
        { text: "I am not particularly discouraged about the future.", score: 0 },
        { text: "I feel discouraged about the future.", score: 1 },
        { text: "I feel I have nothing to look forward to.", score: 2 },
        { text: "I feel the future is hopeless and that things cannot improve.", score: 3 }
      ]
    },
    {
      description: "3. Past failure",
      options: [
        { text: "I do not feel like a failure.", score: 0 },
        { text: "I feel I have failed more than the average person.", score: 1 },
        { text: "As I look back on my life, all I can see is a lot of failures.", score: 2 },
        { text: "I feel I am a complete failure as a person.", score: 3 }
      ]
    },
    {
      description: "4. Loss of pleasure",
      options: [
        { text: "I get as much satisfaction out of things as I used to.", score: 0 },
        { text: "I don't enjoy things the way I used to.", score: 1 },
        { text: "I don't get real satisfaction out of anything anymore.", score: 2 },
        { text: "I am dissatisfied or bored with everything.", score: 3 }
      ]
    },
    {
      description: "5. Guilty feelings",
      options: [
        { text: "I don't feel particularly guilty", score: 0 },
        { text: "I feel guilty a good part of the time.", score: 1 },
        { text: "I feel quite guilty most of the time.", score: 2 },
        { text: "I feel guilty all of the time.", score: 3 }
      ]
    },
    {
      description: "6. Punishment feelings",
      options: [
        { text: "I don't feel I am being punished.", score: 0 },
        { text: "I feel I may be punished.", score: 1 },
        { text: "I expect to be punished.", score: 2 },
        { text: "I feel I am being punished.", score: 3 }
      ]
    },
    {
      description: "7. Self-dislike",
      options: [
        { text: "I don't feel disappointed in myself.", score: 0 },
        { text: "I am disappointed in myself.", score: 1 },
        { text: "I am disgusted with myself.", score: 2 },
        { text: "I hate myself.", score: 3 }
      ]
    },
    {
      description: "8. Self-criticalness",
      options: [
        { text: "I don't feel I am any worse than anybody else.", score: 0 },
        { text: "I am critical of myself for my weaknesses or mistakes.", score: 1 },
        { text: "I blame myself all the time for my faults.", score: 2 },
        { text: "I blame myself for everything bad that happens.", score: 3 }
      ]
    },
    {
      description: "9. Suicidal thoughts or wishes",
      options: [
        { text: "I don't have any thoughts of killing myself.", score: 0 },
        { text: "I have thoughts of killing myself, but I would not carry them out.", score: 1 },
        { text: "I would like to kill myself.", score: 2 },
        { text: "I would kill myself if I had the chance.", score: 3 }
      ]
    },
    {
      description: "10. Crying",
      options: [
        { text: "I don't cry any more than usual.", score: 0 },
        { text: "I cry more now than I used to.", score: 1 },
        { text: "I cry all the time now.", score: 2 },
        { text: "I used to be able to cry, but now I can't cry even though I want to.", score: 3 }
      ]
    },
    {
      description: "11. Agitation",
      options: [
        { text: "I am no more irritated by things than I ever was.", score: 0 },
        { text: "I am slightly more irritated now than usual.", score: 1 },
        { text: "I am quite annoyed or irritated a good deal of the time.", score: 2 },
        { text: "I feel irritated all the time.", score: 3 }
      ]
    },
    {
      description: "12. Loss of interest",
      options: [
        { text: "I have not lost interest in other people.", score: 0 },
        { text: "I am less interested in other people than I used to be.", score: 1 },
        { text: "I have lost most of my interest in other people.", score: 2 },
        { text: "I have lost all of my interest in other people.", score: 3 }
      ]
    },
    {
      description: "13. Indecisiveness",
      options: [
        { text: "I make decisions about as well as I ever could.", score: 0 },
        { text: "I put off making decisions more than I used to.", score: 1 },
        { text: "I have greater difficulty in making decisions more than I used to.", score: 2 },
        { text: "I can't make decisions at all anymore.", score: 3 }
      ]
    },
    {
      description: "14. Worthlessness",
      options: [
        { text: "I don't feel that I look any worse than I used to.", score: 0 },
        { text: "I am worried that I am looking old or unattractive.", score: 1 },
        { text: "I feel there are permanent changes in my appearance that make me look unattractive.", score: 2 },
        { text: "I believe that I look ugly.", score: 3 }
      ]
    },
    {
      description: "15. Loss of energy",
      options: [
        { text: "I can work about as well as before.", score: 0 },
        { text: "It takes an extra effort to get started at doing something.", score: 1 },
        { text: "I have to push myself very hard to do anything.", score: 2 },
        { text: "I can't do any work at all.", score: 3 }
      ]
    },
    {
      description: "16. Changes in sleeping pattern",
      options: [
        { text: "I can sleep as well as usual.", score: 0 },
        { text: "I don't sleep as well as I used to.", score: 1 },
        { text: "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.", score: 2 },
        { text: "I wake up several hours earlier than I used to and cannot get back to sleep.", score: 3 }
      ]
    },
    {
      description: "17. Irritability",
      options: [
        { text: "I don't get more tired than usual.", score: 0 },
        { text: "I get tired more easily than I used to.", score: 1 },
        { text: "I get tired from doing almost anything.", score: 2 },
        { text: "I am too tired to do anything.", score: 3 }
      ]
    },
    {
      description: "18. Changes in appetite",
      options: [
        { text: "My appetite is no worse than usual.", score: 0 },
        { text: "My appetite is not as good as it used to be.", score: 1 },
        { text: "My appetite is much worse now.", score: 2 },
        { text: "I have no appetite at all anymore.", score: 3 }
      ]
    },
    {
      description: "19. Concentration difficulty",
      options: [
        { text: "I haven't lost much weight, if any, lately.", score: 0 },
        { text: "I have lost more than five pounds.", score: 1 },
        { text: "I have lost more than ten pounds.", score: 2 },
        { text: "I have lost more than fifteen pounds.", score: 3 }
      ]
    },
    {
      description: "20. Tiredness or fatigue",
      options: [
        { text: "I am no more worried about my health than usual.", score: 0 },
        { text: "I am worried about physical problems like aches, pains, upset stomach, or constipation.", score: 1 },
        { text: "I am very worried about physical problems and it's hard to think of much else.", score: 2 },
        { text: "I am so worried about my physical problems that I cannot think of anything else.", score: 3 }
      ]
    },
    {
      description: "21. Loss of interest in sex",
      options: [
        { text: "I have not noticed any recent change in my interest in sex.", score: 0 },
        { text: "I am less interested in sex than I used to be.", score: 1 },
        { text: "I have almost no interest in sex.", score: 2 },
        { text: "I have lost interest in sex completely.", score: 3 }
      ]
    }
  ];
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve user's email from AsyncStorage when component mounts
    const getUserEmail = async () => {
      try {
        const user = await AsyncStorage.getItem('emailS');
        const storedUserEmail = await AsyncStorage.getItem(`userEmail_${user}`).then({})

        // Check if the retrieved email is not null
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
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

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
      const currentBDI = docData.BDI || [];

      // Add the new score to the BAI array
      const newBDI = [...currentBDI, { score: totalScore, date: new Date() }];

      // Update Firestore document with the new BAI array
      await updateDoc(userDocRef, {
        BDI: newBDI
      });

      console.log('Total score uploaded to Firestore successfully.');
    } catch (error) {
      console.error('Error uploading total score to Firestore:', error);
    }
  };


  const interpretScore = () => {
    let advice = '';
    if (totalScore >= 0 && totalScore <= 10) {
      advice = 'These ups and downs are considered normal';
    } else if (totalScore >= 11 && totalScore <= 16) {
      advice = 'Mild mood disturbance';
    } else if (totalScore >= 17 && totalScore <= 20) {
      advice = 'Borderline clinical depression';
    } else if (totalScore >= 21 && totalScore <= 30) {
      advice = 'Moderate depression';
    } else if (totalScore >= 31 && totalScore <= 40) {
      advice = 'Severe depression';
    } else if (totalScore > 40) {
      advice = 'Extreme depression';
    } else {
      advice = 'Invalid score';
    }

    // Suggestions based on advice
    switch (advice) {
      case 'Extreme depression':
        return (
          <View>
            <Text style={styles.advice}>
              It is highly recommended to seek immediate help from a psychologist or mental health professional. Please do not hesitate to reach out for support.
            </Text>
            <View style={styles.services}>
            <TouchableOpacity style={[styles.cardContainer]} onPress={()=>{navigation.navigate('DoctorListsScreen')}}>
            <Image source={require('../assets/booksession.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Book Session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardContainer]} onPress={()=>{navigation.navigate('WatchVideos')}}>
            <Image source={require('../assets/videos.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Watch Videos</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      case 'Severe depression':
        return (
          <View>
            <Text style={styles.advice}>
              Consulting a psychologist or mental health professional is strongly advised. Additionally, watching motivational videos or seeking support from loved ones can be beneficial.
            </Text>
            <View style={styles.services}>
            <TouchableOpacity style={[styles.cardContainer]} onPress={()=>{navigation.navigate('DoctorListsScreen')}}>
            <Image source={require('../assets/booksession.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Book Session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardContainer]} onPress={()=>{navigation.navigate('WatchVideos')}}>
            <Image source={require('../assets/videos.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Watch Videos</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      case 'Moderate depression':
      case 'Borderline clinical depression':
        return (
          <View>
            <Text style={styles.advice}>
              Watching motivational videos, practicing relaxation techniques, and seeking support from friends and family can help improve your mood.
            </Text>
            <View style={styles.services}>
            <TouchableOpacity style={[styles.cardContainer]} onPress={()=>{navigation.navigate('WatchVideos')}}>
            <Image source={require('../assets/videos.png')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Watch Videos</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <Text style={styles.advice}>
           These ups and downs are considered normal. Your mental health is important. It is advisable to seek support from friends, family, or mental health professionals if you are struggling.
          </Text>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Beck's Depression Inventory</Text>
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
              title='Depression Level'
              dashedStrokeConfig={{
                count: 50,
                width: 4,
              }}
            />
          </View>
          {interpretScore()}
          <View>
            <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Home')}>
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
    textAlign:'center',
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
    width:'40%'
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
  services:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BDI;
