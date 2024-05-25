import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { auth, firestore } from './firebase';

import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colours from '../components/colors';
import SignUpAni from '../components/SignUpAni';
import Toast from 'react-native-toast-message';

import MyStatusBar from '../components/myStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, CommonStyles, Fonts, Sizes } from '../constants/styles';
import { Text } from '../components/commonText';


function RegisterScreen() {
  const navigation = useNavigation();

  const [eye, setEye] = useState(true);

  

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false); // State for loader
  const onPressHandler = () => {
    navigation.navigate('LoginScreen');
    setWaiting(false)
  };

  const handleSignUp = async () => {
    setLoading(true)
    if (!username.trim()) {
      showToast();
    }
    if (!email.trim()) {
      showToast();
    }
    if (!password.trim()) {
      showToast();
    }
    if (!confirmpassword.trim()) {
      showToast();
    }
    if (password == confirmpassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;

          AsyncStorage.setItem('userToken', 'user_authenticated');
          AsyncStorage.removeItem('emailS');
          AsyncStorage.setItem('emailS', email);
          sendEmailVerification(user).then(() => {
            Varefication();
            setTimeout(() => {

              navigation.navigate('LoginScreen');
            }, 3000)
            saveUserData();

          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showEmailInUse();
          }

          if (error.code === 'auth/invalid-email') {
            showToast();
          }

          console.error(error);
        });
    } else {
      passwordConfirm();
    }
  };

  const saveUserData = async () => {
    try {
      const userDataCollection = collection(firestore, 'userdata');

      await addDoc(userDataCollection, {
        id: auth.currentUser.uid,
        name: username,
        emailId: email,
        passwordS: password,
        phoneNo:mobile,
        profileImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU',
      });

      console.log('User data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding user data to Firestore: ', error);
    }
  };

  ///////Fetching user Data From firestore and saving in ASYNC Storage/////////////////

  const fetchData = async () => {
    const userDataCollection = collection(firestore, 'userdata');

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('emailId', '==', email)),
      );

      const UserEmail = querySnapshot.docs.map(doc => doc.data().emailId);
      const Username = querySnapshot.docs.map(doc => doc.data().name);
      const UserId = auth.currentUser.uid;
      const Userpassword = querySnapshot.docs.map(doc => doc.data().passwordS);
      const mobile = querySnapshot.docs.map(doc => doc.data().phoneNo);

      await AsyncStorage.setItem(
        `userEmail_${email}`,
        JSON.stringify(UserEmail),
      );
      await AsyncStorage.setItem(`userName_${email}`, JSON.stringify(Username));
      await AsyncStorage.setItem(
        `userPassword_${email}`,
        JSON.stringify(Userpassword),
      );
      await AsyncStorage.setItem(`userId_${email}`, JSON.stringify(UserId));
      console.log(`userEmail_${auth.currentUser.uid}`);
      console.log('to set', UserEmail);
      console.log('to set', Username);
      console.log('to set', Userpassword);
      console.log('to set', UserId);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  ///////////////////////////Toast/////////////////
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Authentication Failed',
      text2:
        'Invalid Email or Password. Please enter a valid email address and password.',
    });
  };
  const showAccountCreated = () => {
    Toast.show({
      type: 'success',
      text1: 'Account Created',
      text2: 'Account has been created now you can login with your credentials',
    });
  };
  const showEmailInUse = () => {
    Toast.show({
      type: 'error',
      text1: 'Email In Use',
      text2: 'This email is alraedy registered',
    });
  };
  const passwordConfirm = () => {
    Toast.show({
      type: 'error',
      text1: 'Password Mismatch',
      text2: 'Password and confirm password should be same',
    });
  };
  const Varefication = () => {
    Toast.show({
      type: 'info',
      text1: 'Verify Email',
      text2: 'Please Verify Email',
    });
  };
  ///////////////////////////////////////////////////////////

  return (
    <>
      {/* {waiting && <Loader />}
      {!waiting && ( */}
      <ScrollView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <MyStatusBar />
        <View style={{ flex: 1 }}>
          {header()}
          {nameInfo()}
          {emailInfo()}
          {mobileInfo()}
          {passwordInfo()}
          {confirmPasswordInfo()}
          {registerButton()}
          {alreadyAccountInfo()}

        </View>
      </ScrollView>
      {/* )} */}
      <Toast />
    </>
  );
  function alreadyAccountInfo() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor16Medium,
          textAlign: 'center',
        }}
      >
        Already have an account?
        <Text
          onPress={onPressHandler}
          style={{ ...Fonts.primaryColor16Medium }}
        >
          {' '}
          Login now
        </Text>
      </Text>
    );
  }

  function registerButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {
          await handleSignUp();
        }}
        style={{ ...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0 }}
      >
        {loading ? ( // Conditionally render loader if loading state is true
          <ActivityIndicator size="small" color={Colors.whiteColor} />
        ) : (
          <Text style={{ ...Fonts.whiteColor18SemiBold }}>Register</Text>
        )}
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, flex: 1, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={securePassword}
          />
          <TouchableOpacity onPress={() => { setSecurePassword(!securePassword) }}>
            <MaterialCommunityIcons
              name={securePassword ? 'eye' : 'eye-off'}
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function confirmPasswordInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, flex: 1, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={securePassword}
          />
          <TouchableOpacity onPress={() => { setSecurePassword(!securePassword) }}>
            <MaterialCommunityIcons
              name={securePassword ? 'eye' : 'eye-off'}
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function mobileInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={CommonStyles.textFieldWrapper}>
        <MaterialCommunityIcons
            name="phone-outline"
            size={25}
            color={Colors.primaryColor}
          />
          <TextInput
            placeholder="Enter Mobile Number*"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (

      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View style={CommonStyles.textFieldWrapper}>
          <MaterialCommunityIcons
            name="email"
            size={25}
            color={Colors.primaryColor}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function nameInfo() {
    return (

      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View style={CommonStyles.textFieldWrapper}>
          <MaterialCommunityIcons
            name="account"
            size={25}
            color={Colors.primaryColor}
          />
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>
    );
  }



  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          justifyContent: 'center',
        }}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.primaryColor}
          style={{ position: 'absolute', zIndex: 100 }}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={CommonStyles.headerTextStyle}>Register Account</Text>
      </View>
    );
  }

}


export default RegisterScreen;
