import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import auth from '@react-native-firebase/auth';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const handleSignUp = () => {
    navigation.replace("Register")
  }

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signed in!');
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
      style={[styles.container]}
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
      </View>

      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.elevation]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline, styles.elevation]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
})