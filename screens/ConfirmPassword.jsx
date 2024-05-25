// Import React and necessary components
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
  
} from 'react-native';
import color from '../components/colors';
import imageS from '../Images/3.png';
import ForgotAni from '../components/ForgotAni';
import { useNavigation } from '@react-navigation/native';


// Define the ChangePassword component
const ChangePassword = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View>
         <ForgotAni/>
        <Text style={styles.mainHeading}>Enter New Password</Text>
        <Text style={styles.secondHeading}>
          Your new password must be different from previous password and at least 6 characters
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={true}
          placeholderTextColor="gray"
        />
         <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          style={styles.getCode}
          onPress={()=>navigation.navigate('Setting')}
         >
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  mainHeading: {
    color: color.primary,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -10
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 90,
    marginVertical: 30,
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  input: {
    width: '80%',
    height: 55,
    marginVertical: 10,
    marginHorizontal: 40,
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: color.primary,
    borderWidth: 1.5,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
    
  },
  getCode: {
    width: "80%",
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    marginHorizontal :40
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "sans-serif-condensed",
  }
});

export default ChangePassword;
