
import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, Component } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import auth from '@react-native-firebase/auth';


const HomeScreen = () => {
  const [weeklyLoss, setWeeklyLoss] = useState('0')
  const [monthlyLoss, setMonthlyLoss] = useState('0')
  const [UserName, setUserName] = useState('Tilen')


  const navigation = useNavigation()

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      navigation.replace("Login")

    }
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.headerCardParent]}>
        <View style={[styles.headerCard, styles.elevation]}>
          <Text style={styles.heading}>
            Hello, {UserName}
          </Text>
          <Text>
            You lost {weeklyLoss} kg this week.
            
          </Text>

          <ImageBackground 
            source={require('./Images/appfitness.jpg')} 
            resizeMode='cover'
            style={{
              flex:1,
              top: 0
            }}
          >
          </ImageBackground>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.card, styles.elevation]}>
          <View>
            <Text style={styles.heading}>
              Weekly loss
            </Text>
          </View>
          <Text>
            - {weeklyLoss}
          </Text>
        </View>
        <View style={[styles.card, styles.elevation]}>
          <View>
            <Text style={styles.heading}>
              Monthly loss
            </Text>
          </View>
          <Text>
            - {weeklyLoss}
          </Text>
        </View>
        <View style={[styles.card, styles.elevation]}>
          <View>
            <Text style={styles.heading}>
              Current BMI
            </Text>
          </View>
          <Text>
            {weeklyLoss}
          </Text>
        </View>
      </View>

      <View style={[styles.cardMid, styles.elevation]}>
          <View>
            <Text style={styles.heading}>
              Goal BMI
            </Text>
          </View>
          <Text>
            {weeklyLoss}
          </Text>
      </View>

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
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  headerCard: {
    width: "100%",
    height: 300,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  headerCardParent: {
    backgroundColor: 'white',
    width: "100%",
    height: 300,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 150

  },
  cardMid: {
    width: "80%",
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10

  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 13,
    
  },
  headingTop: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    position: 'absolute'
  },
  row: {
    flexDirection: "row"
  }
})