const Stack = createNativeStackNavigator();
import * as React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, TransitionPresets } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import Splash from "./screens/Splash";
import Splash2 from "./screens/Splash2";
import Notifications from "./screens/Notifications";
import Services from "./screens/Services"
import Message from "./screens/Message";
import PersonalityTestScreen from "./screens/PersonalityTestScreen";
import PredictionScreen from "./screens/PredictionScreen";
import ChatBot from "./screens/ChatBot";
import Search from "./screens/Search";
import BDI from "./screens/BDI";
import BAI from "./screens/BAI";
import Settings from "./screens/Settings";
import MentalHealthProfessionalsScreen from "./screens/MentalHealthProfessionalsScreen"
import WatchVideos from "./screens/WatchVideos";
import BottomTabBarScreen from './components/bottomTabBarScreen';
import VideoList from "./screens/VideoList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PsychologicalTest from "./screens/PsychologicalTest";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegiterScreen";
import DoctorDetailsScreen from "./screens/DoctorDetailsScreen";
import DoctorListsScreen from "./screens/DoctorListsScreen";
import AppointmentBookingScreen from "./screens/AppointmentBookingScreen";
import Report from "./screens/ReportProblem";
import TestReports from "./screens/TestReports";
import UpcomingSchedule from "./screens/UpcomingSchedule";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import BurnsProcrastinationTest from "./screens/BurnsProcrastinationTest";
import ProcrastinationSteps from "./screens/ProcrastinationSteps";
import AngerControlTest from "./screens/AngerControlTest";
import PanicDisorderTest from "./screens/PanicDisorderTest";
import PTSD from "./screens/PTSD";
import EpworthSleepinessScale from "./screens/EpworthSleepinessScale";
import AngerControl from "./screens/AngerControl";
import Anxiety from "./screens/Anxiety";
import Depression from "./screens/Depression"; 
import PanicAttack from "./screens/PanicAttack";
import Procrastination from "./screens/Procrastination";
import Stress from "./screens/Stress";


const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),

    'SF-Compact-Display-Regular': require('./assets/fonts/SF-Compact-Display-Regular.ttf'),
    'SF-Compact-Display-Bold': require('./assets/fonts/SF-Compact-Display-Bold.ttf'),
    'SF-Compact-Display-Medium': require('./assets/fonts/SF-Compact-Display-Medium.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  const Authentication = AsyncStorage.getItem('Token');
  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomTabBarScreen"
              component={BottomTabBarScreen}
            />
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Splash2"
              component={Splash2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

            <Stack.Screen
              name="Services"
              component={Services}
            />
            <Stack.Screen
              name="Message"
              component={Message}
            />
            <Stack.Screen
              name="ChatBot"
              component={ChatBot}
            />

            <Stack.Screen
              name="PersonalityTestScreen"
              component={PersonalityTestScreen}
            />

            <Stack.Screen
              name="PredictionScreen"
              component={PredictionScreen}
            />

            <Stack.Screen
              name="WatchVideos"
              component={WatchVideos}
            />
            <Stack.Screen
              name="VideoList"
              component={VideoList}
            />
            <Stack.Screen
              name="PsychologicalTest"
              component={PsychologicalTest}
            />

            <Stack.Screen
              name="BDI"
              component={BDI}
            />
            <Stack.Screen
              name="BAI"
              component={BAI}
            />
            <Stack.Screen
              name="AppointmentBookingScreen"
              component={AppointmentBookingScreen}
            />
            <Stack.Screen
              name="DoctorDetailsScreen"
              component={DoctorDetailsScreen}
            />
            <Stack.Screen
              name="DoctorListsScreen"
              component={DoctorListsScreen}
            />

            <Stack.Screen
              name="Report"
              component={Report}
            />

            <Stack.Screen
              name="TestReports"
              component={TestReports}
            />
            <Stack.Screen
              name="UpcomingSchedule"
              component={UpcomingSchedule}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
            />
            <Stack.Screen
              name="BurnsProcrastinationTest"
              component={BurnsProcrastinationTest}
            />
            <Stack.Screen
              name="ProcrastinationSteps"
              component={ProcrastinationSteps}
            />
            <Stack.Screen
              name="AngerControlTest"
              component={AngerControlTest}
            />
            <Stack.Screen
              name="PanicDisorderTest"
              component={PanicDisorderTest}
            />
            <Stack.Screen
              name="PTSD"
              component={PTSD}
            />
            
            <Stack.Screen
              name="EpworthSleepinessScale"
              component={EpworthSleepinessScale}
            />
            <Stack.Screen
        name="AngerControl"
        component={AngerControl}
      />
      <Stack.Screen
        name="Anxiety"
        component={Anxiety}
      />
      <Stack.Screen
        name="Depression"
        component={Depression}
      />
      <Stack.Screen
        name="PanicAttack"
        component={PanicAttack}
      />
      <Stack.Screen
        name="Procrastination"
        component={Procrastination}
      />
      <Stack.Screen
        name="Stress"
        component={Stress}
      />

          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;