import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthStack from "./navigation/AuthStack";
import MainTabs from "./navigation/MainTabs";
import CustomSplashScreen from './screens/SplashScreen';
import { View, ActivityIndicator } from "react-native";

function Root() {
  const { session, isLoading } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  if (isSplashVisible || isLoading) {
    return <CustomSplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  return (
    <NavigationContainer>
      {session && session.user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
