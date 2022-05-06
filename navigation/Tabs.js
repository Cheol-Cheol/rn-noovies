import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "red",
      headerTitleStyle: { color: "tomato" },
      headerRight: () => (
        <View>
          <Text>Hello</Text>
        </View>
      ),
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5 }} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
