import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import SearchModalScreen from "../screens/search/SearchModalScreen";
import SearchResultsScreen from "../screens/search/SearchResultsScreen";
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
      <Stack.Screen
        name="SearchModal"
        component={SearchModalScreen}
        options={{
          presentation: "fullScreenModal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
    </Stack.Navigator>
  );
}
