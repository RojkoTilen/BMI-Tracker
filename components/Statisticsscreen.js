
import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const Statistics = () => {
  const navigation = useNavigation()
  const [screenW, setScreenW] = useState('')

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    setScreenW(screenWidth)


  }, [])

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      navigation.replace("Login")

    }
    );
  }
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(7, 130, 249, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(7, 130, 249, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  return (
    <View style={styles.container}>
      <Text>Email: {auth().currentUser?.email}</Text>
      <Text>STATISTICS</Text>

      <TouchableOpacity
        onPress={handleSignOut}
        style={{         
          position: 'absolute',
          right: 8,
          top: 8,

        }}
      >
      <Image 
        source={require('./Icons/signout.png')}
        resizeMode='contain'
        style={{
          width: 30,
          height: 30,
          tintColor: '#000000',          

        }}
      >
      </Image>
      </TouchableOpacity>
      <View style={[styles.cardMid, styles.elevation]}>
        <LineChart
          data={data}
          width={screenW}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />
      </View>


      
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
  cardMid: {
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  }, 
})