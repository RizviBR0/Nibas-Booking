import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import PhoneAuthScreen from "../screens/auth/PhoneAuthScreen";
import EmailAuthScreen from "../screens/auth/EmailAuthScreen";
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen";
import ProfileSetupScreen from "../screens/auth/ProfileSetupScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuthScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="EmailAuth"
        component={EmailAuthScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
        options={{ presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
