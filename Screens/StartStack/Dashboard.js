import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTabs = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <MainTabs.Navigator>
        <MainTabs.Screen name="Chats" component={} />
    </MainTabs.Navigator>
  );
};

export default Dashboard;
