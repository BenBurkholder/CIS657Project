import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import CalculatorScreen from './screens/CalculatorScreen';
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import SettingsScreen from './screens/SettingsScreen';
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from './screens/HistoryScreen';
import Agricola from './screens/Agricola';
import Castles from './screens/Castles';
import SevenWonders from './screens/SevenWonders';
import LordsOfWaterdeep from './screens/LordsOfWaterdeep';
import StoneAge from './screens/StoneAge';
import VideoListScreen from "./screens/VideoListScreen";
import YTViewerScreen from "./screens/YTViewerScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={navStyling}>
          <Stack.Screen name="Games" component={HistoryScreen} /> 
          <Stack.Screen name="Settings" component={SettingsScreen} />  
          <Stack.Screen name="Agricola" component={Agricola} /> 
          <Stack.Screen name="Castles of Burgandy" component={Castles} />
          <Stack.Screen name="Seven Wonders" component={SevenWonders} />
          <Stack.Screen name="Lords of Waterdeep" component={LordsOfWaterdeep} />
          <Stack.Screen name="Stone Age" component={StoneAge} />
          <Stack.Screen
          name="Video List"
          component={VideoListScreen}
          options={{ title: "Learn to Play" }} />
        <Stack.Screen name="Video Viewer" component={YTViewerScreen} />       
          
             
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: '#0065A4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    flex: 1,
  },
});

