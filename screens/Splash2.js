import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Splash2 = () => {

    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('LoginScreen'); // Replace 'Splash2' with the name of your target screen
      };
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/pic2.jpg')}
                style={styles.image}
            />
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text  style={{color:'white',fontSize:18,fontFamily:'Roboto',fontWeight:'bold'}}>Get Started!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Self-Care</Text>
                <Text style={styles.text}>And</Text>
                <Text style={styles.text}>Guided Support</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align items at the top vertically
    },
    image: {
        width: '100%', // Set width to 100% of the parent container
        aspectRatio: 0.8, // Maintain aspect ratio (width:height)
        resizeMode: 'contain', // 'contain' or 'cover' based on your preference
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00B7D3',
        paddingHorizontal:100,
        paddingVertical:15,
        borderRadius: 10,
    },
    textContainer: {
        marginTop: 20, // Adjust the margin as needed
    },
    text: {
        fontSize: 40,
        color: '#00B7D3',
        fontFamily: 'Roboto',
        fontWeight: "bold"
    },
});

export default Splash2;
