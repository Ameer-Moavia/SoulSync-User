import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon from expo/vector-icons
import { getDatabase, ref, set, push } from 'firebase/database';
import MyStatusBar from '../components/myStatusBar';


const BurnsProcrastinationTest = () => {
    const navigation = useNavigation();
    const questions = [
        {
            description: "I delay making decisions or doing tasks to the point where it becomes stressful.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I put off working on projects, even when I know they are important.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I find myself saying 'I'll do it tomorrow' often.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I avoid tasks that I find boring or unpleasant.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I waste time on trivial tasks instead of focusing on important ones.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I wait until the last minute to complete tasks, even when I have plenty of time.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I feel overwhelmed by the amount of work I need to do, so I don't start.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I make excuses to justify not starting or completing tasks.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I frequently miss deadlines or turn in work late.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I spend too much time planning and not enough time doing.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I avoid tasks that require a lot of effort.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I get easily distracted and lose focus on the task at hand.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I overestimate the amount of time I have to complete tasks.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I feel anxious about starting tasks, so I avoid them.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I believe I work better under pressure, so I delay starting tasks.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I lack confidence in my ability to complete tasks well, so I put them off.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I spend a lot of time worrying about tasks I need to do, instead of doing them.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I frequently change priorities, so important tasks get delayed.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I avoid asking for help, even when I need it, because I don't want to bother others.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        },
        {
            description: "I feel guilty about procrastinating, but I still don't change my behavior.",
            options: [
                { text: "Not at all", score: 0 },
                { text: "Somewhat", score: 1 },
                { text: "Moderately", score: 2 },
                { text: "A lot", score: 3 }
            ]
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [scores, setScores] = useState({
        puttingCartBeforeHorse: 0,
        masteryModel: 0,
        fearOfFailure: 0,
        perfectionism: 0,
        lackOfRewards: 0,
        shouldStatements: 0,
        passiveAggression: 0,
        unassertiveness: 0,
        coercionSensitivity: 0,
        lackOfDesire: 0,
    });
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
                console.error('Error retrieving user email:', error);
            }
        };
        getUserEmail();
    }, []);

    const handleOptionPress = async (score) => {
        const newTotalScore = totalScore + score;
        const newScores = { ...scores };

        const subscaleIndex = currentQuestionIndex % 10;
        switch (subscaleIndex) {
            case 0:
                newScores.puttingCartBeforeHorse += score;
                break;
            case 1:
                newScores.masteryModel += score;
                break;
            case 2:
                newScores.fearOfFailure += score;
                break;
            case 3:
                newScores.perfectionism += score;
                break;
            case 4:
                newScores.lackOfRewards += score;
                break;
            case 5:
                newScores.shouldStatements += score;
                break;
            case 6:
                newScores.passiveAggression += score;
                break;
            case 7:
                newScores.unassertiveness += score;
                break;
            case 8:
                newScores.coercionSensitivity += score;
                break;
            case 9:
                newScores.lackOfDesire += score;
                break;
        }

        setTotalScore(newTotalScore);
        setScores(newScores);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const timestamp = new Date().toISOString();
            const sanitizedEmail = sanitizeEmail(userEmail);
            const db = getDatabase();
            const resultsRef = ref(db, `tests/${sanitizedEmail}/BurnsProcrastinationScores`);
            const newResultRef = push(resultsRef);
            await set(newResultRef, {
                timestamp,
                testResults: {
                    score: newTotalScore,
                    ...newScores,
                },
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Increment to show results
        }
    };
    const sanitizeEmail = (email) => {
        return email.replace(/\./g, '_');
      };

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        return (
            <View style={styles.questionContainer}>
                <View style={styles.questionHeader}>
                    <Text style={styles.questionHeaderText}>{question.description}</Text>
                </View>

                {question.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => handleOptionPress(option.score)}
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
        );
    };

    const interpretScore = (score) => {
        if (score <= 2) {
            return { text: 'Good', color: 'green' };
        } else {
            return { text: 'Procrastinate', color: 'red' };
        }
    };

    const renderResults = () => (
        <View >
            <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Burns Procrastination Test Results</Text>
                {Object.entries(scores).map(([key, value], index) => {
                    const interpretation = interpretScore(value);
                    return (
                        <View key={index} style={styles.scoreRow}>
                            <Text style={styles.scoreLabel}>{key.replace(/([A-Z])/g, ' $1')}:</Text>
                            <Text style={[styles.scoreValue, { color: interpretation.color }]}> {interpretation.text}</Text>
                        </View>
                    );
                })}

                <View>

                </View>

            </View>
            <View>
                {totalScore > 25 ? (
                    <View>
                        <Text style={styles.advice}>
                            Your score indicates that you tend to procrastinate. Watch these videos for strategies to overcome procrastination
                        </Text>
                        <View style={styles.services}>
                            <TouchableOpacity style={[styles.cardContainer]} onPress={() => { navigation.navigate('WatchVideos') }}>
                                <Image source={require('../assets/videos.png')} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>Watch Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.stepButton} onPress={() => { navigation.navigate('ProcrastinationSteps') }}>
                    <Text style={styles.stepButtonText}>Steps to Overcome Procrastination</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={styles.submitButtonText}>Close</Text>
                </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.advice}>
                            Your score is below the threshold. Here are some peaceful tips to help you maintain good habits and avoid procrastination:
                        </Text>
                        <TouchableOpacity style={styles.stepButton} onPress={() => { navigation.navigate('ProcrastinationSteps') }}>
                    <Text style={styles.stepButtonText}>Steps to Overcome Procrastination</Text>
                     </TouchableOpacity> 
                     
                <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={styles.submitButtonText}>Close</Text>
                </TouchableOpacity>
                    </View>

                    
                )}
            </View>
        </View>

    );

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <MyStatusBar />
                <Text style={styles.title}>Burns Procrastination Test</Text>
                {currentQuestionIndex < questions.length ? renderQuestion() : renderResults()}
               
            </ScrollView>
            <View>
            </View>
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
    resultsContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.backColor,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.blackColor,
        elevation: 2,
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.blackColor
    },
    resultsText: {
        fontSize: 18,
        marginBottom: 10,
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    scoreLabel: {
        fontSize: 16,
    },
    scoreValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 150,
        marginTop: 10
    },
    submitButtonText: {
        ...Fonts.whiteColor16Medium,
        textAlign: 'center',
    },
    stepButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 40,
        paddingVertical: 15,
        margin: 10,
        paddingHorizontal: 40,
    },
    stepButtonText: {
        ...Fonts.whiteColor16Medium,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        marginVertical: 20,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Colors.lightPrimaryColor,
        padding: 10,
        borderRadius: Sizes.fixPadding * 2.0,
    },
    noteText: {
        ...Fonts.primaryColor18SemiBold,
        marginLeft: 5
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

export default BurnsProcrastinationTest;
