import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import color from '../components/colors';
import { useNavigation } from "@react-navigation/native";


const ChangePassword = () => {
  const codeInputs = Array.from({ length: 4 }, (_, index) => useRef(null));

  const handleCodeChange = (index, value) => {
    if (index > 0 && value === '') {
        codeInputs[index - 1].current.focus();
      } else if (index < codeInputs.length - 1 && value !== '') {
        codeInputs[index + 1].current.focus();
      }
  };

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View>
      
        <Text style={styles.mainHeading}>Enter Varification Code</Text>
        <Text style={styles.secondHeading}>
          Please enter the 4-digit code that was sent to your email address
        </Text>

        <View style={styles.codeContainer}>
          {codeInputs.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              editable={true}
              onChangeText={(value) => handleCodeChange(index, value)}
            />
          ))}
        </View>
       

        <TouchableOpacity style={styles.getCode} onPress={()=>navigation.navigate('ConfirmPassword')}>
          <Text style={styles.loginButtonText}>Verify and Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  mainHeading: {
    color: color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 150

  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 80,
    marginVertical: 20,
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color : color.text
  },
  getCode: {
    width: '75%',
    height: 50,
    marginVertical: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginHorizontal: 50,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.primary,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    color : 'black'
  },
});

export default ChangePassword;
