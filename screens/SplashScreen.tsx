import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

import Logo from "../assets/logo.svg";
import NibasSplash from "../assets/nibas_splash.svg";

export default function CustomSplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the native splash screen and show our custom one, then proceed
      const timer = setTimeout(async () => {
        await SplashScreen.hideAsync();
        onFinish();
      }, 4000); // Show splash for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, onFinish]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandingContainer}>
          <Logo width={60} height={60} style={styles.logo} />
          <NibasSplash width={200} height={80} style={styles.nibasText} />
        </View>
        <Text style={styles.tagline}>Trusted Stays, Rooted in Home.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandingContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    marginBottom: 0,
  },
  nibasText: {
    marginBottom: 0,
  },
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#525866",
    marginTop: 10,
  },
});
