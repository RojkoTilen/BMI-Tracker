import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [goalBMI, setGoalBMI] = useState('')

    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    const navigation = useNavigation()

    function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
        navigation.replace("Main")
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    const nullWeight = () => {
      setWeight('')
    }

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

    const addUser = async () => {
      console.log("Add firestore function");
      let date = new Date();

      firestore()
        .collection('Users')
        .add({
          Email: email,
          Height: height,
          Name: name,
          goalBMI: goalBMI

        })
      
      firestore()
        .collection('Measurements')
        .add({
          Date: date,
          UserEmail: email,
          Weight: weight,
        })
    }


    const handleSignUp = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
            addUser();

        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }
        
            console.error(error);
        });
    }


    if (initializing) return null;

    return (
        <KeyboardAvoidingView
        style={styles.container}
        >
          <View style={[styles.headerCard, styles.elevation]}>
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
        <View style={[styles.inputContainer, styles.elevation]}>
            <TextInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
            <TextInput
            placeholder="Height"
            value={height}
            onChangeText={text => setHeight(text)}
            style={styles.input}
            /> 
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
                style={[styles.button, styles.buttonOutline, styles.elevation]}
                >
                <Text style={styles.buttonOutlineText}>Connect Smart Scale!</Text>
                </TouchableOpacity>
              </View>
                           
            ): null}

            {weight ? (
                    <TouchableOpacity
                    onPress={nullWeight}
                    style={[styles.buttonSuccess, styles.buttonOutlineSuccess]}
                    >
                    <Text style={styles.buttonOutlineTextSuccess}>Smart Scale Connected!</Text>
                    </TouchableOpacity>


            ): null}


            <TextInput
            placeholder="Goal BMI"
            value={goalBMI}
            onChangeText={text => setGoalBMI(text)}
            style={styles.input}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline, styles.elevation]}
            >
            <Text style={[styles.buttonOutlineText]}>Register</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen


const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  }, 
  headerCard: {
    width: "100%",
    height: 400,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 120,
    backgroundColor: "white"
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
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
  buttonSuccess: {
    backgroundColor: '#00FA9A',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutlineSuccess: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#00FA9A',
    borderWidth: 2,
  },
  buttonOutlineTextSuccess: {
    color: '#00FA9A',
    fontWeight: '700',
    fontSize: 16,
  },
})