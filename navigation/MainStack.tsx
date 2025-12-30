import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import ListingDetailsScreen from "../screens/listing/ListingDetailsScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{ presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
