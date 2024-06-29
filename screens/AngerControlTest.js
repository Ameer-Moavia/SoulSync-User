import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getDatabase, ref, set, push } from 'firebase/database';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons

const AngerControlTest = () => {
    const navigation = useNavigation();
    const questions = [{ description: "I get angry with little or no provocation.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I have a really bad temper.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "It’s hard for me to let go of thoughts that make me angry.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "When I become angry, I have urges to beat someone up.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "When I become angry, I have urges to break or tear things.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I get impatient when people don’t understand me.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I lose my temper at least once a week.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I embarrass family, friends, or coworkers with my anger outbursts.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I get impatient when people in front of me drive exactly the speed limit.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "When my neighbors are inconsiderate, it makes me angry.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I find myself frequently annoyed with certain friends or family.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I get angry when people do things that they are not supposed to, like smoking in a no smoking section or having more items than marked in the supermarket express checkout lane.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "There are certain people who always rub me the wrong way.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I feel uptight/tense.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I yell and/or curse.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I get so angry I feel like I am going to explode with rage.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I get easily frustrated when machines/equipment do not work properly.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I remember people and situations that make me angry for a long time.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I can’t tolerate incompetence. It makes me angry.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
    { description: "I think people try to take advantage of me.", options: [{ text: "Never", score: 1 }, { text: "Rarely", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Frequently", score: 4 }, { text: "Always", score: 5 }] },
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
        const userRef = ref(db, `tests/${sanitizedEmail}/AngerControlTest`);
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

    const interpretScore = () => {
        let advice = '';
        if (totalScore >= 80) {
            advice = 'Your anger expression is likely getting you into serious trouble with others. It would probably be worthwhile to seek professional help.';
        } else if (totalScore >= 60 && totalScore < 80) {
            advice = 'You may not need professional help but you need to work on controlling your anger in a very deliberate manner.';
        } else if (totalScore >= 50 && totalScore < 60) {
            advice = 'You have plenty of room for improvement. Reading a self help book on anger control could be beneficial.';
        } else if (totalScore >= 30 && totalScore < 50) {
            advice = 'You’re probably getting angry as often as most people. Monitor your episodes of temper and see if you can lower your score on this test in 6 months.';
        } else {
            advice = 'Congratulate yourself. You are likely in a good comfort zone.';
        }

        return (
            <Text style={styles.advice}>
                {advice}
            </Text>
        );
    };

    const getProgressColor = () => {
        if (totalScore < 30) {
            return 'green';
        } else if (totalScore >= 30 && totalScore < 50) {
            return 'blue';
        } else if (totalScore >= 50 && totalScore < 60) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    const getSeverity = () => {
        if (totalScore < 30) {
            return 'Good';
        } else if (totalScore >= 30 && totalScore < 50) {
            return 'Average';
        } else if (totalScore >= 50 && totalScore < 60) {
            return 'Needs Improvement';
        } else if (totalScore >= 60 && totalScore < 80) {
            return 'Poor';
        } else {
            return 'Very Poor';
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Anger Control Test</Text>
            {currentQuestionIndex < questions.length ? (
                <View>
                    <View style={styles.questionHeader} >
                        <Text style={styles.questionHeaderText}>
                            {questions[currentQuestionIndex].description}
                        </Text>
                    </View>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => handleResponseSelection(option.score)}
                        >
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
            maxValue={100} // Assuming the max score is 63
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
            title='Anger Level'
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
    description: {
        ...Fonts.white17Regular,
        marginBottom: Sizes.fixPadding * 2,
    },
    optionButton: {
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
    scoreContainer: {
        alignItems: 'center',
    },
    scoreText: {
        ...Fonts.white24Bold,
        marginBottom: Sizes.fixPadding * 3,
    },
    advice: {
        ...Fonts.blackColor16Medium,
        textAlign: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    progressContainer: {
        alignItems: 'center',
        marginVertical: Sizes.fixPadding * 2,
    },
    severityText: {
        ...Fonts.white16Bold,
        marginTop: Sizes.fixPadding,
        color: 'white',
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
});

export default AngerControlTest;
