
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';


const AddCalendar = () => {
  const navigation = useNavigation()
  const [openInput, setOpenInput] = useState(false)
  const [weight, setWeight] = useState('')

  const connectSmartScale = async () => {
    const min = 75;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    let res = {}
    let call = await axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        weight: Math.round(rand),
        body: 'bar',
        userId: 1,
      })
      .then((response) => {
        console.log("API Call OK")
        res = response.data
      });
    
    console.log("Smart Scale API Call Weight")
    console.log(res.weight)
    setWeight(res.weight)


  }
  const closeInput = () => {
    setOpenInput(false)

  }

  


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
    <View>
      <View style={styles.headerCardParent}>
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
        <View style={styles.calendarContainer}>
          <Calendar
            markingType={'period'}
            markedDates={{
              '2021-12-30': {marked: true, dotColor: '#50cebb'},
              '2021-12-29': {marked: true, dotColor: '#50cebb'},
              '2021-12-25': {startingDay: true, color: '#50cebb', textColor: 'white'},
              '2021-12-26': {color: '#70d7c7', textColor: 'white'},
              '2021-12-27': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
              '2021-12-28': {color: '#70d7c7', textColor: 'white'},
              '2021-12-29': {endingDay: true, color: '#50cebb', textColor: 'white'}
            }}
            onDayPress={day => {
              console.log('selected day', day);
              setOpenInput(true)
            }}
          />
        </View>
      </View>
      <View style={{marginTop:380}}>
        {openInput ? (
          <View>
          {!weight ? (
                  <View>
                    <TextInput
                    placeholder="Manually add weight"
                    value={weight}
                    onChangeText={text => setWeight(text)}
                    style={styles.input}
                    />
                    <Text style={styles.buttonOutlineText}>or</Text>
                    <TouchableOpacity
                    onPress={connectSmartScale}
                    style={[styles.button, styles.buttonOutline]}
                    >
                    <Text style={styles.buttonOutlineText}>Connect Smart Scale!</Text>
                    </TouchableOpacity>
                  </View>
                              
                ): null}

          {weight ? (
                        <TouchableOpacity
                        onPress={closeInput}
                        style={[styles.buttonSuccess, styles.buttonOutlineSuccess]}
                        >
                        <Text style={styles.buttonOutlineTextSuccess}>Weight set!</Text>
                        </TouchableOpacity>


          ): null}
           </View>
        ): false}

      </View>


    </View>
  )
}

export default AddCalendar

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop:40
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
  container: {
    flex: 1,
    marginTop: 350
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: '#00FA9A',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineSuccess: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#00FA9A',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineTextSuccess: {
    color: '#00FA9A',
    fontWeight: '700',
    fontSize: 16,
  },
})