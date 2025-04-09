import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import RegisterScreen from "./src/screens/AuthScreens/RegisterScreen";
import LoginScreen from "./src/screens/AuthScreens/LoginScreen";
import SplashScreen from "./src/screens/StartingScreens/splashScreen";
import WelcomeScreen from "./src/screens/StartingScreens/WelcomeScreen";
import ForgotPassword from "./src/screens/AuthScreens/ForgotPassword";
import Otp from "./src/screens/AuthScreens/Otp";
import CreateNewPassword from "./src/screens/AuthScreens/CreateNewPassword";
import Home from "./src/screens/HomePage/Home.js";
import WalkaroundLand from "./src/screens/WalkaroundLand/WalkaroundLand";
import Fence from "./src/screens/FenceSetup/fence/Fence";
import FenceDetails from "./src/screens/FenceSetup/fenceDetails/FenceDetails";
import SaveScreen from "./src/screens/TempScreens/SaveScreen/SaveScreen";
import TemplateView from "./src/screens/TempScreens/TemplateView/TemplateView";
import EditTemplate from "./src/screens/TempScreens/EditTemplate/EditTemplate";
import SavedTemplatesScreen from "./src/screens/TempScreens/SavedTemplatesScreen/SavedTemplatesScreen";
import Fertilization from "./src/screens/Fertilizing/Fertilization";
import PlantationDetails from "./src/screens/Plantation/PlantationDetails";
import FertilizationDetails from "./src/screens/Fertilizing/FertilizationDetails";
import Plantation from "./src/screens/Plantation/Plantation";
import Clearland from "./src/screens/ClearLand/Clearland";
import EffortOutput from "./src/screens/ClearLand/EffortOutput";
import ResizeMap from "./src/screens/TempScreens/ResizeMap/ResizeMap";
import PointAddingScreen from "./src/screens/PointAddingScreen/PointAddingScreen";
import ProfileManagement from "./src/screens/ProfileManagement/ProfileManagement.js";
import PlantationFromManualCalculator from "./src/screens/PlantationManual/PlantationFromManualCalculator.js";
import PlantationDetailsFromManualCalculator from "./src/screens/PlantationDetailsManual/PlantationDetailsFromManualCalculator.js";
import EffortOutputFromManualCalculator from "./src/screens/EffortOutputManual/EffortOutputFromManualCalculator.js";
import ClearLandFromManualCalculator from "./src/screens/ClearLandManual/ClearLandFromManualCalculator.js";
import FenceFromManualCal from "./src/screens/FenceManual/Fence/FenceFromManualCal";
import FencedetailfromManual from "./src/screens/FenceManual/FenceDetails/FencedetailfromManual";
import FertilizationFromManualCalculator from "./src/screens/FertilizationManual/FertilizationFromManualCalculator.js";
import FertilizationDetailsFromManualCalculator from "./src/screens/FertilizingDetailsManual/FertilizingDetailsFromManualCalculator.js";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide-in/slide-out animation
        }}
      >
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="NewPassword" component={CreateNewPassword} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WalkaroundLand" component={WalkaroundLand} />
        <Stack.Screen name="Fence" component={Fence} />
        <Stack.Screen name="FenceDetails" component={FenceDetails} />
        <Stack.Screen name="SaveScreen" component={SaveScreen} />
        <Stack.Screen name="ResizeMap" component={ResizeMap} />
        <Stack.Screen name="TemplateView" component={TemplateView} />
        <Stack.Screen name="EditTemplate" component={EditTemplate} />
        <Stack.Screen
          name="SavedTemplatesScreen"
          component={SavedTemplatesScreen}
        />
        <Stack.Screen name="Plantation" component={Plantation} />
        <Stack.Screen name="PlantationDetails" component={PlantationDetails} />
        <Stack.Screen name="Fertilization" component={Fertilization} />
        <Stack.Screen
          name="FertilizationDetails"
          component={FertilizationDetails}
        />

        <Stack.Screen name="Clearland" component={Clearland} />

        <Stack.Screen name="EffortOutput" component={EffortOutput} />

        <Stack.Screen name="PointAddingScreen" component={PointAddingScreen} />
        <Stack.Screen name="ProfileManagement" component={ProfileManagement} />

        <Stack.Screen
          name="PlantationFromManualCalculator"
          component={PlantationFromManualCalculator}
        />
        <Stack.Screen
          name="PlantationDetailsFromManualCalculator"
          component={PlantationDetailsFromManualCalculator}
        />
        <Stack.Screen
          name="FertilizationFromManualCalculator"
          component={FertilizationFromManualCalculator}
        />
        <Stack.Screen
          name="FertilizationDetailsFromManualCalculator"
          component={FertilizationDetailsFromManualCalculator}
        />
        <Stack.Screen
          name="EffortOutputFromManualCalculator"
          component={EffortOutputFromManualCalculator}
        />
        <Stack.Screen
          name="ClearLandFromManualCalculator"
          component={ClearLandFromManualCalculator}
        />
        <Stack.Screen
          name="FenceFromManualCal"
          component={FenceFromManualCal}
        />
        <Stack.Screen
          name="FencedetailfromManual"
          component={FencedetailfromManual}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
