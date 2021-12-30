import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Homescreen';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/Loginscreen';
import { useNavigation } from '@react-navigation/core'
import RegisterScreen from './components/Registerscreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Statistics from './components/Statisticsscreen';
import AddCalendar from './components/Calendarscreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { 
          height: 80,
          position: 'absolute',
          bottom: 25,
          right: 20,
          left: 20,
          borderRadius: 15
        
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('./components/Icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#0782F9' : '#000000' 

                }}
              >
              </Image>
            </View>
          ),
        }
      } />
      <Tab.Screen name="AddCalendar" component={AddCalendar} options={
        {
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('./components/Icons/plus.png')}
                resizeMode='contain'
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? '#0782F9' : '#000000' 

                }}
              >
              </Image>
            </View>
          ),
        }
      } />
      <Tab.Screen name="Statistics" component={Statistics} options={
        {
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('./components/Icons/graph.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#0782F9' : '#000000' 

                }}
              >
              </Image>
            </View>
          ),
        }
      } />
    </Tab.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
