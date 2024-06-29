import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles'; // Assuming you have a file for your custom colors
import { useNavigation } from '@react-navigation/native';

const ProcrastinationSteps = () => {
    const navigation = useNavigation();

    const steps = [
        {
            title: "Step 1. Don't put the cart before the horse.",
            description: "Instead of waiting for motivation, get started. Remember: Action comes first, and motivation comes second.",
        },
        {
            title: "Step 2. Make a specific plan.",
            description: "Instead of telling yourself you'll get started one of these days, make a specific plan. Would you like to start today? At what time? What will you do first?",
        },
        {
            title: "Step 3. Make the job easy.",
            description: "Instead of telling yourself you have to do it all at once, decide to do just 10 or 15 minutes of the task. Break the task into small steps, and remind yourself that you only have to take the first small step today. After that, you can quit with a clear conscience, or do more.",
        },
        {
            title: "Step 4. Think positively.",
            description: "Write down the negative thoughts that make you feel guilty and anxious; substitute others that are more positive and realistic.",
        },
        {
            title: "Step 5. Give yourself credit.",
            description: "Instead of putting yourself down because your work wasn't good enough, give yourself credit for what you did accomplish.",
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Steps to Overcome Procrastination</Text>
            
            <ScrollView >

                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        <Text style={styles.stepDescription}>{step.description}</Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.doneButtonText}>Go Back</Text>
                </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primaryColor,
        alignSelf: 'center'
    },
    stepContainer: {
        marginBottom: 20,
        backgroundColor: Colors.lightPrimaryColor,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        elevation: 2,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.blackColor,
        marginBottom: 10,
    },
    stepDescription: {
        fontSize: 16,
        color: Colors.blackColor,
    },
    doneButton: {
        position:"absolute",
        backgroundColor: Colors.primaryColor,
        padding: 15,
        borderRadius: 30,
        right:10,
        bottom:50,
    },
    doneButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProcrastinationSteps;
