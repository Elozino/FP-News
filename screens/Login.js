/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebaseAuth} from '../config/firebase/firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  email,
  password,
  fullname,
  userFieldSelector,
} from '../config/redux-toolkit/features/userSlice';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userFieldSelector);

  const handleLogin = async () => {
    auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        console.log('signed in!');
        alert('signed in!');
        // navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }
        console.error(error);
      });
  };

  const handleGoogleAuth = async () => {
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(user => {
        dispatch(fullname(user.additionalUserInfo.profile.name));
        navigation.navigate('Home');
        console.log(user.additionalUserInfo.profile.name);
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  const forgotPassword = () => {
    alert('Oops! screen for this yet, Update comming!!!');
    // console.log('reset email sent to ' + Email);
    // auth()
    //   .sendPasswordResetEmail(auth, Email, null)
    //   .then(() => {
    //     alert('reset email sent to ' + Email);
    //   })
    //   .catch(function (e) {
    //     console.log(e);
    //   });
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../src/assets/logo.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.formContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Email"
            onChangeText={text => dispatch(email(text))}
            keyboardType="email-address"
            style={styles.inputField}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Password"
            onChangeText={text => dispatch(password(text))}
            secureTextEntry={true}
            style={styles.inputField}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>OR</Text>
      </View>
      <TouchableOpacity style={styles.google} onPress={handleGoogleAuth}>
        <Text style={styles.googleText}>Login with </Text>
        <AntDesign name="google" color={COLORS.blue} size={20} />
      </TouchableOpacity>
      <View style={styles.auth}>
        <Text>Forgot password? </Text>
        <TouchableOpacity onPress={forgotPassword}>
          <Text style={styles.loginText}>Click here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    color: COLORS.blue,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#32439F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  google: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#cecece',
    borderRadius: 5,
    padding: 9,
    elevation: 5,
  },
  googleText: {
    fontSize: 20,
    fontWeight: '500',
  },
  auth: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.blue,
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
