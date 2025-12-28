import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Phone, Mail } from "lucide-react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Step inside and unwind—your comfort journey starts now
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => navigation.navigate("PhoneAuth")}
          >
            <Phone size={20} color="#fff" style={styles.btnIcon} />
            <Text style={styles.phoneButtonText}>Continue with Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.emailButton}
            onPress={() => navigation.navigate("EmailAuth")}
          >
            <Mail size={20} color="#000" style={styles.btnIcon} />
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={24} color="#000" />
            <Text style={styles.emailButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#525866",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: "80%",
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  phoneButton: {
    backgroundColor: "#34C786", // Green color from design
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  phoneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emailButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E4E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  emailButtonText: {
    color: "#0e121b",
    fontSize: 16,
    fontWeight: "600",
  },
  btnIcon: {
    marginRight: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E4E9",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#868C98",
    fontSize: 12,
    fontWeight: "500",
  },
  socialContainer: {
    marginTop: 0,
  },
  socialButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E4E9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row", // Added to support text if needed later, but good for centering
    gap: 10,
  },
});
