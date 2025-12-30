import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthStack from "./navigation/AuthStack";
import MainStack from "./navigation/MainStack";
import CustomSplashScreen from "./screens/SplashScreen";
import ProfileSetupScreen from "./screens/auth/ProfileSetupScreen";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

function ProfileSetupStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const { session, isLoading, isProfileComplete } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  if (isSplashVisible || isLoading) {
    return <CustomSplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  // Determine which stack to show based on auth state
  const getNavigationContent = () => {
    if (!session || !session.user) {
      // Not logged in - show auth flow
      return <AuthStack />;
    }

    if (!isProfileComplete) {
      // Logged in but profile not complete - show profile setup
      return <ProfileSetupStack />;
    }

    // Fully authenticated with complete profile
    return <MainStack />;
  };

  return <NavigationContainer>{getNavigationContent()}</NavigationContainer>;
}

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
