import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';

// Object mapping personality types to descriptions
const personalityDescriptions = {
    INTJ: "INTJ (Architect) is a personality type with the Introverted, Intuitive, Thinking, and Judging traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one.",
    INTP: "INTP (Logician) is a personality type with the Introverted, Intuitive, Thinking, and Prospecting traits. These flexible thinkers enjoy taking an unconventional approach to many aspects of life. They often seek out unlikely paths, mixing willingness to experiment with personal creativity.",
    ENTJ: "ENTJ (Commander) is a personality type with the Extraverted, Intuitive, Thinking, and Judging traits. They are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them.",
    ENTP: "ENTP (Debater) is a personality type with the Extraverted, Intuitive, Thinking, and Prospecting traits. They tend to be bold and creative, deconstructing and rebuilding ideas with great mental agility. They pursue their goals vigorously despite any resistance they might encounter.",
    INFJ: "INFJ (Advocate) is a personality type with the Introverted, Intuitive, Feeling, and Judging traits. They tend to approach life with deep thoughtfulness and imagination. Their inner vision, personal values, and a quiet, principled version of humanism guide them in all things.",
    INFP: "INFP (Mediator) is a personality type with the Introverted, Intuitive, Feeling, and Prospecting traits. These rare personality types tend to be quiet, open-minded, and imaginative, and they apply a caring and creative approach to everything they do.",
    ENFJ: "ENFJ (Protagonist) is a personality type with the Extraverted, Intuitive, Feeling, and Judging traits. These warm, forthright types love helping others, and they tend to have strong ideas and values. They back their perspective with the creative energy to achieve their goals.",
    ENFP: "ENFP (Campaigner) is a personality type with the Extraverted, Intuitive, Feeling, and Prospecting traits. These people tend to embrace big ideas and actions that reflect their sense of hope and goodwill toward others. Their vibrant energy can flow in many directions.",
    ISTJ: "ISTJ (Logistician) is a personality type with the Introverted, Observant, Thinking, and Judging traits. These people tend to be reserved yet willful, with a rational outlook on life. They compose their actions carefully and carry them out with methodical purpose.",
    ISFJ: "ISFJ (Defender) is a personality type with the Introverted, Observant, Feeling, and Judging traits. These people tend to be warm and unassuming in their own steady way. They’re efficient and responsible, giving careful attention to practical details in their daily lives.",
    ESTJ: "ESTJ (Executive) is a personality type with the Extraverted, Observant, Thinking, and Judging traits. They possess great fortitude, emphatically following their own sensible judgment. They often serve as a stabilizing force among others, able to offer solid direction amid adversity.",
    ESFJ: "ESFJ (Consul) is a personality type with the Extraverted, Observant, Feeling, and Judging traits. They are attentive and people-focused, and they enjoy taking part in their social community. Their achievements are guided by decisive values, and they willingly offer guidance to others.",
    ISTP: "ISTP (Virtuoso) is a personality type with the Introverted, Observant, Thinking, and Prospecting traits. They tend to have an individualistic mindset, pursuing goals without needing much external connection. They engage in life with inquisitiveness and personal skill, varying their approach as needed.",
    ISFP: "ISFP (Adventurer) is a personality type with the Introverted, Observant, Feeling, and Prospecting traits. They tend to have open minds, approaching life, new experiences, and people with grounded warmth. Their ability to stay in the moment helps them uncover exciting potentials.",
    ESTP: "ESTP (Entrepreneur) is a personality type with the Extraverted, Observant, Thinking, and Prospecting traits. They tend to be energetic and action-oriented, deftly navigating whatever is in front of them. They love uncovering life’s opportunities, whether socializing with others or in more personal pursuits.",
    ESFP: "ESFP (Entertainer) is a personality type with the Extraverted, Observant, Feeling, and Prospecting traits. These people love vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They can be very social, often encouraging others into shared activities.",
};

// Object mapping personality types to images
const personalityImages = {
    INTJ: require('../assets/architect.png'),
    INTP: require('../assets/logician.png'),
    ENTJ: require('../assets/commander.png'),
    ENTP: require('../assets/debater.png'),
    INFJ: require('../assets/advocate.png'),
    INFP: require('../assets/mediator.png'),
    ENFJ: require('../assets/protagonist.png'),
    ENFP: require('../assets/campaigner.png'),
    ISTJ: require('../assets/logistician.png'),
    ISFJ: require('../assets/defender.png'),
    ESTJ: require('../assets/executive.png'),
    ESFJ: require('../assets/consul.png'),
    ISTP: require('../assets/virtuoso.png'),
    ISFP: require('../assets/adventurer.png'),
    ESTP: require('../assets/entrepreneur.png'),
    ESFP: require('../assets/entertainer.png'),
};

// Object mapping personality traits to colors
const traitColors = {
    Introverted: '#FFA500', // Orange color for Introverted trait
    Intuitive: '#8A2BE2', // Blue-violet color for Intuitive trait
    Thinking: '#228B22', // Forest green color for Thinking trait
    Judging: '#FF4500', // Orange-red color for Judging trait
    Extraverted: '#00BFFF', // Deep sky blue color for Extraverted trait
    Prospecting: '#FFD700', // Gold color for Prospecting trait
    Feeling: '#9932CC', // Dark orchid color for Feeling trait
    Observant: '#9932CC', // Dark orchid color for Feeling trait
};

const PredictionScreen = ({ route }) => {
    const navigation = useNavigation();
    const { personalityType, maxProbability } = route.params;

    // Calculate the percentage value for the prediction score
    const predictionScore = Math.round(maxProbability);

    // Get description based on the predicted personality type
    const description = personalityDescriptions[personalityType] || 'Description not available';

    // Function to apply trait colors to the description text
    const applyTraitColors = (text) => {
        const words = text.split(' ');
        return words.map((word, index) => {
            // Remove comma if present at the end of the word
            const cleanedWord = word.replace(/[,\.]$/, '');
            const color = traitColors[cleanedWord];
            if (color) {
                return <Text key={index} style={{ fontWeight: 'bold', color }}>{word} </Text>;
            }
            return <Text key={index}>{word} </Text>;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Personality Prediction</Text>
            <View style={styles.resultContainer}>
                <View style={styles.circleContainer}>
                    <CircularProgress
                        value={predictionScore}
                        radius={105} // Increase the radius by 2x
                        maxValue={100}
                        strokeWidth={8}
                        activeStrokeWidth={15}
                        inActiveStrokeWidth={15}
                        inActiveStrokeOpacity={0.5}
                        activeStrokeColor={Colors.primaryColor}
                        activeStrokeSecondaryColor={Colors.primaryColor}
                        title='Prediction Score'
                        titleFontSize={15} // Decrease the font size by 1/4
                        backgroundStrokeColor="transparent" // Set background color to transparent
                        inActiveStrokeColor={Colors.lightGray}
                        duration={5000}
                        valueSuffix='%'
                        dashedStrokeConfig={{
                            count: 50,
                            width: 4,
                        }}
                    >
                        <Text style={styles.progressText}>{predictionScore}%</Text>
                    </CircularProgress>
                </View>
                <Text style={styles.personalityText}>{personalityType}</Text>
                <Image source={personalityImages[personalityType]} style={styles.personalityImage} />
                <Text style={styles.descriptionText}>{applyTraitColors(description)}</Text>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={()=>{navigation.navigate('Home')}}>
          <Text style={styles.submitButtonText}>Close</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding * 2,
    },
    headerText: {
        ...Fonts.primaryColor20Bold,
        marginBottom: Sizes.fixPadding + 10,
        fontSize: 25,
    },
    resultContainer: {
        padding: Sizes.fixPadding * 2,
        alignItems: 'center',
    },
    circleContainer: {
        marginBottom: Sizes.fixPadding,
    },
    progressText: {
        fontWeight: '100',
        color: 'white',
    },
    personalityText: {
        ...Fonts.primaryColor20Bold, // Increase font size
        marginBottom: 10,
        fontSize: 30,
    },
    personalityImage: {
        width: 250, // Increase width by 5x
        height: 250, // Increase height by 5x
        resizeMode: 'contain',
        alignSelf:'center'
    },
    descriptionText: {
        fontSize: 16, // Font size for description text
        textAlign: 'left',
        marginTop: 10, // Add some margin at the top
        color: 'black', // Default color for description text
        fontWeight: 'bold'
    },
    
  submitButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: Sizes.fixPadding * 3,
    alignItems: 'center',
    paddingHorizontal:150,
  },
  submitButtonText: {
    ...Fonts.whiteColor16Medium,
    textAlign: 'center',
  },
});

export default PredictionScreen;
